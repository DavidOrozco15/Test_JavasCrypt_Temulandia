let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
// COPILOT: Variable para guardar el historial de todas las compras (AGREGADA POR COPILOT)
// Puede eliminarse: SÍ, sin afectar la funcionalidad base del carrito
let historialCompras = JSON.parse(localStorage.getItem("historial-compras")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
// COPILOT: Selector para el botón de historial (AGREGADO POR COPILOT)
// Puede eliminarse: SÍ, sin afectar la funcionalidad base del carrito
const botonHistorial = document.querySelector("#boton-historial");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo.slice(0, 10)}${producto.titulo.length > 10 ? '...' : ''}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">
                    <img src="./img/eliminar-carrito.png" alt="Eliminar producto" width="20" height="20">
                </button>
            `;

            contenedorCarritoProductos.append(div);
        })

        actualizarBotonesEliminar();
        actualizarTotal();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    const confirmacion = confirm("¿Estás seguro de que quieres vaciar el carrito?");
    
    if (confirmacion) {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    }
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    if (contenedorTotal) contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    if (!productosEnCarrito || productosEnCarrito.length === 0) return;

    // Snapshot de la compra
    const productosComprados = productosEnCarrito.map(p => ({ ...p }));
    const totalCompra = productosEnCarrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    // COPILOT: Guardar la compra en el historial de compras (AGREGADO POR COPILOT)
    // Puede eliminarse: SÍ, pero afectaría la funcionalidad del historial
    const compra = {
        id: Date.now(),
        fecha: new Date().toLocaleString('es-ES'),
        productos: productosComprados,
        total: totalCompra
    };
    historialCompras.push(compra);
    localStorage.setItem("historial-compras", JSON.stringify(historialCompras));

    // Renderizar resumen antes de vaciar
    renderizarResumenCompra(productosComprados, totalCompra);

    // Vaciar carrito y persistir
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Actualizar vista del carrito
    cargarProductosCarrito();
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");


function renderizarResumenCompra(productosComprados, total) {
    const resumenContenedor = document.querySelector('#carrito-resumen');
    const lista = document.querySelector('#resumen-lista');
    const totalSpan = document.querySelector('#resumen-total');

    if (!resumenContenedor || !lista || !totalSpan) return;

    lista.innerHTML = '';
    productosComprados.forEach(p => {
        const item = document.createElement('div');
        item.classList.add('resumen-item');
        item.innerHTML = `
            <div class="resumen-info">
                <strong>${p.titulo}</strong>
                <div>Categoria: ${p.categoria?.nombre || ''}</div>
                <div>Precio unitario: $${Number(p.precio).toFixed(2)}</div>
                <div>Cantidad: ${p.cantidad}</div>
            </div>
            <div class="resumen-subtotal">$${(p.precio * p.cantidad).toFixed(2)}</div>
        `;
        lista.appendChild(item);
    });

    totalSpan.innerText = `$${Number(total).toFixed(2)}`;
    resumenContenedor.classList.remove('disabled');

    // accesibilidad
    resumenContenedor.setAttribute('aria-hidden', 'false');

    const btnCerrar = document.querySelector('#resumen-cerrar');
    if (btnCerrar) btnCerrar.addEventListener('click', () => {
        resumenContenedor.classList.add('disabled');
        resumenContenedor.setAttribute('aria-hidden', 'true');
        // mostrar mensaje de gracias
        contenedorCarritoComprado.classList.remove('disabled');
    });
}
}

// ===== COPILOT: FUNCIONES DEL HISTORIAL DE COMPRAS (AGREGADAS POR COPILOT) =====
// Puede eliminarse: SÍ, completamente, sin afectar la funcionalidad base del carrito
if (botonHistorial) {
    botonHistorial.addEventListener('click', mostrarHistorial);
}

function mostrarHistorial() {
    const modalHistorial = document.querySelector('#modal-historial');
    const historiallista = document.querySelector('#historial-lista');
    const historiallVacio = document.querySelector('#historial-vacio');

    if (!modalHistorial) return;

    if (historialCompras && historialCompras.length > 0) {
        historiallVacio.classList.add('disabled');
        historiallista.innerHTML = '';

        historialCompras.forEach((compra, index) => {
            const item = document.createElement('div');
            item.classList.add('historial-item');
            item.innerHTML = `
                <div class="historial-item-info">
                    <strong>Compra #${index + 1}</strong>
                    <div>${compra.fecha}</div>
                    <div>${compra.productos.length} producto(s)</div>
                </div>
                <div class="historial-item-total">${compra.total.toFixed(2)}$</div>
            `;
            item.addEventListener('click', () => mostrarDetalleCompra(compra.id));
            historiallista.appendChild(item);
        });
    } else {
        historiallVacio.classList.remove('disabled');
        historiallista.innerHTML = '';
    }

    modalHistorial.classList.remove('disabled');
    modalHistorial.setAttribute('aria-hidden', 'false');

    const btnCerrarHistorial = document.querySelector('#historial-cerrar');
    if (btnCerrarHistorial) {
        btnCerrarHistorial.onclick = () => {
            modalHistorial.classList.add('disabled');
            modalHistorial.setAttribute('aria-hidden', 'true');
        };
    }
}

function mostrarDetalleCompra(compraId) {
    const compra = historialCompras.find(c => c.id === compraId);
    if (!compra) return;

    const modalDetalle = document.querySelector('#modal-detalle-compra');
    const detalleProductos = document.querySelector('#detalle-productos');
    const detalleFecha = document.querySelector('.detalle-fecha');
    const detalleTotal = document.querySelector('#detalle-total-span');
    const modalHistorial = document.querySelector('#modal-historial');

    if (!modalDetalle || !detalleProductos || !detalleFecha) return;

    detalleFecha.innerHTML = `<strong>Fecha:</strong> ${compra.fecha}`;
    detalleProductos.innerHTML = '';

    compra.productos.forEach(p => {
        const item = document.createElement('div');
        item.classList.add('detalle-item');
        item.innerHTML = `
            <div class="detalle-info">
                <strong>${p.titulo}</strong>
                <div>Categoría: ${p.categoria?.nombre || ''}</div>
                <div>Precio unitario: $${Number(p.precio).toFixed(2)}</div>
                <div>Cantidad: ${p.cantidad}</div>
            </div>
            <div class="detalle-subtotal">$${(p.precio * p.cantidad).toFixed(2)}</div>
        `;
        detalleProductos.appendChild(item);
    });

    detalleTotal.innerText = `$${Number(compra.total).toFixed(2)}`;

    // Cerrar historial y abrir detalle
    modalHistorial.classList.add('disabled');
    modalDetalle.classList.remove('disabled');
    modalDetalle.setAttribute('aria-hidden', 'false');

    const btnCerrarDetalle = document.querySelector('#detalle-cerrar');
    if (btnCerrarDetalle) {
        btnCerrarDetalle.onclick = () => {
            modalDetalle.classList.add('disabled');
            modalDetalle.setAttribute('aria-hidden', 'true');
            mostrarHistorial();
        };
    }

    const btnVolverHistorial = document.querySelector('#volver-historial');
    if (btnVolverHistorial) {
        btnVolverHistorial.onclick = () => {
            modalDetalle.classList.add('disabled');
            modalDetalle.setAttribute('aria-hidden', 'true');
            mostrarHistorial();
        };
    }
}
// ===== FIN DE CÓDIGO COPILOT =====