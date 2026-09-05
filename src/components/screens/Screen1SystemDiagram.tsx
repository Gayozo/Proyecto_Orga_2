import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  ArrowRight, 
  RotateCcw, 
  Eye, 
  ChevronRight, 
  X, 
  Package, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Building2, 
  Users, 
  Store, 
  CheckCircle2, 
  AlertOctagon,
  ArrowLeft,
  Factory
} from 'lucide-react';
import { LogisticProcessType, DimActor, FlujoLogisticoInfo } from '../../types';
import { CEDIS_LIST, ACOPIADORES_DATA, FLUJOS_TABLA_DATA, DIM_ACTORES_DATA, INITIAL_TRANS_INVENTARIO } from '../../data/mockData';

interface Screen1Props {
  onNavigateScreen: (screen: number) => void;
}

export const Screen1SystemDiagram: React.FC<Screen1Props> = ({ onNavigateScreen }) => {
  const [selectedLayer, setSelectedLayer] = useState<LogisticProcessType>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(6); // Default select CEDI Asunción
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);

  // Nodes definition for the interactive SVG layout
  const nodes = [
    {
      id: 1,
      name: 'Tamberos Primarios',
      subtitle: '125 Productores en 5 Zonas',
      category: 'entrada',
      type: 'Tambo',
      domain: 'Aprovisionamiento',
      x: 70,
      y: 190,
      width: 140,
      height: 110,
      color: '#0284c7', // Sky blue
      icon: Users,
      stats: { stock: '416,000 L/día', merma: '0.8%', otif: '98.9%' },
      flujos: ['F01']
    },
    {
      id: 2,
      name: 'Acopiadores de Leche',
      subtitle: '5 Firmas Zonificadas',
      category: 'entrada',
      type: 'Acopiador',
      domain: 'Logística de Entrada / Aprovisionamiento',
      x: 260,
      y: 190,
      width: 140,
      height: 110,
      color: '#0369a1',
      icon: Truck,
      stats: { stock: '395,000 L/día', merma: '0.4%', otif: '99.1%' },
      flujos: ['F01', 'F02']
    },
    {
      id: 4,
      name: 'Planta Campo 9',
      subtitle: 'Abast. • Producción • Depósito PT',
      category: 'intralogistica',
      type: 'Empresa',
      domain: 'Logística Interna / Intralogística',
      x: 450,
      y: 170,
      width: 160,
      height: 150,
      color: '#1d4ed8', // Royal Blue
      icon: Factory,
      stats: { stock: '1,940,000 L', merma: '0.9%', otif: '99.2%' },
      flujos: ['F02', 'F03', 'F04', 'F05', 'F16']
    },
    {
      id: 6,
      name: "13 CEDI'S Propios",
      subtitle: 'Centros Regionales de Distribución',
      category: 'intralogistica',
      type: 'CEDI',
      domain: 'Logística Interna / Intralogística',
      x: 660,
      y: 180,
      width: 145,
      height: 130,
      color: '#2563eb',
      icon: Building2,
      stats: { stock: '3,218,000 L', merma: '1.1%', otif: '97.8%' },
      flujos: ['F05', 'F06', 'F15', 'F16']
    },
    {
      id: 10,
      name: 'Distribuidores Mayoristas',
      subtitle: '65 Mayoristas (5 por CEDI)',
      category: 'salida',
      type: 'Mayorista',
      domain: 'Logística de Salida / Distribución',
      x: 855,
      y: 180,
      width: 150,
      height: 130,
      color: '#4338ca', // Indigo
      icon: Truck,
      stats: { stock: '215,000 u.', merma: '1.2%', otif: '96.5%' },
      flujos: ['F06', 'F07', 'F10', 'F11', 'F12', 'F14', 'F15']
    },
    {
      id: 11,
      name: 'Puntos de Venta (PDV)',
      subtitle: '5 Canales Minoristas Capilares',
      category: 'salida',
      type: 'PDV',
      domain: 'Distribución Capilar',
      x: 1055,
      y: 180,
      width: 150,
      height: 130,
      color: '#6366f1',
      icon: Store,
      stats: { stock: '180,000 u.', merma: '1.8%', otif: '95.8%' },
      flujos: ['F07', 'F08', 'F09', 'F10', 'F11', 'F12', 'F13', 'F14']
    },
    {
      id: 12,
      name: 'Consumidor Final',
      subtitle: 'Mercado Nacional Paraguayo',
      category: 'salida',
      type: 'Consumidor',
      domain: 'Consumo Masivo',
      x: 1255,
      y: 195,
      width: 125,
      height: 100,
      color: '#7c3aed',
      icon: Users,
      stats: { stock: 'En Consumo', merma: 'N/A', otif: '99.9%' },
      flujos: ['F08', 'F09', 'F13']
    }
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[3];

  // Helper to determine if a flow or node is active according to the selected layer
  const isNodeDimmed = (category: string) => {
    if (selectedLayer === 'all') return false;
    if (selectedLayer === 'inversa') {
      return category === 'entrada'; // Dim early supply in reverse focus
    }
    return selectedLayer !== category;
  };

  const isDirectFlowDimmed = () => {
    return selectedLayer === 'inversa';
  };

  const isReverseFlowHighlighted = () => {
    return selectedLayer === 'inversa' || selectedLayer === 'all';
  };

  const selectedFlowDetail = selectedFlowId 
    ? FLUJOS_TABLA_DATA.find((f) => f.id_flujo === selectedFlowId) 
    : null;

  return (
    <div className="flex-1 flex flex-col xl:flex-row overflow-hidden bg-slate-100">
      {/* Main Interactive Diagram Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 p-3 overflow-y-auto">
        {/* Top Filter Controls Bar */}
        <div className="bg-white p-2.5 rounded-lg shadow-xs border border-slate-200 mb-2.5 flex flex-wrap items-center justify-between gap-2 select-none">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider">
              Capas Logísticas:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <button
              id="filter-layer-all"
              onClick={() => setSelectedLayer('all')}
              className={`px-2 py-1 rounded text-[11px] font-medium font-mono transition-all cursor-pointer ${
                selectedLayer === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todas las Capas
            </button>
            <button
              id="filter-layer-entrada"
              onClick={() => setSelectedLayer('entrada')}
              className={`px-2 py-1 rounded text-[11px] font-medium font-mono transition-all cursor-pointer ${
                selectedLayer === 'entrada'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
              }`}
            >
              1. Entrada (Aprovisionamiento)
            </button>
            <button
              id="filter-layer-intralogistica"
              onClick={() => setSelectedLayer('intralogistica')}
              className={`px-2 py-1 rounded text-[11px] font-medium font-mono transition-all cursor-pointer ${
                selectedLayer === 'intralogistica'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              2. Intralogística (Planta & CEDI)
            </button>
            <button
              id="filter-layer-salida"
              onClick={() => setSelectedLayer('salida')}
              className={`px-2 py-1 rounded text-[11px] font-medium font-mono transition-all cursor-pointer ${
                selectedLayer === 'salida'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              3. Salida (Distribución Capilar)
            </button>
            <button
              id="filter-layer-inversa"
              onClick={() => setSelectedLayer('inversa')}
              className={`px-2 py-1 rounded text-[11px] font-bold font-mono transition-all flex items-center gap-1 cursor-pointer ${
                selectedLayer === 'inversa'
                  ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-400'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              <RotateCcw className="w-3 h-3 text-emerald-700" />
              4. Logística Inversa (F09-F16)
            </button>
          </div>
        </div>

        {/* Legend & Guidance Banner */}
        <div className="bg-slate-900 text-white p-2.5 rounded-lg mb-2.5 flex items-center justify-between text-[11px] shadow-xs select-none">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-500/30 flex items-center justify-center shrink-0 border border-blue-400/30">
              <Network className="w-3.5 h-3.5 text-sky-300" />
            </div>
            <div>
              <span className="font-bold text-sky-200">Lienzo Interactivo de Cadena de Valor (TGS): </span>
              <span className="text-slate-300">
                Selecciona cualquier nodo para desplegar su Dominio Logístico, Registro de Flujos y Métricas en tiempo real.
              </span>
            </div>
          </div>
          {selectedLayer === 'inversa' && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold font-mono shrink-0">
              <RotateCcw className="w-2.5 h-2.5 animate-spin" />
              Rutas de Retorno Activas
            </div>
          )}
        </div>

        {/* Interactive SVG Diagram Container */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-3 flex flex-col min-h-[460px] overflow-x-auto relative">
          <svg
            viewBox="0 0 1440 500"
            className="w-full h-full min-w-[1100px] select-none"
          >
            <defs>
              {/* Markers for direct arrows */}
              <marker id="arrowhead-direct" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
              </marker>
              <marker id="arrowhead-dimmed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#cbd5e1" />
              </marker>

              {/* Markers for reverse arrows */}
              <marker id="arrowhead-reverse" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#059669" />
              </marker>
              <marker id="arrowhead-reverse-active" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 9 3.5, 0 7" fill="#10b981" />
              </marker>

              {/* Gradients */}
              <linearGradient id="grad-plant" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>
            </defs>

            {/* Background Zones / Macro Domains */}
            <g id="macro-domains-layer">
              {/* 1. Aprovisionamiento */}
              <rect
                x="40"
                y="60"
                width="380"
                height="390"
                rx="18"
                fill="#f0f9ff"
                stroke="#bae6fd"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity={selectedLayer === 'all' || selectedLayer === 'entrada' ? 1 : 0.3}
              />
              <text x="60" y="90" fill="#0369a1" fontSize="12" fontWeight="700" letterSpacing="0.05em">
                1. CADENA DE ABASTECIMIENTO / APROVISIONAMIENTO
              </text>
              <text x="60" y="108" fill="#64748b" fontSize="10">
                125 Tamberos en 5 Zonas • 5 Acopiadores • Camiones Cisterna
              </text>

              {/* 2. Intralogística / Producción & CEDIs */}
              <rect
                x="430"
                y="60"
                width="390"
                height="390"
                rx="18"
                fill="#eff6ff"
                stroke="#bfdbfe"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity={selectedLayer === 'all' || selectedLayer === 'intralogistica' ? 1 : 0.3}
              />
              <text x="450" y="90" fill="#1d4ed8" fontSize="12" fontWeight="700" letterSpacing="0.05em">
                2. CADENA DE PRODUCCIÓN & INTRALOGÍSTICA
              </text>
              <text x="450" y="108" fill="#64748b" fontSize="10">
                Planta J.E. Estigarribia (Campo 9) • 13 Centros de Distribución Propios
              </text>

              {/* 3. Distribución Capilar */}
              <rect
                x="830"
                y="60"
                width="570"
                height="390"
                rx="18"
                fill="#faf5ff"
                stroke="#e9d5ff"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity={selectedLayer === 'all' || selectedLayer === 'salida' ? 1 : 0.3}
              />
              <text x="850" y="90" fill="#6b21a8" fontSize="12" fontWeight="700" letterSpacing="0.05em">
                3. CADENA DE DISTRIBUCIÓN & MERCADO CAPILAR
              </text>
              <text x="850" y="108" fill="#64748b" fontSize="10">
                65 Mayoristas Zonificados • 5 Canales de Puntos de Venta (PDV) • Consumidor
              </text>
            </g>

            {/* DIRECT LOGISTICS ARROWS (F01 - F08) */}
            <g id="direct-flows" opacity={isDirectFlowDimmed() ? 0.2 : 1}>
              {/* F01: Tamberos -> Acopiadores */}
              <path
                d="M 210 245 L 255 245"
                stroke="#0284c7"
                strokeWidth="3"
                markerEnd="url(#arrowhead-direct)"
              />
              <rect x="215" y="222" width="36" height="18" rx="4" fill="#0284c7" />
              <text x="233" y="235" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">F01</text>

              {/* F02: Acopiadores -> Planta */}
              <path
                d="M 400 245 L 445 245"
                stroke="#0369a1"
                strokeWidth="3"
                markerEnd="url(#arrowhead-direct)"
              />
              <rect x="405" y="222" width="36" height="18" rx="4" fill="#0369a1" />
              <text x="423" y="235" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">F02</text>

              {/* F05: Planta -> CEDIs */}
              <path
                d="M 610 245 L 655 245"
                stroke="#1d4ed8"
                strokeWidth="3"
                markerEnd="url(#arrowhead-direct)"
              />
              <rect x="615" y="222" width="36" height="18" rx="4" fill="#1d4ed8" />
              <text x="633" y="235" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">F05</text>

              {/* F06: CEDIs -> Mayoristas */}
              <path
                d="M 805 245 L 850 245"
                stroke="#2563eb"
                strokeWidth="3"
                markerEnd="url(#arrowhead-direct)"
              />
              <rect x="810" y="222" width="36" height="18" rx="4" fill="#2563eb" />
              <text x="828" y="235" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">F06</text>

              {/* F07: Mayoristas -> PDV */}
              <path
                d="M 1005 245 L 1050 245"
                stroke="#4338ca"
                strokeWidth="3"
                markerEnd="url(#arrowhead-direct)"
              />
              <rect x="1010" y="222" width="36" height="18" rx="4" fill="#4338ca" />
              <text x="1028" y="235" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">F07</text>

              {/* F08: PDV -> Consumidor */}
              <path
                d="M 1205 245 L 1250 245"
                stroke="#6366f1"
                strokeWidth="3"
                markerEnd="url(#arrowhead-direct)"
              />
              <rect x="1210" y="222" width="36" height="18" rx="4" fill="#6366f1" />
              <text x="1228" y="235" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">F08</text>
            </g>

            {/* REVERSE LOGISTICS RETURN ARROWS (F09 - F16) */}
            <g
              id="reverse-flows"
              opacity={isReverseFlowHighlighted() ? 1 : 0.25}
            >
              {/* Return path: Consumidor -> PDV (F09 / F13) */}
              <path
                d="M 1280 300 C 1280 360, 1170 360, 1150 315"
                fill="none"
                stroke={selectedLayer === 'inversa' ? '#059669' : '#10b981'}
                strokeWidth={selectedLayer === 'inversa' ? '3.5' : '2.5'}
                strokeDasharray="6 4"
                markerEnd="url(#arrowhead-reverse)"
              />
              <rect x="1190" y="350" width="62" height="18" rx="4" fill="#047857" />
              <text x="1221" y="363" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">
                F09 / F13
              </text>

              {/* Return path: PDV -> Mayoristas (F10 / F11 / F12 / F14) */}
              <path
                d="M 1080 315 C 1050 375, 960 375, 930 315"
                fill="none"
                stroke={selectedLayer === 'inversa' ? '#059669' : '#10b981'}
                strokeWidth={selectedLayer === 'inversa' ? '3.5' : '2.5'}
                strokeDasharray="6 4"
                markerEnd="url(#arrowhead-reverse)"
              />
              <rect x="970" y="365" width="70" height="18" rx="4" fill="#047857" />
              <text x="1005" y="378" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">
                F10 - F14
              </text>

              {/* Return path: Mayoristas -> CEDIs (F15) */}
              <path
                d="M 880 315 C 850 385, 760 385, 730 315"
                fill="none"
                stroke={selectedLayer === 'inversa' ? '#059669' : '#10b981'}
                strokeWidth={selectedLayer === 'inversa' ? '3.5' : '2.5'}
                strokeDasharray="6 4"
                markerEnd="url(#arrowhead-reverse)"
              />
              <rect x="780" y="375" width="45" height="18" rx="4" fill="#047857" />
              <text x="802" y="388" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">
                F15
              </text>

              {/* Return path: CEDIs -> Planta Campo 9 (F16) */}
              <path
                d="M 680 315 C 640 410, 560 410, 530 325"
                fill="none"
                stroke={selectedLayer === 'inversa' ? '#059669' : '#10b981'}
                strokeWidth={selectedLayer === 'inversa' ? '3.5' : '2.5'}
                strokeDasharray="6 4"
                markerEnd="url(#arrowhead-reverse)"
              />
              <rect x="580" y="400" width="45" height="18" rx="4" fill="#047857" />
              <text x="602" y="413" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">
                F16
              </text>

              {/* Final Disposition Labels at Campo 9 */}
              <g transform="translate(450, 360)">
                <rect x="0" y="0" width="85" height="34" rx="6" fill="#fee2e2" stroke="#f87171" strokeWidth="1" />
                <text x="42" y="14" fill="#991b1b" fontSize="9" fontWeight="bold" textAnchor="middle">Destrucción</text>
                <text x="42" y="27" fill="#b91c1c" fontSize="8" textAnchor="middle">Efluentes Ecológ.</text>
              </g>

              <g transform="translate(450, 400)">
                <rect x="0" y="0" width="85" height="34" rx="6" fill="#ecfdf5" stroke="#34d399" strokeWidth="1" />
                <text x="42" y="14" fill="#065f46" fontSize="9" fontWeight="bold" textAnchor="middle">Reutilización</text>
                <text x="42" y="27" fill="#047857" fontSize="8" textAnchor="middle">Re-empaque / Desvío</text>
              </g>
            </g>

            {/* INTERACTIVE NODES */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isDimmed = isNodeDimmed(node.category);

              return (
                <g
                  key={node.id}
                  id={`svg-node-${node.id}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer transition-transform duration-150"
                  opacity={isDimmed ? 0.35 : 1}
                >
                  {/* Selection halo */}
                  {isSelected && (
                    <rect
                      x={node.x - 6}
                      y={node.y - 6}
                      width={node.width + 12}
                      height={node.height + 12}
                      rx="16"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeDasharray="5 3"
                    />
                  )}

                  {/* Node Box */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx="12"
                    fill={node.id === 4 ? 'url(#grad-plant)' : '#ffffff'}
                    stroke={isSelected ? '#1d4ed8' : '#cbd5e1'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))"
                  />

                  {/* Top Bar for Node */}
                  {node.id !== 4 && (
                    <rect
                      x={node.x}
                      y={node.y}
                      width={node.width}
                      height="6"
                      rx="3"
                      fill={node.color}
                    />
                  )}

                  {/* Text Header */}
                  <text
                    x={node.x + 12}
                    y={node.y + 24}
                    fill={node.id === 4 ? '#ffffff' : '#0f172a'}
                    fontSize="12"
                    fontWeight="700"
                  >
                    {node.name}
                  </text>

                  <text
                    x={node.x + 12}
                    y={node.y + 40}
                    fill={node.id === 4 ? '#93c5fd' : '#64748b'}
                    fontSize="9.5"
                  >
                    {node.subtitle}
                  </text>

                  {/* Divider */}
                  <line
                    x1={node.x + 10}
                    y1={node.y + 48}
                    x2={node.x + node.width - 10}
                    y2={node.y + 48}
                    stroke={node.id === 4 ? '#1e3a8a' : '#f1f5f9'}
                    strokeWidth="1"
                  />

                  {/* Metrics inside Node */}
                  <text
                    x={node.x + 12}
                    y={node.y + 66}
                    fill={node.id === 4 ? '#bfdbfe' : '#475569'}
                    fontSize="9"
                    fontWeight="500"
                  >
                    Stock: <tspan fontWeight="bold" fill={node.id === 4 ? '#fff' : '#0f172a'}>{node.stats.stock}</tspan>
                  </text>

                  <text
                    x={node.x + 12}
                    y={node.y + 82}
                    fill={node.id === 4 ? '#bfdbfe' : '#475569'}
                    fontSize="9"
                    fontWeight="500"
                  >
                    Mermas: <tspan fontWeight="bold" fill={node.id === 4 ? '#fbbf24' : '#d97706'}>{node.stats.merma}</tspan>
                  </text>

                  <text
                    x={node.x + 12}
                    y={node.y + 98}
                    fill={node.id === 4 ? '#bfdbfe' : '#475569'}
                    fontSize="9"
                    fontWeight="500"
                  >
                    OTIF: <tspan fontWeight="bold" fill={node.id === 4 ? '#34d399' : '#059669'}>{node.stats.otif}</tspan>
                  </text>

                  {/* Click to inspect badge */}
                  <rect
                    x={node.x + node.width - 24}
                    y={node.y + 8}
                    width="16"
                    height="16"
                    rx="4"
                    fill={node.id === 4 ? '#1e3a8a' : '#f1f5f9'}
                  />
                  <text
                    x={node.x + node.width - 16}
                    y={node.y + 20}
                    fill={node.id === 4 ? '#60a5fa' : '#3b82f6'}
                    fontSize="10"
                    textAnchor="middle"
                  >
                    ℹ
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Shortcuts Bar Below SVG */}
          <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono select-none">
            <div className="flex items-center gap-3 text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-blue-600 rounded-full inline-block" />
                Flujo Directo (F01 - F08)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-emerald-600 rounded-full inline-block" />
                Flujo Inverso (F09 - F16)
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-sans">
              <span className="text-slate-400 text-[11px]">Atajos:</span>
              <button
                onClick={() => onNavigateScreen(2)}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] transition-colors cursor-pointer"
              >
                Rastrear Lote
              </button>
              <button
                onClick={() => onNavigateScreen(3)}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] transition-colors cursor-pointer"
              >
                Ver 13 CEDI
              </button>
              <button
                onClick={() => onNavigateScreen(4)}
                className="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-[11px] border border-emerald-200 transition-colors cursor-pointer"
              >
                Registrar Devolución
              </button>
            </div>
          </div>
        </div>

        {/* High-Density Stock Movement Table (TRANS_INVENTARIO) */}
        <div className="h-44 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col mt-2.5 shrink-0 overflow-hidden">
          <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center justify-between select-none">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Últimos Movimientos de Stock (TRANS_INVENTARIO)
            </span>
            <span className="text-[9px] text-slate-400 font-mono">Frecuencia: Tiempo Real</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px] sticky top-0 font-mono">
                <tr>
                  <th className="px-3 py-1 font-medium">ID_MOV</th>
                  <th className="px-3 py-1 font-medium">FLUJO</th>
                  <th className="px-3 py-1 font-medium">LOTE</th>
                  <th className="px-3 py-1 font-medium">ORIGEN</th>
                  <th className="px-3 py-1 font-medium">DESTINO</th>
                  <th className="px-3 py-1 font-medium text-right">CANTIDAD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {INITIAL_TRANS_INVENTARIO.slice(0, 8).map((mov) => (
                  <tr key={mov.id_movimiento} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-3 py-1 font-semibold text-slate-900">MOV-{mov.id_movimiento}</td>
                    <td className="px-3 py-1">
                      <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[9px] font-bold font-mono">
                        {mov.id_flujo_asociado}
                      </span>
                    </td>
                    <td className="px-3 py-1 text-slate-600">{mov.fk_lote}</td>
                    <td className="px-3 py-1 text-slate-700 font-sans truncate max-w-[150px]">{mov.nombre_origen}</td>
                    <td className="px-3 py-1 text-slate-700 font-sans truncate max-w-[150px]">{mov.nombre_destino}</td>
                    <td className="px-3 py-1 text-right font-bold text-slate-900">
                      {mov.cantidad.toLocaleString()} {mov.unidad}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Information Explorer Drawer (Inspector Lateral High Density) */}
      <div className="w-full xl:w-80 bg-white border-l border-slate-200 p-3 flex flex-col shrink-0 overflow-y-auto select-none">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">
              Explorador de Nodo TGS
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
            {selectedNode.type}
          </span>
        </div>

        {/* High-Contrast Node Information Banner */}
        <div className="mt-2.5 bg-slate-800 text-white rounded p-3 shadow-xs border-l-4 border-blue-400">
          <div className="text-[9px] uppercase font-mono font-bold text-blue-400 mb-1">
            Información del Nodo: {selectedNode.name}
          </div>
          <div className="text-[10px] text-slate-300 font-mono">{selectedNode.subtitle}</div>
          <div className="mt-2 pt-2 border-t border-slate-700/80">
            <div className="text-[9px] text-slate-400 uppercase font-mono">Dominio Logístico</div>
            <div className="text-xs text-sky-200 font-semibold mt-0.5 italic flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {selectedNode.domain}
            </div>
          </div>
        </div>

        {/* Real-time Mock Metrics */}
        <div className="mt-2.5">
          <div className="text-[10px] font-bold font-mono text-slate-600 uppercase tracking-wider mb-1.5">
            Métricas Operativas:
          </div>
          <div className="grid grid-cols-3 gap-1.5 font-mono">
            <div className="p-1.5 rounded bg-slate-50 border border-slate-200 text-center">
              <div className="text-[9px] text-slate-400 uppercase font-medium">Stock</div>
              <div className="text-[11px] font-bold text-slate-800 mt-0.5 truncate">{selectedNode.stats.stock}</div>
            </div>
            <div className="p-1.5 rounded bg-amber-50 border border-amber-200 text-center">
              <div className="text-[9px] text-amber-700 uppercase font-medium">Mermas</div>
              <div className="text-[11px] font-bold text-amber-800 mt-0.5">{selectedNode.stats.merma}</div>
            </div>
            <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-[9px] text-emerald-700 uppercase font-medium">OTIF %</div>
              <div className="text-[11px] font-bold text-emerald-800 mt-0.5">{selectedNode.stats.otif}</div>
            </div>
          </div>
        </div>

        {/* Flujos Activos Asociados (Tabla 1 de Flujos) */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-bold font-mono text-slate-600 uppercase tracking-wider mb-1.5">
            <span>Flujos Transaccionales:</span>
            <span className="text-slate-400 font-normal">({selectedNode.flujos.length})</span>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
            {selectedNode.flujos.map((flujoId) => {
              const flujo = FLUJOS_TABLA_DATA.find((f) => f.id_flujo === flujoId);
              if (!flujo) return null;
              const isReverse = flujo.tipo_logistica === 'Inversa';

              return (
                <div
                  key={flujo.id_flujo}
                  onClick={() => setSelectedFlowId(flujo.id_flujo)}
                  className={`p-2 rounded border text-xs cursor-pointer transition-all ${
                    selectedFlowId === flujo.id_flujo
                      ? 'border-blue-500 bg-blue-50/60 ring-1 ring-blue-400'
                      : isReverse
                      ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`font-mono font-bold px-1 py-0.2 rounded text-[9px] ${
                      isReverse ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {flujo.id_flujo}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 font-mono">
                      {flujo.tipo_logistica}
                    </span>
                  </div>

                  <div className="font-medium text-slate-800 text-[11px] truncate">
                    {flujo.motivo_o_recurso}
                  </div>

                  <div className="mt-1 pt-1 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span className="truncate max-w-[120px]">Resp: <strong className="text-slate-600">{flujo.responsable}</strong></span>
                    <span className="text-blue-600 font-semibold">{flujo.kpi_control}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Selected Flow Modal / Card */}
        {selectedFlowDetail && (
          <div className="mt-2.5 p-2.5 rounded bg-blue-900 text-white text-xs shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold font-mono text-[10px] text-sky-300">Detalle: {selectedFlowDetail.id_flujo}</span>
              <button
                onClick={() => setSelectedFlowId(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-slate-200 text-[11px] leading-relaxed mb-1.5">
              {selectedFlowDetail.proceso_a_realizar}
            </p>
            <div className="p-1.5 rounded bg-blue-950 border border-blue-800 text-[10px] font-mono space-y-0.5">
              <div><span className="text-slate-400">Origen:</span> {selectedFlowDetail.area_origen}</div>
              <div><span className="text-slate-400">Destino:</span> {selectedFlowDetail.area_destino}</div>
              <div className="text-sky-300"><span>KPI:</span> {selectedFlowDetail.kpi_control}</div>
            </div>
          </div>
        )}

        {/* Compact Monitor Inverso Preview */}
        <div className="mt-2.5 p-2 rounded bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3 h-3 text-emerald-600" />
              Monitor Inverso (Reglas)
            </span>
            <span className="text-[9px] text-slate-400 font-mono">F09-F16</span>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="p-1 rounded bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-1">
              <AlertOctagon className="w-3 h-3 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold font-mono">LOT-YOG-2026-004 (Vencido)</span>
                <div className="text-[9px] text-rose-700">DESTRUCCIÓN INMEDIATA (Efluentes)</div>
              </div>
            </div>
            <div className="p-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold font-mono">LOT-LEC-2026-012 (Averiado)</span>
                <div className="text-[9px] text-emerald-700">RE-EMPAQUE SECUNDARIO Habilitado</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions specific to this node */}
        <div className="mt-2.5 pt-2 border-t border-slate-200 space-y-1.5">
          {selectedNode.id === 6 && (
            <button
              onClick={() => onNavigateScreen(3)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium shadow-xs transition-colors cursor-pointer"
            >
              <span>Inspeccionar los 13 CEDI's</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {selectedNode.id === 4 && (
            <button
              onClick={() => onNavigateScreen(2)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium shadow-xs transition-colors cursor-pointer"
            >
              <span>Monitorear Silos y Lotes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {selectedNode.id === 10 && (
            <button
              onClick={() => onNavigateScreen(3)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-medium shadow-xs transition-colors cursor-pointer"
            >
              <span>Ver Hojas de Ruta de Mayoristas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {(selectedNode.id === 11 || selectedNode.id === 12) && (
            <button
              onClick={() => onNavigateScreen(4)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium shadow-xs transition-colors cursor-pointer"
            >
              <span>Simular Retorno / Devolución</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => onNavigateScreen(5)}
            className="w-full flex items-center justify-between px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
          >
            <span>Ver en Modelo Relacional (DB)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
