import React from 'react';
import { 
  Building, 
  Layers, 
  AlertTriangle, 
  Milk, 
  MapPin, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

interface HeaderProps {
  activeScreen: number;
  blockedLotsCount: number;
  totalReturnsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  blockedLotsCount,
  totalReturnsCount
}) => {
  const getScreenDetails = () => {
    switch (activeScreen) {
      case 1:
        return {
          title: 'Diagrama Sistémico Interactivo (TGS)',
          desc: 'Visualización integral de la cadena de valor: Aprovisionamiento, Intralogística, Salida e Inversa',
          badge: 'Sistema Abierto Dinámico'
        };
      case 2:
        return {
          title: 'Monitor de Trazabilidad de Lotes',
          desc: 'Genealogía completa desde el tambo primario, recepción en silos, pasteurización y destino',
          badge: 'Entrada & Intralogística'
        };
      case 3:
        return {
          title: 'Control de Inventario y Distribución Capilar',
          desc: 'Gestión de existencias en los 13 CEDI propios y hojas de ruta de los 65 Mayoristas zonificados',
          badge: 'Logística de Salida'
        };
      case 4:
        return {
          title: 'Consola de Gestión de Devoluciones',
          desc: 'Bucle de retorno por 4 causales: Defectuoso, Averiado, Exceso y Vencido con Cerebro de Calidad',
          badge: 'Logística Inversa'
        };
      case 5:
        return {
          title: 'Visualizador y Estructura de Base de Datos',
          desc: 'Modelo relacional ERD, catálogo de tablas maestras y motor de consulta transaccional SQL',
          badge: 'Arquitectura Relacional'
        };
      case 6:
        return {
          title: 'Arquitectura, Lógica de Negocio & Guía Técnica',
          desc: 'Memoria integral del proyecto, estructura interna modular, reglas del dominio lácteo y manual de usuario',
          badge: 'Documentación & Dev'
        };
      default:
        return {
          title: 'Sistema de Logística Integral Lactolanda',
          desc: 'Gestión Integral de Cadena de Suministro',
          badge: 'Lactolanda'
        };
    }
  };

  const details = getScreenDetails();

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 shadow-xs z-10 select-none">
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight truncate">{details.title}</h1>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
              {details.badge}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate max-w-xl hidden sm:block">{details.desc}</p>
        </div>
      </div>

      {/* Right Stats & Status */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Core Node Counts Pill */}
        <div className="hidden xl:flex items-center gap-3 px-3 py-1 rounded bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">125</span>
            <span className="text-slate-500">Tamberos</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">5</span>
            <span className="text-slate-500">Acopiadores</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-blue-700">13</span>
            <span className="text-slate-500">CEDI's</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">65</span>
            <span className="text-slate-500">Mayoristas</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-emerald-700">5</span>
            <span className="text-slate-500">PDV</span>
          </div>
        </div>

        {/* Quality Alerts Indicator */}
        {blockedLotsCount > 0 ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-mono font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
            <span>{blockedLotsCount} Lotes Bloqueados ERP</span>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Calidad Conforme</span>
          </div>
        )}

        {/* CAPAINLAC & Location info */}
        <div className="flex items-center gap-2 pl-2.5 border-l border-slate-200">
          <div className="text-right">
            <div className="text-[11px] font-bold text-slate-800 flex items-center justify-end gap-1 font-mono">
              <MapPin className="w-3 h-3 text-rose-500" />
              Campo 9, Caaguazú
            </div>
            <div className="text-[9px] text-slate-500 font-medium">CAPAINLAC Miembro Activo</div>
          </div>
        </div>
      </div>
    </header>
  );
};
