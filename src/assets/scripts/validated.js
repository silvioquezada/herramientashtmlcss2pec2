const btnguardar = document.getElementById("btnguardar");
const username = document.getElementById("username");
const messagueusername = document.getElementById("messagueusername");
const email = document.getElementById("email");
const messagueemail = document.getElementById("messagueemail");
const coments = document.getElementById("coments");
const messaguecoments = document.getElementById("messaguecoments");
const loaded = document.getElementById("loaded");
const toastmessague = document.getElementById("toastmessague");
const toastmessagueerror = document.getElementById("toastmessagueerror");

function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function validateEmail(email){
  const validacion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validacion.test(String(email).toLowerCase());
}

function formnormalize() {
  username.value = "";
  email.value = "";
  coments.value = "";
  loaded.className = "content-align-column-center hidden-loaded";
  toastmessague.className = "toast toast-relative";
  toastmessagueerror.className = "toast toast-relative toast-relative-error";
  username.className = "form-control";
  email.className = "form-control";
  coments.className = "form-control";
}

formnormalize();

btnguardar.addEventListener("click", function(e){
  let ban = true;
  if (username.value === "") {
    username.className = "form-control is-invalid";
    messagueusername.className = "messague-error";
    messagueusername.innerText = "Usuario requerido";
    ban = false;
  } else {
    username.className = "form-control is-valid";
    messagueusername.className = "messague";
    messagueusername.innerText = "";
  }

  if (email.value === "") {
    email.className = "form-control is-invalid";
    messagueemail.className = "messague-error";
    messagueemail.innerText = "Correo requerido";
    ban = false;
  } else if (!validateEmail(email.value)) {
    email.className = "form-control is-invalid";
    messagueemail.className = "messague-error";
    messagueemail.innerText = "Emaiil no es válido";
    ban = false;
  } else {
    email.className = "form-control is-valid";
    messagueemail.className = "messague";
    messagueemail.innerText = "";
  }

  if (coments.value === "") {
    coments.className = "form-control is-invalid";
    messaguecoments.className = "messague-error";
    messaguecoments.innerText = "Comentario requerido";
    ban = false;
  } else {
    coments.className = "form-control is-valid";
    messaguecoments.className = "messague";
    messaguecoments.innerText = "";
  }

  if (ban) {
    guardar();
  }
});

function guardar() {
  loaded.className = "content-align-column-center";
  let api = "https://ssoftwaresoluciones.com/pec2/";
  let objcoments = {
    "nombres" : username.value,
    "correo" : email.value,
    "comentario" : coments.value
  };

  const params = {
    method: "POST",
    body: JSON.stringify(objcoments),
    headers: {
        "Content-Type": "application/json",
    }	
  }

  fetch(api, params)
  .then(response => response.json())
  .then(json => {
    loaded.className = "content-align-column-center hidden-loaded";
    if (json.estado) {
      toastmessague.className = "toast show toast-relative";
      setTimeout(function(){
        formnormalize();
      },2000);
    }
   })
   .catch(err => {
   console.log('Solicitud fallida', err);
   loaded.className = "content-align-column-center hidden-loaded";
    toastmessagueerror.className = "toast show toast-relative toast-relative-error";
    setTimeout(function(){
      formnormalize();
    },2000);  
  });
}