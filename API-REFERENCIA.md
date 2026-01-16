# 🔍 Referencia Rápida - API de Autenticación

## Ubicación
```
js/auth.js
```

---

## Funciones Disponibles

### 1️⃣ Registro
```javascript
registrarUsuario(email, contraseña)

// Parámetros
- email (string): ejemplo@correo.com
- contraseña (string): mínimo 4 caracteres

// Retorna
{ exito: true/false, mensaje: "descripción" }

// Ejemplo
const resultado = registrarUsuario("user@example.com", "1234");
if (resultado.exito) {
    console.log("Usuario creado");
} else {
    console.log(resultado.mensaje); // "Este email ya está registrado"
}

// Validaciones
- Email no puede estar vacío
- Email debe ser único
- Contraseña mínimo 4 caracteres
```

---

### 2️⃣ Login
```javascript
loginUsuario(email, contraseña)

// Parámetros
- email (string): ejemplo@correo.com
- contraseña (string): la contraseña registrada

// Retorna
{ exito: true/false, mensaje: "descripción" }

// Ejemplo
const resultado = loginUsuario("user@example.com", "1234");
if (resultado.exito) {
    console.log("Sesión iniciada");
}

// Validaciones
- Email debe existir en la base de datos
- Contraseña debe ser exacta
```

---

### 3️⃣ Verificar Sesión
```javascript
hayUsuarioLogueado()

// Parámetros
(ninguno)

// Retorna
true o false

// Ejemplo
if (hayUsuarioLogueado()) {
    console.log("Usuario está logueado");
} else {
    console.log("Usuario debe hacer login");
}

// Uso común
if (!hayUsuarioLogueado()) {
    alert("Debes iniciar sesión");
    return;
}
```

---

### 4️⃣ Obtener Usuario Actual
```javascript
obtenerNombreUsuario()

// Parámetros
(ninguno)

// Retorna
"user@example.com" o null

// Ejemplo
const email = obtenerNombreUsuario();
console.log("Logueado como:", email); // "user@example.com"

// Uso común
if (hayUsuarioLogueado()) {
    document.getElementById("user-email").textContent = obtenerNombreUsuario();
}
```

---

### 5️⃣ Obtener Historial
```javascript
obtenerHistorialUsuario()

// Parámetros
(ninguno)

// Retorna
Array de compras: [
  {
    id: 1234567890,
    fecha: "10/1/2025, 15:30:45",
    productos: [...],
    total: 99.99
  },
  ...
]

// Ejemplo
const compras = obtenerHistorialUsuario();
console.log("Total de compras:", compras.length);
console.log("Última compra:", compras[compras.length - 1]);

// Nota
- Retorna [] si no hay compras
- Solo retorna compras del usuario actual
- Retorna [] si no hay usuario logueado
```

---

### 6️⃣ Guardar Compra
```javascript
guardarCompraUsuario(compra)

// Parámetros
compra (object):
{
    id: Date.now(),                           // timestamp único
    fecha: new Date().toLocaleString('es-ES'), // formato fecha
    productos: [
        {
            id: "producto-1",
            titulo: "Producto",
            precio: 19.99,
            cantidad: 2,
            imagen: "url"
        }
    ],
    total: 39.98                              // suma total
}

// Retorna
true

// Ejemplo
const compra = {
    id: Date.now(),
    fecha: new Date().toLocaleString('es-ES'),
    productos: productosEnCarrito,
    total: productosEnCarrito.reduce((a, p) => a + (p.precio * p.cantidad), 0)
};
guardarCompraUsuario(compra);

// Nota
- Solo funciona si hay usuario logueado
- Si no hay usuario, no guarda (silenciosamente)
```

---

### 7️⃣ Logout
```javascript
cerrarSesion()

// Parámetros
(ninguno)

// Retorna
(sin retorno - redirige)

// Ejemplo
document.getElementById("logout-btn").addEventListener("click", () => {
    if (confirm("¿Cerrar sesión?")) {
        cerrarSesion(); // Redirecciona a inicio.html
    }
});

// Qué hace
1. Borra localStorage["usuario-actual"]
2. Borra localStorage["productos-en-carrito"]
3. Redirecciona a inicio.html
```

---

## 🛠️ Funciones Auxiliares (Internas)

Estas están principalmente para uso interno, pero disponibles:

```javascript
// Obtener todos los usuarios registrados
obtenerUsuarios() // Retorna Array

// Guardar lista de usuarios
guardarUsuarios(usuarios) // Retorna void

// Obtener objeto del usuario actual
obtenerUsuarioActual() // Retorna Object o null

// Guardar usuario actual en sesión
establecerUsuarioActual(usuario) // Retorna void
```

---

## 💾 Estructura de localStorage

```javascript
// Todos los usuarios
localStorage["usuarios"]
// [
//   { id: 1234567, email: "...", contraseña: "...", fechaRegistro: "..." },
//   { id: 9876543, email: "...", contraseña: "...", fechaRegistro: "..." }
// ]

// Usuario logueado
localStorage["usuario-actual"]
// { id: 1234567, email: "...", fechaRegistro: "..." }

// Historial de compras
localStorage["historial-compras"]
// {
//   "1234567": [{ id, fecha, productos, total }, ...],
//   "9876543": [{ id, fecha, productos, total }, ...]
// }

// Carrito actual
localStorage["productos-en-carrito"]
// [
//   { id: "producto-1", titulo: "...", precio: 19.99, cantidad: 2, ... },
//   { id: "producto-2", titulo: "...", precio: 29.99, cantidad: 1, ... }
// ]
```

