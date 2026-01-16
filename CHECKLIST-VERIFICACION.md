# ✅ Checklist de Verificación - Sistema de Autenticación

## 📋 Checklist Rápido

Usa esta lista para verificar que cada componente funciona correctamente.

### 1. Archivos Creados/Modificados
- [ ] `js/auth.js` existe y contiene funciones de autenticación
- [ ] `css/main.css` contiene estilos para `.modal-auth`
- [ ] `inicio.html` contiene `#modal-auth` y `#boton-login`
- [ ] `carrito.html` contiene `#boton-logout`
- [ ] `IMPLEMENTACION-AUTH.md` existe
- [ ] `GUIA-USUARIOS.md` existe
- [ ] `DIAGRAMAS-FLUJO.md` existe
- [ ] `test-auth.html` existe

### 2. Estructura HTML

#### inicio.html
- [ ] Botón `#boton-login` en el menú lateral
- [ ] Modal `#modal-auth` con clase `disabled`
- [ ] Panel login `#panel-login` con inputs `#email-login` y `#password-login`
- [ ] Panel registro `#panel-registro` con inputs `#email-registro`, `#password-registro`, `#password-confirm`
- [ ] Botones de cambio de panel `#btn-ir-registro` y `#btn-ir-login`
- [ ] Contenedores de error `#msg-login-error` y `#msg-registro-error`
- [ ] Script `js/auth.js` cargado ANTES que `js/main.js`

#### carrito.html
- [ ] Botón `#boton-logout` junto a `#boton-historial`
- [ ] Script `js/auth.js` cargado al principio

### 3. CSS Styling

Abre DevTools y verifica:
- [ ] Modal tiene `position: fixed`
- [ ] Modal tiene `z-index: 9999` o superior
- [ ] Overlay tiene fondo oscuro (rgba)
- [ ] Inputs tienen estilos de focus
- [ ] Botones tienen hover effects
- [ ] Botón logout solo visible si usuario está logueado

### 4. JavaScript - Functions

En la consola del navegador, prueba:

```javascript
// Debe retornar función
console.log(typeof registrarUsuario); // "function" ✓

// Debe retornar función
console.log(typeof loginUsuario); // "function" ✓

// Debe retornar función
console.log(typeof hayUsuarioLogueado); // "function" ✓

// Debe retornar objeto con exito y mensaje
console.log(registrarUsuario("test@test.com", "1234"));

// Debe retornar true o false
console.log(hayUsuarioLogueado());
```

### 5. Flujo: Registro

- [ ] Abre `inicio.html`
- [ ] Haz click en "🔐 Iniciar Sesión"
- [ ] Modal aparece con panel Login visible
- [ ] Haz click en "¿No tienes cuenta? Regístrate aquí"
- [ ] Panel Registro aparece
- [ ] Ingresa email: `test@example.com`
- [ ] Ingresa contraseña: `1234`
- [ ] Ingresa confirmación: `1234`
- [ ] Haz click en "Crear Cuenta"
- [ ] Modal se cierra
- [ ] Botón ahora muestra "Cerrar Sesión" (o tu email)
- [ ] En DevTools: `localStorage.getItem("usuario-actual")` muestra tu usuario

### 6. Flujo: Login

- [ ] Haz click en "Cerrar Sesión" para desloguearse
- [ ] Haz click en "🔐 Iniciar Sesión"
- [ ] Modal aparece con panel Login visible
- [ ] Ingresa email: `test@example.com`
- [ ] Ingresa contraseña: `1234`
- [ ] Haz click en "Iniciar Sesión"
- [ ] Modal se cierra
- [ ] Botón muestra "Cerrar Sesión"
- [ ] `localStorage.getItem("usuario-actual")` tiene data

### 7. Flujo: Compra

- [ ] Usuario logueado
- [ ] Agrega producto al carrito desde `inicio.html`
- [ ] Va a `carrito.html`
- [ ] Verifica el producto en el carrito
- [ ] Haz click en "COMPRAR"
- [ ] Aparece modal de resumen de compra
- [ ] En DevTools: `JSON.parse(localStorage.getItem("historial-compras"))[usuarioId]` muestra la compra

### 8. Flujo: Ver Historial

- [ ] Usuario logueado en `carrito.html`
- [ ] Haz click en "📋 Historial de Compras"
- [ ] Modal aparece mostrando compras previas
- [ ] Si no hay compras: muestra "No hay compras"
- [ ] Si hay compras: lista cada compra con número, fecha, cantidad y total
- [ ] Haz click en una compra
- [ ] Modal detalle aparece mostrando productos individuales

### 9. Flujo: Logout

- [ ] Usuario logueado en `inicio.html` o `carrito.html`
- [ ] Opción A (inicio.html): Haz click en el botón de sesión
- [ ] Opción B (carrito.html): Haz click en "🚪 Cerrar Sesión"
- [ ] Sistema pide confirmación "¿Estás seguro?"
- [ ] Clickea "OK"
- [ ] Página redirecciona a `inicio.html`
- [ ] Botón vuelve a "🔐 Iniciar Sesión"
- [ ] En DevTools: `localStorage.getItem("usuario-actual")` retorna `null`

