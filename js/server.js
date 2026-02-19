import express from "express";
import multer from "multer";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("output")) fs.mkdirSync("output");

app.post("/transcribe", upload.single("audio"), (req, res) => {

  const inputPath = req.file.path;
  const base = path.parse(req.file.originalname).name;
  const txtOutput = `output/${base}.txt`;

  console.log("🧠 Transcribiendo:", inputPath);

  const cmd = `
python3 - <<EOF
from faster_whisper import WhisperModel

model = WhisperModel("medium", compute_type="int8")
segments, info = model.transcribe("${inputPath}")

text=""
for s in segments:
    line = s.text.strip()
    if not line:
        continue
    text += line + " "

open("${txtOutput}","w").write(text)
print("DONE")
EOF`;

  exec(cmd, (err, stdout, stderr) => {

    console.log(stdout);
    console.log(stderr);

    if (err) {
      console.log("ERROR:", err);
      return res.status(500).send("error transcribing");
    }

    const text = fs.readFileSync(txtOutput, "utf8");

    res.json({
      text,
      filename: base + ".txt"
    });
  });
});

const server = app.listen(3000, () => {
  console.log("🚀 audioTranscriber en http://localhost:3000");
});

// mantener proceso vivo en Mac
process.stdin.resume();
