# 📖 Guía de Documentación - TemuLandia

Esta carpeta contiene la documentación completa del sistema de TemuLandia, dividida por funcionalidad.

---

## 📚 Archivos de documentación

### 1. **auth.md** - Sistema de Autenticación
Documentación completa del sistema de registro, login y gestión de sesiones.

**Funciones documentadas:**
- `obtenerUsuarios()` - Lee usuarios del localStorage
- `guardarUsuarios()` - Guarda usuarios
- `obtenerUsuarioActual()` - Obtiene usuario logueado
- `establecerUsuarioActual()` - Establece usuario logueado
- `cerrarSesion()` - Cierra sesión
- `registrarUsuario()` - Registra nuevo usuario
- `loginUsuario()` - Inicia sesión
- `obtenerHistorialUsuario()` - Obtiene compras del usuario
- `guardarCompraUsuario()` - Guarda compra en historial
- `hayUsuarioLogueado()` - Verifica si hay sesión
- `obtenerNombreUsuario()` - Obtiene email del usuario

**Contenido:**
- Explicación línea por línea de cada función
- Ejemplos de estructura localStorage
- Flujos completos (registro → login → compra → historial)
- Notas de seguridad

---

### 2. **carrito.md** - Gestión del Carrito y Compras
Documentación del carrito de compras, incluida la nueva funcionalidad de formulario de compra.

**Funciones documentadas (ORIGINALES):**
- `cargarProductosCarrito()` - Renderiza productos
- `actualizarBotonesEliminar()` - Asigna eventos
- `eliminarDelCarrito()` - Elimina producto
- `vaciarCarrito()` - Vacía carrito
- `actualizarTotal()` - Calcula total

**FUNCIONES NUEVAS (Formulario de Compra):**
- `mostrarFormularioCompra()` - Abre modal del formulario
- `completarCompra(datosCliente)` - Procesa compra con datos del cliente
- `renderizarResumenCompra()` - MODIFICADA para mostrar datos del cliente

**FUNCIONES HISTORIAL:**
- `mostrarHistorial()` - Abre modal del historial
- `mostrarDetalleCompra()` - Muestra detalle de una compra

**Contenido:**
- Explicación detallada línea por línea
- Diagrama de flujo de compra (ORIGINAL vs ACTUALIZADO)
- Estructura localStorage actualizada con datos del cliente
- Ejemplos de objetos de compra

---

### 3. **main.md** - Catálogo y Búsqueda
Documentación del catálogo de productos, búsqueda, filtrado y ordenamiento.

**Funciones documentadas:**
- `obtenerProductos()` - Obtiene de API FakeStore
- `filtrarProductos()` - Filtra por búsqueda/categoría
- `ordenarProductos()` - Ordena productos
- `cargarProductos()` - Renderiza en DOM
- `actualizarBotonesAgregar()` - Asigna eventos
- `agregarAlCarrito()` - Añade al carrito
- `actualizarNumerito()` - Actualiza contador
- `abrirModal()` / `cerrarModal()` - Modales
- `renderizarModal()` - Contenido del modal

**Contenido:**
- Explicación de integración con FakeStore API
- Flujo de búsqueda y filtrado
- Cómo agregar productos al carrito
- Nueva sección: Integración con auth.js

---

### 4. **menu.md** - Menú de Navegación
Documentación del sistema de navegación (si existe).

---

## 🔄 Flujo completo del sistema

### 1. Usuario nuevo
```
1. Accede a inicio.html
2. Ve modal de login/registro
3. Click en "Registrarse"
4. Completa email + contraseña
5. registrarUsuario() valida y guarda
6. Puede iniciar sesión
```

### 2. Usuario registrado - Login
```
1. Click "Iniciar Sesión"
2. Ingresa email + contraseña
3. loginUsuario() valida credenciales
4. establecerUsuarioActual() guarda sesión
5. Usuario logueado ve: carrito, historial, cerrar sesión
```

### 3. Usuario compra
```
1. Ve catálogo en index.html
2. Click "Agregar al carrito" en productos
3. agregarAlCarrito() añade a carrito.html
4. Click "Comprar Ahora"
5. comprarCarrito() abre formulario
6. Usuario completa: nombres, teléfono, dirección, ciudad, etc.
7. completarCompra(datosCliente) procesa
8. guardarCompraUsuario() guarda en historial
9. renderizarResumenCompra() muestra resumen con datos
10. Carrito se vacía
```

