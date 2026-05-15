# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y este proyecto adhiere a [Versionamiento Semántico](https://semver.org/lang/es/).

## [No publicado]

### Agregado
- ✅ Se implementó carga dinámica de causas según servicio seleccionado en formulario de Hogar
- ✅ Se implementó renderizado dinámico de preguntas específicas según causa seleccionada
- ✅ Se agregaron funciones `renderDynamicQuestion` para renderizar preguntas binarias (Sí/No/No aplica) y de texto
- ✅ Se integró `hogarServicesConfig.ts` con el formulario usando funciones helper: `getCausasByService`, `getQuestionsByCausa`, `getServiceGeneralInfo`
- ✅ Se agregó visualización de información adicional del servicio (ej: "Recuerde que el servicio corresponde únicamente a orientación jurídica telefónica" para Asistencia Jurídica)
- ✅ Se implementó almacenamiento de respuestas de preguntas en `metadata.preguntas` de cada servicio
- ✅ Preguntas binarias con 3 opciones: Sí (verde), No (rojo), No aplica (gris)
- ✅ Preguntas de texto con campo de entrada + botón "No aplica"
- ✅ Animaciones suaves (fade-in, slide-in-from-top) para transiciones visuales al cargar preguntas
- ✅ Código compila correctamente sin errores
- ✅ Se agregaron campos de programación a ServiceMetadata: `fecha_programacion` y `hora_programacion`
- ✅ Campos de programación asociados individualmente a cada autorización (no al caso completo)
- ✅ Formato de fecha: YYYY-MM-DD, formato de hora: HH:MM
- ✅ Preparación para integrar sección de programación en la parte superior de cada card de autorización
- ✅ Se creó archivo `hogarServicesConfig.ts` con configuración completa de servicios de Hogar
- ✅ Se implementó estructura dinámica: Servicio → Causa/Específico → Preguntas operativas
- ✅ Se configuraron 6 servicios de Hogar: Gas, Plomería, Electricidad, Cerrajería, Vidrios, Asistencia Jurídica
- ✅ Se agregaron 20+ causas/específicos distribuidos entre los servicios
- ✅ Se implementaron 100+ preguntas operativas específicas por causa
- ✅ Tipos de preguntas: binarias (Sí/No/No aplica) y descriptivas (texto + No aplica)
- ✅ Funciones helper: `getCausasByService()`, `getQuestionsByCausa()`, `getServiceGeneralInfo()`
- ✅ Severidad configurable: Baja, Media, Alta, Crítica, No aplica
- ✅ Información adicional para Asistencia Jurídica: "Recuerde que el servicio corresponde únicamente a orientación jurídica telefónica"
- ✅ Código compila correctamente sin errores
- ✅ Se implementó validación de reportante diferente al asegurado/tomador en CreateCaseView (aplica para Hogar y Autos)
- ✅ Se agregó pregunta compacta tipo selector Sí/No: "¿La persona que se comunica es diferente al asegurado y al tomador?"
- ✅ Se agregó subtexto de apoyo: "Identifique si el reporte lo realiza un tercero (portero, vecino, familiar, conductor, administrador, etc.)"
- ✅ Se implementó card horizontal compacta que aparece dinámicamente al seleccionar "Sí"
- ✅ Card de reportante captura: Nombre completo, Teléfono de contacto, Relación con el riesgo
- ✅ Se agregaron estados `isDifferentReporter` y `reporterInfo` para manejar la información del reportante
- ✅ Funcionalidad reutilizable para Hogar y Autos con el mismo comportamiento y estructura visual
- ✅ Diseño compacto y limpio integrado naturalmente en el flujo existente
- ✅ Animaciones suaves (fade-in, slide-in-from-top) para transiciones visuales
- ✅ Colores coherentes con el sistema: gradiente azul-índigo para la card de reportante
- ✅ Si selecciona "No", no se realiza ninguna acción adicional y el flujo continúa normalmente
- ✅ Código compila correctamente sin errores
- ✅ Se implementó adaptación dinámica de cards según tipo de póliza (AUTOS vs HOGAR) en CreateCaseView
- ✅ **Card AZUL adaptativa**: Muestra "VEHÍCULO" para Autos o "UBICACIÓN DEL RIESGO" para Hogar
- ✅ **Card VERDE adaptativa**: Muestra "DATOS DE LA PÓLIZA" para Autos o "PÓLIZA Y PRODUCTO" para Hogar
- ✅ Se agregó estado `propertyInfo` para manejar información de dirección en pólizas de Hogar (departamento, ciudad, dirección, complemento)
- ✅ Card "UBICACIÓN DEL RIESGO" (Hogar) muestra: Departamento, Ciudad, Dirección completa, Complemento (campo editable)
- ✅ Card "PÓLIZA Y PRODUCTO" (Hogar - Verde) muestra: Número Póliza, Valor Póliza, Vigencia, Fechas Desde/Hasta, Nombre Comercial Producto con Código Tronador, Tipo de Cobertura
- ✅ Se actualizó función `handleAddFromSearch` para llenar `propertyInfo` cuando sea póliza de Hogar
- ✅ Campo "Complemento" permite al gestor agregar información adicional manualmente (apto, torre, interior, referencias)
- ✅ Se mantiene exactamente el mismo diseño visual, colores, estructura y jerarquía de las cards originales
- ✅ Se agregaron campos tronadorCode y commercialProductName al tipo Policy para soportar información de productos de Hogar
- ✅ Se actualizaron todas las pólizas de Hogar en datos mock con campos completos: commercialProductName, tronadorCode, insuredValue, startDate, endDate
- ✅ Ejemplos de productos Hogar: "Hogar para disfrutar" (109), "Hogar Digital Plus" (112), "Hogar El Libertador" (105), "Hogar Empresarial Plus" (115)
- ✅ Se implementó sistema de campos dinámicos completo para servicios de Autos basado en especificación de Field Service
- ✅ Se creó archivo serviceFieldsConfig.ts con mapeo completo de campos por servicio (40+ campos)
- ✅ Se agregaron 40+ campos nuevos a la interfaz ServiceMetadata para capturar información específica de cada servicio
- ✅ Se implementaron funciones de renderizado dinámico: renderSelectInput, renderTextareaInput, renderFileInput, renderDynamicField
- ✅ Se agregó función getServiceFields() que retorna los campos exactos requeridos por cada servicio según especificación
- ✅ Cada servicio ahora muestra dinámicamente solo los campos que necesita según la matriz de Field Service
- ✅ Conductor elegido ahora muestra 21 campos (antes 10): departamento_origen, ciudad_origen, direccion_origen, fecha_y_hora_prestacion, departamento_destino, ciudad_de_destino, direccion_de_destino, caracteristicas_origen, caracteristicas_destino, observaciones_adicionales, marca_vehiculo, modelo, programado, nombre_solicitante, telefono, imagenes, cargue_evidencias
- ✅ Se creó archivo de respaldo CreateCaseView.tsx.backup para poder revertir cambios si es necesario
- ✅ Se reordenó serviceFieldsConfig.ts para agrupar campos lógicamente: primero todos los campos de ORIGEN (departamento, ciudad, dirección, características), luego todos los de DESTINO (departamento, ciudad, dirección, características), finalmente otros campos específicos del servicio
- ✅ Los campos ahora se muestran en orden lógico correcto validado por el usuario

