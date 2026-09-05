import { 
  CediInfo, 
  DimActor, 
  DimProducto, 
  FlujoLogisticoInfo, 
  MayoristaInfo, 
  PdvEntregaItem,
  RegLote, 
  TransDevolucion, 
  TransInventario 
} from '../types';

export const CEDIS_LIST: CediInfo[] = [
  { id: 'Z1', nombre: 'CEDI Z1 - Asunción', ciudad: 'Asunción', zona: 'Capital y Gran Asunción', capacidadLitros: 450000, stockActualLitros: 382000, ocupacionPct: 84.8, otifPct: 98.4, temperaturaCamara: 3.2, mayoristasCount: 5, coordenadas: { x: 180, y: 340 } },
  { id: 'Z2', nombre: 'CEDI Z2 - Villarrica', ciudad: 'Villarrica', zona: 'Guairá', capacidadLitros: 220000, stockActualLitros: 178000, ocupacionPct: 80.9, otifPct: 96.8, temperaturaCamara: 3.4, mayoristasCount: 5, coordenadas: { x: 300, y: 390 } },
  { id: 'Z3', nombre: 'CEDI Z3 - Tomás Romero Pereira', ciudad: 'Tomás Romero Pereira', zona: 'Itapúa Norte', capacidadLitros: 190000, stockActualLitros: 145000, ocupacionPct: 76.3, otifPct: 95.1, temperaturaCamara: 3.1, mayoristasCount: 5, coordenadas: { x: 380, y: 520 } },
  { id: 'Z4', nombre: 'CEDI Z4 - Abasto Norte', ciudad: 'Limpio', zona: 'Central Norte', capacidadLitros: 380000, stockActualLitros: 320000, ocupacionPct: 84.2, otifPct: 97.9, temperaturaCamara: 3.0, mayoristasCount: 5, coordenadas: { x: 210, y: 310 } },
  { id: 'Z5', nombre: 'CEDI Z5 - Ciudad del Este', ciudad: 'Ciudad del Este', zona: 'Alto Paraná', capacidadLitros: 420000, stockActualLitros: 360000, ocupacionPct: 85.7, otifPct: 97.2, temperaturaCamara: 3.3, mayoristasCount: 5, coordenadas: { x: 520, y: 360 } },
  { id: 'Z6', nombre: 'CEDI Z6 - Coronel Oviedo', ciudad: 'Coronel Oviedo', zona: 'Caaguazú Oeste', capacidadLitros: 280000, stockActualLitros: 210000, ocupacionPct: 75.0, otifPct: 96.5, temperaturaCamara: 3.5, mayoristasCount: 5, coordenadas: { x: 320, y: 330 } },
  { id: 'Z7', nombre: 'CEDI Z7 - Caaguazú', ciudad: 'Caaguazú (Campo 9 Planta)', zona: 'Caaguazú Centro', capacidadLitros: 500000, stockActualLitros: 440000, ocupacionPct: 88.0, otifPct: 99.1, temperaturaCamara: 2.8, mayoristasCount: 5, coordenadas: { x: 390, y: 335 } },
  { id: 'Z8', nombre: 'CEDI Z8 - San Estanislao', ciudad: 'San Estanislao (Santaní)', zona: 'San Pedro Sur', capacidadLitros: 210000, stockActualLitros: 160000, ocupacionPct: 76.1, otifPct: 94.8, temperaturaCamara: 3.6, mayoristasCount: 5, coordenadas: { x: 300, y: 240 } },
  { id: 'Z9', nombre: 'CEDI Z9 - Vaquería', ciudad: 'Vaquería', zona: 'Caaguazú Norte', capacidadLitros: 150000, stockActualLitros: 105000, ocupacionPct: 70.0, otifPct: 95.3, temperaturaCamara: 3.4, mayoristasCount: 5, coordenadas: { x: 420, y: 290 } },
  { id: 'Z10', nombre: 'CEDI Z10 - Caacupé', ciudad: 'Caacupé', zona: 'Cordillera', capacidadLitros: 230000, stockActualLitros: 192000, ocupacionPct: 83.4, otifPct: 97.0, temperaturaCamara: 3.2, mayoristasCount: 5, coordenadas: { x: 230, y: 350 } },
  { id: 'Z11', nombre: 'CEDI Z11 - Santa Rosa del Aguaray', ciudad: 'Santa Rosa', zona: 'San Pedro Norte', capacidadLitros: 180000, stockActualLitros: 128000, ocupacionPct: 71.1, otifPct: 94.2, temperaturaCamara: 3.5, mayoristasCount: 5, coordenadas: { x: 310, y: 170 } },
  { id: 'Z12', nombre: 'CEDI Z12 - Encarnación', ciudad: 'Encarnación', zona: 'Itapúa Sur', capacidadLitros: 340000, stockActualLitros: 290000, ocupacionPct: 85.2, otifPct: 97.6, temperaturaCamara: 3.1, mayoristasCount: 5, coordenadas: { x: 330, y: 580 } },
  { id: 'Z13', nombre: 'CEDI Z13 - Carapeguá', ciudad: 'Carapeguá', zona: 'Paraguarí', capacidadLitros: 170000, stockActualLitros: 130000, ocupacionPct: 76.4, otifPct: 96.0, temperaturaCamara: 3.3, mayoristasCount: 5, coordenadas: { x: 220, y: 400 } },
];

export const ACOPIADORES_DATA = [
  { id: 'ALZ_Z1', nombre: 'Acopiador Zona 1 (Campo 9)', zona: 'J. Eulogio Estigarribia', tamberosCount: 25, ruta: 'Ruta PY02 Este', capacidadDia: 85000 },
  { id: 'ALZ_Z2', nombre: 'Acopiador Zona 2 (Sommerfeld)', zona: 'Dr. J. Eulogio Estigarribia Norte', tamberosCount: 35, ruta: 'Ruta Som-01', capacidadDia: 120000 },
  { id: 'ALZ_Z3', nombre: 'Acopiador Zona 3 (Bergthal)', zona: 'Colonia Bergthal', tamberosCount: 20, ruta: 'Ruta Bergthal', capacidadDia: 68000 },
  { id: 'ALZ_Z4', nombre: 'Acopiador Zona 4 (Raúl A. Oviedo)', zona: 'Raúl Arsenio Oviedo', tamberosCount: 30, ruta: 'Ruta PY13', capacidadDia: 95000 },
  { id: 'ALZ_Z5', nombre: 'Acopiador Zona 5 (Mcal. López)', zona: 'Mariscal López / Caaguazú', tamberosCount: 15, ruta: 'Ruta Mcal. López', capacidadDia: 48000 },
];

