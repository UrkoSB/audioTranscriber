# 🎙️ audioTranscriber

Herramienta local para transcribir archivos de audio a texto usando IA
(Whisper offline).\
Funciona 100% en local, sin APIs de pago y soporta acentos difíciles.

Convierte: audio → texto → descarga .txt

Ideal para: - entrevistas\
- podcasts\
- clases\
- reuniones

------------------------------------------------------------------------

# 🧱 Estructura del proyecto

audioTranscriber/ ├── index.html ├── js/ │ ├── app.js │ └── server.js
├── assets/ ├── uploads/ ├── output/ └── whisper-env/

------------------------------------------------------------------------

# ⚙️ Requisitos

### 1. Node.js instalado

Comprobar: node -v

### 2. Python instalado

python3 --version

### 3. Homebrew (Mac)

brew -v

------------------------------------------------------------------------

# 🚀 Instalación (solo la primera vez)

## 1️⃣ Instalar ffmpeg

Necesario para procesar audio:

brew install ffmpeg

------------------------------------------------------------------------

## 2️⃣ Crear entorno Python

Dentro de la carpeta del proyecto:

python3 -m venv whisper-env

Activar entorno: source whisper-env/bin/activate

------------------------------------------------------------------------

## 3️⃣ Instalar motor de transcripción (faster-whisper)

Con el entorno activado:

pip install faster-whisper

------------------------------------------------------------------------

## 4️⃣ Crear proyecto Node

Si no existe package.json:

npm init -y

Editar package.json y añadir: "type": "module"

------------------------------------------------------------------------

## 5️⃣ Instalar dependencias Node

npm install express multer cors

------------------------------------------------------------------------

# ▶️ Ejecutar la herramienta

## 1. Activar entorno Python

Cada vez que abras terminal:

source whisper-env/bin/activate

## 2. Iniciar servidor

Desde la carpeta del proyecto:

node js/server.js

Deberías ver: audioTranscriber en http://localhost:3000

## 3. Abrir la interfaz

Abrir archivo index.html en el navegador

------------------------------------------------------------------------

# 🧪 Uso

1.  Cargar archivo de audio desde tu equipo\
2.  Pulsar Transcribir\
3.  Esperar procesamiento\
4.  Descargar archivo .txt

Formatos soportados: - mp3\
- wav\
- m4a\
- mp4

------------------------------------------------------------------------

# 🧠 Detalles técnicos

-   Motor: faster-whisper (offline)
-   Modelo: medium
-   Procesamiento local CPU
-   No requiere internet
-   Soporta acentos no nativos

------------------------------------------------------------------------

# 📁 Output

Las transcripciones se guardan en: output/

Y pueden descargarse desde la interfaz en .txt.

------------------------------------------------------------------------

# 🛠️ Solución de problemas

### Error: faster_whisper not found

Asegúrate de activar entorno: source whisper-env/bin/activate

### Error Node import

Asegúrate de tener en package.json: "type": "module"

### ffmpeg no encontrado

brew install ffmpeg

------------------------------------------------------------------------

# 🏆 Estado del proyecto

Herramienta funcional local de transcripción IA.

Posibles mejoras futuras: - separación de speakers\
- resumen automático\
- exportar PDF\
- modo batch\
- interfaz pro

------------------------------------------------------------------------

Autor: Urko\
Proyecto: audioTranscriber
