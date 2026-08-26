import { Tender, Bid, ComplianceScore, Evidence, AuditLog, RankedBidder } from '../types';

const API_BASE = 'http://localhost:8001/api/v1/tendart';

export const api = {
  // Demo Loader
  loadDemoTender: async (): Promise<{ success: boolean; data: any }> => {
    const res = await fetch(`${API_BASE}/demo/load`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to load demo tender');
    return res.json();
  },

  // Tenders
  listTenders: async (): Promise<Tender[]> => {
    const res = await fetch(`${API_BASE}/tenders`);
    if (!res.ok) throw new Error('Failed to fetch tenders');
    const data = await res.json();
    return data.tenders || [];
  },

  getTender: async (tenderId: string): Promise<Tender> => {
    const res = await fetch(`${API_BASE}/tenders/${tenderId}`);
    if (!res.ok) throw new Error('Failed to fetch tender details');
    const data = await res.json();
    return data.tender;
  },

  createTender: async (payload: Partial<Tender>): Promise<Tender> => {
    const res = await fetch(`${API_BASE}/tenders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create tender');
    const data = await res.json();
    return data.tender;
  },

  // Bids
  listBids: async (tenderId: string): Promise<Bid[]> => {
    const res = await fetch(`${API_BASE}/tenders/${tenderId}/bids`);
    if (!res.ok) throw new Error('Failed to fetch bids');
    const data = await res.json();
    return data.bids || [];
  },

  getBidDetail: async (bidId: string): Promise<{ bid: Bid; tender: Tender; compliance_score: ComplianceScore; evidence: Evidence[] }> => {
    const res = await fetch(`${API_BASE}/bids/${bidId}`);
    if (!res.ok) throw new Error('Failed to fetch bid details');
    return res.json();
  },

  evaluateBid: async (bidId: string): Promise<ComplianceScore> => {
    const res = await fetch(`${API_BASE}/bids/${bidId}/evaluate`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to evaluate bid');
    const data = await res.json();
    return data.compliance_result;
  },

  evaluateAllBids: async (tenderId: string): Promise<any> => {
    const res = await fetch(`${API_BASE}/tenders/${tenderId}/evaluate-all`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to evaluate all bids');
    return res.json();
  },

  // Rankings
  getRankings: async (tenderId: string, statusFilter?: string, riskFilter?: string): Promise<RankedBidder[]> => {
    const params = new URLSearchParams();
    if (statusFilter) params.append('status_filter', statusFilter);
    if (riskFilter) params.append('risk_filter', riskFilter);

    const res = await fetch(`${API_BASE}/tenders/${tenderId}/rankings?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch rankings');
    const data = await res.json();
    return data.rankings || [];
  },

  // Evidence & Review
  getEvidence: async (evidenceId: string): Promise<Evidence> => {
    const res = await fetch(`${API_BASE}/evidence/${evidenceId}`);
    if (!res.ok) throw new Error('Failed to fetch evidence');
    const data = await res.json();
    return data.evidence;
  },

  reviewEvidence: async (
    evidenceId: string,
    adminStatus: 'APPROVED' | 'REJECTED' | 'EDITED',
    overrideValue?: any,
    notes?: string,
    reviewerName: string = 'Procurement Reviewer'
  ): Promise<Evidence> => {
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
    if (!res.ok) throw new Error('Failed to review evidence');
    const data = await res.json();
    return data.evidence;
  },

  // Procurement Officer Decision
  recordDecision: async (
    bidId: string,
    decision: 'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD',
    remarks: string,
    officerName: string = 'Authorized Procurement Officer'
  ): Promise<Bid> => {
    const res = await fetch(`${API_BASE}/bids/${bidId}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        decision,
        remarks,
        officer_name: officerName
      })
    });
    if (!res.ok) throw new Error('Failed to record decision');
    const data = await res.json();
    return data.bid;
  },

  // Audit Trail & Report
  getAuditTrail: async (tenderId: string): Promise<AuditLog[]> => {
    const res = await fetch(`${API_BASE}/tenders/${tenderId}/audit-trail`);
    if (!res.ok) throw new Error('Failed to fetch audit trail');
    const data = await res.json();
    return data.audit_trail || [];
  },

  getPageImageUrl: (docId: string, pageNumber: number = 1): string => {
    return `${API_BASE}/documents/${docId}/pages/${pageNumber}/image`;
  }
};
