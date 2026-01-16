# 📚 Documentación: js/main.js

> Este archivo contiene toda la lógica principal del catálogo de productos, búsqueda, filtrado, ordenamiento y la gestión del carrito en la página inicial.

---

## 🔍 Índice de funciones

1. **obtenerProductos()** - Obtiene productos de la API
2. **filtrarProductos()** - Filtra productos por búsqueda, categoría y orden
3. **ordenarProductos()** - Ordena la lista según criterio seleccionado
4. **cargarProductos()** - Renderiza productos en el DOM
5. **actualizarBotonesAgregar()** - Asigna eventos a botones de agregar y ver más
6. **agregarAlCarrito()** - Añade o incrementa producto en el carrito
7. **actualizarNumerito()** - Actualiza el contador de items en el carrito
8. **abrirModal()** - Abre el modal con detalles del producto
9. **cerrarModal()** - Cierra el modal de detalles
10. **renderizarModal()** - Genera el contenido HTML del modal

---

## 📌 Explicación detallada línea por línea

### 1️⃣ obtenerProductos()

```javascript
// PRODUCTOS
async function obtenerProductos() {
```
**Línea 1-2:** Declara una función asíncrona llamada `obtenerProductos()`. La palabra clave `async` permite usar `await` dentro de ella para esperar operaciones asincrónicas.

```javascript
    try {
```
**Línea 3:** Inicia un bloque `try` que maneja operaciones que podrían generar errores.

```javascript
        const respuesta = await fetch("https://fakestoreapi.com/products");
```
**Línea 4:** Realiza una solicitud HTTP GET a la API pública FakeStore. `await` pausa la ejecución hasta que se reciba la respuesta (promesa resuelta). La respuesta se guarda en `respuesta`.

```javascript
        const productosAPI = await respuesta.json();
```
**Línea 5:** Convierte la respuesta de la API (formato JSON) en un objeto JavaScript. `await` pausa hasta que la conversión termine.

```javascript
        const productosTransformados = productosAPI.map(producto => ({
            id: `producto-${producto.id}`,
```
**Línea 8-9:** Usa `.map()` para crear un nuevo array transformando cada producto. El `id` se formatea con prefijo "producto-" para tener IDs únicos y legibles en el DOM.

```javascript
            titulo: producto.title,
            imagen: producto.image,
            descripcion: producto.description,
```
**Línea 10-12:** Mapea los campos de la API a nombres más claros (title → titulo, image → imagen, etc.).

```javascript
            categoria: {
                nombre: producto.category,
                id: producto.category.toLowerCase().replace(/['\s]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
```
**Línea 13-15:** Crea un objeto `categoria` con:
- `nombre`: el nombre original (ej: "men's clothing")
- `id`: versión transformada a slug (ej: "mens-clothing")
  - `.toLowerCase()`: convierte a minúsculas
  - `.replace(/['\s]+/g, "-")`: reemplaza espacios y apóstrofos por guiones
  - `.replace(/-+/g, "-")`: elimina guiones múltiples
  - `.replace(/^-|-$/g, "")`: elimina guiones al inicio y final

```javascript
            precio: producto.price
        }));
```
**Línea 16-17:** Mapea `price` a `precio` y cierra la transformación de cada producto.

```javascript
        cargarProductos(productosTransformados);
```
**Línea 20:** Llama a la función `cargarProductos()` pasando el array transformado para que los renderice en la página.

```javascript
        window.productos = productosTransformados;
```
**Línea 23:** Almacena el array transformado en `window.productos` (variable global) para acceso desde otros scripts.

```javascript
    } catch (error) {
        console.error("Error al obtener los productos de la API:", error);
    }
}
```
**Línea 25-27:** Si ocurre un error durante fetch o JSON parsing, lo captura y lo imprime en la consola del navegador.

```javascript
obtenerProductos();
```
**Línea 29:** Ejecuta la función inmediatamente cuando se carga el script para cargar los productos.

---

### 2️⃣ Selectores DOM y event listeners iniciales

```javascript
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const buscador = document.querySelector("#buscador");
```
**Línea 31-36:** Selecciona elementos HTML del DOM y los almacena en variables para uso posterior:
- `contenedorProductos`: div donde se renderizarán los productos
- `botonesCategorias`: todos los botones de categoría
- `tituloPrincipal`: h2 que muestra el título de la sección
- `botonesAgregar`: botones "Agregar" de cada producto
- `numerito`: span que muestra cantidad de items en carrito
- `buscador`: input de búsqueda

