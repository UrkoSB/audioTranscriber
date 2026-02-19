const drop = document.getElementById("dropZone");
const input = document.getElementById("file");
const result = document.getElementById("result");
const statusText = document.getElementById("status");

let transcript="";
let controller;

// drag & drop
drop.onclick = () => input.click();

drop.ondragover = e => {
  e.preventDefault();
  drop.classList.add("drag");
};

drop.ondragleave = () => drop.classList.remove("drag");

drop.ondrop = e => {
  e.preventDefault();
  drop.classList.remove("drag");
  input.files = e.dataTransfer.files;
  upload();
};

input.onchange = upload;

async function upload(){
  const file=input.files[0];
  if(!file) return;

  result.value="";
  transcript="";
  statusText.innerText="Transcribiendo...";

  const form=new FormData();
  form.append("audio",file);

  // abrir stream
  const evt=new EventSource("http://localhost:3000/stream");

  evt.onmessage=e=>{
    if(e.data==="__END__"){
      statusText.innerText="✅ completado";
      evt.close();
      return;
    }

    transcript+=e.data+" ";
    result.value=transcript;
  };

  // subir audio
  fetch("http://localhost:3000/transcribe",{
    method:"POST",
    body:form
  });
}

// abortar
function abortTranscription(){
  fetch("http://localhost:3000/abort",{method:"POST"});
  statusText.innerText="⛔ abortado";
}

// descargar
function downloadTxt(){
  if(!transcript) return;

  const blob=new Blob([transcript],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="transcripcion.txt";
  a.click();
}
