
import React, { useState, useEffect } from 'react';
import { Case, ServiceDetail, ServiceType, MilestoneStatus } from '../types';
import MilestoneModal from './MilestoneModal';
import { Icons } from '../constants';

interface CaseDetailsViewProps {
  caseData: Case;
  onBack: () => void;
  onUpdateMilestone: (caseId: string, serviceId: string, key: string, data: any) => void;
  onAddService?: (caseId: string, service: Omit<ServiceDetail, 'id'>) => void;
  onDeleteService?: (caseId: string, serviceId: string) => void;
}

// Mock de directorio de proveedores disponibles con puntaje 1-10
const POTENTIAL_PROVIDERS = [
  { id: 'p1', name: 'Grúas Rápidas Medellín', phone: '312 445 6677', rating: 9.8 },
  { id: 'p2', name: 'Asistencias Pro-Vial', phone: '300 889 1122', rating: 8.5 },
  { id: 'p3', name: 'Transportes Express ABC', phone: '315 223 3344', rating: 9.2 },
  { id: 'p4', name: 'Servicios de Rescate 24/7', phone: '320 556 7788', rating: 7.2 },
].sort((a, b) => b.rating - a.rating);

const ProviderSelector: React.FC<{ 
  onSelect: (name: string) => void;
  currentProvider?: string;
}> = ({ onSelect, currentProvider }) => {
  return (
    <div className="bg-white border border-emerald-100 rounded-2xl shadow-2xl shadow-emerald-900/10 overflow-hidden animate-in zoom-in-95 duration-200 mt-2 ring-1 ring-black/5">
      <div className="px-4 py-3 bg-emerald-50/50 border-b border-emerald-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Directorio de Proveedores</span>
        <span className="text-[9px] text-emerald-600 font-extrabold bg-white px-2 py-0.5 rounded border border-emerald-100">Puntaje 1 - 10</span>
      </div>
      <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
        {POTENTIAL_PROVIDERS.map((provider) => (
          <div 
            key={provider.id} 
            onClick={() => onSelect(provider.name)}
            className={`p-4 flex items-center justify-between cursor-pointer transition-all hover:bg-emerald-50 group ${currentProvider === provider.name ? 'bg-emerald-50/30' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentProvider === provider.name ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-gray-100 text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 group-hover:rotate-3'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </div>
              <div>
                <h6 className="text-[12px] font-bold text-gray-800 group-hover:text-emerald-900 transition-colors">{provider.name}</h6>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] font-black flex items-center gap-1 ${provider.rating >= 9 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    {provider.rating.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-tight">|</span>
                  <span className="text-[10px] text-gray-500 font-bold tracking-tight">{provider.phone}</span>
                </div>
              </div>
            </div>
            {currentProvider === provider.name ? (
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            ) : (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceItem: React.FC<{ 
  service: ServiceDetail; 
  renderDetails: (s: ServiceDetail) => React.ReactNode;
  onAssignProvider: (id: string, name: string) => void;
  onDeleteService?: (serviceId: string) => void;
}> = ({ service, renderDetails, onAssignProvider, onDeleteService }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProviderSelect, setShowProviderSelect] = useState(false);
  const isProgrammed = service.metadata?.servicio_programado;

  const handleProviderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextShowState = !showProviderSelect;
    setShowProviderSelect(nextShowState);
    
    // REQUISITO: Al desplegar menú de proveedores, también desplegar detalle del servicio
    if (nextShowState) {
      setIsOpen(true);
    }
  };

  const handleSelectProvider = (name: string) => {
    onAssignProvider(service.id, name);
    setShowProviderSelect(false);
  };

  return (
    <div className="border-b border-gray-100 last:border-0 overflow-hidden group">
      <div 
        className={`w-full text-left py-4 px-4 flex items-center transition-all ${isOpen ? 'bg-emerald-50/40' : 'bg-white hover:bg-gray-50/50'}`}
      >
        <div className="grid grid-cols-12 w-full items-center gap-4">
          <div className="col-span-2 cursor-pointer group/cell" onClick={() => setIsOpen(!isOpen)}>
            <span className="font-mono font-bold text-emerald-800 text-sm group-hover/cell:underline">{service.authNumber}</span>
          </div>
          <div className="col-span-3 cursor-pointer group/cell" onClick={() => setIsOpen(!isOpen)}>
            <span className="text-sm font-bold text-gray-800 group-hover/cell:text-emerald-700">{service.serviceType}</span>
          </div>
          
          <div className="col-span-4 relative">
            <button 
              onClick={handleProviderClick}
              className={`w-full text-left p-2 rounded-xl transition-all border flex items-center justify-between group/btn ${
                showProviderSelect 
                  ? 'bg-white border-emerald-400 shadow-lg ring-4 ring-emerald-50' 
                  : 'bg-transparent border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              {service.providerName ? (
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                    {service.providerName.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-gray-700 truncate">{service.providerName}</span>
                </div>
              ) : (
                <div className="inline-flex items-center px-2 py-1 bg-amber-50 border border-amber-100 rounded-lg text-[10px] font-bold text-amber-600 uppercase tracking-tighter animate-pulse">
                  Asignar Proveedor
                </div>
              )}
              <div className={`text-gray-300 group-hover/btn:text-emerald-500 transition-transform ${showProviderSelect ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </button>
            
            {showProviderSelect && (
              <div className="absolute top-full left-0 right-0 z-50 mt-2 min-w-[320px]">
                <ProviderSelector 
                  currentProvider={service.providerName} 
                  onSelect={handleSelectProvider} 
                />
              </div>
            )}
          </div>

          <div className="col-span-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
             <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${isProgrammed ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                {isProgrammed ? 'Programado' : 'Emergencia'}
             </span>
          </div>
          <div className="col-span-1 flex justify-end items-center gap-2">
            {onDeleteService && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('¿Está seguro de que desea eliminar este servicio?')) {
                    onDeleteService(service.id);
                  }
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100"
                title="Eliminar servicio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-emerald-100 text-emerald-700 rotate-180 shadow-inner' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="p-8 bg-gray-50/50 border-t border-emerald-100/30 animate-in slide-in-from-top-4 duration-500">
          {renderDetails(service)}
        </div>
      )}
    </div>
  );
};

const CaseDetailsView: React.FC<CaseDetailsViewProps> = ({ caseData, onBack, onUpdateMilestone, onAddService, onDeleteService }) => {
  const [services, setServices] = useState<ServiceDetail[]>(caseData.services);
  const [editingMilestone, setEditingMilestone] = useState<{serviceId: string, milestoneKey: string, label: string} | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState<{
    authNumber: string;
    serviceType: ServiceType;
    description: string;
    providerName: string;
  }>({
    authNumber: '',
    serviceType: 'Conductor elegido',
    description: '',
    providerName: ''
  });

  // Sincronizar servicios si caseData cambia desde afuera
  useEffect(() => {
    setServices(caseData.services);
  }, [caseData.services]);

  const handleAssignProvider = (serviceId: string, providerName: string) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, providerName } : s));
  };

  const getMilestoneColor = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed': return 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-2xl shadow-emerald-500/40';
      case 'pending': return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-2xl shadow-amber-400/40';
      case 'expired': return 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-2xl shadow-red-500/40';
      default: return 'bg-gray-100 text-gray-400 border-2 border-gray-200';
    }
  };

  const handleSaveMilestone = (key: string, data: any) => {
    if (editingMilestone) {
      onUpdateMilestone(caseData.id, editingMilestone.serviceId, key, data);
      setEditingMilestone(null);
    }
  };

  const handleAddService = () => {
    if (!newService.authNumber || !newService.description) return;
    
    const serviceToAdd: Omit<ServiceDetail, 'id'> = {
      authNumber: newService.authNumber,
      serviceType: newService.serviceType,
      description: newService.description,
      providerName: newService.providerName,
      metadata: {
        confirmacion: { status: 'none' },
        seguimiento50: { status: 'none' },
        seguimiento75: { status: 'none' },
        seguimiento100: { status: 'none' },
        seguimiento200: { status: 'none' },
        reporte: { status: 'none' }
      }
    };

    if (onAddService) {
      onAddService(caseData.id, serviceToAdd);
    }

    // Reset form and hide it
    setNewService({
      authNumber: '',
      serviceType: 'Conductor elegido',
      description: '',
      providerName: ''
    });
    setShowAddForm(false);
  };

  const handleCancelAddService = () => {
    // Reset form and hide it
    setNewService({
      authNumber: '',
      serviceType: 'Conductor elegido',
      description: '',
      providerName: ''
    });
    setShowAddForm(false);
  };

  const handleNewServiceChange = (field: keyof typeof newService, value: string) => {
    setNewService(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteService = (serviceId: string) => {
    if (onDeleteService) {
      onDeleteService(caseData.id, serviceId);
    }
  };

  const ALL_SERVICE_TYPES: ServiceType[] = [
    // Grupo Transporte/Conductores
    'Conductor elegido', 'Conductor Familiar', 'Trasporte para viajes', 
    'Trasporte de producto', 'Transporte ocupantes al destino/domicilio', 'translado documentos y mercancía',
    // Grupo Asistencia/Técnico
    'Abogado: Asistencia presencial', 'Abogado: Asistencia telefónica', 'Cerrajería autos', 
    'Carro taller por barada', 'Carro taller instalación de batería',
    // Grupo Grúas/Rescate
    'Deposito/custodia', 'Grúa salida custodia', 'Grua accidente', 'Gra accedente pesados', 
    'Grua varada', 'Grua varada pesados', 'moto grua', 'Rescate'
  ];

  const renderAttribute = (label: string, value: any, isAddress?: boolean, cityContext?: string) => {
    if (value === undefined || value === null || value === '') return null;
    const displayValue = typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value;
    
    return (
      <div className="flex flex-col mb-4 last:mb-0">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">{label}</span>
        {isAddress ? (
            <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${displayValue}${cityContext ? ', ' + cityContext : ''}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="text-[13px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group/link"
            >
            {displayValue}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover/link:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
        ) : (
          <span className="text-[13px] font-bold text-gray-800 leading-tight">{displayValue}</span>
        )}
      </div>
    );
  };

  const renderServiceDetails = (service: ServiceDetail) => {
    const { metadata } = service;
    if (!metadata) return null;

    // REQUISITO: Si el servicio no tiene destino (dirección o ciudad), no debe aparecer la sección
    const hasDestination = !!(metadata.direccion_destino || metadata.ciudad_destino);

    return (
      <div className="space-y-10">
        <div className={`grid grid-cols-1 ${hasDestination ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-10`}>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-8 rounded-3xl border-2 border-emerald-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200 rounded-full -mr-20 -mt-20 opacity-30"></div>
              <h5 className="text-xs font-black text-emerald-800 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 relative z-10">
                <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></span> Origen / Recogida
              </h5>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 relative z-10">
                {renderAttribute('Departamento', metadata.departamento)}
                {renderAttribute('Ciudad', metadata.ciudad_origen)}
                <div className="col-span-2 border-t-2 border-emerald-200 pt-4 mt-2">
                  {renderAttribute('Dirección Exacta', metadata.direccion_recogida || metadata.direccion, true, metadata.ciudad_origen)}
                </div>
              </div>
            </div>
            {metadata.observaciones && (
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-3xl border-2 border-blue-200 relative overflow-hidden group shadow-lg">
                 <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-3xl"></div>
                 <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest block mb-3">Observaciones del servicio</span>
                 <p className="text-sm text-blue-950 leading-relaxed font-bold italic">"{metadata.observaciones}"</p>
              </div>
            )}
          </div>

          {hasDestination && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-3xl border-2 border-purple-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200 rounded-full -mr-20 -mt-20 opacity-30"></div>
                <h5 className="text-xs font-black text-purple-800 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 relative z-10">
                  <span className="w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></span> Destino Final
                </h5>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 relative z-10">
                  {renderAttribute('Depto Destino', metadata.departamento_destino)}
                  {renderAttribute('Ciudad Destino', metadata.ciudad_destino)}
                  <div className="col-span-2 border-t-2 border-purple-200 pt-4 mt-2">
                    {renderAttribute('Dirección Entrega', metadata.direccion_destino, true, metadata.ciudad_destino)}
                  </div>
                </div>
              </div>
              
              {metadata.imagenes && metadata.imagenes.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {metadata.imagenes.map((img, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform cursor-zoom-in ring-1 ring-gray-100">
                      <img src={img} className="w-full h-full object-cover" alt="Evidencia" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Si no hay destino, pero hay imágenes, las mostramos debajo del origen */}
          {!hasDestination && metadata.imagenes && metadata.imagenes.length > 0 && (
            <div className="col-span-full">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Evidencias del servicio</span>
              <div className="flex gap-4">
                {metadata.imagenes.map((img, i) => (
                  <div key={i} className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform cursor-zoom-in ring-1 ring-gray-100">
                    <img src={img} className="w-full h-full object-cover" alt="Evidencia" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sección de Seguimiento Operativo - Diseño Vibrante */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl border-2 border-gray-200 shadow-xl">
          <h5 className="text-xs font-black text-gray-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Seguimiento Operativo
          </h5>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {[
              { label: 'Confirmación', key: 'confirmacion' },
              { label: 'Seguimiento 50%', key: 'seguimiento50' },
              { label: 'Seguimiento 75%', key: 'seguimiento75' },
              { label: 'Seguimiento 100%', key: 'seguimiento100' },
              { label: 'Seguimiento 200%', key: 'seguimiento200' },
              { label: 'Reporte', key: 'reporte' }
            ].map((milestone, idx, arr) => {
              const mState = metadata[milestone.key as keyof typeof metadata] as any;
              const status = mState?.status || 'none';
              const isCompleted = status === 'completed';
              const canEdit = status === 'pending' || status === 'expired';

              return (
                <React.Fragment key={milestone.key}>
                  <div className="flex flex-col items-center gap-3 group relative">
                    <button 
                      disabled={!canEdit}
                      onClick={() => setEditingMilestone({ serviceId: service.id, milestoneKey: milestone.key, label: milestone.label })}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${getMilestoneColor(status)} ${canEdit ? 'hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-white' : 'cursor-default'}`}
                    >
                      {isCompleted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      ) : (
                        <span className="text-sm font-black">{idx + 1}</span>
                      )}
                    </button>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-emerald-700' : 'text-gray-500'}`}>{milestone.label}</span>
                    {isCompleted && (
                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-ping"></div>
                    )}
                  </div>
                  {idx < arr.length - 1 && (
                    <div className={`hidden md:block h-[3px] flex-1 min-w-[20px] rounded-full ${isCompleted ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gray-200'}`}></div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] animate-in slide-in-from-left duration-700 pb-20">
      {/* Header Refinado */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-emerald-50 text-gray-400 hover:text-emerald-700 rounded-xl transition-all active:scale-90 border border-transparent hover:border-emerald-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-0.5">
                <span>GESTIÓN DE CASOS</span>
                <span className="text-gray-200">/</span>
                <span className="text-emerald-700">SIAB #{caseData.siabNumber}</span>
              </div>
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Detalles del servicio</h1>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span className="text-sm font-black text-gray-700">{caseData.requestDate} - {caseData.requestTime}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-xl border border-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  <span className="text-sm font-black text-blue-700">{caseData.channel}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm`}>{caseData.status}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tarjetas de información en la parte superior - Layout horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            
            {/* Vehículo - Azul Vibrante */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 shadow-2xl shadow-blue-500/30 relative overflow-hidden group hover:shadow-blue-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 opacity-10 -mr-8 -mt-8 transition-transform group-hover:scale-110 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-4 flex items-center gap-2 relative z-10">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                </div>
                Vehículo
              </h3>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Placa</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.plate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Marca</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.brand}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Modelo</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.model}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Color</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.color}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Línea</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.line || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Pasajeros</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.passengers || 'N/A'}</span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">VIN</span>
                  <span className="text-xs font-black text-white leading-tight font-mono">{caseData.vehicleInfo?.vin || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Fasecolda</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.fasecolda || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Clase</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.vehicleClass || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Servicio</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.service || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Uso</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.usage || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Tipo</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.vehicleType || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.15em] mb-1">Blindaje</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.vehicleInfo?.armorType || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Asegurado - Amarillo Vibrante */}
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-2xl shadow-yellow-500/30 relative overflow-hidden group hover:shadow-yellow-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 opacity-10 -mr-8 -mt-8 transition-transform group-hover:scale-110 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-4 flex items-center gap-2 relative z-10">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                </div>
                Asegurado
              </h3>
              <div className="space-y-4 relative z-10">
                {/* Datos principales */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Tipo Documento</span>
                    <span className="text-sm font-black text-white leading-tight">{caseData.personalInfo?.documentType || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Número Documento</span>
                    <span className="text-sm font-black text-white leading-tight">{caseData.personalInfo?.cc}</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Nombre Completo</span>
                    <span className="text-sm font-black text-white leading-tight">{caseData.personalInfo?.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Tipo Persona</span>
                    <span className="text-sm font-black text-white leading-tight">{caseData.personalInfo?.personType || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Celular</span>
                    <span className="text-sm font-black text-white leading-tight">{caseData.personalInfo?.phone}</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Teléfono</span>
                    <span className="text-sm font-black text-white leading-tight">{caseData.personalInfo?.landline || 'N/A'}</span>
                  </div>
                </div>

                {/* Separador */}
                <div className="border-t border-white/20 pt-3">
                  {/* Verificar si tomador y asegurado son la misma persona */}
                  {caseData.policyHolderInfo?.documentNumber === caseData.insuredInfo?.documentNumber ? (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      <span className="text-xs font-black text-white">Tomador y Asegurado: Mismo</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] block mb-2">Tomador de la Póliza</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Tipo Doc.</span>
                        <span className="text-xs font-black text-white leading-tight">{caseData.policyHolderInfo?.documentType || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Número Doc.</span>
                        <span className="text-xs font-black text-white leading-tight">{caseData.policyHolderInfo?.documentNumber || 'N/A'}</span>
                      </div>
                      <div className="col-span-2 mt-2">
                        <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] block mb-2">Asegurado de la Póliza</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Tipo Doc.</span>
                        <span className="text-xs font-black text-white leading-tight">{caseData.insuredInfo?.documentType || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-[0.15em] mb-1">Número Doc.</span>
                        <span className="text-xs font-black text-white leading-tight">{caseData.insuredInfo?.documentNumber || 'N/A'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Póliza - Verde Esmeralda Vibrante */}
            <div className="bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 rounded-3xl p-6 shadow-2xl shadow-emerald-500/40 text-white relative overflow-hidden group hover:shadow-emerald-500/50 transition-all duration-300 ring-2 ring-white/20">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 opacity-10 -mr-8 -mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-4 flex items-center gap-2 relative z-10">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                Datos de la Póliza
              </h3>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Código Producto</span>
                  <span className="text-sm font-black text-white">{caseData.policyInfo?.productCode || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Ramo Emisión</span>
                  <span className="text-sm font-black text-white">{caseData.policyInfo?.branchName || 'N/A'}</span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Nombre Producto</span>
                  <span className="text-xs font-black text-white leading-tight">{caseData.policyInfo?.productName || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Número Póliza</span>
                  <span className="text-sm font-black text-white font-mono">{caseData.policyInfo?.number || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Secuencia</span>
                  <span className="text-sm font-black text-white">{caseData.policyInfo?.sequenceNumber || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Altura</span>
                  <span className="text-sm font-black text-white">{caseData.policyInfo?.height || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Estado</span>
                  <span className="text-sm font-black text-white">{caseData.policyInfo?.status || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Inicio Vigencia</span>
                  <span className="text-xs font-black text-white">{caseData.policyInfo?.startDate || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Fin Vigencia</span>
                  <span className="text-xs font-black text-white">{caseData.policyInfo?.endDate || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Valor Asegurado</span>
                  <span className="text-sm font-black text-white">{caseData.policyInfo?.insuredValue || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Clave Agente</span>
                  <span className="text-sm font-black text-white">{caseData.policyInfo?.agentKey || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Ubicación del Caso - Púrpura Vibrante */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 shadow-2xl shadow-purple-500/30 relative overflow-hidden group hover:shadow-purple-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 opacity-10 -mr-8 -mt-8 transition-transform group-hover:scale-110 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-4 flex items-center gap-2 relative z-10">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                Evento
              </h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-purple-100 uppercase tracking-[0.15em] mb-1">Departamento</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.additionalInfo?.department}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-purple-100 uppercase tracking-[0.15em] mb-1">Ciudad</span>
                  <span className="text-sm font-black text-white leading-tight">{caseData.additionalInfo?.city}</span>
                </div>
                <div className="col-span-2 border-t border-white/20 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-purple-100 uppercase tracking-[0.15em] mb-1">Dirección Reportada</span>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${caseData.additionalInfo?.address}${caseData.additionalInfo?.city ? ', ' + caseData.additionalInfo.city : ''}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-sm font-black text-white hover:text-purple-100 flex items-center gap-2 group/link transition-colors"
                    >
                      {caseData.additionalInfo?.address}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover/link:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Servicios Autorizados - Ancho completo */}
          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-400/20 border-2 border-gray-100 overflow-hidden flex flex-col min-h-[700px]">
              {/* Header con gradiente */}
              <div className="px-12 py-10 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Servicios Autorizados</h3>
                  <p className="text-sm text-gray-500 font-bold mt-2">Gestione asignaciones directas y metadata detallada.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-black rounded-2xl shadow-xl shadow-emerald-500/30 tracking-widest flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-lg"></span>
                    {services.length} ACTIVOS
                  </div>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className={`flex items-center gap-2 px-7 py-3.5 font-black rounded-2xl transition-all shadow-xl text-sm ${
                      showAddForm
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-gray-600/30'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/30'
                    } active:scale-95 hover:shadow-2xl`}
                  >
                    <Icons.Plus />
                    {showAddForm ? 'Cancelar' : 'Añadir Servicio'}
                  </button>
                </div>
              </div>

              <div className="flex-1 px-10 py-8">
                {/* Formulario desplegable para añadir servicio - Diseño Vibrante */}
                {showAddForm && (
                  <div className="mb-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl p-8 border-2 border-blue-200 animate-in slide-in-from-top-4 duration-300 shadow-xl shadow-blue-200/50">
                    <div className="max-w-4xl">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
                          <Icons.Plus />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-gray-900">Agregar Nuevo Servicio</h4>
                          <p className="text-sm text-gray-600 font-bold">Complete la información del servicio adicional</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Número de Autorización */}
                        <div>
                          <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-wider">
                            Número de Autorización *
                          </label>
                          <input
                            type="text"
                            value={newService.authNumber}
                            onChange={(e) => handleNewServiceChange('authNumber', e.target.value)}
                            placeholder="Ej: 1234567"
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all font-mono font-bold shadow-sm"
                          />
                        </div>

                        {/* Tipo de Servicio */}
                        <div>
                          <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-wider">
                            Tipo de Servicio *
                          </label>
                          <select
                            value={newService.serviceType}
                            onChange={(e) => handleNewServiceChange('serviceType', e.target.value)}
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all appearance-none cursor-pointer font-bold shadow-sm"
                          >
                            {ALL_SERVICE_TYPES.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>

                        {/* Descripción */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-wider">
                            Descripción del Servicio *
                          </label>
                          <textarea
                            value={newService.description}
                            onChange={(e) => handleNewServiceChange('description', e.target.value)}
                            placeholder="Describa brevemente el servicio solicitado..."
                            rows={3}
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all resize-none font-bold shadow-sm"
                          />
                        </div>

                        {/* Proveedor */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-wider">
                            Proveedor Asignado
                          </label>
                          <input
                            type="text"
                            value={newService.providerName}
                            onChange={(e) => handleNewServiceChange('providerName', e.target.value)}
                            placeholder="Nombre del proveedor (opcional)"
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all font-bold shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Botones */}
                      <div className="flex justify-end gap-4 mt-8 pt-6 border-t-2 border-blue-200">
                        <button
                          onClick={handleCancelAddService}
                          className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-black rounded-xl hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleAddService}
                          disabled={!newService.authNumber || !newService.description}
                          className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-black rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl"
                        >
                          Guardar Servicio
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Headers de la tabla - Diseño Vibrante */}
                <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl border-2 border-gray-200 mb-6 shadow-md">
                  <div className="col-span-2">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.25em]">AUTORIZACIÓN</span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.25em]">ASISTENCIA</span>
                  </div>
                  <div className="col-span-4">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.25em]">PROVEEDOR ASIGNADO</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.25em]">MODALIDAD</span>
                  </div>
                  <div className="col-span-1"></div>
                </div>

                {/* Lista de servicios */}
                <div className="space-y-4">
                  {services.length > 0 ? (
                    services.map((service) => (
                      <ServiceItem 
                        key={service.id} 
                        service={service} 
                        renderDetails={renderServiceDetails}
                        onAssignProvider={handleAssignProvider}
                        onDeleteService={handleDeleteService}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-40 opacity-20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                      <p className="font-black uppercase tracking-[0.3em] text-[10px]">Sin registros activos</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-12 py-8 bg-gradient-to-r from-gray-50 to-white border-t-2 border-gray-100 flex items-center justify-between">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">v4.1.2 - Clever IAN</p>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg shadow-emerald-500/50 animate-pulse"></div>
                    <span className="text-xs text-emerald-700 font-black uppercase tracking-[0.2em]">Sincronización SIAB OK</span>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default CaseDetailsView;
