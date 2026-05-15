export enum CaseStatus {
  PENDING = 'Pendiente',
  SERVICED = 'Prestado',
  IN_PROGRESS = 'En Curso',
  CANCELLED = 'Cancelado',
}

export type ServiceType =
  // Grupo Transporte/Conductores
  | 'Conductor elegido'
  | 'Conductor Familiar'
  | 'Trasporte para viajes'
  | 'Trasporte de producto'
  | 'Transporte ocupantes al destino/domicilio'
  | 'translado documentos y mercancía'
  // Grupo Asistencia/Técnico
  | 'Abogado: Asistencia presencial'
  | 'Abogado: Asistencia telefónica'
  | 'Cerrajería autos'
  | 'Carro taller por barada'
  | 'Carro taller instalación de batería'
  | 'Móvil presencial (CESVI)'
  // Grupo Grúas/Rescate
  | 'Deposito/custodia'
  | 'Grúa salida custodia'
  | 'Grua accidente'
  | 'Gra accedente pesados'
  | 'Grua varada'
  | 'Grua varada pesados'
  | 'moto grua'
  | 'Rescate';

export type MilestoneStatus = 'pending' | 'expired' | 'completed' | 'none';

export interface MilestoneState {
  status: MilestoneStatus;
  result?: 'novelty' | 'managed';
  observation?: string;
}

export interface ServiceMetadata {
  // Campos generales
  autorizacion?: string;
  servicio?: string;
  departamento_origen?: string;
  ciudad_origen?: string;
  direccion_origen?: string;
  direccion_recogida?: string;
  fecha_y_hora_prestacion?: string;
  fecha_ofertamiento?: string;
  observaciones_adicionales?: string;
  nombre_solicitante?: string;
  telefono?: string;
  cargue_evidencias?: string[];

  // Campos de programación (para cada autorización)
  fecha_programacion?: string; // Formato: YYYY-MM-DD
  hora_programacion?: string; // Formato: HH:MM

  // Campos de destino
  departamento_destino?: string;
  ciudad_destino?: string;
  ciudad_de_destino?: string;
  direccion_destino?: string;
  direccion_de_destino?: string;
  caracteristicas_destino?: string;
  caracteristicas_origen?: string;

  // Campos de vehículo
  marca_vehiculo?: string;
  modelo?: string;
  electrico_hibrido?: 'Eléctrico' | 'Híbrido' | 'Ninguno';
  tipo_servicio?: string;

  // Campos de transporte de personas
  requerimiento_especial?: string;
  cantidad_personas?: number;
  maletas?: number;
  peso_maletas?: number;

  // Campos de dimensiones/carga
  alto?: number;
  ancho?: number;
  largo?: number;
  peso?: number;
  esta_cargado?: boolean;
  toneladas_carga?: number;

  // Campos técnicos de grúas
  vehiculo_se_encuentra_en_la_via?: boolean;
  vehiculo_esta_en_un_lugar_de_facil_acceso_para_la_grua?: boolean;
  vehiculo_presenta_algun_bloqueo_en_la_caja_o_llantas_estan_frenadas?: boolean;
  cual_es_el_dano_que_presenta?: string;
  requiere_transporte?: boolean;
  programado?: boolean;
  servicio_programado?: boolean;

  // Campos específicos de vehículos pesados
  tipo_troque?: 'Doble' | 'Sencillo';
  tipo_llanta?: 'Doble' | 'Sencilla';
  tipo_carroceria?: string;

  // Campos específicos de rescate
  detalles_rescate?: string;

  // Campos de evidencias
  imagenes?: string[];

  // Campos de seguimiento refinados
  confirmacion?: MilestoneState;
  seguimiento50?: MilestoneState;
  seguimiento75?: MilestoneState;
  seguimiento100?: MilestoneState;
  seguimiento200?: MilestoneState;
  reporte?: MilestoneState;
  [key: string]: unknown;
}

