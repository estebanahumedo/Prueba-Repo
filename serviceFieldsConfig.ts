import { ServiceType } from './types';

// Configuración de campos por servicio según especificación Field Service
export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'datetime-local' | 'select' | 'toggle' | 'textarea' | 'file';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export const getServiceFields = (serviceType: ServiceType): FieldConfig[] => {
  // GRUPO 1: CAMPOS DE ORIGEN
  const originFields: FieldConfig[] = [
    { name: 'departamento_origen', label: 'Departamento Origen', type: 'text', placeholder: 'Ej. Antioquia', required: true },
    { name: 'ciudad_origen', label: 'Ciudad Origen', type: 'text', placeholder: 'Ej. Medellín', required: true },
    { name: 'direccion_origen', label: 'Dirección Origen', type: 'text', placeholder: 'Calle 10 # 43 - 50', required: true },
    { name: 'caracteristicas_origen', label: 'Características Origen', type: 'textarea', placeholder: 'Conjunto, torre, apto, quien entrega...' },
  ];

  // GRUPO 2: CAMPOS DE DESTINO
  const destinationFields: FieldConfig[] = [
    { name: 'departamento_destino', label: 'Departamento Destino', type: 'text', placeholder: 'Ej. Bogotá D.C.' },
    { name: 'ciudad_de_destino', label: 'Ciudad Destino', type: 'text', placeholder: 'Ej. Bogotá' },
    { name: 'direccion_de_destino', label: 'Dirección Destino', type: 'text', placeholder: 'Carrera 7 # 100-20' },
    { name: 'caracteristicas_destino', label: 'Características Destino', type: 'textarea', placeholder: 'Conjunto, torre, apto, quien recibe...' },
  ];

  // GRUPO 3: FECHA Y HORA
  const dateTimeFields: FieldConfig[] = [
    { name: 'fecha_y_hora_prestacion', label: 'Fecha y Hora Prestación', type: 'datetime-local', required: true },
  ];

  const vehicleFields: FieldConfig[] = [
    { name: 'marca_vehiculo', label: 'Marca Vehículo', type: 'text', placeholder: 'Toyota, Ford...' },
    { name: 'modelo', label: 'Modelo', type: 'text', placeholder: '2023' },
  ];

  const observationsFields: FieldConfig[] = [
    { name: 'observaciones_adicionales', label: 'Observaciones Adicionales', type: 'textarea', placeholder: 'Indicaciones especiales...' },
  ];

  const contactFields: FieldConfig[] = [
    { name: 'nombre_solicitante', label: 'Nombre Solicitante', type: 'text', placeholder: 'Nombre completo' },
    { name: 'telefono', label: 'Teléfono', type: 'text', placeholder: '3001234567' },
  ];

  const evidenceFields: FieldConfig[] = [
    { name: 'imagenes', label: 'Imágenes Iniciales', type: 'file' },
    { name: 'cargue_evidencias', label: 'Cargue Evidencias Finales', type: 'file' },
  ];

  const transportFields: FieldConfig[] = [
    { name: 'cantidad_personas', label: 'Cantidad Personas', type: 'number', placeholder: '1-7' },
    { name: 'maletas', label: 'Cantidad Maletas', type: 'number', placeholder: '0-10' },
    { name: 'peso_maletas', label: 'Peso Maletas (kg)', type: 'number', placeholder: '0-50' },
  ];

  const specialRequirementFields: FieldConfig[] = [
    { name: 'requerimiento_especial', label: 'Requerimiento Especial', type: 'text', placeholder: 'Ej: compresor de aire' },
  ];

  const dimensionFields: FieldConfig[] = [
    { name: 'alto', label: 'Alto (m)', type: 'number', placeholder: '0.00' },
    { name: 'ancho', label: 'Ancho (m)', type: 'number', placeholder: '0.00' },
    { name: 'largo', label: 'Largo (m)', type: 'number', placeholder: '0.00' },
    { name: 'peso', label: 'Peso (kg)', type: 'number', placeholder: '0' },
  ];

  const towingFields: FieldConfig[] = [
    { name: 'vehiculo_se_encuentra_en_la_via', label: '¿Vehículo en la vía?', type: 'toggle' },
    { name: 'vehiculo_esta_en_un_lugar_de_facil_acceso_para_la_grua', label: '¿Fácil acceso para grúa?', type: 'toggle' },
    { name: 'vehiculo_presenta_algun_bloqueo_en_la_caja_o_llantas_estan_frenadas', label: '¿Bloqueo en caja o llantas?', type: 'toggle' },
    { name: 'esta_cargado', label: '¿Está cargado?', type: 'toggle' },
    { name: 'toneladas_carga', label: 'Toneladas de Carga', type: 'number', placeholder: '0.0' },
    { name: 'cual_es_el_dano_que_presenta', label: '¿Cuál es el daño?', type: 'textarea', placeholder: 'Describa el daño...' },
    { name: 'requiere_transporte', label: '¿Requiere transporte?', type: 'toggle' },
  ];

  const heavyVehicleFields: FieldConfig[] = [
    { name: 'tipo_troque', label: 'Tipo Troque', type: 'select', options: ['Doble', 'Sencillo'] },
    { name: 'tipo_llanta', label: 'Tipo Llanta', type: 'select', options: ['Doble', 'Sencilla'] },
    { name: 'tipo_carroceria', label: 'Tipo Carrocería', type: 'text', placeholder: 'Furgón, estacas, grúa, cisterna...' },
  ];

  const rescueFields: FieldConfig[] = [
    { name: 'detalles_rescate', label: 'Detalles del Rescate', type: 'textarea', placeholder: 'Tipo de rescate, nivel sótano/piso, bloqueo...' },
  ];

  const programmedField: FieldConfig[] = [
    { name: 'programado', label: '¿Servicio Programado?', type: 'toggle' },
  ];

  const electricHybridField: FieldConfig[] = [
    { name: 'electrico_hibrido', label: 'Eléctrico/Híbrido', type: 'select', options: ['Ninguno', 'Eléctrico', 'Híbrido'] },
  ];

  // Mapeo de campos por servicio (ORDEN LÓGICO: Origen → Destino → Otros)
  switch (serviceType) {
    case 'Conductor elegido':
    case 'Conductor Familiar':
      return [
        ...originFields,           // Departamento, Ciudad, Dirección, Características ORIGEN
        ...destinationFields,      // Departamento, Ciudad, Dirección, Características DESTINO
        ...dateTimeFields,         // Fecha y Hora
        ...vehicleFields,          // Marca, Modelo
        ...observationsFields,     // Observaciones
        ...programmedField,        // ¿Programado?
        ...contactFields,          // Nombre, Teléfono
        ...evidenceFields,         // Imágenes, Evidencias
      ];

    case 'Trasporte para viajes':
      return [
        ...originFields,
        ...destinationFields,
        ...dateTimeFields,
        ...vehicleFields,
        ...transportFields,        // Personas, Maletas, Peso
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    case 'Trasporte de producto':
    case 'translado documentos y mercancía':
      return [
        ...originFields,
        ...destinationFields,
        ...dateTimeFields,
        ...vehicleFields,
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    case 'Transporte ocupantes al destino/domicilio':
      return [
        ...originFields,
        ...destinationFields,
        ...dateTimeFields,
        ...transportFields,
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    case 'Abogado: Asistencia presencial':
    case 'Abogado: Asistencia telefónica':
    case 'Cerrajería autos':
    case 'Móvil presencial (CESVI)':
      return [
        ...originFields,
        ...dateTimeFields,
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    case 'Carro taller por barada':
      return [
        ...originFields,
        ...dateTimeFields,
        ...vehicleFields,
        ...electricHybridField,
        ...specialRequirementFields,
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    case 'Carro taller instalación de batería':
      return [
        ...originFields,
        ...dateTimeFields,
        ...vehicleFields,
        ...electricHybridField,
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    case 'Deposito/custodia':
    case 'Grúa salida custodia':
    case 'Grua accidente':
    case 'Grua varada':
    case 'moto grua':
      return [
        ...originFields,
        ...destinationFields,
        ...dateTimeFields,
        ...vehicleFields,
        ...dimensionFields,
        ...towingFields,
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    case 'Gra accedente pesados':
    case 'Grua varada pesados':
      return [
        ...originFields,
        ...destinationFields,
        ...dateTimeFields,
        ...vehicleFields,
        ...dimensionFields,
        ...towingFields,
        ...heavyVehicleFields,
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    case 'Rescate':
      return [
        ...originFields,
        ...dateTimeFields,
        ...vehicleFields,
        ...dimensionFields,
        ...rescueFields,
        ...observationsFields,
        ...programmedField,
        ...contactFields,
        ...evidenceFields,
      ];

    default:
      return [
        ...originFields,
        ...dateTimeFields,
        ...observationsFields,
        ...contactFields,
        ...evidenceFields,
      ];
  }
};
