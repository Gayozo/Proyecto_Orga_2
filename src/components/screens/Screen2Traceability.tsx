import React, { useState } from 'react';
import { 
  ScanBarcode, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Calendar, 
  Factory, 
  Truck, 
  Users, 
  Building2, 
  ThermometerSnowflake, 
  FileCheck2, 
  Info,
  Lock,
  Unlock,
  ChevronRight,
  GitBranch,
  Layers,
  Sparkles,
  ArrowDown,
  Microscope,
  Flame,
  Store
} from 'lucide-react';
import { RegLote } from '../../types';
import { LOTES_DATA, CEDIS_LIST } from '../../data/mockData';

interface Screen2Props {
  lotsList: RegLote[];
  onToggleLotStatus: (lotId: string) => void;
  onNavigateScreen: (screen: number) => void;
}

export const Screen2Traceability: React.FC<Screen2Props> = ({
  lotsList,
  onToggleLotStatus,
  onNavigateScreen
}) => {
  const [searchQuery, setSearchQuery] = useState('LOT-YOG-2026-004');
  const [selectedLotId, setSelectedLotId] = useState('LOT-YOG-2026-004');
  const [treeViewMode, setTreeViewMode] = useState<'tree' | 'pipeline'>('tree');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Find active lot
  const activeLot = lotsList.find((l) => l.id_lote.toUpperCase() === selectedLotId.toUpperCase()) 
    || lotsList[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    const found = lotsList.find((l) => 
      l.id_lote.toUpperCase() === query || 
      l.id_lote.toUpperCase().includes(query) ||
      (l.nombre_producto && l.nombre_producto.toUpperCase().includes(query))
    );
    if (found) {
      setSelectedLotId(found.id_lote);
    }
  };

  // Filter lots by search query or category
  const filteredLots = lotsList.filter((lot) => {
    const matchesSearch = lot.id_lote.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (lot.nombre_producto && lot.nombre_producto.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Associated CEDI info
  const matchedCedi = CEDIS_LIST.find((c) => activeLot.cedi_destino.includes(c.id) || activeLot.cedi_destino.includes(c.ciudad));

  return (
    <div className="flex-1 flex flex-col p-3.5 overflow-y-auto bg-slate-100 select-none">
      {/* Search Header Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs mb-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="max-w-3xl">
            <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-blue-700 uppercase tracking-wider mb-1">
              <ScanBarcode className="w-3.5 h-3.5 text-blue-600" />
              Trazabilidad Ascendente y Descendente (Traceability Tree)
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight font-mono">
              Monitor de Trazabilidad de Lotes y Árbol Genealógico
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Reconstrucción inmutable del origen de la materia prima (tamberos, acopiadores), proceso intralogístico de pasteurización y despacho al CEDI regional.
            </p>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-2.5 flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="input-search-lot"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar lote de producto terminado (ej: LOT-YOG-2026-004)..."
                  className="w-full pl-9 pr-3 py-1.5 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-mono text-slate-900 outline-none transition-all shadow-xs bg-white"
                />
              </div>
              <button
                id="btn-search-lot"
                type="submit"
                className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs font-mono shadow-xs transition-colors cursor-pointer"
              >
                Rastrear Lote
              </button>
            </form>

            {/* Quick Select Chips */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400 font-medium">Lotes disponibles:</span>
              {lotsList.map((lot) => {
                const isSelected = lot.id_lote === activeLot.id_lote;
                const isBlocked = lot.estado_calidad === 'Bloqueado ERP' || lot.estado_calidad === 'Retirado';
                return (
                  <button
                    key={lot.id_lote}
                    onClick={() => {
                      setSelectedLotId(lot.id_lote);
                      setSearchQuery(lot.id_lote);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isBlocked
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {lot.id_lote}
                    {isBlocked && ' ⚠️'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Mode Toggle Button */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="flex items-center p-0.5 bg-slate-100 rounded border border-slate-200 text-[10px] font-mono">
              <button
                id="toggle-view-tree"
                onClick={() => setTreeViewMode('tree')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all cursor-pointer ${
                  treeViewMode === 'tree'
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GitBranch className="w-3 h-3" />
                <span>Árbol Genealógico</span>
              </button>
              <button
                id="toggle-view-pipeline"
                onClick={() => setTreeViewMode('pipeline')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all cursor-pointer ${
                  treeViewMode === 'pipeline'
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Vista Fases (4 Pasos)</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-500 font-mono text-right">
              Mapeo de Flujos: <strong className="text-blue-700 font-bold">F01 → F02 → F03 → F04 → F05</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Lot Status Banner with ERP Recall Lock Toggle */}
      <div className={`p-3 rounded-lg border mb-3 flex flex-wrap items-center justify-between gap-3 ${
        activeLot.estado_calidad === 'Aprobado'
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          : 'bg-rose-50/70 border-rose-200 text-rose-950'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            activeLot.estado_calidad === 'Aprobado' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            {activeLot.estado_calidad === 'Aprobado' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight">
                Lote Activo: <span className="font-mono">{activeLot.id_lote}</span> — {activeLot.nombre_producto}
              </h3>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                activeLot.estado_calidad === 'Aprobado'
                  ? 'bg-emerald-200/80 text-emerald-900'
                  : 'bg-rose-200 text-rose-900'
              }`}>
                {activeLot.estado_calidad}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-mono mt-0.5">
              Fecha Elaboración: <strong className="text-slate-800">{activeLot.fecha_fabricacion}</strong> • Vencimiento: <strong className="text-slate-800">{activeLot.fecha_vencimiento}</strong> • CEDI Destino: <strong className="text-slate-800">{activeLot.cedi_destino}</strong>
            </p>
          </div>
        </div>

        {/* Action Toggle Button */}
        <button
          id="btn-toggle-erp-lock"
          onClick={() => onToggleLotStatus(activeLot.id_lote)}
          className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
            activeLot.estado_calidad === 'Aprobado'
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {activeLot.estado_calidad === 'Aprobado' ? (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>Bloquear Lote en ERP (Recall Preventivo)</span>
            </>
          ) : (
            <>
              <Unlock className="w-3.5 h-3.5" />
              <span>Desbloquear y Liberar Lote en ERP</span>
            </>
          )}
        </button>
      </div>

      {/* VIEW 1: TRACEABILITY TREE (ÁRBOL GENEALÓGICO JERÁRQUICO) */}
      {treeViewMode === 'tree' ? (
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <GitBranch className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-mono">
                  Estructura de Árbol de Trazabilidad (Traceability Tree)
                </h4>
                <p className="text-[10px] text-slate-500 font-mono">
                  Genealogía directa: Tamberos Primarios → Acopiador → Pasteurización & Silos → CEDI Destino
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              Cadena de Custodia 100% Auditada
            </span>
          </div>

          {/* Tree Visualization with Branch Connectors */}
          <div className="relative pl-4 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-blue-300">
            
            {/* NIVEL 1: RAÍZ - ORIGEN: TAMBEROS PRODUCTORES */}
            <div className="relative">
              {/* Connector Pin */}
              <div className="absolute -left-4 sm:-left-7 top-1.5 w-3 h-3 rounded-full bg-sky-500 border-2 border-white ring-2 ring-sky-300 shadow-xs" />
              
              <div className="bg-sky-50/50 rounded-lg border border-sky-200 p-3 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-sky-600 text-white font-mono font-bold text-[10px]">
                      NIVEL 1 • RAÍZ
                    </span>
                    <h5 className="font-bold text-xs text-sky-950 font-mono">
                      Origen Primario: Tambos Lecheros Asociados
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono text-sky-700 font-semibold">
                    Flujo F01 • Ordeñe Mecánico y Frío
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeLot.tamberos_involucrados.map((tambo, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-white border border-sky-200 shadow-2xs flex flex-col justify-between text-[11px] font-mono"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800 text-xs">{tambo}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <div className="text-[10px] text-slate-500 space-y-0.5">
                        <div>Aporte: <strong>{(1200 + idx * 350).toLocaleString()} L</strong></div>
                        <div>Temp. Ordeñe: <strong>3.7°C</strong></div>
                        <div>Prueba Alcohol: <strong className="text-emerald-700">Conforme (72°)</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* NIVEL 2: ACOPIO Y TRANSPORTE CISTERNA */}
            <div className="relative">
              {/* Connector Pin */}
              <div className="absolute -left-4 sm:-left-7 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white ring-2 ring-blue-300 shadow-xs" />

              <div className="bg-blue-50/50 rounded-lg border border-blue-200 p-3 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white font-mono font-bold text-[10px]">
                      NIVEL 2 • TRONCO
                    </span>
                    <h5 className="font-bold text-xs text-blue-950 font-mono">
                      Acopio Zonificado y Cisterna Isotérmica
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 font-semibold">
                    Flujo F02 • Enfriamiento a Granel
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded bg-white border border-blue-200">
                    <span className="text-slate-400 block text-[9px] uppercase">Acopiador Responsable:</span>
                    <strong className="text-slate-900 text-xs block">{activeLot.origen_acopiador}</strong>
                    <div className="text-[10px] text-slate-500 mt-1">
                      Ruta de recolección: Tanques de frío en tambos comunitarios
                    </div>
                  </div>

                  <div className="p-2 rounded bg-white border border-blue-200">
                    <span className="text-slate-400 block text-[9px] uppercase">Vehículo Cisterna Asignado:</span>
                    <strong className="text-slate-900 text-xs block">{activeLot.camion_cisterna}</strong>
                    <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>Termógrafo en ruta: <strong className="text-blue-700">3.5°C</strong></span>
                      <span className="text-emerald-700 font-bold">GPS Sincronizado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NIVEL 3: PROCESO INTRALOGÍSTICO (PLANTA CAMPO 9: ENSAYOS, SILOS Y PASTEURIZACIÓN) */}
            <div className="relative">
              {/* Connector Pin */}
              <div className="absolute -left-4 sm:-left-7 top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white ring-2 ring-indigo-300 shadow-xs" />

              <div className="bg-indigo-50/50 rounded-lg border border-indigo-200 p-3 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-indigo-600 text-white font-mono font-bold text-[10px]">
                      NIVEL 3 • PROCESO INTRALOGÍSTICO
                    </span>
                    <h5 className="font-bold text-xs text-indigo-950 font-mono">
                      Industrialización en Planta J.E. Estigarribia (Campo 9)
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-700 font-semibold">
                    Flujos F03 & F04 • Ensayos, Pasteurización & Silos
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  {/* Sub-node A: Ensayos de Calidad en Recepción */}
                  <div className="p-2.5 rounded bg-white border border-indigo-200 flex flex-col justify-between font-mono text-[11px]">
                    <div>
                      <div className="flex items-center gap-1 text-indigo-800 font-bold text-[11px] mb-1">
                        <Microscope className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Ensayos Bromatológicos</span>
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between border-b border-slate-100 pb-0.5">
                          <span className="text-slate-500">Materia Grasa:</span>
                          <strong className="text-slate-800">{activeLot.parametros_calidad.grasa}</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-0.5">
                          <span className="text-slate-500">Proteína:</span>
                          <strong className="text-slate-800">{activeLot.parametros_calidad.proteina}</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-0.5">
                          <span className="text-slate-500">Acidez Dornic:</span>
                          <strong className="text-slate-800">{activeLot.parametros_calidad.acidez_dornic}</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-0.5">
                          <span className="text-slate-500">Prueba Alcohol:</span>
                          <strong className="text-emerald-700">{activeLot.parametros_calidad.prueba_alcohol}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Conteo Bacteriano:</span>
                          <strong className="text-slate-800">{activeLot.parametros_calidad.conteo_bacteriano}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sub-node B: Silo Almacenamiento */}
                  <div className="p-2.5 rounded bg-white border border-indigo-200 flex flex-col justify-between font-mono text-[11px]">
                    <div>
                      <div className="flex items-center gap-1 text-indigo-800 font-bold text-[11px] mb-1">
                        <Factory className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Silo & Mezclador</span>
                      </div>
                      <div className="text-[10px] text-slate-600 space-y-1 mt-1">
                        <div>
                          <span className="text-slate-400 block text-[9px]">Silo Asignado:</span>
                          <strong className="text-slate-900 block">{activeLot.silo_almacenamiento}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">Capacidad & Frío:</span>
                          <span className="text-slate-800">50,000 L a 2.8°C constante</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">Homogeneización:</span>
                          <span className="text-emerald-700 font-semibold">180 bar (Conforme)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sub-node C: Pasteurización Térmica */}
                  <div className="p-2.5 rounded bg-white border border-indigo-200 flex flex-col justify-between font-mono text-[11px]">
                    <div>
                      <div className="flex items-center gap-1 text-indigo-800 font-bold text-[11px] mb-1">
                        <Flame className="w-3.5 h-3.5 text-rose-600" />
                        <span>Tratamiento Térmico</span>
                      </div>
                      <div className="text-[10px] text-slate-600 space-y-1 mt-1">
                        <div>
                          <span className="text-slate-400 block text-[9px]">Pasteurización:</span>
                          <strong className="text-rose-900 text-xs block">{activeLot.temperatura_pasteurizacion}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">Envasado Aséptico:</span>
                          <span className="text-slate-800">Línea Tetra Pak / PEAD Sincronizada</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">Control Microbiológico:</span>
                          <span className="text-emerald-700 font-bold">100% Liberado por Calidad</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NIVEL 4: DESTINO - DESPACHO Y ALMACENAMIENTO EN CEDI */}
            <div className="relative">
              {/* Connector Pin */}
              <div className="absolute -left-4 sm:-left-7 top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-white ring-2 ring-purple-300 shadow-xs" />

              <div className="bg-purple-50/50 rounded-lg border border-purple-200 p-3 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-purple-600 text-white font-mono font-bold text-[10px]">
                      NIVEL 4 • RAMA DE DESTINO
                    </span>
                    <h5 className="font-bold text-xs text-purple-950 font-mono">
                      Despacho al CEDI Regional Asignado
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono text-purple-700 font-semibold">
                    Flujo F05 • Transporte Inter-CEDI Masivo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded bg-white border border-purple-200">
                    <span className="text-slate-400 block text-[9px] uppercase">CEDI de Destino:</span>
                    <strong className="text-purple-900 text-xs block">{activeLot.cedi_destino}</strong>
                    <span className="text-[10px] text-slate-500">
                      {matchedCedi ? `${matchedCedi.zona} (${matchedCedi.ciudad})` : 'Centro de Distribución'}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-white border border-purple-200">
                    <span className="text-slate-400 block text-[9px] uppercase">Cámara Frigorífica CEDI:</span>
                    <strong className="text-blue-700 text-xs block">
                      {matchedCedi ? `${matchedCedi.temperaturaCamara}°C` : '3.2°C'} (Monitoreo continuo)
                    </strong>
                    <span className="text-[10px] text-emerald-700 font-medium">Cadena de Frío Intacta</span>
                  </div>

                  <div className="p-2 rounded bg-white border border-purple-200 flex flex-col justify-between">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Acceso Rápido:</span>
                      <span className="text-[10px] text-slate-700">Ver inventario y mayoristas de este CEDI</span>
                    </div>
                    <button
                      id="btn-goto-cedi-inventory"
                      onClick={() => onNavigateScreen(3)}
                      className="mt-1 flex items-center justify-between px-2 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      <span>Ir a Pantalla de Inventario</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* NIVEL 5: HOJAS DE RUTA Y PDVS DESTINATARIOS */}
            <div className="relative">
              {/* Connector Pin */}
              <div className="absolute -left-4 sm:-left-7 top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-300 shadow-xs" />

              <div className="bg-emerald-50/40 rounded-lg border border-emerald-200 p-3 shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white font-mono font-bold text-[10px]">
                      NIVEL 5 • HOJAS CAPILARES
                    </span>
                    <h5 className="font-bold text-xs text-emerald-950 font-mono">
                      Distribución Capilar hacia Mayoristas y Góndolas PDV
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                    Flujos F06 & F07 • Última Milla
                  </span>
                </div>

                <div className="p-2 rounded bg-white border border-emerald-200 text-[11px] font-mono flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-800 font-bold">Mayoristas Receptores en la Zona:</span>
                    <span className="text-slate-500 ml-1">5 Distribuidores autorizados de {activeLot.cedi_destino}</span>
                  </div>
                  <button
                    onClick={() => onNavigateScreen(3)}
                    className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-800 text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Ver Rutas de los 65 Mayoristas</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: PIPELINE EN 4 PASOS */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Paso 1: Aprovisionamiento */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
              <span className="text-[10px] font-bold font-mono text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                Paso 1: Aprovisionamiento
              </span>
              <Users className="w-3.5 h-3.5 text-sky-600" />
            </div>

            <h4 className="text-xs font-bold text-slate-900 font-mono">Origen Materia Prima</h4>
            <p className="text-[10px] text-slate-500">Leche cruda natural recolectada</p>

            <div className="mt-2.5 p-2 rounded bg-sky-50/70 border border-sky-100 text-[11px] space-y-1.5">
              <div>
                <span className="text-slate-500 text-[10px] font-mono">Acopiador Responsable:</span>
                <div className="font-bold text-sky-900">{activeLot.origen_acopiador}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono">Transporte Cisterna:</span>
                <div className="font-medium text-slate-800 font-mono text-[10px]">{activeLot.camion_cisterna}</div>
              </div>
            </div>

            <div className="mt-2.5">
              <span className="text-[10px] font-mono font-bold text-slate-700 block mb-1.5">
                Tamberos Productores:
              </span>
              <div className="space-y-1">
                {activeLot.tamberos_involucrados.map((tambo, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-800">{tambo}</span>
                    <span className="text-[9px] px-1 py-0.2 bg-sky-100 text-sky-800 rounded font-mono font-medium">
                      Conforme
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>Temp. Tanque: <strong>3.8°C</strong></span>
            </div>
          </div>

          {/* Paso 2: Control de Calidad */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
              <span className="text-[10px] font-bold font-mono text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Paso 2: Control Calidad
              </span>
              <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
            </div>

            <h4 className="text-xs font-bold text-slate-900 font-mono">Ensayos Bromatológicos</h4>
            <p className="text-[10px] text-slate-500">Laboratorio Central Planta Campo 9</p>

            <div className="mt-2.5 space-y-1 text-[11px] font-mono">
              <div className="p-1.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 text-[10px]">Materia Grasa:</span>
                <span className="font-bold text-slate-900">{activeLot.parametros_calidad.grasa}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 text-[10px]">Proteína Láctea:</span>
                <span className="font-bold text-slate-900">{activeLot.parametros_calidad.proteina}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 text-[10px]">Acidez Dornic:</span>
                <span className="font-bold text-slate-900">{activeLot.parametros_calidad.acidez_dornic}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 text-[10px]">Prueba Alcohol:</span>
                <span className="font-bold text-emerald-700">{activeLot.parametros_calidad.prueba_alcohol}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 text-[10px]">Conteo Bacteriano:</span>
                <span className="font-bold text-slate-900">{activeLot.parametros_calidad.conteo_bacteriano}</span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-slate-100 text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Bromatología Conforme</span>
            </div>
          </div>

          {/* Paso 3: Intralogística y Pasteurización */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
              <span className="text-[10px] font-bold font-mono text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Paso 3: Intralogística
              </span>
              <Factory className="w-3.5 h-3.5 text-indigo-600" />
            </div>

            <h4 className="text-xs font-bold text-slate-900 font-mono">Procesamiento y Silos</h4>
            <p className="text-[10px] text-slate-500">Línea de Envasado Aséptico</p>

            <div className="mt-2.5 p-2 rounded bg-indigo-50/70 border border-indigo-100 text-[11px] space-y-1.5">
              <div>
                <span className="text-slate-500 text-[10px] font-mono">Silo Almacenamiento:</span>
                <div className="font-bold text-indigo-950 font-mono text-[11px]">{activeLot.silo_almacenamiento}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono">Pasteurización:</span>
                <div className="font-bold text-indigo-950 font-mono text-[11px]">{activeLot.temperatura_pasteurizacion}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono">Depósito PT:</span>
                <div className="font-medium text-slate-800 text-[10px]">Cámara Central Frío (2.5°C)</div>
              </div>
            </div>

            <div className="mt-2.5 p-2 rounded bg-slate-50 border border-slate-200 text-[10px] font-mono space-y-0.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Elaboración:</span>
                <span className="font-bold text-slate-800">{activeLot.fecha_fabricacion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vencimiento:</span>
                <span className="font-bold text-slate-800">{activeLot.fecha_vencimiento}</span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Ciclo Planta: <strong>14.5 horas</strong></span>
            </div>
          </div>

          {/* Paso 4: Despacho a CEDI */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
              <span className="text-[10px] font-bold font-mono text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Paso 4: Despacho a CEDI
              </span>
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
            </div>

            <h4 className="text-xs font-bold text-slate-900 font-mono">Distribución Regional</h4>
            <p className="text-[10px] text-slate-500">Centro de Distribución Primario</p>

            <div className="mt-2.5 p-2 rounded bg-purple-50/70 border border-purple-100 text-[11px] space-y-1.5">
              <div>
                <span className="text-slate-500 text-[10px] font-mono">CEDI de Destino:</span>
                <div className="font-bold text-purple-950 font-mono text-xs">{activeLot.cedi_destino}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono">Flujo Primario:</span>
                <div className="font-medium text-slate-800 text-[10px]">F05 - Despacho Masivo Frigorífico</div>
              </div>
            </div>

            <div className="mt-2.5 p-2 rounded bg-slate-50 border border-slate-200 text-[10px] font-mono space-y-1">
              <div className="text-slate-500 font-medium">Cadena de Frío:</div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Tránsito:</span>
                <span className="text-blue-700 font-bold">3.2°C (OK)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Cámara CEDI:</span>
                <span className="text-blue-700 font-bold">3.0°C (OK)</span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-slate-100">
              <button
                onClick={() => onNavigateScreen(3)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-medium font-mono transition-colors shadow-xs cursor-pointer"
              >
                <span>Ver Stock CEDI Destino</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
