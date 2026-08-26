import { Tender, Bid, ComplianceScore, Evidence, AuditLog, RankedBidder } from '../types';

export const mockTenders: Tender[] = [
  {
    tender_id: 'TND-GEM-2026-001',
    tender_number: 'GEM/2026/B/891240',
    title: 'Procurement of Industrial & Tactical Safety Equipment for Central Warehousing',
    department: 'Ministry of Commerce & Industry / Central Logistics Division',
    description: 'Supply, installation, and 3-year warranty maintenance of high-grade personal protective equipment (PPE), industrial sensors, and biometric tracking gear.',
    estimated_value_cr: 15.0,
    submission_deadline: '2026-09-15T17:00:00Z',
    status: 'ACTIVE_EVALUATION',
    created_by: 'Director of Procurement (GeM Div-IV)',
    created_at: '2026-08-01T10:00:00Z',
    total_bidders: 4,
    qualified_count: 1,
    review_count: 1,
    disqualified_count: 2,
    requirements: [
      {
        requirement_id: 'REQ-GST-01',
        name: 'Mandatory GST Registration (Active Status)',
        category: 'STATUTORY',
        mandatory: true,
        data_type: 'BOOLEAN',
        expected_value: true,
        operator: '==',
        weight: 15,
        verification_type: 'PORTAL_CHECK',
        required_document_types: ['GST_CERTIFICATE']
      },
      {
        requirement_id: 'REQ-PAN-01',
        name: 'Valid Income Tax PAN & Entity Verification',
        category: 'STATUTORY',
        mandatory: true,
        data_type: 'BOOLEAN',
        expected_value: true,
        operator: '==',
        weight: 15,
        verification_type: 'PORTAL_CHECK',
        required_document_types: ['PAN_CARD']
      },
      {
        requirement_id: 'REQ-MSME-01',
        name: 'Udyam / MSME Registration Certificate',
        category: 'ELIGIBILITY',
        mandatory: false,
        data_type: 'STRING',
        expected_value: 'VALID_UDYAM',
        operator: '!=',
        weight: 10,
        verification_type: 'PORTAL_CHECK',
        required_document_types: ['UDYAM_CERTIFICATE']
      },
      {
        requirement_id: 'REQ-TURNOVER-01',
        name: 'Minimum Average Annual Turnover (Last 3 Financial Years)',
        category: 'FINANCIAL',
        mandatory: true,
        data_type: 'CURRENCY',
        expected_value: 5.0,
        operator: '>=',
        weight: 20,
        verification_type: 'DOCUMENT_AI',
        required_document_types: ['CA_AUDITED_BALANCE_SHEET', 'TURNOVER_CERTIFICATE']
      },
      {
        requirement_id: 'REQ-EXP-01',
        name: 'Past Experience in Supplying Similar Goods (Min 3 Years)',
        category: 'EXPERIENCE',
        mandatory: true,
        data_type: 'NUMBER',
        expected_value: 3,
        operator: '>=',
        weight: 15,
        verification_type: 'DOCUMENT_AI',
        required_document_types: ['EXPERIENCE_CERTIFICATE', 'PAST_PO_COPIES']
      },
      {
        requirement_id: 'REQ-MII-01',
        name: 'Make-in-India (MII) Local Content Declaration',
        category: 'LOCAL_CONTENT',
        mandatory: true,
        data_type: 'PERCENTAGE',
        expected_value: 50.0,
        operator: '>=',
        weight: 15,
        verification_type: 'DOCUMENT_AI',
        required_document_types: ['LOCAL_CONTENT_DECLARATION']
      },
      {
        requirement_id: 'REQ-OEM-01',
        name: 'Manufacturer OEM Authorization Certificate (Annexure IV)',
        category: 'TECHNICAL',
        mandatory: true,
        data_type: 'BOOLEAN',
        expected_value: true,
        operator: '==',
        weight: 10,
        verification_type: 'DOCUMENT_AI',
        required_document_types: ['OEM_AUTHORIZATION_LETTER']
      }
    ]
  }
];