export const PRODUCTOS_DATA: DimProducto[] = [
  { id_producto: 1, nombre_producto: 'Leche Entera UHT Clásica 1L', categoria: 'Leches', presentacion: 'Caja Tetra Pak 1L (Caja x 12 u.)', vida_util_dias: 180, temperatura_optima: 'Ambiente (<25°C)' },
  { id_producto: 2, nombre_producto: 'Leche Descremada UHT 1L', categoria: 'Leches', presentacion: 'Caja Tetra Pak 1L (Caja x 12 u.)', vida_util_dias: 180, temperatura_optima: 'Ambiente (<25°C)' },
  { id_producto: 3, nombre_producto: 'Leche Deslactosada UHT 1L', categoria: 'Leches', presentacion: 'Caja Tetra Pak 1L (Caja x 12 u.)', vida_util_dias: 180, temperatura_optima: 'Ambiente (<25°C)' },
  { id_producto: 4, nombre_producto: 'Yogur Bebible Frutilla 1L', categoria: 'Yogures', presentacion: 'Botella PEAD 1L (Fardo x 6 u.)', vida_util_dias: 45, temperatura_optima: 'Refrigerado 2°C - 5°C' },
  { id_producto: 5, nombre_producto: 'Yogur Firme Vainilla 125g', categoria: 'Yogures', presentacion: 'Pote Termoformado 125g (Pack x 4 u.)', vida_util_dias: 40, temperatura_optima: 'Refrigerado 2°C - 5°C' },
  { id_producto: 6, nombre_producto: 'Leche Chocolatada Choco-Lact 200ml', categoria: 'Leches', presentacion: 'Tetra Brik 200ml con pajita', vida_util_dias: 150, temperatura_optima: 'Ambiente (<25°C)' },
  { id_producto: 7, nombre_producto: 'Queso Paraguay Tradicional 500g', categoria: 'Quesos', presentacion: 'Envasado al vacío 500g', vida_util_dias: 60, temperatura_optima: 'Refrigerado 4°C - 8°C' },
  { id_producto: 8, nombre_producto: 'Queso Mozzarella Barra 2.5kg', categoria: 'Quesos', presentacion: 'Barra al vacío 2.5kg', vida_util_dias: 90, temperatura_optima: 'Refrigerado 2°C - 5°C' },
  { id_producto: 9, nombre_producto: 'Dulce de Leche Tradicional 500g', categoria: 'Grasas y Dulces', presentacion: 'Pote Plástico 500g', vida_util_dias: 180, temperatura_optima: 'Ambiente fresco y seco' },
  { id_producto: 10, nombre_producto: 'Manteca Extra con Sal 200g', categoria: 'Grasas y Dulces', presentacion: 'Papel manteca aluminizado 200g', vida_util_dias: 90, temperatura_optima: 'Refrigerado 2°C - 5°C' },
  { id_producto: 11, nombre_producto: 'Crema de Leche Fresca 200g', categoria: 'Grasas y Dulces', presentacion: 'Pote 200g', vida_util_dias: 60, temperatura_optima: 'Refrigerado 2°C - 4°C' }
];

