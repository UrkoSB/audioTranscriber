const drop = document.getElementById("dropZone");
const input = document.getElementById("file");
let transcript = "";

// click abre selector
drop.onclick = () => input.click();

// drag visual
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

  document.getElementById("status").innerText="Transcribiendo... puede tardar";

  const form=new FormData();
  form.append("audio",file);

  const res=await fetch("http://localhost:3000/transcribe",{
    method:"POST",
    body:form
  });

  const data=await res.json();
  transcript=data.text;

  document.getElementById("result").value=transcript;
  document.getElementById("status").innerText="✅ Transcripción lista";
}

// descargar txt
function downloadTxt(){
  const blob=new Blob([transcript],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="transcripcion.txt";
  a.click();
}
