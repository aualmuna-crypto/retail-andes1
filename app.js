
// Productos de Retail Andes
const productos = [
    {
        id: 1,
        nombre: "Notebook HP 15",
        precio: 429990,
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        descripcion: "Notebook HP para trabajo y estudio."
    },
    {
        id: 2,
        nombre: "Refrigerador LG",
        precio: 329990,
        imagen: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500",
        descripcion: "Refrigerador para el hogar."
    },
    {
        id: 3,
        nombre: "Tablet Samsung",
        precio: 199990,
        imagen: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        descripcion: "Tablet para estudiar y trabajar."
    }
];

let carrito = [];
let usuarioActual = null;

// Cambiar de pantalla
function mostrarPantalla(id) {
    document.querySelectorAll(".pantalla").forEach(pantalla => {
        pantalla.classList.add("oculto");
    });

    document.getElementById(id).classList.remove("oculto");
}

function mostrarInicio() {
    mostrarPantalla("inicio");
}

function mostrarAcceso() {
    mostrarPantalla("acceso");
}

function mostrarProductos() {
    mostrarPantalla("productos");
    cargarProductos();
}

function mostrarCarrito() {
    mostrarPantalla("carrito");
    actualizarCarrito();
}

// Crear cuenta de prueba
document.getElementById("formularioRegistro").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const clave = document.getElementById("contrasena").value;

    if (nombre === "" || correo === "" || clave.length < 6) {
        alert("Completa correctamente los datos.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(usuario => usuario.correo === correo)) {
        alert("Este correo ya está registrado.");
        return;
    }

    usuarios.push({
        nombre: nombre,
        correo: correo,
        clave: clave
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    document.getElementById("mensajeCuenta").textContent =
        "Cuenta creada correctamente. Ahora puedes iniciar sesión.";

    this.reset();
});

// Iniciar sesión
document.getElementById("formularioLogin").addEventListener("submit", function(event) {
    event.preventDefault();

    const correo = document.getElementById("correoLogin").value.trim().toLowerCase();
    const clave = document.getElementById("claveLogin").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u =>
        u.correo === correo && u.clave === clave
    );

    if (usuario) {
        usuarioActual = usuario;
        alert("Bienvenido a Retail Andes, " + usuario.nombre);
        mostrarProductos();
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});

// Mostrar productos
function cargarProductos() {
    const catalogo = document.getElementById("catalogo");

    catalogo.innerHTML = "";

    productos.forEach(producto => {
        catalogo.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
                <button onclick="verDetalle(${producto.id})">
                    Ver producto
                </button>
                <button onclick="agregarCarrito(${producto.id})">
                    Agregar al carrito
                </button>
            </div>
        `;
    });
}

// Ver detalle
function verDetalle(id) {
    const producto = productos.find(p => p.id === id);

    document.getElementById("informacionProducto").innerHTML = `
        <h2>${producto.nombre}</h2>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.descripcion}</p>
        <h3 class="precio">$${producto.precio.toLocaleString("es-CL")}</h3>
        <button onclick="agregarCarrito(${producto.id})">
            Agregar al carrito
        </button>
        <button onclick="mostrarProductos()">Volver</button>
    `;

    mostrarPantalla("detalle");
}

// Agregar al carrito
function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);

    carrito.push(producto);

    actualizarCantidad();

    alert("Producto agregado al carrito.");
}

// Actualizar cantidad
function actualizarCantidad() {
    document.getElementById("cantidad").textContent = carrito.length;
}

// Mostrar carrito
function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, indice) => {
        total += producto.precio;

        lista.innerHTML += `
            <p>
                ${producto.nombre} -
                $${producto.precio.toLocaleString("es-CL")}
                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </p>
        `;
    });

    document.getElementById("total").textContent =
        "Total: $" + total.toLocaleString("es-CL");
}

// Eliminar productos
function eliminarProducto(indice) {
    carrito.splice(indice, 1);

    actualizarCantidad();
    actualizarCarrito();
}

// Confirmar pedido de demostración
function realizarCompra() {
    if (!usuarioActual) {
        alert("Debes iniciar sesión antes de realizar un pedido.");
        mostrarAcceso();
        return;
    }

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const numero = Math.floor(Math.random() * 90000) + 10000;

    document.getElementById("numeroPedido").textContent =
        "Número de pedido: RA-" + numero;

    carrito = [];

    actualizarCantidad();
    mostrarPantalla("confirmacion");
}

// Pantalla inicial
mostrarInicio();
