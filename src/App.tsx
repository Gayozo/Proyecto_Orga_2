import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExportModal } from './components/ExportModal';
import { Screen1SystemDiagram } from './components/screens/Screen1SystemDiagram';
import { Screen2Traceability } from './components/screens/Screen2Traceability';
import { Screen3InventoryDistribution } from './components/screens/Screen3InventoryDistribution';
import { Screen4ReverseLogistics } from './components/screens/Screen4ReverseLogistics';
import { Screen5DatabaseViewer } from './components/screens/Screen5DatabaseViewer';
import { Screen6ArchitectureDocs } from './components/screens/Screen6ArchitectureDocs';
import { LOTES_DATA, INITIAL_DEVOLUCIONES, INITIAL_TRANS_INVENTARIO } from './data/mockData';
import { RegLote, TransDevolucion, TransInventario } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<number>(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Stateful Data
  const [lotsList, setLotsList] = useState<RegLote[]>(LOTES_DATA);
  const [devoluciones, setDevoluciones] = useState<TransDevolucion[]>(INITIAL_DEVOLUCIONES);
  const [inventario, setInventario] = useState<TransInventario[]>(INITIAL_TRANS_INVENTARIO);

  // Handler to toggle lot status (e.g. Block in ERP or Release)
  const handleToggleLotStatus = (lotId: string) => {
    setLotsList((prev) =>
      prev.map((lot) => {
        if (lot.id_lote === lotId) {
          const newStatus = lot.estado_calidad === 'Aprobado' ? 'Bloqueado ERP' : 'Aprobado';
          return {
            ...lot,
            estado_calidad: newStatus
          };
        }
        return lot;
      })
    );
  };

  // Handler to register a new return from Screen 4
  const handleAddDevolucion = (newDev: TransDevolucion) => {
    setDevoluciones((prev) => [newDev, ...prev]);

    // Also register the complementary return movement in TRANS_INVENTARIO if relevant
    const newMovement: TransInventario = {
      id_movimiento: newDev.fk_movimiento_origen,
      fk_lote: newDev.fk_lote,
      fk_actor_origen: newDev.fk_actor_origen,
      nombre_origen: newDev.nombre_origen,
      fk_actor_destino: newDev.fk_actor_destino,
      nombre_destino: newDev.nombre_destino,
      cantidad: newDev.cantidad_devuelta,
      unidad: newDev.unidad,
      fecha_hora: newDev.fecha_registro,
      id_flujo_asociado: newDev.tipo_devolucion === 'Vencido' ? 'F14' : newDev.tipo_devolucion === 'Defectuoso' ? 'F10' : 'F11'
    };
    setInventario((prev) => [newMovement, ...prev]);
  };

  // Count blocked lots for warning badge
  const blockedLotsCount = lotsList.filter(
    (l) => l.estado_calidad === 'Bloqueado ERP' || l.estado_calidad === 'Retirado'
  ).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        blockedLotsCount={blockedLotsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <Header
          activeScreen={activeScreen}
          blockedLotsCount={blockedLotsCount}
          totalReturnsCount={devoluciones.length}
        />

        {/* Screen Content Switcher */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {activeScreen === 1 && (
            <Screen1SystemDiagram onNavigateScreen={setActiveScreen} />
          )}

          {activeScreen === 2 && (
            <Screen2Traceability
              lotsList={lotsList}
              onToggleLotStatus={handleToggleLotStatus}
              onNavigateScreen={setActiveScreen}
            />
          )}

          {activeScreen === 3 && (
            <Screen3InventoryDistribution onNavigateScreen={setActiveScreen} />
          )}

          {activeScreen === 4 && (
            <Screen4ReverseLogistics
              devoluciones={devoluciones}
              onAddDevolucion={handleAddDevolucion}
              lotsList={lotsList}
              onToggleLotStatus={handleToggleLotStatus}
            />
          )}

          {activeScreen === 5 && (
            <Screen5DatabaseViewer
              devoluciones={devoluciones}
              inventario={inventario}
            />
          )}

          {activeScreen === 6 && (
            <Screen6ArchitectureDocs onNavigateScreen={setActiveScreen} />
          )}
        </div>

        {/* High-Density Bottom Status & Telemetry Bar */}
        <footer className="h-7 bg-slate-50 border-t border-slate-200 px-4 flex items-center justify-between text-[10px] text-slate-500 font-mono shrink-0 select-none">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              DIM_ACTORES: <strong className="text-slate-700">84</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span>
              TRANS_INVENTARIO: <strong className="text-slate-700">{inventario.length > 0 ? (12400 + inventario.length).toLocaleString() : '12,402'}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span>
              TRANS_DEVOLUCIONES: <strong className="text-slate-700">{devoluciones.length}</strong>
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="hidden sm:inline">
              REG_LOTES: <strong className="text-slate-700">{lotsList.length}</strong>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${blockedLotsCount > 0 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="hidden md:inline">Nodo Central: Planta Campo 9 (Online)</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-blue-700 font-semibold">lactolanda-core [main]</span>
          </div>
        </footer>
      </main>

      {/* VS Code / GitHub Export Instructions Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