### 4. Usuario ve historial
```
1. Click "Mi Historial"
2. mostrarHistorial() obtiene sus compras
3. obtenerHistorialUsuario() lee del localStorage
4. Muestra lista de compras con fecha, cantidad, total
5. Click en compra → mostrarDetalleCompra()
6. Muestra productos + datos de entrega que registró
```

---

## 🗂️ Estructura localStorage

```javascript
{
  // Usuarios registrados
  "usuarios": [
    { id, email, contraseña, fechaRegistro }
  ],
  
  // Usuario logueado AHORA
  "usuario-actual": { id, email, fechaRegistro },
  
  // Historial de compras por usuario
  "historial-compras": {
    "userId1": [
      { id, fecha, productos, total, cliente: {...} }
    ]
  },
  
  // Carrito actual del usuario logueado
  "productos-en-carrito": [
    { id, titulo, categoria, precio, cantidad, imagen }
  ]
}
```

---

## 🔄 Relación entre archivos

```
inicio.html
    ├─ auth.js
    │   ├─ registrarUsuario()
    │   └─ loginUsuario()
    │
index.html
    ├─ main.js (catálogo)
    │   ├─ obtenerProductos() → API FakeStore
    │   ├─ filtrarProductos()
    │   └─ agregarAlCarrito()
    │       └─ localStorage: "productos-en-carrito"
    │
carrito.html
    ├─ carrito.js
    │   ├─ cargarProductosCarrito()
    │   ├─ comprarCarrito()
    │   │   ├─ mostrarFormularioCompra()
    │   │   ├─ completarCompra(datosCliente)
    │   │   │   ├─ guardarCompraUsuario() [de auth.js]
    │   │   │   └─ renderizarResumenCompra()
    │   │   └─ localStorage: "historial-compras"
    │   │
    │   ├─ mostrarHistorial()
    │   │   └─ obtenerHistorialUsuario() [de auth.js]
    │   │
    │   └─ mostrarDetalleCompra()
    │       └─ Muestra datos de entrega guardados
    │
    └─ auth.js (validar sesión)
        └─ obtenerNombreUsuario() (mostrar usuario logueado)
```

---

## 📋 Cambios principales (Actualización)

### Antes (v1)
- Sistema simple: Agregar productos → Comprar → Resumen → Fin

### Ahora (v2)
- **NUEVO:** Sistema de autenticación por usuario
- **NUEVO:** Formulario detallado de datos de cliente ANTES de resumen
- **NUEVO:** Historial de compras POR USUARIO
- **NUEVO:** Datos de entrega guardados con cada compra
- **MODIFICADO:** Flujo: Agregar → Comprar → **Formulario** → Resumen con datos

### Funciones agregadas
1. `mostrarFormularioCompra()` - Abre modal del formulario
2. `completarCompra(datosCliente)` - Procesa con datos del cliente
3. `guardarCompraUsuario()` - Guarda en historial del usuario
4. `obtenerHistorialUsuario()` - Lee historial del usuario
5. Todas las funciones de auth.js (11 funciones)

---

## 💡 Cómo usar la documentación

1. **Para entender auth.js:** Lee [auth.md](auth.md)
   - Explica cómo funciona el login/registro
   - Estructura de usuarios en localStorage
   - Funciones de sesión

2. **Para entender carrito.js:** Lee [carrito.md](carrito.md)
   - Explica cómo agregar/eliminar productos
   - NUEVA: Flujo del formulario de compra
   - Cómo se guardan las compras por usuario

3. **Para entender main.js:** Lee [main.md](main.md)
   - Explica el catálogo de productos
   - Cómo funcionan búsqueda y filtros
   - Cómo se integra con el carrito

4. **Para entender menú:** Lee [menu.md](menu.md)
   - Estructura de navegación

---

## ⚙️ Tecnologías usadas

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **API:** FakeStore API (para productos)
- **Storage:** localStorage (persistencia de datos)
- **Auth:** Sistema manual con localStorage (educativo)

---

## 🚀 Para empezar

1. Abre `inicio.html` para registrarte/loguearte
2. Ve a `index.html` para ver catálogo
3. Agrega productos al carrito
4. Ve a `carrito.html` para completar la compra
5. Completa el formulario con tus datos
6. Ver tu historial en "Mi Historial"

---

## 📞 Notas

- Toda la documentación está en formato **Markdown**
- Cada archivo contiene explicaciones **línea por línea**
- Hay **ejemplos reales** de código y estructura
- Las funciones están documentadas en **orden de uso**

---