---

## 🎯 Casos de Uso Comunes

### Caso 1: Proteger Acción
```javascript
function comprar() {
    if (!hayUsuarioLogueado()) {
        alert("Debes iniciar sesión");
        abrirModalLogin();
        return;
    }
    // Proceder con compra...
}
```

### Caso 2: Mostrar Datos del Usuario
```javascript
if (hayUsuarioLogueado()) {
    const usuario = obtenerNombreUsuario();
    document.getElementById("user-info").innerHTML = `
        <p>Bienvenido, ${usuario}</p>
        <button onclick="cerrarSesion()">Logout</button>
    `;
}
```

### Caso 3: Mostrar Historial
```javascript
const historial = obtenerHistorialUsuario();
const html = historial.map((compra, i) => `
    <div>
        <strong>Compra #${i + 1}</strong>
        <p>Fecha: ${compra.fecha}</p>
        <p>Total: $${compra.total.toFixed(2)}</p>
    </div>
`).join('');
document.getElementById("historial").innerHTML = html;
```

### Caso 4: Guardar Compra
```javascript
const nuevaCompra = {
    id: Date.now(),
    fecha: new Date().toLocaleString('es-ES'),
    productos: carrito,
    total: carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)
};
guardarCompraUsuario(nuevaCompra);
```

---

## ⚠️ Errores Comunes

### ❌ Olvidar cargar auth.js
```html
<!-- MAL -->
<script src="./js/main.js"></script>
<script src="./js/auth.js"></script>

<!-- BIEN -->
<script src="./js/auth.js"></script>
<script src="./js/main.js"></script>
```

### ❌ No verificar usuario antes de usar
```javascript
// MAL
const email = obtenerNombreUsuario(); // Podría ser null
document.getElementById("email").textContent = email;

// BIEN
if (hayUsuarioLogueado()) {
    document.getElementById("email").textContent = obtenerNombreUsuario();
}
```

### ❌ Ignorar el retorno de registro/login
```javascript
// MAL
registrarUsuario(email, pass);
// Asume que funcionó...

// BIEN
const resultado = registrarUsuario(email, pass);
if (!resultado.exito) {
    console.error(resultado.mensaje);
    return;
}
```

### ❌ Guardar contraseña en variable global
```javascript
// MAL
window.userPassword = "1234"; // Vulnerable!

// BIEN
// Solo auth.js maneja contraseñas en memoria
```

---

## 📱 IDs HTML Necesarios

Para que el sistema funcione, tu HTML debe tener:

```html
<!-- En inicio.html -->
<button id="boton-login">...</button>
<div id="modal-auth">
    <div id="panel-login">
        <input id="email-login">
        <input id="password-login">
        <form id="form-login">...</form>
    </div>
    <div id="panel-registro">
        <input id="email-registro">
        <input id="password-registro">
        <input id="password-confirm">
        <form id="form-registro">...</form>
    </div>
</div>

<!-- En carrito.html -->
<button id="boton-logout">...</button>
```

---

## 🔐 Validaciones Implementadas

```
Registro:
✅ Email no vacío
✅ Email debe ser único
✅ Contraseña >= 4 caracteres
✅ Confirmación debe coincidir

Login:
✅ Email debe existir
✅ Contraseña debe ser exacta

Compra:
✅ Usuario debe estar logueado
✅ Carrito debe tener items
```

---

## 📊 Ejemplo Completo

```javascript
// 1. Registrar
const regResult = registrarUsuario("ana@example.com", "password123");
console.log(regResult); // { exito: true, mensaje: "..." }

// 2. Verificar sesión (login automático después del registro)
console.log(hayUsuarioLogueado()); // true

// 3. Obtener usuario
console.log(obtenerNombreUsuario()); // "ana@example.com"

// 4. Guardar compra
const compra = {
    id: Date.now(),
    fecha: new Date().toLocaleString('es-ES'),
    productos: [{ id: "1", titulo: "Producto", precio: 49.99, cantidad: 1 }],
    total: 49.99
};
guardarCompraUsuario(compra);

// 5. Ver historial
const historial = obtenerHistorialUsuario();
console.log(historial.length); // 1

// 6. Logout
cerrarSesion(); // Redirecciona
```

---

## 🚀 Resumen Rápido

| Función | Para Qué | Retorna |
|---------|----------|---------|
| `registrarUsuario()` | Crear cuenta | {exito, mensaje} |
| `loginUsuario()` | Iniciar sesión | {exito, mensaje} |
| `hayUsuarioLogueado()` | Verificar sesión | true/false |
| `obtenerNombreUsuario()` | Obtener email | "email@..." |
| `obtenerHistorialUsuario()` | Ver compras | Array |
| `guardarCompraUsuario()` | Guardar compra | true |
| `cerrarSesion()` | Logout | (redirecciona) |

---

**Ubicación:** `d:/Usuario/Pictures/TemuLandia/js/auth.js`  
**Líneas:** ~115  
**Dependencias:** Ninguna (vanilla JavaScript)  
**Compatibilidad:** Todos los navegadores modernos  
