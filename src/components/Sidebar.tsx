import React from 'react';
import { 
  Network, 
  ScanBarcode, 
  Truck, 
  RotateCcw, 
  Database, 
  GitBranch, 
  CheckCircle2, 
  ShieldCheck,
  Milk,
  Building2,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  activeScreen: number;
  setActiveScreen: (screen: number) => void;
  onOpenExportModal: () => void;
  blockedLotsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  setActiveScreen,
  onOpenExportModal,
  blockedLotsCount
}) => {
  const menuItems = [
    {
      id: 1,
      title: 'Diagrama Sistémico',
      subtitle: 'Red TGS & 4 Logísticas',
      icon: Network,
      tag: 'Principal',
      color: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Trazabilidad de Lotes',
      subtitle: 'Aprovisionamiento & Silos',
      icon: ScanBarcode,
      tag: 'Entrada/Interna',
      color: 'text-emerald-600'
    },
    {
      id: 3,
      title: 'Control e Inventario',
      subtitle: '13 CEDIs & 65 Mayoristas',
      icon: Truck,
      tag: 'Salida / Capilar',
      color: 'text-indigo-600'
    },
    {
      id: 4,
      title: 'Gestión de Devoluciones',
      subtitle: 'Logística Inversa & Calidad',
      icon: RotateCcw,
      tag: 'Inversa',
      color: 'text-amber-600',
      badge: blockedLotsCount > 0 ? `${blockedLotsCount} Alertas` : undefined
    },
    {
      id: 5,
      title: 'Base de Datos & SQL',
      subtitle: 'ERD, Esquema & F01-F16',
      icon: Database,
      tag: 'Modelo Relacional',
      color: 'text-purple-600'
    },
    {
      id: 6,
      title: 'Arquitectura & Guía',
      subtitle: 'Lógica, Estructura & Docs',
      icon: BookOpen,
      tag: 'Memoria & Dev',
      color: 'text-cyan-500'
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 h-screen border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm ring-1 ring-white/10 shrink-0">
            <Milk className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">LACTOLANDA</span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                PROD
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate">Logística Integral & TGS</p>
          </div>
        </div>

        {/* Academic Meta Badge */}
        <div className="mt-2.5 p-2 rounded bg-slate-900 border border-slate-800 text-[10px]">
          <div className="flex items-center justify-between text-slate-300 font-semibold mb-0.5">
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-blue-400" />
              UCA - FCyT Org 2
            </span>
            <span className="text-[10px] text-blue-400 font-mono">Unidad 2</span>
          </div>
          <p className="text-[10px] text-slate-400 truncate">
            Cadena de Valor • Caso Planta Campo 9
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
          Módulos de la Cadena
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              id={`nav-screen-${item.id}`}
              onClick={() => setActiveScreen(item.id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-100 relative group cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-xs border-l-2 border-sky-300'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div
                className={`w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-medium truncate">{item.title}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className={`text-[10px] font-mono truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                  {item.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Role & GitHub Export button */}
      <div className="p-2.5 border-t border-slate-800 bg-slate-950 space-y-1.5">
        <button
          id="btn-open-github-export"
          onClick={onOpenExportModal}
          className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700/80 transition-colors cursor-pointer"
        >
          <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
          <span>Estructura VS Code / GitHub</span>
          <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
        </button>

        <div className="px-2 py-1.5 rounded bg-slate-900 border border-slate-800 flex items-center gap-2 text-[10px]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-200 truncate">Gerente General</div>
            <div className="text-[9px] text-slate-400 font-mono truncate">Planta J.E. Estigarribia</div>
          </div>
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
};
