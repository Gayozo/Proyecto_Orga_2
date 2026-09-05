# Sistema de Autogestión - Empresa Láctea

Proyecto de desarrollo de software aplicado para la cátedra de **Organización 2**, correspondiente a la carrera de Análisis de Sistemas en la **Universidad Católica "Nuestra Señora de la Asunción"**.

---

## 👥 Integrantes del Equipo

* **Raquel Valladares**
* **Samuel Gayozo**
* **Facundo Martinez**
* **Baltazar Taveira**

---

## 📌 Descripción del Proyecto

Sistema web integral orientado a modelar, digitalizar y optimizar la cadena de valor y logística de una empresa láctea:
* **Ingreso y Materia Prima:** Registro y trazabilidad de leche cruda desde tambos remitentes.
* **Trazabilidad y Lotes:** Control del árbol de transformación industrial y almacenamiento.
* **Distribución y Stock:** Red de 13 Centros de Distribución (CEDIs) y despacho a 65 distribuidores mayoristas.
* **Logística Inversa:** Consola técnica de devoluciones por avería de envases, exceso de inventario, vencimiento y productos defectuosos.

---

## 🛠️ Requisitos Previos y Entorno de Desarrollo

Antes de comenzar, valida que tu estación de trabajo cuente con los siguientes componentes mínimos:

### 1. Software y Runtimes

| Herramienta | Versión Requerida | Verificación en Terminal | Descarga / Observación |
| :--- | :--- | :--- | :--- |
| **Node.js** | 18.18+ (Recomendado: 20 LTS o 22 LTS) | `node -v` | [nodejs.org](https://nodejs.org/) (Marcar *"Add to PATH"*) |
| **npm** | v9+ o v10+ | `npm -v` | Incluido por defecto con Node.js |
| **Git CLI** | 2.30+ | `git --version` | [git-scm.com](https://git-scm.com/) |
| **VS Code** | Última versión disponible | `code -v` | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Navegador Web** | Moderno con soporte SVG / ES Modules | N/A | Chrome, Edge, Firefox, Brave o Safari |

### 2. Especificaciones de Hardware
* **Memoria RAM:** Mínimo 4 GB (Recomendado 8 GB a 16 GB).
* **Almacenamiento:** 600 MB libres en disco para dependencias locales y caché de compilación.
* **Sistema Operativo:** Windows 10/11 (PowerShell o WSL2), macOS 11+, o distribuciones Linux modernas.

---

## ⚙️ Instalación y Ejecución Paso a Paso

Sigue esta secuencia de comandos en tu terminal para clonar y ejecutar la plataforma:

### Paso 1: Clonar el repositorio y posicionarse en la carpeta

git clone <URL_DEL_REPOSITORIO>
cd sistema-autogestion-lactea

### Paso 2: Crear el archivo de entorno local
Genera tu archivo `.env` a partir de la plantilla:

# En Windows (PowerShell):
Copy-Item .env.example .env

# En Linux / macOS / Git Bash:
cp .env.example .env

### Paso 3: Instalar dependencias del proyecto
npm install

Si la consola advierte sobre scripts bloqueados de esbuild o protobufjs, autorízalos con:

npm install-scripts approve esbuild
npm install-scripts approve protobufjs
npm install-scripts approve @google/genai

### Paso 4: Iniciar el servidor local de desarrollo
npm run dev

El proyecto levantará en ~200 ms con Vite HMR. Abre en tu navegador:

http://localhost:3000

(Si el puerto 3000 está en uso, Vite abrirá en el siguiente libre o puedes forzarlo con npm run dev -- --port 5173).

# 💻 Configuración Recomendada de Visual Studio Code
1. Extensiones sugeridas
Instala las siguientes herramientas desde la pestaña de Extensiones (Ctrl+Shift+X):

Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss): Autocompletado y vista previa de clases.

Prettier - Code Formatter (esbenp.prettier-vscode): Formateo uniforme al guardar.

ESLint (dbaeumer.vscode-eslint): Validación y prevención de errores en TypeScript/React.

2. Ajustes de espacio de trabajo (.vscode/settings.json)
Crea el archivo .vscode/settings.json en la raíz del proyecto para asegurar formateo automático:

JSON
```
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.suggest.completeFunctionCalls": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
````
# 📜 Catálogo de Comandos (package.json)

| Comando | Script | Utilidad | Cuándo usarlo |
| :--- | :--- | :--- | :--- |
| `npm run dev` | `vite --port=3000 --host=0.0.0.0` | Servidor local con recarga instantánea en caliente. | Durante el desarrollo cotidiano. |
| `npm run build` | `vite build` | Compila y minifica TypeScript, React y CSS en `/dist`. | Previo a entregas o despliegue. |
| `npm run preview` | `vite preview` | Levanta un servidor local sobre el código de `/dist`. | Para validar el empaquetado final. |
| `npm run lint` | `tsc --noEmit` | Analiza errores de tipos TypeScript sin emitir código. | Antes de hacer commit o abrir PR. |


# 🌿 Flujo de Trabajo y Versionado (Git Flow)
Para evitar pérdidas de código y trabajar de manera colaborativa sin conflictos:

Ramas Base:

main: Solo para versiones estables y entregas evaluativas al docente.

develop: Rama integradora del equipo. Todo el trabajo diario confluye aquí.

Desarrollo de Funcionalidades:

Cada integrante debe crear una rama partiendo siempre de develop:

Bash
```
git checkout develop
git pull origin develop
git checkout -b feature/nombre-de-tu-tarea
```

Realizar commits atómicos y claros:

Bash
```
git add .
git commit -m "feat: implementar selector interactivo de cedis"
```

Subir la rama a GitHub:

Bash
```
git push -u origin feature/nombre-de-tu-tarea
```

Pull Requests (PR):

En GitHub, abrir el PR asegurando que el destino sea base: develop.

Solicitar la revisión y aprobación de al menos un compañero antes del merge.

# 🔧 Solución de Problemas Frecuentes (Troubleshooting)
Error: 'node' o 'npm' no se reconoce como un comando interno:

Reinstala Node.js marcando la casilla "Add to PATH" o agrega manualmente la ruta en las Variables de Entorno del sistema. Reinicia la terminal.

Error: Port 3000 is in use, trying another one...:

Hay otra aplicación abierta en ese puerto. Fuerza un puerto libre ejecutando:

Bash
```
npm run dev -- --port 5173
```

Error en Windows PowerShell: "La ejecución de scripts está deshabilitada en este sistema":

Abre PowerShell como Administrador y ejecuta:
PowerShell

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Confirma con la tecla S (Sí) y reinicia la terminal.

VS Code resalta advertencias rojas falsas en TypeScript:

Presiona Ctrl + Shift + P (o Cmd + Shift + P en Mac), ejecuta TypeScript: Restart TS Server y confirma haber ejecutado npm install.