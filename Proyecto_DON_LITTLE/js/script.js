// ======================================================
// 1. VALIDACIÓN DE FORMULARIOS
// ======================================================

function validarFormulario(event) {
  event.preventDefault();

  var formulario = event.target;

  // ====================================================
  // 1.1 INICIO DE SESIÓN
  // ====================================================

  if (formulario.id === "FormularioLogin") {
    var loginUsuario = document.getElementById("Lusuario");
    var loginContraseña = document.getElementById("Lcontraseña");

    // Usuario vacío
    if (loginUsuario.value.trim() === "") {
      alert("Por favor, ingresa tu nombre de usuario");
      loginUsuario.focus();
      return;
    }

    // Usuario muy corto
    if (loginUsuario.value.trim().length < 3) {
      alert("El nombre de usuario debe tener al menos 3 caracteres");
      loginUsuario.focus();
      return;
    }

    // Contraseña vacía
    if (loginContraseña.value.trim() === "") {
      alert("Por favor, ingresa tu contraseña");
      loginContraseña.focus();
      return;
    }

    // Contraseña muy corta
    if (loginContraseña.value.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      loginContraseña.focus();
      return;
    }

    // Buscar usuario guardado
    var usuarioAlmacenado = localStorage.getItem("usuario");

    if (!usuarioAlmacenado) {
      alert("No existe ningún usuario registrado");
      return;
    }

    var usuario = JSON.parse(usuarioAlmacenado);

    // Comprobar credenciales
    if (
      loginUsuario.value.trim() !== usuario.nombre ||
      loginContraseña.value !== usuario.contraseña
    ) {
      alert("El usuario o la contraseña son incorrectos");
      loginContraseña.focus();
      return;
    }

    // ====================================================
    // 1.2 REGISTRO
    // ====================================================
  } else if (formulario.id === "FormularioRegistro") {
    var registroUsuario = document.getElementById("Rusuario");
    var registroCorreo = document.getElementById("Rcorreo");
    var registroContraseña = document.getElementById("Rcontraseña");

    var nombreCompleto = registroUsuario.value.trim();

    var partesNombre = nombreCompleto.split(/\s+/);

    // Nombre vacío
    if (nombreCompleto === "") {
      alert("Por favor, ingresa tu nombre completo");
      registroUsuario.focus();
      return;
    }

    // Nombre y apellido
    if (partesNombre.length < 2) {
      alert("Por favor, ingresa tu nombre y apellido");
      registroUsuario.focus();
      return;
    }

    // Solo letras y espacios
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombreCompleto)) {
      alert("El nombre solo puede contener letras y espacios");
      registroUsuario.focus();
      return;
    }

    // Repetición excesiva de letras
    if (/(.)\1{3,}/i.test(nombreCompleto)) {
      alert("El nombre ingresado no parece válido");
      registroUsuario.focus();
      return;
    }

    // Correo vacío
    if (registroCorreo.value.trim() === "") {
      alert("Por favor, ingresa tu correo electrónico");
      registroCorreo.focus();
      return;
    }

    // Formato de correo
    var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(registroCorreo.value.trim())) {
      alert("Por favor, ingresa un correo electrónico válido");
      registroCorreo.focus();
      return;
    }

    // Contraseña vacía
    if (registroContraseña.value.trim() === "") {
      alert("Por favor, ingresa una contraseña");
      registroContraseña.focus();
      return;
    }

    // Contraseña mínima
    if (registroContraseña.value.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      registroContraseña.focus();
      return;
    }

    // Al menos una letra
    if (!/[A-Za-z]/.test(registroContraseña.value)) {
      alert("La contraseña debe contener al menos una letra");
      registroContraseña.focus();
      return;
    }

    // Al menos un número
    if (!/\d/.test(registroContraseña.value)) {
      alert("La contraseña debe contener al menos un número");
      registroContraseña.focus();
      return;
    }

    // Crear usuario
    var usuario = {
      nombre: registroUsuario.value.trim(),
      correo: registroCorreo.value.trim(),
      contraseña: registroContraseña.value.trim(),
    };

    // Guardar usuario
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  alert("Formulario válido. Puedes realizar alguna acción adicional aquí.");

  window.location.href = "index.html";
}