```javascript
if (buscador) {
    buscador.addEventListener("input", filtrarProductos);
}
```
**Línea 38-40:** Si existe el buscador, le asigna un listener al evento `input` (cada vez que el usuario digita). Llama a `filtrarProductos()` en tiempo real.

```javascript
const ordenSelect = document.querySelector("#orden");
if (ordenSelect) ordenSelect.addEventListener("change", filtrarProductos);
```
**Línea 42-43:** Selecciona el select de ordenamiento y cuando cambia (usuario selecciona opción), ejecuta `filtrarProductos()`.

---

### 3️⃣ filtrarProductos()

```javascript
function filtrarProductos() {
    const textoBusqueda = buscador.value.toLowerCase().trim();
```
**Línea 45-46:** Obtiene el texto del buscador, lo convierte a minúsculas y elimina espacios en blanco al inicio/final.

```javascript
    let productosFiltrados = window.productos;
```
**Línea 47:** Crea una copia de referencia al array global de productos. Será filtrado progresivamente.

```javascript
    if (textoBusqueda) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.titulo.toLowerCase().includes(textoBusqueda)
        );
    }
```
**Línea 49-53:** Si hay texto en el buscador, filtra el array manteniendo solo los productos cuyo título contiene el texto buscado (case-insensitive).

```javascript
    const categoriaActiva = document.querySelector(".boton-categoria.active");
    if (categoriaActiva && categoriaActiva.id !== "todos") {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.categoria.id === categoriaActiva.id
        );
    }
```
**Línea 55-59:** Busca qué categoría está activa (tiene clase "active"). Si no es "todos", filtra para mantener solo productos de esa categoría.

```javascript
    const criterio = ordenSelect ? ordenSelect.value : "default";
    productosFiltrados = ordenarProductos(productosFiltrados, criterio);
```
**Línea 61-62:** Obtiene el criterio de ordenamiento del select (o "default" si no existe). Ordena los productos según ese criterio.

```javascript
    cargarProductos(productosFiltrados);
```
**Línea 64:** Renderiza los productos filtrados y ordenados en la pantalla.

---

### 4️⃣ ordenarProductos()

```javascript
function ordenarProductos(lista, criterio) {
    const copia = [...lista];
```
**Línea 66-67:** Crea una copia del array original con spread operator (`...`) para no mutar el original.

```javascript
    switch (criterio) {
        case "price-asc":
            return copia.sort((a, b) => a.precio - b.precio);
```
**Línea 68-70:** Si el criterio es "price-asc" (precio ascendente), ordena de menor a mayor precio.

```javascript
        case "price-desc":
            return copia.sort((a, b) => b.precio - a.precio);
```
**Línea 71-72:** Si es "price-desc", ordena de mayor a menor precio.

```javascript
        case "title-asc":
            return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
```
**Línea 73-74:** Si es "title-asc", ordena alfabéticamente A→Z. `localeCompare()` compara strings respetando caracteres especiales y acentos.

```javascript
        case "title-desc":
            return copia.sort((a, b) => b.titulo.localeCompare(a.titulo));
```
**Línea 75-76:** Ordena alfabéticamente Z→A.

```javascript
        default:
            return copia; // sin ordenar
    }
}
```
**Línea 77-79:** Si el criterio no coincide con ningún caso, devuelve la copia sin ordenar.

---

### 5️⃣ cargarProductos()

```javascript
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
```
**Línea 82-83:** Limpia el contenedor eliminando HTML anterior. Así evita duplicar productos.

```javascript
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
```
**Línea 85-87:** Por cada producto, crea un div con clase "producto".

```javascript
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo.slice(0, 40)}${producto.titulo.length > 10 ? '...' : ''}</h3>
                <p class="producto-precio">$${producto.precio}</p>
```
**Línea 88-92:** Genera HTML usando template literal (backticks). 
- Inserta imagen del producto
- Trunca el título a 40 caracteres, añadiendo "..." si es más largo
- Muestra el precio

```javascript
                <div class="producto-acciones">
                    <button class="producto-ver-mas" data-id="${producto.id}">Ver más</button>
                    <button class="producto-agregar icono-carrito" id="${producto.id}">
                        <img src="./img/comprar.png" alt="Agregar" width="20" height="20"> Agregar
                    </button>
                </div>
```
**Línea 93-99:** Crea dos botones:
- "Ver más": abre modal con detalles. Usa `data-id` para guardar el ID del producto
- "Agregar": agrega al carrito. Usa `id` del botón para identificar qué producto agregar