export const LOTES_DATA: RegLote[] = [
  {
    id_lote: 'LOT-YOG-2026-004',
    fk_producto: 4,
    nombre_producto: 'Yogur Bebible Frutilla 1L',
    fecha_fabricacion: '2026-08-15',
    fecha_vencimiento: '2026-09-29',
    estado_calidad: 'Aprobado',
    origen_acopiador: 'Acopiador Zona 1 (Campo 9)',
    tamberos_involucrados: ['Tambo Don Carlos #03', 'Tambo Santa María #11', 'Tambo San Jorge #18'],
    silo_almacenamiento: 'Silo Frío #04 - Cap. 50.000 L',
    temperatura_pasteurizacion: '85°C durante 20 segundos (HTST)',
    parametros_calidad: {
      grasa: '3.1%',
      proteina: '3.2%',
      acidez_dornic: '16.5°D',
      conteo_bacteriano: '<25.000 UFC/ml',
      prueba_alcohol: 'Negativa (Estable a 72°)'
    },
    cedi_destino: 'CEDI Z5 - Ciudad del Este',
    camion_cisterna: 'Cisterna Inox Scania #09 (Chapa LAB-402)'
  },
  {
    id_lote: 'LOT-LECH-2026-012',
    fk_producto: 1,
    nombre_producto: 'Leche Entera UHT Clásica 1L',
    fecha_fabricacion: '2026-08-20',
    fecha_vencimiento: '2027-02-16',
    estado_calidad: 'Aprobado',
    origen_acopiador: 'Acopiador Zona 2 (Sommerfeld)',
    tamberos_involucrados: ['Tambo Sommerfeld A-02', 'Tambo Friesen B-14', 'Tambo Neufeld C-22'],
    silo_almacenamiento: 'Silo Frío #01 - Cap. 100.000 L',
    temperatura_pasteurizacion: '142°C durante 4 segundos (UHT Ultra Alta)',
    parametros_calidad: {
      grasa: '3.5%',
      proteina: '3.3%',
      acidez_dornic: '15.8°D',
      conteo_bacteriano: 'Esterilidad comercial UHT',
      prueba_alcohol: 'Negativa (Estable a 76°)'
    },
    cedi_destino: 'CEDI Z1 - Asunción',
    camion_cisterna: 'Cisterna Mercedes Actros #14 (Chapa BKL-890)'
  },
  {
    id_lote: 'LOT-QUES-2026-088',
    fk_producto: 7,
    nombre_producto: 'Queso Paraguay Tradicional 500g',
    fecha_fabricacion: '2026-08-01',
    fecha_vencimiento: '2026-09-30',
    estado_calidad: 'Aprobado',
    origen_acopiador: 'Acopiador Zona 3 (Bergthal)',
    tamberos_involucrados: ['Tambo Bergthal G-05', 'Tambo Hiebert G-09'],
    silo_almacenamiento: 'Cuba Quesera Pasteurizada #02',
    temperatura_pasteurizacion: '72°C durante 15 segundos',
    parametros_calidad: {
      grasa: '22.4%',
      proteina: '20.1%',
      acidez_dornic: '18.0°D',
      conteo_bacteriano: 'Libre de Coliformes y Salmonella',
      prueba_alcohol: 'Conforme'
    },
    cedi_destino: 'CEDI Z4 - Abasto Norte',
    camion_cisterna: 'Cisterna Volvo FMX #07'
  },
  {
    id_lote: 'LOT-CHOC-2026-031',
    fk_producto: 6,
    nombre_producto: 'Leche Chocolatada Choco-Lact 200ml',
    fecha_fabricacion: '2026-07-28',
    fecha_vencimiento: '2026-12-25',
    estado_calidad: 'Aprobado',
    origen_acopiador: 'Acopiador Zona 4 (Raúl A. Oviedo)',
    tamberos_involucrados: ['Tambo San Pedro #08', 'Tambo Los Cedros #17'],
    silo_almacenamiento: 'Tanque Mezclador UHT #05',
    temperatura_pasteurizacion: '138°C durante 4 segundos',
    parametros_calidad: {
      grasa: '2.5%',
      proteina: '3.0%',
      acidez_dornic: '16.0°D',
      conteo_bacteriano: 'Estéril UHT',
      prueba_alcohol: 'Negativa'
    },
    cedi_destino: 'CEDI Z12 - Encarnación',
    camion_cisterna: 'Cisterna Scania R450 #12'
  },
  {
    id_lote: 'LOT-DULC-2026-007',
    fk_producto: 9,
    nombre_producto: 'Dulce de Leche Tradicional 500g',
    fecha_fabricacion: '2026-06-10',
    fecha_vencimiento: '2026-12-10',
    estado_calidad: 'Aprobado',
    origen_acopiador: 'Acopiador Zona 5 (Mcal. López)',
    tamberos_involucrados: ['Tambo El Paraíso #04', 'Tambo Bella Vista #12'],
    silo_almacenamiento: 'Paila Evaporadora Concentradora #01',
    temperatura_pasteurizacion: 'Concentración al vacío 105°C',
    parametros_calidad: {
      grasa: '7.8%',
      proteina: '6.5%',
      acidez_dornic: 'Bicarbonato dosificado pH 6.8',
      conteo_bacteriano: '<10 UFC/g Hongos y Levaduras',
      prueba_alcohol: 'Conforme'
    },
    cedi_destino: 'CEDI Z2 - Villarrica',
    camion_cisterna: 'Cisterna Inox #03'
  },
  {
    id_lote: 'LOT-YOG-2026-001-RET',
    fk_producto: 4,
    nombre_producto: 'Yogur Bebible Frutilla 1L',
    fecha_fabricacion: '2026-07-01',
    fecha_vencimiento: '2026-08-15',
    estado_calidad: 'Bloqueado ERP',
    origen_acopiador: 'Acopiador Zona 1 (Campo 9)',
    tamberos_involucrados: ['Tambo Don Carlos #03'],
    silo_almacenamiento: 'Silo Frío #04',
    temperatura_pasteurizacion: '85°C',
    parametros_calidad: {
      grasa: '3.0%',
      proteina: '3.1%',
      acidez_dornic: '22°D (Acidez elevada post vencimiento)',
      conteo_bacteriano: 'Caducado',
      prueba_alcohol: 'Positiva'
    },
    cedi_destino: 'CEDI Z5 - Ciudad del Este',
    camion_cisterna: 'Cisterna Inox #09'
  }
];