export const mockRankedBidders: RankedBidder[] = [
  {
    rank: 1,
    bid_id: 'BID-2026-BHARAT-01',
    bidder_name: 'Bharat Tactical & Safety Gear Pvt Ltd',
    legal_name: 'Bharat Tactical and Safety Gear Private Limited',
    pan: 'AABCB1234F',
    gstin: '07AABCB1234F1Z5',
    bid_amount_cr: 12.8,
    compliance_score: 96,
    statutory_score: 30,
    financial_score: 20,
    technical_score: 10,
    document_score: 21,
    local_content_score: 15,
    risk_level: 'LOW',
    status: 'QUALIFIED',
    hard_constraints_passed: true,
    discrepancies_count: 0,
    officer_decision: 'APPROVE'
  },
  {
    rank: 2,
    bid_id: 'BID-2026-SURYA-02',
    bidder_name: 'Surya Infotech & Safety Solutions Pvt Ltd',
    legal_name: 'Surya Infotech and Safety Solutions Private Limited',
    pan: 'AACCS8899K',
    gstin: '27AACCS8899K1ZB',
    bid_amount_cr: 13.5,
    compliance_score: 84,
    statutory_score: 28,
    financial_score: 20,
    technical_score: 10,
    document_score: 14,
    local_content_score: 12,
    risk_level: 'MEDIUM',
    status: 'REVIEW_REQUIRED',
    hard_constraints_passed: true,
    discrepancies_count: 1,
    officer_decision: 'HOLD'
  },
  {
    rank: 3,
    bid_id: 'BID-2026-ZENITH-03',
    bidder_name: 'Zenith Import & Trade LLP',
    legal_name: 'Zenith Global Import and Trading LLP',
    pan: 'ABBZZ4411P',
    gstin: '06ABBZZ4411P1Z2',
    bid_amount_cr: 11.2,
    compliance_score: 52,
    statutory_score: 30,
    financial_score: 12,
    technical_score: 0,
    document_score: 0,
    local_content_score: 10,
    risk_level: 'HIGH',
    status: 'DISQUALIFIED',
    hard_constraints_passed: false,
    discrepancies_count: 2,
    officer_decision: 'REJECT'
  },
  {
    rank: 4,
    bid_id: 'BID-2026-APEX-04',
    bidder_name: 'Apex Global Suppliers & Logistics',
    legal_name: 'Apex Global Engineering and Logistics Enterprise',
    pan: 'AADDA9988M',
    gstin: '09AADDA9988M1ZT',
    bid_amount_cr: 14.1,
    compliance_score: 28,
    statutory_score: 10,
    financial_score: 8,
    technical_score: 0,
    document_score: 0,
    local_content_score: 10,
    risk_level: 'CRITICAL',
    status: 'DISQUALIFIED',
    hard_constraints_passed: false,
    discrepancies_count: 3,
    officer_decision: 'REJECT'
  }
];

