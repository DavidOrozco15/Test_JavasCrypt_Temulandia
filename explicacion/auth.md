# 📚 Documentación: js/auth.js

> Sistema completo de autenticación con registro, login y gestión de sesiones. Integrado con el historial de compras por usuario.

---

## 🔍 Índice de funciones

1. **obtenerUsuarios()** - Lee la lista de usuarios registrados
2. **guardarUsuarios(usuarios)** - Guarda usuarios en localStorage
3. **obtenerUsuarioActual()** - Obtiene el usuario que está logueado
4. **establecerUsuarioActual(usuario)** - Establece usuario logueado
5. **cerrarSesion()** - Cierra sesión del usuario actual
6. **registrarUsuario(email, contraseña)** - Registra nuevo usuario
7. **loginUsuario(email, contraseña)** - Inicia sesión de usuario
8. **obtenerHistorialUsuario()** - Obtiene compras del usuario logueado
9. **guardarCompraUsuario(compra)** - Guarda compra en historial del usuario
10. **hayUsuarioLogueado()** - Verifica si hay sesión activa
11. **obtenerNombreUsuario()** - Obtiene el email del usuario logueado

---

## 📌 Explicación línea por línea

### 1️⃣ obtenerUsuarios()

```javascript
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}
```

**Línea 5-7:**
- Lee del navegador (localStorage) la clave "usuarios"
- `JSON.parse()` convierte el string JSON a array de objetos
- El `||` devuelve array vacío si no hay datos guardados
- Retorna: Array de objetos usuario

**Ejemplo de retorno:**
```javascript
[
  { id: 1234567890, email: "juan@email.com", contraseña: "123456", fechaRegistro: "16/1/2026, 10:30:45" },
  { id: 1234567891, email: "maria@email.com", contraseña: "abcdef", fechaRegistro: "15/1/2026, 14:20:10" }
]
```

---

### 2️⃣ guardarUsuarios(usuarios)

```javascript
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
```

**Línea 10-12:**
- Recibe array de usuarios
- `JSON.stringify()` convierte el array a string JSON
- Guarda con clave "usuarios" en localStorage del navegador

**Cuándo se llama:**
- En `registrarUsuario()` después de agregar nuevo usuario
- En `loginUsuario()` aunque no modifica (se podría optimizar)

---

### 3️⃣ obtenerUsuarioActual()

```javascript
function obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuario-actual")) || null;
}
```

**Línea 15-17:**
- Lee del localStorage la clave "usuario-actual"
- Esta clave contiene el usuario que está logueado AHORA MISMO
- `JSON.parse()` convierte string JSON a objeto
- El `||` devuelve `null` si no hay usuario logueado

**Ejemplo de retorno (usuario logueado):**
```javascript
{
  id: 1234567890,
  email: "juan@email.com",
  fechaRegistro: "16/1/2026, 10:30:45"
}
```

**Retorno cuando NO hay usuario logueado:** `null`

---

### 4️⃣ establecerUsuarioActual(usuario)

```javascript
function establecerUsuarioActual(usuario) {
    localStorage.setItem("usuario-actual", JSON.stringify(usuario));
}
```

**Línea 20-22:**
- Recibe objeto usuario (sin incluir contraseña por seguridad)
- `JSON.stringify()` lo convierte a string JSON
- Guarda en localStorage con clave "usuario-actual"

**Cuándo se llama:**
- En `loginUsuario()` para marcar que el usuario inició sesión

**Nota importante:**
- La contraseña NO se guarda en "usuario-actual" (solo en "usuarios")
- La sesión se mantiene incluso si recarga la página
- Se elimina en `cerrarSesion()`

---

### 5️⃣ cerrarSesion()

```javascript
function cerrarSesion() {
    localStorage.removeItem("usuario-actual");
    // Limpiar carrito del usuario anterior
    localStorage.removeItem("productos-en-carrito");
    window.location.href = "./inicio.html";
}
```