export const FLUJOS_TABLA_DATA: FlujoLogisticoInfo[] = [
  {
    id_flujo: 'F01',
    area_origen: 'Tamberos (125 productores primarios)',
    dominio_origen: 'Aprovisionamiento',
    area_destino: 'Acopiadores de Leche (5 zonas)',
    dominio_destino: 'Logística de entrada de aprovisionamiento',
    motivo_o_recurso: 'Suministro de materia prima (Leche natural)',
    responsable: 'Abastecimiento',
    proceso_a_realizar: 'Ordeño diario, almacenamiento en tanques de enfriamiento en finca y control primario de acidez.',
    kpi_control: 'Litros colectados vs. planificados',
    tipo_logistica: 'Entrada'
  },
  {
    id_flujo: 'F02',
    area_origen: 'Acopiadores de Leche',
    dominio_origen: 'Logística de entrada de aprovisionamiento',
    area_destino: 'Abastecimiento (Planta Campo 9)',
    dominio_destino: 'Logística de entrada de aprovisionamiento',
    motivo_o_recurso: 'Entrega de materia prima consolidada',
    responsable: 'Abastecimiento',
    proceso_a_realizar: 'Transporte en camiones cisterna bajo contrato. Recepción y control de calidad físico-química y microbiológica en planta Campo 9.',
    kpi_control: '% de Leche rechazada en recepción',
    tipo_logistica: 'Entrada'
  },
  {
    id_flujo: 'F03',
    area_origen: 'Abastecimiento',
    dominio_origen: 'Logística de entrada de aprovisionamiento',
    area_destino: 'Producción (Industrialización)',
    dominio_destino: 'Logística interna o intralogística',
    motivo_o_recurso: 'Transferencia de materia prima filtrada',
    responsable: 'Producción',
    proceso_a_realizar: 'Bombeo de leche fluida aprobada hacia silos de almacenamiento interno y clarificación para inicio de industrialización.',
    kpi_control: 'Rendimiento de materia prima (%)',
    tipo_logistica: 'Intralogística'
  },
  {
    id_flujo: 'F04',
    area_origen: 'Producción',
    dominio_origen: 'Logística interna o intralogística',
    area_destino: 'Comercialización (Depósito PT)',
    dominio_destino: 'Logística interna o intralogística',
    motivo_o_recurso: 'Transferencia de producto terminado',
    responsable: 'Comercialización',
    proceso_a_realizar: 'Almacenamiento de productos envasados en depósitos de frío. Registro de lotes y habilitación para la venta comercial.',
    kpi_control: 'Rotación de stock en depósito (días)',
    tipo_logistica: 'Intralogística'
  },
  {
    id_flujo: 'F05',
    area_origen: 'Comercialización',
    dominio_origen: 'Logística interna o intralogística',
    area_destino: "CEDI'S (13 Centros)",
    dominio_destino: 'Logística interna o intralogística',
    motivo_o_recurso: 'Despacho masivo y distribución primaria',
    responsable: 'Logística Integral',
    proceso_a_realizar: 'Carga y transporte a los 13 Centros de Distribución propios. Recepción y estiba respetando cadena de frío.',
    kpi_control: 'Tiempo de ciclo de pedido (horas)',
    tipo_logistica: 'Intralogística'
  },
  {
    id_flujo: 'F06',
    area_origen: "CEDI'S",
    dominio_origen: 'Logística interna o intralogística',
    area_destino: 'Distribuidor Mayorista (65 Mayoristas)',
    dominio_destino: 'Logística de salida o de distribución',
    motivo_o_recurso: 'Transferencia de stock regionalizado',
    responsable: 'Logística Integral',
    proceso_a_realizar: 'Distribución de lotes a los 5 mayoristas zonificados de cada CEDI (65 en total) según hojas de ruta planificadas.',
    kpi_control: 'Exactitud del inventario (IRA %)',
    tipo_logistica: 'Salida'
  },
  {
    id_flujo: 'F07',
    area_origen: 'Distribuidor Mayorista',
    dominio_origen: 'Logística de salida o de distribución',
    area_destino: 'PDV (5 Canales Minoristas)',
    dominio_destino: 'Distribución capilar',
    motivo_o_recurso: 'Surtido capilar minorista (Frecuencia semanal)',
    responsable: 'Comercialización',
    proceso_a_realizar: 'Entrega física de última milla a los 5 canales de venta minorista (Supermercados, Despensas, Autoservicios, etc.).',
    kpi_control: 'Nivel de Servicio al Cliente (OTIF %)',
    tipo_logistica: 'Salida'
  },
  {
    id_flujo: 'F08',
    area_origen: 'PDV',
    dominio_origen: 'Punto de Venta Minorista',
    area_destino: 'Consumidor final',
    dominio_destino: 'Consumo Masivo',
    motivo_o_recurso: 'Venta final al consumidor',
    responsable: 'Comercialización',
    proceso_a_realizar: 'Exhibición en góndola (cuidando el principio FEFO/PEPS) y facturación al cliente en caja.',
    kpi_control: 'Tasa de agotamiento de stock (%)',
    tipo_logistica: 'Salida'
  },
  {
    id_flujo: 'F09',
    area_origen: 'Consumidor final',
    dominio_origen: 'Cliente Final',
    area_destino: 'PDV',
    dominio_destino: 'Punto de Venta',
    motivo_o_recurso: 'a) Producto Defectuoso (Contenido en mal estado)',
    responsable: 'Comercialización',
    proceso_a_realizar: 'Cambio Directo o Reembolso: El PDV verifica la falla (ej. leche cortada), cambia el producto al cliente en el acto y lo traslada físicamente al área segregada de "Mermas" del local.',
    kpi_control: 'Tasa de Reclamos de Clientes (PPM)',
    tipo_logistica: 'Inversa'
  },
  {
    id_flujo: 'F10',
    area_origen: 'PDV',
    dominio_origen: 'Punto de Venta',
    area_destino: 'Distribuidor Mayorista',
    dominio_destino: 'Logística de salida o de distribución',
    motivo_o_recurso: 'a) Producto Defectuoso (Contenido en mal estado)',
    responsable: 'Comercialización',
    proceso_a_realizar: 'Retiro y Conciliación Semanal: El mayorista retira el producto defectuoso en su visita, emite Remito de Devolución para Nota de Crédito y lo transporta al CEDI.',
    kpi_control: '% de Devoluciones por Calidad en Canal',
    tipo_logistica: 'Inversa'
  },
  {
    id_flujo: 'F11',
    area_origen: 'PDV',
    dominio_origen: 'Punto de Venta',
    area_destino: 'Distribuidor Mayorista',
    dominio_destino: 'Logística de salida o de distribución',
    motivo_o_recurso: 'b) Producto Averiado (Envases dañados)',
    responsable: 'Logística Integral',
    proceso_a_realizar: 'Rechazo en el Acto: El PDV detecta la avería al recibir el pedido actual. Se tacha el ítem de la factura original para refactura. El mayorista retorna el envase dañado.',
    kpi_control: '% de Mermas por Transporte de Última Milla',
    tipo_logistica: 'Inversa'
  },
  {
    id_flujo: 'F12',
    area_origen: 'PDV',
    dominio_origen: 'Punto de Venta',
    area_destino: 'Distribuidor Mayorista',
    dominio_destino: 'Logística de salida o de distribución',
    motivo_o_recurso: 'c) Exceso de Inventario (Vencimiento cercano)',
    responsable: 'Comercialización',
    proceso_a_realizar: 'Evaluación Comercial: Si cumple el plazo (ej: 15 días antes de vencer), el mayorista lo retira con nota de crédito para reubicarlo rápido en canales de alta rotación.',
    kpi_control: '% de Sobrestock en Canal Minorista',
    tipo_logistica: 'Inversa'
  },
  {
    id_flujo: 'F13',
    area_origen: 'Consumidor final',
    dominio_origen: 'Cliente Final',
    area_destino: 'PDV',
    dominio_destino: 'Punto de Venta',
    motivo_o_recurso: 'd) Producto Vencido',
    responsable: 'Comercialización',
    proceso_a_realizar: 'Reclamación y Auditoría: Reembolso al consumidor. El PDV destruye el producto y ejecuta obligatoriamente una auditoría de rotación física (FEFO) en su góndola.',
    kpi_control: 'Incidentes de Producto Vencido en Góndola',
    tipo_logistica: 'Inversa'
  },
  {
    id_flujo: 'F14',
    area_origen: 'PDV',
    dominio_origen: 'Punto de Venta',
    area_destino: 'Distribuidor Mayorista',
    dominio_destino: 'Logística de salida o de distribución',
    motivo_o_recurso: 'd) Producto Vencido (Caducado en góndola)',
    responsable: 'Logística Integral',
    proceso_a_realizar: 'Retiro sin Crédito (Merma): El mayorista retira el producto caducado de los estantes. Aplica penalización por merma pactada y traslada para su destrucción.',
    kpi_control: 'Tasa de Vencimiento de Producto en Góndola',
    tipo_logistica: 'Inversa'
  },
  {
    id_flujo: 'F15',
    area_origen: 'Distribuidor Mayorista',
    dominio_origen: 'Logística de salida o de distribución',
    area_destino: "CEDI'S",
    dominio_destino: 'Logística interna o intralogística',
    motivo_o_recurso: 'Consolidado de Retornos (F10 a F14)',
    responsable: 'Logística Integral',
    proceso_a_realizar: 'Ingreso al Dominio Interno: El CEDI recibe las devoluciones de los camiones. Pesa, clasifica en el ERP (Defectuoso, Vencido, etc.) y almacena en cámara de reversa.',
    kpi_control: 'Costo de Logística Inversa por Distribuidor',
    tipo_logistica: 'Inversa'
  },
  {
    id_flujo: 'F16',
    area_origen: "CEDI'S",
    dominio_origen: 'Logística interna o intralogística',
    area_destino: 'Producción (Planta Campo 9)',
    dominio_destino: 'Logística interna o intralogística',
    motivo_o_recurso: 'Consolidado General de Mermas (Muestras)',
    responsable: 'Logística Integral',
    proceso_a_realizar: 'Auditoría y Disposición Final: Planta Campo 9 recibe la carga masiva. Calidad evalúa: Reutilización/Desvío (solo F11 y F12 aptos) o Destrucción (F10 y F14 a efluentes).',
    kpi_control: '% de Merma Reutilizada vs. Destruida',
    tipo_logistica: 'Inversa'
  }
];

