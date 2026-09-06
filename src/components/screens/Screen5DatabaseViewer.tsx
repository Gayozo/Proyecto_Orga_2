import React, { useEffect, useRef, useState } from 'react';
import { 
  Database, 
  Terminal, 
  Table, 
  Play, 
  Copy, 
  Check, 
  Code2, 
  Layers, 
  ArrowDownUp, 
  Info, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import mermaid from 'mermaid';
import { TransDevolucion, TransInventario } from '../../types';
import { 
  DIM_ACTORES_DATA, 
  PRODUCTOS_DATA, 
  LOTES_DATA, 
  FLUJOS_TABLA_DATA 
} from '../../data/mockData';

interface Screen5Props {
  devoluciones: TransDevolucion[];
  inventario: TransInventario[];
}

export const Screen5DatabaseViewer: React.FC<Screen5Props> = ({
  devoluciones,
  inventario
}) => {
  const [activeTab, setActiveTab] = useState<'erd' | 'tables' | 'query' | 'flujos'>('erd');
  const [selectedTable, setSelectedTable] = useState<string>('TRANS_DEVOLUCIONES');
  const [copiedSql, setCopiedSql] = useState(false);

  // SQL Query Runner Parameters
  const [queryCedi, setQueryCedi] = useState('CEDI Este');
  const [queryTipo, setQueryTipo] = useState('Vencido');
  const [queryExecuted, setQueryExecuted] = useState(true);
  const [queryResult, setQueryResult] = useState<{
    sum: number;
    rows: {
      id_devolucion: number;
      producto: string;
      lote: string;
      cantidad: number;
      actor_destino: string;
      tipo: string;
      fecha: string;
    }[];
  }>({ sum: 485, rows: [] });

  const mermaidRef = useRef<HTMLDivElement>(null);

  // Initialize Mermaid on mount
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      securityLevel: 'loose',
      er: {
        useMaxWidth: true
      }
    });

    const renderMermaid = async () => {
      if (mermaidRef.current) {
        try {
          const chartDefinition = `erDiagram
    DIM_ACTORES {
        int id_actor PK
        string nombre_actor
        string tipo_actor
        string dominio_logistico
    }
    DIM_PRODUCTOS {
        int id_producto PK
        string nombre_producto
        string categoria
        int vida_util_dias
    }
    REG_LOTES {
        string id_lote PK
        int fk_producto FK
        date fecha_fabricacion
        date fecha_vencimiento
        string estado_calidad
    }
    TRANS_INVENTARIO {
        int id_movimiento PK
        string fk_lote FK
        int fk_actor_origen FK
        int fk_actor_destino FK
        float cantidad
        datetime fecha_hora
        string id_flujo_asociado
    }
    TRANS_DEVOLUCIONES {
        int id_devolucion PK
        int fk_movimiento_origen FK
        string tipo_devolucion
        float cantidad_devuelta
        string estado_proceso
        string destino_final
        datetime fecha_registro
    }
    FAC_NOTAS_CREDITO {
        string id_nota_credito PK
        string nro_comprobante_nc
        string timbrado_nro
        string cdc
        datetime fecha_emision
        int fk_devolucion FK
        string fk_lote FK
        string fk_distribuidor_codigo
        string ruc_distribuidor
        string factura_venta_afectada
        int cantidad_unidades
        float precio_unitario_gs
        float gravada_5_gs
        float iva_5_gs
        float total_nc_gs
        string estado_dnit
    }

    DIM_ACTORES ||--o{ TRANS_INVENTARIO : "actua como origen/destino"
    DIM_PRODUCTOS ||--o{ REG_LOTES : "pertenece a"
    REG_LOTES ||--o{ TRANS_INVENTARIO : "se mueve en"
    TRANS_INVENTARIO ||--o{ TRANS_DEVOLUCIONES : "genera un retorno"
    TRANS_DEVOLUCIONES ||--|| FAC_NOTAS_CREDITO : "respalda fiscalmente"`;

          mermaidRef.current.innerHTML = '';
          const { svg } = await mermaid.render('lactolanda-erd-svg', chartDefinition);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        } catch (err) {
          console.error('Mermaid rendering error:', err);
        }
      }
    };

    if (activeTab === 'erd') {
      renderMermaid();
    }
  }, [activeTab]);

  // Execute relational calculation for the query runner
  const executeQuery = () => {
    // Relational join in memory mimicking SQL:
    // JOIN TRANS_DEVOLUCIONES d ON d.fk_movimiento_origen = i.id_movimiento
    // JOIN DIM_ACTORES a ON i.fk_actor_destino = a.id_actor
    const filteredDevs = devoluciones.filter((d) => {
      const matchTipo = queryTipo === 'TODOS' || d.tipo_devolucion === queryTipo;
      const matchCedi = d.nombre_destino.toLowerCase().includes(queryCedi.toLowerCase().replace('cedi ', ''));
      return matchTipo && matchCedi;
    });

    const sum = filteredDevs.reduce((acc, curr) => acc + curr.cantidad_devuelta, 0);
    const rows = filteredDevs.map((d) => ({
      id_devolucion: d.id_devolucion,
      producto: d.nombre_producto,
      lote: d.fk_lote,
      cantidad: d.cantidad_devuelta,
      actor_destino: d.nombre_destino,
      tipo: d.tipo_devolucion,
      fecha: d.fecha_registro
    }));

    setQueryResult({ sum, rows });
    setQueryExecuted(true);
  };

  useEffect(() => {
    executeQuery();
  }, [queryCedi, queryTipo, devoluciones]);

  const rawDdl = `-- DDL Esquema Relacional Lactolanda (PostgreSQL / SQLite)
-- Base de datos normalizada para Logística Integral y Trazabilidad TGS

CREATE TABLE DIM_ACTORES (
    id_actor SERIAL PRIMARY KEY,
    nombre_actor VARCHAR(150) NOT NULL,
    tipo_actor VARCHAR(50) NOT NULL CHECK (tipo_actor IN ('Tambo', 'Acopiador', 'Empresa', 'CEDI', 'Mayorista', 'PDV', 'Consumidor')),
    dominio_logistico VARCHAR(80) NOT NULL
);

CREATE TABLE DIM_PRODUCTOS (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(150) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    vida_util_dias INT NOT NULL
);

CREATE TABLE REG_LOTES (
    id_lote VARCHAR(50) PRIMARY KEY,
    fk_producto INT NOT NULL REFERENCES DIM_PRODUCTOS(id_producto),
    fecha_fabricacion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    estado_calidad VARCHAR(50) NOT NULL DEFAULT 'Aprobado'
);

CREATE TABLE TRANS_INVENTARIO (
    id_movimiento SERIAL PRIMARY KEY,
    fk_lote VARCHAR(50) NOT NULL REFERENCES REG_LOTES(id_lote),
    fk_actor_origen INT NOT NULL REFERENCES DIM_ACTORES(id_actor),
    fk_actor_destino INT NOT NULL REFERENCES DIM_ACTORES(id_actor),
    cantidad NUMERIC(12, 2) NOT NULL,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_flujo_asociado VARCHAR(10) NOT NULL -- F01 a F08
);

CREATE TABLE TRANS_DEVOLUCIONES (
    id_devolucion SERIAL PRIMARY KEY,
    fk_movimiento_origen INT NOT NULL REFERENCES TRANS_INVENTARIO(id_movimiento),
    tipo_devolucion VARCHAR(50) NOT NULL CHECK (tipo_devolucion IN ('Defectuoso', 'Averiado', 'Exceso', 'Vencido')),
    cantidad_devuelta NUMERIC(12, 2) NOT NULL,
    estado_proceso VARCHAR(80) NOT NULL,
    destino_final VARCHAR(100) NOT NULL, -- Destrucción / Re-empaque / Desvío
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TABLA 6: NOTAS DE CRÉDITO ELECTRÓNICAS (SIFEN / DNIT PARAGUAY)
CREATE TABLE FAC_NOTAS_CREDITO (
    id_nota_credito VARCHAR(30) PRIMARY KEY,
    nro_comprobante_nc VARCHAR(20) NOT NULL UNIQUE,
    timbrado_nro VARCHAR(15) NOT NULL,
    cdc VARCHAR(44) NOT NULL UNIQUE,
    fecha_emision TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fk_devolucion INT NOT NULL UNIQUE REFERENCES TRANS_DEVOLUCIONES(id_devolucion),
    fk_lote VARCHAR(50) NOT NULL REFERENCES REG_LOTES(id_lote),
    nombre_producto VARCHAR(150) NOT NULL,
    fk_distribuidor_codigo VARCHAR(20) NOT NULL,
    nombre_distribuidor VARCHAR(150) NOT NULL,
    ruc_distribuidor VARCHAR(20) NOT NULL,
    factura_venta_afectada VARCHAR(25) NOT NULL,
    furgon_frio VARCHAR(100),
    cantidad_unidades INT NOT NULL,
    precio_unitario_gs NUMERIC(12, 2) NOT NULL,
    gravada_5_gs NUMERIC(14, 2) NOT NULL,
    iva_5_gs NUMERIC(14, 2) NOT NULL, -- Liquidación IVA 5% según Ley 6380/19
    total_nc_gs NUMERIC(14, 2) NOT NULL,
    motivo_nc VARCHAR(255) NOT NULL,
    estado_dnit VARCHAR(30) NOT NULL DEFAULT 'Aprobado SIFEN'
);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rawDdl);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col p-3.5 overflow-y-auto bg-slate-100 select-none">
      {/* Top Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs mb-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-purple-700 uppercase tracking-wider mb-0.5">
              <Database className="w-3.5 h-3.5 text-purple-600" />
              Arquitectura de Datos Relacional & Auditoría
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight font-mono">
              Visualizador y Estructura de Base de Datos
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              6 tablas maestras (DIM, TRANS y FAC) que sustentan la trazabilidad de flujos directos (F01-F08), inversos (F09-F16) y respaldo legal KuDE (DNIT).
            </p>
          </div>

          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-mono font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
          >
            {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSql ? 'DDL Copiado' : 'Copiar DDL SQL'}</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2.5">
          <button
            onClick={() => setActiveTab('erd')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'erd'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Diagrama ERD (Mermaid)</span>
          </button>

          <button
            onClick={() => setActiveTab('query')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'query'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Motor Consulta SQL</span>
          </button>

          <button
            onClick={() => setActiveTab('tables')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tables'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Diccionario de Tablas (6)</span>
          </button>

          <button
            onClick={() => setActiveTab('flujos')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'flujos'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Flujos F01 - F16</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ERD MERMAID */}
      {activeTab === 'erd' && (
        <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-slate-900">
                Diagrama Entidad-Relación Dinámico (Mermaid.js)
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Llaves primarias (PK), foráneas (FK) y cardinalidades de la cadena
              </p>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
              Mermaid.js v11
            </span>
          </div>

          <div
            ref={mermaidRef}
            className="flex-1 flex items-center justify-center p-2.5 bg-slate-50/50 rounded border border-slate-100 min-h-[380px] overflow-x-auto"
          >
            <div className="text-[11px] font-mono text-slate-400 animate-pulse">Renderizando diagrama ERD Mermaid...</div>
          </div>

          {/* Relational explanations */}
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">DIM_ACTORES → TRANS_INVENTARIO</span>
              <p className="text-[9px] text-slate-500 mt-0.5">
                1 a N. Origen o destino de cada movimiento.
              </p>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">DIM_PRODUCTOS → REG_LOTES</span>
              <p className="text-[9px] text-slate-500 mt-0.5">
                1 a N. Catálogo a lotes con vida útil.
              </p>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">REG_LOTES → TRANS_INVENTARIO</span>
              <p className="text-[9px] text-slate-500 mt-0.5">
                1 a N. Trazabilidad por lote en movimientos.
              </p>
            </div>

            <div className="p-2 rounded bg-purple-50 border border-purple-200">
              <span className="font-bold text-purple-900">TRANS_INVENTARIO → TRANS_DEVOLUCIONES</span>
              <p className="text-[9px] text-purple-700 mt-0.5">
                1 a N. Vincula retorno a pedido original.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SQL QUERY RUNNER */}
      {activeTab === 'query' && (
        <div className="space-y-3">
          <div className="bg-slate-900 text-white rounded-lg p-3 shadow-xs border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold font-mono text-white">
                  Consola SQL Interactiva • Consultas Directivas
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Motor En-Memoria</span>
            </div>

            {/* Exact query from user prompt */}
            <div className="mt-2.5 p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
              <span className="text-blue-400">SELECT</span> <span className="text-yellow-300">SUM</span>(d.cantidad_devuelta) <span className="text-blue-400">AS</span> total_retirado<br />
              <span className="text-blue-400">FROM</span> TRANS_DEVOLUCIONES d<br />
              <span className="text-blue-400">JOIN</span> TRANS_INVENTARIO i <span className="text-blue-400">ON</span> d.fk_movimiento_origen = i.id_movimiento<br />
              <span className="text-blue-400">JOIN</span> DIM_ACTORES a <span className="text-blue-400">ON</span> i.fk_actor_destino = a.id_actor<br />
              <span className="text-blue-400">WHERE</span> d.tipo_devolucion = <span className="text-amber-400">'{queryTipo}'</span><br />
              &nbsp;&nbsp;<span className="text-blue-400">AND</span> a.nombre_actor = <span className="text-amber-400">'{queryCedi}'</span>;
            </div>

            {/* Interactive Query Filters */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-slate-400 mb-0.5">
                  CEDI Objetivo (Actor Destino):
                </label>
                <select
                  value={queryCedi}
                  onChange={(e) => setQueryCedi(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-white focus:border-emerald-400 outline-none"
                >
                  <option value="CEDI Este">CEDI Este (Ciudad del Este)</option>
                  <option value="CEDI Asunción">CEDI Asunción (Capital)</option>
                  <option value="CEDI Caaguazú">CEDI Caaguazú (Campo 9)</option>
                  <option value="CEDI Villarrica">CEDI Villarrica</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-slate-400 mb-0.5">
                  Motivo de Devolución:
                </label>
                <select
                  value={queryTipo}
                  onChange={(e) => setQueryTipo(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-white focus:border-emerald-400 outline-none"
                >
                  <option value="Vencido">Vencido (Caducado en góndola)</option>
                  <option value="Defectuoso">Defectuoso (Mal estado)</option>
                  <option value="Averiado">Averiado (Envase dañado)</option>
                  <option value="Exceso">Exceso de Inventario</option>
                  <option value="TODOS">TODOS los motivos</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={executeQuery}
                  className="w-full py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Ejecutar SQL</span>
                </button>
              </div>
            </div>

            {/* Query Result Card */}
            <div className="mt-3 p-2.5 rounded bg-slate-800/80 border border-slate-700 flex flex-wrap items-center justify-between gap-3 font-mono">
              <div>
                <div className="text-[10px] text-slate-400">Resultado SUM():</div>
                <div className="text-xl font-extrabold text-emerald-400">
                  {queryResult.sum}{' '}
                  <span className="text-xs font-medium text-slate-300">Litros / Unid.</span>
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-400">
                <div>Filas JOIN: <strong className="text-white">{queryResult.rows.length}</strong></div>
                <div className="text-emerald-400 font-semibold mt-0.5">0.04ms</div>
              </div>
            </div>

            {/* Resulting records breakdown */}
            {queryResult.rows.length > 0 && (
              <div className="mt-2.5">
                <div className="text-[10px] font-mono font-semibold text-slate-400 mb-1">Registros Asociados:</div>
                <div className="overflow-x-auto rounded border border-slate-800">
                  <table className="w-full text-[10px] font-mono text-left">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[9px]">
                      <tr>
                        <th className="p-1.5">ID Dev</th>
                        <th className="p-1.5">Producto</th>
                        <th className="p-1.5">Lote</th>
                        <th className="p-1.5">Cantidad</th>
                        <th className="p-1.5">Destino</th>
                        <th className="p-1.5">Tipo</th>
                        <th className="p-1.5">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {queryResult.rows.map((r) => (
                        <tr key={r.id_devolucion} className="hover:bg-slate-800/50">
                          <td className="p-1.5 text-emerald-400">#{r.id_devolucion}</td>
                          <td className="p-1.5 font-sans font-semibold">{r.producto}</td>
                          <td className="p-1.5 text-slate-400">{r.lote}</td>
                          <td className="p-1.5 font-bold">{r.cantidad} u.</td>
                          <td className="p-1.5">{r.actor_destino}</td>
                          <td className="p-1.5">
                            <span className="px-1.5 py-0.2 rounded bg-rose-900/50 text-rose-300 font-bold text-[9px]">
                              {r.tipo}
                            </span>
                          </td>
                          <td className="p-1.5 text-slate-400">{r.fecha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: TABLES DICTIONARY */}
      {activeTab === 'tables' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Table List Selector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 p-3 shadow-xs space-y-1.5">
            <h3 className="text-xs font-bold font-mono text-slate-900 pb-2 border-b border-slate-100">
              Catálogo de Tablas
            </h3>

            {[
              { name: 'DIM_ACTORES', desc: 'Maestra de Actores TGS' },
              { name: 'DIM_PRODUCTOS', desc: 'Catálogo de Lácteos con vida útil' },
              { name: 'REG_LOTES', desc: 'Trazabilidad y Genealogía' },
              { name: 'TRANS_INVENTARIO', desc: 'Flujos Directos (F01 a F08)' },
              { name: 'TRANS_DEVOLUCIONES', desc: 'Logística Inversa (F09 a F16)' },
              { name: 'FAC_NOTAS_CREDITO', desc: 'Comprobantes Electrónicos KuDE (SIFEN / DNIT)' },
            ].map((tbl) => {
              const isSelected = selectedTable === tbl.name;
              return (
                <button
                  key={tbl.name}
                  onClick={() => setSelectedTable(tbl.name)}
                  className={`w-full p-2 rounded text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div className="font-mono font-bold text-xs">{tbl.name}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                    {tbl.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Table Schema Details (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-purple-600" />
              {selectedTable}
            </h3>

            {selectedTable === 'DIM_ACTORES' && (
              <div className="mt-2.5 text-xs space-y-2">
                <p className="text-[11px] text-slate-600">
                  <strong>Propósito:</strong> Almacena todos los nodos del sistema abierto. Fuente única de verdad para evitar datos huérfanos.
                </p>
                <div className="overflow-x-auto rounded border border-slate-200">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[9px] font-mono">
                      <tr>
                        <th className="p-2">Campo</th>
                        <th className="p-2">Tipo</th>
                        <th className="p-2">Llave</th>
                        <th className="p-2">Descripción & Regla</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
                      <tr><td className="p-2 font-bold text-purple-700">id_actor</td><td className="p-2">INT</td><td className="p-2 font-bold text-rose-600">PK</td><td className="p-2 font-sans">Identificador único del actor</td></tr>
                      <tr><td className="p-2 font-bold">nombre_actor</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Nombre (ej: Tamberos, Acopiador Z1, CEDI Este)</td></tr>
                      <tr><td className="p-2 font-bold">tipo_actor</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Tambo, Acopiador, Empresa, CEDI, Mayorista, PDV, Consumidor</td></tr>
                      <tr><td className="p-2 font-bold">dominio_logistico</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Aprovisionamiento, Intralogística, Distribución, o N/A</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTable === 'DIM_PRODUCTOS' && (
              <div className="mt-2.5 text-xs space-y-2">
                <p className="text-[11px] text-slate-600">
                  <strong>Propósito:</strong> Catálogo maestro de productos procesados en planta Campo 9 con vida útil regulada.
                </p>
                <div className="overflow-x-auto rounded border border-slate-200">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[9px] font-mono">
                      <tr>
                        <th className="p-2">Campo</th>
                        <th className="p-2">Tipo</th>
                        <th className="p-2">Llave</th>
                        <th className="p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
                      <tr><td className="p-2 font-bold text-purple-700">id_producto</td><td className="p-2">INT</td><td className="p-2 font-bold text-rose-600">PK</td><td className="p-2 font-sans">Identificador único del producto</td></tr>
                      <tr><td className="p-2 font-bold">nombre_producto</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Nombre comercial (ej: Leche Entera 1L, Yogur Frutilla)</td></tr>
                      <tr><td className="p-2 font-bold">categoria</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Leches, Yogures, Quesos, Grasas y Dulces</td></tr>
                      <tr><td className="p-2 font-bold">vida_util_dias</td><td className="p-2">INT</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Días para cálculo de vencimiento</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTable === 'REG_LOTES' && (
              <div className="mt-2.5 text-xs space-y-2">
                <p className="text-[11px] text-slate-600">
                  <strong>Propósito:</strong> Amarre indisoluble del producto terminado con su fecha crítica de vencimiento y origen del acopio.
                </p>
                <div className="overflow-x-auto rounded border border-slate-200">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[9px] font-mono">
                      <tr>
                        <th className="p-2">Campo</th>
                        <th className="p-2">Tipo</th>
                        <th className="p-2">Llave</th>
                        <th className="p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
                      <tr><td className="p-2 font-bold text-purple-700">id_lote</td><td className="p-2">VARCHAR</td><td className="p-2 font-bold text-rose-600">PK</td><td className="p-2 font-sans">Código alfanumérico único (ej: LOT-YOG-2026-004)</td></tr>
                      <tr><td className="p-2 font-bold">fk_producto</td><td className="p-2">INT</td><td className="p-2 font-bold text-blue-600">FK</td><td className="p-2 font-sans">Apunta a DIM_PRODUCTOS(id_producto)</td></tr>
                      <tr><td className="p-2 font-bold">fecha_fabricacion</td><td className="p-2">DATE</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Día de elaboración y pasteurización</td></tr>
                      <tr><td className="p-2 font-bold">fecha_vencimiento</td><td className="p-2">DATE</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Calculado sumando vida_util_dias</td></tr>
                      <tr><td className="p-2 font-bold">estado_calidad</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Aprobado, En Cuarentena, Bloqueado ERP, Retirado</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTable === 'TRANS_INVENTARIO' && (
              <div className="mt-2.5 text-xs space-y-2">
                <p className="text-[11px] text-slate-600">
                  <strong>Propósito:</strong> Almacena cada movimiento físico de stock de la cadena directa (F01 a F08).
                </p>
                <div className="overflow-x-auto rounded border border-slate-200">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[9px] font-mono">
                      <tr>
                        <th className="p-2">Campo</th>
                        <th className="p-2">Tipo</th>
                        <th className="p-2">Llave</th>
                        <th className="p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
                      <tr><td className="p-2 font-bold text-purple-700">id_movimiento</td><td className="p-2">INT</td><td className="p-2 font-bold text-rose-600">PK</td><td className="p-2 font-sans">Correlativo de movimiento</td></tr>
                      <tr><td className="p-2 font-bold">fk_lote</td><td className="p-2">VARCHAR</td><td className="p-2 font-bold text-blue-600">FK</td><td className="p-2 font-sans">Apunta a REG_LOTES(id_lote)</td></tr>
                      <tr><td className="p-2 font-bold">fk_actor_origen</td><td className="p-2">INT</td><td className="p-2 font-bold text-blue-600">FK</td><td className="p-2 font-sans">Actor que entrega el stock</td></tr>
                      <tr><td className="p-2 font-bold">fk_actor_destino</td><td className="p-2">INT</td><td className="p-2 font-bold text-blue-600">FK</td><td className="p-2 font-sans">Actor que recibe el stock</td></tr>
                      <tr><td className="p-2 font-bold">cantidad</td><td className="p-2">NUMERIC</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Volumen o unidades físicas</td></tr>
                      <tr><td className="p-2 font-bold">id_flujo_asociado</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">F01, F02, F03, F04, F05, F06, F07, F08</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTable === 'TRANS_DEVOLUCIONES' && (
              <div className="mt-2.5 text-xs space-y-2">
                <p className="text-[11px] text-slate-600">
                  <strong>Propósito:</strong> Registra y rastrea las devoluciones bajo la lógica de motivos (a, b, c, d) y sus destinos finales.
                </p>
                <div className="overflow-x-auto rounded border border-slate-200">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[9px] font-mono">
                      <tr>
                        <th className="p-2">Campo</th>
                        <th className="p-2">Tipo</th>
                        <th className="p-2">Llave</th>
                        <th className="p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
                      <tr><td className="p-2 font-bold text-purple-700">id_devolucion</td><td className="p-2">INT</td><td className="p-2 font-bold text-rose-600">PK</td><td className="p-2 font-sans">Número de orden de devolución</td></tr>
                      <tr><td className="p-2 font-bold">fk_movimiento_origen</td><td className="p-2">INT</td><td className="p-2 font-bold text-blue-600">FK</td><td className="p-2 font-sans">Vincula con TRANS_INVENTARIO</td></tr>
                      <tr><td className="p-2 font-bold">tipo_devolucion</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Defectuoso, Averiado, Exceso, Vencido</td></tr>
                      <tr><td className="p-2 font-bold">cantidad_devuelta</td><td className="p-2">NUMERIC</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Litros o unidades retornadas</td></tr>
                      <tr><td className="p-2 font-bold">estado_proceso</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Estado de inspección y tránsito</td></tr>
                      <tr><td className="p-2 font-bold">destino_final</td><td className="p-2">VARCHAR</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Destrucción / Re-empaque / Desvío</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTable === 'FAC_NOTAS_CREDITO' && (
              <div className="mt-2.5 text-xs space-y-2">
                <p className="text-[11px] text-slate-600">
                  <strong>Propósito:</strong> Registra los comprobantes fiscales electrónicos (KuDE / SIFEN) emitidos ante la Dirección Nacional de Ingresos Tributarios (DNIT) de Paraguay para respaldar legalmente las devoluciones comerciales e inversas de productos lácteos según Ley N° 6380/19 (IVA 5%).
                </p>
                <div className="overflow-x-auto rounded border border-slate-200">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[9px] font-mono">
                      <tr>
                        <th className="p-2">Campo</th>
                        <th className="p-2">Tipo</th>
                        <th className="p-2">Llave</th>
                        <th className="p-2">Descripción & Regla de Negocio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
                      <tr><td className="p-2 font-bold text-purple-700">id_nota_credito</td><td className="p-2">VARCHAR(30)</td><td className="p-2 font-bold text-rose-600">PK</td><td className="p-2 font-sans">Identificador interno del documento de crédito</td></tr>
                      <tr><td className="p-2 font-bold">nro_comprobante_nc</td><td className="p-2">VARCHAR(20)</td><td className="p-2 font-bold text-emerald-600">UNIQUE</td><td className="p-2 font-sans">Numeración legal SIFEN (ej. 001-005-0001842)</td></tr>
                      <tr><td className="p-2 font-bold">timbrado_nro</td><td className="p-2">VARCHAR(15)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Timbrado oficial DNIT asignado a La Holanda Ltda. (16428910)</td></tr>
                      <tr><td className="p-2 font-bold">cdc</td><td className="p-2">VARCHAR(44)</td><td className="p-2 font-bold text-emerald-600">UNIQUE</td><td className="p-2 font-sans">Código de Control inmutable de 44 dígitos exigido por SIFEN</td></tr>
                      <tr><td className="p-2 font-bold">fecha_emision</td><td className="p-2">TIMESTAMP</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Fecha y hora oficial de transmisión y aprobación</td></tr>
                      <tr><td className="p-2 font-bold">fk_devolucion</td><td className="p-2">INT</td><td className="p-2 font-bold text-blue-600">FK</td><td className="p-2 font-sans">Relación 1 a 1 con TRANS_DEVOLUCIONES(id_devolucion)</td></tr>
                      <tr><td className="p-2 font-bold">fk_lote</td><td className="p-2">VARCHAR(50)</td><td className="p-2 font-bold text-blue-600">FK</td><td className="p-2 font-sans">Lote de producto retornado vinculado a REG_LOTES(id_lote)</td></tr>
                      <tr><td className="p-2 font-bold">nombre_producto</td><td className="p-2">VARCHAR(150)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Descripción comercial del producto lácteo</td></tr>
                      <tr><td className="p-2 font-bold">fk_distribuidor_codigo</td><td className="p-2">VARCHAR(20)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Código del distribuidor mayorista receptor (ej. DM Z5 1)</td></tr>
                      <tr><td className="p-2 font-bold">nombre_distribuidor</td><td className="p-2">VARCHAR(150)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Razón social del titular del crédito comercial</td></tr>
                      <tr><td className="p-2 font-bold">ruc_distribuidor</td><td className="p-2">VARCHAR(20)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">RUC oficial del mayorista con dígito verificador</td></tr>
                      <tr><td className="p-2 font-bold">factura_venta_afectada</td><td className="p-2">VARCHAR(25)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Factura original de despacho que se modifica o anula</td></tr>
                      <tr><td className="p-2 font-bold">furgon_frio</td><td className="p-2">VARCHAR(100)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Vehículo y chapa de transporte térmico verificado</td></tr>
                      <tr><td className="p-2 font-bold">cantidad_unidades</td><td className="p-2">INT</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Volumen en litros o unidades devueltas aprobadas</td></tr>
                      <tr><td className="p-2 font-bold">precio_unitario_gs</td><td className="p-2">NUMERIC(12,2)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Precio de venta mayorista unitario en Guaraníes</td></tr>
                      <tr><td className="p-2 font-bold">gravada_5_gs</td><td className="p-2">NUMERIC(14,2)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Base imponible gravada al 5% (Lácteos según Ley 6380)</td></tr>
                      <tr><td className="p-2 font-bold">iva_5_gs</td><td className="p-2">NUMERIC(14,2)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Liquidación del IVA 5%: Total Gravada / 21</td></tr>
                      <tr><td className="p-2 font-bold text-blue-700">total_nc_gs</td><td className="p-2">NUMERIC(14,2)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Importe total acreditado a la cuenta del distribuidor</td></tr>
                      <tr><td className="p-2 font-bold">motivo_nc</td><td className="p-2">VARCHAR(255)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Justificación reglamentaria de la nota de crédito</td></tr>
                      <tr><td className="p-2 font-bold text-emerald-700">estado_dnit</td><td className="p-2">VARCHAR(30)</td><td className="p-2 text-slate-400">-</td><td className="p-2 font-sans">Aprobado SIFEN / En Proceso / Rechazado</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: FLUJOS F01 - F16 TABLE */}
      {activeTab === 'flujos' && (
        <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-slate-900">
                Tabla 1: Registro Transaccional de Flujos y Procesos Logísticos (F01 a F16)
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Matriz de procesos operativos, áreas responsables y KPIs de control
              </p>
            </div>
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              16 Flujos
            </span>
          </div>

          <div className="overflow-x-auto rounded border border-slate-200">
            <table className="w-full text-left text-[10px] font-mono">
              <thead className="bg-slate-100 text-slate-700 uppercase text-[9px]">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2 font-sans">Área Origen</th>
                  <th className="p-2 font-sans">Área Destino</th>
                  <th className="p-2 font-sans">Motivo / Recurso</th>
                  <th className="p-2 font-sans">Responsable</th>
                  <th className="p-2 font-sans">Procedimiento Operativo</th>
                  <th className="p-2 font-sans">KPI Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {FLUJOS_TABLA_DATA.map((f) => {
                  const isReverse = f.tipo_logistica === 'Inversa';
                  return (
                    <tr key={f.id_flujo} className="hover:bg-slate-50">
                      <td className="p-2 font-bold">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                          isReverse ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {f.id_flujo}
                        </span>
                      </td>
                      <td className="p-2 font-sans font-medium">{f.area_origen}</td>
                      <td className="p-2 font-sans font-medium">{f.area_destino}</td>
                      <td className="p-2 font-sans font-semibold text-slate-900">{f.motivo_o_recurso}</td>
                      <td className="p-2 font-sans font-medium text-slate-600">{f.responsable}</td>
                      <td className="p-2 font-sans text-slate-600 max-w-xs">{f.proceso_a_realizar}</td>
                      <td className="p-2 font-sans font-semibold text-blue-700">{f.kpi_control}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