### Cambiado
- ✅ Se actualizó selector de Causa/Específico para cargar opciones dinámicamente según servicio seleccionado
- ✅ Se mejoró la sección de Preguntas Específicas con renderizado condicional según tipo de pregunta (binary/text)
- ✅ Se optimizó la limpieza de respuestas al cambiar servicio o causa para evitar datos inconsistentes
- Se actualizaron todas las pólizas de Autos para incluir los 20 servicios completos en enabledServices: Conductor elegido, Conductor Familiar, Trasporte para viajes, Trasporte de producto, Transporte ocupantes al destino/domicilio, translado documentos y mercancía, Abogado: Asistencia presencial, Abogado: Asistencia telefónica, Cerrajería autos, Carro taller por barada, Carro taller instalación de batería, Móvil presencial (CESVI), Deposito/custodia, Grúa salida custodia, Grua accidente, Gra accedente pesados, Grua varada, Grua varada pesados, moto grua, Rescate

### Eliminado
- Se eliminó la sección duplicada de "Seleccionar Servicio Habilitado" que aparecía en la parte superior después de las tarjetas de colores
- Ahora el servicio solo se selecciona una vez dentro del formulario de "Detalle de Asistencia"

### Agregado
- Se agregó el servicio "Móvil presencial (CESVI)" al tipo ServiceType y a la lista de servicios disponibles para Autos

