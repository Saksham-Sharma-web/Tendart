import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { PipelineProgressModal } from './components/demo/PipelineProgressModal';
import { DashboardView } from './views/DashboardView';
import { TenderCreateView } from './views/TenderCreateView';
import { TenderDetailView } from './views/TenderDetailView';
import { BidderRankingView } from './views/BidderRankingView';
import { BidderDetailView } from './views/BidderDetailView';
import { EvidenceViewerView } from './views/EvidenceViewerView';
import { BidSubmissionView } from './views/BidSubmissionView';
import { AuditReportView } from './views/AuditReportView';
import { Tender, Bid, ComplianceScore, Evidence, AuditLog, RankedBidder } from './types';
import { api } from './services/api';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [currentRole, setCurrentRole] = useState<string>('ADMIN');

  // Data State
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTenderId, setSelectedTenderId] = useState<string>('');
  const [bids, setBids] = useState<Bid[]>([]);
  const [selectedBidId, setSelectedBidId] = useState<string>('');
  const [currentBidDetail, setCurrentBidDetail] = useState<{
    bid: Bid;
    tender: Tender;
    compliance_score: ComplianceScore;
    evidence: Evidence[];
  } | null>(null);
  const [rankings, setRankings] = useState<RankedBidder[]>([]);
  const [auditTrail, setAuditTrail] = useState<AuditLog[]>([]);

  // Evidence Viewer Context
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('');
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<number>(1);

  // Live Pipeline Execution State
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Initial Load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      let tList = await api.listTenders();
      if (!tList || tList.length === 0) {
        // Automatically load demo tender if DB is clean
        await api.loadDemoTender();
        tList = await api.listTenders();
      }

      setTenders(tList);
      if (tList.length > 0) {
        const firstTenderId = tList[0].tender_id;
        setSelectedTenderId(firstTenderId);
        await loadTenderData(firstTenderId);
      }
    } catch (err) {
      console.warn('Backend bootstrapping or offline, loading mock fallback...', err);
    }
  };

  const loadTenderData = async (tenderId: string) => {
    try {
      const bList = await api.listBids(tenderId);
      setBids(bList);
      const rList = await api.getRankings(tenderId);
      setRankings(rList);
      const aLogs = await api.getAuditTrail(tenderId);
      setAuditTrail(aLogs);

      if (bList.length > 0 && !selectedBidId) {
        setSelectedBidId(bList[0].bid_id);
        const bDetail = await api.getBidDetail(bList[0].bid_id);
        setCurrentBidDetail(bDetail);
      }
    } catch (err) {
      console.error('Failed to load tender data:', err);
    }
  };

  const handleSelectBid = async (bidId: string) => {
    setSelectedBidId(bidId);
    try {
      const detail = await api.getBidDetail(bidId);
      setCurrentBidDetail(detail);
    } catch (err) {
      console.error('Failed to fetch bid detail:', err);
    }
  };

  const handleLoadDemo = async () => {
    setIsProcessing(true);
    try {
      await api.loadDemoTender();
      await loadInitialData();
      alert('⚡ GeM Demo Tender GEM/2026/SAFETY/001 loaded successfully with 12 bidders!');
    } catch (err: any) {
      alert(`Demo load failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunLivePipeline = () => {
    setIsPipelineModalOpen(true);
  };

  const handlePipelineCompleted = async () => {
    setIsPipelineModalOpen(false);
    if (selectedTenderId) {
      await api.evaluateAllBids(selectedTenderId);
      await loadTenderData(selectedTenderId);
      setActiveView('rankings');
    }
  };

  const handleCreateTender = async (tenderData: any) => {
    try {
      const newTender = await api.createTender(tenderData);
      await loadInitialData();
      setSelectedTenderId(newTender.tender_id);
      setActiveView('tenders');
      alert(`Tender ${newTender.tender_number} created successfully!`);
    } catch (err: any) {
      alert(`Error creating tender: ${err.message}`);
    }
  };

  const handleSubmitBid = async (bidData: any) => {
    try {
      await loadTenderData(selectedTenderId);
      setActiveView('rankings');
    } catch (err) {
      console.error('Error submitting bid:', err);
    }
  };

  const handleOpenEvidenceViewer = (evidenceId: string, docId?: string, pageNumber: number = 1) => {
    setSelectedEvidenceId(evidenceId);
    if (docId) setSelectedDocId(docId);
    setSelectedPage(pageNumber);
    setActiveView('evidence_viewer');
  };

  const handleRecordDecision = async (
    decision: 'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD',
    remarks: string
  ) => {
    if (!selectedBidId) return;
    try {
      await api.recordDecision(selectedBidId, decision, remarks, 'Procurement Officer (GeM/HQ)');
      await handleSelectBid(selectedBidId);
      if (selectedTenderId) await loadTenderData(selectedTenderId);
    } catch (err: any) {
      alert(`Failed to record decision: ${err.message}`);
    }
  };

  const activeTender = tenders.find((t) => t.tender_id === selectedTenderId) || tenders[0] || {
    tender_id: 'TND-GEM-SAFETY-2026',
    title: 'Supply of Industrial Safety Equipment & PPE',
    tender_number: 'GEM/2026/SAFETY/001',
    department: 'Ministry of Heavy Industries & GeM Cell',
    description: 'National procurement bid under Make in India guidelines',
    estimated_value_cr: 45.0,
    submission_deadline: '2026-10-30T17:00:00',
    status: 'ACTIVE_EVALUATION',
    created_by: 'Procurement Officer',
    created_at: new Date().toISOString(),
    requirements: []
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onLoadDemo={handleLoadDemo}
        onRunPipeline={handleRunLivePipeline}
        isProcessing={isProcessing}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={setActiveView}
          selectedTenderId={selectedTenderId}
          selectedBidId={selectedBidId}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#0B192C] to-slate-950">
          {activeView === 'dashboard' && (
            <DashboardView
              tenders={tenders}
              bids={bids}
              onSelectTender={(id) => {
                setSelectedTenderId(id);
                loadTenderData(id);
                setActiveView('tenders');
              }}
              onSelectBid={(id) => {
                handleSelectBid(id);
                setActiveView('bid_detail');
              }}
              onNavigate={setActiveView}
              onLoadDemo={handleLoadDemo}
            />
          )}

          {activeView === 'create_tender' && (
            <TenderCreateView
              onCreateTender={handleCreateTender}
              onCancel={() => setActiveView('dashboard')}
            />
          )}

          {activeView === 'tenders' && (
            <TenderDetailView
              tender={activeTender}
              bids={bids}
              onSelectBid={(id) => {
                handleSelectBid(id);
                setActiveView('bid_detail');
              }}
              onNavigate={setActiveView}
              onRunEvaluation={handleRunLivePipeline}
            />
          )}

          {activeView === 'rankings' && (
            <BidderRankingView
              tender={activeTender}
              rankings={rankings}
              onSelectBid={(id) => {
                handleSelectBid(id);
                setActiveView('bid_detail');
              }}
              onNavigate={setActiveView}
              onFilterChange={(st, rk) => {
                api.getRankings(activeTender.tender_id, st, rk).then(setRankings);
              }}
            />
          )}

          {activeView === 'bid_detail' && currentBidDetail && (
            <BidderDetailView
              bid={currentBidDetail.bid}
              tender={currentBidDetail.tender || activeTender}
              complianceScore={currentBidDetail.compliance_score}
              evidenceList={currentBidDetail.evidence || []}
              onOpenEvidenceViewer={handleOpenEvidenceViewer}
              onRecordDecision={handleRecordDecision}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'evidence_viewer' && (
            <EvidenceViewerView
              bid={currentBidDetail?.bid}
              tender={activeTender}
              evidenceList={currentBidDetail?.evidence || []}
              initialEvidenceId={selectedEvidenceId}
              initialDocId={selectedDocId}
              initialPage={selectedPage}
              onEvidenceReviewed={() => {
                if (selectedBidId) handleSelectBid(selectedBidId);
              }}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'bid_submission' && (
            <BidSubmissionView
              tender={activeTender}
              onSubmitBid={handleSubmitBid}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'audit_trail' && (
            <AuditReportView
              tender={activeTender}
              bid={currentBidDetail?.bid}
              complianceScore={currentBidDetail?.compliance_score}
              auditTrail={auditTrail}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'compliance_report' && currentBidDetail && (
            <AuditReportView
              tender={activeTender}
              bid={currentBidDetail.bid}
              complianceScore={currentBidDetail.compliance_score}
              auditTrail={auditTrail}
              onNavigate={setActiveView}
            />
          )}
        </main>
      </div>

      {/* Live Pipeline Execution Progress Modal */}
      <PipelineProgressModal
        isOpen={isPipelineModalOpen}
        onClose={() => setIsPipelineModalOpen(false)}
        onComplete={handlePipelineCompleted}
      />
    </div>
  );
};
