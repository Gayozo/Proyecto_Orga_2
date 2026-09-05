import React, { useState } from 'react';
import { 
  Terminal, 
  Laptop, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Code2, 
  FolderTree, 
  Settings, 
  HelpCircle, 
  Flame, 
  Zap, 
  Download, 
  ExternalLink,
  ShieldAlert,
  Monitor,
  Layers,
  FileCode,
  Package,
  Boxes,
  Wrench,
  RefreshCw,
  GitBranch
} from 'lucide-react';

export const GuiaTecnica: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'requisitos' | 'instalacion' | 'vscode' | 'modificacion' | 'troubleshooting'>('requisitos');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    node: true,
    git: true,
    vscode: true,
    ram: true,
    ssd: true
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => {
      setCopiedSnippet(null);
    }, 2000);
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = Object.keys(checkedItems).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex-1 flex flex-col p-3.5 overflow-y-auto bg-slate-100 select-none">
      {/* Top Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs mb-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-cyan-700 uppercase tracking-wider mb-0.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-600" />
              Guía de Instalación, Entorno Local y Desarrollo
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight font-mono">
              Requisitos Técnicos: Ejecución Local & Modificación en VS Code
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 max-w-4xl">
              Manual exhaustivo paso a paso para clonar, instalar dependencias, levantar el servidor local con Vite HMR y editar el código fuente de forma productiva en Visual Studio Code.
            </p>
          </div>

          {/* Readiness Tracker */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center gap-3 shrink-0">
            <div className="text-right font-mono">
              <div className="text-[9px] uppercase font-bold text-slate-400">Preparación del Entorno</div>
              <div className="text-xs font-bold text-slate-800">{completedCount} de {totalCount} Verificados ({progressPercent}%)</div>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center font-mono font-bold text-xs relative overflow-hidden bg-white">
              <span className={`z-10 ${progressPercent === 100 ? 'text-emerald-700' : 'text-blue-700'}`}>
                {progressPercent}%
              </span>
              <div 
                className={`absolute bottom-0 left-0 right-0 ${progressPercent === 100 ? 'bg-emerald-100' : 'bg-blue-100'}`} 
                style={{ height: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            <button
              id="tab-req"
              onClick={() => setActiveTab('requisitos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'requisitos'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>1. Requisitos de Hardware & Software</span>
            </button>

            <button
              id="tab-install"
              onClick={() => setActiveTab('instalacion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'instalacion'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>2. Pasos de Instalación & Comandos</span>
            </button>

            <button
              id="tab-vscode"
              onClick={() => setActiveTab('vscode')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'vscode'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>3. Configuración en Visual Studio Code</span>
            </button>

            <button
              id="tab-modify"
              onClick={() => setActiveTab('modificacion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'modificacion'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>4. Guía para Modificar el Código</span>
            </button>

            <button
              id="tab-troubleshoot"
              onClick={() => setActiveTab('troubleshooting')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'troubleshooting'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>5. Solución de Problemas (Troubleshooting)</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Stack: <strong className="text-slate-700">Node.js 20+ &bull; Vite 6 &bull; React 19</strong>
          </div>
        </div>
      </div>

      {/* TAB 1: REQUISITOS DE HARDWARE & SOFTWARE */}
      {activeTab === 'requisitos' && (
        <div className="space-y-3">
          {/* Hardware Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Laptop className="w-4 h-4 text-cyan-600" />
              1. Especificaciones de Hardware (Computadora / Estación de Trabajo)
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              Gracias a que el proyecto utiliza el empaquetador <strong>Vite 6</strong> (motorizado internamente por <code>esbuild</code> en lenguaje Go), el consumo de recursos en desarrollo es sumamente bajo y ligero comparado con bundlers tradicionales como Webpack.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
              {/* Mínimo */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Requisitos Mínimos (Suficiente para ejecutar)
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">Básico</span>
                </div>
                <div className="space-y-2 text-[10.5px]">
                  <div>
                    <strong className="text-slate-900 block">Procesador (CPU):</strong>
                    <span className="text-slate-600">Dual-Core x86_64 o ARM64 @ 1.8 GHz (Intel Core i3 4ta gen, AMD A6 o equivalente).</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Memoria RAM:</strong>
                    <span className="text-slate-600">4 GB RAM (al menos 1.5 GB libres para Node.js y un navegador web).</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Almacenamiento:</strong>
                    <span className="text-slate-600">600 MB libres en disco (incluye <code>node_modules</code>, código fuente y caché de compilación).</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Resolución de Pantalla:</strong>
                    <span className="text-slate-600">1280 x 720 px (diseñado con interfaz adaptable responsive de alta densidad).</span>
                  </div>
                </div>
              </div>

              {/* Recomendado */}
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/40">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200">
                  <span className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Requisitos Recomendados (Desarrollo fluido y edición en VS Code)
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Óptimo</span>
                </div>
                <div className="space-y-2 text-[10.5px]">
                  <div>
                    <strong className="text-slate-900 block">Procesador (CPU):</strong>
                    <span className="text-slate-600">Quad-Core o superior (Intel Core i5/i7 8va gen+, AMD Ryzen 3000+, o Apple Silicon M1/M2/M3/M4).</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Memoria RAM:</strong>
                    <span className="text-slate-600">8 GB a 16 GB RAM (permite VS Code con extensiones de TypeScript, ESLint y servidor HMR sin lag).</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Almacenamiento:</strong>
                    <span className="text-slate-600">Unidad de Estado Sólido (SSD SATA III o NVMe M.2). El <code>npm install</code> dura &lt;15 segundos en SSD.</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Resolución de Pantalla:</strong>
                    <span className="text-slate-600">1920 x 1080 px (Full HD) o superior para visualización cómoda del lienzo SVG y paneles laterales.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Software & Runtime Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Terminal className="w-4 h-4 text-cyan-600" />
              2. Requisitos de Software, Runtimes y Sistema Operativo
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              Herramientas esenciales que deben estar instaladas en la máquina anfitriona antes de iniciar:
            </p>

            <div className="space-y-2 font-mono text-[11px]">
              {/* Item 1: Node.js */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    JS
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                      <span>Node.js (Runtime de JavaScript / TypeScript)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Obligatorio</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      Versión mínima requerida: <strong>Node.js 18.18+</strong> &bull; Versión recomendada: <strong>Node.js 20 LTS o 22 LTS</strong>.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 self-end md:self-auto">
                  <code className="text-[10px] bg-slate-900 text-emerald-400 px-2 py-1 rounded font-bold">node -v</code>
                  <a
                    href="https://nodejs.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-bold"
                  >
                    <span>Descargar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Item 2: Package Manager */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded bg-red-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    NPM
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                      <span>Gestor de Paquetes (npm / pnpm / yarn / bun)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Viene con Node</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      <strong>npm v9+ o v10+</strong> (incluido automáticamente con Node.js). También 100% compatible con <code>pnpm</code>, <code>yarn</code> o <code>bun</code>.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 self-end md:self-auto">
                  <code className="text-[10px] bg-slate-900 text-emerald-400 px-2 py-1 rounded font-bold">npm -v</code>
                </div>
              </div>

              {/* Item 3: Git */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded bg-orange-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    GIT
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                      <span>Git CLI (Control de Versiones)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">Recomendado</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      Permite clonar el repositorio, gestionar ramas (branches) y revertir cambios de forma segura.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 self-end md:self-auto">
                  <code className="text-[10px] bg-slate-900 text-emerald-400 px-2 py-1 rounded font-bold">git --version</code>
                  <a
                    href="https://git-scm.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-bold"
                  >
                    <span>Descargar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Item 4: Navegador Web */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    WEB
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                      <span>Navegador Web Moderno (con soporte ES Modules y SVG)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Cualquiera</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      Google Chrome (v90+), Mozilla Firefox (v90+), Microsoft Edge (v90+), Brave o Safari (v15+).
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 5: Sistemas Operativos Soportados */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <strong className="text-slate-900 text-xs block mb-1">Sistemas Operativos Compatibles:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-slate-600">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <strong className="text-slate-900 block">Windows:</strong>
                    Windows 10 / Windows 11 (64-bit). Funciona nativo con PowerShell o con WSL2 (Ubuntu).
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <strong className="text-slate-900 block">macOS:</strong>
                    macOS 11 (Big Sur), 12 (Monterey), 13 (Ventura), 14 (Sonoma) o 15 (Sequoia) en Intel o Apple Silicon.
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <strong className="text-slate-900 block">Linux:</strong>
                    Ubuntu 20.04+, Debian 11+, Fedora 38+, Arch Linux, CentOS Stream o cualquier distribución moderna.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Checklist */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Lista Interactiva de Verificación Previa (Checklist para el Usuario)
            </h3>
            <p className="text-[11px] text-slate-600 mb-2">
              Haz clic en cada casilla para comprobar que tu estación de trabajo cuenta con todos los componentes requeridos:
            </p>

            <div className="space-y-1.5 font-mono text-[11px]">
              {[
                { id: 'node', label: 'Tengo instalado Node.js versión 18 LTS o 20 LTS (comprobado con node -v en terminal)' },
                { id: 'git', label: 'Tengo instalado Git o capacidad para descargar el proyecto en archivo comprimido .ZIP' },
                { id: 'vscode', label: 'Tengo instalado Visual Studio Code (u otro editor como Cursor, WebStorm o Neovim)' },
                { id: 'ram', label: 'Mi equipo cuenta con al menos 4 GB de memoria RAM y 600 MB libres en disco' },
                { id: 'ssd', label: 'Tengo conexión a internet para descargar dependencias en el primer npm install' }
              ].map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-2 rounded-lg border cursor-pointer transition-all flex items-center gap-2.5 ${
                    checkedItems[item.id]
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                    checkedItems[item.id]
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white border-slate-300'
                  }`}>
                    {checkedItems[item.id] && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INSTALACIÓN & COMANDOS */}
      {activeTab === 'instalacion' && (
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Zap className="w-4 h-4 text-cyan-600" />
              Guía Paso a Paso: Desde la Terminal hasta el Navegador
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              Ejecuta los siguientes comandos en tu terminal (PowerShell, CMD, Git Bash, Terminal de macOS o Bash de Linux):
            </p>

            {/* Step by step blocks */}
            <div className="space-y-3 font-mono text-[11px]">
              {/* Step 1 */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-[10px]">
                      1
                    </span>
                    <strong className="text-xs text-slate-900">Descargar o Clonar el Repositorio</strong>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">Terminal</span>
                </div>
                <p className="text-[10.5px] text-slate-600 mb-2">
                  Si descargas el código en un archivo <code>.ZIP</code>, descomprímelo en una carpeta cómoda (por ejemplo <code>C:\proyectos\lactolanda</code> o <code>~/projects/lactolanda</code>). Si utilizas Git:
                </p>
                <div className="relative group">
                  <pre className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[11px] overflow-x-auto">
                    <code>git clone &lt;URL_DEL_REPOSITORIO&gt; lactolanda-logistica{'\n'}cd lactolanda-logistica</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('git clone <URL_DEL_REPOSITORIO> lactolanda-logistica\ncd lactolanda-logistica', 'step1')}
                    className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedSnippet === 'step1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSnippet === 'step1' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-[10px]">
                      2
                    </span>
                    <strong className="text-xs text-slate-900">Instalar las Dependencias del Proyecto</strong>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">Descarga ~45MB</span>
                </div>
                <p className="text-[10.5px] text-slate-600 mb-2">
                  Este comando lee el archivo <code>package.json</code> y descarga React 19, Tailwind CSS 4, Vite 6, Lucide React y los tipados de TypeScript dentro de la carpeta local <code>node_modules/</code>:
                </p>
                <div className="relative group">
                  <pre className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[11px] overflow-x-auto">
                    <code>npm install</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm install', 'step2')}
                    className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedSnippet === 'step2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSnippet === 'step2' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-[10px]">
                      3
                    </span>
                    <strong className="text-xs text-slate-900">Iniciar el Servidor de Desarrollo Local (Vite HMR)</strong>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Tiempo de arranque: ~180ms</span>
                </div>
                <p className="text-[10.5px] text-slate-600 mb-2">
                  Inicia el servidor local de desarrollo con recarga instantánea en caliente:
                </p>
                <div className="relative group">
                  <pre className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[11px] overflow-x-auto">
                    <code>npm run dev</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm run dev', 'step3')}
                    className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedSnippet === 'step3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSnippet === 'step3' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="mt-2 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded">
                  <strong>Salida esperada en la consola:</strong><br />
                  <code>  VITE v6.2.3 ready in 182 ms</code><br />
                  <code>  ➜  Local:   http://localhost:3000/</code><br />
                  <code>  ➜  Network: http://192.168.1.15:3000/</code>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-[10px]">
                      4
                    </span>
                    <strong className="text-xs text-slate-900">Abrir en el Navegador</strong>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">Navegador</span>
                </div>
                <p className="text-[10.5px] text-slate-600 mb-1">
                  Abre tu navegador preferido e ingresa a la siguiente dirección:
                </p>
                <div className="p-2 bg-white border border-slate-200 rounded font-mono text-blue-700 text-xs font-bold">
                  http://localhost:3000
                </div>
                <p className="text-[9.5px] text-slate-500 mt-1">
                  Nota: Si el puerto 3000 estuviera ocupado por otra aplicación, Vite seleccionará automáticamente el siguiente disponible (ej: 3001) o puedes especificarlo con <code>npm run dev -- --port 5173</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Scripts reference table */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-2">
              <Package className="w-4 h-4 text-cyan-600" />
              Catálogo de Comandos Disponibles en package.json
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[9.5px] uppercase">
                  <tr>
                    <th className="p-2">Comando</th>
                    <th className="p-2">Script Ejecutado</th>
                    <th className="p-2">Para qué sirve</th>
                    <th className="p-2">Cuándo usarlo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[10.5px]">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-700">npm run dev</td>
                    <td className="p-2 text-slate-600"><code>vite --port=3000 --host=0.0.0.0</code></td>
                    <td className="p-2 text-slate-800">Inicia el servidor local con recarga en caliente instantánea (HMR).</td>
                    <td className="p-2 font-semibold text-emerald-700">Durante el desarrollo diario.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-purple-700">npm run build</td>
                    <td className="p-2 text-slate-600"><code>vite build</code></td>
                    <td className="p-2 text-slate-800">Compila y minifica todos los archivos TypeScript, CSS y React en la carpeta <code>dist/</code>.</td>
                    <td className="p-2 text-slate-700">Antes de desplegar en producción o GitHub Pages.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-amber-700">npm run preview</td>
                    <td className="p-2 text-slate-600"><code>vite preview</code></td>
                    <td className="p-2 text-slate-800">Levanta un servidor web para probar localmente la versión compilada de <code>dist/</code>.</td>
                    <td className="p-2 text-slate-700">Para comprobar el rendimiento final antes de subir.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-emerald-700">npm run lint</td>
                    <td className="p-2 text-slate-600"><code>tsc --noEmit</code></td>
                    <td className="p-2 text-slate-800">Ejecuta el verificador estático de TypeScript sin generar archivos, detectando errores de tipos.</td>
                    <td className="p-2 text-slate-700">Para validar que no existan errores de código o imports.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONFIGURACIÓN EN VISUAL STUDIO CODE */}
      {activeTab === 'vscode' && (
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Code2 className="w-4 h-4 text-cyan-600" />
              1. Cómo Abrir el Proyecto en Visual Studio Code
            </h3>
            <p className="text-[11px] text-slate-600 mb-2.5">
              Puedes abrir el proyecto directamente desde la terminal situada en la carpeta raíz del proyecto escribiendo:
            </p>

            <div className="relative group mb-3">
              <pre className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto">
                <code>code .</code>
              </pre>
              <button
                onClick={() => handleCopy('code .', 'code-dot')}
                className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer transition-colors font-mono"
              >
                {copiedSnippet === 'code-dot' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet === 'code-dot' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <p className="text-[10.5px] text-slate-500 font-mono">
              Alternativamente, abre VS Code, dirígete a <strong>File &gt; Open Folder...</strong> (o <strong>Archivo &gt; Abrir carpeta...</strong>) y selecciona la carpeta del proyecto.
            </p>
          </div>

          {/* Extensiones recomendadas */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Boxes className="w-4 h-4 text-cyan-600" />
              2. Extensiones Recomendadas de VS Code para Máxima Productividad
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              Instala estas extensiones desde la pestaña de Extensiones de VS Code (<code>Ctrl+Shift+X</code> en Windows/Linux o <code>Cmd+Shift+X</code> en macOS):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-[11px]">
              {/* Ext 1 */}
              <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/40 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  TW
                </div>
                <div>
                  <strong className="text-xs text-blue-950 block">Tailwind CSS IntelliSense</strong>
                  <span className="text-[9.5px] text-slate-500 block">ID: <code>bradlc.vscode-tailwindcss</code></span>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Brinda autocompletado inteligente de clases de Tailwind CSS, vista previa de colores al pasar el cursor y subrayado de errores de sintaxis CSS.
                  </p>
                </div>
              </div>

              {/* Ext 2 */}
              <div className="p-2.5 rounded-lg border border-purple-200 bg-purple-50/40 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  TS
                </div>
                <div>
                  <strong className="text-xs text-purple-950 block">TypeScript and JavaScript Language Features</strong>
                  <span className="text-[9.5px] text-slate-500 block">Integrada por defecto en VS Code</span>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Autocompletado de interfaces (<code>DimActor</code>, <code>RegLote</code>), navegación rápida con <code>F12</code> a definiciones y refactorización automática.
                  </p>
                </div>
              </div>

              {/* Ext 3 */}
              <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/40 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  PR
                </div>
                <div>
                  <strong className="text-xs text-amber-950 block">Prettier - Code Formatter</strong>
                  <span className="text-[9.5px] text-slate-500 block">ID: <code>esbenp.prettier-vscode</code></span>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Formatea automáticamente el código TypeScript, JSX y JSON cada vez que guardas el archivo (<code>Ctrl+S</code>), manteniendo la indentación impecable.
                  </p>
                </div>
              </div>

              {/* Ext 4 */}
              <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/40 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ES
                </div>
                <div>
                  <strong className="text-xs text-emerald-950 block">ESLint</strong>
                  <span className="text-[9.5px] text-slate-500 block">ID: <code>dbaeumer.vscode-eslint</code></span>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Analiza el código en tiempo real para evitar variables sin usar, imports rotos o bucles infinitos en hooks de React.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Configuración de settings.json */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Settings className="w-4 h-4 text-cyan-600" />
              3. Configuración Óptima del Espacio de Trabajo (.vscode/settings.json)
            </h3>
            <p className="text-[11px] text-slate-600 mb-2">
              Crea un archivo <code>.vscode/settings.json</code> en la raíz del proyecto para que VS Code formateé al guardar y reconozca TypeScript al 100%:
            </p>

            <div className="relative group">
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-[10.5px] font-mono overflow-x-auto leading-relaxed">
                <code>{`{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.suggest.completeFunctionCalls": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}`}</code>
              </pre>
              <button
                onClick={() => handleCopy(`{\n  "editor.formatOnSave": true,\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.codeActionsOnSave": {\n    "source.fixAll.eslint": "explicit"\n  },\n  "typescript.tsdk": "node_modules/typescript/lib",\n  "typescript.suggest.completeFunctionCalls": true,\n  "files.autoSave": "afterDelay",\n  "files.autoSaveDelay": 1000\n}`, 'vscode-settings')}
                className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer transition-colors font-mono"
              >
                {copiedSnippet === 'vscode-settings' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet === 'vscode-settings' ? 'Copiado' : 'Copiar JSON'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GUÍA PARA MODIFICAR EL CÓDIGO */}
      {activeTab === 'modificacion' && (
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <FolderTree className="w-4 h-4 text-cyan-600" />
              1. Mapa de Modificación: ¿Dónde editar según lo que quieras cambiar?
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              La arquitectura del proyecto está estrictamente desacoplada para que puedas realizar modificaciones quirúrgicas sin romper otros módulos:
            </p>

            <div className="space-y-2 font-mono text-[11px]">
              {/* Caso 1: Datos */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Quiero agregar o modificar Tambos, CEDIs, Mayoristas, Lotes o Productos:
                  </span>
                  <code className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">src/data/mockData.ts</code>
                </div>
                <p className="text-[10.5px] text-slate-600">
                  En este archivo se encuentran las listas <code>CEDIS_LIST</code> (los 13 centros de distribución con sus coordenadas SVG de Paraguay), <code>MAYORISTAS_DATA</code> (los 65 mayoristas), <code>LOTES_DATA</code> y <code>FLUJOS_TABLA_DATA</code>. Simplemente edita los objetos o agrega nuevos elementos respetando la interfaz.
                </p>
              </div>

              {/* Caso 2: Tipos */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    Quiero añadir nuevos atributos a las entidades (ej: nuevo campo en un Lote o CEDI):
                  </span>
                  <code className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">src/types.ts</code>
                </div>
                <p className="text-[10.5px] text-slate-600">
                  Contiene todas las interfaces maestras del modelo relacional. Si agregas por ejemplo <code>certificacion_senacsa?: string</code> en <code>RegLote</code>, el compilador TypeScript te indicará automáticamente dónde debes suministrar ese nuevo dato.
                </p>
              </div>

              {/* Caso 3: Pantallas */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Quiero modificar el diseño, botones o interacción de una pantalla específica:
                  </span>
                  <code className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">src/components/screens/</code>
                </div>
                <p className="text-[10.5px] text-slate-600">
                  Cada módulo tiene su propio archivo:
                  <br />&bull; <strong>Lienzo Sistémico:</strong> <code>Screen1SystemDiagram.tsx</code>
                  <br />&bull; <strong>Árbol de Trazabilidad:</strong> <code>Screen2Traceability.tsx</code>
                  <br />&bull; <strong>Mapa e Inventario de 13 CEDIs:</strong> <code>Screen3InventoryDistribution.tsx</code>
                  <br />&bull; <strong>Consola de Devoluciones:</strong> <code>Screen4ReverseLogistics.tsx</code>
                  <br />&bull; <strong>Base de Datos y SQL:</strong> <code>Screen5DatabaseViewer.tsx</code>
                  <br />&bull; <strong>Memoria y Lógica de Negocio:</strong> <code>Screen6ArchitectureDocs.tsx</code>
                  <br />&bull; <strong>Guía de Requisitos Técnicos:</strong> <code>guia_tecnica.tsx</code>
                </p>
              </div>

              {/* Caso 4: Conectar Backend Real */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    Quiero conectar este frontend a una base de datos real (PostgreSQL, Supabase o Firebase):
                  </span>
                  <code className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">src/App.tsx</code>
                </div>
                <p className="text-[10.5px] text-slate-600">
                  En <code>App.tsx</code>, los hooks <code>useState</code> iniciales (<code>lotsList</code>, <code>devoluciones</code>, <code>inventario</code>) pueden reemplazarse por llamadas asíncronas con <code>useEffect</code> y <code>fetch('/api/lotes')</code> o suscripciones en tiempo real con Supabase / Firebase Firestore.
                </p>
              </div>
            </div>
          </div>

          {/* Atajos de teclado en VS Code */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-cyan-600" />
              Atajos de Teclado Imprescindibles en VS Code
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 font-mono text-[10.5px]">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 text-xs mb-0.5">Ctrl + P (Cmd + P)</div>
                <div className="text-slate-600">Abrir buscador rápido de archivos por nombre.</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 text-xs mb-0.5">Ctrl + Shift + F</div>
                <div className="text-slate-600">Buscar cualquier texto en todo el proyecto.</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 text-xs mb-0.5">Tecla F12</div>
                <div className="text-slate-600">Ir directamente a la definición del tipo o componente.</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 text-xs mb-0.5">Ctrl + ` (Backtick)</div>
                <div className="text-slate-600">Abrir o cerrar la terminal integrada de VS Code.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SOLUCIÓN DE PROBLEMAS (TROUBLESHOOTING) */}
      {activeTab === 'troubleshooting' && (
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Wrench className="w-4 h-4 text-cyan-600" />
              Solución de Problemas Frecuentes al Ejecutar Localmente
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              Respuestas rápidas a los errores más comunes que pueden presentarse durante la configuración en Windows, macOS o Linux:
            </p>

            <div className="space-y-2.5 font-mono text-[11px]">
              {/* Error 1 */}
              <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50">
                <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Error: 'node' o 'npm' no se reconoce como un comando interno o externo</span>
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed mb-1.5">
                  <strong>Causa:</strong> Node.js no está instalado o su ruta no fue agregada a la variable de entorno <code>PATH</code> de tu sistema operativo.
                </p>
                <div className="bg-white border border-slate-200 p-2 rounded text-[10px] text-slate-800">
                  <strong>Solución:</strong> Descarga e instala Node.js desde <code>https://nodejs.org/</code> asegurándote de marcar la casilla <em>"Add to PATH"</em> durante el asistente de instalación. Luego <strong>cierra y vuelve a abrir tu terminal</strong> para que cargue las nuevas variables.
                </div>
              </div>

              {/* Error 2 */}
              <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Error: Port 3000 is in use, trying another one...</span>
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed mb-1.5">
                  <strong>Causa:</strong> Tienes otra aplicación (como un servidor Node previo, Docker o Grafana) ocupando el puerto 3000.
                </p>
                <div className="bg-white border border-slate-200 p-2 rounded text-[10px] text-slate-800">
                  <strong>Solución:</strong> Vite automáticamente usará el puerto 3001, o puedes forzar un puerto libre ejecutando:<br />
                  <code className="text-blue-700 font-bold">npm run dev -- --port 5173</code>
                </div>
              </div>

              {/* Error 3 */}
              <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50">
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs mb-1">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                  <span>Error en Windows PowerShell: "La ejecución de scripts está deshabilitada en este sistema"</span>
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed mb-1.5">
                  <strong>Causa:</strong> La directiva de ejecución (ExecutionPolicy) de PowerShell bloquea scripts por seguridad en Windows.
                </p>
                <div className="bg-white border border-slate-200 p-2 rounded text-[10px] text-slate-800">
                  <strong>Solución:</strong> Abre PowerShell como Administrador y ejecuta:<br />
                  <code className="text-emerald-700 font-bold">Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned</code><br />
                  Luego presiona <code>S</code> (Sí) para confirmar.
                </div>
              </div>

              {/* Error 4 */}
              <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50">
                <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs mb-1">
                  <FileCode className="w-3.5 h-3.5 text-purple-600" />
                  <span>VS Code muestra líneas rojas o no autocompleta los tipos de TypeScript</span>
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed mb-1.5">
                  <strong>Causa:</strong> El servidor de TypeScript de VS Code quedó desincronizado tras instalar paquetes nuevos.
                </p>
                <div className="bg-white border border-slate-200 p-2 rounded text-[10px] text-slate-800">
                  <strong>Solución:</strong> En VS Code, presiona <code>Ctrl + Shift + P</code> (o <code>Cmd + Shift + P</code> en Mac), escribe <em>"Restart TS Server"</em> y presiona Enter. También verifica que hayas ejecutado <code>npm install</code> previamente.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
