import React, { useState } from 'react';

// Tipos unificados para pólizas
export type PolicyType = 'HOGAR' | 'AUTOS';
export type PolicyStatus = 'ACTIVA' | 'INACTIVA' | 'ANULADA';

export interface UnifiedPolicy {
  id: string;
  type: PolicyType;
  numeroPoliza: string;
  renovacion: number; // Número de renovación
  producto: string; // Nombre del producto principal
  status: PolicyStatus;
  fechaVencimiento: string; // DD/MM/YYYY
  
  // Campos específicos de Hogar
  direccion?: string;
  tipoCobertura?: 'Edificio y contenidos' | 'Edificio sin contenidos' | 'Solo contenidos';
  
  // Campos específicos de Autos
  placa?: string;
  tipoCoberturaAuto?: string; // Ej: "Familiar", "Estándar", "Todo Riesgo"
  
  // Datos del asegurado
  asegurado: {
    nombre: string;
    documento: string;
  };
}

interface UnifiedPolicySearchProps {
  onSelectPolicy: (policy: UnifiedPolicy) => void;
  onCancel: () => void;
}

// Mock de datos para demostración
const MOCK_POLICIES: UnifiedPolicy[] = [
  // Pólizas de Hogar
  {
    id: 'h1',
    type: 'HOGAR',
    numeroPoliza: '1234567890',
    renovacion: 3,
    producto: 'Hogar Protección Total',
    status: 'ACTIVA',
    fechaVencimiento: '15/12/2026',
    direccion: 'Calle 45 # 23-10, Apto 501',
    tipoCobertura: 'Edificio y contenidos',
    asegurado: {
      nombre: 'María García',
      documento: '1122334455'
    }
  },
  {
    id: 'h2',
    type: 'HOGAR',
    numeroPoliza: '9876543210',
    renovacion: 1,
    producto: 'Hogar Digital',
    status: 'ACTIVA',
    fechaVencimiento: '28/02/2027',
    direccion: 'Carrera 7 # 100-20, Casa',
    tipoCobertura: 'Solo contenidos',
    asegurado: {
      nombre: 'María García',
      documento: '1122334455'
    }
  },
  {
    id: 'h3',
    type: 'HOGAR',
    numeroPoliza: '5555666677',
    renovacion: 5,
    producto: 'Hogar El Libertador',
    status: 'INACTIVA',
    fechaVencimiento: '10/01/2025',
    direccion: 'Avenida 68 # 45-30',
    tipoCobertura: 'Edificio sin contenidos',
    asegurado: {
      nombre: 'María García',
      documento: '1122334455'
    }
  },
  // Pólizas de Autos
  {
    id: 'a1',
    type: 'AUTOS',
    numeroPoliza: 'POL-77229-X',
    renovacion: 2,
    producto: 'Todo Riesgo Premium',
    status: 'ACTIVA',
    fechaVencimiento: '31/12/2026',
    placa: 'GHT459',
    tipoCoberturaAuto: 'Familiar',
    asegurado: {
      nombre: 'Juan Pérez',
      documento: '1020304050'
    }
  },
  {
    id: 'a2',
    type: 'AUTOS',
    numeroPoliza: 'POL-22334-E',
    renovacion: 1,
    producto: 'Todo Riesgo Plus',
    status: 'ACTIVA',
    fechaVencimiento: '10/10/2026',
    placa: 'ABC456',
    tipoCoberturaAuto: 'Estándar',
    asegurado: {
      nombre: 'Juan Pérez',
      documento: '1020304050'
    }
  },
  {
    id: 'a3',
    type: 'AUTOS',
    numeroPoliza: 'POL-11002-B',
    renovacion: 4,
    producto: 'Responsabilidad Civil',
    status: 'ACTIVA',
    fechaVencimiento: '15/08/2026',
    placa: 'JKL102',
    tipoCoberturaAuto: 'Familiar',
    asegurado: {
      nombre: 'María García',
      documento: '1122334455'
    }
  }
];

