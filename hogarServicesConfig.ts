// Configuración de servicios de Hogar con causas y preguntas específicas

export type HogarServiceType = 
  | 'Gas'
  | 'Plomería'
  | 'Electricidad'
  | 'Cerrajería'
  | 'Vidrios'
  | 'Asistencia Jurídica';

export type SeverityType = 'Baja' | 'Media' | 'Alta' | 'Crítica' | 'No aplica';

export interface QuestionConfig {
  id: string;
  question: string;
  type: 'binary' | 'text'; // binary: Sí/No/No aplica, text: campo de texto + No aplica
  required?: boolean;
}

export interface CausaConfig {
  id: string;
  name: string;
  questions: QuestionConfig[];
}

export interface HogarServiceConfig {
  service: HogarServiceType;
  causas: CausaConfig[];
  generalInfo?: string; // Información adicional del servicio
}

// Configuración completa de servicios de Hogar
export const HOGAR_SERVICES_CONFIG: HogarServiceConfig[] = [
  {
    service: 'Cerrajería',
    causas: [
      {
        id: 'perdida-llaves',
        name: 'PERDIDA DE LLAVES DE HOGAR',
        questions: [
          { id: 'afectacion', question: '¿Cuál es la afectación que presenta?', type: 'text', required: true },
          { id: 'puerta-cerrada', question: '¿Qué puerta está cerrada?', type: 'text', required: true },
          { id: 'persona-dentro', question: '¿Hay alguna persona, especialmente un niño, adulto mayor o mascota dentro de la vivienda? ¿Existe alguna situación de riesgo como estufa encendida?', type: 'binary', required: true },
          { id: 'tipo-cerradura', question: 'Para enviar al técnico con las herramientas correctas, ¿podría describir el tipo de cerradura? ¿Es sencilla, de seguridad, tetra, de puntos, etc.?', type: 'text', required: true },
          { id: 'motivo-no-abrir', question: '¿Cuál es el motivo por el cual no pueden abrir la puerta? (llaves perdidas, llaves dentro de la vivienda, cerradura defectuosa, etc.)', type: 'text', required: true },
          { id: 'ubicacion-persona', question: '¿Se encuentra fuera o dentro de la vivienda actualmente?', type: 'text', required: true },
          { id: 'material-puerta', question: '¿De qué material es la puerta? (madera, metal, vidrio, blindada, etc.)', type: 'text', required: true }
        ]
      },
      {
        id: 'dano-cerradura',
        name: 'DAÑO EN CERRADURA',
        questions: [
          { id: 'afectacion', question: '¿Cuál es la afectación que presenta?', type: 'text', required: true },
          { id: 'puerta-cerrada', question: '¿Qué puerta está cerrada?', type: 'text', required: true },
          { id: 'persona-dentro', question: '¿Hay alguna persona, especialmente un niño, adulto mayor o mascota dentro de la vivienda? ¿Existe alguna situación de riesgo como estufa encendida?', type: 'binary', required: true },
          { id: 'tipo-cerradura', question: 'Para enviar al técnico con las herramientas correctas, ¿podría describir el tipo de cerradura? ¿Es sencilla, de seguridad, tetra, de puntos, etc.?', type: 'text', required: true },
          { id: 'motivo-no-abrir', question: '¿Cuál es el motivo por el cual no pueden abrir la puerta? (llaves perdidas, llaves dentro de la vivienda, cerradura defectuosa, etc.)', type: 'text', required: true },
          { id: 'ubicacion-persona', question: '¿Se encuentra fuera o dentro de la vivienda actualmente?', type: 'text', required: true },
          { id: 'material-puerta', question: '¿De qué material es la puerta? (madera, metal, vidrio, blindada, etc.)', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    service: 'Gas',
    causas: [
      {
        id: 'fugas-gas',
        name: 'FUGAS DE GAS',
        questions: [
          { id: 'ubicacion-fuga', question: '¿Identifica en qué parte se presenta la fuga?', type: 'text', required: true },
          { id: 'tuberia-visible', question: '¿La tubería se encuentra visible o está dentro/debajo de pared o mobiliario?', type: 'text', required: true },
          { id: 'valvula-cerrada', question: '¿Ya cerró la válvula de gas y abrió las ventanas?', type: 'binary', required: true },
          { id: 'olor-fuerte', question: '¿Percibe olor fuerte a gas dentro de la vivienda?', type: 'binary', required: true },
          { id: 'afectacion-areas', question: '¿El daño afecta únicamente su vivienda o también otras áreas?', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    service: 'Plomería',
    causas: [
      {
        id: 'tubo-roto',
        name: 'TUBO ROTO',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto y zona se presenta el problema?', type: 'text', required: true },
          { id: 'inundacion-goteo', question: '¿Se está inundando el área o es únicamente un goteo?', type: 'text', required: true },
          { id: 'afectacion-otras-areas', question: '¿El agua está afectando otras áreas de la vivienda o vecinos/copropiedad?', type: 'binary', required: true },
          { id: 'tuberia-visible', question: '¿La tubería está visible?', type: 'binary', required: true },
          { id: 'tipo-agua', question: '¿El daño corresponde a agua potable o desagüe?', type: 'text', required: true },
          { id: 'llave-paso', question: '¿Conoce la ubicación de la llave de paso o registro general? ¿Ya fue cerrada?', type: 'binary', required: true },
          { id: 'afectacion-constante', question: '¿La afectación es constante o intermitente?', type: 'text', required: true },
          { id: 'tiempo-problema', question: '¿Desde hace cuánto tiempo se presenta el problema?', type: 'text', required: true }
        ]
      },
      {
        id: 'inundacion',
        name: 'INUNDACION',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto y zona se presenta el problema?', type: 'text', required: true },
          { id: 'inundacion-goteo', question: '¿Se está inundando el área o es únicamente un goteo?', type: 'text', required: true },
          { id: 'afectacion-otras-areas', question: '¿El agua está afectando otras áreas de la vivienda o vecinos/copropiedad?', type: 'binary', required: true },
          { id: 'tuberia-visible', question: '¿La tubería está visible?', type: 'binary', required: true },
          { id: 'tipo-agua', question: '¿El daño corresponde a agua potable o desagüe?', type: 'text', required: true },
          { id: 'llave-paso', question: '¿Conoce la ubicación de la llave de paso o registro general? ¿Ya fue cerrada?', type: 'binary', required: true },
          { id: 'afectacion-constante', question: '¿La afectación es constante o intermitente?', type: 'text', required: true },
          { id: 'tiempo-problema', question: '¿Desde hace cuánto tiempo se presenta el problema?', type: 'text', required: true }
        ]
      },
      {
        id: 'filtraciones-fachada',
        name: 'FILTRACIONES POR FACHADA',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto y zona se presenta el problema?', type: 'text', required: true },
          { id: 'inundacion-goteo', question: '¿Se está inundando el área o es únicamente un goteo?', type: 'text', required: true },
          { id: 'afectacion-otras-areas', question: '¿El agua está afectando otras áreas de la vivienda o vecinos/copropiedad?', type: 'binary', required: true },
          { id: 'tuberia-visible', question: '¿La tubería está visible?', type: 'binary', required: true },
          { id: 'tipo-agua', question: '¿El daño corresponde a agua potable o desagüe?', type: 'text', required: true },
          { id: 'llave-paso', question: '¿Conoce la ubicación de la llave de paso o registro general? ¿Ya fue cerrada?', type: 'binary', required: true },
          { id: 'afectacion-constante', question: '¿La afectación es constante o intermitente?', type: 'text', required: true },
          { id: 'tiempo-problema', question: '¿Desde hace cuánto tiempo se presenta el problema?', type: 'text', required: true }
        ]
      },
      {
        id: 'danos-griferias',
        name: 'DANOS EN GRIFERIAS Y ACCESORIOS',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto y zona se presenta el problema?', type: 'text', required: true },
          { id: 'inundacion-goteo', question: '¿Se está inundando el área o es únicamente un goteo?', type: 'text', required: true },
          { id: 'afectacion-otras-areas', question: '¿El agua está afectando otras áreas de la vivienda o vecinos/copropiedad?', type: 'binary', required: true },
          { id: 'tuberia-visible', question: '¿La tubería está visible?', type: 'binary', required: true },
          { id: 'tipo-agua', question: '¿El daño corresponde a agua potable o desagüe?', type: 'text', required: true },
          { id: 'llave-paso', question: '¿Conoce la ubicación de la llave de paso o registro general? ¿Ya fue cerrada?', type: 'binary', required: true },
          { id: 'afectacion-constante', question: '¿La afectación es constante o intermitente?', type: 'text', required: true },
          { id: 'tiempo-problema', question: '¿Desde hace cuánto tiempo se presenta el problema?', type: 'text', required: true }
        ]
      },
      {
        id: 'taponamiento-redes',
        name: 'TAPONAMIENTO DE REDES',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto y zona se presenta el problema?', type: 'text', required: true },
          { id: 'inundacion-goteo', question: '¿Se está inundando el área o es únicamente un goteo?', type: 'text', required: true },
          { id: 'afectacion-otras-areas', question: '¿El agua está afectando otras áreas de la vivienda o vecinos/copropiedad?', type: 'binary', required: true },
          { id: 'tuberia-visible', question: '¿La tubería está visible?', type: 'binary', required: true },
          { id: 'tipo-agua', question: '¿El daño corresponde a agua potable o desagüe?', type: 'text', required: true },
          { id: 'llave-paso', question: '¿Conoce la ubicación de la llave de paso o registro general? ¿Ya fue cerrada?', type: 'binary', required: true },
          { id: 'afectacion-constante', question: '¿La afectación es constante o intermitente?', type: 'text', required: true },
          { id: 'tiempo-problema', question: '¿Desde hace cuánto tiempo se presenta el problema?', type: 'text', required: true }
        ]
      },
      {
        id: 'goteo-sifones',
        name: 'GOTEO DE SIFONES',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto y zona se presenta el problema?', type: 'text', required: true },
          { id: 'inundacion-goteo', question: '¿Se está inundando el área o es únicamente un goteo?', type: 'text', required: true },
          { id: 'afectacion-otras-areas', question: '¿El agua está afectando otras áreas de la vivienda o vecinos/copropiedad?', type: 'binary', required: true },
          { id: 'tuberia-visible', question: '¿La tubería está visible?', type: 'binary', required: true },
          { id: 'tipo-agua', question: '¿El daño corresponde a agua potable o desagüe?', type: 'text', required: true },
          { id: 'llave-paso', question: '¿Conoce la ubicación de la llave de paso o registro general? ¿Ya fue cerrada?', type: 'binary', required: true },
          { id: 'afectacion-constante', question: '¿La afectación es constante o intermitente?', type: 'text', required: true },
          { id: 'tiempo-problema', question: '¿Desde hace cuánto tiempo se presenta el problema?', type: 'text', required: true }
        ]
      },
      {
        id: 'danos-griferias-sanitarias',
        name: 'DANOS EN GRIFERIAS SANITARIAS Y CAMBIO DE ACCESORIOS',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto y zona se presenta el problema?', type: 'text', required: true },
          { id: 'inundacion-goteo', question: '¿Se está inundando el área o es únicamente un goteo?', type: 'text', required: true },
          { id: 'afectacion-otras-areas', question: '¿El agua está afectando otras áreas de la vivienda o vecinos/copropiedad?', type: 'binary', required: true },
          { id: 'tuberia-visible', question: '¿La tubería está visible?', type: 'binary', required: true },
          { id: 'tipo-agua', question: '¿El daño corresponde a agua potable o desagüe?', type: 'text', required: true },
          { id: 'llave-paso', question: '¿Conoce la ubicación de la llave de paso o registro general? ¿Ya fue cerrada?', type: 'binary', required: true },
          { id: 'afectacion-constante', question: '¿La afectación es constante o intermitente?', type: 'text', required: true },
          { id: 'tiempo-problema', question: '¿Desde hace cuánto tiempo se presenta el problema?', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    service: 'Electricidad',
    causas: [
      {
        id: 'sobrevoltajes',
        name: 'SOBREVOLTAJES',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto o zona del inmueble se presenta la afectación?', type: 'text', required: true },
          { id: 'energia-resto', question: '¿Tiene energía en el resto de la vivienda o el fallo es general?', type: 'text', required: true },
          { id: 'humo-chispas', question: '¿Hay presencia de humo, chispas u olor a quemado?', type: 'binary', required: true },
          { id: 'equipo-especifico', question: '¿La falla ocurrió después de conectar algún equipo específico?', type: 'binary', required: true },
          { id: 'lluvia-tormenta', question: '¿La afectación ocurrió durante lluvia o tormenta?', type: 'binary', required: true },
          { id: 'tacos-breakers', question: '¿Se dispararon tacos, breakers o interruptores?', type: 'binary', required: true },
          { id: 'equipos-afectados', question: '¿Hay equipos eléctricos afectados actualmente?', type: 'binary', required: true },
          { id: 'dano-permanente', question: '¿El daño es permanente o intermitente?', type: 'text', required: true }
        ]
      },
      {
        id: 'cortos-circuitos',
        name: 'CORTOS CIRCUITOS',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto o zona del inmueble se presenta la afectación?', type: 'text', required: true },
          { id: 'energia-resto', question: '¿Tiene energía en el resto de la vivienda o el fallo es general?', type: 'text', required: true },
          { id: 'humo-chispas', question: '¿Hay presencia de humo, chispas u olor a quemado?', type: 'binary', required: true },
          { id: 'equipo-especifico', question: '¿La falla ocurrió después de conectar algún equipo específico?', type: 'binary', required: true },
          { id: 'lluvia-tormenta', question: '¿La afectación ocurrió durante lluvia o tormenta?', type: 'binary', required: true },
          { id: 'tacos-breakers', question: '¿Se dispararon tacos, breakers o interruptores?', type: 'binary', required: true },
          { id: 'equipos-afectados', question: '¿Hay equipos eléctricos afectados actualmente?', type: 'binary', required: true },
          { id: 'dano-permanente', question: '¿El daño es permanente o intermitente?', type: 'text', required: true }
        ]
      },
      {
        id: 'salto-tacos',
        name: 'SALTO DE TACOS Y/O BREAKERS',
        questions: [
          { id: 'punto-zona', question: '¿En qué punto o zona del inmueble se presenta la afectación?', type: 'text', required: true },
          { id: 'energia-resto', question: '¿Tiene energía en el resto de la vivienda o el fallo es general?', type: 'text', required: true },
          { id: 'humo-chispas', question: '¿Hay presencia de humo, chispas u olor a quemado?', type: 'binary', required: true },
          { id: 'equipo-especifico', question: '¿La falla ocurrió después de conectar algún equipo específico?', type: 'binary', required: true },
          { id: 'lluvia-tormenta', question: '¿La afectación ocurrió durante lluvia o tormenta?', type: 'binary', required: true },
          { id: 'tacos-breakers', question: '¿Se dispararon tacos, breakers o interruptores?', type: 'binary', required: true },
          { id: 'equipos-afectados', question: '¿Hay equipos eléctricos afectados actualmente?', type: 'binary', required: true },
          { id: 'dano-permanente', question: '¿El daño es permanente o intermitente?', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    service: 'Vidrios',
    causas: [
      {
        id: 'rotura-division-bano',
        name: 'ROTURA EN DIVISION DE BAÑO',
        questions: [
          { id: 'lugar-vidrio', question: '¿En qué lugar se encuentra el vidrio afectado?', type: 'text', required: true },
          { id: 'roto-fisurado', question: '¿El vidrio está totalmente roto o únicamente fisurado?', type: 'text', required: true },
          { id: 'causa-dano', question: '¿El daño fue causado por accidente o intento de robo?', type: 'text', required: true },
          { id: 'tipo-vidrio', question: '¿El vidrio es común, templado o laminado?', type: 'text', required: true },
          { id: 'marco-afectado', question: '¿El marco también presenta afectación?', type: 'binary', required: true },
          { id: 'riesgo-inmediato', question: '¿La rotura representa riesgo inmediato para las personas?', type: 'binary', required: true },
          { id: 'abertura-expuesta', question: '¿La abertura quedó completamente expuesta?', type: 'binary', required: true }
        ]
      },
      {
        id: 'rotura-vidrios-planos',
        name: 'ROTURA DE VIDRIOS PLANOS Y PERMANENTES',
        questions: [
          { id: 'lugar-vidrio', question: '¿En qué lugar se encuentra el vidrio afectado?', type: 'text', required: true },
          { id: 'roto-fisurado', question: '¿El vidrio está totalmente roto o únicamente fisurado?', type: 'text', required: true },
          { id: 'causa-dano', question: '¿El daño fue causado por accidente o intento de robo?', type: 'text', required: true },
          { id: 'tipo-vidrio', question: '¿El vidrio es común, templado o laminado?', type: 'text', required: true },
          { id: 'marco-afectado', question: '¿El marco también presenta afectación?', type: 'binary', required: true },
          { id: 'riesgo-inmediato', question: '¿La rotura representa riesgo inmediato para las personas?', type: 'binary', required: true },
          { id: 'abertura-expuesta', question: '¿La abertura quedó completamente expuesta?', type: 'binary', required: true }
        ]
      },
      {
        id: 'rotura-cerramiento-ab',
        name: 'ROTURA EN VIDRIOS DE CERRAMIENTO A.B.',
        questions: [
          { id: 'lugar-vidrio', question: '¿En qué lugar se encuentra el vidrio afectado?', type: 'text', required: true },
          { id: 'roto-fisurado', question: '¿El vidrio está totalmente roto o únicamente fisurado?', type: 'text', required: true },
          { id: 'causa-dano', question: '¿El daño fue causado por accidente o intento de robo?', type: 'text', required: true },
          { id: 'tipo-vidrio', question: '¿El vidrio es común, templado o laminado?', type: 'text', required: true },
          { id: 'marco-afectado', question: '¿El marco también presenta afectación?', type: 'binary', required: true },
          { id: 'riesgo-inmediato', question: '¿La rotura representa riesgo inmediato para las personas?', type: 'binary', required: true },
          { id: 'abertura-expuesta', question: '¿La abertura quedó completamente expuesta?', type: 'binary', required: true }
        ]
      },
      {
        id: 'rotura-cerramiento',
        name: 'ROTURA VIDRIOS DE CERRAMIENTO',
        questions: [
          { id: 'lugar-vidrio', question: '¿En qué lugar se encuentra el vidrio afectado?', type: 'text', required: true },
          { id: 'roto-fisurado', question: '¿El vidrio está totalmente roto o únicamente fisurado?', type: 'text', required: true },
          { id: 'causa-dano', question: '¿El daño fue causado por accidente o intento de robo?', type: 'text', required: true },
          { id: 'tipo-vidrio', question: '¿El vidrio es común, templado o laminado?', type: 'text', required: true },
          { id: 'marco-afectado', question: '¿El marco también presenta afectación?', type: 'binary', required: true },
          { id: 'riesgo-inmediato', question: '¿La rotura representa riesgo inmediato para las personas?', type: 'binary', required: true },
          { id: 'abertura-expuesta', question: '¿La abertura quedó completamente expuesta?', type: 'binary', required: true }
        ]
      }
    ]
  },
  {
    service: 'Asistencia Jurídica',
    causas: [
      {
        id: 'orientacion-juridica',
        name: 'ORIENTACIÓN JURÍDICA',
        questions: [
          { id: 'motivo-consulta', question: '¿Cuál es el motivo de la consulta jurídica?', type: 'text', required: true },
          { id: 'relacionado-inmueble', question: '¿La orientación requerida está relacionada con el inmueble asegurado?', type: 'binary', required: true },
          { id: 'proceso-legal', question: '¿Existe algún proceso legal o requerimiento formal actualmente?', type: 'binary', required: true },
          { id: 'atencion-inmediata', question: '¿La situación requiere atención inmediata?', type: 'binary', required: true }
        ]
      }
    ],
    generalInfo: 'Recuerde que el servicio corresponde únicamente a orientación jurídica telefónica.'
  }
];

// Función helper para obtener las causas de un servicio
export const getCausasByService = (service: HogarServiceType): CausaConfig[] => {
  const serviceConfig = HOGAR_SERVICES_CONFIG.find(s => s.service === service);
  return serviceConfig?.causas || [];
};

// Función helper para obtener las preguntas de una causa específica
export const getQuestionsByCausa = (service: HogarServiceType, causaId: string): QuestionConfig[] => {
  const serviceConfig = HOGAR_SERVICES_CONFIG.find(s => s.service === service);
  const causa = serviceConfig?.causas.find(c => c.id === causaId);
  return causa?.questions || [];
};

// Función helper para obtener información general del servicio
export const getServiceGeneralInfo = (service: HogarServiceType): string | undefined => {
  const serviceConfig = HOGAR_SERVICES_CONFIG.find(s => s.service === service);
  return serviceConfig?.generalInfo;
};
