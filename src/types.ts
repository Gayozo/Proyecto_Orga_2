export type LogisticDomain = 
  | 'Aprovisionamiento' 
  | 'Intralogística' 
  | 'Distribución' 
  | 'Inversa' 
  | 'N/A';

export type LogisticProcessType = 
  | 'all'
  | 'entrada'
  | 'intralogistica'
  | 'salida'
  | 'inversa';

export type ActorType = 
  | 'Tambo' 
  | 'Acopiador' 
  | 'Empresa' 
  | 'CEDI' 
  | 'Mayorista' 
  | 'PDV' 
  | 'Consumidor';

export type ReturnReason = 
  | 'Defectuoso' 
  | 'Averiado' 
  | 'Exceso' 
  | 'Vencido';

export type ReturnDisposition = 
  | 'Destrucción / Efluente' 
  | 'Re-empaque Secundario' 
  | 'Desvío a Subproducto Industrial' 
  | 'En Evaluación';

export type ReturnStatus = 
  | 'Registrado en PDV' 
  | 'Retirado por Mayorista' 
  | 'Almacenado en CEDI' 
  | 'Inspección en Campo 9' 
  | 'Procesado';

export type PdvChannel = 
  | 'Supermercados' 
  | 'Despensas' 
  | 'Tiendas de Conveniencia' 
  | 'Autoservicios' 
  | 'HORECA';

export interface DimActor {
  id_actor: number;
  nombre_actor: string;
  tipo_actor: ActorType;
  dominio_logistico: LogisticDomain;
  zona?: string;
  detalles?: string;
  capacidad?: string;
  stockActual?: number;
  mermaPct?: number;
  otifPct?: number;
  flujosAsociados?: string[];
}

export interface DimProducto {
  id_producto: number;
  nombre_producto: string;
  categoria: 'Leches' | 'Yogures' | 'Quesos' | 'Grasas y Dulces' | 'Postres';
  presentacion: string;
  vida_util_dias: number;
  temperatura_optima: string;
}

export interface RegLote {
  id_lote: string;
  fk_producto: number;
  nombre_producto?: string;
  fecha_fabricacion: string;
  fecha_vencimiento: string;
  estado_calidad: 'Aprobado' | 'En Cuarentena' | 'Bloqueado ERP' | 'Retirado';
  origen_acopiador: string;
  tamberos_involucrados: string[];
  silo_almacenamiento: string;
  temperatura_pasteurizacion: string;
  parametros_calidad: {
    grasa: string;
    proteina: string;
    acidez_dornic: string;
    conteo_bacteriano: string;
    prueba_alcohol: string;
  };
  cedi_destino: string;
  camion_cisterna: string;
}

export interface TransInventario {
  id_movimiento: number;
  fk_lote: string;
  fk_actor_origen: number;
  nombre_origen?: string;
  fk_actor_destino: number;
  nombre_destino?: string;
  cantidad: number;
  unidad: string;
  fecha_hora: string;
  id_flujo_asociado: string;
}

export interface TransDevolucion {
  id_devolucion: number;
  fk_movimiento_origen: number;
  fk_actor_origen: number;
  nombre_origen: string;
  fk_actor_destino: number;
  nombre_destino: string;
  fk_lote: string;
  nombre_producto: string;
  tipo_devolucion: ReturnReason;
  cantidad_devuelta: number;
  unidad: string;
  estado_proceso: ReturnStatus;
  destino_final: ReturnDisposition;
  fecha_registro: string;
  bloqueo_lotes_hermanos: boolean;
  observaciones: string;
}

export interface FacNotaCredito {
  id_nota_credito: string;
  nro_comprobante_nc: string; // ej. 001-005-0001842
  timbrado_nro: string; // ej. 16428910
  cdc: string; // 44 dígitos oficiales SIFEN
  fecha_emision: string;
  fk_devolucion: number;
  fk_lote: string;
  nombre_producto: string;
  fk_distribuidor_codigo: string; // ej: DM Z5 1
  nombre_distribuidor: string;
  ruc_distribuidor: string;
  factura_venta_afectada: string; // ej: 001-003-0045812
  furgon_frio: string; // Chapa y furgón
  cantidad_unidades: number;
  unidad: string;
  precio_unitario_gs: number;
  exenta_gs: number;
  gravada_5_gs: number;
  iva_5_gs: number; // 5% para lácteos según Ley 6380/19 (Total / 21)
  total_nc_gs: number;
  motivo_nc: string;
  estado_dnit: 'Aprobado SIFEN' | 'Pendiente' | 'Rechazado';
}

export interface CustodiaLoteInfo {
  lote_id: string;
  mayorista_codigo: string;
  mayorista_nombre: string;
  mayorista_ruc: string;
  cedi_origen: string;
  factura_venta_nro: string;
  fecha_despacho: string;
  furgon_transporte: string;
  temperatura_salida: number;
  unidades_despachadas: number;
  saldo_disponible_devolucion: number;
  precio_unitario_gs: number;
}

export interface FlujoLogisticoInfo {
  id_flujo: string;
  area_origen: string;
  dominio_origen: string;
  area_destino: string;
  dominio_destino: string;
  motivo_o_recurso: string;
  responsable: string;
  proceso_a_realizar: string;
  kpi_control: string;
  tipo_logistica: 'Entrada' | 'Intralogística' | 'Salida' | 'Inversa';
}

export interface CediInfo {
  id: string;
  nombre: string;
  ciudad: string;
  zona: string;
  capacidadLitros: number;
  stockActualLitros: number;
  ocupacionPct: number;
  otifPct: number;
  temperaturaCamara: number; // in °C
  mayoristasCount: number;
  coordenadas: { x: number; y: number };
}

export interface PdvEntregaItem {
  id_pdv: string;
  canal: PdvChannel;
  nombreComercio: string;
  direccion: string;
  ciudad: string;
  cajasPedido: number;
  litrosPedido: number;
  horaVentana: string;
  horaEfectiva?: string;
  estadoEntrega: 'Entregado' | 'En Ruta' | 'Pendiente' | 'Rechazo Parcial';
  temperaturaEntrega?: number;
  contactoReceptor: string;
  productosResumen: string;
  novedad?: string;
}

export interface MayoristaInfo {
  id: string;
  codigo: string;
  nombre: string;
  cediAsignado: string;
  zona: string;
  vehiculo: string;
  chofer?: string;
  otifPromedio: number;
  rutaSemanal: {
    dia: string;
    canal: PdvChannel;
    puntosAsignados: number;
    estado: 'Completado' | 'En Ruta' | 'Pendiente';
    cajasEntregadas: number;
  }[];
  pdvsAsociados?: PdvEntregaItem[];
}