export interface HistoryEntry {
  id: string;
  date: string;
  user: string;
  type: 'change' | 'observation' | 'system';
  description: string;
}

export interface ServiceDetail {
  id: string;
  authNumber: string;
  description: string;
  serviceType: ServiceType;
  providerName?: string;
  metadata?: ServiceMetadata;
  history?: HistoryEntry[];
}

export interface Policy {
  number: string;
  validity: string;
  type: string;
  status: 'Vigente' | 'Activa' | 'Vencida' | 'Cancelada';
  assistanceType: 'Full' | 'Básica';
  enabledServices?: ServiceType[];
  serviceUsage?: {
    [key in ServiceType]?: number;
  };
  // Campos de la póliza
  productCode?: string;
  productName?: string;
  branchName?: string;
  sequenceNumber?: string;
  height?: string;
  startDate?: string;
  endDate?: string;
  insuredValue?: string;
  agentKey?: string;
  // Información del Tomador (si es diferente al asegurado)
  policyHolderDocumentType?: string;
  policyHolderDocument?: string;
  policyHolderName?: string;
  // Campos para Autos
  vehiclePlate?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  vehicleLine?: string;
  vehiclePassengers?: number;
  vehicleVin?: string;
  vehicleFasecolda?: string;
  vehicleClass?: string;
  vehicleService?: string;
  vehicleUsage?: string;
  vehicleType?: string;
  vehicleArmor?: string;
  coverageTypeAuto?: 'Familiar' | 'Estándar'; // Tipo de cobertura para Autos
  // Campos para Hogar
  propertyAddress?: string;
  propertyType?: 'Casa' | 'Apartamento' | 'Oficina' | 'Local Comercial';
  coverageType?:
    | 'Edificio y contenidos'
    | 'Edificio sin contenidos'
    | 'Solo contenidos';
  policyType?: 'HOGAR' | 'AUTOS'; // Identificador del tipo de póliza
  renovationNumber?: number; // Número de renovación
  // Campos adicionales para Hogar
  tronadorCode?: string; // Código Tronador del producto (ej: "109" para "Hogar para disfrutar")
  commercialProductName?: string; // Nombre comercial del producto (ej: "Hogar para disfrutar")
}

export interface Customer {
  cc: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  clv?: 'Bronce' | 'Plata' | 'Oro' | 'Platino' | 'Diamante';
  policies: Policy[];
}

export type CaseChannel = 'WAC' | 'WAD' | 'APP' | 'LLA_SIAB' | 'WHATSAPP';

export interface Case {
  id: string;
  systemId: number;
  siabNumber: string;
  plate: string;
  status: CaseStatus;
  requestDate: string;
  requestTime: string;
  channel: CaseChannel;
  responsable: string;
  assignedQueue: string;
  services: ServiceDetail[];
  vehicleInfo?: {
    brand: string;
    model: string;
    color: string;
    line?: string;
    passengers?: number;
    vin?: string;
    fasecolda?: string;
    vehicleClass?: string;
    service?: string;
    usage?: string;
    vehicleType?: string;
    armorType?: string;
  };
  personalInfo?: {
    documentType: string;
    cc: string;
    name: string;
    personType: string;
    phone: string;
    landline?: string;
    email: string;
  };
  policyHolderInfo?: {
    documentType: string;
    documentNumber: string;
    name?: string;
  };
  insuredInfo?: {
    documentType: string;
    documentNumber: string;
    name?: string;
  };
  policyInfo?: {
    productCode: string;
    productName: string;
    branchName: string;
    number: string;
    sequenceNumber: string;
    height: string;
    startDate: string;
    endDate: string;
    insuredValue: string;
    status: string;
    agentKey: string;
    validity: string;
    type: string;
  };
  additionalInfo?: {
    department: string;
    city: string;
    address: string;
    damageDescription: string;
  };
}
