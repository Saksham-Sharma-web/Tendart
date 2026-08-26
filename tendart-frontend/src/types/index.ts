export type RequirementCategory =
  | 'STATUTORY'
  | 'FINANCIAL'
  | 'TECHNICAL'
  | 'EXPERIENCE'
  | 'LOCAL_CONTENT'
  | 'DOCUMENT'
  | 'ELIGIBILITY'
  | 'OTHER';

export type ComplianceStatus =
  | 'PASS'
  | 'FAIL'
  | 'PARTIAL'
  | 'REVIEW_REQUIRED'
  | 'MISSING'
  | 'CONTRADICTED';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type QualificationStatus = 'QUALIFIED' | 'REVIEW_REQUIRED' | 'DISQUALIFIED' | 'SUBMITTED';

export interface TenderRequirement {
  requirement_id: string;
  name: string;
  category: RequirementCategory;
  mandatory: boolean;
  data_type: 'STRING' | 'NUMBER' | 'PERCENTAGE' | 'BOOLEAN' | 'DATE' | 'CURRENCY';
  expected_value: any;
  operator: '>=' | '<=' | '==' | '!=' | '>' | '<' | 'CONTAINS';
  weight: number;
  verification_type: 'PORTAL_CHECK' | 'DOCUMENT_AI' | 'REGISTRY_CHECK' | 'MANUAL';
  required_document_types: string[];
}

export interface Tender {
  tender_id: string;
  title: string;
  tender_number: string;
  department: string;
  description: string;
  estimated_value_cr: number;
  submission_deadline: string;
  status: string;
  created_by: string;
  created_at: string;
  requirements: TenderRequirement[];
  total_bidders?: number;
  qualified_count?: number;
  review_count?: number;
  disqualified_count?: number;
}

export interface DiscrepancyItem {
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  affected_requirements: string[];
  source_docs: string[];
  expected_value: string;
  found_value: string;
}

export interface RequirementEvaluation {
  requirement_id: string;
  name: string;
  category: string;
  mandatory: boolean;
  status: ComplianceStatus;
  is_hard_constraint_met: boolean;
  soft_score_earned: number;
  max_soft_score: number;
  expected_value: any;
  extracted_value: any;
  display_value: string;
  evidence_id?: string;
  source_doc_name?: string;
  source_page?: number;
  source_text?: string;
  norm_box?: [number, number, number, number];
  verification_source: string;
  rule_explanation: string;
}

export interface ComplianceScore {
  total_score: number;
  statutory_score: number;
  financial_score: number;
  technical_score: number;
  document_score: number;
  local_content_score: number;
  risk_level: RiskLevel;
  hard_constraints_passed: boolean;
  status: QualificationStatus;
  discrepancies: DiscrepancyItem[];
  requirement_evaluations: RequirementEvaluation[];
}

export interface BidDocument {
  doc_id: string;
  filename: string;
  file_path?: string;
  document_type: string;
  page_count?: number;
  sha256_hash?: string;
}

export interface Bid {
  bid_id: string;
  tender_id: string;
  bidder_name: string;
  legal_name: string;
  pan?: string;
  gstin?: string;
  udyam_number?: string;
  cin?: string;
  bid_amount_cr: number;
  submitted_at: string;
  status: string;
  compliance_score?: number;
  risk_level?: RiskLevel;
  compliance_status?: QualificationStatus;
  discrepancy_count?: number;
  officer_decision?: 'APPROVE' | 'REJECT' | 'REQUEST_CLARIFICATION' | 'HOLD';
  decision_remarks?: string;
  decision_by?: string;
  decision_at?: string;
  documents: BidDocument[];
}

export interface Evidence {
  evidence_id: string;
  tender_id: string;
  bid_id: string;
  requirement_id: string;
  doc_id: string;
  document_name: string;
  page_number: number;
  field_name: string;
  extracted_value: any;
  display_value: string;
  source_text: string;
  confidence: number;
  norm_box?: [number, number, number, number];
  admin_status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EDITED';
  admin_override_value?: any;
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
}

export interface AuditLog {
  log_id: string;
  timestamp: string;
  tender_id?: string;
  bid_id?: string;
  actor: string;
  action: string;
  entity_type: string;
  entity_id: string;
  notes: string;
}

export interface RankedBidder {
  rank: number | null;
  bid_id: string;
  bidder_name: string;
  legal_name: string;
  pan?: string;
  gstin?: string;
  bid_amount_cr: number;
  compliance_score: number;
  statutory_score: number;
  financial_score: number;
  technical_score: number;
  document_score: number;
  local_content_score: number;
  risk_level: RiskLevel;
  status: QualificationStatus;
  hard_constraints_passed: boolean;
  discrepancies_count: number;
  officer_decision?: string;
}
