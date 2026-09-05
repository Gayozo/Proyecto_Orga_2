import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { ReturnReason, ReturnDisposition, ReturnStatus, TransDevolucion, RegLote } from '../../types';
import { CEDIS_LIST, PRODUCTOS_DATA } from '../../data/mockData';

interface Screen4Props {
  devoluciones: TransDevolucion[];
  onAddDevolucion: (dev: TransDevolucion) => void;
  lotsList: RegLote[];
  onToggleLotStatus: (lotId: string) => void;
}

export const Screen4ReverseLogistics: React.FC<Screen4Props> = ({
  devoluciones,
  onAddDevolucion,
  lotsList,
  onToggleLotStatus
}) => {
  // Form State
  const [selectedActorOrigen, setSelectedActorOrigen] = useState('Superseis Los Laureles (Supermercados)');
  const [selectedCediDestino, setSelectedCediDestino] = useState('CEDI Z5 - Ciudad del Este');
  const [selectedProductoId, setSelectedProductoId] = useState<number>(4); // Yogur Frutilla
  const [selectedLote, setSelectedLote] = useState('LOT-YOG-2026-001-RET');
  const [cantidad, setCantidad] = useState<number>(120);
  const [motivo, setMotivo] = useState<ReturnReason>('Vencido');
  const [observaciones, setObservaciones] = useState('Caducado en góndola. Verificado en inspección visual.');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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
          actionDesc: 'Producto vencido. Se emite acta de destrucción, sanción pactada al mayorista/PDV y auditoría de rotación en góndola.',
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
          actionDesc: 'Envase exterior golpeado pero contenido lácteo hermético e intacto. Habilita acondicionamiento secundario en planta Campo 9.',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedProd = PRODUCTOS_DATA.find((p) => p.id_producto === selectedProductoId);

    const newDevolucion: TransDevolucion = {
      id_devolucion: Date.now() % 100000,
      fk_movimiento_origen: 5090 + Math.floor(Math.random() * 50),
      fk_actor_origen: 11,
      nombre_origen: selectedActorOrigen,
      fk_actor_destino: 7,
      nombre_destino: selectedCediDestino,
      fk_lote: selectedLote,
      nombre_producto: selectedProd?.nombre_producto || 'Producto Lácteo',
      tipo_devolucion: motivo,
      cantidad_devuelta: cantidad,
      unidad: 'Litros / Unidades',
      estado_proceso: 'Registrado en PDV',
      destino_final: currentDecision.disposition,
      fecha_registro: new Date().toISOString().replace('T', ' ').substring(0, 16),
      bloqueo_lotes_hermanos: currentDecision.lockSiblings,
      observaciones: observaciones
    };

    onAddDevolucion(newDevolucion);

    // If decision requires blocking, toggle lot status
    if (currentDecision.lockSiblings) {
      const lot = lotsList.find((l) => l.id_lote === selectedLote);
      if (lot && lot.estado_calidad !== 'Bloqueado ERP') {
        onToggleLotStatus(selectedLote);
      }
    }

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="flex-1 flex flex-col p-3.5 overflow-y-auto bg-slate-100 select-none">
      {/* Header Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs mb-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-amber-700 uppercase tracking-wider mb-0.5">
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              Logística Inversa & Retorno (F09 a F16)
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight font-mono">
              Consola de Gestión de Devoluciones y Mermas
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Motor de reglas de disposición final según causal: Defectuoso, Averiado, Exceso y Vencido.
            </p>
          </div>

          {/* Toast alert */}
          {showSuccessToast && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 text-white text-[11px] font-mono font-semibold shadow-xs animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Devolución registrada en bucle inverso exitosamente</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Left: Interactive Form & Brain of Quality (7 cols) */}
        <div className="xl:col-span-7 space-y-3">
          {/* Registration Form */}
          <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100 font-mono">
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              Formulario de Registro de Devolución
            </h3>

            <form onSubmit={handleSubmit} className="mt-2.5 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Actor Origen */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    Actor de Origen (PDV):
                  </label>
                  <select
                    value={selectedActorOrigen}
                    onChange={(e) => setSelectedActorOrigen(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Superseis Los Laureles (Supermercados)">Superseis Los Laureles (Supermercados)</option>
                    <option value="Stock CDE Centro (Supermercados)">Stock CDE Centro (Supermercados)</option>
                    <option value="Biggie Express Carmelitas (Conveniencia)">Biggie Express Carmelitas (Conveniencia)</option>
                    <option value="Despensa Don Bernardo (Despensas)">Despensa Don Bernardo (Despensas)</option>
                    <option value="Hotel Dazzler Asunción (HORECA)">Hotel Dazzler Asunción (HORECA)</option>
                    <option value="Consumidor Final (Reclamo en Mostrador)">Consumidor Final (Reclamo Directo)</option>
                  </select>
                </div>

                {/* CEDI Destino */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    CEDI de Destino (Consolidación F15):
                  </label>
                  <select
                    value={selectedCediDestino}
                    onChange={(e) => setSelectedCediDestino(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none bg-white"
                  >
                    {CEDIS_LIST.map((c) => (
                      <option key={c.id} value={c.nombre}>
                        {c.nombre} ({c.ciudad})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Producto */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    Producto Lácteo:
                  </label>
                  <select
                    value={selectedProductoId}
                    onChange={(e) => setSelectedProductoId(Number(e.target.value))}
                    className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none bg-white"
                  >
                    {PRODUCTOS_DATA.map((p) => (
                      <option key={p.id_producto} value={p.id_producto}>
                        {p.nombre_producto}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lote */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    Código de Lote:
                  </label>
                  <select
                    value={selectedLote}
                    onChange={(e) => setSelectedLote(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none bg-white"
                  >
                    {lotsList.map((l) => (
                      <option key={l.id_lote} value={l.id_lote}>
                        {l.id_lote} ({l.estado_calidad})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cantidad */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                    Cantidad (Unid/Litros):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:border-blue-500 outline-none bg-white"
                  />
                </div>
              </div>

              {/* Los 4 Motivos de Devolución */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-700 mb-1">
                  Motivo de Devolución:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMotivo('Defectuoso')}
                    className={`p-2 rounded border text-left transition-all cursor-pointer ${
                      motivo === 'Defectuoso'
                        ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-500 text-rose-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold">a) Defectuoso</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Leche cortada / mal estado</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMotivo('Averiado')}
                    className={`p-2 rounded border text-left transition-all cursor-pointer ${
                      motivo === 'Averiado'
                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 text-emerald-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold">b) Averiado</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Envases dañados</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMotivo('Exceso')}
                    className={`p-2 rounded border text-left transition-all cursor-pointer ${
                      motivo === 'Exceso'
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 text-blue-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold">c) Exceso</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Vto cercano &lt;15d</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMotivo('Vencido')}
                    className={`p-2 rounded border text-left transition-all cursor-pointer ${
                      motivo === 'Vencido'
                        ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-500 text-rose-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold">d) Vencido</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Caducado en góndola</div>
                  </button>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                  Observaciones:
                </label>
                <input
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none bg-white"
                />
              </div>

              {/* CEREBRO DE CALIDAD: Disposición Final Predictiva */}
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
                    Cerebro de Calidad • Regla Disposición
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/70 font-semibold">
                    Flujo: {currentDecision.flowAssoc}
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
                      Destino: <u>{currentDecision.disposition}</u>
                    </div>
                  </div>
                </div>
              </div>

              <button
                id="btn-submit-return"
                type="submit"
                className="w-full py-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Confirmar y Procesar Retorno Inverso</span>
              </button>
            </form>
          </div>

          {/* Workflow del Bucle de Retorno */}
          <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5 font-mono">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Workflow del Bucle de Retorno (Timeline)
            </h3>

            <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="text-[9px] text-slate-400 font-bold uppercase">1. PDV / Cliente</div>
                <div className="font-bold text-slate-800 mt-0.5">Reclamo & Segregación</div>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  Cambio directo o retiro a mermas.
                </p>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="text-[9px] text-slate-400 font-bold uppercase">2. Mayorista</div>
                <div className="font-bold text-slate-800 mt-0.5">Retiro en Ruta</div>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  Remito de Devolución para crédito.
                </p>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="text-[9px] text-slate-400 font-bold uppercase">3. CEDI Propio</div>
                <div className="font-bold text-slate-800 mt-0.5">Cámara de Reversa</div>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  Pesaje y clasificación en ERP.
                </p>
              </div>

              <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                <div className="text-[9px] text-emerald-700 font-bold uppercase">4. Planta Campo 9</div>
                <div className="font-bold text-emerald-900 mt-0.5">Inspección & Cierre</div>
                <p className="text-[9px] text-emerald-700 mt-0.5">
                  Re-empaque o Efluente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: History & Query Resolver (5 cols) */}
        <div className="xl:col-span-5 space-y-3">
          {/* Executive Query Card (Resolviendo la consulta directiva del prompt) */}
          <div className="bg-slate-900 text-white rounded-lg p-3 shadow-xs">
            <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-sky-400 uppercase tracking-wider mb-1">
              <FileWarning className="w-3.5 h-3.5 text-sky-400" />
              Consulta Directiva de Logística Inversa
            </div>
            <h4 className="text-xs font-bold font-mono">
              ¿Cuánto producto vencido se retiró en CEDI Este?
            </h4>
            <p className="text-[10px] text-slate-300 mt-0.5">
              Cálculo relacional cruzando <code className="text-sky-300 font-mono">TRANS_DEVOLUCIONES</code>, <code className="text-sky-300 font-mono">TRANS_INVENTARIO</code>:
            </p>

            {/* Calculated KPI directly from dataset */}
            <div className="mt-2.5 p-2.5 rounded bg-white/10 border border-white/10 flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-slate-300">Total Vencido CEDI Este:</span>
                <div className="text-lg font-extrabold text-amber-300">
                  {devoluciones
                    .filter((d) => d.nombre_destino.includes('Este') && d.tipo_devolucion === 'Vencido')
                    .reduce((acc, d) => acc + d.cantidad_devuelta, 0)}{' '}
                  <span className="text-xs font-medium text-white">L/u.</span>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-rose-500/30 text-rose-300 border border-rose-400/30">
                Destrucción
              </span>
            </div>

            <div className="mt-2 text-[9px] text-slate-400 font-mono">
              SELECT SUM(d.cantidad_devuelta) FROM TRANS_DEVOLUCIONES WHERE tipo = 'Vencido' AND CEDI = 'CEDI Este'
            </div>
          </div>

          {/* Real-time Returns Registry Table */}
          <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <h4 className="text-xs font-bold font-mono text-slate-900">
                Historial Devoluciones ({devoluciones.length})
              </h4>
              <span className="text-[9px] font-mono text-slate-400">Tiempo Real</span>
            </div>

            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              {devoluciones.map((dev) => {
                const isDestruction = dev.destino_final === 'Destrucción / Efluente';
                return (
                  <div
                    key={dev.id_devolucion}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-[11px] space-y-1 transition-colors font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">DEV-#{dev.id_devolucion}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          dev.tipo_devolucion === 'Vencido' || dev.tipo_devolucion === 'Defectuoso'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {dev.tipo_devolucion}
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 font-sans">{dev.nombre_producto}</div>
                      <div className="text-[10px] text-slate-500">
                        Lote: <strong className="text-slate-700">{dev.fk_lote}</strong> • Cant: <strong>{dev.cantidad_devuelta} {dev.unidad}</strong>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-500 bg-white p-1.5 rounded border border-slate-100 space-y-0.2">
                      <div><span className="text-slate-400">Origen:</span> {dev.nombre_origen}</div>
                      <div><span className="text-slate-400">Destino:</span> {dev.nombre_destino}</div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[9px]">
                      <span className="text-slate-400">{dev.fecha_registro}</span>
                      <span
                        className={`font-semibold ${
                          isDestruction ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {dev.destino_final}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