```javascript
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}
```
**Línea 101-104:** Inserta el div en el contenedor. Luego ejecuta `actualizarBotonesAgregar()` para asignar listeners a los botones nuevos.

---

### 6️⃣ Event listener de botones de categoría

```javascript
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
```
**Línea 107-110:** Para cada botón de categoría, cuando hace click:
1. Remueve la clase "active" de TODOS los botones
2. Añade la clase "active" solo al botón clickeado

```javascript
        if (e.currentTarget.id !== "todos") {
            const productosFiltrados = window.productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosFiltrados[0]?.categoria.nombre || "Categoría";
            cargarProductos(productosFiltrados);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(window.productos);
        }
```
**Línea 112-119:** Si el botón clickeado NO es "todos":
- Filtra productos por la categoría
- Actualiza el título con el nombre de la categoría (usa `?.` optional chaining por si acaso)
- Renderiza solo esos productos

Si es "todos", renderiza TODOS los productos.

---

### 7️⃣ actualizarBotonesAgregar()

```javascript
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });

    const botonesVerMas = document.querySelectorAll('.producto-ver-mas');
    botonesVerMas.forEach(boton => {
        boton.addEventListener('click', abrirModal);
    });
}
```
**Línea 121-131:** 
- Vuelve a seleccionar todos los botones "Agregar" (porque los nuevos HTML creados no tenían listeners)
- Asigna el evento `click` a cada uno para que llame `agregarAlCarrito()`
- Hace lo mismo con botones "Ver más" para abrir modal

---

### 8️⃣ Carrito: obtención del localStorage

```javascript
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}
```
**Línea 134-143:** 
- Declara variable `productosEnCarrito` (sin valor inicial)
- Intenta recuperar el carrito del localStorage
- Si existe, lo convierte de string JSON a objeto JavaScript y actualiza el contador
- Si no existe, inicializa como array vacío

---

### 9️⃣ agregarAlCarrito()

```javascript
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
```
**Línea 146-147:** Obtiene el ID del botón que fue clickeado (que es el ID del producto).

```javascript
    const productoAgregado = window.productos.find(producto => producto.id === idBoton);
```
**Línea 150:** Busca en el array global el producto que coincida con el ID.

```javascript
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
        alert(`${productoAgregado.titulo}\nCantidad actualizada en el carrito: ${productosEnCarrito[index].cantidad}`);
```
**Línea 153-157:** Si el producto YA está en el carrito:
- Encuentra su posición con `findIndex()`
- Incrementa la cantidad en 1
- Muestra un alert al usuario confirmando la actualización

```javascript
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
        alert(`✅ Producto agregado al carrito:\n${productoAgregado.titulo}\nPrecio: $${productoAgregado.precio}`);
    }
```
**Línea 158-162:** Si NO está en el carrito:
- Asigna cantidad = 1 al producto
- Lo agrega al array del carrito con `push()`
- Muestra alert de confirmación

```javascript
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
```
**Línea 165-167:** Actualiza el contador visual y guarda el carrito actualizado en localStorage (convertido a string JSON).

---

### 🔟 actualizarNumerito()

```javascript
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
```
**Línea 169-172:** 
- `reduce()` suma todas las cantidades de los productos: empieza en 0 (`acc`) y suma la cantidad de cada producto
- Actualiza el texto del elemento `#numerito` con el total

---

### 1️⃣1️⃣ Modal: selectores

```javascript
const modalProducto = document.querySelector('#modal-producto');
const cuerpoModal = document.querySelector('#cuerpo-modal');
const botonCerrarModal = document.querySelector('#cerrar-modal');
const overlayModal = document.querySelector('#overlay-modal');
```
**Línea 174-177:** Selecciona los elementos del modal de detalles del producto.

---

### 1️⃣2️⃣ abrirModal()

```javascript
function abrirModal(e){
    const id = e.currentTarget.dataset.id;
```
**Línea 179-180:** Obtiene el ID del producto desde el atributo `data-id` del botón clickeado.

```javascript
    const producto = window.productos.find(p => p.id === id);
    if (!producto) return;
```
**Línea 181-182:** Busca el producto en el array global. Si no existe, termina la función.

