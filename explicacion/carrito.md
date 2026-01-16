# 📚 Documentación: js/carrito.js

> Este archivo gestiona todo lo relacionado con la página del carrito: cargar productos, actualizar total, eliminar items, vaciar carrito y comprar. **NOTA:** Las funciones marcadas como COPILOT se describen de forma básica sin detalle, ya que fueron agregadas después.

---

## 🔍 Índice de funciones

### CÓDIGO ORIGINAL
1. **cargarProductosCarrito()** - Renderiza los productos en el carrito
2. **actualizarBotonesEliminar()** - Asigna eventos a botones de eliminar
3. **eliminarDelCarrito()** - Elimina un producto del carrito
4. **vaciarCarrito()** - Vacía completamente el carrito
5. **actualizarTotal()** - Recalcula y muestra el total
6. **comprarCarrito()** - Procesa la compra (MODIFICADO en actualización)
7. **renderizarResumenCompra()** - Muestra resumen de la compra (MODIFICADO en actualización)

### NUEVAS FUNCIONES (Actualización: Formulario de Compra)
8. **mostrarFormularioCompra()** - Abre modal con formulario de datos del cliente
9. **completarCompra(datosCliente)** - Procesa la compra con datos del cliente
10. **mostrarHistorial()** - Abre modal del historial de compras del usuario
11. **mostrarDetalleCompra(compraId)** - Muestra detalles de una compra específica

---

## 📌 Explicación línea por línea

### 1️⃣ Variables globales

```javascript
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
```
**Línea 1:** 
- Obtiene del navegador lo que se guardó con clave "productos-en-carrito"
- `JSON.parse()` convierte el string almacenado a objeto/array JavaScript
- El `||` (OR) devuelve un array vacío si no hay nada guardado

```javascript
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
```
**Línea 5-12:** Selecciona todos los elementos HTML que se usarán en el carrito:
- `contenedorCarritoVacio`: mensaje cuando carrito está vacío
- `contenedorCarritoProductos`: div donde va la lista de productos
- `contenedorCarritoAcciones`: botones de acciones (vaciar, comprar)
- `contenedorCarritoComprado`: mensaje de compra exitosa
- `botonesEliminar`: botones para eliminar cada producto
- `botonVaciar`: botón "Vaciar carrito"
- `contenedorTotal`: span que muestra el total
- `botonComprar`: botón "Comprar Ahora"

---

### 2️⃣ cargarProductosCarrito()

```javascript
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
```
**Línea 18-19:** Verifica si hay productos en el carrito (NO está vacío y tiene longitud > 0).

```javascript
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
```
**Línea 20-23:** Si hay productos:
- Oculta el mensaje "Carrito Vacío"
- Muestra la lista de productos
- Muestra los botones de acciones (vaciar, comprar)
- Oculta el mensaje de compra exitosa

```javascript
        contenedorCarritoProductos.innerHTML = "";
```
**Línea 25:** Limpia el contenedor para no duplicar elementos.

```javascript
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
```
**Línea 27-29:** Por cada producto en el carrito, crea un div con clase "carrito-producto".

```javascript
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
```
**Línea 30-45:** Genera HTML de cada producto con:
- Imagen del producto
- Título truncado a 10 caracteres
- Cantidad agregada
- Precio unitario
- Subtotal (precio × cantidad)

```javascript
                <button class="carrito-producto-eliminar" id="${producto.id}">
                    <img src="./img/eliminar-carrito.png" alt="Eliminar producto" width="20" height="20">
                </button>
            `;

            contenedorCarritoProductos.append(div);
        })
```
**Línea 46-51:** 
- Crea botón para eliminar el producto (usa el ID como identificador)
- Inserta el div con todo en el contenedor

```javascript
        actualizarBotonesEliminar();
        actualizarTotal();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}
```
**Línea 53-61:** 
- Después de renderizar, actualiza los eventos de los botones de eliminar
- Recalcula el total
- SI EL CARRITO ESTÁ VACÍO: muestra mensaje de vacío, oculta productos, acciones y compra exitosa

```javascript
cargarProductosCarrito();
```
**Línea 63:** Ejecuta la función al cargar la página para mostrar los productos guardados.

---

### 3️⃣ actualizarBotonesEliminar()

```javascript
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}
```
**Línea 66-71:**
- Vuelve a seleccionar todos los botones de eliminar (porque son creados dinámicamente)
- Asigna el evento `click` a cada uno para que ejecute `eliminarDelCarrito()`

---

### 4️⃣ eliminarDelCarrito()

```javascript
function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
```
**Línea 73-74:** Obtiene el ID del botón clickeado (que es el ID del producto a eliminar).

```javascript
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
```
**Línea 76:** Busca la posición del producto en el array usando `findIndex()`.

```javascript
    productosEnCarrito.splice(index, 1);
