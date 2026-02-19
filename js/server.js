import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

let currentProcess = null;
let streamClient = null;

// ================= STREAM TEXTO AL NAVEGADOR =================
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  streamClient = res;

  req.on("close", () => {
    streamClient = null;
  });
});

// ================= INICIAR TRANSCRIPCIÓN =================
app.post("/transcribe", upload.single("audio"), (req, res) => {

  const inputPath = req.file.path;
  console.log("🧠 Transcribiendo:", inputPath);

  const pyCode = `
from faster_whisper import WhisperModel
model = WhisperModel("medium", compute_type="int8")
segments, info = model.transcribe("${inputPath}")

for s in segments:
    t = s.text.strip()
    if t:
        print(t, flush=True)

print("__END__", flush=True)
`;

  currentProcess = spawn("python3", ["-u", "-c", pyCode]);

  // recibir texto en vivo
  currentProcess.stdout.on("data", (data) => {
    const text = data.toString().trim();
    if (!text) return;

    if (streamClient) {
      streamClient.write("data: " + text + "\n\n");
    }
  });

  currentProcess.stderr.on("data", (data) => {
    console.log("PY ERR:", data.toString());
  });

  currentProcess.on("close", () => {
    console.log("🟢 Proceso terminado");
    currentProcess = null;
  });

  res.json({ started: true });
});

// ================= ABORTAR =================
app.post("/abort", (req, res) => {
  if (currentProcess) {
    console.log("⛔ Abortando transcripción");
    currentProcess.kill("SIGKILL");
    currentProcess = null;
  }
  res.json({ aborted: true });
});

// ================= SERVER =================
app.listen(3000, () => {
  console.log("🚀 audioTranscriber realtime en http://localhost:3000");
});

// mantener vivo en mac
process.stdin.resume();
0