**Línea 25-31:**
- `localStorage.removeItem("usuario-actual")`: Elimina la sesión actual
  - Esto hace que `obtenerUsuarioActual()` retorne `null`
  - El usuario ya no está "logueado"
- `localStorage.removeItem("productos-en-carrito")`: Limpia el carrito
  - Evita que el nuevo usuario vea los productos del usuario anterior
- `window.location.href = "./inicio.html"`: Redirige a página de inicio
  - Recarga la página

**Flujo:**
```
Click botón "Cerrar sesión"
      ↓
cerrarSesion()
      ↓
Elimina sesión + carrito
      ↓
Redirige a inicio.html
```

---

### 6️⃣ registrarUsuario(email, contraseña)

```javascript
function registrarUsuario(email, contraseña) {
    const usuarios = obtenerUsuarios();
```

**Línea 34-35:**
- Obtiene lista actual de usuarios
- Aquí es donde agregaremos el nuevo usuario

```javascript
    // Verificar si el email ya existe
    if (usuarios.some(u => u.email === email)) {
        return { exito: false, mensaje: "Este email ya está registrado" };
    }
```

**Línea 37-39:**
- `usuarios.some()` verifica SI ALGÚN usuario tiene ese email
- Si alguien ya se registró con ese email, rechaza el registro
- Retorna objeto con `exito: false` y mensaje de error

```javascript
    // Verificar que contraseña no esté vacía
    if (!contraseña || contraseña.length < 4) {
        return { exito: false, mensaje: "La contraseña debe tener al menos 4 caracteres" };
    }
```

**Línea 41-43:**
- Valida que la contraseña exista y tenga mínimo 4 caracteres
- Si no cumple, rechaza con error

```javascript
    // Crear nuevo usuario
    const nuevoUsuario = {
        id: Date.now(),
        email: email,
        contraseña: contraseña,
        fechaRegistro: new Date().toLocaleString('es-ES')
    };
```

**Línea 45-51:**
- Crea objeto usuario con:
  - `id`: timestamp actual (número único para cada usuario)
  - `email`: el email proporcionado
  - `contraseña`: la contraseña en texto plano (sin encriptación, solo educativo)
  - `fechaRegistro`: fecha/hora de registro en formato español

```javascript
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    
    return { exito: true, mensaje: "Registro exitoso. Ahora puedes iniciar sesión." };
}
```

**Línea 53-56:**
- `usuarios.push()`: Agrega el nuevo usuario al array
- `guardarUsuarios()`: Guarda todo el array en localStorage
- Retorna objeto de éxito con mensaje

**Retorno total:**
```javascript
// Si todo está bien:
{ exito: true, mensaje: "Registro exitoso. Ahora puedes iniciar sesión." }

// Si email duplicado:
{ exito: false, mensaje: "Este email ya está registrado" }

// Si contraseña débil:
{ exito: false, mensaje: "La contraseña debe tener al menos 4 caracteres" }
```

---

### 7️⃣ loginUsuario(email, contraseña)

```javascript
function loginUsuario(email, contraseña) {
    const usuarios = obtenerUsuarios();
    
    const usuario = usuarios.find(u => u.email === email && u.contraseña === contraseña);
```

**Línea 59-63:**
- Obtiene lista de usuarios
- Busca usuario que CUMPLE AMBAS condiciones:
  - Email coincide CON el proporcionado
  - Contraseña coincide CON la proporcionada
- Si no encuentra, `usuario` es `undefined`

```javascript
    if (!usuario) {
        return { exito: false, mensaje: "Email o contraseña incorrectos" };
    }
```

**Línea 65-67:**
- Si no encontró el usuario (credenciales incorrectas), retorna error
- El mensaje es genérico por seguridad (no dice si email existe o no)

```javascript
    // Establecer usuario actual
    establecerUsuarioActual({
        id: usuario.id,
        email: usuario.email,
        fechaRegistro: usuario.fechaRegistro
    });
    
    return { exito: true, mensaje: "Sesión iniciada correctamente" };
}
```