```
**Línea 78:** Elimina 1 elemento del array en la posición encontrada. `splice()` modifica el array original.

```javascript
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
```
**Línea 79-81:** 
- Recarga la vista del carrito (actualiza el HTML)
- Guarda el carrito actualizado en localStorage

---

### 5️⃣ vaciarCarrito()

```javascript
botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    const confirmacion = confirm("¿Estás seguro de que quieres vaciar el carrito?");
```
**Línea 84-87:**
- El botón "Vaciar" ejecuta esta función
- Muestra un `confirm()` para que el usuario confirme

```javascript
    if (confirmacion) {
        productosEnCarrito.length = 0;
```
**Línea 89-90:** Si el usuario confirma, vacía el array asignando longitud 0.

```javascript
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    }
}
```
**Línea 91-93:** 
- Guarda el array vacío en localStorage
- Recarga la vista (mostrará "Carrito Vacío")

---

### 6️⃣ actualizarTotal()

```javascript
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
```
**Línea 95-96:**
- `reduce()` suma todos los subtotales:
  - `acc` (acumulador) comienza en 0
  - Por cada producto suma: `acc + (precio × cantidad)`
  - Resultado es el total de toda la compra

```javascript
    if (contenedorTotal) contenedorTotal.innerText = `$${totalCalculado}`;
}
```
**Línea 97:** Si existe el elemento, actualiza su texto con el total.

---

### 7️⃣ comprarCarrito()

```javascript
botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    if (!productosEnCarrito || productosEnCarrito.length === 0) return;
```
**Línea 99-103:**
- El botón "Comprar Ahora" ejecuta esta función
- Si el carrito está vacío, termina sin hacer nada

```javascript
    // Snapshot de la compra
    const productosComprados = productosEnCarrito.map(p => ({ ...p }));
    const totalCompra = productosEnCarrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