### Cambiado
- Se modificó la tarjeta morada de EVENTO para que muestre un mensaje informativo cuando no hay datos de servicios diligenciados
- La tarjeta de EVENTO ahora muestra "Los datos del evento se completarán al diligenciar los servicios" en lugar de mostrar datos vacíos o de fallback
- Se corrigió la tarjeta verde de PÓLIZA para que muestre los datos correctamente usando selectedResult como fallback

### Agregado
- Se agregó nuevo cliente Ana Sofía Martínez (CC: 1098765432, Placa: DEF789) con Tomador diferente al Asegurado para probar la funcionalidad
- Se agregaron campos policyHolderDocumentType, policyHolderDocument y policyHolderName al tipo Policy para soportar tomadores diferentes
- Se actualizó handleAddFromSearch para detectar automáticamente cuando el Tomador es diferente al Asegurado y llenar los formularios correctamente
- Se agregó lógica inteligente en la tarjeta amarilla de ASEGURADO para detectar si Tomador y Asegurado son la misma persona
- Cuando Tomador = Asegurado, se muestra un mensaje "✓ Tomador y Asegurado: Misma Persona" y se evita duplicar información
- Cuando Tomador ≠ Asegurado, se muestran ambos conjuntos de datos separados con secciones claramente identificadas

### Cambiado
- Se actualizaron los códigos de producto a formato numérico (101, 102, 103, 104, 105) en lugar de alfanumérico
- Se actualizó el campo branchName (Ramo Emisión) a código numérico "15" para Autos
- Se actualizaron los valores de altura a números simples (1, 2, 3, 4) en lugar de "01"
- Se movieron los campos de Tomador y Asegurado de la tarjeta verde (PÓLIZA) a la tarjeta amarilla (ASEGURADO)
- Se reorganizó la tarjeta amarilla para mostrar dinámicamente los datos según si Tomador y Asegurado son la misma persona o no

### Eliminado
- Se eliminó el campo "Clave Agente" de la tarjeta verde de DATOS DE LA PÓLIZA

### Agregado
- Se completaron todos los campos de vehículo en los datos mock de pólizas de Autos: línea, número de pasajeros, VIN, código Fasecolda, clase, servicio, uso, tipo y blindaje
- Se actualizó la tarjeta azul de VEHÍCULO en CreateCaseView para mostrar los 13 campos completos del vehículo
- Se agregaron nuevos campos al tipo Policy en types.ts para soportar toda la información del vehículo
- Se completaron los datos de vehículo en los casos mock de App.tsx con todos los campos requeridos
- Se completaron todos los campos de póliza en los datos mock: código producto, nombre producto, ramo emisión, secuencia, altura, fechas inicio/fin vigencia, valor asegurado y clave agente
- Se actualizó la tarjeta verde de DATOS DE LA PÓLIZA para mostrar todos los campos completos

