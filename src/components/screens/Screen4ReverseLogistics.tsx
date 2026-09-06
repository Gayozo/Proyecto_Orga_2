import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  AlertTriangle, 
  Trash2, 
  RefreshCw, 
  ShieldAlert, 
  CheckCircle2, 
  FileWarning, 
  Building2, 
  Store, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Plus, 
  Lock,
  Layers,
  Sparkles,
  FileText,
  QrCode,
  Printer,
  Download,
  ExternalLink,
  X,
  ShieldCheck,
  Check,
  Truck,
  FileCheck2,
  Calendar,
  DollarSign
} from 'lucide-react';
import { 
  ReturnReason, 
  ReturnDisposition, 
  ReturnStatus, 
  TransDevolucion, 
  RegLote, 
  FacNotaCredito,
  CustodiaLoteInfo
} from '../../types';
import { 
  CEDIS_LIST, 
  PRODUCTOS_DATA, 
  MAYORISTAS_DATA, 
  LOTE_CUSTODIA_MAP 
} from '../../data/mockData';

interface Screen4Props {
  devoluciones: TransDevolucion[];
  onAddDevolucion: (dev: TransDevolucion, nc?: FacNotaCredito) => void;
  lotsList: RegLote[];
  onToggleLotStatus: (lotId: string) => void;
  notasCredito: FacNotaCredito[];
}