**Línea 69-76:**
- `establecerUsuarioActual()`: Guarda usuario como logueado
  - **NOTA:** No incluye la contraseña (por seguridad)
  - Solo guarda: id, email, fechaRegistro
- Retorna objeto de éxito

**Flujo de login:**
```
Usuario ingresa email + contraseña
      ↓
loginUsuario(email, contraseña)
      ↓
¿Existe usuario con esas credenciales?
      ↓
SÍ → establecerUsuarioActual() → Retorna éxito
NO → Retorna error
```

---

### 8️⃣ obtenerHistorialUsuario()

```javascript
function obtenerHistorialUsuario() {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) return [];
```

**Línea 79-81:**
- Obtiene usuario logueado
- Si NO hay usuario logueado, retorna array vacío
- (No puede haber historial sin usuario)

```javascript
    const todosHistoriales = JSON.parse(localStorage.getItem("historial-compras")) || {};
    return todosHistoriales[usuarioActual.id] || [];
}
```

**Línea 83-84:**
- Lee localStorage con clave "historial-compras"
  - Esta clave contiene un OBJETO donde las claves son IDs de usuarios
  - Cada usuario tiene su array de compras
- Accede al array de compras de este usuario usando su ID
- Si no tiene compras, retorna array vacío

**Estructura localStorage:**
```javascript
localStorage["historial-compras"] = {
  "1234567890": [ compra1, compra2, compra3 ],  // Compras del usuario 1
  "1234567891": [ compra1, compra2 ]             // Compras del usuario 2
}
```

**Retorno:**
```javascript
// Si el usuario tiene compras:
[ { id: ..., fecha: "...", productos: [...], total: 50.00, cliente: {...} }, ... ]

// Si no tiene compras:
[]
```

---

### 9️⃣ guardarCompraUsuario(compra)

```javascript
function guardarCompraUsuario(compra) {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) return false;
```

**Línea 87-89:**
- Obtiene usuario logueado
- Si no hay usuario, retorna `false` (no se puede guardar compra sin usuario)

```javascript
    const todosHistoriales = JSON.parse(localStorage.getItem("historial-compras")) || {};
    
    if (!todosHistoriales[usuarioActual.id]) {
        todosHistoriales[usuarioActual.id] = [];
    }
```

**Línea 91-94:**
- Lee todos los historiales
- Si este usuario no tiene array de compras aún, crea uno vacío

```javascript
    todosHistoriales[usuarioActual.id].push(compra);
    localStorage.setItem("historial-compras", JSON.stringify(todosHistoriales));
    return true;
}
```

**Línea 96-98:**
- Agrega la nueva compra al array de este usuario
- Guarda todo en localStorage
- Retorna `true` (éxito)

**Flujo de compra → guardar en historial:**
```
Usuario completa formulario de compra
      ↓
completarCompra(datosCliente)  [en carrito.js]
      ↓
guardarCompraUsuario(compra)  [en auth.js]
      ↓
Se agrega a: localStorage["historial-compras"][usuarioId].push(compra)
      ↓
Usuario puede ver compra en su historial
```

---

### 🔟 hayUsuarioLogueado()

```javascript
function hayUsuarioLogueado() {
    return obtenerUsuarioActual() !== null;
}
```

**Línea 101-103:**
- Pregunta: "¿Hay usuario logueado?"
- Si `obtenerUsuarioActual()` retorna un objeto → hay usuario → retorna `true`
- Si `obtenerUsuarioActual()` retorna `null` → no hay usuario → retorna `false`

**Usos:**
- En `mostrarHistorial()`: Verifica si puede obtener historial
- En `mostrarFormularioCompra()`: Pre-llena correo solo si hay usuario
- Para mostrar/ocultar botón de logout

---

### 1️⃣1️⃣ obtenerNombreUsuario()

```javascript
function obtenerNombreUsuario() {
    const usuario = obtenerUsuarioActual();
    return usuario ? usuario.email : null;
}
```

**Línea 106-109:**
- Obtiene usuario logueado
- Si existe, retorna su email
- Si no existe, retorna `null`