```
**Línea 105-107:**
- Crea una COPIA de los productos (snapshot) para guardar el estado en ese momento
- Calcula el total de la compra

```javascript
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
```
**Línea 109-120:**
- Muestra el resumen de lo que se compró
- Vacía el array del carrito
- Guarda en localStorage
- Recarga la vista
- Oculta todo (productos, botones, etc.)

---

### 8️⃣ renderizarResumenCompra()

```javascript
function renderizarResumenCompra(productosComprados, total) {
    const resumenContenedor = document.querySelector('#carrito-resumen');
    const lista = document.querySelector('#resumen-lista');
    const totalSpan = document.querySelector('#resumen-total');

    if (!resumenContenedor || !lista || !totalSpan) return;
```
**Línea 123-129:**
- Selecciona los elementos del modal de resumen
- Si alguno no existe, termina la función

```javascript
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
```
**Línea 131-145:**
- Limpia el contenedor de items
- Por cada producto comprado, crea un div con:
  - Título
  - Categoría (usa `?.` por si no existe)
  - Precio unitario con 2 decimales (`.toFixed(2)`)
  - Cantidad
  - Subtotal

```javascript
    totalSpan.innerText = `$${Number(total).toFixed(2)}`;
    resumenContenedor.classList.remove('disabled');

    // accesibilidad
    resumenContenedor.setAttribute('aria-hidden', 'false');
```
**Línea 147-151:**
- Actualiza el total con 2 decimales
- Muestra el modal removiendo la clase "disabled"
- Actualiza atributo de accesibilidad

```javascript
    const btnCerrar = document.querySelector('#resumen-cerrar');
    if (btnCerrar) btnCerrar.addEventListener('click', () => {
        resumenContenedor.classList.add('disabled');
        resumenContenedor.setAttribute('aria-hidden', 'true');
        // mostrar mensaje de gracias
        contenedorCarritoComprado.classList.remove('disabled');
    });
}
```
**Línea 153-159:**
- Selecciona el botón de cerrar el resumen
- Cuando se hace click:
  - Oculta el modal de resumen
  - Actualiza accesibilidad
  - Muestra el mensaje "Muchas gracias por tu compra"

---

## 📊 Flujo del carrito

1. **Carga:** `cargarProductosCarrito()` obtiene productos del localStorage y los renderiza
2. **Usuario interactúa:**
   - Click "Eliminar" → `eliminarDelCarrito()` → recarga lista
   - Click "Vaciar carrito" → `vaciarCarrito()` (con confirmación)
   - Click "Comprar Ahora" → `comprarCarrito()`
3. **Compra:**
   - Toma snapshot de productos
   - Muestra resumen con `renderizarResumenCompra()`
   - Vacía carrito
   - Muestra mensaje de gracias

---

## ⚠️ Nota sobre código COPILOT

Las siguientes funciones fueron agregadas en actualización y se describen con detalle:
- `mostrarFormularioCompra()` (línea 127 en adelante) - **NUEVA**
- `completarCompra(datosCliente)` (línea 141 en adelante) - **NUEVA**
- `mostrarHistorial()` (línea 185 en adelante)
- `mostrarDetalleCompra(compraId)` (línea 230 en adelante)

---

## 🆕 ACTUALIZACIÓN: Formulario de Compra

### Flujo modificado de compra

Antes (v1):
```
Click "Comprar" → Resumen → Guardar
```

Ahora (v2):
```
Click "Comprar" → FORMULARIO (datos del cliente) → Resumen con datos → Guardar
```

---

## 9️⃣ comprarCarrito() [MODIFICADO]

```javascript
function comprarCarrito() {
    if (!productosEnCarrito || productosEnCarrito.length === 0) return;

    // Mostrar formulario de datos de entrega
    mostrarFormularioCompra();
}
```

**Cambio:** Ahora solo verifica que haya productos y abre el formulario. No directamente el resumen.

---

## 🔟 mostrarFormularioCompra() [NUEVO]

```javascript
function mostrarFormularioCompra() {
    const modalFormulario = document.querySelector('#modal-formulario-compra');
    const inputCorreo = document.querySelector('#correo');
    
    if (!modalFormulario) return;
    
    // Pre-llenar el correo con el del usuario logueado
    inputCorreo.value = obtenerNombreUsuario();
    
    // Mostrar modal
    modalFormulario.classList.remove('disabled');
    modalFormulario.setAttribute('aria-hidden', 'false');
}
```

**Línea 127-140:**
- Selecciona el modal del formulario
- Selecciona el campo de correo
- Valida que exista el modal
- Pre-llena el correo del usuario logueado usando `obtenerNombreUsuario()` (función de `auth.js`)
- Muestra el modal removiendo clase "disabled"
- Actualiza atributo de accesibilidad para lectores de pantalla

---

## 1️⃣1️⃣ completarCompra(datosCliente) [NUEVO]

```javascript
function completarCompra(datosCliente) {
    // Snapshot de la compra
    const productosComprados = productosEnCarrito.map(p => ({ ...p }));
    const totalCompra = productosEnCarrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    // Crear objeto de compra con datos del cliente
    const compra = {
        id: Date.now(),
        fecha: new Date().toLocaleString('es-ES'),
        productos: productosComprados,
        total: totalCompra,
        cliente: datosCliente  // Incluir datos del cliente
    };
```

**Línea 141-155:**
- Crea una copia (snapshot) de los productos en ese momento
- Calcula el total
- Crea un objeto `compra` con:
  - `id`: timestamp actual (único para cada compra)
  - `fecha`: fecha/hora actual en formato español
  - `productos`: array de productos comprados
  - `total`: cantidad total
  - `cliente`: objeto con datos del cliente (nombres, teléfono, dirección, etc.)

```javascript
    // Guardar compra
    guardarCompraUsuario(compra);

    // Renderizar resumen con datos del cliente
    renderizarResumenCompra(productosComprados, totalCompra, datosCliente);

    // Vaciar carrito y persistir
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Actualizar vista del carrito
    cargarProductosCarrito();
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    
    // Cerrar formulario
    const modalFormulario = document.querySelector('#modal-formulario-compra');
    modalFormulario.classList.add('disabled');
}
```

**Línea 157-174:**
- `guardarCompraUsuario(compra)`: Guarda la compra en localStorage para el usuario logueado (función de `auth.js`)
- `renderizarResumenCompra()`: Muestra el resumen AHORA INCLUYENDO los datos del cliente (ver parámetro nuevo)
- Limpia el carrito (longitud 0)
- Guarda el carrito vacío en localStorage
- Recarga la vista del carrito
- Oculta todos los elementos del carrito
- Cierra el modal del formulario

---

## 1️⃣2️⃣ renderizarResumenCompra() [MODIFICADO]

```javascript
function renderizarResumenCompra(productosComprados, total, datosCliente = null) {
    const resumenContenedor = document.querySelector('#carrito-resumen');
    const lista = document.querySelector('#resumen-lista');
    const totalSpan = document.querySelector('#resumen-total');

    if (!resumenContenedor || !lista || !totalSpan) return;

    lista.innerHTML = '';
    
    // Si hay datos del cliente, mostrarlos primero
    if (datosCliente) {
        const seccionCliente = document.createElement('div');
        seccionCliente.className = 'resumen-seccion-cliente';
        seccionCliente.innerHTML = `
            <h3>Información de Entrega</h3>
            <div class="resumen-cliente-info">
                <p><strong>Nombres:</strong> ${datosCliente.nombres}</p>
                <p><strong>Correo:</strong> ${datosCliente.correo}</p>
                <p><strong>Teléfono:</strong> ${datosCliente.telefono}</p>
                <p><strong>Dirección:</strong> ${datosCliente.direccion}</p>
                <p><strong>Ciudad:</strong> ${datosCliente.ciudad}</p>
                <p><strong>Departamento:</strong> ${datosCliente.departamento}</p>
                <p><strong>Código Postal:</strong> ${datosCliente.codigoPostal}</p>
                <p><strong>Método de Pago:</strong> ${datosCliente.metodoPago === 'efectivo' ? 'Efectivo' : 'Tarjeta'}</p>
            </div>
        `;
        lista.appendChild(seccionCliente);
        
        // Agregar separador
        const separador = document.createElement('hr');
        lista.appendChild(separador);
    }
```

**Cambio en firma:** Ahora acepta parámetro `datosCliente = null` (opcional)

**Línea 182-208:**
- Si se proporciona `datosCliente` (objeto con nombres, correo, teléfono, etc.):
  - Crea una sección con clase "resumen-seccion-cliente"
  - Muestra todos los datos de entrega del cliente
  - El ternario convierte "efectivo"/"tarjeta" a texto legible
  - Agrega un `<hr>` (línea) como separador visual

```javascript
    // Mostrar productos
    const seccionProductos = document.createElement('div');
    seccionProductos.className = 'resumen-seccion-productos';
    seccionProductos.innerHTML = '<h3>Productos Comprados</h3>';
    
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
        seccionProductos.appendChild(item);
    });
    lista.appendChild(seccionProductos);