const UnifiedPolicySearch: React.FC<UnifiedPolicySearchProps> = ({ onSelectPolicy, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UnifiedPolicy[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Función para calcular el progreso de vigencia
  const getValidityProgress = (fechaVencimiento: string): { percentage: number; daysRemaining: number; isExpiringSoon: boolean; isExpired: boolean } => {
    const [day, month, year] = fechaVencimiento.split('/').map(Number);
    const endDate = new Date(year, month - 1, day);
    const today = new Date();
    
    const diffTime = endDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const totalDays = 365;
    const daysPassed = totalDays - daysRemaining;
    const percentage = Math.max(0, Math.min(100, (daysPassed / totalDays) * 100));
    
    const isExpired = daysRemaining < 0;
    const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 30;
    
    return { percentage, daysRemaining, isExpiringSoon, isExpired };
  };

  // Búsqueda inteligente
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simular búsqueda con delay
    setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();
      
      const results = MOCK_POLICIES.filter(policy => {
        // Buscar por cédula/NIT
        if (policy.asegurado.documento.toLowerCase().includes(term)) return true;
        
        // Buscar por placa (solo para autos)
        if (policy.type === 'AUTOS' && policy.placa?.toLowerCase().includes(term)) return true;
        
        // Buscar por número de póliza
        if (policy.numeroPoliza.toLowerCase().includes(term)) return true;
        
        return false;
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] animate-in slide-in-from-right duration-700 pb-32">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button 
              onClick={onCancel}
              className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-emerald-50 text-gray-400 hover:text-emerald-700 rounded-xl transition-all active:scale-90 border border-transparent hover:border-emerald-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-0.5">
                <span>BÚSQUEDA UNIFICADA</span>
                <span className="text-gray-200">/</span>
                <span className="text-emerald-700">HOGAR & AUTOS</span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Consulta de Pólizas</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Buscador Unificado */}
        <div className="mb-10 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/30">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] ml-1">
                Búsqueda Inteligente
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ingrese Cédula, NIT, Placa o Número de Póliza..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl text-sm font-black text-gray-800 outline-none transition-all shadow-inner"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-400 ml-1">
                💡 Busca por cédula, NIT, placa de vehículo o número de póliza
              </p>
            </div>
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="px-10 py-4 bg-emerald-800 text-white text-xs font-black rounded-2xl hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/20 active:scale-95 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Buscando...' : 'Consultar'}
            </button>
          </div>
        </div>

        {/* Resultados */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">
                Pólizas Encontradas ({searchResults.length})
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span className="text-xs font-black text-blue-700">
                    {searchResults.filter(p => p.type === 'HOGAR').length} Hogar
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                    <circle cx="7" cy="17" r="2"></circle>
                    <path d="M9 17h6"></path>
                    <circle cx="17" cy="17" r="2"></circle>
                  </svg>
                  <span className="text-xs font-black text-purple-700">
                    {searchResults.filter(p => p.type === 'AUTOS').length} Autos
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((policy) => {
                const validityInfo = getValidityProgress(policy.fechaVencimiento);
                const isHogar = policy.type === 'HOGAR';
                
                return (
                  <button
                    key={policy.id}
                    onClick={() => onSelectPolicy(policy)}
                    className="bg-white p-6 rounded-3xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-xl text-left transition-all group relative overflow-hidden"
                  >
                    {/* Header: Estado y Renovación */}
                    <div className="flex items-start justify-between mb-4">
                      {/* Estado */}
                      <div className="flex items-center gap-1.5">
                        {policy.status === 'ACTIVA' ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">
                              Activa
                            </span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            <span className="text-[9px] font-black text-red-700 uppercase tracking-widest">
                              {policy.status === 'INACTIVA' ? 'Inactiva' : 'Anulada'}
                            </span>
                          </>
                        )}
                      </div>
                      
                      {/* Renovación */}
                      <div className="px-2.5 py-1 bg-gray-100 rounded-lg border border-gray-200">
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                          Ren. {policy.renovacion}
                        </span>
                      </div>
                    </div>

                    {/* Producto Principal - Jerárquico */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        {isHogar ? (
                          <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                              <circle cx="7" cy="17" r="2"></circle>
                              <path d="M9 17h6"></path>
                              <circle cx="17" cy="17" r="2"></circle>
                            </svg>
                          </div>
                        )}
                        <span className={`text-[9px] font-black uppercase tracking-widest ${isHogar ? 'text-blue-600' : 'text-purple-600'}`}>
                          {policy.type}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-gray-900 uppercase leading-tight group-hover:text-emerald-700 transition-colors">
                        {policy.producto}
                      </h3>
                    </div>

                    {/* Información Contextual - Dinámica según tipo */}
                    <div className="space-y-3 mb-4">
                      {/* Placa o Dirección */}
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          {isHogar ? 'Dirección del Riesgo' : 'Placa del Vehículo'}
                        </span>
                        {isHogar ? (
                          <p className="text-sm font-bold text-gray-700 leading-tight">
                            {policy.direccion}
                          </p>
                        ) : (
                          <span className="inline-block px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg font-mono text-sm font-black border-2 border-yellow-200">
                            {policy.placa}
                          </span>
                        )}
                      </div>

                      {/* Tipo de Cobertura */}
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          Tipo de Cobertura
                        </span>
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          isHogar 
                            ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                            : 'bg-purple-100 text-purple-700 border border-purple-200'
                        }`}>
                          {isHogar ? policy.tipoCobertura : policy.tipoCoberturaAuto}
                        </span>
                      </div>
                    </div>

                    {/* Footer: Vencimiento y Barra de Progreso */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                          Vence
                        </span>
                        <span className={`text-[10px] font-black ${
                          validityInfo.isExpired ? 'text-red-600' : 
                          validityInfo.isExpiringSoon ? 'text-amber-600' : 
                          'text-gray-700'
                        }`}>
                          {policy.fechaVencimiento}
                        </span>
                      </div>
                      
                      {/* Barra de Progreso Sutil */}
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            validityInfo.isExpired ? 'bg-red-500' : 
                            validityInfo.isExpiringSoon ? 'bg-amber-500' : 
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${validityInfo.isExpired ? 100 : validityInfo.percentage}%` }}
                        ></div>
                      </div>
                      
                      {!validityInfo.isExpired && (
                        <p className={`text-[9px] font-bold mt-1 ${
                          validityInfo.isExpiringSoon ? 'text-amber-600' : 'text-gray-400'
                        }`}>
                          {validityInfo.daysRemaining} días restantes
                        </p>
                      )}
                    </div>

                    {/* Indicador de hover */}
                    <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                        Seleccionar póliza
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {searchResults.length === 0 && searchTerm && !isSearching && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3 className="text-lg font-black text-gray-400 uppercase tracking-tight mb-2">
              No se encontraron pólizas
            </h3>
            <p className="text-sm text-gray-400 font-bold">
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedPolicySearch;
