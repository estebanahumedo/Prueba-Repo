
import React, { useState } from 'react';
import StatsCard from './components/StatsCard';
import Filters from './components/Filters';
import CaseTable from './components/CaseTable';
import CreateCaseView from './components/CreateCaseView';
import CaseDetailsView from './components/CaseDetailsView';
import { Case, CaseStatus, ServiceDetail } from './types';
import { Icons } from './constants';

const INITIAL_CASES: Case[] = [
  {
    id: 'c1',
    systemId: 1,
    siabNumber: '4592021',
    plate: 'GHT459',
    status: CaseStatus.IN_PROGRESS,
    requestDate: '15 Ene 2026',
    requestTime: '14:30',
    channel: 'WHATSAPP',
    responsable: 'Juan Pérez',
    assignedQueue: 'Asistencia Local',
    vehicleInfo: { 
      brand: 'Chevrolet', 
      model: '2022', 
      color: 'Blanco',
      line: 'Spark GT',
      passengers: 5,
      vin: '9BWZZZ377VT004251',
      fasecolda: '01010015',
      vehicleClass: 'Automóvil',
      service: 'Particular',
      usage: 'Familiar',
      vehicleType: 'Hatchback',
      armorType: 'No'
    },
    personalInfo: { 
      documentType: 'Cédula de Ciudadanía',
      cc: '1020304050', 
      name: 'Juan Pérez', 
      personType: 'Natural',
      phone: '3001234567',
      landline: '6012345678',
      email: 'juan.perez@email.com' 
    },
    policyHolderInfo: {
      documentType: 'Cédula de Ciudadanía',
      documentNumber: '1020304050',
      name: 'Juan Pérez'
    },
    insuredInfo: {
      documentType: 'Cédula de Ciudadanía',
      documentNumber: '1020304050',
      name: 'Juan Pérez'
    },
    policyInfo: { 
      productCode: '0001',
      productName: 'Seguro Todo Riesgo Vehículos',
      branchName: 'Autos',
      number: 'POL-77229-X', 
      sequenceNumber: '001',
      height: '01',
      startDate: '01/01/2026',
      endDate: '31/12/2026',
      insuredValue: '$85.000.000',
      status: 'Vigente',
      agentKey: 'AG-12345',
      validity: '31/12/2026', 
      type: 'Todo Riesgo Premium' 
    },
    additionalInfo: { department: 'Antioquia', city: 'Medellín', address: 'Calle 10 # 43 - 50', damageDescription: 'Falla mecánica mas colisión leve.' },
    services: [
      { 
        id: 's1', 
        authNumber: '2938475', 
        serviceType: 'Grua accidente', 
        description: 'Traslado por colisión lateral',
        providerName: 'Grúas del Norte S.A.S',
        metadata: {
          id_servicio: 'GR-102',
          tipo_vehiculo: 'Automóvil Sedán',
          departamento: 'Antioquia',
          ciudad_origen: 'Medellín',
          direccion_recogida: 'Calle 10 con 43',
          servicio_programado: false,
          en_via: true,
          facil_acceso: true,
          bloqueo_caja_llantas: false,
          daño_presentado: 'Suspensión delantera comprometida',
          departamento_destino: 'Antioquia',
          ciudad_destino: 'Medellín',
          direccion_destino: 'Carrera 48 # 20-30',
          requiere_transporte: true,
          observaciones: 'Vehículo con derrame de líquidos.',
          imagenes: ['https://images.unsplash.com/photo-1599421141974-904128f738f6?auto=format&fit=crop&q=80&w=200'],
          confirmacion: { status: 'completed' },
          seguimiento50: { status: 'completed' },
          seguimiento75: { status: 'pending' },
          seguimiento100: { status: 'none' },
          seguimiento200: { status: 'none' },
          reporte: { status: 'none' }
        },
        history: [
          { id: 'h1', date: '15/01/2026, 14:45:00', user: 'Sistema', type: 'system', description: 'Servicio creado y autorizado' },
          { id: 'h2', date: '15/01/2026, 15:10:22', user: 'Juan Pérez', type: 'change', description: 'Confirmación realizada - Proveedor contactado' }
        ]
      },
      { 
        id: 's1-2', 
        authNumber: '8827364', 
        serviceType: 'Cerrajería autos', 
        description: 'Apertura por bloqueo de seguridad',
        metadata: {
          id_servicio: 'CE-440',
          departamento: 'Antioquia',
          ciudad_origen: 'Medellín',
          direccion: 'Calle 10 con 43',
          observaciones: 'El cliente no puede acceder al vehículo tras el impacto.',
          imagenes: ['https://images.unsplash.com/photo-1517520287167-4bda64282b54?auto=format&fit=crop&q=80&w=200'],
          confirmacion: { status: 'expired' },
          seguimiento50: { status: 'none' },
          seguimiento75: { status: 'none' },
          seguimiento100: { status: 'none' },
          seguimiento200: { status: 'none' },
          reporte: { status: 'none' }
        }
      }
    ]
  },
  {
    id: 'c2',
    systemId: 2,
    siabNumber: '1123488',
    plate: 'JKL102',
    status: CaseStatus.PENDING,
    requestDate: '15 Ene 2026',
    requestTime: '13:15',
    channel: 'APP',
    responsable: 'María García',
    assignedQueue: 'Conductores',
    vehicleInfo: { 
      brand: 'Mazda', 
      model: '2023', 
      color: 'Rojo Cristal',
      line: 'CX-5 Touring',
      passengers: 5,
      vin: 'JM3KFBDM5N0123456',
      fasecolda: '04025067',
      vehicleClass: 'Camioneta',
      service: 'Particular',
      usage: 'Familiar',
      vehicleType: 'SUV',
      armorType: 'No'
    },
    personalInfo: { cc: '1122334455', name: 'María García', phone: '3109876543', email: 'm.garcia@email.com' },
    policyInfo: { number: 'POL-11002-B', validity: '15/08/2026', type: 'Responsabilidad Civil' },
    additionalInfo: { department: 'Bogotá D.C.', city: 'Bogotá', address: 'Av. Cra 7 # 100 - 20', damageDescription: 'Solicitud de conductor elegido.' },
    services: [
      { 
        id: 's2', 
        authNumber: '1029384', 
        serviceType: 'Conductor elegido', 
        description: 'Servicio por evento social',
        providerName: 'Asistencias VIP Bogotá',
        metadata: {
          id_servicio: 'CE-992',
          departamento: 'Bogotá D.C.',
          ciudad_origen: 'Bogotá',
          direccion_recogida: 'Club El Nogal - Cra 7 # 78-96',
          fecha_hora: '15/01/2026 23:30',
          departamento_destino: 'Bogotá D.C.',
          ciudad_destino: 'Bogotá',
          direccion_destino: 'Calle 127 # 7-20',
          servicio_programado: true,
          observaciones: 'Usuario solicita conductor con experiencia en automáticos.',
          confirmacion: { status: 'completed' },
          seguimiento50: { status: 'pending' },
          seguimiento75: { status: 'none' },
          seguimiento100: { status: 'none' },
          seguimiento200: { status: 'none' },
          reporte: { status: 'none' }
        }
      }
    ]
  },
  {
    id: 'c3',
    systemId: 3,
    siabNumber: '8871209',
    plate: 'ZZQ990',
    status: CaseStatus.SERVICED,
    requestDate: '15 Ene 2026',
    requestTime: '12:45',
    channel: 'WAC',
    responsable: 'Carlos Ruiz',
    assignedQueue: 'Atención Carreteras',
    services: [{ 
      id: 's3-1', 
      authNumber: '7736452', 
      serviceType: 'Rescate', 
      description: 'Extracción de cuneta km 45',
      metadata: {
        confirmacion: { status: 'completed' },
        seguimiento50: { status: 'completed' },
        seguimiento75: { status: 'completed' },
        seguimiento100: { status: 'completed' },
        seguimiento200: { status: 'none' },
        reporte: { status: 'none' }
      }
    }]
  },
  {
    id: 'c4',
    systemId: 4,
    siabNumber: '7612244',
    plate: 'TYU441',
    status: CaseStatus.CANCELLED,
    requestDate: '15 Ene 2026',
    requestTime: '11:20',
    channel: 'LLA_SIAB',
    responsable: 'Ana Martínez',
    assignedQueue: 'Flota Pesada',
    services: [{ 
      id: 's4-1', 
      authNumber: '9900112', 
      serviceType: 'Gra accedente pesados', 
      description: 'Remolque tractocamión',
      metadata: {
        confirmacion: { status: 'expired' },
        seguimiento50: { status: 'none' },
        seguimiento75: { status: 'none' },
        seguimiento100: { status: 'none' },
        seguimiento200: { status: 'none' },
        reporte: { status: 'none' }
      }
    }]
  },
  {
    id: 'c5',
    systemId: 5,
    siabNumber: '1029311',
    plate: 'BVC882',
    status: CaseStatus.PENDING,
    requestDate: '15 Ene 2026',
    requestTime: '10:05',
    channel: 'WAD',
    responsable: 'Ricardo Sosa',
    assignedQueue: 'Asistencia Local',
    services: [{ 
      id: 's5-1', 
      authNumber: '2233445', 
      serviceType: 'Carro taller por barada', 
      description: 'Revisión técnica en vía',
      metadata: {
        confirmacion: { status: 'pending' },
        seguimiento50: { status: 'none' },
        seguimiento75: { status: 'none' },
        seguimiento100: { status: 'none' },
        seguimiento200: { status: 'none' },
        reporte: { status: 'none' }
      }
    }]
  },
  {
    id: 'c6',
    systemId: 6,
    siabNumber: '5512399',
    plate: 'MOP112',
    status: CaseStatus.IN_PROGRESS,
    requestDate: '14 Ene 2026',
    requestTime: '22:15',
    channel: 'APP',
    responsable: 'Juan Pérez',
    assignedQueue: 'Conductores',
    services: [{ 
      id: 's6-1', 
      authNumber: '7766554', 
      serviceType: 'Trasporte de producto', 
      description: 'Envío de repuestos urgentes',
      metadata: {
        confirmacion: { status: 'completed' },
        seguimiento50: { status: 'completed' },
        seguimiento75: { status: 'pending' },
        seguimiento100: { status: 'none' },
        seguimiento200: { status: 'none' },
        reporte: { status: 'none' }
      }
    }]
  },
  {
    id: 'c7',
    systemId: 7,
    siabNumber: '3344566',
    plate: 'WER556',
    status: CaseStatus.SERVICED,
    requestDate: '14 Ene 2026',
    requestTime: '19:40',
    channel: 'WHATSAPP',
    responsable: 'Elena Blanco',
    assignedQueue: 'Jurídico',
    services: [{ 
      id: 's7-1', 
      authNumber: '1122334', 
      serviceType: 'Abogado: Asistencia telefónica', 
      description: 'Asesoría legal preliminar',
      metadata: {
        confirmacion: { status: 'completed' },
        seguimiento50: { status: 'none' },
        seguimiento75: { status: 'none' },
        seguimiento100: { status: 'none' },
        seguimiento200: { status: 'none' },
        reporte: { status: 'none' }
      }
    }]
  }
];

