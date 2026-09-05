import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  Copy, 
  Check, 
  FolderTree, 
  Terminal, 
  FileCode, 
  ExternalLink,
  CheckCircle2,
  GitCommit
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const gitCommands = `# 1. En tu terminal de VS Code, crea y cámbiate a tu rama de trabajo:
git checkout -b feature/logistica-integral-lactolanda

# 2. Verifica el estado de los archivos modificados/creados:
git status

# 3. Añade los componentes modulares al staging:
git add src/types.ts
git add src/data/mockData.ts
git add src/components/Sidebar.tsx
git add src/components/Header.tsx
git add src/components/screens/Screen1SystemDiagram.tsx
git add src/components/screens/Screen2Traceability.tsx
git add src/components/screens/Screen3InventoryDistribution.tsx
git add src/components/screens/Screen4ReverseLogistics.tsx
git add src/components/screens/Screen5DatabaseViewer.tsx
git add src/App.tsx

# 4. Realiza el commit descriptivo:
git commit -m "feat(logistica-integral): beta demostrativa de 5 pantallas para Lactolanda con trazabilidad, inventario en 13 CEDIs, logística inversa y modelo relacional"

# 5. Envía tu rama al repositorio remoto de GitHub:
git push -u origin feature/logistica-integral-lactolanda`;

  const fileStructure = `lactolanda-logistica/
├── src/
│   ├── types.ts                                  # Tipos e interfaces globales de dominio
│   ├── data/
│   │   └── mockData.ts                           # Datasets: 13 CEDIs, 65 Mayoristas, Lotes, F01-F16
│   ├── components/
│   │   ├── Sidebar.tsx                           # Navegador lateral con selector de pantallas
│   │   ├── Header.tsx                            # Barra superior con KPIs e indicador de planta
│   │   ├── ExportModal.tsx                       # Asistente de exportación a VS Code y GitHub
│   │   └── screens/
│   │       ├── Screen1SystemDiagram.tsx          # Pantalla 1: Diagrama Sistémico TGS Interactivo
│   │       ├── Screen2Traceability.tsx           # Pantalla 2: Monitor de Trazabilidad y Genealogía
│   │       ├── Screen3InventoryDistribution.tsx  # Pantalla 3: Control de Inventario & 65 Mayoristas
│   │       ├── Screen4ReverseLogistics.tsx       # Pantalla 4: Consola de Gestión de Devoluciones
│   │       └── Screen5DatabaseViewer.tsx         # Pantalla 5: Visualizador DB, ERD Mermaid y SQL
│   ├── App.tsx                                   # Enrutador principal de pantallas y estado global
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── tsconfig.json`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Guía de Integración en VS Code & GitHub</h3>
              <p className="text-xs text-slate-300">
                Estructura modular lista para copiar a tu editor y realizar el commit en tu rama
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Section 1: Git Commands */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Terminal className="w-4 h-4 text-blue-600" />
                Comandos de Git para tu Terminal en VS Code
              </span>
              <button
                onClick={() => copyText(gitCommands, 'git')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedSection === 'git' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Comandos</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              {gitCommands}
            </pre>
          </div>

          {/* Section 2: Modular Project Structure */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <FolderTree className="w-4 h-4 text-purple-600" />
                Estructura de Archivos Creados (100% Modular)
              </span>
              <button
                onClick={() => copyText(fileStructure, 'structure')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedSection === 'structure' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Árbol</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-50 text-slate-800 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-200">
              {fileStructure}
            </pre>
          </div>

          {/* Section 3: Summary of Work done */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Módulos Verificados y Listos para la Integración:
            </h4>
            <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
              <li><strong>Pantalla 1 (Diagrama Sistémico):</strong> Canvas SVG con 7 nodos cliqueables, capas conmutables y resalte de logística inversa (F09-F16).</li>
              <li><strong>Pantalla 2 (Trazabilidad):</strong> Buscador de lotes, árbol de genealogía de tambos, acopiadores, silos de pasteurización y bloqueo en ERP.</li>
              <li><strong>Pantalla 3 (Control de Inventario):</strong> Mapa de los 13 CEDIs propios y selector de los 65 mayoristas con hojas de ruta capilares hacia 5 canales PDV.</li>
              <li><strong>Pantalla 4 (Logística Inversa):</strong> Formulario con las 4 causales y Cerebro de Calidad con alerta de destrucción inmediata o reutilización/desvío.</li>
              <li><strong>Pantalla 5 (Base de Datos):</strong> Diagrama ERD renderizado con Mermaid.js, diccionario de campos y motor SQL para consultas directivas en tiempo real.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Entendido, volver a la aplicación
          </button>
        </div>
      </div>
    </div>
  );
};