export const DIM_ACTORES_DATA: DimActor[] = [
  { id_actor: 1, nombre_actor: 'Tamberos (125 Productores Primarios)', tipo_actor: 'Tambo', dominio_logistico: 'Aprovisionamiento', zona: 'Campo 9, Sommerfeld, Bergthal, R.A. Oviedo, Mcal. López', stockActual: 416000, mermaPct: 0.8, otifPct: 98.9, flujosAsociados: ['F01'] },
  { id_actor: 2, nombre_actor: 'Acopiadores de Leche (5 Zonas)', tipo_actor: 'Acopiador', dominio_logistico: 'Aprovisionamiento', zona: 'Zonas Z1 a Z5 - Camiones cisterna con frío', stockActual: 395000, mermaPct: 0.4, otifPct: 99.1, flujosAsociados: ['F01', 'F02'] },
  { id_actor: 3, nombre_actor: 'Abastecimiento y Silos (Campo 9)', tipo_actor: 'Empresa', dominio_logistico: 'Intralogística', zona: 'Distrito J. E. Estigarribia, Dpto. Caaguazú', stockActual: 620000, mermaPct: 0.2, otifPct: 99.6, flujosAsociados: ['F02', 'F03'] },
  { id_actor: 4, nombre_actor: 'Producción e Industrialización (Campo 9)', tipo_actor: 'Empresa', dominio_logistico: 'Intralogística', zona: 'Planta Central - Pasteurización, UHT, Quesería, Yogurtería', stockActual: 580000, mermaPct: 1.1, otifPct: 98.7, flujosAsociados: ['F03', 'F04', 'F16'] },
  { id_actor: 5, nombre_actor: 'Comercialización y Depósito PT', tipo_actor: 'Empresa', dominio_logistico: 'Intralogística', zona: 'Cámaras Frigoríficas de Despacho Masivo', stockActual: 740000, mermaPct: 0.3, otifPct: 99.0, flujosAsociados: ['F04', 'F05'] },
  { id_actor: 6, nombre_actor: "CEDI Asunción (Z1)", tipo_actor: 'CEDI', dominio_logistico: 'Intralogística', zona: 'Asunción', stockActual: 382000, mermaPct: 0.9, otifPct: 98.4, flujosAsociados: ['F05', 'F06', 'F15', 'F16'] },
  { id_actor: 7, nombre_actor: "CEDI Este (Z5 Ciudad del Este)", tipo_actor: 'CEDI', dominio_logistico: 'Intralogística', zona: 'Alto Paraná', stockActual: 360000, mermaPct: 1.4, otifPct: 97.2, flujosAsociados: ['F05', 'F06', 'F15', 'F16'] },
  { id_actor: 8, nombre_actor: "CEDI Caaguazú (Z7)", tipo_actor: 'CEDI', dominio_logistico: 'Intralogística', zona: 'Caaguazú', stockActual: 440000, mermaPct: 0.6, otifPct: 99.1, flujosAsociados: ['F05', 'F06', 'F15', 'F16'] },
  { id_actor: 9, nombre_actor: "CEDI Villarrica (Z2)", tipo_actor: 'CEDI', dominio_logistico: 'Intralogística', zona: 'Guairá', stockActual: 178000, mermaPct: 0.8, otifPct: 96.8, flujosAsociados: ['F05', 'F06', 'F15', 'F16'] },
  { id_actor: 10, nombre_actor: 'Distribuidores Mayoristas (65 Exclusivos)', tipo_actor: 'Mayorista', dominio_logistico: 'Distribución', zona: '5 mayoristas por cada uno de los 13 CEDIs', stockActual: 215000, mermaPct: 1.2, otifPct: 96.5, flujosAsociados: ['F06', 'F07', 'F10', 'F11', 'F12', 'F14', 'F15'] },
  { id_actor: 11, nombre_actor: 'Puntos de Venta (5 Canales Minoristas)', tipo_actor: 'PDV', dominio_logistico: 'Distribución', zona: 'Supermercados, Despensas, Conveniencia, Autoservicios, HORECA', stockActual: 180000, mermaPct: 1.8, otifPct: 95.8, flujosAsociados: ['F07', 'F08', 'F09', 'F10', 'F11', 'F12', 'F13', 'F14'] },
  { id_actor: 12, nombre_actor: 'Consumidor Final', tipo_actor: 'Consumidor', dominio_logistico: 'N/A', zona: 'Hogares en todo Paraguay', stockActual: 0, mermaPct: 0, otifPct: 99.9, flujosAsociados: ['F08', 'F09', 'F13'] }
];