```

**Línea 210-225:**
- Crea sección de productos con clase "resumen-seccion-productos"
- Por cada producto, muestra título, categoría, precio unitario, cantidad y subtotal
- Estructura igual que antes, solo se coloca DESPUÉS de la sección de cliente (si existe)

---

## 1️⃣3️⃣ mostrarHistorial() [COPILOT - FUNCIONA CON DATOS DEL CLIENTE]

```javascript
function mostrarHistorial() {
    const modalHistorial = document.querySelector('#modal-historial');
    const historiallista = document.querySelector('#historial-lista');
    const historiallVacio = document.querySelector('#historial-vacio');

    if (!modalHistorial) return;

    // Obtener historial del usuario actual
    const historialActual = hayUsuarioLogueado() ? obtenerHistorialUsuario() : [];
    
    if (historialActual && historialActual.length > 0) {
        historiallVacio.classList.add('disabled');
        historiallista.innerHTML = '';

        historialActual.forEach((compra, index) => {
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
        
        modalHistorial.classList.remove('disabled');
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
```

**Línea 227-273:**
- Abre el modal del historial
- Obtiene el historial del usuario logueado usando `obtenerHistorialUsuario()` de `auth.js`
- Si hay compras:
  - Las itera y crea items con: número de compra, fecha, cantidad de productos, total
  - Asigna evento click a cada item para ver detalles
  - Oculta mensaje de "historial vacío"
- Si NO hay compras:
  - Muestra mensaje de historial vacío
- Asigna evento al botón cerrar para ocultar el modal

---

## 1️⃣4️⃣ mostrarDetalleCompra(compraId) [COPILOT - MUESTRA DATOS DEL CLIENTE]

```javascript
function mostrarDetalleCompra(compraId) {
    const compra = obtenerHistorialUsuario().find(c => c.id === compraId);
    if (!compra) return;

    const modalDetalle = document.querySelector('#modal-detalle-compra');
    const detalleProductos = document.querySelector('#detalle-productos');
    const detalleFecha = document.querySelector('.detalle-fecha');
    const detalleTotal = document.querySelector('#detalle-total-span');
    const modalHistorial = document.querySelector('#modal-historial');

    if (!modalDetalle || !detalleProductos || !detalleFecha) return;

    detalleFecha.innerHTML = `<strong>Fecha:</strong> ${compra.fecha}`;
    detalleProductos.innerHTML = '';
    
    // Si hay datos del cliente, mostrarlos primero
    if (compra.cliente) {
        const seccionCliente = document.createElement('div');
        seccionCliente.className = 'resumen-seccion-cliente';
        seccionCliente.innerHTML = `
            <h3>Información de Entrega</h3>
            <div class="resumen-cliente-info">
                <p><strong>Nombres:</strong> ${compra.cliente.nombres}</p>
                <p><strong>Correo:</strong> ${compra.cliente.correo}</p>
                <p><strong>Teléfono:</strong> ${compra.cliente.telefono}</p>
                <p><strong>Dirección:</strong> ${compra.cliente.direccion}</p>
                <p><strong>Ciudad:</strong> ${compra.cliente.ciudad}</p>
                <p><strong>Departamento:</strong> ${compra.cliente.departamento}</p>
                <p><strong>Código Postal:</strong> ${compra.cliente.codigoPostal}</p>
                <p><strong>Método de Pago:</strong> ${compra.cliente.metodoPago === 'efectivo' ? 'Efectivo' : 'Tarjeta'}</p>
            </div>
        `;
        detalleProductos.appendChild(seccionCliente);
        
        // Agregar separador
        const separador = document.createElement('hr');
        detalleProductos.appendChild(separador);
    }
    
    // Mostrar productos
    const seccionProductos = document.createElement('div');
    seccionProductos.className = 'resumen-seccion-productos';
    seccionProductos.innerHTML = '<h3>Productos Comprados</h3>';

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
        seccionProductos.appendChild(item);
    });
    
    detalleProductos.appendChild(seccionProductos);

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
```

**Línea 275-359:**
- Busca la compra por ID usando `find()`
- Valida que exista
- Selecciona elementos del modal de detalle
- Muestra la fecha de la compra
- **NUEVO:** Si hay `compra.cliente`, muestra la sección con datos de entrega del cliente (igual que en resumen)
- Muestra los productos comprados con sus detalles
- Actualiza el total
- Cierra el historial y abre el modal de detalle
- Asigna eventos a botones cerrar y volver para regresar al historial

---

## 📊 Flujo de compra ACTUALIZADO

1. **Carrito:**
   - Usuario agrega productos
   - Carrito los guarda en localStorage

2. **Click "Comprar Ahora":**
   - `comprarCarrito()` llama `mostrarFormularioCompra()`
   - Se abre modal con formulario
   - Correo pre-rellenado del usuario logueado

3. **Usuario completa formulario:**
   - Nombres, teléfono, dirección, ciudad, departamento, código postal, método de pago
   - Hace click en "Completar Compra"
   - Validación de campos

4. **Procesar compra:**
   - `completarCompra(datosCliente)` se ejecuta
   - Crea objeto compra con `id`, `fecha`, `productos`, `total`, `cliente`
   - `guardarCompraUsuario()` guarda en localStorage bajo el usuario
   - `renderizarResumenCompra()` muestra resumen CON datos del cliente
   - Carrito se vacía

5. **Historial:**
   - Usuario puede ver su historial de compras
   - Cada compra muestra los datos de entrega que registró

---

## 💾 Estructura localStorage actualizada

```
localStorage {
  "productos-en-carrito": [
    { id: 1, titulo: "...", precio: 10, cantidad: 2, ... },
    { id: 2, titulo: "...", precio: 20, cantidad: 1, ... }
  ],
  
  "usuarios": {
    "user1": { nombre: "user1", password: "...", email: "..." },
    "user2": { ... }
  },
  
  "historial-compras": {
    "user1": [
      {
        id: 1705430400000,
        fecha: "16/1/2026, 10:30:45",
        productos: [ ... ],
        total: 50.00,
        cliente: {
          nombres: "Juan Pérez",
          correo: "juan@email.com",
          telefono: "3201234567",
          direccion: "Calle 10 #20-30",
          ciudad: "Bogotá",
          departamento: "Cundinamarca",
          codigoPostal: "110111",
          metodoPago: "tarjeta"
        }
      }
    ],
    "user2": [ ... ]
  }
}
```