### Cambiado
- Se modificó el formato del campo vehicleModel para separar año de la línea (ej: "2022" en lugar de "Corolla 2022")
- Se actualizó la función handleAddFromSearch para mapear todos los campos nuevos del vehículo y póliza desde la póliza seleccionada
- Se redujeron las dimensiones de las cards de resultados de búsqueda para hacerlas más compactas y amigables (padding, tamaños de fuente, espaciados)
- Se cambió el grid de 3 columnas a 4 columnas en pantallas grandes para aprovechar mejor el espacio
- Se agregó truncamiento de texto (line-clamp) para nombres de producto y asegurado largos
- Se agregaron labels descriptivos en las cards de resultados de búsqueda: "PRODUCTO" para el nombre de la póliza y "ASEGURADO" para el nombre del cliente

### Agregado
- Se implementó búsqueda unificada de pólizas de Hogar y Autos en CreateCaseView
- Se agregaron campos al tipo Policy para soportar pólizas de Hogar (propertyAddress, propertyType, coverageType, policyType, renovationNumber)
- Se agregó campo coverageTypeAuto ('Familiar' | 'Estándar') para mostrar tipo de cobertura específico en pólizas de Autos
- Se agregaron datos mock de pólizas de Hogar para cliente María García (CC: 1122334455)
- Se agregó cliente empresarial Pepitos Asociados S.A.S. (NIT: 9001234567) con 5 inmuebles asegurados (oficinas, bodegas y locales comerciales)
- Se implementó búsqueda inteligente que acepta Cédula, NIT (Hogar) o Placa (Autos)
- Se agregaron cards reutilizables que se adaptan dinámicamente según tipo de póliza (Hogar vs Autos)
- Se implementó indicador visual de estado de póliza (Vigente/Vencida) en cards de resultados
- Se agregó número de renovación de póliza en esquina superior derecha de cada card
- Se implementó información contextual dinámica: dirección y tipo de cobertura para Hogar, placa y tipo de cobertura (Familiar/Estándar) para Autos
- Se agregó contador de pólizas encontradas por tipo (Hogar/Autos) en resultados de búsqueda
- Se agregó hint visual en buscador indicando criterios de búsqueda por tipo: HOGAR (Cédula/NIT) y AUTOS (Cédula/Placa)

### Eliminado
- Se eliminó modal de alerta "CLIENTE DE ALTO RIESGO" que bloqueaba el flujo de búsqueda
- Se eliminaron funciones handleContinueWithRisk y handleCancelRiskProcess ya no necesarias
- Se eliminó estado blacklistAlert del componente CreateCaseView

### Cambiado
- Se modificó placeholder del buscador de "Ingrese Placa o Cédula..." a "Ingrese Cédula, NIT o Placa..."
- Se actualizó función handleSearch para buscar SOLO por Cédula/NIT o Placa (sin búsqueda por número de póliza)
- Se rediseñaron cards de resultados múltiples con iconos diferenciados por tipo (casa para Hogar, auto para Autos)
- Se actualizó estructura de MOCK_CUSTOMERS para incluir pólizas de ambos tipos con todos los campos requeridos
- Se modificó visualización de tipo de cobertura en Autos para mostrar "Familiar" o "Estándar" en lugar del nombre completo de la póliza
- Se cambió comportamiento de búsqueda para mostrar siempre cards de resultados (incluso con 1 solo resultado) en lugar de selección automática
- Se modificó handleSearch para mostrar directamente las cards de selección cuando el cliente está en lista negra (sin modal intermedio)
- Se actualizó card de "Alerta de Alto Riesgo" en resumen superior para usar riskAccepted en lugar de blacklistAlert

### Agregado
- Se agregó modal visual de alerta de lista negra con información detallada del riesgo y recomendaciones
- Se agregó banner persistente de validación de riesgo que permanece visible después de aceptar continuar con un cliente de alto riesgo
- Se agregaron todos los campos faltantes a las tarjetas coloridas en CreateCaseView para que coincidan con CaseDetailsView (VIN, Fasecolda, Clase, Servicio, Uso, Tipo, Blindaje, Código Producto, Ramo Emisión, Secuencia, Altura, Inicio/Fin Vigencia, Clave Agente)
- **Se creó componente UnifiedPolicySearch: búsqueda unificada inteligente para Hogar y Autos con cards reutilizables, indicadores de estado, renovación, barra de progreso de vigencia y contenido dinámico según tipo de póliza**