export const INITIAL_DEVOLUCIONES: TransDevolucion[] = [
  {
    id_devolucion: 101,
    fk_movimiento_origen: 5042,
    fk_actor_origen: 11,
    nombre_origen: 'Superseis Los Laureles (Canal Supermercados)',
    fk_actor_destino: 7, // CEDI Este
    nombre_destino: 'CEDI Z5 - Ciudad del Este',
    fk_lote: 'LOT-YOG-2026-001-RET',
    nombre_producto: 'Yogur Bebible Frutilla 1L',
    tipo_devolucion: 'Vencido',
    cantidad_devuelta: 180,
    unidad: 'Litros (unidades)',
    estado_proceso: 'Almacenado en CEDI',
    destino_final: 'Destrucción / Efluente',
    fecha_registro: '2026-09-02 09:15',
    bloqueo_lotes_hermanos: true,
    observaciones: 'Lote caducado en góndola. Se aplicó bloqueo preventivo en ERP para el stock residual en CEDI.'
  },
  {
    id_devolucion: 102,
    fk_movimiento_origen: 5038,
    fk_actor_origen: 11,
    nombre_origen: 'Stock CDE Centro (Canal Supermercados)',
    fk_actor_destino: 7, // CEDI Este
    nombre_destino: 'CEDI Z5 - Ciudad del Este',
    fk_lote: 'LOT-LECH-2026-009',
    nombre_producto: 'Leche Entera UHT Clásica 1L',
    tipo_devolucion: 'Vencido',
    cantidad_devuelta: 240,
    unidad: 'Litros',
    estado_proceso: 'Inspección en Campo 9',
    destino_final: 'Destrucción / Efluente',
    fecha_registro: '2026-09-03 11:30',
    bloqueo_lotes_hermanos: true,
    observaciones: 'F14 Retiro sin crédito por mayorista DM Z5 2. Verificado en cámara reversa de CEDI Este.'
  },
  {
    id_devolucion: 103,
    fk_movimiento_origen: 5029,
    fk_actor_origen: 11,
    nombre_origen: 'Despensa Don Bernardo (Canal Despensas)',
    fk_actor_destino: 7, // CEDI Este
    nombre_destino: 'CEDI Z5 - Ciudad del Este',
    fk_lote: 'LOT-QUES-2026-081',
    nombre_producto: 'Queso Paraguay Tradicional 500g',
    tipo_devolucion: 'Vencido',
    cantidad_devuelta: 65,
    unidad: 'Unidades (500g)',
    estado_proceso: 'Registrado en PDV',
    destino_final: 'Destrucción / Efluente',
    fecha_registro: '2026-09-04 14:10',
    bloqueo_lotes_hermanos: true,
    observaciones: 'F13 Reclamo consumidor y posterior retiro en ruta semanal.'
  },
  {
    id_devolucion: 104,
    fk_movimiento_origen: 5015,
    fk_actor_origen: 11,
    nombre_origen: 'Biggie Express Carmelitas (Canal Conveniencia)',
    fk_actor_destino: 6, // CEDI Asunción
    nombre_destino: 'CEDI Z1 - Asunción',
    fk_lote: 'LOT-YOG-2026-004',
    nombre_producto: 'Yogur Bebible Frutilla 1L',
    tipo_devolucion: 'Averiado',
    cantidad_devuelta: 48,
    unidad: 'Unidades',
    estado_proceso: 'Almacenado en CEDI',
    destino_final: 'Re-empaque Secundario',
    fecha_registro: '2026-09-01 16:20',
    bloqueo_lotes_hermanos: false,
    observaciones: 'F11 Golpes en termoencogible secundario durante transporte de última milla. Producto sellado intacto.'
  },
  {
    id_devolucion: 105,
    fk_movimiento_origen: 5012,
    fk_actor_origen: 11,
    nombre_origen: 'Autoservicio El Sol (Canal Autoservicios)',
    fk_actor_destino: 6, // CEDI Asunción
    nombre_destino: 'CEDI Z1 - Asunción',
    fk_lote: 'LOT-DULC-2026-007',
    nombre_producto: 'Dulce de Leche Tradicional 500g',
    tipo_devolucion: 'Exceso',
    cantidad_devuelta: 120,
    unidad: 'Unidades',
    estado_proceso: 'Retirado por Mayorista',
    destino_final: 'Desvío a Subproducto Industrial',
    fecha_registro: '2026-09-03 08:45',
    bloqueo_lotes_hermanos: false,
    observaciones: 'F12 Retiro 18 días antes de caducidad acordado con comercial para venta en panaderías industriales.'
  },
  {
    id_devolucion: 106,
    fk_movimiento_origen: 5009,
    fk_actor_origen: 11,
    nombre_origen: 'Hotel Dazzler Asunción (Canal HORECA)',
    fk_actor_destino: 6, // CEDI Asunción
    nombre_destino: 'CEDI Z1 - Asunción',
    fk_lote: 'LOT-LECH-2026-002',
    nombre_producto: 'Leche Entera UHT Clásica 1L',
    tipo_devolucion: 'Defectuoso',
    cantidad_devuelta: 60,
    unidad: 'Litros',
    estado_proceso: 'Inspección en Campo 9',
    destino_final: 'Destrucción / Efluente',
    fecha_registro: '2026-09-04 10:05',
    bloqueo_lotes_hermanos: true,
    observaciones: 'F10 Leche con sedimentación y corte detectada en recepción de cocina. Notificado a aseguramiento de calidad.'
  }
];

