
import React, { useState } from 'react';
import { Case, CaseStatus, ServiceDetail, MilestoneStatus } from '../types';
import { Icons } from '../constants';
import MilestoneModal from './MilestoneModal';
import HistoryModal from './HistoryModal';

interface CaseTableProps {
  cases: Case[];
  onShowDetails: (caseItem: Case) => void;
  onUpdateMilestone: (caseId: string, serviceId: string, key: string, data: any) => void;
  onAddHistory: (caseId: string, serviceId: string, description: string, type: 'change' | 'observation' | 'system') => void;
}

const CaseTable: React.FC<CaseTableProps> = ({ cases, onShowDetails, onUpdateMilestone, onAddHistory }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingMilestone, setEditingMilestone] = useState<{caseId: string, serviceId: string, milestoneKey: string, label: string} | null>(null);
  const [historyService, setHistoryService] = useState<{caseId: string, serviceId: string, label: string, history: any[]} | null>(null);

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusStyle = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.PENDING:
        return "bg-amber-100 text-amber-700";
      case CaseStatus.SERVICED:
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case CaseStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case CaseStatus.CANCELLED:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMilestoneColor = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed': return 'bg-emerald-600 text-white shadow-emerald-600/20';
      case 'pending': return 'bg-amber-400 text-white shadow-amber-400/20';
      case 'expired': return 'bg-red-500 text-white shadow-red-500/20';
      default: return 'bg-gray-100 text-gray-300';
    }
  };

  const handleSaveMilestone = (key: string, data: any) => {
    if (editingMilestone) {
      onUpdateMilestone(editingMilestone.caseId, editingMilestone.serviceId, key, data);
      setEditingMilestone(null);
    }
  };

  const renderServiceRow = (service: ServiceDetail, caseId: string) => {
    const isProgrammed = service.metadata?.servicio_programado;
    const metadata = service.metadata || {};
    
    // Calcular progreso de seguimiento
    const milestones = [
      { key: 'confirmacion', label: 'C' },
      { key: 'seguimiento50', label: '50' },
      { key: 'seguimiento75', label: '75' },
      { key: 'seguimiento100', label: '100' },
      { key: 'seguimiento200', label: '200' },
      { key: 'reporte', label: 'R' }
    ];

    return (
      <div key={service.id} className="grid grid-cols-12 items-center p-3 bg-gray-50/30 rounded-lg border border-gray-100 hover:border-emerald-100 transition-all gap-4">
        {/* AUTORIZACIÓN */}
        <div className="col-span-2 flex flex-col">
          <span className="font-mono font-bold text-emerald-800 text-xs">{service.authNumber}</span>
        </div>

        {/* SERVICIO */}
        <div className="col-span-2 flex flex-col">
          <span className="text-xs font-bold text-gray-800">{service.serviceType}</span>
        </div>

        {/* PROVEEDOR */}
        <div className="col-span-3">
          {service.providerName ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center text-[9px] text-emerald-700 font-bold shrink-0">
                {service.providerName.charAt(0)}
              </div>
              <span className="text-[11px] font-semibold text-gray-600 truncate">{service.providerName}</span>
            </div>
          ) : (
            <div className="inline-flex items-center px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
              Pendiente asignar proveedor
            </div>
          )}
        </div>

        {/* SEGUIMIENTO */}
        <div className="col-span-3 flex items-center gap-1.5">
          {milestones.map((m) => {
            const mState = metadata[m.key as keyof typeof metadata] as any;
            const status = mState?.status || 'none';
            const isActive = ['pending', 'expired', 'completed'].includes(status);
            const canEdit = status === 'pending' || status === 'expired';

            return (
              <button 
                key={m.key}
                title={m.label}
                disabled={!canEdit}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingMilestone({ caseId, serviceId: service.id, milestoneKey: m.key, label: m.label });
                }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-[8px] font-black transition-all shadow-sm ${getMilestoneColor(status)} ${canEdit ? 'hover:scale-110 active:scale-95 cursor-pointer ring-2 ring-white' : 'cursor-default'}`}
              >
                {status === 'completed' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : m.label}
              </button>
            );
          })}
        </div>

        {/* MODALIDAD */}
        <div className="col-span-2 flex flex-col items-end gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setHistoryService({ 
                caseId, 
                serviceId: service.id, 
                label: `${service.serviceType} - ${service.authNumber}`, 
                history: service.history || [] 
              });
            }}
            className="p-1 hover:bg-emerald-50 rounded-lg text-gray-400 hover:text-emerald-600 transition-all group/hist"
            title="Ver Historial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/hist:rotate-[360deg] duration-500 transition-transform"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </button>
          <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${isProgrammed ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {isProgrammed ? 'Programado' : 'Emergencia'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">CASO</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">PLACA/CÉDULA</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Fecha</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Hora</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Responsable</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Cola Asignada</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cases.map((c) => {
              return (
                <React.Fragment key={c.id}>
                  <tr className={`transition-colors ${expandedId === c.id ? 'bg-gray-50' : 'hover:bg-gray-50/40'}`}>
                    <td className="px-6 py-5 text-gray-400 text-sm font-medium">{c.systemId}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span 
                          className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer transition-colors"
                          onClick={(e) => { e.stopPropagation(); onShowDetails(c); }}
                        >
                          {c.siabNumber}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-600 font-bold font-mono tracking-tight">{c.plate}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyle(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-600 text-sm whitespace-nowrap">{c.requestDate}</td>
                    <td className="px-6 py-5 text-gray-500 text-sm">{c.requestTime}</td>
                    <td className="px-6 py-5 text-gray-700 text-sm font-medium">{c.responsable}</td>
                    <td className="px-6 py-5 text-gray-600 text-sm">{c.assignedQueue}</td>
                    <td className="px-6 py-5">
                      <button 
                        onClick={(e) => toggleExpand(e, c.id)}
                        className={`p-2 rounded-lg transition-all duration-200 border ${
                          expandedId === c.id 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                            : 'bg-white border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-200'
                        }`}
                      >
                        {expandedId === c.id ? <Icons.Minus /> : <Icons.Plus />}
                      </button>
                    </td>
                  </tr>
                  {expandedId === c.id && (
                    <tr className="bg-gray-50/30">
                      <td colSpan={9} className="px-8 py-6">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md animate-in slide-in-from-top-2">
                          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Servicios Autorizados</h4>
                          </div>
                          
                          <div className="p-4 space-y-2">
                            {/* Cabecera Interna */}
                            <div className="grid grid-cols-12 gap-4 px-3 mb-1">
                              <div className="col-span-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Autorización</div>
                              <div className="col-span-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Servicio</div>
                              <div className="col-span-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Proveedor</div>
                              <div className="col-span-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Seguimiento</div>
                              <div className="col-span-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest text-right">Modalidad</div>
                            </div>
                            
                            {/* Lista de Servicios */}
                            {c.services.map((service) => renderServiceRow(service, c.id))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Mostrando {cases.length} casos de 100 resultados</span>
        <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors text-xs font-bold uppercase tracking-wider disabled:opacity-30">
              Anterior
            </button>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-lg border border-emerald-800 bg-emerald-800 text-xs font-bold text-white shadow-sm">1</button>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50">2</button>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50">3</button>
              <span className="px-2 py-1.5 text-gray-400 font-bold">...</span>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50">10</button>
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors text-xs font-bold uppercase tracking-wider">
              Siguiente
            </button>
        </div>
      </div>
      
      {editingMilestone && (
        <MilestoneModal 
          label={editingMilestone.label}
          milestoneKey={editingMilestone.milestoneKey}
          onClose={() => setEditingMilestone(null)}
          onSave={handleSaveMilestone}
        />
      )}

      {historyService && (
        <HistoryModal 
          label={historyService.label}
          history={historyService.history}
          onClose={() => setHistoryService(null)}
          onAddObservation={(obs) => {
            onAddHistory(historyService.caseId, historyService.serviceId, obs, 'observation');
            // Optimistic update for local modal state if needed, but better sync from props
            setHistoryService(null);
          }}
        />
      )}
    </div>
  );
};

export default CaseTable;