### 10. Validaciones

#### Email duplicado
- [ ] Intenta registrar con email: `test@example.com` (que ya existe)
- [ ] Sistema muestra error: "Este email ya está registrado"

#### Contraseña corta
- [ ] Intenta registrar con contraseña: `123`
- [ ] Sistema muestra error: "mínimo 4 caracteres"

#### Contraseñas no coinciden
- [ ] Intenta registrar con contraseña: `1234` y confirmación: `5678`
- [ ] Sistema muestra error: "Las contraseñas no coinciden"

#### Login incorrecto
- [ ] Intenta login con email correcto pero contraseña incorrecta
- [ ] Sistema muestra error: "Email o contraseña incorrectos"

### 11. Datos en localStorage

Ejecuta en consola del navegador:

```javascript
// Ver todos los usuarios
console.table(JSON.parse(localStorage.getItem("usuarios")));

// Ver usuario actual
console.table(JSON.parse(localStorage.getItem("usuario-actual")));

// Ver historial de todos los usuarios
console.table(JSON.parse(localStorage.getItem("historial-compras")));

// Ver carrito actual
console.table(JSON.parse(localStorage.getItem("productos-en-carrito")));
```

### 12. Test Automatizado

- [ ] Abre `test-auth.html`
- [ ] Verifica que todos los tests pasen (deben mostrar ✓)
- [ ] Consulta la consola (F12) para detalles

### 13. Integración Multi-usuario

- [ ] User 1: Registra, compra productos
- [ ] User 1: Ve su historial (solo sus compras)
- [ ] User 1: Logout
- [ ] User 2: Registra, compra otros productos
- [ ] User 2: Ve su historial (solo sus compras, diferentes a User 1)
- [ ] User 1: Login de nuevo, ve solo sus compras originales
- [ ] ✓ Confirmado: Historial separado por usuario

### 14. Responsividad

- [ ] Abre en dispositivo móvil (o emulador)
- [ ] Modal auth es visible y usable
- [ ] Inputs no se cortan
- [ ] Botones son clickeables
- [ ] Menú hamburguesa aún funciona
- [ ] Botón logout visible en carrito mobile

### 15. Navegación

- [ ] De `inicio.html` puedo ir a `carrito.html`
- [ ] De `carrito.html` puedo volver a `inicio.html` (botón "Seguir Comprando")
- [ ] Los links en el menú funcionan
- [ ] El menú mobile abre/cierra correctamente

---

## 🐛 Solución de Problemas

### Problema: "No está definido" error en consola

**Causa:** `auth.js` no se cargó antes que `main.js` o `carrito.js`

**Solución:**
```html
<!-- Correcto - auth.js ANTES -->
<script src="./js/auth.js"></script>
<script src="./js/main.js"></script>

<!-- Incorrecto - auth.js DESPUÉS -->
<script src="./js/main.js"></script>
<script src="./js/auth.js"></script>
```

### Problema: Modal no se abre

**Verificaciones:**
1. ¿Existe el elemento `#modal-auth`?
   ```javascript
   console.log(document.querySelector("#modal-auth")); // Must not be null
   ```
2. ¿Tiene clase `disabled`?
   ```javascript
   console.log(document.querySelector("#modal-auth").classList);
   ```
3. ¿El botón tiene listener?
   ```javascript
   console.log(document.querySelector("#boton-login"));
   ```

### Problema: Login no funciona

**Verificaciones:**
```javascript
// Verificar que usuario esté registrado
console.log(JSON.parse(localStorage.getItem("usuarios")));

// Probar función directamente
const resultado = loginUsuario("test@example.com", "1234");
console.log(resultado);
```

### Problema: Historial no muestra compras

**Verificaciones:**
```javascript
// Verificar hay usuario logueado
console.log(hayUsuarioLogueado());

// Verificar historial existe
console.log(JSON.parse(localStorage.getItem("historial-compras")));

// Verificar estructura
const usuarioId = JSON.parse(localStorage.getItem("usuario-actual")).id;
console.log(JSON.parse(localStorage.getItem("historial-compras"))[usuarioId]);
```

### Problema: Estilos CSS no aplican

**Verificaciones:**
1. ¿CSS se cargó?
   ```javascript
   console.log(document.styleSheets);
   ```
2. ¿Hay conflicto de estilos?
   ```javascript
   const el = document.querySelector("#modal-auth");
   console.log(window.getComputedStyle(el));
   ```

---

## 📞 Contacto / Preguntas

- Revisa los comentarios marcados con `// COPILOT:` en el código
- Verifica los archivos `.md` de documentación
- Abre `test-auth.html` para pruebas automatizadas
- Usa la consola del navegador (F12) para debug

---

**Última actualización:** 2025
**Proyecto:** TemuLandia
**Sistema:** Autenticación de Usuarios