type AppView = 'dashboard' | 'create' | 'details';

const App: React.FC = () => {
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES);
  const [view, setView] = useState<AppView>('dashboard');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const handleShowDetails = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setView('details');
  };

  const updateCaseMilestone = (caseId: string, serviceId: string, milestoneKey: string, milestoneData: any) => {
    const historyEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
      user: 'Usuario Actual',
      type: 'change' as const,
      description: `Hito ${milestoneKey} actualizado: ${milestoneData.result || 'Completado'}. Obs: ${milestoneData.observation || 'Sin observación'}`
    };

    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      return {
        ...c,
        services: c.services.map(s => {
          if (s.id !== serviceId) return s;
          return {
            ...s,
            metadata: {
              ...s.metadata,
              [milestoneKey]: milestoneData
            },
            history: [...(s.history || []), historyEntry]
          };
        })
      };
    }));
  };

  const addHistoryEntry = (caseId: string, serviceId: string, description: string, type: 'change' | 'observation' | 'system' = 'observation') => {
    const newEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
      user: 'Usuario Actual', // En una app real vendría de auth
      type,
      description
    };

    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      return {
        ...c,
        services: c.services.map(s => {
          if (s.id !== serviceId) return s;
          return {
            ...s,
            history: [...(s.history || []), newEntry]
          };
        })
      };
    }));
  };

  const addServiceToCase = (caseId: string, service: Omit<ServiceDetail, 'id'>) => {
    const newService: ServiceDetail = {
      ...service,
      id: `s${Date.now()}`
    };

    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      return {
        ...c,
        services: [...c.services, newService]
      };
    }));

    // Update selectedCase if it's the same case
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase(prev => prev ? {
        ...prev,
        services: [...prev.services, newService]
      } : null);
    }
  };

  const deleteServiceFromCase = (caseId: string, serviceId: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      return {
        ...c,
        services: c.services.filter(s => s.id !== serviceId)
      };
    }));

    // Update selectedCase if it's the same case
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase(prev => prev ? {
        ...prev,
        services: prev.services.filter(s => s.id !== serviceId)
      } : null);
    }
  };

  if (view === 'create') return <CreateCaseView onCancel={() => setView('dashboard')} onSave={() => setView('dashboard')} />;
  if (view === 'details' && selectedCase) return <CaseDetailsView caseData={selectedCase} onBack={() => setView('dashboard')} onUpdateMilestone={updateCaseMilestone} onAddService={addServiceToCase} onDeleteService={deleteServiceFromCase} />;

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4 md:px-10 lg:px-16 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mis Casos</h1>
              <p className="text-gray-500 mt-1">Gestión operativa Clever - IAN.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setView('create')} 
                className="flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
              >
                <span className="text-xl">+</span> Crear Caso
              </button>
              <button 
                className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                <Icons.Calculator />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full place-items-center">
            <StatsCard label="Casos Pendientes" value={cases.filter(c => c.status === CaseStatus.PENDING).length} type="pending" />
            <StatsCard label="Casos en Curso" value={cases.filter(c => c.status === CaseStatus.IN_PROGRESS).length} type="in_progress" />
            <StatsCard label="Casos Prestados" value={cases.filter(c => c.status === CaseStatus.SERVICED).length} type="serviced" />
          </div>
        </div>
        <Filters />
        <CaseTable 
          cases={cases} 
          onShowDetails={handleShowDetails} 
          onUpdateMilestone={updateCaseMilestone} 
          onAddHistory={addHistoryEntry}
        />
      </div>
    </div>
  );
};

export default App;
