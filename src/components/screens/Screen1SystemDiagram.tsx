import React, { useState, useEffect, useRef } from 'react';
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
  Factory,
  Play,
  Pause,
  Zap,
  Info,
  Thermometer,
  Gauge,
  Sparkles,
  RefreshCw,
  Sliders,
  ExternalLink,
  Flame,
  Recycle,
  Milk
} from 'lucide-react';
import { LogisticProcessType, DimActor, FlujoLogisticoInfo } from '../../types';
import { CEDIS_LIST, ACOPIADORES_DATA, FLUJOS_TABLA_DATA, DIM_ACTORES_DATA, INITIAL_TRANS_INVENTARIO } from '../../data/mockData';

interface Screen1Props {
  onNavigateScreen: (screen: number) => void;
}

export const Screen1SystemDiagram: React.FC<Screen1Props> = ({ onNavigateScreen }) => {
  const [selectedLayer, setSelectedLayer] = useState<LogisticProcessType>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null); // null shows executive storytelling
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);
  const [isAnimationRunning, setIsAnimationRunning] = useState<boolean>(true);
  const [animationSpeed, setAnimationSpeed] = useState<'normal' | 'fast'>('normal');

  // Interactive Node definitions with precise layout coordinates in a 1440x580 canvas
  const nodes = [
    {
      id: 1,
      name: 'Tamberos Primarios',
      subtitle: '125 Productores en 5 Zonas',
      category: 'entrada',
      type: 'Tambo',
      domain: 'Logística de Entrada / Aprovisionamiento',
      x: 50,
      y: 190,
      width: 155,
      height: 120,
      color: '#38bdf8', // Electric Cyan
      glowColor: 'rgba(56, 189, 248, 0.4)',
      icon: Users,
      stats: { stock: '416,000 L/día', merma: '0.8%', otif: '98.9%', temp: '3.8°C', capacidad: '450k L' },
      flujos: ['F01'],
      narrative: 'Inicio de la cadena láctea. 125 tambos familiares y tecnificados de Campo 9, Sommerfeld y Bergthal ordeñan bajo estrictos protocolos higiénicos y refrigeran de inmediato a < 4°C en tanques de expansión antes de 2 horas.',
      responsables: 'Productores Lácteos / Control de Calidad Primario',
      subprocesos: ['Ordeñe automatizado', 'Enfriamiento en tanque de tambo a 4°C', 'Muestreo de grasa y acidez', 'Traspaso a camión cisterna']
    },
    {
      id: 2,
      name: 'Acopiadores de Leche',
      subtitle: '5 Firmas Zonificadas',
      category: 'entrada',
      type: 'Acopiador',
      domain: 'Logística de Entrada / Aprovisionamiento',
      x: 250,
      y: 190,
      width: 155,
      height: 120,
      color: '#0284c7', // Sky Blue
      glowColor: 'rgba(2, 132, 199, 0.4)',
      icon: Truck,
      stats: { stock: '395,000 L/día', merma: '0.4%', otif: '99.1%', temp: '3.5°C', capacidad: '416k L' },
      flujos: ['F01', 'F02'],
      narrative: 'Consolidan la leche cruda de los 125 tambos en 5 circuitos geográficos (Ruta PY02, Sommerfeld, Bergthal, Raúl A. Oviedo y Mcal. López). Operan camiones cisterna con aislamiento térmico y agitación continua.',
      responsables: 'Empresas de Acopio y Logística de Recolección',
      subprocesos: ['Rutas diarias de recolección en tambo', 'Test de alcohol y densidad in situ', 'Pesaje en báscula de acopio', 'Transporte hermético a Planta Campo 9']
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
      width: 175,
      height: 160,
      color: '#10b981', // Emerald Green (Internal control)
      glowColor: 'rgba(16, 185, 129, 0.45)',
      icon: Factory,
      stats: { stock: '1,940,000 L', merma: '0.9%', otif: '99.2%', temp: '2.5°C', capacidad: '2,500k L' },
      flujos: ['F02', 'F03', 'F04', 'F05', 'F16'],
      narrative: 'Corazón industrial de Lactolanda en J. Eulogio Estigarribia. Alberga los 8 silos de leche cruda, líneas UHT de ultrapasteurización, envasado aséptico Tetra Pak, cámara central de Producto Terminado y planta de efluentes.',
      responsables: 'Gerencia Industrial, Producción, Aseguramiento de Calidad',
      subprocesos: ['Descarga y desaireado en silos', 'Pasteurización / Esterilización UHT', 'Control microbiológico por lote', 'Paletizado y transferencia a CEDIs']
    },
    {
      id: 6,
      name: "13 CEDI'S Propios",
      subtitle: 'Red Nacional de Distribución',
      category: 'intralogistica',
      type: 'CEDI',
      domain: 'Logística Interna / Intralogística',
      x: 670,
      y: 185,
      width: 160,
      height: 130,
      color: '#059669', // Emerald Dark
      glowColor: 'rgba(5, 150, 105, 0.4)',
      icon: Building2,
      stats: { stock: '3,218,000 L', merma: '1.1%', otif: '97.8%', temp: '3.2°C', capacidad: '3,800k L' },
      flujos: ['F05', 'F06', 'F15', 'F16'],
      narrative: '13 centros nodales estratégicamente ubicados en todo Paraguay (Asunción Z1, Limpio Z4, CDE Z5, Encarnación Z12, Oviedo Z6, etc.). Gestionan inventarios con lógica FIFO/FEFO bajo estricta cadena de frío.',
      responsables: 'Jefaturas de CEDI y Supervisores de Despacho',
      subprocesos: ['Recepción de camiones térmicos desde Campo 9', 'Almacenamiento en cámaras frigoríficas', 'Cross-docking y preparación de pedidos', 'Clasificación de devoluciones (F15/F16)']
    },
    {
      id: 10,
      name: '65 Distribuidores Mayoristas',
      subtitle: '5 Mayoristas por cada CEDI',
      category: 'salida',
      type: 'Mayorista',
      domain: 'Logística de Salida / Distribución',
      x: 875,
      y: 185,
      width: 165,
      height: 130,
      color: '#6366f1', // Indigo Vibrant
      glowColor: 'rgba(99, 102, 241, 0.4)',
      icon: Truck,
      stats: { stock: '215,000 u.', merma: '1.2%', otif: '96.5%', temp: '4.0°C', capacidad: '300k u.' },
      flujos: ['F06', 'F07', 'F10', 'F11', 'F12', 'F14', 'F15'],
      narrative: 'Eslabón clave de capilaridad comercial. 65 empresas distribuidoras zonificadas que compran al por mayor y entregan con camiones furgón refrigerados a miles de puntos de venta en su área geográfica asignada.',
      responsables: 'Empresas Distribuidoras Autorizadas y Vendedores Zonales',
      subprocesos: ['Recepción y control de lote en muelle CEDI', 'Carga en furgones térmicos con datalogger', 'Facturación y entrega a comercios', 'Consolidación de productos devueltos por PDV']
    },
    {
      id: 11,
      name: 'Puntos de Venta (PDV)',
      subtitle: '5 Canales Minoristas Capilares',
      category: 'salida',
      type: 'PDV',
      domain: 'Logística de Salida / Distribución Capilar',
      x: 1080,
      y: 185,
      width: 160,
      height: 130,
      color: '#8b5cf6', // Violet
      glowColor: 'rgba(139, 92, 246, 0.4)',
      icon: Store,
      stats: { stock: '180,000 u.', merma: '1.8%', otif: '95.8%', temp: '4.5°C', capacidad: '250k u.' },
      flujos: ['F07', 'F08', 'F09', 'F10', 'F11', 'F12', 'F13', 'F14'],
      narrative: 'La vitrina ante el consumidor: Supermercados, Autoservicios, Despensas barriales, Panaderías e Institucionales. Exponen el producto en góndolas refrigeradas o a temperatura ambiente según corresponda (UHT vs Yogures/Quesos).',
      responsables: 'Encargados de Salón, Repositores y Cajeros',
      subprocesos: ['Recepción de mercadería y control de fecha', 'Rotación en góndola (primero en vencer, primero en salir)', 'Cobro y entrega al consumidor', 'Recepción de reclamos de clientes']
    },
    {
      id: 12,
      name: 'Consumidor Final',
      subtitle: 'Hogares y Mercado Paraguayo',
      category: 'salida',
      type: 'Consumidor',
      domain: 'Consumo Masivo / Mercado',
      x: 1280,
      y: 195,
      width: 135,
      height: 110,
      color: '#a855f7', // Purple
      glowColor: 'rgba(168, 85, 247, 0.4)',
      icon: Users,
      stats: { stock: 'En Consumo', merma: '0.2%', otif: '99.9%', temp: '4.0°C', capacidad: 'N/A' },
      flujos: ['F08', 'F09', 'F13'],
      narrative: 'Destino final de la leche y derivados Lactolanda. Si detecta un defecto organoléptico o daño en el envase, activa el flujo de Logística Inversa acudiendo al PDV con su ticket de compra para reemplazo.',
      responsables: 'Comprador Familiar / Usuario Final',
      subprocesos: ['Compra en punto de venta', 'Almacenamiento en heladera familiar', 'Consumo del producto', 'Eventual reclamo por garantía de calidad']
    },
    // Nodos de Disposición Final Inversa (Debajo de Campo 9 y CEDI)
    {
      id: 98,
      name: 'Destrucción / Efluentes',
      subtitle: 'Biológico & Ecológico',
      category: 'inversa',
      type: 'Efluente',
      domain: 'Logística Inversa / Disposición Final',
      x: 440,
      y: 400,
      width: 155,
      height: 90,
      color: '#ef4444', // Red Alert
      glowColor: 'rgba(239, 68, 68, 0.5)',
      icon: Flame,
      stats: { stock: '0 L (Procesado)', merma: '100%', otif: '100%', temp: 'Ambiente', capacidad: '50k L/día' },
      flujos: ['F16'],
      narrative: 'Destino mandatario para lotes vencidos, cortados o microbiológicamente no aptos. En Planta Campo 9 son vertidos en piletas de tratamiento biológico de efluentes, cumpliendo normativas ambientales del MADES.',
      responsables: 'Departamento de Medio Ambiente y Tratamiento de Aguas',
      subprocesos: ['Apertura y vaciado de envases dañados', 'Digestión anaeróbica y clarificación', 'Control de DBO y DQO de efluentes', 'Reciclado de cartón Tetra Pak']
    },
    {
      id: 99,
      name: 'Reutilización / Re-empaque',
      subtitle: 'Recuperación Calificada',
      category: 'inversa',
      type: 'Re-empaque',
      domain: 'Logística Inversa / Recuperación de Valor',
      x: 615,
      y: 400,
      width: 165,
      height: 90,
      color: '#f59e0b', // Amber
      glowColor: 'rgba(245, 158, 11, 0.5)',
      icon: Recycle,
      stats: { stock: '12,500 u./mes', merma: 'Recup: 94%', otif: '98.5%', temp: '3.0°C', capacidad: '30k u.' },
      flujos: ['F16'],
      narrative: 'Aplica a productos con avería puramente secundaria (caja de cartón exterior rota pero envase primario aséptico intacto). Se re-empaquetan o se desvían a consumo institucional bajo auditoría de calidad.',
      responsables: 'Sector de Reacondicionamiento y Control de Calidad',
      subprocesos: ['Inspección visual y test hermético', 'Cambio de embalaje secundario corrugado', 'Nuevo rotulado de control', 'Reincorporación a stock disponible CEDI']
    }
  ];

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;

  // Layer filtering logic
  const isNodeDimmed = (category: string, nodeId: number) => {
    if (selectedLayer === 'all') return false;
    if (selectedLayer === 'entrada') {
      return nodeId !== 1 && nodeId !== 2 && nodeId !== 4;
    }
    if (selectedLayer === 'intralogistica') {
      return nodeId !== 4 && nodeId !== 6;
    }
    if (selectedLayer === 'salida') {
      return nodeId !== 6 && nodeId !== 10 && nodeId !== 11 && nodeId !== 12;
    }
    if (selectedLayer === 'inversa') {
      return nodeId === 1 || nodeId === 2; // Tambos y acopiadores se atenúan en inversa
    }
    return false;
  };

  const isDirectFlowDimmed = () => {
    return selectedLayer === 'inversa';
  };

  const isReverseFlowHighlighted = () => {
    return selectedLayer === 'inversa' || selectedLayer === 'all';
  };

  // Speed multiplier for CSS animation duration
  const animDurationDirect = animationSpeed === 'fast' ? '1.5s' : '3s';
  const animDurationReverse = animationSpeed === 'fast' ? '1.8s' : '3.6s';

  const selectedFlowDetail = selectedFlowId 
    ? FLUJOS_TABLA_DATA.find((f) => f.id_flujo === selectedFlowId) 
    : null;

  return (
    <div className="flex-1 flex flex-col xl:flex-row overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Inline styles for SVG Neon and flowing animations */}
      <style>{`
        @keyframes flowForward {
          from {
            stroke-dashoffset: 40;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes flowReverse {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 50;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
        }
        .animated-flow-direct {
          animation: flowForward ${animDurationDirect} linear infinite;
        }
        .animated-flow-reverse {
          animation: flowReverse ${animDurationReverse} linear infinite;
        }
        .paused-animation {
          animation-play-state: paused !important;
        }
        .node-card:hover {
          filter: drop-shadow(0 0 12px currentColor);
          cursor: pointer;
        }
      `}</style>

      {/* Main Command Center Canvas (Lado Izquierdo - ~70% de la pantalla) */}
      <div className="flex-1 flex flex-col min-w-0 p-3.5 overflow-y-auto bg-radial from-slate-900 via-slate-950 to-black border-r border-slate-800/80">
        
        {/* Top Command Bar & "Selector de Capas" (Interruptor de las 4 Logísticas) */}
        <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 shadow-xl mb-3 flex flex-wrap items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-inner">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-white tracking-wide uppercase">
                  Lienzo de Red TGS
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Command Center
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Lactolanda • Control Dinámico de Flujos Directos e Inversos
              </p>
            </div>
          </div>

          {/* Layer Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
            <button
              id="layer-all"
              onClick={() => { setSelectedLayer('all'); setSelectedNodeId(null); }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedLayer === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Cadena Completa
            </button>

            <button
              id="layer-entrada"
              onClick={() => { setSelectedLayer('entrada'); setSelectedNodeId(1); }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedLayer === 'entrada'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30 ring-1 ring-sky-400'
                  : 'text-slate-400 hover:text-sky-300 hover:bg-slate-900'
              }`}
            >
              <Milk className="w-3 h-3 text-sky-400" />
              1. Entrada (Aprovisionamiento)
            </button>

            <button
              id="layer-intralogistica"
              onClick={() => { setSelectedLayer('intralogistica'); setSelectedNodeId(4); }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedLayer === 'intralogistica'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-900'
              }`}
            >
              <Factory className="w-3 h-3 text-emerald-400" />
              2. Intralogística (Planta & CEDIs)
            </button>

            <button
              id="layer-salida"
              onClick={() => { setSelectedLayer('salida'); setSelectedNodeId(10); }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedLayer === 'salida'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-indigo-400'
                  : 'text-slate-400 hover:text-indigo-300 hover:bg-slate-900'
              }`}
            >
              <Truck className="w-3 h-3 text-indigo-400" />
              3. Salida (Distribución)
            </button>

            <button
              id="layer-inversa"
              onClick={() => { setSelectedLayer('inversa'); setSelectedNodeId(98); }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedLayer === 'inversa'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/40 ring-1 ring-rose-400 animate-pulse'
                  : 'text-rose-400 hover:text-white hover:bg-rose-950/40 border border-rose-900/60'
              }`}
            >
              <RotateCcw className="w-3 h-3 text-rose-400" />
              4. Inversa (Devoluciones F09-F16)
            </button>
          </div>

          {/* Interactive Playback & Speed Controls */}
          <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
            <button
              onClick={() => setIsAnimationRunning(!isAnimationRunning)}
              title={isAnimationRunning ? "Pausar animación de flujo" : "Reanudar animación"}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {isAnimationRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            <button
              onClick={() => setAnimationSpeed(animationSpeed === 'normal' ? 'fast' : 'normal')}
              title="Cambiar velocidad de flujo"
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Vel: <span className="font-bold text-sky-400">{animationSpeed === 'normal' ? '1x' : '2x'}</span>
            </button>

            {selectedNodeId !== null && (
              <button
                onClick={() => setSelectedNodeId(null)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3 text-slate-400" />
                Deseleccionar
              </button>
            )}
          </div>
        </div>

        {/* Informative Layer Banner / Guidance */}
        <div className={`p-2.5 rounded-xl mb-3 flex items-center justify-between text-xs transition-all border ${
          selectedLayer === 'inversa'
            ? 'bg-rose-950/40 border-rose-700/60 text-rose-200'
            : selectedLayer === 'entrada'
            ? 'bg-sky-950/40 border-sky-700/60 text-sky-200'
            : selectedLayer === 'intralogistica'
            ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
            : selectedLayer === 'salida'
            ? 'bg-indigo-950/40 border-indigo-700/60 text-indigo-200'
            : 'bg-slate-900/60 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-sky-400" />
            <span>
              {selectedLayer === 'all' && (
                <><strong>Cadena de Suministro Completa:</strong> Flujos directos continuos (azul/índigo) de izquierda a derecha y flujos de retorno inverso (verde/rojo) en bucle.</>
              )}
              {selectedLayer === 'entrada' && (
                <><strong>1. Logística de Entrada:</strong> Aprovisionamiento de 416,000 L/día de leche cruda desde 125 Tambos y 5 Acopiadores hacia los Silos de Campo 9 (F01-F02).</>
              )}
              {selectedLayer === 'intralogistica' && (
                <><strong>2. Logística Interna:</strong> Transformación UHT en Planta Campo 9 y reabastecimiento programado a los 13 CEDI&apos;S propios bajo control de stock Lactolanda (F03-F05).</>
              )}
              {selectedLayer === 'salida' && (
                <><strong>3. Logística de Salida:</strong> Distribución capilar desde los 13 CEDIs hacia los 65 Mayoristas y miles de Puntos de Venta (PDV) hasta el Consumidor Final (F06-F08).</>
              )}
              {selectedLayer === 'inversa' && (
                <><strong>4. Logística Inversa (Devoluciones):</strong> Flujos directos atenuados. Rutas de retorno activas: del Consumidor/PDV hacia el CEDI y reingreso a Campo 9 para <em>Destrucción en Efluentes</em> o <em>Reutilización</em> (F09-F16).</>
              )}
            </span>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-[11px]">
            <span className="hidden sm:inline text-slate-400">Interactividad:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
              Haz clic en cualquier nodo o flecha
            </span>
          </div>
        </div>

        {/* High-End Inline SVG Canvas Container */}
        <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl border border-slate-800 shadow-2xl p-3 flex flex-col relative overflow-hidden min-h-[480px]">
          
          {/* Subtle Tech Grid Pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20" 
            style={{
              backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#6366f1 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              backgroundPosition: '0 0, 16px 16px'
            }} 
          />

          <svg
            viewBox="0 0 1440 520"
            className={`w-full h-full min-w-[1100px] select-none z-10 ${isAnimationRunning ? '' : 'paused-animation'}`}
          >
            <defs>
              {/* Neon Glow Filters */}
              <filter id="neon-glow-direct" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="neon-glow-reverse" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="card-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.8" />
              </filter>

              {/* Direct Markers */}
              <marker id="arrow-direct-cyan" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 9 3.5, 0 7" fill="#38bdf8" />
              </marker>
              <marker id="arrow-direct-green" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 9 3.5, 0 7" fill="#10b981" />
              </marker>
              <marker id="arrow-direct-indigo" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 9 3.5, 0 7" fill="#6366f1" />
              </marker>
              <marker id="arrow-direct-dimmed" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 9 3.5, 0 7" fill="#334155" />
              </marker>

              {/* Reverse Markers */}
              <marker id="arrow-reverse-red" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                <polygon points="0 0, 10 4, 0 8" fill="#ef4444" />
              </marker>
              <marker id="arrow-reverse-amber" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                <polygon points="0 0, 10 4, 0 8" fill="#f59e0b" />
              </marker>

              {/* Gradients */}
              <linearGradient id="grad-plant-card" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>

              <linearGradient id="grad-node-card" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <linearGradient id="grad-return-dest" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#450a0a" />
                <stop offset="100%" stopColor="#1c1917" />
              </linearGradient>
            </defs>

            {/* Macro Domains Group Backgrounds */}
            <g id="macro-zones" opacity={0.65}>
              {/* 1. Cadena de Entrada / Aprovisionamiento */}
              <rect
                x="30"
                y="55"
                width="390"
                height="280"
                rx="16"
                fill="#032541"
                fillOpacity="0.25"
                stroke="#0284c7"
                strokeWidth="1.2"
                strokeDasharray="6 4"
                opacity={selectedLayer === 'all' || selectedLayer === 'entrada' ? 1 : 0.15}
              />
              <text x="50" y="82" fill="#38bdf8" fontSize="11" fontWeight="800" letterSpacing="0.08em" className="font-mono">
                1. APROVISIONAMIENTO (ENTRADA)
              </text>
              <text x="50" y="98" fill="#94a3b8" fontSize="9.5">
                125 Tambos • 5 Acopiadores Zonales • Cisternas Refrigeradas (F01-F02)
              </text>

              {/* 2. Intralogística / Producción & CEDIs */}
              <rect
                x="435"
                y="55"
                width="410"
                height="280"
                rx="16"
                fill="#062e24"
                fillOpacity="0.25"
                stroke="#10b981"
                strokeWidth="1.2"
                strokeDasharray="6 4"
                opacity={selectedLayer === 'all' || selectedLayer === 'intralogistica' ? 1 : 0.15}
              />
              <text x="455" y="82" fill="#34d399" fontSize="11" fontWeight="800" letterSpacing="0.08em" className="font-mono">
                2. INTRALOGÍSTICA & CONTROL LACTOLANDA
              </text>
              <text x="455" y="98" fill="#94a3b8" fontSize="9.5">
                Planta J.E. Estigarribia (Campo 9) • 13 CEDI&apos;S Regionales Propios (F03-F05)
              </text>

              {/* 3. Distribución Capilar */}
              <rect
                x="860"
                y="55"
                width="565"
                height="280"
                rx="16"
                fill="#1e1b4b"
                fillOpacity="0.25"
                stroke="#6366f1"
                strokeWidth="1.2"
                strokeDasharray="6 4"
                opacity={selectedLayer === 'all' || selectedLayer === 'salida' ? 1 : 0.15}
              />
              <text x="880" y="82" fill="#818cf8" fontSize="11" fontWeight="800" letterSpacing="0.08em" className="font-mono">
                3. DISTRIBUCIÓN & MERCADO CAPILAR (SALIDA)
              </text>
              <text x="880" y="98" fill="#94a3b8" fontSize="9.5">
                65 Mayoristas • Puntos de Venta (PDV) • Consumidor Final (F06-F08)
              </text>

              {/* Zona Inferior: Disposición Inversa */}
              <rect
                x="425"
                y="355"
                width="370"
                height="150"
                rx="14"
                fill="#450a0a"
                fillOpacity="0.2"
                stroke="#f43f5e"
                strokeWidth="1.2"
                strokeDasharray="5 3"
                opacity={isReverseFlowHighlighted() ? 0.9 : 0.1}
              />
              <text x="445" y="380" fill="#fb7185" fontSize="10.5" fontWeight="800" letterSpacing="0.08em" className="font-mono">
                ZONA DE DISPOSICIÓN FINAL INVERSA (PLANTA CAMPO 9)
              </text>
            </g>

            {/* DIRECT FLOWS (F01 - F08) WITH ANIMATED NEON EFFECT */}
            <g id="direct-flows" opacity={isDirectFlowDimmed() ? 0.12 : 1}>
              {/* F01: Tambos -> Acopiadores */}
              <path d="M 205 250 L 250 250" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              <path
                d="M 205 250 L 250 250"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeDasharray="8, 8"
                fill="none"
                className="animated-flow-direct"
                filter="url(#neon-glow-direct)"
                markerEnd="url(#arrow-direct-cyan)"
              />
              <g transform="translate(210, 226)">
                <rect width="35" height="18" rx="4" fill="#0369a1" />
                <text x="17.5" y="13" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="font-mono">F01</text>
              </g>

              {/* F02: Acopiadores -> Planta Campo 9 */}
              <path d="M 405 250 L 450 250" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              <path
                d="M 405 250 L 450 250"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeDasharray="8, 8"
                fill="none"
                className="animated-flow-direct"
                filter="url(#neon-glow-direct)"
                markerEnd="url(#arrow-direct-cyan)"
              />
              <g transform="translate(410, 226)">
                <rect width="35" height="18" rx="4" fill="#0284c7" />
                <text x="17.5" y="13" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="font-mono">F02</text>
              </g>

              {/* F05: Planta Campo 9 -> 13 CEDIs */}
              <path d="M 625 250 L 670 250" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              <path
                d="M 625 250 L 670 250"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="8, 8"
                fill="none"
                className="animated-flow-direct"
                filter="url(#neon-glow-direct)"
                markerEnd="url(#arrow-direct-green)"
              />
              <g transform="translate(630, 226)">
                <rect width="35" height="18" rx="4" fill="#047857" />
                <text x="17.5" y="13" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="font-mono">F05</text>
              </g>

              {/* F06: 13 CEDIs -> 65 Mayoristas */}
              <path d="M 830 250 L 875 250" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              <path
                d="M 830 250 L 875 250"
                stroke="#6366f1"
                strokeWidth="4"
                strokeDasharray="8, 8"
                fill="none"
                className="animated-flow-direct"
                filter="url(#neon-glow-direct)"
                markerEnd="url(#arrow-direct-indigo)"
              />
              <g transform="translate(835, 226)">
                <rect width="35" height="18" rx="4" fill="#4338ca" />
                <text x="17.5" y="13" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="font-mono">F06</text>
              </g>

              {/* F07: 65 Mayoristas -> Puntos de Venta (PDV) */}
              <path d="M 1040 250 L 1080 250" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              <path
                d="M 1040 250 L 1080 250"
                stroke="#8b5cf6"
                strokeWidth="4"
                strokeDasharray="8, 8"
                fill="none"
                className="animated-flow-direct"
                filter="url(#neon-glow-direct)"
                markerEnd="url(#arrow-direct-indigo)"
              />
              <g transform="translate(1043, 226)">
                <rect width="35" height="18" rx="4" fill="#6d28d9" />
                <text x="17.5" y="13" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="font-mono">F07</text>
              </g>

              {/* F08: PDV -> Consumidor Final */}
              <path d="M 1240 250 L 1280 250" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              <path
                d="M 1240 250 L 1280 250"
                stroke="#a855f7"
                strokeWidth="4"
                strokeDasharray="8, 8"
                fill="none"
                className="animated-flow-direct"
                filter="url(#neon-glow-direct)"
                markerEnd="url(#arrow-direct-indigo)"
              />
              <g transform="translate(1243, 226)">
                <rect width="35" height="18" rx="4" fill="#7e22ce" />
                <text x="17.5" y="13" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="font-mono">F08</text>
              </g>
            </g>

            {/* REVERSE LOGISTICS RETURN ARROWS (F09 - F16) WITH HIGH CONTRAST NEON RED/AMBER */}
            <g id="reverse-flows" opacity={isReverseFlowHighlighted() ? 1 : 0.2}>
              {/* 1. Consumidor -> PDV (F09 / F13: Reclamo o Devolución por Consumidor) */}
              <path
                d="M 1320 305 C 1300 370, 1200 370, 1170 315"
                fill="none"
                stroke="#334155"
                strokeWidth="5"
              />
              <path
                id="reverse-c-pdv"
                d="M 1320 305 C 1300 370, 1200 370, 1170 315"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="3.5"
                strokeDasharray="10, 12"
                className="animated-flow-reverse"
                filter="url(#neon-glow-reverse)"
                markerEnd="url(#arrow-reverse-red)"
              />
              <g transform="translate(1205, 360)">
                <rect width="65" height="18" rx="4" fill="#9f1239" />
                <text x="32.5" y="13" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-mono">F09 / F13</text>
              </g>

              {/* 2. PDV -> Mayoristas (F10 / F11 / F12 / F14: Retiro de Lote Averiado o Vencido) */}
              <path
                d="M 1110 315 C 1080 380, 980 380, 950 315"
                fill="none"
                stroke="#334155"
                strokeWidth="5"
              />
              <path
                id="reverse-pdv-may"
                d="M 1110 315 C 1080 380, 980 380, 950 315"
                fill="none"
                stroke="#fb7185"
                strokeWidth="3.5"
                strokeDasharray="10, 12"
                className="animated-flow-reverse"
                filter="url(#neon-glow-reverse)"
                markerEnd="url(#arrow-reverse-red)"
              />
              <g transform="translate(995, 370)">
                <rect width="70" height="18" rx="4" fill="#be123c" />
                <text x="35" y="13" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-mono">F10 - F14</text>
              </g>

              {/* 3. Mayoristas -> CEDI (F15: Reingreso de Devolución a la Intralogística de Lactolanda) */}
              <path
                d="M 900 315 C 870 390, 780 390, 750 315"
                fill="none"
                stroke="#334155"
                strokeWidth="5"
              />
              <path
                id="reverse-may-cedi"
                d="M 900 315 C 870 390, 780 390, 750 315"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray="10, 12"
                className="animated-flow-reverse"
                filter="url(#neon-glow-reverse)"
                markerEnd="url(#arrow-reverse-amber)"
              />
              <g transform="translate(795, 380)">
                <rect width="52" height="18" rx="4" fill="#b45309" />
                <text x="26" y="13" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="font-mono">F15</text>
              </g>

              {/* 4. CEDI -> Planta Campo 9 (F16: Transferencia de Lote Retornado a Campo 9) */}
              <path
                d="M 700 315 C 660 410, 580 410, 550 330"
                fill="none"
                stroke="#334155"
                strokeWidth="5"
              />
              <path
                id="reverse-cedi-planta"
                d="M 700 315 C 660 410, 580 410, 550 330"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray="10, 12"
                className="animated-flow-reverse"
                filter="url(#neon-glow-reverse)"
                markerEnd="url(#arrow-reverse-amber)"
              />
              <g transform="translate(605, 395)">
                <rect width="52" height="18" rx="4" fill="#d97706" />
                <text x="26" y="13" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="font-mono">F16</text>
              </g>

              {/* Subflujos hacia los nodos de disposición final en Campo 9 */}
              {/* Hacia Destrucción (Efluentes) */}
              <path
                d="M 520 330 L 515 400"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                fill="none"
                markerEnd="url(#arrow-reverse-red)"
              />
              {/* Hacia Reutilización */}
              <path
                d="M 580 330 L 650 400"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                fill="none"
                markerEnd="url(#arrow-reverse-amber)"
              />
            </g>

            {/* INTERACTIVE NODES (BOTONES INTERACTIVOS CON MICRO-INTERACCIONES Y GLOW) */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isDimmed = isNodeDimmed(node.category, node.id);

              return (
                <g
                  key={node.id}
                  id={`node-group-${node.id}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer transition-all duration-300"
                  opacity={isDimmed ? 0.18 : 1}
                  transform={isSelected ? `translate(0, -4)` : undefined}
                >
                  {/* Selection Pulsing Ring */}
                  {isSelected && (
                    <rect
                      x={node.x - 7}
                      y={node.y - 7}
                      width={node.width + 14}
                      height={node.height + 14}
                      rx="18"
                      fill="none"
                      stroke={node.color}
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      className="animated-flow-direct"
                    />
                  )}

                  {/* Node Background Body */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx="14"
                    fill={node.id === 4 ? 'url(#grad-plant-card)' : node.id >= 98 ? 'url(#grad-return-dest)' : 'url(#grad-node-card)'}
                    stroke={isSelected ? node.color : node.id === 4 ? '#059669' : node.id >= 98 ? '#f43f5e' : '#334155'}
                    strokeWidth={isSelected ? '2.5' : '1.2'}
                    filter={isSelected ? `drop-shadow(0 0 16px ${node.glowColor})` : 'url(#card-glow)'}
                  />

                  {/* Top Color Accent Line */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height="5"
                    rx="2.5"
                    fill={node.color}
                  />

                  {/* Node Title & Subtitle */}
                  <text
                    x={node.x + 12}
                    y={node.y + 24}
                    fill="#ffffff"
                    fontSize="11.5"
                    fontWeight="800"
                    letterSpacing="0.01em"
                  >
                    {node.name}
                  </text>

                  <text
                    x={node.x + 12}
                    y={node.y + 39}
                    fill="#94a3b8"
                    fontSize="9"
                    fontWeight="500"
                  >
                    {node.subtitle}
                  </text>

                  {/* Node Internal Divider */}
                  <line
                    x1={node.x + 10}
                    y1={node.y + 46}
                    x2={node.x + node.width - 10}
                    y2={node.y + 46}
                    stroke="#334155"
                    strokeWidth="1"
                  />

                  {/* Quick Metrics inside Node */}
                  {node.id < 98 ? (
                    <>
                      <text x={node.x + 12} y={node.y + 63} fill="#cbd5e1" fontSize="9" className="font-mono">
                        Stock: <tspan fill="#ffffff" fontWeight="bold">{node.stats.stock}</tspan>
                      </text>
                      <text x={node.x + 12} y={node.y + 78} fill="#cbd5e1" fontSize="9" className="font-mono">
                        Mermas: <tspan fill={node.stats.merma.includes('100') ? '#ef4444' : '#f59e0b'} fontWeight="bold">{node.stats.merma}</tspan>
                      </text>
                      <text x={node.x + 12} y={node.y + 93} fill="#cbd5e1" fontSize="9" className="font-mono">
                        OTIF: <tspan fill="#34d399" fontWeight="bold">{node.stats.otif}</tspan>
                      </text>
                      <text x={node.x + 12} y={node.y + 108} fill="#94a3b8" fontSize="8.5" className="font-mono">
                        Temp: <tspan fill="#38bdf8">{node.stats.temp}</tspan>
                      </text>
                    </>
                  ) : (
                    <>
                      <text x={node.x + 12} y={node.y + 65} fill="#fca5a5" fontSize="9" className="font-mono">
                        Destino: <tspan fill="#ffffff" fontWeight="bold">{node.id === 98 ? 'Biodigestión' : 'Re-rotulado'}</tspan>
                      </text>
                      <text x={node.x + 12} y={node.y + 80} fill="#fecdd3" fontSize="8.5" className="font-mono">
                        Auditoría: <tspan fill="#34d399">Conforme ISO 22000</tspan>
                      </text>
                    </>
                  )}

                  {/* Mini Info Badge */}
                  <circle
                    cx={node.x + node.width - 16}
                    cy={node.y + 20}
                    r="8"
                    fill="#1e293b"
                    stroke={node.color}
                    strokeWidth="1"
                  />
                  <text
                    x={node.x + node.width - 16}
                    y={node.y + 23}
                    fill={node.color}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    i
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Flow Legend & Screen Shortcuts Bar Below SVG */}
          <div className="mt-2 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono select-none">
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-sky-400 rounded-full inline-block shadow-[0_0_8px_#38bdf8]" />
                Flujo Entrada (F01-F02)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-emerald-400 rounded-full inline-block shadow-[0_0_8px_#10b981]" />
                Intralogística (F03-F05)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-indigo-400 rounded-full inline-block shadow-[0_0_8px_#6366f1]" />
                Salida Directa (F06-F08)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-rose-500 rounded-full inline-block shadow-[0_0_8px_#ef4444]" />
                Retorno Inverso (F09-F16)
              </span>
            </div>

            <div className="flex items-center gap-2 font-sans">
              <button
                onClick={() => onNavigateScreen(2)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Trazabilidad Lote</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigateScreen(3)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Ver 13 CEDIs</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigateScreen(4)}
                className="px-2.5 py-1 rounded bg-rose-950/70 hover:bg-rose-900/80 border border-rose-800/80 text-rose-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-rose-400" />
                <span>Simular Devolución</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time Stock Movement Feed (TRANS_INVENTARIO) */}
        <div className="h-44 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl shadow-xl flex flex-col mt-3 shrink-0 overflow-hidden">
          <div className="px-3 py-1.5 bg-slate-950/90 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center justify-between select-none">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Telemetría en Vivo: Movimientos de Stock (TRANS_INVENTARIO)
            </span>
            <span className="text-slate-500 font-mono">Frecuencia: Tiempo Real (Transaccional)</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px] sticky top-0 font-mono">
                <tr>
                  <th className="px-3 py-1.5">ID_MOV</th>
                  <th className="px-3 py-1.5">FLUJO</th>
                  <th className="px-3 py-1.5">LOTE</th>
                  <th className="px-3 py-1.5">ORIGEN</th>
                  <th className="px-3 py-1.5">DESTINO</th>
                  <th className="px-3 py-1.5 text-right">VOLUMEN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                {INITIAL_TRANS_INVENTARIO.slice(0, 7).map((mov) => (
                  <tr key={mov.id_movimiento} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-3 py-1 text-slate-200 font-semibold">MOV-{mov.id_movimiento}</td>
                    <td className="px-3 py-1">
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        mov.id_flujo_asociado.startsWith('F09') || mov.id_flujo_asociado.startsWith('F1')
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        {mov.id_flujo_asociado}
                      </span>
                    </td>
                    <td className="px-3 py-1 text-slate-400">{mov.fk_lote}</td>
                    <td className="px-3 py-1 text-slate-300 font-sans truncate max-w-[140px]">{mov.nombre_origen}</td>
                    <td className="px-3 py-1 text-slate-300 font-sans truncate max-w-[140px]">{mov.nombre_destino}</td>
                    <td className="px-3 py-1 text-right font-bold text-white">
                      {mov.cantidad.toLocaleString()} {mov.unidad}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Storytelling Panel (Lado Derecho - ~30% de la pantalla) */}
      <div className="w-full xl:w-96 bg-slate-900/90 backdrop-blur-xl border-l border-slate-800 p-4 flex flex-col shrink-0 overflow-y-auto select-none">
        
        {/* Storytelling Mode Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
              Panel de Storytelling
            </span>
          </div>
          {selectedNode ? (
            <button
              onClick={() => setSelectedNodeId(null)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
            >
              <ArrowLeft className="w-3 h-3" />
              Visión General
            </button>
          ) : (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              Modo Directorio
            </span>
          )}
        </div>

        {/* Content switch: Either Node Details OR Executive Summary of Value Chain */}
        {selectedNode ? (
          /* NODO SELECCIONADO: DETALLE OPERATIVO Y STORYTELLING */
          <div className="space-y-3.5 mt-3 animate-fadeIn">
            {/* Header Card with Glassmorphism */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-lg relative overflow-hidden">
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20"
                style={{ backgroundColor: selectedNode.color }}
              />
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-slate-300">
                  {selectedNode.type}
                </span>
                <span className="text-[10px] font-mono text-slate-400">ID: N-{selectedNode.id}</span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-1">{selectedNode.name}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{selectedNode.subtitle}</p>

              <div className="mt-2.5 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-mono uppercase text-slate-400">Dominio Logístico</div>
                  <div className="text-xs font-bold text-sky-300 mt-0.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: selectedNode.color }} />
                    {selectedNode.domain}
                  </div>
                </div>
              </div>
            </div>

            {/* Realistic KPIs Grid */}
            <div>
              <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Gauge className="w-3 h-3 text-sky-400" />
                <span>Indicadores Clave (KPIs en Tiempo Real)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <div className="text-[9px] text-slate-400 uppercase">Stock / Capacidad</div>
                  <div className="text-xs font-bold text-white mt-0.5">{selectedNode.stats.stock}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Cap: {selectedNode.stats.capacidad}</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <div className="text-[9px] text-slate-400 uppercase">Temperatura Crítica</div>
                  <div className="text-xs font-bold text-sky-300 mt-0.5 flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-sky-400" />
                    {selectedNode.stats.temp}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Norma: &lt; 4.0°C</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <div className="text-[9px] text-slate-400 uppercase">Índice Mermas</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">{selectedNode.stats.merma}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Umbral máx: 1.5%</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <div className="text-[9px] text-slate-400 uppercase">Eficiencia OTIF</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{selectedNode.stats.otif}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Meta: &gt; 97.0%</div>
                </div>
              </div>
            </div>

            {/* Storytelling Narrative Box (Explicación para Directorio) */}
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-[10px] font-bold font-mono text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Proceso Detallado (Narrativa de Presentación)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.narrative}
              </p>
              <div className="mt-2 pt-2 border-t border-slate-700/40 text-[10px] font-mono text-slate-400">
                <span className="text-slate-500 uppercase">Responsables: </span>
                <span className="text-slate-300">{selectedNode.responsables}</span>
              </div>
            </div>

            {/* Subprocesos Operativos */}
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider mb-2">
                Secuencia de Tareas en este Nodo:
              </div>
              <ul className="space-y-1.5">
                {selectedNode.subprocesos.map((tarea, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-4 h-4 rounded bg-slate-700 text-sky-400 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tarea}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flujos Transaccionales Vinculados */}
            <div>
              <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Flujos Transaccionales Asociados:</span>
                <span className="text-sky-400">{selectedNode.flujos.length} Registros</span>
              </div>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {selectedNode.flujos.map((flujoId) => {
                  const flujo = FLUJOS_TABLA_DATA.find((f) => f.id_flujo === flujoId);
                  if (!flujo) return null;
                  const isReverse = flujo.tipo_logistica === 'Inversa';

                  return (
                    <div
                      key={flujo.id_flujo}
                      onClick={() => setSelectedFlowId(selectedFlowId === flujo.id_flujo ? null : flujo.id_flujo)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                        selectedFlowId === flujo.id_flujo
                          ? 'border-sky-500 bg-sky-950/50 ring-1 ring-sky-400'
                          : isReverse
                          ? 'border-rose-900/60 bg-rose-950/20 hover:bg-rose-900/30'
                          : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`px-1.5 py-0.2 rounded font-mono font-bold text-[10px] ${
                          isReverse ? 'bg-rose-600 text-white' : 'bg-sky-600 text-white'
                        }`}>
                          {flujo.id_flujo}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {flujo.tipo_logistica}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-200 truncate mt-1">
                        {flujo.motivo_o_recurso}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5 truncate">
                        {flujo.area_origen} → {flujo.area_destino}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal / Card de Detalle de Flujo Seleccionado */}
            {selectedFlowDetail && (
              <div className="p-3 rounded-xl bg-sky-950 border border-sky-600 text-xs shadow-xl animate-fadeIn">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold font-mono text-sky-300">
                    Ficha Técnica: {selectedFlowDetail.id_flujo}
                  </span>
                  <button onClick={() => setSelectedFlowId(null)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed mb-2">
                  {selectedFlowDetail.proceso_a_realizar}
                </p>
                <div className="p-2 rounded bg-black/40 border border-sky-900/60 text-[10px] font-mono space-y-1 text-slate-300">
                  <div><strong className="text-slate-400">Responsable:</strong> {selectedFlowDetail.responsable}</div>
                  <div><strong className="text-slate-400">KPI de Control:</strong> <span className="text-sky-300">{selectedFlowDetail.kpi_control}</span></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SIN NODO SELECCIONADO: RESUMEN EJECUTIVO DE CADENA DE VALOR (STORYTELLING TGS) */
          <div className="space-y-3.5 mt-3 animate-fadeIn">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-800/50 shadow-xl">
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">
                Resumen Ejecutivo Integral
              </span>
              <h3 className="text-base font-extrabold text-white mt-1">
                Ecosistema Logístico Lactolanda
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Operación integrada bajo el enfoque de <strong>Teoría General de Sistemas (TGS)</strong>. Cada eslabón mantiene estricto control de temperatura (2°C a 4°C), trazabilidad unívoca de lote (GS1-128) y recirculación en bucle cerrado.
              </p>
            </div>

            {/* Métricas Macroscópicas */}
            <div className="grid grid-cols-2 gap-2 font-mono">
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-medium">Volumen Diario</div>
                <div className="text-sm font-extrabold text-white mt-0.5">416,000 L</div>
                <div className="text-[9px] text-sky-400">125 Tambos</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-medium">Capacidad CEDIs</div>
                <div className="text-sm font-extrabold text-white mt-0.5">3.8M L</div>
                <div className="text-[9px] text-emerald-400">13 Nodos Propios</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-medium">Red Mayorista</div>
                <div className="text-sm font-extrabold text-white mt-0.5">65 Firmas</div>
                <div className="text-[9px] text-indigo-400">Cobertura Nacional</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-medium">OTIF Promedio</div>
                <div className="text-sm font-extrabold text-emerald-400 mt-0.5">97.8%</div>
                <div className="text-[9px] text-slate-400">Objetivo Cumplido</div>
              </div>
            </div>

            {/* Guía Narrativa de Presentación para el Alumno / Expositor */}
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-[10px] font-bold font-mono text-amber-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Estructura de Defensa Oral (Guía para el Alumno)</span>
              </div>
              <ol className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-sky-900 text-sky-300 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span><strong>Aprovisionamiento:</strong> Explicar cómo los 5 acopiadores enfrían la leche en tambo a &lt; 4°C y trasladan a Campo 9 en cisternas isotérmicas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-emerald-900 text-emerald-300 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span><strong>Intralogística:</strong> Destacar que Lactolanda mantiene la propiedad del stock desde la producción hasta los 13 CEDIs propios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-indigo-900 text-indigo-300 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                  <span><strong>Salida:</strong> Demostrar que los 65 mayoristas garantizan capilaridad en miles de despensas y supermercados de todo el país.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-rose-900 text-rose-300 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                  <span><strong>Inversa:</strong> Resaltar la doble disposición: Destrucción ambiental en efluentes vs Re-empaque de averías leves.</span>
                </li>
              </ol>
            </div>

            {/* Botón de Ayuda / Exploración Rápida */}
            <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-xs text-slate-400 space-y-2">
              <p>💡 <em>Tip de Exposición:</em> Haz clic sobre <strong>"Planta Campo 9"</strong> o <strong>"13 CEDI&apos;S Propios"</strong> en el lienzo para mostrar a la junta los flujos F03 a F16 en tiempo real.</p>
              <button
                onClick={() => setSelectedNodeId(4)}
                className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Explorar Planta Campo 9</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Acciones Rápidas del Pie del Storytelling */}
        <div className="mt-auto pt-3 border-t border-slate-800 space-y-2">
          <div className="text-[9px] font-mono text-slate-500 uppercase">Navegación Rápida a Módulos:</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigateScreen(2)}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors text-center cursor-pointer border border-slate-700/60"
            >
              2. Trazabilidad
            </button>
            <button
              onClick={() => onNavigateScreen(3)}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors text-center cursor-pointer border border-slate-700/60"
            >
              3. Red de 13 CEDIs
            </button>
            <button
              onClick={() => onNavigateScreen(4)}
              className="py-1.5 px-2 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-200 text-xs font-medium transition-colors text-center cursor-pointer"
            >
              4. Logística Inversa
            </button>
            <button
              onClick={() => onNavigateScreen(5)}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors text-center cursor-pointer border border-slate-700/60"
            >
              5. Base de Datos
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