export const mockBids: Bid[] = [
  {
    bid_id: 'BID-2026-BHARAT-01',
    tender_id: 'TND-GEM-2026-001',
    bidder_name: 'Bharat Tactical & Safety Gear Pvt Ltd',
    legal_name: 'Bharat Tactical and Safety Gear Private Limited',
    pan: 'AABCB1234F',
    gstin: '07AABCB1234F1Z5',
    udyam_number: 'UDYAM-DL-02-0019283',
    cin: 'U74999DL2018PTC334120',
    bid_amount_cr: 12.8,
    submitted_at: '2026-08-20T14:30:00Z',
    status: 'QUALIFIED',
    compliance_score: 96,
    risk_level: 'LOW',
    compliance_status: 'QUALIFIED',
    discrepancy_count: 0,
    officer_decision: 'APPROVE',
    decision_remarks: 'All statutory, financial, and OEM technical requirements verified with 100% portal ground truth.',
    decision_by: 'Shri R. K. Sharma (Joint Director, GeM)',
    decision_at: '2026-08-26T16:45:00Z',
    documents: [
      { doc_id: 'DOC-B1-01', filename: 'Bharat_GST_Registration_Certificate.pdf', document_type: 'GST_CERTIFICATE', page_count: 2, sha256_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
      { doc_id: 'DOC-B1-02', filename: 'Bharat_Audited_Turnover_FY23_25.pdf', document_type: 'CA_AUDITED_BALANCE_SHEET', page_count: 5, sha256_hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08' },
      { doc_id: 'DOC-B1-03', filename: 'OEM_Authorization_Honeywell_2026.pdf', document_type: 'OEM_AUTHORIZATION_LETTER', page_count: 1, sha256_hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' },
      { doc_id: 'DOC-B1-04', filename: 'Local_Content_MII_Self_Declaration.pdf', document_type: 'LOCAL_CONTENT_DECLARATION', page_count: 2, sha256_hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a' }
    ]
  },
  {
    bid_id: 'BID-2026-SURYA-02',
    tender_id: 'TND-GEM-2026-001',
    bidder_name: 'Surya Infotech & Safety Solutions Pvt Ltd',
    legal_name: 'Surya Infotech and Safety Solutions Private Limited',
    pan: 'AACCS8899K',
    gstin: '27AACCS8899K1ZB',
    udyam_number: 'UDYAM-MH-18-0044192',
    cin: 'U29300MH2019PTC112349',
    bid_amount_cr: 13.5,
    submitted_at: '2026-08-21T11:15:00Z',
    status: 'REVIEW_REQUIRED',
    compliance_score: 84,
    risk_level: 'MEDIUM',
    compliance_status: 'REVIEW_REQUIRED',
    discrepancy_count: 1,
    officer_decision: 'HOLD',
    decision_remarks: 'Address mismatch between Udyam certificate (Pune Plant) and GST Principal Place of Business (Mumbai HQ). Clarification requested.',
    decision_by: 'Shri R. K. Sharma (Joint Director, GeM)',
    decision_at: '2026-08-26T17:10:00Z',
    documents: [
      { doc_id: 'DOC-S2-01', filename: 'Surya_GSTN_Certificate.pdf', document_type: 'GST_CERTIFICATE', page_count: 2 },
      { doc_id: 'DOC-S2-02', filename: 'Surya_Udyam_MSME_Proof.pdf', document_type: 'UDYAM_CERTIFICATE', page_count: 1 },
      { doc_id: 'DOC-S2-03', filename: 'CA_Turnover_FY24.pdf', document_type: 'CA_AUDITED_BALANCE_SHEET', page_count: 3 },
      { doc_id: 'DOC-S2-04', filename: 'OEM_Partner_Cert.pdf', document_type: 'OEM_AUTHORIZATION_LETTER', page_count: 1 }
    ]
  },
  {
    bid_id: 'BID-2026-ZENITH-03',
    tender_id: 'TND-GEM-2026-001',
    bidder_name: 'Zenith Import & Trade LLP',
    legal_name: 'Zenith Global Import and Trading LLP',
    pan: 'ABBZZ4411P',
    gstin: '06ABBZZ4411P1Z2',
    bid_amount_cr: 11.2,
    submitted_at: '2026-08-22T09:40:00Z',
    status: 'DISQUALIFIED',
    compliance_score: 52,
    risk_level: 'HIGH',
    compliance_status: 'DISQUALIFIED',
    discrepancy_count: 2,
    officer_decision: 'REJECT',
    decision_remarks: 'Mandatory OEM Authorization missing. Local content is 32%, violating the 50% minimum Make-in-India tender mandate.',
    decision_by: 'Shri R. K. Sharma (Joint Director, GeM)',
    decision_at: '2026-08-26T17:30:00Z',
    documents: [
      { doc_id: 'DOC-Z3-01', filename: 'Zenith_GST_Copy.pdf', document_type: 'GST_CERTIFICATE', page_count: 2 },
      { doc_id: 'DOC-Z3-02', filename: 'Trading_Turnover_Report.pdf', document_type: 'CA_AUDITED_BALANCE_SHEET', page_count: 4 }
    ]
  },
  {
    bid_id: 'BID-2026-APEX-04',
    tender_id: 'TND-GEM-2026-001',
    bidder_name: 'Apex Global Suppliers & Logistics',
    legal_name: 'Apex Global Engineering and Logistics Enterprise',
    pan: 'AADDA9988M',
    gstin: '09AADDA9988M1ZT',
    bid_amount_cr: 14.1,
    submitted_at: '2026-08-23T16:20:00Z',
    status: 'DISQUALIFIED',
    compliance_score: 28,
    risk_level: 'CRITICAL',
    compliance_status: 'DISQUALIFIED',
    discrepancy_count: 3,
    officer_decision: 'REJECT',
    decision_remarks: 'Critical Discrepancy: Uploaded GST claimed active, but live GSTN portal returns "Cancelled on 12-Jul-2026". Entity found on Ministry Debarment list.',
    decision_by: 'Shri R. K. Sharma (Joint Director, GeM)',
    decision_at: '2026-08-26T17:45:00Z',
    documents: [
      { doc_id: 'DOC-A4-01', filename: 'Apex_Claimed_GST.pdf', document_type: 'GST_CERTIFICATE', page_count: 1 },
      { doc_id: 'DOC-A4-02', filename: 'Old_PO_Records.pdf', document_type: 'EXPERIENCE_CERTIFICATE', page_count: 2 }
    ]
  }
];

export const mockBidDetails: Record<string, { bid: Bid; tender: Tender; compliance_score: ComplianceScore; evidence: Evidence[] }> = {
  'BID-2026-BHARAT-01': {
    bid: mockBids[0],
    tender: mockTenders[0],
    compliance_score: {
      total_score: 96,
      statutory_score: 30,
      financial_score: 20,
      technical_score: 10,
      document_score: 21,
      local_content_score: 15,
      risk_level: 'LOW',
      hard_constraints_passed: true,
      status: 'QUALIFIED',
      discrepancies: [],
      requirement_evaluations: [
        {
          requirement_id: 'REQ-GST-01',
          name: 'Mandatory GST Registration (Active Status)',
          category: 'STATUTORY',
          mandatory: true,
          status: 'PASS',
          is_hard_constraint_met: true,
          soft_score_earned: 15,
          max_soft_score: 15,
          expected_value: true,
          extracted_value: true,
          display_value: '07AABCB1234F1Z5 • Active Regular Taxpayer',
          evidence_id: 'EVI-B1-GST',
          source_doc_name: 'Bharat_GST_Registration_Certificate.pdf',
          source_page: 1,
          source_text: 'Government of India Form GST REG-06: Legal Name: Bharat Tactical and Safety Gear Private Limited. GSTIN: 07AABCB1234F1Z5. Status: Active.',
          norm_box: [120, 240, 480, 290],
          verification_source: 'GSTN Government Registry (Live API)',
          rule_explanation: 'Active registration confirmed against Central GSTN database. Legal name and PAN match 100%.'
        },
        {
          requirement_id: 'REQ-PAN-01',
          name: 'Valid Income Tax PAN & Entity Verification',
          category: 'STATUTORY',
          mandatory: true,
          status: 'PASS',
          is_hard_constraint_met: true,
          soft_score_earned: 15,
          max_soft_score: 15,
          expected_value: true,
          extracted_value: true,
          display_value: 'AABCB1234F • Valid Corporate Entity',
          evidence_id: 'EVI-B1-PAN',
          source_doc_name: 'Bharat_GST_Registration_Certificate.pdf',
          source_page: 1,
          source_text: 'PAN AABCB1234F registered with Income Tax Department under category Company/Corporation.',
          verification_source: 'CBDT Income Tax Database',
          rule_explanation: 'PAN is valid, active, and belongs to the registered enterprise.'
        },
        {
          requirement_id: 'REQ-TURNOVER-01',
          name: 'Minimum Average Annual Turnover (Last 3 Financial Years)',
          category: 'FINANCIAL',
          mandatory: true,
          status: 'PASS',
          is_hard_constraint_met: true,
          soft_score_earned: 20,
          max_soft_score: 20,
          expected_value: 5.0,
          extracted_value: 18.5,
          display_value: '₹ 18.50 Cr Avg (Exceeds ₹5.0 Cr)',
          evidence_id: 'EVI-B1-TO',
          source_doc_name: 'Bharat_Audited_Turnover_FY23_25.pdf',
          source_page: 2,
          source_text: 'Chartered Accountant Certificate: FY 2022-23: ₹16.20 Cr | FY 2023-24: ₹18.80 Cr | FY 2024-25: ₹20.50 Cr. 3-Year Weighted Average: ₹18.50 Crores.',
          norm_box: [150, 410, 520, 480],
          verification_source: 'ICAI UDIN Audited Financial Statement',
          rule_explanation: 'Average turnover of ₹18.50 Cr comfortably satisfies the tender threshold of ₹5.00 Cr.'
        },
        {
          requirement_id: 'REQ-MII-01',
          name: 'Make-in-India (MII) Local Content Declaration',
          category: 'LOCAL_CONTENT',
          mandatory: true,
          status: 'PASS',
          is_hard_constraint_met: true,
          soft_score_earned: 15,
          max_soft_score: 15,
          expected_value: 50.0,
          extracted_value: 62.5,
          display_value: '62.50% (Class-I Local Supplier)',
          evidence_id: 'EVI-B1-MII',
          source_doc_name: 'Local_Content_MII_Self_Declaration.pdf',
          source_page: 1,
          source_text: 'Self-declaration of local value addition: Domestic manufacturing & assembly at Manesar, Haryana plant contributes 62.5% of total BOM cost.',
          verification_source: 'DPIIT Make-in-India Verification Matrix',
          rule_explanation: 'Local content meets Class-I supplier criteria (>= 50%).'
        },
        {
          requirement_id: 'REQ-OEM-01',
          name: 'Manufacturer OEM Authorization Certificate (Annexure IV)',
          category: 'TECHNICAL',
          mandatory: true,
          status: 'PASS',
          is_hard_constraint_met: true,
          soft_score_earned: 10,
          max_soft_score: 10,
          expected_value: true,
          extracted_value: true,
          display_value: 'Valid OEM Authorization (Honeywell Safety)',
          evidence_id: 'EVI-B1-OEM',
          source_doc_name: 'OEM_Authorization_Honeywell_2026.pdf',
          source_page: 1,
          source_text: 'Honeywell Safety Products India Pvt Ltd hereby authorizes Bharat Tactical & Safety Gear Pvt Ltd as an exclusive bidder for Tender GEM/2026/B/891240. Validity: Dec 2027.',
          norm_box: [100, 300, 550, 360],
          verification_source: 'OEM Partner Verification Protocol',
          rule_explanation: 'OEM authorization explicitly names this GeM tender and is valid throughout the contract term.'
        }
      ]
    },
    evidence: [
      {
        evidence_id: 'EVI-B1-GST',
        tender_id: 'TND-GEM-2026-001',
        bid_id: 'BID-2026-BHARAT-01',
        requirement_id: 'REQ-GST-01',
        doc_id: 'DOC-B1-01',
        document_name: 'Bharat_GST_Registration_Certificate.pdf',
        page_number: 1,
        field_name: 'GSTIN Registration & Status',
        extracted_value: { gstin: '07AABCB1234F1Z5', status: 'ACTIVE', legal_name: 'Bharat Tactical and Safety Gear Private Limited' },
        display_value: '07AABCB1234F1Z5 • Active',
        source_text: 'Government of India Form GST REG-06: Legal Name: Bharat Tactical and Safety Gear Private Limited. GSTIN: 07AABCB1234F1Z5. Status: Active.',
        confidence: 0.99,
        norm_box: [120, 240, 480, 290],
        admin_status: 'APPROVED',
        reviewed_by: 'Shri R. K. Sharma',
        reviewed_at: '2026-08-26T16:30:00Z',
        review_notes: 'Verified against GSTN live registry.'
      },
      {
        evidence_id: 'EVI-B1-TO',
        tender_id: 'TND-GEM-2026-001',
        bid_id: 'BID-2026-BHARAT-01',
        requirement_id: 'REQ-TURNOVER-01',
        doc_id: 'DOC-B1-02',
        document_name: 'Bharat_Audited_Turnover_FY23_25.pdf',
        page_number: 2,
        field_name: '3-Year Average Turnover',
        extracted_value: 18.5,
        display_value: '₹ 18.50 Crores',
        source_text: 'Chartered Accountant Certificate: FY 2022-23: ₹16.20 Cr | FY 2023-24: ₹18.80 Cr | FY 2024-25: ₹20.50 Cr. 3-Year Weighted Average: ₹18.50 Crores.',
        confidence: 0.98,
        norm_box: [150, 410, 520, 480],
        admin_status: 'APPROVED',
        reviewed_by: 'Shri R. K. Sharma',
        reviewed_at: '2026-08-26T16:32:00Z'
      }
    ]
  },
  'BID-2026-SURYA-02': {
    bid: mockBids[1],
    tender: mockTenders[0],
    compliance_score: {
      total_score: 84,
      statutory_score: 28,
      financial_score: 20,
      technical_score: 10,
      document_score: 14,
      local_content_score: 12,
      risk_level: 'MEDIUM',
      hard_constraints_passed: true,
      status: 'REVIEW_REQUIRED',
      discrepancies: [
        {
          title: 'Cross-Document Address Discrepancy (Udyam vs GSTN)',
          description: 'Udyam Registration indicates manufacturing premises in Pune (Plot 44, Bhosari MIDC), whereas GST Principal Place of Business is registered in Andheri East, Mumbai.',
          severity: 'MEDIUM',
          affected_requirements: ['REQ-MSME-01', 'REQ-GST-01'],
          source_docs: ['Surya_Udyam_MSME_Proof.pdf', 'Surya_GSTN_Certificate.pdf'],
          expected_value: 'Identical registered address or additional place of business declaration',
          found_value: 'Different cities without sub-unit endorsement in submitted GST certificate'
        }
      ],
      requirement_evaluations: [
        {
          requirement_id: 'REQ-GST-01',
          name: 'Mandatory GST Registration (Active Status)',
          category: 'STATUTORY',
          mandatory: true,
          status: 'PASS',
          is_hard_constraint_met: true,
          soft_score_earned: 15,
          max_soft_score: 15,
          expected_value: true,
          extracted_value: true,
          display_value: '27AACCS8899K1ZB • Active',
          verification_source: 'GSTN Government Registry',
          rule_explanation: 'Active GST registration confirmed.'
        },
        {
          requirement_id: 'REQ-MSME-01',
          name: 'Udyam / MSME Registration Certificate',
          category: 'ELIGIBILITY',
          mandatory: false,
          status: 'REVIEW_REQUIRED',
          is_hard_constraint_met: true,
          soft_score_earned: 6,
          max_soft_score: 10,
          expected_value: 'VALID_UDYAM',
          extracted_value: 'UDYAM-MH-18-0044192',
          display_value: 'UDYAM-MH-18-0044192 (Address Review Needed)',
          source_doc_name: 'Surya_Udyam_MSME_Proof.pdf',
          source_page: 1,
          source_text: 'Enterprise Name: Surya Infotech and Safety Solutions Pvt Ltd. Unit Address: Plot 44, Bhosari MIDC, Pune 411026.',
          verification_source: 'MSME Udyam Portal',
          rule_explanation: 'Valid MSME certificate but plant address requires manual verification.'
        },
        {
          requirement_id: 'REQ-TURNOVER-01',
          name: 'Minimum Average Annual Turnover',
          category: 'FINANCIAL',
          mandatory: true,
          status: 'PASS',
          is_hard_constraint_met: true,
          soft_score_earned: 20,
          max_soft_score: 20,
          expected_value: 5.0,
          extracted_value: 7.2,
          display_value: '₹ 7.20 Cr (Meets threshold)',
          verification_source: 'CA Turnover Certificate',
          rule_explanation: 'Turnover meets the requirement.'
        }
      ]
    },
    evidence: []
  },
  'BID-2026-ZENITH-03': {
    bid: mockBids[2],
    tender: mockTenders[0],
    compliance_score: {
      total_score: 52,
      statutory_score: 30,
      financial_score: 12,
      technical_score: 0,
      document_score: 0,
      local_content_score: 10,
      risk_level: 'HIGH',
      hard_constraints_passed: false,
      status: 'DISQUALIFIED',
      discrepancies: [
        {
          title: 'Mandatory OEM Authorization Missing (Annexure IV)',
          description: 'The tender explicitly requires an authorized dealership / OEM endorsement letter. No corresponding document was found in submitted package.',
          severity: 'CRITICAL',
          affected_requirements: ['REQ-OEM-01'],
          source_docs: ['Missing Annexure IV'],
          expected_value: 'OEM Authorization from accredited manufacturer',
          found_value: 'MISSING'
        },
        {
          title: 'Make-in-India Local Content Below Threshold',
          description: 'Self-declared local content is 32.0%, which falls below the mandatory 50.0% Class-I threshold.',
          severity: 'HIGH',
          affected_requirements: ['REQ-MII-01'],
          source_docs: ['Trading_Turnover_Report.pdf'],
          expected_value: '>= 50.0%',
          found_value: '32.0%'
        }
      ],
      requirement_evaluations: [
        {
          requirement_id: 'REQ-OEM-01',
          name: 'Manufacturer OEM Authorization Certificate (Annexure IV)',
          category: 'TECHNICAL',
          mandatory: true,
          status: 'MISSING',
          is_hard_constraint_met: false,
          soft_score_earned: 0,
          max_soft_score: 10,
          expected_value: true,
          extracted_value: null,
          display_value: 'NOT FOUND / MISSING',
          verification_source: 'Document AI Classification',
          rule_explanation: 'Mandatory OEM authorization document was omitted from the submission.'
        }
      ]
    },
    evidence: []
  },
  'BID-2026-APEX-04': {
    bid: mockBids[3],
    tender: mockTenders[0],
    compliance_score: {
      total_score: 28,
      statutory_score: 10,
      financial_score: 8,
      technical_score: 0,
      document_score: 0,
      local_content_score: 10,
      risk_level: 'CRITICAL',
      hard_constraints_passed: false,
      status: 'DISQUALIFIED',
      discrepancies: [
        {
          title: '🚨 Government Data Contradiction: GSTN Registration Cancelled',
          description: 'Uploaded document claims GSTIN is Active. Live GSTN API returns status "CANCELLED" effective 12-Jul-2026 due to non-filing of GSTR-3B.',
          severity: 'CRITICAL',
          affected_requirements: ['REQ-GST-01'],
          source_docs: ['Apex_Claimed_GST.pdf', 'GSTN Live Registry'],
          expected_value: 'Active GSTIN in Central Registry',
          found_value: 'CANCELLED (Tax default)'
        },
        {
          title: 'Entity Listed on Debarment / Caution List',
          description: 'Entity PAN matched Central Public Procurement Portal (CPPP) debarred supplier registry.',
          severity: 'CRITICAL',
          affected_requirements: ['STATUTORY_ELIGIBILITY'],
          source_docs: ['Central Debarment Registry'],
          expected_value: 'Clean statutory record',
          found_value: 'Debarred until 31-Dec-2026'
        }
      ],
      requirement_evaluations: [
        {
          requirement_id: 'REQ-GST-01',
          name: 'Mandatory GST Registration (Active Status)',
          category: 'STATUTORY',
          mandatory: true,
          status: 'CONTRADICTED',
          is_hard_constraint_met: false,
          soft_score_earned: 0,
          max_soft_score: 15,
          expected_value: true,
          extracted_value: false,
          display_value: '09AADDA9988M1ZT • CANCELLED in GSTN Registry',
          verification_source: 'GSTN Live Registry Query',
          rule_explanation: 'Government API directly contradicts uploaded document. GSTIN is inactive.'
        }
      ]
    },
    evidence: []
  }
};

export const mockAuditTrail: AuditLog[] = [
  {
    log_id: 'LOG-2026-001',
    timestamp: '2026-08-26T16:30:15Z',
    tender_id: 'TND-GEM-2026-001',
    bid_id: 'BID-2026-BHARAT-01',
    actor: 'SYSTEM_OCR_AI',
    action: 'DOCUMENT_CLASSIFICATION_COMPLETE',
    entity_type: 'BID',
    entity_id: 'BID-2026-BHARAT-01',
    notes: '4 documents parsed, classified with 98.4% average OCR confidence. SHA-256 hashes generated.'
  },
  {
    log_id: 'LOG-2026-002',
    timestamp: '2026-08-26T16:30:20Z',
    tender_id: 'TND-GEM-2026-001',
    bid_id: 'BID-2026-BHARAT-01',
    actor: 'GSTN_CONNECTOR',
    action: 'PORTAL_REGISTRY_QUERY',
    entity_type: 'GSTIN',
    entity_id: '07AABCB1234F1Z5',
    notes: 'GSTN verification response: ACTIVE. Legal name matches: Bharat Tactical and Safety Gear Private Limited.'
  },
  {
    log_id: 'LOG-2026-003',
    timestamp: '2026-08-26T16:30:25Z',
    tender_id: 'TND-GEM-2026-001',
    bid_id: 'BID-2026-BHARAT-01',
    actor: 'RULE_EVAL_ENGINE',
    action: 'DETERMINISTIC_EVALUATION',
    entity_type: 'BID_EVALUATION',
    entity_id: 'BID-2026-BHARAT-01',
    notes: 'All 7 rules passed. Overall compliance score: 96/100. Risk level: LOW.'
  },
  {
    log_id: 'LOG-2026-004',
    timestamp: '2026-08-26T16:45:00Z',
    tender_id: 'TND-GEM-2026-001',
    bid_id: 'BID-2026-BHARAT-01',
    actor: 'Shri R. K. Sharma (Joint Director, GeM)',
    action: 'OFFICER_FINAL_DECISION',
    entity_type: 'BID_DECISION',
    entity_id: 'BID-2026-BHARAT-01',
    notes: 'Procurement Officer accepted AI recommendation and marked bidder QUALIFIED. Digital signature recorded.'
  },
  {
    log_id: 'LOG-2026-005',
    timestamp: '2026-08-26T17:10:00Z',
    tender_id: 'TND-GEM-2026-001',
    bid_id: 'BID-2026-SURYA-02',
    actor: 'Shri R. K. Sharma (Joint Director, GeM)',
    action: 'OFFICER_DECISION_HOLD',
    entity_type: 'BID_DECISION',
    entity_id: 'BID-2026-SURYA-02',
    notes: 'Address discrepancy flagged between Udyam and GSTN. Official clarification requested under Rule 173(iv).'
  },
  {
    log_id: 'LOG-2026-006',
    timestamp: '2026-08-26T17:45:00Z',
    tender_id: 'TND-GEM-2026-001',
    bid_id: 'BID-2026-APEX-04',
    actor: 'Shri R. K. Sharma (Joint Director, GeM)',
    action: 'OFFICER_DECISION_REJECT',
    entity_type: 'BID_DECISION',
    entity_id: 'BID-2026-APEX-04',
    notes: 'Disqualified due to cancelled GST status and presence on debarred list. Incident flagged for vigilance review.'
  }
];
