# 🚀 Guía de Uso - Sistema de Autenticación TemuLandia

## Para Usuarios

### Crear Cuenta Nueva
1. Abre `inicio.html` 
2. Haz click en el botón **"🔐 Iniciar Sesión"** en el menú lateral izquierdo
3. El modal de autenticación se abrirá mostrando el panel de **Login**
4. Haz click en **"¿No tienes cuenta? Regístrate aquí"**
5. Ingresa un email válido y una contraseña (mínimo 4 caracteres)
6. Confirma la contraseña en el campo "Confirmar Contraseña"
7. Haz click en **"Crear Cuenta"**
8. ¡Listo! Se creará tu cuenta y automáticamente se hará login

### Iniciar Sesión Existente
1. Abre `inicio.html`
2. Haz click en **"🔐 Iniciar Sesión"**
3. Ingresa tu email y contraseña
4. Haz click en **"Iniciar Sesión"**
5. El botón ahora mostrará tu email cuando estés logueado

### Cerrar Sesión
**Opción 1 - Desde inicio.html:**
- Haz click en el botón de sesión (que muestra tu email)
- Selecciona "Cerrar Sesión"

**Opción 2 - Desde carrito.html:**
- Haz click en el botón **"🚪 Cerrar Sesión"** que aparece junto al historial

### Ver Compras
1. Vete a `carrito.html`
2. Haz click en **"📋 Historial de Compras"**
3. Se abrirá un modal mostrando todas tus compras previas
4. Haz click en cualquier compra para ver los detalles

### Comprar Productos
1. En `inicio.html`, busca y selecciona productos
2. Haz click **"Agregar al Carrito"** en cada producto
3. Ve a `carrito.html`
4. Verifica tu carrito
5. Haz click **"COMPRAR"**
6. ¡Se agregará a tu historial automáticamente!

---

## Para Desarrolladores

### Estructura de localStorage

**Usuarios:**
```javascript
localStorage["usuarios"] = [
  {
    id: 1234567890,           // Timestamp de creación
    email: "user@example.com",
    contraseña: "1234",       // ⚠️ NO hash (proyecto educativo)
    fechaRegistro: "10/1/2025, 15:30:45"
  }
]
```

**Sesión Activa:**
```javascript
localStorage["usuario-actual"] = {
  id: 1234567890,
  email: "user@example.com",
  fechaRegistro: "10/1/2025, 15:30:45"
}
```

**Historial de Compras:**
```javascript
localStorage["historial-compras"] = {
  "1234567890": [
    {
      id: 9876543210,
      fecha: "10/1/2025, 16:45:30",
      productos: [
        { id: "producto-1", titulo: "...", imagen: "...", cantidad: 2, precio: 19.99 }
      ],
      total: 39.98
    }
  ],
  "9999999999": [
    // Compras del otro usuario
  ]
}
```

### API de Autenticación

Todas las funciones están en `js/auth.js`:

#### Registro
```javascript
const resultado = registrarUsuario(email, contraseña);
// Retorna: { exito: true/false, mensaje: "..." }
```

#### Login
```javascript
const resultado = loginUsuario(email, contraseña);
// Retorna: { exito: true/false, mensaje: "..." }
```

#### Verificar Sesión
```javascript
if (hayUsuarioLogueado()) {
  const email = obtenerNombreUsuario();
  console.log("Usuario logueado:", email);
}
```

#### Obtener Historial
```javascript
const compras = obtenerHistorialUsuario();
// Retorna: Array de compras del usuario actual
```

#### Guardar Compra
```javascript
guardarCompraUsuario({
  id: Date.now(),
  fecha: new Date().toLocaleString(),
  productos: [...],
  total: 99.99
});
```

#### Cerrar Sesión
```javascript
cerrarSesion(); // Redirige a inicio.html
```

### Eventos Personalizados Recomendados

Puedes agregar eventos que se disparen después del login/logout:

```javascript
// En main.js, después de loginUsuario():
window.dispatchEvent(new CustomEvent('usuarioLogueado', { 
  detail: { email: obtenerNombreUsuario() } 
}));

// En cualquier archivo:
window.addEventListener('usuarioLogueado', (e) => {
  console.log('Usuario logueado:', e.detail.email);
});
```

### Testing

Abre `test-auth.html` en tu navegador para ver todas las pruebas:
- Registro de usuarios
- Validación de email duplicado
- Login correcto/incorrecto
- Historial por usuario
- Separación de datos entre usuarios

---

## 🔒 Notas de Seguridad

⚠️ **Este es un proyecto educativo. Para producción:**

1. **Contraseñas:** Nunca guardes contraseñas en localStorage
   - Usa bcrypt o similar en el servidor
   - Transmite solo HTTPS
   - Implementa salted hashing

2. **Sesiones:** Usa JWT o session cookies del servidor
   - No guardes datos sensibles en localStorage
   - Usa httpOnly cookies

3. **Validación:** Valida SIEMPRE en servidor
   - JavaScript se puede manipular fácilmente
   - SQL injection, XSS, etc.

4. **CORS:** Implementa CORS correctamente en servidor

5. **Rate Limiting:** Protege contra brute force attacks

---

## 📁 Archivos Modificados

- `css/main.css` - Agregados estilos para modal auth
- `js/main.js` - Agregados event listeners para auth modal
- `js/carrito.js` - Modificado para usar historial per-user
- `inicio.html` - Agregado botón y modal de login
- `carrito.html` - Agregado botón de logout y script auth.js

## 📄 Archivos Creados

- `js/auth.js` - Sistema completo de autenticación
- `test-auth.html` - Test suite automatizado
- `IMPLEMENTACION-AUTH.md` - Este documento de resumen

---

**¿Preguntas? Revisa los comentarios en el código marcados con "COPILOT"**
