import { Tender, Bid, ComplianceScore, Evidence, AuditLog, RankedBidder } from '../types';
import { mockTenders, mockBids, mockRankedBidders, mockBidDetails, mockAuditTrail } from './mockData';

const API_BASE = 'http://localhost:5000/api/v1/tendart';

// In-Memory dynamic fallback store for seamless interactive demo
let localTenders = [...mockTenders];
let localBids = [...mockBids];
let localRankings = [...mockRankedBidders];
let localBidDetails = { ...mockBidDetails };
let localAuditTrail = [...mockAuditTrail];

export const api = {
  // Demo Loader
  loadDemoTender: async (): Promise<{ success: boolean; data: any }> => {
    try {
      const res = await fetch(`${API_BASE}/demo/load`, { method: 'POST' });
      if (res.ok) return res.json();
    } catch (_) {
      // Fallback
    }
    localTenders = [...mockTenders];
    localBids = [...mockBids];
    localRankings = [...mockRankedBidders];
    localBidDetails = { ...mockBidDetails };
    localAuditTrail = [...mockAuditTrail];
    return { success: true, data: { tender_id: mockTenders[0].tender_id, bidders_count: mockBids.length } };
  },

  // Tenders
  listTenders: async (): Promise<Tender[]> => {
    try {
      const res = await fetch(`${API_BASE}/tenders`);
      if (res.ok) {
        const data = await res.json();
        return data.tenders || [];
      }
    } catch (_) {
      // Fallback
    }
    return localTenders;
  },

  getTender: async (tenderId: string): Promise<Tender> => {
    try {
      const res = await fetch(`${API_BASE}/tenders/${tenderId}`);
      if (res.ok) {
        const data = await res.json();
        return data.tender;
      }
    } catch (_) {
      // Fallback
    }
    return localTenders.find((t) => t.tender_id === tenderId) || localTenders[0];
  },

  createTender: async (payload: Partial<Tender>): Promise<Tender> => {
    const newTender: Tender = {
      tender_id: `TND-${Date.now()}`,
      tender_number: payload.tender_number || `GEM/${new Date().getFullYear()}/B/${Math.floor(100000 + Math.random() * 900000)}`,
      title: payload.title || 'New GeM Tender',
      department: payload.department || 'Ministry of Commerce & Industry',
      description: payload.description || '',
      estimated_value_cr: payload.estimated_value_cr || 10.0,
      submission_deadline: payload.submission_deadline || new Date(Date.now() + 15 * 86400000).toISOString(),
      status: 'ACTIVE_EVALUATION',
      created_by: payload.created_by || 'Procurement Officer',
      created_at: new Date().toISOString(),
      requirements: payload.requirements || [],
      total_bidders: 0,
      qualified_count: 0,
      review_count: 0,
      disqualified_count: 0
    };

    try {
      const res = await fetch(`${API_BASE}/tenders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        return data.tender;
      }
    } catch (_) {
      // Fallback
    }

    localTenders = [newTender, ...localTenders];
    return newTender;
  },

  // Bids
  listBids: async (tenderId: string): Promise<Bid[]> => {
    try {
      const res = await fetch(`${API_BASE}/tenders/${tenderId}/bids`);
      if (res.ok) {
        const data = await res.json();
        return data.bids || [];
      }
    } catch (_) {
      // Fallback
    }
    return localBids.filter((b) => !tenderId || b.tender_id === tenderId || b.tender_id === 'TND-GEM-2026-001');
  },

  getBidDetail: async (bidId: string): Promise<{ bid: Bid; tender: Tender; compliance_score: ComplianceScore; evidence: Evidence[] }> => {
    try {
      const res = await fetch(`${API_BASE}/bids/${bidId}`);
      if (res.ok) {
        return res.json();
      }
    } catch (_) {
      // Fallback
    }
    const found = localBidDetails[bidId];
    if (found) return found;

    // Default dynamic structure if custom bid
    const genericBid = localBids.find((b) => b.bid_id === bidId) || localBids[0];
    return {
      bid: genericBid,
      tender: localTenders[0],
      compliance_score: {
        total_score: genericBid.compliance_score || 85,
        statutory_score: 25,
        financial_score: 20,
        technical_score: 20,
        document_score: 10,
        local_content_score: 10,
        risk_level: genericBid.risk_level || 'LOW',
        hard_constraints_passed: true,
        status: genericBid.compliance_status || 'QUALIFIED',
        discrepancies: [],
        requirement_evaluations: []
      },
      evidence: []
    };
  },

  evaluateBid: async (bidId: string): Promise<ComplianceScore> => {
    try {
      const res = await fetch(`${API_BASE}/bids/${bidId}/evaluate`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        return data.compliance_result;
      }
    } catch (_) {
      // Fallback
    }
    const detail = localBidDetails[bidId];
    return detail?.compliance_score || {
      total_score: 90,
      statutory_score: 30,
      financial_score: 20,
      technical_score: 20,
      document_score: 10,
      local_content_score: 10,
      risk_level: 'LOW',
      hard_constraints_passed: true,
      status: 'QUALIFIED',
      discrepancies: [],
      requirement_evaluations: []
    };
  },

  evaluateAllBids: async (tenderId: string): Promise<any> => {
    try {
      const res = await fetch(`${API_BASE}/tenders/${tenderId}/evaluate-all`, { method: 'POST' });
      if (res.ok) return res.json();
    } catch (_) {
      // Fallback
    }
    return { success: true, evaluated_count: localBids.length };
  },

  // Rankings
  getRankings: async (tenderId: string, statusFilter?: string, riskFilter?: string): Promise<RankedBidder[]> => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status_filter', statusFilter);
      if (riskFilter) params.append('risk_filter', riskFilter);

      const res = await fetch(`${API_BASE}/tenders/${tenderId}/rankings?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        return data.rankings || [];
      }
    } catch (_) {
      // Fallback
    }
    let res = [...localRankings];
    if (statusFilter) res = res.filter((r) => r.status === statusFilter);
    if (riskFilter) res = res.filter((r) => r.risk_level === riskFilter);
    return res;
  },

  // Evidence & Review
  getEvidence: async (evidenceId: string): Promise<Evidence> => {
    try {
      const res = await fetch(`${API_BASE}/evidence/${evidenceId}`);
      if (res.ok) {
        const data = await res.json();
        return data.evidence;
      }
    } catch (_) {
      // Fallback
    }
    const allEvidence = Object.values(localBidDetails).flatMap((d) => d.evidence);
    return allEvidence.find((e) => e.evidence_id === evidenceId) || allEvidence[0];
  },

  reviewEvidence: async (
    evidenceId: string,
    adminStatus: 'APPROVED' | 'REJECTED' | 'EDITED',
    overrideValue?: any,
    notes?: string,
    reviewerName: string = 'Procurement Reviewer'
  ): Promise<Evidence> => {
    try {
      const res = await fetch(`${API_BASE}/evidence/${evidenceId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_status: adminStatus,
          override_value: overrideValue,
          notes,
          reviewed_by: reviewerName
        })
      });
      if (res.ok) {
        const data = await res.json();
        return data.evidence;
      }
    } catch (_) {
      // Fallback
    }

    // Local update
    for (const key of Object.keys(localBidDetails)) {
      const evi = localBidDetails[key].evidence.find((e) => e.evidence_id === evidenceId);
      if (evi) {
        evi.admin_status = adminStatus;
        evi.admin_override_value = overrideValue;
        evi.review_notes = notes;
        evi.reviewed_by = reviewerName;
        evi.reviewed_at = new Date().toISOString();
        return evi;
      }
    }

    return {
      evidence_id: evidenceId,
      tender_id: 'TND-GEM-2026-001',
      bid_id: 'BID-2026-BHARAT-01',
      requirement_id: 'REQ-01',
      doc_id: 'DOC-01',
      document_name: 'Document.pdf',
      page_number: 1,
      field_name: 'Field',
      extracted_value: overrideValue || 'Verified',
      display_value: String(overrideValue || 'Verified'),
      source_text: notes || 'Manual verification note',
      confidence: 1.0,
      admin_status: adminStatus,
      reviewed_by: reviewerName,
      reviewed_at: new Date().toISOString()
    };
  },

  // Procurement Officer Decision
  recordDecision: async (
    bidId: string,
    decision: 'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD',
    remarks: string,
    officerName: string = 'Shri R. K. Sharma (Joint Director, GeM)'
  ): Promise<Bid> => {
    try {
      const res = await fetch(`${API_BASE}/bids/${bidId}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision,
          remarks,
          officer_name: officerName
        })
      });
      if (res.ok) {
        const data = await res.json();
        return data.bid;
      }
    } catch (_) {
      // Fallback
    }

    // Update in local fallback store
    const bidIndex = localBids.findIndex((b) => b.bid_id === bidId);
    if (bidIndex !== -1) {
      localBids[bidIndex] = {
        ...localBids[bidIndex],
        officer_decision: decision,
        decision_remarks: remarks,
        decision_by: officerName,
        decision_at: new Date().toISOString(),
        compliance_status: decision === 'APPROVE' ? 'QUALIFIED' : decision === 'REJECT' ? 'DISQUALIFIED' : 'REVIEW_REQUIRED',
        status: decision === 'APPROVE' ? 'QUALIFIED' : decision === 'REJECT' ? 'DISQUALIFIED' : 'REVIEW_REQUIRED'
      };

      // Add to audit trail
      localAuditTrail = [
        {
          log_id: `LOG-${Date.now()}`,
          timestamp: new Date().toISOString(),
          tender_id: localBids[bidIndex].tender_id,
          bid_id: bidId,
          actor: officerName,
          action: `OFFICER_DECISION_${decision}`,
          entity_type: 'BID_DECISION',
          entity_id: bidId,
          notes: `Officer Decision: ${decision}. Remarks: ${remarks}`
        },
        ...localAuditTrail
      ];

      return localBids[bidIndex];
    }

    return mockBids[0];
  },

  // Audit Trail & Report
  getAuditTrail: async (tenderId: string): Promise<AuditLog[]> => {
    try {
      const res = await fetch(`${API_BASE}/tenders/${tenderId}/audit-trail`);
      if (res.ok) {
        const data = await res.json();
        return data.audit_trail || [];
      }
    } catch (_) {
      // Fallback
    }
    return localAuditTrail;
  },

  // Bidder Self-Check & Ingestion
  submitBid: async (bidPayload: any): Promise<Bid> => {
    const newBid: Bid = {
      bid_id: bidPayload.bid_id || `BID-VENDOR-${Math.floor(1000 + Math.random() * 9000)}`,
      tender_id: bidPayload.tender_id || 'TND-GEM-2026-001',
      bidder_name: bidPayload.bidder_name,
      legal_name: bidPayload.legal_name || bidPayload.bidder_name,
      pan: bidPayload.pan || 'AABCV1234K',
      gstin: bidPayload.gstin || '07AABCV1234K1Z8',
      udyam_number: bidPayload.udyam_number || 'UDYAM-DL-01-0099812',
      bid_amount_cr: bidPayload.bid_amount_cr || 12.0,
      submitted_at: new Date().toISOString(),
      status: 'QUALIFIED',
      compliance_score: 92,
      risk_level: 'LOW',
      compliance_status: 'QUALIFIED',
      discrepancy_count: 0,
      documents: bidPayload.documents || []
    };

    localBids = [newBid, ...localBids];
    localRankings = [
      {
        rank: localRankings.length + 1,
        bid_id: newBid.bid_id,
        bidder_name: newBid.bidder_name,
        legal_name: newBid.legal_name,
        pan: newBid.pan,
        gstin: newBid.gstin,
        bid_amount_cr: newBid.bid_amount_cr,
        compliance_score: 92,
        statutory_score: 30,
        financial_score: 20,
        technical_score: 10,
        document_score: 18,
        local_content_score: 14,
        risk_level: 'LOW',
        status: 'QUALIFIED',
        hard_constraints_passed: true,
        discrepancies_count: 0
      },
      ...localRankings
    ];

    localAuditTrail = [
      {
        log_id: `LOG-SUB-${Date.now()}`,
        timestamp: new Date().toISOString(),
        tender_id: newBid.tender_id,
        bid_id: newBid.bid_id,
        actor: newBid.bidder_name,
        action: 'VENDOR_BID_SUBMITTED',
        entity_type: 'BID',
        entity_id: newBid.bid_id,
        notes: `Bid proposal submitted with ${newBid.documents.length} compliance documents.`
      },
      ...localAuditTrail
    ];

    return newBid;
  },

  getPageImageUrl: (docId: string, pageNumber: number = 1): string => {
    return `${API_BASE}/documents/${docId}/pages/${pageNumber}/image`;
  }
};