export const INITIAL_TRANS_INVENTARIO: TransInventario[] = [
  { id_movimiento: 5001, fk_lote: 'LOT-LECH-2026-012', fk_actor_origen: 1, nombre_origen: 'Tamberos Sommerfeld', fk_actor_destino: 2, nombre_destino: 'Acopiador Zona 2', cantidad: 35000, unidad: 'Litros', fecha_hora: '2026-08-19 06:30', id_flujo_asociado: 'F01' },
  { id_movimiento: 5002, fk_lote: 'LOT-LECH-2026-012', fk_actor_origen: 2, nombre_origen: 'Acopiador Zona 2', fk_actor_destino: 3, nombre_destino: 'Abastecimiento Campo 9', cantidad: 34850, unidad: 'Litros', fecha_hora: '2026-08-19 11:45', id_flujo_asociado: 'F02' },
  { id_movimiento: 5003, fk_lote: 'LOT-LECH-2026-012', fk_actor_origen: 3, nombre_origen: 'Abastecimiento Campo 9', fk_actor_destino: 4, nombre_destino: 'Producción Planta', cantidad: 34850, unidad: 'Litros', fecha_hora: '2026-08-20 07:00', id_flujo_asociado: 'F03' },
  { id_movimiento: 5004, fk_lote: 'LOT-LECH-2026-012', fk_actor_origen: 4, nombre_origen: 'Producción Planta', fk_actor_destino: 5, nombre_destino: 'Comercialización PT', cantidad: 34500, unidad: 'Cajas x 1L', fecha_hora: '2026-08-20 18:30', id_flujo_asociado: 'F04' },
  { id_movimiento: 5005, fk_lote: 'LOT-LECH-2026-012', fk_actor_origen: 5, nombre_origen: 'Comercialización PT', fk_actor_destino: 6, nombre_destino: 'CEDI Z1 - Asunción', cantidad: 12000, unidad: 'Cajas x 1L', fecha_hora: '2026-08-21 04:00', id_flujo_asociado: 'F05' },
  { id_movimiento: 5006, fk_lote: 'LOT-LECH-2026-012', fk_actor_origen: 6, nombre_origen: 'CEDI Z1 - Asunción', fk_actor_destino: 10, nombre_destino: 'Mayorista DM Z1 1', cantidad: 2500, unidad: 'Cajas x 1L', fecha_hora: '2026-08-22 06:15', id_flujo_asociado: 'F06' },
  { id_movimiento: 5007, fk_lote: 'LOT-LECH-2026-012', fk_actor_origen: 10, nombre_origen: 'Mayorista DM Z1 1', fk_actor_destino: 11, nombre_destino: 'Supermercado Stock Luque', cantidad: 500, unidad: 'Cajas x 1L', fecha_hora: '2026-08-23 09:00', id_flujo_asociado: 'F07' },
  { id_movimiento: 5008, fk_lote: 'LOT-LECH-2026-012', fk_actor_origen: 11, nombre_origen: 'Supermercado Stock Luque', fk_actor_destino: 12, nombre_destino: 'Consumidor Final', cantidad: 480, unidad: 'Unidades 1L', fecha_hora: '2026-08-24 18:00', id_flujo_asociado: 'F08' },
  
  // Flujos de CEDI Este vinculados a devoluciones
  { id_movimiento: 5042, fk_lote: 'LOT-YOG-2026-001-RET', fk_actor_origen: 6, nombre_origen: 'Mayorista DM Z5 1', fk_actor_destino: 7, nombre_destino: 'CEDI Z5 - Ciudad del Este', cantidad: 180, unidad: 'Litros', fecha_hora: '2026-08-10 10:00', id_flujo_asociado: 'F06' },
  { id_movimiento: 5038, fk_lote: 'LOT-LECH-2026-009', fk_actor_origen: 6, nombre_origen: 'Mayorista DM Z5 2', fk_actor_destino: 7, nombre_destino: 'CEDI Z5 - Ciudad del Este', cantidad: 240, unidad: 'Litros', fecha_hora: '2026-08-12 14:30', id_flujo_asociado: 'F06' },
  { id_movimiento: 5029, fk_lote: 'LOT-QUES-2026-081', fk_actor_origen: 6, nombre_origen: 'Mayorista DM Z5 4', fk_actor_destino: 7, nombre_destino: 'CEDI Z5 - Ciudad del Este', cantidad: 65, unidad: 'Unidades', fecha_hora: '2026-08-14 08:20', id_flujo_asociado: 'F06' },
  { id_movimiento: 5015, fk_lote: 'LOT-YOG-2026-004', fk_actor_origen: 6, nombre_origen: 'Mayorista DM Z1 3', fk_actor_destino: 6, nombre_destino: 'CEDI Z1 - Asunción', cantidad: 48, unidad: 'Unidades', fecha_hora: '2026-08-28 11:00', id_flujo_asociado: 'F06' },
  { id_movimiento: 5012, fk_lote: 'LOT-DULC-2026-007', fk_actor_origen: 6, nombre_origen: 'Mayorista DM Z1 4', fk_actor_destino: 6, nombre_destino: 'CEDI Z1 - Asunción', cantidad: 120, unidad: 'Unidades', fecha_hora: '2026-08-25 15:00', id_flujo_asociado: 'F06' },
  { id_movimiento: 5009, fk_lote: 'LOT-LECH-2026-002', fk_actor_origen: 6, nombre_origen: 'Mayorista DM Z1 5', fk_actor_destino: 6, nombre_destino: 'CEDI Z1 - Asunción', cantidad: 60, unidad: 'Litros', fecha_hora: '2026-08-26 12:15', id_flujo_asociado: 'F06' }
];

