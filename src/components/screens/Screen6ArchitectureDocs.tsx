import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  GitBranch, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Database, 
  Terminal, 
  Network, 
  Truck, 
  RotateCcw, 
  ScanBarcode, 
  Building2, 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  ThermometerSnowflake, 
  FileText, 
  Users, 
  ArrowRight, 
  Flame, 
  Store, 
  Coffee, 
  ShoppingBag,
  ExternalLink,
  Milestone,
  HelpCircle,
  Lightbulb,
  Workflow
} from 'lucide-react';
import { CEDIS_LIST, FLUJOS_TABLA_DATA } from '../../data/mockData';

interface Screen6Props {
  onNavigateScreen: (screen: number) => void;
}

export const Screen6ArchitectureDocs: React.FC<Screen6Props> = ({ onNavigateScreen }) => {
  const [activeTab, setActiveTab] = useState<'trace' | 'business' | 'dev' | 'userguide' | 'matrix'>('trace');
  const [searchDoc, setSearchDoc] = useState('');

  return (
    <div className="flex-1 flex flex-col p-3.5 overflow-y-auto bg-slate-100 select-none">
      {/* Top Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs mb-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-cyan-700 uppercase tracking-wider mb-0.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
              Documentación Técnica, Lógica de Negocio y Memoria del Proyecto Beta
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight font-mono">
              Arquitectura Interna, Reglas de Dominio y Guía Integral de la Cadena Lactolanda
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 max-w-4xl">
              Memoria descriptiva integral: trazabilidad del desarrollo, estructura modular de software, manual de operaciones para usuarios finales y especificación técnica de la lógica de negocio para desarrolladores.
            </p>
          </div>

          {/* Quick Metrics / Tags */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-bold">
              Versión: Beta v2.4
            </span>
            <span className="px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700 font-bold">
              12 Nodos TGS
            </span>
            <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
              16 Flujos (F01-F16)
            </span>
            <span className="px-2 py-1 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">
              84 Actores Relacionales
            </span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            <button
              id="tab-trace"
              onClick={() => setActiveTab('trace')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'trace'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Milestone className="w-3.5 h-3.5" />
              <span>1. Trazabilidad del Proyecto Beta</span>
            </button>

            <button
              id="tab-business"
              onClick={() => setActiveTab('business')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>2. Lógica de Negocio Láctea</span>
            </button>

            <button
              id="tab-dev"
              onClick={() => setActiveTab('dev')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'dev'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>3. Arquitectura & Guía para Desarrolladores</span>
            </button>

            <button
              id="tab-userguide"
              onClick={() => setActiveTab('userguide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'userguide'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>4. Manual de Usuario por Módulo</span>
            </button>

            <button
              id="tab-matrix"
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>5. Matriz de Flujos F01-F16 & Actores</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Diseño: <strong className="text-slate-700">High Density UI</strong>
          </div>
        </div>
      </div>

      {/* TAB 1: TRAZABILIDAD DEL PROYECTO BETA */}
      {activeTab === 'trace' && (
        <div className="space-y-3">
          {/* Card: Fuentes Fundacionales */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <FileText className="w-4 h-4 text-cyan-600" />
              1. Fuentes Documentales y Base Conceptual de Partida
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              Este aplicativo no nació de suposiciones abstractas, sino de la traslación sistemática de tres piezas de ingeniería y modelado empresarial:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/40">
                <div className="font-bold text-blue-900 text-xs mb-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  diagrama_lactolanda.pdf
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed">
                  Diagrama sistémico general basado en la <strong>Teoría General de Sistemas (TGS)</strong> de Ludwig von Bertalanffy. Define los límites del sistema abierto de Lactolanda, sus 12 componentes orgánicos (nodos) y los bucles de retroalimentación de calidad.
                </p>
              </div>

              <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/40">
                <div className="font-bold text-emerald-900 text-xs mb-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Tablas 1 y 2 de Transacciones
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed">
                  <strong>Tabla 1:</strong> Registro transaccional exhaustivo de los 16 flujos (F01 a F16) con sus responsables, KPIs y áreas de origen/destino.<br />
                  <strong>Tabla 2:</strong> Mapa de vínculos de integración, actores y relaciones clave de cada eslabón.
                </p>
              </div>

              <div className="p-2.5 rounded-lg border border-purple-200 bg-purple-50/40">
                <div className="font-bold text-purple-900 text-xs mb-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  Guía Unidad 2 (UCA FCyT)
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed">
                  Cátedra de Organización 2: Cadena de Valor del Negocio y Logística Integral. Establece el marco riguroso de las cuatro logísticas: <em>Entrada, Intralogística, Salida e Inversa</em> con enfoque en reducción de merma y cadena de frío.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Roadmap Paso a Paso de Construcción */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-2.5">
              <Milestone className="w-4 h-4 text-cyan-600" />
              2. Cronología de Construcción e Hitos del Proyecto
            </h3>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 pl-7">
              {/* Milestone 1 */}
              <div className="relative">
                <span className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-200" />
                <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Hito 1: Normalización Relacional y Diseño de Tipos TypeScript</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-normal">Arquitectura de Datos</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Se tradujo el modelo conceptual en interfaces formales de TypeScript en <code>types.ts</code> (<code>DimActor</code>, <code>DimProducto</code>, <code>RegLote</code>, <code>CediInfo</code>, <code>MayoristaInfo</code>, <code>PdvEntregaItem</code>, <code>TransInventario</code>, <code>TransDevolucion</code>) garantizando tipado estricto sin dependencias no declaradas.
                </p>
              </div>

              {/* Milestone 2 */}
              <div className="relative">
                <span className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-200" />
                <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Hito 2: Generación del Dataset Fiel a la Realidad Operativa Paraguaya</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-normal">Mock Centralizado</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  En <code>mockData.ts</code> se parametrizó la infraestructura real de Cooperativa La Holanda / Lactolanda: la Planta Central en J. Eulogio Estigarribia (Campo 9), los 13 Centros de Distribución Regionales (Asunción, Villarrica, CDE, etc.), los 65 Mayoristas zonales (5 por CEDI) y el catálogo completo de flujos F01-F16.
                </p>
              </div>

              {/* Milestone 3 */}
              <div className="relative">
                <span className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200" />
                <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Hito 3: Lienzo Sistémico Interactivo TGS (Screen 1)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-normal">Visualización SVG</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Construcción de un canvas SVG interactivo con 12 nodos interconectados mediante flechas direccionales reactivas. Se implementó el filtrado dinámico por las 4 logísticas y un inspector lateral con métricas de stock, mermas, OTIF y visor de flujos.
                </p>
              </div>

              {/* Milestone 4 */}
              <div className="relative">
                <span className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-amber-600 border-2 border-white ring-2 ring-amber-200" />
                <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Hito 4: Monitor de Trazabilidad Ascendente/Descendente (Screen 2)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-normal">Traceability Tree</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Desarrollo del Árbol Genealógico de Lotes que interconecta desde los tambos y cisternas primarias, pasando por ensayos bromatológicos y pasteurización, hasta el CEDI y PDV, incorporando un mecanismo de bloqueo de lotes en ERP para simular recalls.
                </p>
              </div>

              {/* Milestone 5 */}
              <div className="relative">
                <span className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-purple-600 border-2 border-white ring-2 ring-purple-200" />
                <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Hito 5: Mapa de Paraguay, 13 CEDIs y 65 Mayoristas con 5 PDVs (Screen 3)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-normal">Capilaridad & Stock</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Incorporación de mapa geográfico SVG de Paraguay con coordenadas geolocalizadas para los 13 CEDIs, selector global entre los 65 mayoristas, hojas de ruta semanales y matriz de entrega a los 5 PDVs asociados por distribuidor.
                </p>
              </div>

              {/* Milestone 6 */}
              <div className="relative">
                <span className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-rose-600 border-2 border-white ring-2 ring-rose-200" />
                <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Hito 6: Consola de Logística Inversa y Cerebro de Calidad (Screen 4)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-normal">Bucle Cerrado</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Máquina de estados para procesar devoluciones por las 4 causales normativas (Defectuoso, Averiado, Exceso, Vencido), formulario de registro reactivo y propagación instantánea a la tabla de transacciones de inventario.
                </p>
              </div>

              {/* Milestone 7 */}
              <div className="relative">
                <span className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-cyan-600 border-2 border-white ring-2 ring-cyan-200" />
                <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Hito 7: Modelo Relacional ERD & Consola SQL Interactiva (Screen 5)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 font-normal">Base de Datos</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Visualizador del diagrama Entidad-Relación formal, explorador de tablas (DIM_ACTORES, DIM_PRODUCTOS, REG_LOTES, etc.) y consola SQL en tiempo real para verificar integridad referencial y consultas de auditoría.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LÓGICA DE NEGOCIO LÁCTEA */}
      {activeTab === 'business' && (
        <div className="space-y-3">
          {/* Card: Las 4 Logísticas en Lactolanda */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Workflow className="w-4 h-4 text-cyan-600" />
              1. Los 4 Procesos de la Logística Integral en la Cadena de Valor
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              El negocio lácteo de Lactolanda se rige por cuatro dominios operacionales continuos, cada uno con reglas de frío, tiempo y custodia específicas:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-[11px]">
              {/* Entrada */}
              <div className="p-2.5 rounded-lg border border-sky-200 bg-sky-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sky-900 text-xs">1. Logística de Entrada</span>
                  <span className="px-1.5 py-0.2 rounded bg-sky-200 text-sky-900 text-[9px] font-bold">F01-F03</span>
                </div>
                <div className="text-slate-700 text-[10.5px] space-y-1">
                  <p><strong>Objetivo:</strong> Captación higiénica de leche cruda sin cortar la cadena de frío.</p>
                  <p><strong>Puntos Críticos:</strong> Ordeñe mecánico a &lt;4°C, ensayo de estabilidad con alcohol al 72°, control de acidez Dornic (14-18°D) y transporte en cisterna isotérmica.</p>
                  <p className="text-sky-800"><strong>KPI Clave:</strong> Litros captados / Temperatura recepción / Mermas de ordeñe (&lt;0.5%).</p>
                </div>
              </div>

              {/* Intralogística */}
              <div className="p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-900 text-xs">2. Intralogística</span>
                  <span className="px-1.5 py-0.2 rounded bg-indigo-200 text-indigo-900 text-[9px] font-bold">F04</span>
                </div>
                <div className="text-slate-700 text-[10.5px] space-y-1">
                  <p><strong>Objetivo:</strong> Transformación industrial aséptica en Planta Campo 9.</p>
                  <p><strong>Puntos Críticos:</strong> Silos de almacenamiento a 2.8°C, homogeneización a 180 bar, pasteurización HTST (85°C x 20s) o UHT (138°C x 4s) y envasado estéril.</p>
                  <p className="text-indigo-800"><strong>KPI Clave:</strong> Eficiencia térmica / Mermas industriales (&lt;1.2%) / Conteo bacteriano nulo.</p>
                </div>
              </div>

              {/* Salida */}
              <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-blue-900 text-xs">3. Logística de Salida</span>
                  <span className="px-1.5 py-0.2 rounded bg-blue-200 text-blue-900 text-[9px] font-bold">F05-F08</span>
                </div>
                <div className="text-slate-700 text-[10.5px] space-y-1">
                  <p><strong>Objetivo:</strong> Abastecimiento de los 13 CEDIs y capilaridad hacia 65 mayoristas y miles de PDVs.</p>
                  <p><strong>Puntos Críticos:</strong> Distribución en furgones térmicos (3.5°C), gestión de inventario FEFO (First Expired, First Out) y cumplimiento de ventanas horarias.</p>
                  <p className="text-blue-800"><strong>KPI Clave:</strong> OTIF (On-Time In-Full &gt;97%) / Días de inventario regional / Nivel de servicio.</p>
                </div>
              </div>

              {/* Inversa */}
              <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-emerald-900 text-xs">4. Logística Inversa</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 text-[9px] font-bold">F09-F16</span>
                </div>
                <div className="text-slate-700 text-[10.5px] space-y-1">
                  <p><strong>Objetivo:</strong> Bucle de retorno ante productos no conformes o exceso con estricta bio-seguridad.</p>
                  <p><strong>Puntos Críticos:</strong> Aislamiento en cuarentena, no reingresar jamás productos vencidos a la cadena de consumo humano y reciclado de envases plásticos.</p>
                  <p className="text-emerald-800"><strong>KPI Clave:</strong> Tasa de devoluciones (&lt;1.5%) / Tiempo de resolución / Trazabilidad ambiental.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Cerebro de Calidad - Matriz de Disposición de Devoluciones */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              2. Reglas de Negocio del Cerebro de Calidad (Autómata de Disposición)
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              En la logística láctea perecedera no existe el retorno libre sin validación bromatológica. El sistema implementa un autómata determinista según la causal de devolución:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[10px] uppercase">
                  <tr>
                    <th className="p-2">Causal de Retorno</th>
                    <th className="p-2">Condición Física</th>
                    <th className="p-2">Flujo Asignado</th>
                    <th className="p-2">Destino Físico</th>
                    <th className="p-2">Impacto en Inventario</th>
                    <th className="p-2">Regla de Seguridad Sanitaria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[10.5px]">
                  <tr className="hover:bg-rose-50/50">
                    <td className="p-2 font-bold text-rose-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-600" />
                      Vencido (Expirado)
                    </td>
                    <td className="p-2 text-slate-600">Fecha de caducidad sobrepasada en góndola</td>
                    <td className="p-2 font-bold text-slate-900">F14 (Disposición Final)</td>
                    <td className="p-2 text-slate-800">Planta de Tratamiento de Efluentes</td>
                    <td className="p-2 font-bold text-rose-600">Baja Definitiva (Merma 100%)</td>
                    <td className="p-2 text-rose-800 font-semibold">TERMINANTEMENTE PROHIBIDO REEMPACAR O REUTILIZAR. Destrucción inmediata.</td>
                  </tr>

                  <tr className="hover:bg-amber-50/50">
                    <td className="p-2 font-bold text-amber-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      Defectuoso (Microbiológico)
                    </td>
                    <td className="p-2 text-slate-600">Acidez fuera de rango, soplado de sachet o corte</td>
                    <td className="p-2 font-bold text-slate-900">F10 (Retorno por Calidad)</td>
                    <td className="p-2 text-slate-800">Laboratorio Central / Cuarentena</td>
                    <td className="p-2 font-bold text-amber-600">Bloqueo de Lote en ERP</td>
                    <td className="p-2 text-amber-800">Se abre investigación de contra-muestra del lote. Si se confirma falla, se emite Recall.</td>
                  </tr>

                  <tr className="hover:bg-blue-50/50">
                    <td className="p-2 font-bold text-blue-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Averiado (Empaque Secundario)
                    </td>
                    <td className="p-2 text-slate-600">Caja de cartón húmeda o aplastada; sachet/tetra intacto</td>
                    <td className="p-2 font-bold text-slate-900">F12 (Acondicionamiento)</td>
                    <td className="p-2 text-slate-800">Área de Re-Empaque Secundario</td>
                    <td className="p-2 font-bold text-blue-600">Reingreso a PT Acondicionado</td>
                    <td className="p-2 text-blue-800">Se valida esterilidad aséptica individual del envase primario antes de embalar de nuevo.</td>
                  </tr>

                  <tr className="hover:bg-emerald-50/50">
                    <td className="p-2 font-bold text-emerald-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      Exceso (Sobre-Stock)
                    </td>
                    <td className="p-2 text-slate-600">Producto íntegro, frío certificado y &gt;15 días de vida útil</td>
                    <td className="p-2 font-bold text-slate-900">F11 (Reubicación)</td>
                    <td className="p-2 text-slate-800">Cámara Fría del CEDI Zonal</td>
                    <td className="p-2 font-bold text-emerald-600">Reincorporación a Stock Disponible</td>
                    <td className="p-2 text-emerald-800">Reasignación prioritaria al canal HORECA o autoservicios de alta rotación (FEFO).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ARQUITECTURA & GUÍA PARA DESARROLLADORES */}
      {activeTab === 'dev' && (
        <div className="space-y-3">
          {/* Card: Arquitectura Técnica General */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Code2 className="w-4 h-4 text-cyan-600" />
              1. Stack Tecnológico y Principios de Diseño de Código
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              Construido como una Single Page Application (SPA) client-side de alto rendimiento, orientada a visualización de datos operacionales densos:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-[11px]">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[9px] uppercase font-bold block">Frontend Core:</span>
                <strong className="text-slate-900 text-xs block mt-0.5">React 18 + TypeScript + Vite</strong>
                <p className="text-slate-600 text-[10px] mt-1">
                  Ejecución sin recarga con tipado estricto (strict typing) en toda la jerarquía de componentes, interfaces compartidas en <code>src/types.ts</code>.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[9px] uppercase font-bold block">Estilizado & Tema:</span>
                <strong className="text-slate-900 text-xs block mt-0.5">Tailwind CSS 4 • "High Density"</strong>
                <p className="text-slate-600 text-[10px] mt-1">
                  Layout de información compacta sin espacios ociosos, tipografía mono técnica para lotes e identificadores, contraste AA para pantallas de control industrial.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[9px] uppercase font-bold block">Iconografía & Gráficos:</span>
                <strong className="text-slate-900 text-xs block mt-0.5">Lucide React & Canvas Vectorial SVG</strong>
                <p className="text-slate-600 text-[10px] mt-1">
                  Gráficos vectoriales SVG nativos interactivos (diagrama de flujo TGS y mapa de Paraguay) sin librerías externas pesadas, asegurando fluidez a 60 FPS.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Estructura del Árbol de Archivos y Responsabilidades */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-2.5">
              <Layers className="w-4 h-4 text-cyan-600" />
              2. Árbol de Directorios y Separación de Responsabilidades
            </h3>

            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="p-2 rounded bg-slate-900 text-white font-mono text-[10.5px]">
                <div className="text-emerald-400 font-bold mb-1">/src/</div>
                <div className="pl-3 space-y-1 text-slate-300">
                  <div>├── <strong className="text-sky-300">App.tsx</strong>: Orquestador raíz. Administra el estado global compartido (<code>activeScreen</code>, <code>lotsList</code>, <code>devoluciones</code>, <code>inventario</code>).</div>
                  <div>├── <strong className="text-sky-300">types.ts</strong>: Definición de contratos e interfaces de datos (DimActor, RegLote, MayoristaInfo, PdvEntregaItem, etc.).</div>
                  <div>├── <strong className="text-sky-300">data/mockData.ts</strong>: Fuente canónica de datos maestros (13 CEDIs, 65 Mayoristas, catálogo F01-F16, 84 actores).</div>
                  <div>├── <strong className="text-sky-300">components/</strong>:
                    <div className="pl-4 space-y-0.5 mt-0.5 text-slate-400">
                      <div>├── <span className="text-slate-200">Sidebar.tsx</span>: Navegación lateral entre las 6 pantallas con badges dinámicos de alertas.</div>
                      <div>├── <span className="text-slate-200">Header.tsx</span>: Barra superior con título de pantalla, contexto académico y contadores.</div>
                      <div>├── <span className="text-slate-200">ExportModal.tsx</span>: Diálogo modal con instrucciones de clonado para VS Code y GitHub.</div>
                      <div>└── <span className="text-slate-200">screens/</span>:
                        <div className="pl-4 space-y-0.5 text-slate-300">
                          <div>├── <span className="text-amber-300">Screen1SystemDiagram.tsx</span>: Lienzo TGS con 12 nodos y conmutador de 4 logísticas.</div>
                          <div>├── <span className="text-amber-300">Screen2Traceability.tsx</span>: Árbol genealógico de lotes y conmutador de bloqueo ERP.</div>
                          <div>├── <span className="text-amber-300">Screen3InventoryDistribution.tsx</span>: Mapa de Paraguay, stock de 13 CEDIs y 65 mayoristas.</div>
                          <div>├── <span className="text-amber-300">Screen4ReverseLogistics.tsx</span>: Consola de devoluciones con autómata de calidad.</div>
                          <div>├── <span className="text-amber-300">Screen5DatabaseViewer.tsx</span>: Diagrama ERD y consola de simulación SQL.</div>
                          <div>└── <span className="text-amber-300">Screen6ArchitectureDocs.tsx</span>: Memoria técnica, lógica de negocio y manual integral.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Patrones de Flujo de Datos y Reactividad */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <Cpu className="w-4 h-4 text-cyan-600" />
              3. Flujo de Datos y Propagación de Estados (Data Flow)
            </h3>
            <p className="text-[11px] text-slate-600 mb-2">
              Para garantizar que las acciones en una pantalla afecten a las demás sin necesidad de un backend pesado en la versión beta:
            </p>

            <div className="space-y-1.5 font-mono text-[10.5px]">
              <div className="p-2 rounded border border-slate-200 bg-slate-50 flex items-start gap-2">
                <span className="w-5 h-5 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <div>
                  <strong className="text-slate-900">Bloqueo de Lote (Recall):</strong>
                  <span className="text-slate-600 ml-1">Cuando el usuario hace clic en "Bloquear Lote en ERP" en Screen 2 o 4, se invoca <code>handleToggleLotStatus()</code> en <code>App.tsx</code>. Esto actualiza <code>lotsList</code>, disparando inmediatamente el badge de advertencia en el Sidebar, el contador en el Header y la barra inferior de telemetría.</span>
                </div>
              </div>

              <div className="p-2 rounded border border-slate-200 bg-slate-50 flex items-start gap-2">
                <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <div>
                  <strong className="text-slate-900">Registro de Devolución Inversa:</strong>
                  <span className="text-slate-600 ml-1">Al guardar un retorno en Screen 4, <code>handleAddDevolucion()</code> agrega el registro a <code>devoluciones</code> e inserta simultáneamente un movimiento complementario en <code>inventario</code> (asociando F10, F11 o F14). Luego, en Screen 1 (tabla de inventario) y Screen 5 (tabla TRANS_DEVOLUCIONES), el nuevo registro aparece al instante.</span>
                </div>
              </div>

              <div className="p-2 rounded border border-slate-200 bg-slate-50 flex items-start gap-2">
                <span className="w-5 h-5 rounded bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                <div>
                  <strong className="text-slate-900">Navegación Cruzada entre Módulos:</strong>
                  <span className="text-slate-600 ml-1">Todas las pantallas reciben <code>onNavigateScreen(screenNumber)</code>. Esto permite que desde un nodo en Screen 1 se salte directo al CEDI en Screen 3 o al lote en Screen 2 sin perder el contexto visual.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MANUAL DE USUARIO POR MÓDULO */}
      {activeTab === 'userguide' && (
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-4 h-4 text-cyan-600" />
              Manual Operativo de la Cadena de Valor (Paso a Paso para Usuarios)
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              A continuación se detalla qué hace cada módulo de la barra lateral, para qué sirve y qué interacción realizar en él:
            </p>

            <div className="space-y-2.5 font-mono text-[11px]">
              {/* Screen 1 Guide */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">1</span>
                    <h4 className="font-bold text-xs text-slate-900">Módulo 1: Diagrama Sistémico Interactivo (TGS)</h4>
                  </div>
                  <button
                    onClick={() => onNavigateScreen(1)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-[10px] font-bold cursor-pointer"
                  >
                    <span>Ir a Pantalla 1</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-600 text-[10.5px] mb-2 leading-relaxed">
                  <strong>¿Para qué sirve?:</strong> Es el cuadro de mando principal de la empresa. Muestra de un solo vistazo los 12 eslabones de la cadena desde el campo hasta el consumidor final y cómo fluyen los materiales e información.
                </p>
                <div className="bg-white p-2 rounded border border-slate-200 text-[10px] space-y-1">
                  <div>• <strong>Filtro Superior de las 4 Logísticas:</strong> Haz clic en los botones superiores para aislar la cadena (Entrada, Intralogística, Salida, Inversa). Verás cómo los nodos no activos se atenúan automáticamente.</div>
                  <div>• <strong>Inspector Lateral:</strong> Haz clic sobre cualquier nodo del lienzo (ej: <em>Silos y Pasteurización</em> o <em>13 CEDI</em>). En el panel derecho se desplegarán sus métricas en tiempo real (Stock, Mermas, OTIF) y los flujos activos con su responsable y KPI.</div>
                  <div>• <strong>Monitor de Inventario Inferior:</strong> Muestra la tabla <code>TRANS_INVENTARIO</code> en tiempo real con los últimos despachos y recepciones.</div>
                </div>
              </div>

              {/* Screen 2 Guide */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">2</span>
                    <h4 className="font-bold text-xs text-slate-900">Módulo 2: Monitor de Trazabilidad de Lotes (Traceability Tree)</h4>
                  </div>
                  <button
                    onClick={() => onNavigateScreen(2)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[10px] font-bold cursor-pointer"
                  >
                    <span>Ir a Pantalla 2</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-600 text-[10.5px] mb-2 leading-relaxed">
                  <strong>¿Para qué sirve?:</strong> Permite auditar el ADN completo de cualquier lote de yogur, leche, queso o dulce de leche, rastreando hacia atrás de qué tambos salió la leche y hacia qué CEDI se envió.
                </p>
                <div className="bg-white p-2 rounded border border-slate-200 text-[10px] space-y-1">
                  <div>• <strong>Buscador y Chips de Lotes:</strong> Escribe un código o haz clic en los chips rápidos (ej: <code>LOT-YOG-2026-004</code>).</div>
                  <div>• <strong>Árbol Genealógico Jerárquico:</strong> Observa la conexión ramificada en 5 niveles: Nivel 1 (Tamberos), Nivel 2 (Acopiador), Nivel 3 (Pasteurización y Ensayos), Nivel 4 (CEDI Destino) y Nivel 5 (Mayoristas).</div>
                  <div>• <strong>Botón Recall ERP:</strong> Presiona "Bloquear Lote en ERP" para simular una alerta sanitaria y comprobar cómo se propaga el aviso de retiro a toda la empresa.</div>
                </div>
              </div>

              {/* Screen 3 Guide */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">3</span>
                    <h4 className="font-bold text-xs text-slate-900">Módulo 3: Control de Inventario y Distribución Capilar</h4>
                  </div>
                  <button
                    onClick={() => onNavigateScreen(3)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-[10px] font-bold cursor-pointer"
                  >
                    <span>Ir a Pantalla 3</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-600 text-[10.5px] mb-2 leading-relaxed">
                  <strong>¿Para qué sirve?:</strong> Monitorea los 3,313,000 litros de stock refrigerado en los 13 almacenes zonales propios de Paraguay y supervisa los 65 furgones de mayoristas que entregan a las góndolas.
                </p>
                <div className="bg-white p-2 rounded border border-slate-200 text-[10px] space-y-1">
                  <div>• <strong>Mapa SVG de Paraguay:</strong> Pasa el ratón sobre los 13 pines del mapa para ver stock y temperatura en tiempo real. Haz clic en un CEDI (ej: Z5 Ciudad del Este) para seleccionarlo.</div>
                  <div>• <strong>Selector de los 65 Mayoristas:</strong> Elige cualquiera de los 65 distribuidores para auditar su furgón térmico, chofer autorizado y desempeño OTIF.</div>
                  <div>• <strong>Hojas de Ruta y 5 PDVs:</strong> Revisa el cronograma de lunes a viernes y el estado exacto de entrega (Entregado, En Ruta, Pendiente) en Supermercados, Autoservicios, Despensas, Tiendas de Conveniencia y HORECA.</div>
                </div>
              </div>

              {/* Screen 4 Guide */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-amber-600 text-white flex items-center justify-center font-bold text-xs">4</span>
                    <h4 className="font-bold text-xs text-slate-900">Módulo 4: Consola de Gestión de Devoluciones (Logística Inversa)</h4>
                  </div>
                  <button
                    onClick={() => onNavigateScreen(4)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 text-[10px] font-bold cursor-pointer"
                  >
                    <span>Ir a Pantalla 4</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-600 text-[10.5px] mb-2 leading-relaxed">
                  <strong>¿Para qué sirve?:</strong> Resuelve el bucle de retorno de productos devueltos por los clientes, garantizando que los productos en mal estado jamás vuelvan al mercado y procesando mermas o reingresos.
                </p>
                <div className="bg-white p-2 rounded border border-slate-200 text-[10px] space-y-1">
                  <div>• <strong>Registrar Nueva Devolución:</strong> Completa el formulario seleccionando el lote, origen y la causal (Vencido, Defectuoso, Averiado, Exceso).</div>
                  <div>• <strong>Cerebro de Calidad Automático:</strong> El sistema aplica la regla normativa en milisegundos y te indica si el producto va a destrucción de efluentes, re-empaque o stock disponible.</div>
                </div>
              </div>

              {/* Screen 5 Guide */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-purple-600 text-white flex items-center justify-center font-bold text-xs">5</span>
                    <h4 className="font-bold text-xs text-slate-900">Módulo 5: Base de Datos & Visualizador SQL</h4>
                  </div>
                  <button
                    onClick={() => onNavigateScreen(5)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-[10px] font-bold cursor-pointer"
                  >
                    <span>Ir a Pantalla 5</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-600 text-[10.5px] mb-2 leading-relaxed">
                  <strong>¿Para qué sirve?:</strong> Demuestra la solidez del modelo de datos formal en Tercera Forma Normal (3NF), permitiendo auditar llaves primarias, foráneas y ejecutar consultas SQL de prueba.
                </p>
                <div className="bg-white p-2 rounded border border-slate-200 text-[10px] space-y-1">
                  <div>• <strong>Diagrama ERD:</strong> Visualiza cómo se conectan las tablas maestras con las tablas transaccionales.</div>
                  <div>• <strong>Consola SQL Interactiva:</strong> Ejecuta consultas SELECT prediseñadas para verificar la persistencia y cálculos de stock.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MATRIZ DE FLUJOS F01-F16 & 84 ACTORES */}
      {activeTab === 'matrix' && (
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-600" />
                  Matriz Completa de los 16 Flujos Transaccionales (Tabla 1)
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">
                  Mapeo oficial de los 16 flujos entre los 84 actores de la red de Lactolanda
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                16 Flujos Certificados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[9.5px] uppercase">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Logística</th>
                    <th className="p-2">Área Origen</th>
                    <th className="p-2">Área Destino</th>
                    <th className="p-2">Motivo / Recurso</th>
                    <th className="p-2">Responsable</th>
                    <th className="p-2">KPI Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[10px]">
                  {FLUJOS_TABLA_DATA.map((flujo) => {
                    const isReverse = flujo.tipo_logistica === 'Inversa';
                    return (
                      <tr key={flujo.id_flujo} className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 font-bold">
                          <span className={`px-1.5 py-0.2 rounded ${
                            isReverse ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {flujo.id_flujo}
                          </span>
                        </td>
                        <td className="p-2">
                          <span className={`px-1 py-0.2 rounded text-[9px] font-semibold ${
                            flujo.tipo_logistica === 'Entrada' ? 'bg-sky-50 text-sky-700' :
                            flujo.tipo_logistica === 'Intralogística' ? 'bg-indigo-50 text-indigo-700' :
                            flujo.tipo_logistica === 'Salida' ? 'bg-blue-50 text-blue-700' :
                            'bg-emerald-50 text-emerald-700'
                          }`}>
                            {flujo.tipo_logistica}
                          </span>
                        </td>
                        <td className="p-2 text-slate-800">{flujo.area_origen}</td>
                        <td className="p-2 text-slate-800">{flujo.area_destino}</td>
                        <td className="p-2 text-slate-600">{flujo.motivo_o_recurso}</td>
                        <td className="p-2 text-slate-700 font-semibold">{flujo.responsable}</td>
                        <td className="p-2 font-bold text-blue-700">{flujo.kpi_control}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