**Usos:**
- En `mostrarFormularioCompra()`: Pre-llena el campo de correo
- Usado como identificador del usuario en toda la aplicación

---

## 📊 Flujo completo de autenticación

### Registro:

```
1. Usuario ingresa email + contraseña en formulario
2. Click "Registrarse"
3. registrarUsuario(email, contraseña) se ejecuta
   └─ Valida email único
   └─ Valida contraseña ≥ 4 caracteres
   └─ Crea objeto usuario con ID única (timestamp)
   └─ Agrega a array y guarda en localStorage
4. Muestra mensaje de éxito
5. Usuario debe iniciar sesión ahora
```

### Login:

```
1. Usuario ingresa email + contraseña
2. Click "Iniciar Sesión"
3. loginUsuario(email, contraseña) se ejecuta
   └─ Busca usuario con credenciales
   └─ Si existe: establecerUsuarioActual() y retorna éxito
   └─ Si no existe: retorna error
4. Si éxito: usuario logueado, puede comprar
5. Si error: muestra mensaje
```

### Compra vinculada a usuario:

```
1. Usuario logueado agrega productos al carrito
2. Click "Comprar Ahora"
3. Abre formulario (correo pre-rellenado)
4. Usuario completa datos y envía
5. completarCompra(datosCliente) se ejecuta
6. Llama: guardarCompraUsuario(compra)
   └─ Obtiene ID del usuario logueado
   └─ Agrega compra a: localStorage["historial-compras"][usuarioId]
7. Compra guardada SOLO para ese usuario
```

### Ver historial:

```
1. Usuario click en "Mi historial"
2. mostrarHistorial() se ejecuta
3. Llama: obtenerHistorialUsuario()
   └─ Obtiene ID del usuario logueado
   └─ Lee: localStorage["historial-compras"][usuarioId]
   └─ Retorna array de compras
4. Muestra lista de compras del usuario
5. Click en compra específica
6. mostrarDetalleCompra() muestra productos + datos de entrega
```

---

## 💾 Estructura localStorage

```
localStorage = {
  // Lista de todos los usuarios registrados
  "usuarios": [
    {
      id: 1234567890,
      email: "juan@email.com",
      contraseña: "1234",
      fechaRegistro: "16/1/2026, 10:30:45"
    },
    {
      id: 1234567891,
      email: "maria@email.com",
      contraseña: "abcdef",
      fechaRegistro: "15/1/2026, 14:20:10"
    }
  ],
  
  // Usuario que está logueado AHORA MISMO (sin contraseña)
  "usuario-actual": {
    id: 1234567890,
    email: "juan@email.com",
    fechaRegistro: "16/1/2026, 10:30:45"
  },
  
  // Historial de compras POR USUARIO
  "historial-compras": {
    "1234567890": [  // Compras de Juan
      {
        id: 1705430400000,
        fecha: "16/1/2026, 10:30:45",
        productos: [ { id: 1, titulo: "Producto A", ... }, ... ],
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
    "1234567891": [  // Compras de María
      { ... }
    ]
  },
  
  // Carrito actual (del usuario logueado)
  "productos-en-carrito": [
    { id: 1, titulo: "Producto A", precio: 10, cantidad: 2, ... },
    { id: 2, titulo: "Producto B", precio: 20, cantidad: 1, ... }
  ]
}
```

---

## 🔒 Notas de seguridad

⚠️ **IMPORTANTE: Este es código EDUCATIVO, no para producción**

**Problemas de seguridad:**
- ❌ Contraseñas en texto plano (sin encriptación)
- ❌ Sin validación de email real
- ❌ Sin protección contra fuerza bruta
- ❌ localStorage es accesible desde JavaScript
- ❌ Sin HTTPS
- ❌ Sin token de sesión

**Para producción se necesita:**
- ✅ Hash de contraseñas (bcrypt, argon2)
- ✅ Validación de email
- ✅ Rate limiting en intentos de login
- ✅ JWT o sesiones seguras en servidor
- ✅ HTTPS obligatorio
- ✅ Base de datos real (no localStorage)

---