### Cambiado
- Se reordenó la sección "Seleccionar Servicio Habilitado" para aparecer después de las tarjetas de información de colores en CreateCaseView
- Se simplificaron los datos de prueba a solo 2 clientes: Juan Pérez (con 2 vehículos, en lista negra) y Carlos Rodríguez (con 1 vehículo, sin problemas)

### Cambiado
- Se modificó el diseño de las tarjetas de visualización en CreateCaseView para mostrar información en formato de solo lectura (labels + valores) en lugar de campos editables, coincidiendo con el diseño de CaseDetailsView
- Las tarjetas coloridas ahora se muestran inmediatamente después de consultar una cédula o placa (cuando selectedResult tiene datos), no solo después de añadir al caso
- Las tarjetas muestran datos de selectedResult cuando aún no se ha añadido al caso, y datos de los formularios después de añadir al caso

### Eliminado
- Se eliminaron todos los formularios de entrada de datos de la columna izquierda (Información del Vehículo, Datos del Tomador, Datos del Asegurado, Datos de Contacto, Datos de la Póliza)
- La interfaz ahora solo muestra las tarjetas coloridas de visualización después de consultar y la sección de servicios

### Agregado
- Se agregó botón de calculadora (tarificador) en la esquina superior derecha al lado del botón "Crear Caso"
- Se agregó cuadro de seguimiento "R" (Reporte) a los hitos de servicios existentes (C, 50, 75, 100, 200)
- Se agregó funcionalidad completa para añadir servicios adicionales a casos existentes
- Se agregó botón "Añadir Servicio" en el header al lado del contador de servicios activos
- Se agregó formulario desplegable inline para agregar nuevos servicios con animación suave
- Se agregó funcionalidad para eliminar servicios recién agregados con confirmación de usuario
- Se agregó botón de eliminar (icono de papelera) que aparece al hacer hover sobre los servicios
- Se implementó sistema de lista negra para asegurados de alto riesgo
- Se agregó cuarto cuadro de alerta en la sección superior junto a Nº de Caso, Segmento CLV y Estado Póliza
- Se agregó validación automática contra lista negra al buscar por cédula o placa
- Se agregó indicador visual "Alto Riesgo - Requiere validación" que aparece cuando se detecta cliente en lista negra
- Se expandieron los campos de vehículo en CreateCaseView para incluir los 13 campos completos (placa, marca, modelo, color, línea, pasajeros, VIN, Fasecolda, clase, servicio, uso, tipo, blindaje)
- Se expandieron los campos de asegurado en CreateCaseView para incluir tipo documento, tipo persona, número celular y teléfono fijo
- Se expandieron los campos de tomador en CreateCaseView para incluir tipo documento
- Se agregó sección completa de "Datos de la Póliza" en CreateCaseView con 11 campos (código producto, nombre producto, nombre ramo, número, secuencia, altura, fechas inicio/fin, valor asegurado, estado, clave agente)

### Corregido
- Se corrigió el layout de CreateCaseView para que los formularios de entrada se oculten completamente cuando aparecen las tarjetas coloridas
- Se ajustó el grid layout para que las tarjetas coloridas ocupen el ancho completo cuando isCaseAdded es true
- Se corrigió la sección de servicios para que ocupe el ancho completo (12 columnas) cuando se muestran las tarjetas coloridas

