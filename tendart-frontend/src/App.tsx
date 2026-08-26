import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { PipelineProgressModal } from './components/demo/PipelineProgressModal';
import { LoginGatewayView } from './views/LoginGatewayView';
import { OfficerWorkspaceView } from './views/OfficerWorkspaceView';
import { TendererDashboardView } from './views/TendererDashboardView';
import { BidderDashboardView } from './views/BidderDashboardView';
import { TenderCreateView } from './views/TenderCreateView';
import { TenderDetailView } from './views/TenderDetailView';
import { BidderRankingView } from './views/BidderRankingView';
import { BidderDetailView } from './views/BidderDetailView';
import { EvidenceViewerView } from './views/EvidenceViewerView';
import { BidSubmissionView } from './views/BidSubmissionView';
import { AuditReportView } from './views/AuditReportView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { Tender, Bid, ComplianceScore, Evidence, AuditLog, RankedBidder } from './types';
import { api } from './services/api';

export const App: React.FC = () => {
  // Active Role State (null = show Login Gateway with 4 primary options)
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string>('dashboard');

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

  const handleSelectRole = (role: string) => {
    setCurrentRole(role);
    if (role === 'TENDERER') {
      setActiveView('tenderer_dashboard');
    } else if (role === 'BIDDER') {
      setSelectedTenderId(null);
      setActiveView('bidder_dashboard');
    } else if (role === 'ADMIN') {
      setActiveView('admin_dashboard');
    } else {
      setActiveView('officer_dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentRole(null);
  };

  const loadInitialData = async () => {
    try {
      let tList = await api.listTenders();
      if (!tList || tList.length === 0) {
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
      console.warn('Bootstrapping fallback data...', err);
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

      if (bList.length > 0) {
        const targetBidId = selectedBidId || bList[0].bid_id;
        setSelectedBidId(targetBidId);
        const bDetail = await api.getBidDetail(targetBidId);
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
      if (currentRole === 'TENDERER') setActiveView('tenderer_dashboard');
      else if (currentRole === 'BIDDER') setActiveView('bidder_dashboard');
      else if (currentRole === 'ADMIN') setActiveView('admin_dashboard');
      else setActiveView('officer_dashboard');
    } catch (err: any) {
      console.error('Demo load error:', err);
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
      const created = await api.submitBid(bidData);
      if (selectedTenderId) {
        await loadTenderData(selectedTenderId);
      }
      setSelectedBidId(created.bid_id);
      const detail = await api.getBidDetail(created.bid_id);
      setCurrentBidDetail(detail);
      if (currentRole === 'BIDDER') setActiveView('tender_my_bid');
      else setActiveView('rankings');
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
      await api.recordDecision(selectedBidId, decision, remarks, 'Shri R. K. Sharma (Joint Director, GeM)');
      await handleSelectBid(selectedBidId);
      if (selectedTenderId) await loadTenderData(selectedTenderId);
    } catch (err: any) {
      alert(`Failed to record decision: ${err.message}`);
    }
  };

  const activeTender = tenders.find((t) => t.tender_id === selectedTenderId) || tenders[0] || {
    tender_id: 'TND-GEM-2026-001',
    title: 'Procurement of Industrial & Tactical Safety Equipment',
    tender_number: 'GEM/2026/B/891240',
    department: 'Ministry of Commerce & Industry / Central Logistics Division',
    description: 'National procurement bid under Make in India guidelines',
    estimated_value_cr: 15.0,
    submission_deadline: '2026-09-15T17:00:00Z',
    status: 'ACTIVE_EVALUATION',
    created_by: 'Director of Procurement (GeM Div-IV)',
    created_at: new Date().toISOString(),
    requirements: []
  };

  // If no role selected, render the 4-Option Login Gateway Screen
  if (!currentRole) {
    return (
      <LoginGatewayView
        onSelectRole={handleSelectRole}
        onLoadDemo={handleLoadDemo}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#17212B] flex flex-col font-sans">
      {/* Sleek Government Header with Active Role & Switch Portal */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleSelectRole}
        onLogout={handleLogout}
        onLoadDemo={handleLoadDemo}
        onRunPipeline={handleRunLivePipeline}
        isProcessing={isProcessing}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Dynamic Role-Aware Sidebar - Hidden for Bidder for clean full-width experience */}
        {currentRole !== 'BIDDER' && (
          <Sidebar
            activeView={activeView}
            onNavigate={setActiveView}
            selectedTenderId={selectedTenderId}
            selectedBidId={selectedBidId}
            currentRole={currentRole}
          />
        )}

        {/* Main Content Area - Clean Government Canvas with 32px Padding */}
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-8 bg-[#F6F8FA] w-full">
          {/* Role 1: Tenderer Dashboard View */}
          {(activeView === 'tenderer_dashboard' || activeView === 'tenders') && (
            <TendererDashboardView
              tenders={tenders}
              bids={bids}
              activeView={activeView}
              onNavigate={setActiveView}
              onSelectTender={(id) => {
                setSelectedTenderId(id);
                loadTenderData(id);
              }}
            />
          )}

          {/* Role 2: Bidder Dashboard View */}
          {(activeView === 'bidder_dashboard' ||
            activeView === 'bidder_explore' ||
            activeView === 'bidder_vault' ||
            activeView === 'bidder_profile' ||
            activeView === 'tender_criteria' ||
            activeView === 'tender_vault_map' ||
            activeView === 'tender_pre_check' ||
            activeView === 'tender_my_bid' ||
            activeView === 'tender_clarifications') && (
            <BidderDashboardView
              tender={activeTender}
              bids={bids}
              activeView={activeView}
              onNavigate={(v) => {
                if (v === 'bidder_explore') {
                  setSelectedTenderId(null);
                }
                setActiveView(v);
              }}
              onSelectTender={(id) => setSelectedTenderId(id || null)}
            />
          )}

          {/* Role 3: Procurement Officer Dashboard View */}
          {activeView === 'officer_dashboard' && (
            <OfficerWorkspaceView
              tender={activeTender}
              bids={bids}
              rankings={rankings}
              auditTrail={auditTrail}
              onSelectBid={handleSelectBid}
              onOpenEvidenceViewer={handleOpenEvidenceViewer}
              onRecordDecision={handleRecordDecision}
              onRunPipeline={handleRunLivePipeline}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'create_tender' && (
            <TenderCreateView
              onCreateTender={handleCreateTender}
              onCancel={() => setActiveView(currentRole === 'TENDERER' ? 'tenderer_dashboard' : 'officer_dashboard')}
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

          {(activeView === 'admin_dashboard' ||
            activeView === 'users_roles' ||
            activeView === 'gov_integrations' ||
            activeView === 'compliance_rules_builder' ||
            activeView === 'system_health' ||
            activeView === 'audit_trail') && (
            <AdminDashboardView
              tenders={tenders}
              bids={bids}
              activeView={activeView}
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
export default App;