```javascript
    renderizarModal(producto);
    modalProducto.classList.remove('disabled');
    modalProducto.setAttribute('aria-hidden', 'false');
}
```
**Línea 183-185:** 
- Renderiza el contenido del modal
- Muestra el modal removiendo la clase "disabled"
- Actualiza atributo de accesibilidad para lectores de pantalla

---

### 1️⃣3️⃣ cerrarModal()

```javascript
function cerrarModal(){
    if (!modalProducto) return;
    modalProducto.classList.add('disabled');
    modalProducto.setAttribute('aria-hidden', 'true');
    cuerpoModal.innerHTML = '';
}
```
**Línea 187-191:**
- Verifica que el modal exista
- Oculta el modal agregando "disabled"
- Actualiza accesibilidad
- Limpia el contenido HTML

---

### 1️⃣4️⃣ renderizarModal()

```javascript
function renderizarModal(producto){
    cuerpoModal.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div>
            <h3 id="modal-titulo">${producto.titulo}</h3>
            <p class="modal-categoria">Categoría: ${producto.categoria.nombre}</p>
            <p class="modal-precio">Precio: $${producto.precio}</p>
            <p class="modal-descripcion">${producto.descripcion || 'Sin descripción'}</p>
```
**Línea 193-201:** Genera HTML con todos los detalles del producto dentro del modal.

```javascript
            <div class="modal-acciones">
                <button id="modal-agregar" class="producto-agregar">Agregar al carrito</button>
                <button id="modal-cerrar" class="cerrar-modal-btn">Cerrar</button>
            </div>
        </div>
    `;

    const botonAgregarModal = document.querySelector('#modal-agregar');
    botonAgregarModal.addEventListener('click', () => {
        const fakeEvent = { currentTarget: { id: producto.id } };
        agregarAlCarrito(fakeEvent);
        cerrarModal();
    });
```
**Línea 202-213:**
- Crea botones de "Agregar" y "Cerrar"
- Selecciona el botón agregar
- Cuando se clickea:
  - Crea un objeto fake que simula un evento con el ID del producto
  - Llama a `agregarAlCarrito()` con ese fake event
  - Cierra el modal

```javascript
    const botonCerrarInterior = document.querySelector('#modal-cerrar');
    botonCerrarInterior.addEventListener('click', cerrarModal);
}
```
**Línea 215-217:** El botón "Cerrar" dentro del modal ejecuta `cerrarModal()`.

---

### 1️⃣5️⃣ Event listeners del modal

```javascript
if (botonCerrarModal) botonCerrarModal.addEventListener('click', cerrarModal);
if (overlayModal) overlayModal.addEventListener('click', cerrarModal);
```
**Línea 219-220:** 
- Botón X del modal cierra el modal
- Clickear en el fondo gris (overlay) también cierra

```javascript
window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && modalProducto && !modalProducto.classList.contains('disabled')){
        cerrarModal();
    }
});
```
**Línea 221-225:** Si el usuario presiona la tecla ESC y el modal está abierto, lo cierra automáticamente.

---

## 📊 Resumen de flujo

1. **Carga:** `obtenerProductos()` trae datos de la API y renderiza
2. **Usuario interactúa:**
   - Digita en el buscador → `filtrarProductos()`
   - Selecciona categoría → Filtra y redefine productos
   - Cambia orden → `ordenarProductos()` reordena
3. **Ver producto:** Click en "Ver más" → `abrirModal()` muestra detalles
4. **Agregar:** Click en "Agregar" → `agregarAlCarrito()` añade/incrementa en el carrito

---
## 🔐 Integración con Sistema de Autenticación

Este archivo (`main.js`) llama funciones del sistema de autenticación (`auth.js`):

### Botón de Cerrar Sesión (línea 265-266)

```javascript
if (hayUsuarioLogueado()) {
    cerrarSesion();
}
```

- `hayUsuarioLogueado()`: Verifica si hay usuario logueado
- `cerrarSesion()`: Cierra sesión y limpia carrito

### Mostrar nombre de usuario (línea 348-349)

```javascript
if (hayUsuarioLogueado()) {
    const usuario = obtenerNombreUsuario();
```

- `obtenerNombreUsuario()`: Obtiene el email del usuario logueado
- Se usa para personalizar la interfaz (mostrar quién está logueado)

### Relación con carrito.js

- Cuando un usuario logueado compra, `carrito.js` llama:
  - `guardarCompraUsuario(compra)`: Guarda en historial del usuario
  - `obtenerHistorialUsuario()`: Obtiene compras previas del usuario

---