### Cambiado
- Se actualizó completamente el diseño visual de CaseDetailsView con colores vibrantes y modernos
- Se aplicaron gradientes de colores a las tarjetas laterales: azul vibrante para vehículo, amarillo/ámbar para asegurado, verde esmeralda para póliza, púrpura/índigo para evento
- Se mejoró el contraste y legibilidad con texto blanco sobre fondos de colores saturados
- Se aumentaron las sombras y efectos de profundidad (shadow-2xl) para un aspecto más moderno
- Se actualizaron las tarjetas de origen/destino con gradientes verde esmeralda y púrpura/rosa
- Se mejoró el diseño del formulario de añadir servicio con gradiente azul/índigo/púrpura y bordes más gruesos
- Se actualizaron los botones con gradientes vibrantes y sombras más pronunciadas
- Se mejoró la sección de seguimiento operativo con botones más grandes (14x14) y colores más saturados
- Se actualizó el header de la tabla de servicios con gradiente y mejor contraste
- Se incrementó el tamaño de los bordes de 1px a 2px en elementos clave para mayor definición
- Se modificó la interfaz ServiceMetadata para incluir el campo reporte
- Se reemplazó el sistema de pestañas por un formulario desplegable más intuitivo
- Se mejoró la experiencia de usuario con formulario inline que se oculta/muestra dinámicamente
- Se modificó el componente ServiceItem para incluir botón de eliminación con confirmación
- Se optimizó el layout del formulario de agregar servicio con diseño en grid responsivo
- Se modificó la función de búsqueda en CreateCaseView para verificar lista negra antes de mostrar resultados
- Se reorganizó CreateCaseView para mostrar 4 tarjetas coloridas de solo lectura en la parte superior (Vehículo azul, Asegurado amarillo, Póliza verde, Evento púrpura)
- Se convirtieron las tarjetas en componentes de visualización con todos los campos detallados mostrados de forma estática
- Se movieron las tarjetas coloridas a la parte superior del layout, siempre visibles, mostrando la información capturada en los formularios inferiores
- Se actualizó completamente el diseño visual de CaseDetailsView con colores vibrantes y modernos
- Se aplicaron gradientes de colores a las tarjetas laterales: azul vibrante para vehículo, amarillo/ámbar para asegurado, verde esmeralda para póliza, púrpura/índigo para evento
- Se mejoró el contraste y legibilidad con texto blanco sobre fondos de colores saturados
- Se aumentaron las sombras y efectos de profundidad (shadow-2xl) para un aspecto más moderno
- Se actualizaron las tarjetas de origen/destino con gradientes verde esmeralda y púrpura/rosa
- Se mejoró el diseño del formulario de añadir servicio con gradiente azul/índigo/púrpura y bordes más gruesos
- Se actualizaron los botones con gradientes vibrantes y sombras más pronunciadas
- Se mejoró la sección de seguimiento operativo con botones más grandes (14x14) y colores más saturados
- Se actualizó el header de la tabla de servicios con gradiente y mejor contraste
- Se incrementó el tamaño de los bordes de 1px a 2px en elementos clave para mayor definición
- Se modificó la interfaz ServiceMetadata para incluir el campo reporte
- Se reemplazó el sistema de pestañas por un formulario desplegable más intuitivo
- Se mejoró la experiencia de usuario con formulario inline que se oculta/muestra dinámicamente
- Se modificó el componente ServiceItem para incluir botón de eliminación con confirmación
- Se optimizó el layout del formulario de agregar servicio con diseño en grid responsivo
- Se modificó la función de búsqueda en CreateCaseView para verificar lista negra antes de mostrar resultados
- Se aplicó el mismo diseño de tarjetas coloridas vibrantes en CreateCaseView que aparecen después de añadir un caso
- Se implementó renderizado condicional de tarjetas coloridas en CreateCaseView basado en el estado isCaseAdded
- Se actualizó CreateCaseView para mostrar 4 tarjetas coloridas (Vehículo, Asegurado, Póliza, Evento) con los mismos gradientes y estilos que CaseDetailsView
- Se modificó el layout de CreateCaseView para ocultar formularios de entrada cuando se muestran las tarjetas coloridas