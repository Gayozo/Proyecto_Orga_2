import React, { useState } from 'react';
import { 
  Truck, 
  Building2, 
  MapPin, 
  Thermometer, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Store, 
  Coffee, 
  ShoppingBag, 
  Search, 
  ChevronRight,
  Map as MapIcon,
  ListFilter,
  UserCheck,
  ShieldCheck,
  RotateCcw,
  Navigation
} from 'lucide-react';
import { CediInfo, MayoristaInfo, PdvChannel, PdvEntregaItem } from '../../types';
import { CEDIS_LIST, MAYORISTAS_DATA } from '../../data/mockData';

interface Screen3Props {
  onNavigateScreen: (screen: number) => void;
}

export const Screen3InventoryDistribution: React.FC<Screen3Props> = ({ onNavigateScreen }) => {
  const [cediViewMode, setCediViewMode] = useState<'map' | 'list'>('map');
  const [selectedCediId, setSelectedCediId] = useState<string>('Z1'); // Default CEDI Asunción
  const [selectedMayoristaId, setSelectedMayoristaId] = useState<string>('Z1-M1');
  const [searchCedi, setSearchCedi] = useState('');
  const [mayoristaSearchQuery, setMayoristaSearchQuery] = useState('');
  const [hoveredCedi, setHoveredCedi] = useState<CediInfo | null>(null);

  // Selected CEDI object
  const activeCedi = CEDIS_LIST.find((c) => c.id === selectedCediId) || CEDIS_LIST[0];

  // Mayoristas for the active CEDI (5 mayoristas)
  const cediMayoristas = MAYORISTAS_DATA.filter((m) => m.id.startsWith(selectedCediId));

  // Active Mayorista
  const activeMayorista = MAYORISTAS_DATA.find((m) => m.id === selectedMayoristaId) 
    || cediMayoristas[0] 
    || MAYORISTAS_DATA[0];

  // Filter CEDIs by search
  const filteredCedis = CEDIS_LIST.filter((cedi) => {
    const matchesSearch = cedi.nombre.toLowerCase().includes(searchCedi.toLowerCase()) ||
                          cedi.ciudad.toLowerCase().includes(searchCedi.toLowerCase()) ||
                          cedi.zona.toLowerCase().includes(searchCedi.toLowerCase());
    return matchesSearch;
  });

  // Filter 65 Mayoristas for global dropdown / selector
  const filteredAllMayoristas = MAYORISTAS_DATA.filter((m) => {
    const q = mayoristaSearchQuery.toLowerCase();
    return m.codigo.toLowerCase().includes(q) ||
           m.nombre.toLowerCase().includes(q) ||
           m.cediAsignado.toLowerCase().includes(q) ||
           m.zona.toLowerCase().includes(q);
  });

  const getChannelIcon = (canal: PdvChannel) => {
    switch (canal) {
      case 'Supermercados':
        return ShoppingBag;
      case 'HORECA':
        return Coffee;
      case 'Tiendas de Conveniencia':
      case 'Autoservicios':
      case 'Despensas':
      default:
        return Store;
    }
  };

  const handleSelectMayorista = (mId: string) => {
    setSelectedMayoristaId(mId);
    const found = MAYORISTAS_DATA.find((m) => m.id === mId);
    if (found) {
      // Find matching CEDI from mayorista id prefix
      const cediPrefix = found.id.split('-')[0];
      const matchCedi = CEDIS_LIST.find((c) => c.id === cediPrefix);
      if (matchCedi) {
        setSelectedCediId(matchCedi.id);
      }
    }
  };

  // Coordinates mapping for Paraguay map SVG (viewBox 0 0 600 650)
  // Scaled and positioned accurately across Paraguay
  const cediMapCoordinates: Record<string, { x: number; y: number }> = {
    Z1: { x: 230, y: 390 },  // Asunción
    Z2: { x: 310, y: 430 },  // Villarrica (Guairá)
    Z3: { x: 375, y: 540 },  // Tomás Romero Pereira (Itapúa Norte)
    Z4: { x: 245, y: 365 },  // Abasto Norte (Limpio)
    Z5: { x: 490, y: 410 },  // Ciudad del Este (Alto Paraná)
    Z6: { x: 330, y: 380 },  // Coronel Oviedo
    Z7: { x: 390, y: 385 },  // Caaguazú (Campo 9 Planta)
    Z8: { x: 300, y: 280 },  // San Estanislao (Santaní)
    Z9: { x: 410, y: 340 },  // Vaquería
    Z10: { x: 265, y: 395 }, // Caacupé (Cordillera)
    Z11: { x: 320, y: 210 }, // Santa Rosa del Aguaray (San Pedro)
    Z12: { x: 330, y: 590 }, // Encarnación (Itapúa Sur)
    Z13: { x: 245, y: 440 }, // Carapeguá (Paraguarí)
  };

  return (
    <div className="flex-1 flex flex-col p-3.5 overflow-y-auto bg-slate-100 select-none">
      {/* Header Banner with Aggregate Network Stats */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs mb-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-blue-700 uppercase tracking-wider mb-0.5">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              Logística de Salida y Distribución Capilar (F06 & F07)
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight font-mono">
              Control de Inventario en 13 CEDI'S y Distribución Capilar con 65 Mayoristas
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Supervisión de stock en cámaras frigoríficas regionales, monitoreo de 65 furgones térmicos y entrega diaria a los 5 PDVs asociados.
            </p>
          </div>

          {/* Network Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-center font-mono">
              <span className="text-blue-700 font-bold block text-xs">3,313,000 L</span>
              <span className="text-slate-500 font-medium text-[9px] uppercase">Stock en 13 CEDI's</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-200 text-center font-mono">
              <span className="text-indigo-700 font-bold block text-xs">65 Mayoristas</span>
              <span className="text-slate-500 font-medium text-[9px] uppercase">Red Capilar</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-center font-mono">
              <span className="text-emerald-700 font-bold block text-xs">97.4% OTIF</span>
              <span className="text-slate-500 font-medium text-[9px] uppercase">Cumplimiento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Left Column (5 cols): Mapa / Lista interactiva de los 13 CEDI's */}
        <div className="xl:col-span-5 bg-white rounded-lg border border-slate-200 p-3 shadow-xs flex flex-col min-h-[580px]">
          {/* Header & View Switcher (Mapa vs Lista) */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Red de 13 CEDI'S Propios de Lactolanda
              </h3>
              <p className="text-[10px] text-slate-500">Haz clic en un CEDI para ver su inventario y mayoristas</p>
            </div>

            {/* View Mode Toggle Button */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded border border-slate-200 text-[10px] font-mono">
              <button
                id="toggle-cedi-view-map"
                onClick={() => setCediViewMode('map')}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-all cursor-pointer ${
                  cediViewMode === 'map'
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3 h-3" />
                <span>Mapa</span>
              </button>
              <button
                id="toggle-cedi-view-list"
                onClick={() => setCediViewMode('list')}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-all cursor-pointer ${
                  cediViewMode === 'list'
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ListFilter className="w-3 h-3" />
                <span>Lista ({filteredCedis.length})</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-2.5">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCedi}
              onChange={(e) => setSearchCedi(e.target.value)}
              placeholder="Buscar por CEDI, ciudad o zona (ej: Asunción, Este, Caaguazú)..."
              className="w-full pl-8 pr-2.5 py-1 rounded border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500 font-mono bg-white"
            />
          </div>

          {/* VIEW 1: MAPA INTERACTIVO DE PARAGUAY */}
          {cediViewMode === 'map' ? (
            <div className="flex-1 flex flex-col relative bg-slate-950 rounded-lg p-2 overflow-hidden border border-slate-800">
              <div className="absolute top-2 left-2 z-10 bg-slate-900/90 backdrop-blur-xs px-2 py-1 rounded border border-slate-700 text-[10px] text-slate-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>13 Nodos Frigoríficos Activos</span>
              </div>

              {/* Hover Tooltip Overlay */}
              {hoveredCedi && (
                <div className="absolute bottom-2 left-2 right-2 z-20 bg-slate-900/95 backdrop-blur-sm border border-blue-500/40 p-2 rounded-lg text-white font-mono text-[11px] shadow-lg flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sky-300 flex items-center gap-1.5">
                      <span className="px-1 py-0.2 rounded bg-blue-600 text-white text-[9px]">{hoveredCedi.id}</span>
                      <span>{hoveredCedi.nombre}</span>
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5">
                      Zona: {hoveredCedi.zona} • Cámara: <strong className="text-sky-200">{hoveredCedi.temperaturaCamara}°C</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400 text-xs">{hoveredCedi.stockActualLitros.toLocaleString()} L</div>
                    <div className="text-[9px] text-slate-400">{hoveredCedi.ocupacionPct}% Capacidad • OTIF {hoveredCedi.otifPct}%</div>
                  </div>
                </div>
              )}

              {/* SVG Map Canvas */}
              <div className="flex-1 flex items-center justify-center relative">
                <svg
                  viewBox="0 0 600 650"
                  className="w-full h-full max-h-[460px] select-none"
                >
                  <defs>
                    {/* Shadow filter for pins */}
                    <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
                    </filter>
                    <linearGradient id="paraguay-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Paraguay Territorial Silhouette Map */}
                  <g id="paraguay-map-shape">
                    {/* Chaco / Occidental */}
                    <path
                      d="M 120 180 L 170 120 L 260 80 L 320 130 L 290 230 L 260 330 L 220 370 L 150 330 L 100 240 Z"
                      fill="#1e293b"
                      stroke="#334155"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <text x="180" y="210" fill="#475569" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.1em">
                      CHACO PARAGUAYO
                    </text>

                    {/* Región Oriental (Core Dairy Operations) */}
                    <path
                      d="M 260 330 L 300 230 L 340 180 L 410 200 L 460 260 L 510 330 L 530 400 L 480 470 L 410 570 L 340 610 L 290 570 L 260 480 L 220 380 Z"
                      fill="#1e293b"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    <text x="360" y="290" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.08em">
                      REGIÓN ORIENTAL
                    </text>

                    {/* Central Logistics Artery PY02 Route connecting Planta Campo 9 (Z7) to Asunción (Z1) and CDE (Z5) */}
                    <path
                      d="M 230 390 L 330 380 L 390 385 L 490 410"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                      opacity="0.7"
                    />
                    <text x="360" y="375" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      EJE PY02: ASUNCIÓN ↔ CAMPO 9 ↔ C.D.E.
                    </text>

                    {/* Plant Marker at Campo 9 */}
                    <g transform="translate(390, 385)">
                      <circle r="16" fill="#1d4ed8" opacity="0.3" className="animate-ping" />
                      <circle r="7" fill="#2563eb" stroke="#93c5fd" strokeWidth="1.5" />
                    </g>
                  </g>

                  {/* 13 CEDI Pins */}
                  {CEDIS_LIST.map((cedi) => {
                    const coords = cediMapCoordinates[cedi.id] || { x: 300, y: 300 };
                    const isSelected = cedi.id === selectedCediId;
                    const isHighStock = cedi.ocupacionPct > 85;

                    return (
                      <g
                        key={cedi.id}
                        id={`map-pin-${cedi.id}`}
                        transform={`translate(${coords.x}, ${coords.y})`}
                        className="cursor-pointer transition-transform duration-150"
                        onClick={() => {
                          setSelectedCediId(cedi.id);
                          setSelectedMayoristaId(`${cedi.id}-M1`);
                        }}
                        onMouseEnter={() => setHoveredCedi(cedi)}
                        onMouseLeave={() => setHoveredCedi(null)}
                      >
                        {/* Radar Pulse when selected */}
                        {isSelected && (
                          <circle r="22" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.8" className="animate-ping" />
                        )}

                        {/* Outer Pin Body */}
                        <circle
                          r={isSelected ? 14 : 11}
                          fill={isSelected ? '#2563eb' : isHighStock ? '#d97706' : '#0f172a'}
                          stroke={isSelected ? '#93c5fd' : '#475569'}
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                          filter="url(#pin-shadow)"
                        />

                        {/* Text ID inside Pin */}
                        <text
                          y="3.5"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={isSelected ? '9' : '8'}
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {cedi.id}
                        </text>

                        {/* City Label Below Pin */}
                        <rect
                          x="-35"
                          y="15"
                          width="70"
                          height="14"
                          rx="3"
                          fill={isSelected ? '#1e3a8a' : '#0f172a'}
                          stroke={isSelected ? '#60a5fa' : '#334155'}
                          strokeWidth="0.8"
                          opacity="0.9"
                        />
                        <text
                          y="25"
                          textAnchor="middle"
                          fill={isSelected ? '#bfdbfe' : '#94a3b8'}
                          fontSize="7.5"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fontFamily="monospace"
                        >
                          {cedi.ciudad.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Bottom Mini Legend */}
              <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> CEDI Seleccionado ({activeCedi.id})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" /> Alta Ocupación (&gt;85%)
                </span>
                <span className="text-sky-400 font-semibold">
                  {activeCedi.ciudad}: {activeCedi.stockActualLitros.toLocaleString()} L
                </span>
              </div>
            </div>
          ) : (
            /* VIEW 2: LISTA DE LOS 13 CEDI'S */
            <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
              {filteredCedis.map((cedi) => {
                const isSelected = cedi.id === selectedCediId;
                return (
                  <div
                    key={cedi.id}
                    id={`cedi-item-${cedi.id}`}
                    onClick={() => {
                      setSelectedCediId(cedi.id);
                      setSelectedMayoristaId(`${cedi.id}-M1`);
                    }}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/80 ring-1 ring-blue-400 shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {cedi.id}
                        </span>
                        <span className="font-bold text-xs text-slate-900">{cedi.ciudad}</span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        OTIF: {cedi.otifPct}%
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mb-1.5 font-mono">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{cedi.zona}</span>
                    </div>

                    {/* Stock progress bar */}
                    <div className="space-y-0.5 font-mono">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">
                          Stock: <strong className="text-slate-800">{cedi.stockActualLitros.toLocaleString()} L</strong>
                        </span>
                        <span className="text-slate-600 font-bold">{cedi.ocupacionPct}% Cap.</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            cedi.ocupacionPct > 85 ? 'bg-amber-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${cedi.ocupacionPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-blue-500" />
                        Cámara: <strong>{cedi.temperaturaCamara}°C</strong>
                      </span>
                      <span className="text-blue-700 font-semibold">
                        5 Mayoristas Asignados
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Selector de los 65 Mayoristas, Hoja de Ruta y 5 PDVs Asociados */}
        <div className="xl:col-span-7 space-y-3">
          {/* Active CEDI Banner & Mayorista Selector Section */}
          <div className="bg-slate-900 text-white rounded-lg p-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-sky-300">
                  CEDI Seleccionado ({activeCedi.id})
                </span>
                <h3 className="text-sm font-bold mt-0.5">{activeCedi.nombre}</h3>
                <p className="text-[10px] text-slate-300 font-mono">
                  Zona: {activeCedi.zona} • Capacidad: {activeCedi.capacidadLitros.toLocaleString()} L • Temp: {activeCedi.temperaturaCamara}°C
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono">
                <div className="px-2 py-1 rounded bg-white/10 border border-white/10 text-center">
                  <div className="text-[9px] text-slate-300">Stock en Cámara</div>
                  <div className="font-bold text-sky-300 mt-0.5">{activeCedi.stockActualLitros.toLocaleString()} L</div>
                </div>
                <div className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-400/30 text-center">
                  <div className="text-[9px] text-emerald-300">OTIF Regional</div>
                  <div className="font-bold text-emerald-200 mt-0.5">{activeCedi.otifPct}%</div>
                </div>
              </div>
            </div>

            {/* GLOBAL SELECTOR ENTRE LOS 65 MAYORISTAS */}
            <div className="mt-3 pt-2.5 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                <label htmlFor="select-65-mayoristas" className="text-[10px] text-sky-300 font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  Selector Global entre los 65 Mayoristas de la Red:
                </label>
                <span className="text-[9px] text-slate-400 font-mono">
                  Total: 65 distribuidores (5 por cada uno de los 13 CEDIs)
                </span>
              </div>

              {/* Combobox Select Dropdown for 65 Mayoristas */}
              <div className="relative">
                <select
                  id="select-65-mayoristas"
                  value={activeMayorista.id}
                  onChange={(e) => handleSelectMayorista(e.target.value)}
                  className="w-full bg-slate-800 text-white text-xs font-mono py-1.5 px-3 rounded border border-slate-700 outline-none focus:border-blue-400 cursor-pointer"
                >
                  {CEDIS_LIST.map((c) => {
                    const groupMayoristas = MAYORISTAS_DATA.filter((m) => m.id.startsWith(c.id));
                    return (
                      <optgroup key={c.id} label={`${c.id} - ${c.nombre} (${c.ciudad})`}>
                        {groupMayoristas.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.codigo} — {m.nombre} (OTIF: {m.otifPromedio}%)
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
              </div>

              {/* Quick Tab Buttons for the 5 Mayoristas of the CURRENT CEDI */}
              <div className="mt-2">
                <span className="text-[9px] text-slate-400 font-mono block mb-1">
                  Acceso directo a los 5 mayoristas de {activeCedi.ciudad}:
                </span>
                <div className="grid grid-cols-5 gap-1.5 font-mono">
                  {cediMayoristas.map((mayorista) => {
                    const isSelected = mayorista.id === activeMayorista.id;
                    return (
                      <button
                        key={mayorista.id}
                        id={`btn-mayorista-${mayorista.id}`}
                        onClick={() => setSelectedMayoristaId(mayorista.id)}
                        className={`p-1.5 rounded text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-500 text-white font-bold shadow-xs ring-1 ring-white'
                            : 'bg-white/10 hover:bg-white/20 text-white text-[10px]'
                        }`}
                      >
                        <div className="text-[10px] font-bold truncate">{mayorista.codigo}</div>
                        <div className="text-[8.5px] opacity-80 mt-0.5">{mayorista.otifPromedio}%</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Active Mayorista Detail Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px]">
                    {activeMayorista.codigo}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{activeMayorista.nombre}</h4>
                </div>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Zona: <strong>{activeMayorista.zona}</strong> • Chofer: <strong>{activeMayorista.chofer || 'Conductor Autorizado'}</strong>
                </p>
                <p className="text-[10px] text-blue-700 font-mono">
                  {activeMayorista.vehiculo}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-mono">Desempeño OTIF:</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {activeMayorista.otifPromedio}%
                </span>
              </div>
            </div>

            {/* Hoja de Ruta Semanal (Lunes a Viernes) */}
            <div className="mt-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <h5 className="text-[10px] font-bold font-mono text-slate-800 uppercase tracking-wider">
                    Hoja de Ruta Semanal • Circuito Capilar (F07)
                  </h5>
                </div>
                <span className="text-[9px] font-mono text-slate-400">Planificación Semanal</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5 mb-3">
                {activeMayorista.rutaSemanal.map((ruta, idx) => {
                  const ChannelIcon = getChannelIcon(ruta.canal);
                  return (
                    <div
                      key={idx}
                      className="p-1.5 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col justify-between text-[10px] font-mono"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{ruta.dia}</span>
                        <span
                          className={`px-1 py-0.2 rounded text-[8.5px] font-bold ${
                            ruta.estado === 'Completado'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ruta.estado === 'En Ruta'
                              ? 'bg-blue-100 text-blue-800 animate-pulse'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {ruta.estado}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-700 text-[9.5px] truncate font-medium">
                        <ChannelIcon className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                        <span className="truncate">{ruta.canal}</span>
                      </div>
                      <div className="mt-1 pt-1 border-t border-slate-200 flex justify-between text-[9px] text-slate-500">
                        <span>{ruta.puntosAsignados} PDVs</span>
                        <strong className="text-slate-800">{ruta.cajasEntregadas} Cajas</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ESTADO DE ENTREGA A LOS 5 PDVS ASOCIADOS */}
            <div className="mt-3 pt-2.5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-blue-600" />
                  <h5 className="text-[10px] font-bold font-mono text-slate-800 uppercase tracking-wider">
                    Estado de Entrega en los 5 PDVs Asociados (Canales Minoristas)
                  </h5>
                </div>
                <span className="text-[9px] font-mono text-blue-700 font-semibold">
                  5 Canales en este Circuito
                </span>
              </div>

              {/* 5 PDVs Detail Cards */}
              <div className="space-y-2">
                {activeMayorista.pdvsAsociados?.map((pdv: PdvEntregaItem, pIdx: number) => {
                  const ChannelIcon = getChannelIcon(pdv.canal);
                  return (
                    <div
                      key={pdv.id_pdv}
                      id={`pdv-item-${pdv.id_pdv}`}
                      className="p-2 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                            <ChannelIcon className="w-3 h-3" />
                          </span>
                          <span className="font-bold text-xs text-slate-900">{pdv.nombreComercio}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                            {pdv.canal}
                          </span>
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                              pdv.estadoEntrega === 'Entregado'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : pdv.estadoEntrega === 'En Ruta'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200 animate-pulse'
                                : 'bg-slate-100 text-slate-700 border border-slate-300'
                            }`}
                          >
                            {pdv.estadoEntrega === 'Entregado' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {pdv.estadoEntrega === 'En Ruta' && <Truck className="w-3 h-3 text-blue-600" />}
                            {pdv.estadoEntrega === 'Pendiente' && <Clock className="w-3 h-3 text-slate-500" />}
                            <span>{pdv.estadoEntrega}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] font-mono text-slate-600 mt-1.5 pt-1.5 border-t border-slate-200/60">
                        <div>
                          <span className="text-slate-400 block text-[9px]">Ubicación:</span>
                          <span className="text-slate-800 truncate block">{pdv.direccion}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">Pedido & Ventana:</span>
                          <span className="text-slate-800 font-bold block">
                            {pdv.cajasPedido} Cajas ({pdv.litrosPedido.toLocaleString()} L) • {pdv.horaVentana}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">Cadena de Frío / Receptor:</span>
                          <span className="text-slate-800 block">
                            {pdv.temperaturaEntrega ? (
                              <strong className="text-blue-700">{pdv.temperaturaEntrega}°C (OK)</strong>
                            ) : (
                              <span className="text-slate-500">Sensor listo</span>
                            )}{' '}
                            • {pdv.contactoReceptor}
                          </span>
                        </div>
                      </div>

                      {/* Products Summary & Note */}
                      <div className="mt-1 flex flex-wrap items-center justify-between text-[9.5px] font-mono text-slate-500 gap-1 bg-white p-1 rounded border border-slate-200/80">
                        <span>📦 {pdv.productosResumen}</span>
                        {pdv.novedad && <span className="text-slate-600 italic">{pdv.novedad}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom action to trigger reverse logistics simulation from this route */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="text-[10px] text-slate-500 font-mono">
                ¿Incidencia en góndola (vencido, averiado o exceso) reportada por un PDV?
              </div>
              <button
                id="btn-report-pdv-return"
                onClick={() => onNavigateScreen(4)}
                className="px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] font-mono transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Registrar Devolución Inversa en Screen 4</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
