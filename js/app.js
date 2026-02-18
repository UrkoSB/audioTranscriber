let transcript="";

async function upload(){
  const file=document.getElementById("file").files[0];
  if(!file) return alert("Selecciona audio");

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
  document.getElementById("status").innerText="✅ listo";
}

function downloadTxt(){
  const blob=new Blob([transcript],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="transcripcion.txt";
  a.click();
}
