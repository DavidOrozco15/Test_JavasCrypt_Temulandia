# 📚 Documentación: js/carrito.js

> Este archivo gestiona todo lo relacionado con la página del carrito: cargar productos, actualizar total, eliminar items, vaciar carrito y comprar. **NOTA:** Las funciones marcadas como COPILOT se describen de forma básica sin detalle, ya que fueron agregadas después.

---

## 🔍 Índice de funciones (CÓDIGO ORIGINAL)

1. **cargarProductosCarrito()** - Renderiza los productos en el carrito
2. **actualizarBotonesEliminar()** - Asigna eventos a botones de eliminar
3. **eliminarDelCarrito()** - Elimina un producto del carrito
4. **vaciarCarrito()** - Vacía completamente el carrito
5. **actualizarTotal()** - Recalcula y muestra el total
6. **comprarCarrito()** - Procesa la compra
7. **renderizarResumenCompra()** - Muestra resumen de la compra

**FUNCIONES COPILOT (no se detallan):**
- `mostrarHistorial()` - Abre modal del historial
- `mostrarDetalleCompra()` - Muestra detalles de una compra específica

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

Las siguientes funciones fueron agregadas por Copilot y se describen sin detalle:
- `mostrarHistorial()` (línea 203 en adelante)
- `mostrarDetalleCompra()` (línea 244 en adelante)

Para entender estas funciones, ver comentarios en el código o el archivo [COMENTARIOS_COPILOT.md]

---