// ======================================================
// 2. RECUPERAR DATOS DEL USUARIO
// ======================================================

var loginUsuario = document.getElementById("Lusuario");
var loginContraseña = document.getElementById("Lcontraseña");

if (loginUsuario && loginContraseña) {
  var usuarioAlmacenado = localStorage.getItem("usuario");

  if (usuarioAlmacenado) {
    var usuario = JSON.parse(usuarioAlmacenado);

    loginUsuario.value = usuario.nombre;
    loginContraseña.value = usuario.contraseña;
  }
}

// ======================================================
// 3. PROCESAMIENTO DE COTIZACIÓN
// ======================================================

function recibir() {
  var nombres = document.getElementById("nombres").value;

  var celular = document.getElementsByName("celular")[0].value;

  var email = document.getElementsByName("email")[0].value;

  var datosRecibidos = document.getElementById("datosRecibidos");

  datosRecibidos.innerHTML =
    "<h3>Datos de tu cotización</h3>" +
    "<p><strong>Nombre:</strong> " +
    nombres +
    "</p>" +
    "<p><strong>Celular:</strong> " +
    celular +
    "</p>" +
    "<p><strong>Email:</strong> " +
    email +
    "</p>";

  showModalDatos();
}

// ======================================================
// 4. MODALES
// ======================================================

function showModal() {
  var modal = document.getElementById("modal");

  if (modal) {
    modal.style.display = "block";
  }
}

