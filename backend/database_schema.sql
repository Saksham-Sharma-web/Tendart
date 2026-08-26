-- Tendart Supabase Database Schema
-- Run this script in your Supabase SQL Editor to create the necessary tables

-- 1. Tenders Table
CREATE TABLE tenders (
    tender_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tender_number VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(255),
    description TEXT,
    estimated_value_cr NUMERIC(10, 2),
    submission_deadline TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'ACTIVE_EVALUATION',
    created_by VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    requirements JSONB DEFAULT '[]'::jsonb,
    total_bidders INTEGER DEFAULT 0,
    qualified_count INTEGER DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    disqualified_count INTEGER DEFAULT 0
);

-- 2. Bids Table
CREATE TABLE bids (
    bid_id VARCHAR(50) PRIMARY KEY,
    tender_id VARCHAR(50) REFERENCES tenders(tender_id) ON DELETE CASCADE,
    bidder_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    pan VARCHAR(20),
    gstin VARCHAR(20),
    udyam_number VARCHAR(50),
    cin VARCHAR(50),
    bid_amount_cr NUMERIC(10, 2),
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'QUALIFIED',
    compliance_score NUMERIC(5, 2),
    risk_level VARCHAR(20) DEFAULT 'LOW',
    compliance_status VARCHAR(50) DEFAULT 'QUALIFIED',
    discrepancy_count INTEGER DEFAULT 0,
    officer_decision VARCHAR(50),
    decision_remarks TEXT,
    decision_by VARCHAR(100),
    decision_at TIMESTAMPTZ,
    documents JSONB DEFAULT '[]'::jsonb
);

-- 3. Evidence Table
CREATE TABLE evidence (
    evidence_id VARCHAR(50) PRIMARY KEY,
    tender_id VARCHAR(50) REFERENCES tenders(tender_id) ON DELETE CASCADE,
    bid_id VARCHAR(50) REFERENCES bids(bid_id) ON DELETE CASCADE,
    requirement_id VARCHAR(50),
    doc_id VARCHAR(50),
    document_name VARCHAR(255),
    page_number INTEGER DEFAULT 1,
    field_name VARCHAR(100),
    extracted_value JSONB,
    display_value TEXT,
    source_text TEXT,
    confidence NUMERIC(5, 2),
    norm_box JSONB,
    admin_status VARCHAR(50) DEFAULT 'PENDING',
    admin_override_value JSONB,
    reviewed_by VARCHAR(100),
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT
);

-- 4. Audit Trail Table
CREATE TABLE audit_trail (
    log_id VARCHAR(50) PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    tender_id VARCHAR(50),
    bid_id VARCHAR(50),
    actor VARCHAR(100),
    action VARCHAR(100),
    entity_type VARCHAR(50),
    entity_id VARCHAR(50),
    notes TEXT
);

-- 5. Rankings Table
CREATE TABLE rankings (
    id SERIAL PRIMARY KEY,
    rank INTEGER,
    bid_id VARCHAR(50) REFERENCES bids(bid_id) ON DELETE CASCADE,
    tender_id VARCHAR(50) REFERENCES tenders(tender_id) ON DELETE CASCADE,
    bidder_name VARCHAR(255),
    legal_name VARCHAR(255),
    pan VARCHAR(20),
    gstin VARCHAR(20),
    bid_amount_cr NUMERIC(10, 2),
    compliance_score NUMERIC(5, 2),
    statutory_score NUMERIC(5, 2),
    financial_score NUMERIC(5, 2),
    technical_score NUMERIC(5, 2),
    document_score NUMERIC(5, 2),
    local_content_score NUMERIC(5, 2),
    risk_level VARCHAR(20),
    status VARCHAR(50),
    hard_constraints_passed BOOLEAN DEFAULT TRUE,
    discrepancies_count INTEGER DEFAULT 0,
    officer_decision VARCHAR(50)
);

-- Insert Demo Tender Data for development (Optional, helps start testing immediately)
INSERT INTO tenders (tender_id, title, tender_number, department, description, estimated_value_cr, submission_deadline, status) 
VALUES ('TND-GEM-2026-001', 'Procurement of Industrial & Tactical Safety Equipment', 'GEM/2026/B/891240', 'Ministry of Commerce & Industry / Central Logistics Division', 'National procurement bid under Make in India guidelines', 15.00, '2026-09-15 17:00:00+00', 'ACTIVE_EVALUATION')
ON CONFLICT DO NOTHING;