// Generador de los 65 Mayoristas (5 por cada uno de los 13 CEDIs) con sus 5 PDVs asociados
export const MAYORISTAS_DATA: MayoristaInfo[] = CEDIS_LIST.flatMap((cedi) => {
  const choferes = [
    'Marcos Alvarenga (Lic. Cat. Profesional A)',
    'Diego Sanabria (Lic. Cat. Profesional A)',
    'Esteban Giménez (Lic. Cat. Profesional A)',
    'Rodrigo Cardozo (Lic. Cat. Profesional A)',
    'Gustavo Maidana (Lic. Cat. Profesional A)'
  ];

  return [1, 2, 3, 4, 5].map((idx) => {
    const code = `DM ${cedi.id} ${idx}`;
    const nombresEmpresas = [
      'Distribuciones Guaraní S.R.L.',
      'Logística & Lácteos del Este',
      'Trans-Ruta Comercial S.A.',
      'Distribuidora San Miguel S.A.',
      'Logística Capilar del Sur S.R.L.'
    ];

    const pdvsAsociados: PdvEntregaItem[] = [
      {
        id_pdv: `${cedi.id}-PDV-SUP-${idx}`,
        canal: 'Supermercados',
        nombreComercio: `Supermercado Stock / Superseis - Suc. ${cedi.ciudad} #${idx}`,
        direccion: `Av. Mariscal López esq. Curupayty #${120 * idx}, ${cedi.ciudad}`,
        ciudad: cedi.ciudad,
        cajasPedido: 45 + (idx * 5),
        litrosPedido: (45 + (idx * 5)) * 12,
        horaVentana: '07:00 - 08:30',
        horaEfectiva: '07:42',
        estadoEntrega: 'Entregado',
        temperaturaEntrega: 3.2,
        contactoReceptor: 'Lic. Marcelo Benítez (Jefe de Recepción y Frío)',
        productosResumen: 'Leche UHT Entera 1L, Yogur Bebible 1L, Queso Paraguay 500g',
        novedad: 'Descarga completa sin novedades. Remito y factura sellados conformes.'
      },
      {
        id_pdv: `${cedi.id}-PDV-AUT-${idx}`,
        canal: 'Autoservicios',
        nombreComercio: `Autoservicio San Cayetano #${idx}`,
        direccion: `Calle Boquerón #${45 * idx}, B° Centro, ${cedi.ciudad}`,
        ciudad: cedi.ciudad,
        cajasPedido: 28 + (idx * 4),
        litrosPedido: (28 + (idx * 4)) * 12,
        horaVentana: '09:00 - 10:15',
        horaEfectiva: '09:25',
        estadoEntrega: 'Entregado',
        temperaturaEntrega: 3.4,
        contactoReceptor: 'Doña Ramona Ortiz (Propietaria)',
        productosResumen: 'Leche Descremada UHT, Yogur Firme Vainilla, Manteca 200g',
        novedad: 'Recepción conforme en góndola refrigerada.'
      },
      {
        id_pdv: `${cedi.id}-PDV-DES-${idx}`,
        canal: 'Despensas',
        nombreComercio: `Despensa Don Bernardo #${idx}`,
        direccion: `Callejón Vecinal #${15 * idx}, B° Obrero, ${cedi.ciudad}`,
        ciudad: cedi.ciudad,
        cajasPedido: 16 + (idx * 2),
        litrosPedido: (16 + (idx * 2)) * 12,
        horaVentana: '10:45 - 11:45',
        horaEfectiva: undefined,
        estadoEntrega: idx <= 2 ? 'En Ruta' : 'Pendiente',
        temperaturaEntrega: 3.3,
        contactoReceptor: 'Don Bernardo Prieto',
        productosResumen: 'Leche Entera UHT 1L, Dulce de Leche 500g, Choco-Lact 200ml',
        novedad: idx <= 2 ? 'Furgón en tránsito. ETA estimada: 15 minutos.' : 'Turno de tarde programado.'
      },
      {
        id_pdv: `${cedi.id}-PDV-CON-${idx}`,
        canal: 'Tiendas de Conveniencia',
        nombreComercio: `Biggie Express 24hs - Estación #${idx}`,
        direccion: `Ruta Principal km ${idx * 3.5}, ${cedi.ciudad}`,
        ciudad: cedi.ciudad,
        cajasPedido: 22 + (idx * 3),
        litrosPedido: (22 + (idx * 3)) * 12,
        horaVentana: '13:00 - 14:15',
        horaEfectiva: undefined,
        estadoEntrega: 'Pendiente',
        temperaturaEntrega: undefined,
        contactoReceptor: 'Alexis Vera (Encargado Turno Tarde)',
        productosResumen: 'Choco-Lact 200ml, Yogur Bebible Frutilla, Queso Sandwich',
        novedad: 'Alerta de reposición automática recibida en ERP.'
      },
      {
        id_pdv: `${cedi.id}-PDV-HOR-${idx}`,
        canal: 'HORECA',
        nombreComercio: `Hotel & Restaurante El Portal #${idx}`,
        direccion: `Zona Hotelera #${80 * idx}, ${cedi.ciudad}`,
        ciudad: cedi.ciudad,
        cajasPedido: 35 + (idx * 5),
        litrosPedido: (35 + (idx * 5)) * 12,
        horaVentana: '15:00 - 16:30',
        horaEfectiva: undefined,
        estadoEntrega: 'Pendiente',
        temperaturaEntrega: undefined,
        contactoReceptor: 'Chef Ejecutivo / Depósito Gastronomía',
        productosResumen: 'Queso Mozzarella Barra 2.5kg, Crema de Leche Fresca 200g, Manteca Extra con Sal',
        novedad: 'Pedido institucional con protocolo de control de frío estricto.'
      }
    ];

    return {
      id: `${cedi.id}-M${idx}`,
      codigo: code,
      nombre: `${nombresEmpresas[idx - 1]} (${code})`,
      cediAsignado: cedi.nombre,
      zona: `${cedi.ciudad} - Circuito Sector ${idx}`,
      vehiculo: `Furgón Térmico Refrigerado Isuzu NPR #0${idx} (Temp: 3.5°C)`,
      chofer: choferes[idx - 1],
      otifPromedio: Number((95 + (idx * 0.8) + (cedi.id.charCodeAt(1) % 4) * 0.5).toFixed(1)),
      rutaSemanal: [
        { dia: 'Lunes', canal: 'Supermercados' as const, puntosAsignados: 12, estado: 'Completado' as const, cajasEntregadas: 340 },
        { dia: 'Martes', canal: 'Autoservicios' as const, puntosAsignados: 18, estado: 'Completado' as const, cajasEntregadas: 280 },
        { dia: 'Miércoles', canal: 'Despensas' as const, puntosAsignados: 25, estado: 'En Ruta' as const, cajasEntregadas: 195 },
        { dia: 'Jueves', canal: 'Tiendas de Conveniencia' as const, puntosAsignados: 15, estado: 'Pendiente' as const, cajasEntregadas: 0 },
        { dia: 'Viernes', canal: 'HORECA' as const, puntosAsignados: 14, estado: 'Pendiente' as const, cajasEntregadas: 0 }
      ],
      pdvsAsociados
    };
  });
});
