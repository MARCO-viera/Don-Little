// Función para validar el formulario
function validarFormulario(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    // Obtener el formulario actual
    var formulario = event.target;
  
    // Verificar si es el formulario de inicio de sesión (login.html) o de registro (registrar.html)
    if (formulario.id === "FormularioLogin") {
      // Validar campos para la página de inicio de sesión (login.html)
      var loginUsuario = document.getElementById("Lusuario");
      var loginContraseña = document.getElementById("Lcontraseña");
  
      if (loginUsuario.value.trim() === "") {
        alert("Por favor, ingresa tu nombre de usuario");
        loginUsuario.focus();
        return;
      }
  
      if (loginContraseña.value.trim() === "") {
        alert("Por favor, ingresa tu contraseña");
        loginContraseña.focus();
        return;
      }
    } else if (formulario.id === "FormularioRegistro") {
      // Validar campos para la página de registro (registrar.html)
      var registroUsuario = document.getElementById("Rusuario");
      var registroCorreo = document.getElementById("Rcorreo");
      var registroContraseña = document.getElementById("Rcontraseña");
  
      if (registroUsuario.value.trim() === "") {
        alert("Por favor, ingresa tu nombre completo");
        registroUsuario.focus();
        return;
      }
  
      if (registroCorreo.value.trim() === "") {
        alert("Por favor, ingresa tu correo electrónico");
        registroCorreo.focus();
        return;
      }
  
      if (registroContraseña.value.trim() === "") {
        alert("Por favor, ingresa una contraseña");
        registroContraseña.focus();
        return;
      }
  
      // Guardar los datos del usuario en el almacenamiento local
      var usuario = {
        nombre: registroUsuario.value.trim(),
        correo: registroCorreo.value.trim(),
        contraseña: registroContraseña.value.trim(),
      };
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }
  
    // Si todos los campos son válidos, puedes realizar alguna acción adicional o enviar el formulario
    alert("Formulario válido. Puedes realizar alguna acción adicional aquí.");
    window.location.href = "index.html";
    // Aquí puedes enviar el formulario usando el método submit() si deseas enviarlo automáticamente
    // formulario.submit();
  }

  // Verificar si hay datos de usuario almacenados
var usuarioAlmacenado = localStorage.getItem("usuario");
if (usuarioAlmacenado) {
  var usuario = JSON.parse(usuarioAlmacenado);
  document.getElementById("Lusuario").value = usuario.nombre;
  document.getElementById("Lcontraseña").value = usuario.contraseña;
}

// script.js

function recibir() {
  var nombres = document.getElementById("nombres").value;
  var celular = document.getElementsByName("celular")[0].value;
  var email = document.getElementsByName("email")[0].value;

  var datosRecibidos = document.getElementById("datosRecibidos");
  datosRecibidos.innerHTML = "<h3>Tu nombre es: " + nombres + "</h3><p>Tu celular es: " + celular + "</p><p>Tu email es: " + email + "</p>";

  showModalDatos();
}

function showModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}


function showModalDatos() {
  var modal = document.getElementById("modalDatos");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

function closeModalDatos() {
  var modal = document.getElementById("modalDatos");
  modal.style.display = "none";
}
