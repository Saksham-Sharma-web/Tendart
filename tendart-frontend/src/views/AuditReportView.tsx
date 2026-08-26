import React from 'react';
import {
  Tender,
  Bid,
  ComplianceScore,
  AuditLog
} from '../types';
import {
  History,
  ShieldCheck,
  Download,
  Printer,
  FileCheck,
  CheckCircle,
  Clock,
  Layers,
  ArrowLeft
} from 'lucide-react';

interface Props {
  tender: Tender;
  bid?: Bid;
  complianceScore?: ComplianceScore;
  auditTrail: AuditLog[];
  onNavigate: (view: string) => void;
}

export const AuditReportView: React.FC<Props> = ({
  tender,
  bid,
  complianceScore,
  auditTrail,
  onNavigate
}) => {
  return (
    <div className="max-w-[1360px] mx-auto w-full space-y-6">
      {/* Top Banner */}
      <div className="gov-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2.5 py-0.5 rounded border border-[#D0E2F2]">
              Forensic Audit Dossier
            </span>
            <span className="text-xs text-[#5F6B76]">Tender: {tender.tender_number}</span>
          </div>
          <h1 className="text-xl font-bold text-[#17212B]">Cryptographic Audit & Provenance Ledger</h1>
          <p className="text-xs text-[#5F6B76]">
            Immutable record of all AI extractions, government API responses, and human officer decisions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="gov-btn-primary h-9 px-4 text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Dossier</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="gov-card overflow-hidden">
        <div className="p-4 bg-[#FFFFFF] border-b border-[#E1E6EA] flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#17212B]">Event Provenance Timeline ({auditTrail.length} Events)</h2>
          <span className="text-xs text-[#5F6B76]">SHA-256 Verified Ledger</span>
        </div>

        <table className="w-full gov-table text-left">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor / System</th>
              <th>Action Type</th>
              <th>Entity ID</th>
              <th>Audit Note & Provenance</th>
            </tr>
          </thead>
          <tbody>
            {auditTrail.map((log) => (
              <tr key={log.log_id}>
                <td className="font-mono text-[#5F6B76] text-xs whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </td>
                <td><span className="font-semibold text-[#17212B] text-xs">{log.actor}</span></td>
                <td>
                  <span className="text-xs font-semibold text-[#124B7A] bg-[#EBF3FA] px-2 py-0.5 rounded border border-[#D0E2F2]">
                    {log.action}
                  </span>
                </td>
                <td><span className="font-mono text-[#5F6B76] text-xs">{log.entity_id}</span></td>
                <td><span className="text-[#5F6B76] text-xs">{log.notes}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