function showModalDatos() {
  var modal = document.getElementById("modalDatos");

  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal() {
  var modal = document.getElementById("modal");

  if (modal) {
    modal.style.display = "none";
  }
}

function closeModalDatos() {
  var modal = document.getElementById("modalDatos");

  if (modal) {
    modal.style.display = "none";
  }
}

// ======================================================
// 5. CARRITO
// ======================================================

var carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ======================================================
// 6. ACTUALIZAR CONTADOR DEL CARRITO
// ======================================================

function actualizarContadorCarrito() {
  var contador = document.getElementById("contadorCarrito");

  if (!contador) {
    return;
  }

  var cantidadTotal = 0;

  carrito.forEach(function (producto) {
    cantidadTotal += producto.cantidad;
  });

  contador.textContent = cantidadTotal;
}

// ======================================================
// 7. CREAR TARJETA DE PRODUCTO
// ======================================================

function crearTarjetaProducto(producto, indice) {
  var tarjeta = document.createElement("div");

  tarjeta.className = "prom";

  tarjeta.innerHTML =
    '<img src="' +
    producto.imagen +
    '" alt="' +
    producto.nombre +
    '">' +
    "<h4>" +
    producto.nombre +
    "</h4>" +
    "<p>" +
    producto.descripcion +
    "</p>" +
    '<button type="button" class="btn btn-warning">' +
    "S/ " +
    producto.precio.toFixed(2) +
    "</button>";

  var botonCarrito = tarjeta.querySelector(".btn-warning");

  botonCarrito.addEventListener("click", function () {
    var productoExistente = carrito.find(function (item) {
      return item.nombre === producto.nombre;
    });

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      var nuevoProducto = {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
      };

      carrito.push(nuevoProducto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContadorCarrito();

    alert("Producto agregado al carrito");
  });

  return tarjeta;
}

// ======================================================
// 8. MOSTRAR CATÁLOGO COMPLETO
// ======================================================

function mostrarProductos() {
  var contenedorProductos = document.getElementById("contenedorProductos");

  if (contenedorProductos) {
    contenedorProductos.innerHTML = "";

    productos.forEach(function (producto, indice) {
      var tarjeta = crearTarjetaProducto(producto, indice);

      contenedorProductos.appendChild(tarjeta);
    });
  }
}

mostrarProductos();

// ======================================================
// 9. MOSTRAR OFERTAS
// ======================================================

function mostrarOfertas() {
  var contenedorOfertas = document.getElementById("contenedorOfertas");

  if (contenedorOfertas) {
    contenedorOfertas.innerHTML = "";

    productos.slice(0, 5).forEach(function (producto, indice) {
      var tarjeta = crearTarjetaProducto(producto, indice);

      contenedorOfertas.appendChild(tarjeta);
    });
  }
}

mostrarOfertas();

// ======================================================
// 10. MOSTRAR LOCALES
// ======================================================

function mostrarLocales() {
  var contenedorLocales = document.getElementById("contenedorLocales");

  if (contenedorLocales) {
    contenedorLocales.innerHTML = "";

    locales.forEach(function (local) {
      var tarjeta = document.createElement("div");

      tarjeta.className = "card";

      tarjeta.innerHTML =
        '<img src="' +
        local.imagen +
        '" alt="' +
        local.nombre +
        '">' +
        "<h4>" +
        local.nombre +
        "</h4>" +
        "<p>" +
        local.descripcion +
        "</p>" +
        '<a href="#">RESERVAR</a>';

      contenedorLocales.appendChild(tarjeta);
    });
  }
}

mostrarLocales();

// ======================================================
// 11. MOSTRAR CARRITO
// ======================================================

function mostrarCarrito() {
  var contenedorCarrito = document.getElementById("contenedorCarrito");

  var totalCarrito = document.getElementById("totalCarrito");

  if (contenedorCarrito) {
    contenedorCarrito.innerHTML = "";

    var total = 0;

    carrito.forEach(function (producto, indice) {
      var subtotal = producto.precio * producto.cantidad;

      total = total + subtotal;

      var tarjetaCarrito = document.createElement("div");

      tarjetaCarrito.className = "produc";

      tarjetaCarrito.innerHTML =
        '<img src="' +
        producto.imagen +
        '" alt="' +
        producto.nombre +
        '">' +
        "<h4>" +
        producto.nombre +
        "</h4>" +
        "<p>Precio: S/ " +
        producto.precio.toFixed(2) +
        "</p>" +
        "<p>Cantidad: " +
        producto.cantidad +
        "</p>" +
        "<p>Subtotal: S/ " +
        subtotal.toFixed(2) +
        "</p>" +
        '<button type="button" class="btnMenos">-</button>' +
        '<button type="button" class="btnMas">+</button>' +
        '<button type="button" class="btnEliminar">Eliminar</button>';

      contenedorCarrito.appendChild(tarjetaCarrito);

      // BOTÓN MENOS
      var btnMenos = tarjetaCarrito.querySelector(".btnMenos");

      btnMenos.addEventListener("click", function () {
        if (carrito[indice].cantidad > 1) {
          carrito[indice].cantidad--;
        } else {
          carrito.splice(indice, 1);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarCarrito();
        actualizarContadorCarrito();
      });

      // BOTÓN MÁS
      var btnMas = tarjetaCarrito.querySelector(".btnMas");

      btnMas.addEventListener("click", function () {
        carrito[indice].cantidad++;

        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarCarrito();
        actualizarContadorCarrito();
      });

      // BOTÓN ELIMINAR
      var btnEliminar = tarjetaCarrito.querySelector(".btnEliminar");

      btnEliminar.addEventListener("click", function () {
        carrito.splice(indice, 1);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarCarrito();
        actualizarContadorCarrito();
      });
    });

    if (totalCarrito) {
      totalCarrito.innerHTML = "<h3>Total: S/ " + total.toFixed(2) + "</h3>";
    }
  }
}

mostrarCarrito();

// Actualizar contador al cargar la página
actualizarContadorCarrito();

// ======================================================
// 12. CARRUSEL DE OFERTAS
// ======================================================

var contenedorCarrusel = document.getElementById("contenedorOfertas");

var botonAnterior = document.querySelector(".btn-anterior");

var botonSiguiente = document.querySelector(".btn-siguiente");

var posicionCarrusel = 0;

var anchoProducto = 230;

if (contenedorCarrusel && botonAnterior && botonSiguiente) {
  var cantidadOfertas = contenedorCarrusel.children.length;

  botonSiguiente.addEventListener("click", function () {
    posicionCarrusel++;

    if (posicionCarrusel >= cantidadOfertas) {
      posicionCarrusel = 0;
    }

    contenedorCarrusel.style.transform =
      "translateX(-" + posicionCarrusel * anchoProducto + "px)";
  });

  botonAnterior.addEventListener("click", function () {
    posicionCarrusel--;

    if (posicionCarrusel < 0) {
      posicionCarrusel = cantidadOfertas - 1;
    }

    contenedorCarrusel.style.transform =
      "translateX(-" + posicionCarrusel * anchoProducto + "px)";
  });
}