export const Screen4ReverseLogistics: React.FC<Screen4Props> = ({
  devoluciones,
  onAddDevolucion,
  lotsList,
  onToggleLotStatus,
  notasCredito
}) => {
  // Lista de mayoristas para el selector
  const listaMayoristas = MAYORISTAS_DATA.slice(0, 15); // Primeros 15 representativos

  // Form State
  const [selectedMayoristaCodigo, setSelectedMayoristaCodigo] = useState<string>('DM Z5 1');
  const [selectedCanalPdv, setSelectedCanalPdv] = useState<string>('Supermercado Stock / Superseis - Suc. Ciudad del Este #1');
  const [selectedCediDestino, setSelectedCediDestino] = useState('CEDI Z5 - Ciudad del Este');
  const [selectedProductoId, setSelectedProductoId] = useState<number>(4); // Yogur Frutilla
  const [selectedLote, setSelectedLote] = useState('LOT-YOG-2026-001-RET');
  const [cantidad, setCantidad] = useState<number>(120);
  const [motivo, setMotivo] = useState<ReturnReason>('Vencido');
  const [observaciones, setObservaciones] = useState('Caducado en góndola. Verificado en inspección visual y remito de retiro.');

  // SIFEN Handshake State (Latencia simulada de 1.5s ante la DNIT)
  const [isSubmittingSifen, setIsSubmittingSifen] = useState<boolean>(false);
  const [sifenStep, setSifenStep] = useState<number>(0);

  // Modal KuDE Nota de Crédito State
  const [selectedNcForModal, setSelectedNcForModal] = useState<FacNotaCredito | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [filterMotivo, setFilterMotivo] = useState<string>('TODOS');

  // Obtener Mayorista Seleccionado
  const currentMayorista = listaMayoristas.find(m => m.codigo === selectedMayoristaCodigo) || listaMayoristas[0];

  // Verificación de Custodia Comercial del Lote
  const infoCustodia: CustodiaLoteInfo | undefined = LOTE_CUSTODIA_MAP[selectedLote];
  const isCustodyMatch = infoCustodia ? infoCustodia.mayorista_codigo === selectedMayoristaCodigo : false;

  // Verificación de Fecha de Vencimiento y Regla de Coexistencia
  const activeLotObj = lotsList.find(l => l.id_lote === selectedLote);
  const isLoteExpired = activeLotObj 
    ? new Date(activeLotObj.fecha_vencimiento) < new Date('2026-09-06')
    : false;

  // Efecto de Regla de Coexistencia: si el lote está vencido, forzar motivo a 'Vencido'
  useEffect(() => {
    if (isLoteExpired && (motivo === 'Averiado' || motivo === 'Exceso')) {
      setMotivo('Vencido');
    }
  }, [selectedLote, isLoteExpired, motivo]);

  // Si cambia el lote, sincronizar producto
  const handleLoteChange = (loteId: string) => {
    setSelectedLote(loteId);
    const lot = lotsList.find(l => l.id_lote === loteId);
    if (lot) {
      setSelectedProductoId(lot.fk_producto);
    }
  };

  // Derive Business Rule outcome ("El Cerebro de Calidad")
  const getQualityDecision = (reason: ReturnReason) => {
    switch (reason) {
      case 'Defectuoso':
        return {
          category: 'DESTRUCTION',
          badge: 'ALERTA DE DESTRUCCIÓN INMEDIATA',
          disposition: 'Destrucción / Efluente' as ReturnDisposition,
          color: 'rose',
          flowAssoc: 'F09 -> F10 -> F15 -> F16',
          lockSiblings: true,
          actionTitle: 'Bloqueo Automático de Lotes Hermanos en ERP',
          actionDesc: 'Riesgo bromatológico / microbiológico. El sistema envía orden inmediata de cuarentena y desvío hacia la planta de tratamiento de efluentes ecológicos de Campo 9.',
          badgeIcon: AlertTriangle
        };
      case 'Vencido':
        return {
          category: 'DESTRUCTION',
          badge: 'ALERTA DE DESTRUCCIÓN (MERMA CADUCADA)',
          disposition: 'Destrucción / Efluente' as ReturnDisposition,
          color: 'rose',
          flowAssoc: 'F13 -> F14 -> F15 -> F16',
          lockSiblings: true,
          actionTitle: 'Bloqueo de Lote & Auditoría FEFO Obligatoria',
          actionDesc: 'Producto vencido. Se emite acta de destrucción, Nota de Crédito por merma pactada y auditoría de rotación.',
          badgeIcon: ShieldAlert
        };
      case 'Averiado':
        return {
          category: 'REUSE',
          badge: 'OPCIÓN DE REUTILIZACIÓN (RE-EMPAQUE)',
          disposition: 'Re-empaque Secundario' as ReturnDisposition,
          color: 'emerald',
          flowAssoc: 'F11 -> F15 -> F16',
          lockSiblings: false,
          actionTitle: 'Habilitación para Re-empaque Secundario',
          actionDesc: 'Envase exterior golpeado pero contenido lácteo hermético e intacto. Habilita reacondicionamiento secundario en planta Campo 9.',
          badgeIcon: RefreshCw
        };
      case 'Exceso':
        return {
          category: 'REUSE',
          badge: 'OPCIÓN DE REUBICACIÓN / DESVÍO INDUSTRIAL',
          disposition: 'Desvío a Subproducto Industrial' as ReturnDisposition,
          color: 'blue',
          flowAssoc: 'F12 -> F15 -> F16',
          lockSiblings: false,
          actionTitle: 'Desvío a Subproducto o Canal de Alta Rotación',
          actionDesc: 'Vencimiento cercano (>15 días). Se deriva inmediatamente para la elaboración de subproductos lácteos industriales o canal especial.',
          badgeIcon: CheckCircle2
        };
    }
  };

  const currentDecision = getQualityDecision(motivo);

  // Generador de CDC SIFEN de 44 dígitos
  const generateCdc = (nroComprobante: string) => {
    const cleanNum = nroComprobante.replace(/-/g, '').padStart(11, '0');
    return `01800012345${cleanNum}22026090615${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  };

  // Conversión numérica a texto en Guaraníes para el KuDE
  const numeroALetrasGs = (monto: number): string => {
    if (monto === 0) return 'CERO GUARANÍES';
    // Conversor simplificado representativo para la factura láctea
    return `GUARANÍES ${monto.toLocaleString('es-PY')} (CÁLCULO EXACTO DNIT)`;
  };

  // Submit con Simulación de Handshake SIFEN (1.5 segundos)
  const handleSubmitWithSifen = (e: React.FormEvent) => {
    e.preventDefault();

    // Bloqueo estricto si no hay custodia
    if (!isCustodyMatch) {
      return;
    }

    setIsSubmittingSifen(true);
    setSifenStep(1);

    // Secuencia de Handshake
    setTimeout(() => {
      setSifenStep(2);
    }, 450);

    setTimeout(() => {
      setSifenStep(3);
    }, 950);

    setTimeout(() => {
      setSifenStep(4);

      const selectedProd = PRODUCTOS_DATA.find((p) => p.id_producto === selectedProductoId);
      const newDevId = Date.now() % 100000;
      const numSecuencial = String(notasCredito.length + 1843).padStart(7, '0');
      const nroComprobanteNc = `001-005-${numSecuencial}`;
      const precioUnit = infoCustodia ? infoCustodia.precio_unitario_gs : 8500;
      const totalGs = cantidad * precioUnit;
      const iva5Gs = Math.round(totalGs / 21); // Ley 6380/19 para lácteos básicos en Paraguay

      // Crear Objeto Devolución
      const newDevolucion: TransDevolucion = {
        id_devolucion: newDevId,
        fk_movimiento_origen: 5090 + Math.floor(Math.random() * 50),
        fk_actor_origen: 10,
        nombre_origen: `${currentMayorista.nombre} / ${selectedCanalPdv}`,
        fk_actor_destino: 7,
        nombre_destino: selectedCediDestino,
        fk_lote: selectedLote,
        nombre_producto: selectedProd?.nombre_producto || 'Producto Lácteo Lactolanda',
        tipo_devolucion: motivo,
        cantidad_devuelta: cantidad,
        unidad: 'Unidades / Litros',
        estado_proceso: 'Retirado por Mayorista',
        destino_final: currentDecision.disposition,
        fecha_registro: new Date().toISOString().replace('T', ' ').substring(0, 16),
        bloqueo_lotes_hermanos: currentDecision.lockSiblings,
        observaciones: `${observaciones} [NC Emitida: ${nroComprobanteNc}]`
      };

      // Crear Objeto Nota de Crédito Oficial
      const newNotaCredito: FacNotaCredito = {
        id_nota_credito: `NC-2026-${numSecuencial}`,
        nro_comprobante_nc: nroComprobanteNc,
        timbrado_nro: '16428910',
        cdc: generateCdc(nroComprobanteNc),
        fecha_emision: new Date().toISOString().replace('T', ' ').substring(0, 16),
        fk_devolucion: newDevId,
        fk_lote: selectedLote,
        nombre_producto: selectedProd?.nombre_producto || 'Producto Lácteo Lactolanda',
        fk_distribuidor_codigo: currentMayorista.codigo,
        nombre_distribuidor: currentMayorista.nombre.replace(` (${currentMayorista.codigo})`, ''),
        ruc_distribuidor: infoCustodia?.mayorista_ruc || '80092144-1',
        factura_venta_afectada: infoCustodia?.factura_venta_nro || '001-003-0045812',
        furgon_frio: infoCustodia?.furgon_transporte || currentMayorista.vehiculo,
        cantidad_unidades: cantidad,
        unidad: 'Unidades / Litros',
        precio_unitario_gs: precioUnit,
        exenta_gs: 0,
        gravada_5_gs: totalGs,
        iva_5_gs: iva5Gs,
        total_nc_gs: totalGs,
        motivo_nc: `Devolución justificada por causal: ${motivo}`,
        estado_dnit: 'Aprobado SIFEN'
      };

      onAddDevolucion(newDevolucion, newNotaCredito);

      // Si la regla lo estipula, bloquear lote hermano en ERP
      if (currentDecision.lockSiblings) {
        const lot = lotsList.find((l) => l.id_lote === selectedLote);
        if (lot && lot.estado_calidad !== 'Bloqueado ERP') {
          onToggleLotStatus(selectedLote);
        }
      }

      setIsSubmittingSifen(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);

      // Abrir de inmediato el visor KuDE del comprobante emitido
      setSelectedNcForModal(newNotaCredito);
    }, 1500);
  };

  // Filtrado de historial
  const filteredDevoluciones = devoluciones.filter(d => {
    if (filterMotivo === 'TODOS') return true;
    return d.tipo_devolucion === filterMotivo;
  });

  return (
    <div className="flex-1 flex flex-col p-3.5 overflow-y-auto bg-slate-100 select-none">
      {/* Header Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs mb-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-amber-700 uppercase tracking-wider mb-0.5">
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              Logística Inversa & Trazabilidad Legal de Retorno (F09 a F16)
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight font-mono">
              Consola de Devoluciones, Validación de Custodia y Emisión de Nota de Crédito (DNIT / SIFEN)
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Control antifraude de lotes distribuidos a los 65 Mayoristas, reglas sanitarias automáticas y generación oficial de Notas de Crédito electrónicas bajo Ley N° 6380/19 (IVA 5% lácteo).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Timbrado Activo: 16428910</span>
            </span>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="mb-3 p-3 rounded-lg bg-emerald-600 text-white text-xs font-mono flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
            <div>
              <strong className="block font-bold">¡Retorno Procesado y Nota de Crédito Aprobada por SIFEN!</strong>
              <span className="text-[11px] opacity-90">
                Se sincronizó el stock inverso en CEDI y se emitió el comprobante electrónico con CDC reglamentario.
              </span>
            </div>
          </div>
          <button 
            onClick={() => setShowSuccessToast(false)}
            className="text-white/80 hover:text-white text-[11px] underline ml-3 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Main Grid: Form Left (7 cols) & Historial Right (5 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Left: Interactive Return Form */}
        <div className="xl:col-span-7 space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                Registrar Retorno de Distribuidor Mayorista & Generar Nota de Crédito
              </h3>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                SIFEN 2.0 Ready
              </span>
            </div>

            <form onSubmit={handleSubmitWithSifen} className="space-y-3">
              {/* SECCIÓN 1: IDENTIFICACIÓN DEL DISTRIBUIDOR Y CEDI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Distribuidor Mayorista */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    1. Distribuidor Mayorista Solicitante:
                  </label>
                  <select
                    id="select-mayorista-solicitante"
                    value={selectedMayoristaCodigo}
                    onChange={(e) => setSelectedMayoristaCodigo(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:border-blue-500 outline-none bg-white"
                  >
                    {listaMayoristas.map((m) => (
                      <option key={m.codigo} value={m.codigo}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                  <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                    RUC: {infoCustodia?.mayorista_codigo === selectedMayoristaCodigo ? infoCustodia.mayorista_ruc : '80031980-9'} • Zona: {currentMayorista.zona}
                  </span>
                </div>

                {/* PDV o Canal de Retorno */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    Canal / PDV de Origen del Reclamo:
                  </label>
                  <select
                    id="select-canal-pdv"
                    value={selectedCanalPdv}
                    onChange={(e) => setSelectedCanalPdv(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Supermercado Stock / Superseis - Suc. Ciudad del Este #1">Supermercado Stock / Superseis (Canal Supermercados)</option>
                    <option value="Autoservicio San Cayetano #1">Autoservicio San Cayetano (Canal Autoservicios)</option>
                    <option value="Despensa Don Bernardo #1">Despensa Don Bernardo (Canal Despensas)</option>
                    <option value="Biggie Express 24hs - Estación #1">Biggie Express 24hs (Canal Conveniencia)</option>
                    <option value="Hotel Dazzler / HORECA #1">Restaurante / Hotel (Canal HORECA)</option>
                  </select>
                </div>
              </div>

              {/* SECCIÓN 2: SELECCIÓN DE LOTE Y PRODUCTO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Lote de Retorno */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    2. Lote a Devolver:
                  </label>
                  <select
                    id="select-lote-devolucion"
                    value={selectedLote}
                    onChange={(e) => handleLoteChange(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:border-blue-500 outline-none bg-white"
                  >
                    {lotsList.map((lot) => (
                      <option key={lot.id_lote} value={lot.id_lote}>
                        {lot.id_lote} - {lot.nombre_producto?.substring(0, 26)}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center justify-between text-[9px] font-mono mt-0.5">
                    <span className="text-slate-500">
                      Vence: <strong className={isLoteExpired ? 'text-rose-600' : 'text-slate-700'}>{activeLotObj?.fecha_vencimiento}</strong>
                    </span>
                    {isLoteExpired && (
                      <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold">
                        ¡LOTE CADUCADO!
                      </span>
                    )}
                  </div>
                </div>

                {/* CEDI Destino de Recepción */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    CEDI Receptor de la Devolución:
                  </label>
                  <select
                    id="select-cedi-receptor"
                    value={selectedCediDestino}
                    onChange={(e) => setSelectedCediDestino(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none bg-white"
                  >
                    {CEDIS_LIST.map((cedi) => (
                      <option key={cedi.id} value={cedi.nombre}>
                        {cedi.nombre} ({cedi.zona})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SECCIÓN 3: MOTOR DE CRUCE DE CUSTODIA (ESCENARIO 1 vs ESCENARIO 2) */}
              <div className="p-3 rounded-lg border transition-all duration-200">
                {isCustodyMatch && infoCustodia ? (
                  /* ESCENARIO 1: CUSTODIA CONFIRMADA (VERDE PULSANTE) */
                  <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 ring-2 ring-emerald-400/40 animate-pulse">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-mono font-bold text-xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>[✅ CUSTODIA CONFIRMADA - Factura Venta N° {infoCustodia.factura_venta_nro}]</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                        DESPACHO AUTÉNTICO
                      </span>
                    </div>

                    <p className="text-[11px] text-emerald-900 font-mono leading-tight mb-2">
                      El lote <strong>{selectedLote}</strong> coincide con el registro inmutable de salida de Lactolanda asignado a <strong>{currentMayorista.nombre}</strong>.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono bg-white/80 p-2 rounded border border-emerald-200">
                      <div>
                        <span className="text-slate-400 block text-[9px]">RUC Titular:</span>
                        <strong className="text-slate-800">{infoCustodia.mayorista_ruc}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Furgón Despacho:</span>
                        <strong className="text-slate-800 truncate block">{infoCustodia.furgon_transporte}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Saldo Máx Facturado:</span>
                        <strong className="text-emerald-700">{infoCustodia.saldo_disponible_devolucion} Unidades</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Precio Venta Unitario:</span>
                        <strong className="text-slate-900">Gs. {infoCustodia.precio_unitario_gs.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ESCENARIO 2: ALERTA POR LOTE NO PERTENECIENTE / FRAUDE (ROJO BLOQUEO) */
                  <div className="bg-rose-50 border border-rose-300 rounded-lg p-3 ring-2 ring-rose-500/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-rose-800 font-mono font-bold text-xs">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>[🛑 BLOQUEO DE SEGURIDAD ANTIFRAUDE: Lote No Perteneciente]</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-600 text-white">
                        OPERACIÓN DENEGADA
                      </span>
                    </div>

                    <div className="text-[11px] text-rose-950 font-mono space-y-1.5">
                      <p>
                        <strong>Alerta de Seguridad:</strong> El lote <code className="bg-rose-100 px-1 py-0.5 rounded font-bold">{selectedLote}</code> no fue despachado ni facturado a <u>{currentMayorista.nombre}</u>.
                      </p>
                      {infoCustodia ? (
                        <div className="p-2 rounded bg-white border border-rose-200 text-[10px] space-y-0.5 text-slate-700">
                          <div><strong className="text-rose-700">Titular de Custodia Real:</strong> {infoCustodia.mayorista_nombre} (RUC: {infoCustodia.mayorista_ruc})</div>
                          <div><strong className="text-rose-700">Factura Original:</strong> {infoCustodia.factura_venta_nro} expedida en {infoCustodia.cedi_origen}</div>
                          <div><strong className="text-rose-700">Furgón Asignado:</strong> {infoCustodia.furgon_transporte}</div>
                        </div>
                      ) : (
                        <p className="text-[10px] text-rose-800">
                          No se registra remisión comercial de este lote hacia el distribuidor seleccionado.
                        </p>
                      )}
                      <p className="text-[10px] font-bold text-rose-800 pt-1 border-t border-rose-200">
                        Por protocolo de seguridad Lactolanda y la DNIT, no procede la emisión de Nota de Crédito hacia un RUC que no adquirió originalmente la mercadería.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* SECCIÓN 4: CANTIDAD Y REGLA DE COEXISTENCIA DE MOTIVOS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Cantidad */}
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="block text-[10px] font-mono font-bold text-slate-700">
                      Cantidad a Devolver (Unidades):
                    </label>
                    {infoCustodia && isCustodyMatch && (
                      <span className="text-[9px] font-mono text-emerald-700 font-semibold">
                        Máx: {infoCustodia.saldo_disponible_devolucion} u.
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    min="1"
                    max={infoCustodia && isCustodyMatch ? infoCustodia.saldo_disponible_devolucion : 5000}
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    disabled={!isCustodyMatch}
                    className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:border-blue-500 outline-none bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                  {infoCustodia && isCustodyMatch && cantidad > infoCustodia.saldo_disponible_devolucion && (
                    <span className="text-[9px] text-rose-600 font-mono block mt-0.5">
                      ⚠️ La cantidad supera el saldo facturado en la Factura {infoCustodia.factura_venta_nro}.
                    </span>
                  )}
                </div>

                {/* Importe Calculado de la Nota de Crédito */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    Importe Estimado Nota de Crédito:
                  </label>
                  <div className="px-2 py-1.5 rounded border border-slate-200 bg-slate-50 text-xs font-mono font-bold text-slate-900 flex items-center justify-between">
                    <span>Total Crédito:</span>
                    <span className="text-blue-700">
                      Gs. {((infoCustodia ? infoCustodia.precio_unitario_gs : 8500) * cantidad).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 block mt-0.5">
                    IVA 5% Incluido (Ley 6380/19): Gs. {Math.round(((infoCustodia ? infoCustodia.precio_unitario_gs : 8500) * cantidad) / 21).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Los 4 Motivos con Regla de Coexistencia de Fechas */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] font-mono font-bold text-slate-700">
                    Motivo Legal de la Devolución:
                  </label>
                  {isLoteExpired && (
                    <span className="text-[9px] font-mono text-rose-700 font-bold bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                      Regla Sanitaria: Lote Vencido bloquea Re-empaque y Exceso
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {/* Motivo a) Defectuoso */}
                  <button
                    type="button"
                    onClick={() => setMotivo('Defectuoso')}
                    disabled={!isCustodyMatch}
                    className={`p-2 rounded border text-left transition-all cursor-pointer ${
                      motivo === 'Defectuoso'
                        ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-500 text-rose-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="text-[11px] font-mono font-bold">a) Defectuoso</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Corte / acidez</div>
                  </button>

                  {/* Motivo b) Averiado (Deshabilitado si lote venció) */}
                  <button
                    type="button"
                    onClick={() => !isLoteExpired && setMotivo('Averiado')}
                    disabled={!isCustodyMatch || isLoteExpired}
                    title={isLoteExpired ? 'No procede por lote vencido' : ''}
                    className={`p-2 rounded border text-left transition-all cursor-pointer ${
                      motivo === 'Averiado'
                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 text-emerald-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    } ${isLoteExpired ? 'opacity-40 cursor-not-allowed bg-slate-100' : ''} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <div className="text-[11px] font-mono font-bold flex items-center justify-between">
                      <span>b) Averiado</span>
                      {isLoteExpired && <Lock className="w-2.5 h-2.5 text-slate-400" />}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">
                      {isLoteExpired ? 'Caducado (bloqueado)' : 'Envase secundario'}
                    </div>
                  </button>

                  {/* Motivo c) Exceso (Deshabilitado si lote venció) */}
                  <button
                    type="button"
                    onClick={() => !isLoteExpired && setMotivo('Exceso')}
                    disabled={!isCustodyMatch || isLoteExpired}
                    title={isLoteExpired ? 'No procede por lote vencido' : ''}
                    className={`p-2 rounded border text-left transition-all cursor-pointer ${
                      motivo === 'Exceso'
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 text-blue-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    } ${isLoteExpired ? 'opacity-40 cursor-not-allowed bg-slate-100' : ''} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <div className="text-[11px] font-mono font-bold flex items-center justify-between">
                      <span>c) Exceso</span>
                      {isLoteExpired && <Lock className="w-2.5 h-2.5 text-slate-400" />}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">
                      {isLoteExpired ? 'Caducado (bloqueado)' : 'Vto >15d rotación'}
                    </div>
                  </button>

                  {/* Motivo d) Vencido */}
                  <button
                    type="button"
                    onClick={() => setMotivo('Vencido')}
                    disabled={!isCustodyMatch}
                    className={`p-2 rounded border text-left transition-all cursor-pointer ${
                      motivo === 'Vencido'
                        ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-500 text-rose-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="text-[11px] font-mono font-bold">d) Vencido</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Caducado góndola</div>
                  </button>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                  Observaciones Técnicas / Remito de Retiro:
                </label>
                <input
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  disabled={!isCustodyMatch}
                  className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Cerebro de Calidad: Destino Técnico del Producto */}
              <div className={`p-2.5 rounded-lg border ${
                currentDecision.color === 'rose'
                  ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                  : currentDecision.color === 'emerald'
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-blue-50/80 border-blue-200 text-blue-900'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Cerebro de Calidad • Destino Técnico & Flujo
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/70 font-semibold">
                    {currentDecision.flowAssoc}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                    currentDecision.color === 'rose'
                      ? 'bg-rose-600 text-white'
                      : currentDecision.color === 'emerald'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {currentDecision.color === 'rose' ? (
                      <Trash2 className="w-3.5 h-3.5" />
                    ) : (
                      <RefreshCw className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold font-mono">{currentDecision.actionTitle}</h4>
                    <p className="text-[10px] leading-tight opacity-90 mt-0.5">
                      {currentDecision.actionDesc}
                    </p>
                    <div className="mt-1 text-[10px] font-mono font-bold">
                      Destino Físico: <u>{currentDecision.disposition}</u>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Enviar con Simulación de Handshake SIFEN */}
              <button
                id="btn-submit-return"
                type="submit"
                disabled={!isCustodyMatch || isSubmittingSifen}
                className={`w-full py-2.5 rounded font-mono font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isCustodyMatch && !isSubmittingSifen
                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isSubmittingSifen ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>
                      {sifenStep === 1 && '1/3: Validando firma electrónica y timbrado 16428910...'}
                      {sifenStep === 2 && '2/3: Conectando con SIFEN (DNIT Paraguay)...'}
                      {sifenStep === 3 && '3/3: Generando CDC inmutable de 44 dígitos...'}
                      {sifenStep === 4 && '¡Autorizado por DNIT SIFEN!'}
                    </span>
                  </>
                ) : (
                  <>
                    <FileCheck2 className="w-4 h-4" />
                    <span>
                      {isCustodyMatch 
                        ? 'Confirmar Retorno y Emitir Nota de Crédito SIFEN (DNIT)' 
                        : 'Operación Bloqueada por Inconsistencia de Custodia'}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Workflow del Bucle de Retorno */}
          <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5 font-mono">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Workflow del Bucle de Retorno & Trazabilidad Legal
            </h3>

            <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="text-[9px] text-slate-400 font-bold uppercase">1. Reclamo en PDV</div>
                <div className="font-bold text-slate-800 mt-0.5">Segregación Inicial</div>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  Retiro de góndola y reporte de merma.
                </p>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="text-[9px] text-slate-400 font-bold uppercase">2. Mayorista</div>
                <div className="font-bold text-slate-800 mt-0.5">Control de Custodia</div>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  Verificación de Factura y Furgón original.
                </p>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="text-[9px] text-slate-400 font-bold uppercase">3. SIFEN / DNIT</div>
                <div className="font-bold text-blue-800 mt-0.5">Nota de Crédito</div>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  KuDE con IVA 5% y CDC de 44 dígitos.
                </p>
              </div>

              <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                <div className="text-[9px] text-emerald-700 font-bold uppercase">4. Planta Campo 9</div>
                <div className="font-bold text-emerald-900 mt-0.5">Disposición Final</div>
                <p className="text-[9px] text-emerald-700 mt-0.5">
                  Biodigestor efluente o re-empaque.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: History & Query Resolver (5 cols) */}
        <div className="xl:col-span-5 space-y-3">
          {/* Executive Query Card (Resolviendo la consulta directiva) */}
          <div className="bg-slate-900 text-white rounded-lg p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-sky-400 uppercase tracking-wider">
                <FileWarning className="w-3.5 h-3.5 text-sky-400" />
                Consulta Directiva de Logística Inversa
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {notasCredito.length} NCs Emitidas
              </span>
            </div>

            <h4 className="text-xs font-bold font-mono">
              ¿Cuánto producto vencido se retiró en CEDI Este?
            </h4>
            <p className="text-[10px] text-slate-300 mt-0.5">
              Cálculo relacional cruzando <code className="text-sky-300 font-mono">TRANS_DEVOLUCIONES</code> con <code className="text-sky-300 font-mono">FAC_NOTAS_CREDITO</code>:
            </p>

            {/* Calculated KPI directly from dataset */}
            <div className="mt-2 p-2 rounded bg-white/10 border border-white/10 flex items-center justify-between font-mono">
              <div>
                <span className="text-[9px] text-slate-300">Total Vencido CEDI Este:</span>
                <div className="text-lg font-extrabold text-amber-300">
                  {devoluciones
                    .filter((d) => d.nombre_destino.includes('Este') && d.tipo_devolucion === 'Vencido')
                    .reduce((acc, d) => acc + d.cantidad_devuelta, 0)}{' '}
                  <span className="text-xs font-medium text-white">L/u.</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-300">Crédito Fiscal Otorgado:</span>
                <div className="text-xs font-bold text-emerald-300">
                  Gs. {notasCredito
                    .reduce((acc, nc) => acc + nc.total_nc_gs, 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Returns & Notas de Crédito Registry Table */}
          <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <h4 className="text-xs font-bold font-mono text-slate-900">
                Historial de Devoluciones & Notas de Crédito ({filteredDevoluciones.length})
              </h4>
              <div className="flex items-center gap-1 text-[9px] font-mono">
                <button
                  onClick={() => setFilterMotivo('TODOS')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${filterMotivo === 'TODOS' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterMotivo('Vencido')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${filterMotivo === 'Vencido' ? 'bg-rose-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  Vencidos
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[490px] overflow-y-auto pr-1">
              {filteredDevoluciones.map((dev) => {
                const isDestruction = dev.destino_final === 'Destrucción / Efluente';
                // Buscar Nota de Crédito asociada a esta devolución
                const ncAsociada = notasCredito.find(nc => nc.fk_devolucion === dev.id_devolucion);

                return (
                  <div
                    key={dev.id_devolucion}
                    className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 text-[11px] space-y-1.5 transition-colors font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">DEV-#{dev.id_devolucion}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                            dev.tipo_devolucion === 'Vencido' || dev.tipo_devolucion === 'Defectuoso'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {dev.tipo_devolucion}
                        </span>
                        {ncAsociada && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            {ncAsociada.estado_dnit}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 font-sans">{dev.nombre_producto}</div>
                      <div className="text-[10px] text-slate-500">
                        Lote: <strong className="text-slate-700">{dev.fk_lote}</strong> • Cant: <strong>{dev.cantidad_devuelta} {dev.unidad}</strong>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-600 bg-white p-2 rounded border border-slate-200 space-y-0.5">
                      <div><span className="text-slate-400">Origen:</span> {dev.nombre_origen}</div>
                      <div><span className="text-slate-400">Destino:</span> {dev.nombre_destino}</div>
                      {ncAsociada && (
                        <div className="pt-1 mt-1 border-t border-slate-100 flex items-center justify-between text-slate-700 font-semibold">
                          <span>N° NC: <strong>{ncAsociada.nro_comprobante_nc}</strong></span>
                          <span className="text-blue-700 font-bold">Gs. {ncAsociada.total_nc_gs.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[9px]">
                      <span className="text-slate-400">{dev.fecha_registro}</span>
                      
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            isDestruction ? 'text-rose-600' : 'text-emerald-600'
                          }`}
                        >
                          {dev.destino_final}
                        </span>

                        {ncAsociada && (
                          <button
                            onClick={() => setSelectedNcForModal(ncAsociada)}
                            className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Ver KuDE</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL HIPERREALISTA DEL DOCUMENTO LEGAL (KuDE / SIFEN PARAGUAY) */}
      {selectedNcForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-3xl overflow-hidden animate-fade-in text-slate-800 font-mono">
            {/* Modal Top Bar */}
            <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold font-mono tracking-wide">
                  VISOR OFICIAL KuDE • NOTA DE CRÉDITO ELECTRÓNICA (DNIT / SIFEN)
                </span>
              </div>
              <button
                onClick={() => setSelectedNcForModal(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hoja de Impresión KuDE */}
            <div className="p-5 max-h-[80vh] overflow-y-auto space-y-4 text-[11px] bg-slate-50/40">
              {/* Encabezado del Comprobante Fiscal */}
              <div className="border border-slate-300 rounded-lg p-3.5 bg-white grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Logo & Emisor (7 cols) */}
                <div className="md:col-span-7 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded bg-blue-700 text-white font-black text-sm flex items-center justify-center font-sans tracking-tighter">
                      LAC
                    </div>
                    <div>
                      <h2 className="text-xs font-black text-slate-900 leading-tight">
                        COOPERATIVA DE PRODUCTORES DE LECHE LA HOLANDA LTDA.
                      </h2>
                      <span className="text-[10px] font-bold text-blue-800">
                        Lácteos Lactolanda • Planta Industrial J. Eulogio Estigarribia
                      </span>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-tight pt-1">
                    Casa Central: Dr. Juan Eulogio Estigarribia (Campo 9), Caaguazú - Paraguay<br />
                    Tel: +595 528 222 000 • Email: facturacion.sifen@lactolanda.com.py<br />
                    Actividad Económica: Elaboración de Productos Lácteos Pasteurizados y UHT
                  </p>
                </div>

                {/* Recuadro Legal DNIT (5 cols) */}
                <div className="md:col-span-5 border-2 border-slate-800 rounded p-2.5 bg-slate-50 text-center space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold block">
                    DIRECCIÓN NACIONAL DE INGRESOS TRIBUTARIOS (DNIT)
                  </span>
                  <div className="text-xs font-black text-slate-900">
                    RUC: 80001234-5
                  </div>
                  <div className="text-[10px] font-bold text-slate-700">
                    TIMBRADO N° {selectedNcForModal.timbrado_nro}
                  </div>
                  <span className="text-[8px] text-slate-500 block">
                    Vigencia: 01/01/2026 al 31/12/2026
                  </span>
                  <div className="pt-1 mt-1 border-t border-slate-300">
                    <span className="text-[10px] font-black text-blue-900 uppercase block tracking-wider">
                      NOTA DE CRÉDITO ELECTRÓNICA
                    </span>
                    <strong className="text-xs font-mono text-slate-900">
                      N° {selectedNcForModal.nro_comprobante_nc}
                    </strong>
                  </div>
                </div>
              </div>

              {/* CDC (Código de Control SIFEN) */}
              <div className="p-2 rounded bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[9px]">
                <div>
                  <span className="text-slate-500 font-bold block">CÓDIGO DE CONTROL (CDC):</span>
                  <strong className="text-blue-950 font-mono tracking-widest text-[10px]">
                    {selectedNcForModal.cdc.replace(/(.{4})/g, '$1 ').trim()}
                  </strong>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold shrink-0 self-start sm:self-auto">
                  {selectedNcForModal.estado_dnit}
                </span>
              </div>

              {/* Datos del Receptor (Mayorista) y Comprobante Afectado */}
              <div className="border border-slate-300 rounded-lg p-3 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Datos del Cliente / Distribuidor:</span>
                  <div><strong className="text-slate-900">Razón Social:</strong> {selectedNcForModal.nombre_distribuidor}</div>
                  <div><strong className="text-slate-900">RUC / C.I.:</strong> {selectedNcForModal.ruc_distribuidor}</div>
                  <div><strong className="text-slate-900">Código Distribuidor:</strong> {selectedNcForModal.fk_distribuidor_codigo}</div>
                  <div><strong className="text-slate-900">Furgón Retorno:</strong> {selectedNcForModal.furgon_frio}</div>
                </div>

                <div className="space-y-0.5 sm:border-l sm:border-slate-200 sm:pl-3">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Documento de Venta Afectado:</span>
                  <div><strong className="text-slate-900">Factura Electrónica N°:</strong> {selectedNcForModal.factura_venta_afectada}</div>
                  <div><strong className="text-slate-900">Fecha Emisión NC:</strong> {selectedNcForModal.fecha_emision}</div>
                  <div><strong className="text-slate-900">Motivo Legal:</strong> {selectedNcForModal.motivo_nc}</div>
                  <div><strong className="text-slate-900">Lote Origen:</strong> <span className="text-blue-800 font-bold">{selectedNcForModal.fk_lote}</span></div>
                </div>
              </div>

              {/* Tabla Detalle de Productos Devueltos */}
              <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left border-collapse text-[10px]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                      <th className="p-2">Cód.</th>
                      <th className="p-2">Descripción del Producto</th>
                      <th className="p-2">Lote</th>
                      <th className="p-2 text-right">Cant.</th>
                      <th className="p-2 text-right">P. Unitario (Gs)</th>
                      <th className="p-2 text-right">Exenta</th>
                      <th className="p-2 text-right">Gravadas 5%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2 text-slate-500 font-bold">LAC-04</td>
                      <td className="p-2 text-slate-900 font-bold">{selectedNcForModal.nombre_producto}</td>
                      <td className="p-2 text-blue-700 font-bold">{selectedNcForModal.fk_lote}</td>
                      <td className="p-2 text-right font-bold">{selectedNcForModal.cantidad_unidades}</td>
                      <td className="p-2 text-right">{selectedNcForModal.precio_unitario_gs.toLocaleString()}</td>
                      <td className="p-2 text-right text-slate-400">0</td>
                      <td className="p-2 text-right font-bold text-slate-900">{selectedNcForModal.gravada_5_gs.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Subtotales y Liquidación del IVA (Ley 6380/19) */}
                <div className="bg-slate-50 border-t border-slate-300 p-2.5 text-[10px] space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>SUBTOTAL VENTAS / RETORNOS:</span>
                    <span>Gs. {selectedNcForModal.total_nc_gs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>LIQUIDACIÓN DEL IVA (5% SEGÚN LEY 6380/19 - CANASTA BÁSICA LÁCTEA):</span>
                    <strong className="text-blue-800">Gs. {selectedNcForModal.iva_5_gs.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-black text-slate-900 pt-1 border-t border-slate-200">
                    <span>TOTAL GENERAL NOTA DE CRÉDITO:</span>
                    <span className="text-blue-900">Gs. {selectedNcForModal.total_nc_gs.toLocaleString()}</span>
                  </div>
                  <div className="text-[9px] text-slate-600 pt-1 italic">
                    SON: {numeroALetrasGs(selectedNcForModal.total_nc_gs)}
                  </div>
                </div>
              </div>

              {/* Pie con Código QR SIFEN y Validez DNIT */}
              <div className="border border-slate-300 rounded-lg p-3 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px]">
                <div className="flex items-center gap-3">
                  {/* Representación visual reglamentaria del QR KuDE */}
                  <div className="w-16 h-16 bg-slate-900 p-1 rounded flex items-center justify-center shrink-0">
                    <QrCode className="w-14 h-14 text-white" />
                  </div>
                  <div className="space-y-0.5">
                    <strong className="text-slate-900 block font-bold">Comprobante Fiscal Electrónico (SIFEN)</strong>
                    <span className="text-slate-500 block leading-tight">
                      Consulte la validez de esta Nota de Crédito Electrónica ingresando el CDC en:
                      <u className="block text-blue-700 font-bold">https://sifen.dnit.gov.py/consultas</u>
                    </span>
                    <span className="text-[8px] text-slate-400 block pt-0.5">
                      Firma Digital: CN=LACTOLANDA COOPERATIVA LA HOLANDA, C=PY • Algoritmo: SHA-256 with RSA
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold border border-slate-300 block">
                    COPIA PARA EL CLIENTE
                  </span>
                  <span className="text-[8px] text-slate-400 block mt-1">
                    Sistema Integrado Lactolanda ERP
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-slate-100 border-t border-slate-300 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">
                KuDE N° {selectedNcForModal.nro_comprobante_nc} • Aprobado por DNIT
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
                <button
                  onClick={() => setSelectedNcForModal(null)}
                  className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
