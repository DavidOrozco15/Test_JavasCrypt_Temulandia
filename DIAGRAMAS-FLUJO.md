# 🎯 Diagrama de Flujo - Sistema de Autenticación TemuLandia

## Diagrama de Estado del Usuario

```
┌─────────────────────────────────────────────┐
│   Usuario Abre inicio.html                  │
│   ¿Hay sesión en localStorage?              │
└─────────────────────────────────────────────┘
         │
         ├─ NO → Botón: "🔐 Iniciar Sesión"
         │        └─ Click → Modal Auth abierto
         │                  └─ Dos opciones:
         │                     1. LOGIN (si está registrado)
         │                     2. REGISTRO (si es nuevo)
         │
         └─ SÍ → Botón: "Cerrar Sesión" (muestra email)
                  └─ Click → Logout (limpia sesión)
                           → Redirecciona a inicio.html
```

## Flujo Completo de Registro

```
Usuario nuevo
    │
    ├─ Click en "🔐 Iniciar Sesión"
    │
    ├─ Modal Auth abierto (panel LOGIN visible)
    │
    ├─ Click en "¿No tienes cuenta? Regístrate aquí"
    │
    ├─ Panel REGISTRO visible
    │
    ├─ Completa formulario:
    │  ├─ Email: user@example.com
    │  ├─ Contraseña: 1234
    │  └─ Confirmar: 1234
    │
    ├─ Click en "Crear Cuenta"
    │
    ├─ JavaScript ejecuta:
    │  ├─ Valida contraseñas coincidan ✓
    │  ├─ Llama registrarUsuario(email, pass)
    │  ├─ Verifica email único ✓
    │  ├─ Verifica pass >= 4 caracteres ✓
    │  ├─ Crea usuario en localStorage
    │  ├─ Hace login automático
    │  ├─ Cierra modal
    │  └─ Recarga página (location.reload())
    │
    └─ Usuario logueado ✓
       ├─ Botón cambia a "Cerrar Sesión"
       ├─ localStorage["usuario-actual"] guardado
       └─ Puede comprar (historial por usuario)
```

## Flujo Completo de Login

```
Usuario registrado
    │
    ├─ Click en "🔐 Iniciar Sesión"
    │
    ├─ Modal Auth abierto (panel LOGIN visible)
    │
    ├─ Completa formulario:
    │  ├─ Email: user@example.com
    │  └─ Contraseña: 1234
    │
    ├─ Click en "Iniciar Sesión"
    │
    ├─ JavaScript ejecuta:
    │  ├─ Llama loginUsuario(email, pass)
    │  ├─ Busca email en usuarios ✓
    │  ├─ Verifica contraseña ✓
    │  ├─ Guarda sesión en localStorage
    │  ├─ Cierra modal
    │  └─ Recarga página
    │
    └─ Usuario logueado ✓
       ├─ localStorage["usuario-actual"] guardado
       └─ Puede acceder a su historial personal
```

## Flujo de Compra (Usuario Logueado)

```
Usuario logueado en inicio.html
    │
    ├─ Agrega productos al carrito
    │  └─ Se guardan en localStorage["productos-en-carrito"]
    │
    ├─ Va a carrito.html
    │
    ├─ Revisa los productos
    │
    ├─ Click en "COMPRAR"
    │
    ├─ JavaScript ejecuta comprarCarrito():
    │  ├─ Verifica hayUsuarioLogueado() ✓
    │  ├─ Crea objeto compra con:
    │  │  ├─ id: timestamp
    │  │  ├─ fecha: fecha actual
    │  │  ├─ productos: [...]
    │  │  └─ total: suma
    │  │
    │  ├─ Llama guardarCompraUsuario(compra)
    │  │  └─ Agrega a localStorage["historial-compras"][usuarioId]
    │  │
    │  ├─ Muestra modal de resumen
    │  ├─ Vacía carrito
    │  └─ Limpia localStorage["productos-en-carrito"]
    │
    └─ Compra guardada en su historial personal ✓
```

## Flujo de Ver Historial

```
Usuario logueado en carrito.html
    │
    ├─ Click en "📋 Historial de Compras"
    │
    ├─ JavaScript ejecuta mostrarHistorial():
    │  ├─ Obtiene usuarioActual de localStorage
    │  ├─ Llama obtenerHistorialUsuario()
    │  ├─ Obtiene localStorage["historial-compras"][usuarioId]
    │  ├─ Renderiza modal con:
    │  │  ├─ Número de compra
    │  │  ├─ Fecha
    │  │  ├─ Cantidad de productos
    │  │  └─ Total
    │  │
    │  └─ Cada compra es clickeable
    │
    ├─ Click en compra específica
    │
    ├─ JavaScript ejecuta mostrarDetalleCompra(id):
    │  ├─ Busca compra por ID
    │  ├─ Renderiza detalle con:
    │  │  ├─ Productos individuales
    │  │  ├─ Cantidades
    │  │  ├─ Precios
    │  │  └─ Subtotal de cada uno
    │  │
    │  └─ Fecha y total general
    │
    └─ Modal de detalle visible ✓
```

## Flujo de Logout

```
Usuario logueado
    │
    ├─ Opción A: Click en botón sesión (inicio.html)
    │
    ├─ Opción B: Click en "🚪 Cerrar Sesión" (carrito.html)
    │
    ├─ Sistema ejecuta cerrarSesion():
    │  ├─ Solicita confirmación ¿Estás seguro?
    │  │
    │  ├─ SI:
    │  │  ├─ localStorage.removeItem("usuario-actual")
    │  │  ├─ localStorage.removeItem("productos-en-carrito")
    │  │  └─ window.location.href = "./inicio.html"
    │  │
    │  └─ NO: Cancela operación
    │
    └─ Usuario vuelve a inicio.html sin sesión ✓
       └─ Botón vuelve a "🔐 Iniciar Sesión"
```

## Diagrama de localStorage

```
localStorage
│
├─ "usuarios" (Array)
│  ├─ [0]: { id, email, contraseña, fechaRegistro }
│  ├─ [1]: { id, email, contraseña, fechaRegistro }
│  └─ [n]: { id, email, contraseña, fechaRegistro }
│
├─ "usuario-actual" (Object o null)
│  └─ { id, email, fechaRegistro }
│
├─ "historial-compras" (Object)
│  ├─ "1234567890": [compra1, compra2, ...]
│  └─ "9876543210": [compra1, compra2, ...]
│
├─ "productos-en-carrito" (Array)
│  ├─ [0]: { id, titulo, imagen, cantidad, precio }
│  └─ [n]: { id, titulo, imagen, cantidad, precio }
│
└─ "historial" (DEPRECATED - usado antes)
```

## Diagrama de Funciones

```
auth.js
│
├─ obtenerUsuarios() → Array de usuarios
├─ guardarUsuarios(usuarios) → void
├─ obtenerUsuarioActual() → Object o null
├─ establecerUsuarioActual(usuario) → void
│
├─ registrarUsuario(email, pass)
│  └─ Retorna: { exito: bool, mensaje: string }
│     ├─ Valida email único
│     └─ Valida contraseña >= 4 caracteres
│
├─ loginUsuario(email, pass)
│  └─ Retorna: { exito: bool, mensaje: string }
│     └─ Verifica credenciales
│
├─ cerrarSesion() → void
│  └─ Redirige a inicio.html
│
├─ hayUsuarioLogueado() → boolean
├─ obtenerNombreUsuario() → string (email)
│
├─ obtenerHistorialUsuario() → Array de compras
│  └─ Obtiene historial del usuario actual
│
└─ guardarCompraUsuario(compra) → void
   └─ Agrega a historial del usuario actual
```

## Diagrama de Eventos

```
Eventos del Sistema
│
├─ load (página)
│  ├─ Carga productos desde API (si es inicio.html)
│  ├─ Carga carrito (si es carrito.html)
│  ├─ actualizarBotonLogin() (si es inicio.html)
│  ├─ actualizarBotonLogout() (si es carrito.html)
│  └─ mostrarHistorial() si botonHistorial existe
│
├─ click #boton-login
│  ├─ Si hay usuario: cerrarSesion()
│  └─ Si no: abre modal auth
│
├─ click #boton-logout
│  ├─ Pide confirmación
│  ├─ Si SÍ: cerrarSesion()
│  └─ Si NO: cierra
│
├─ submit #form-login
│  ├─ loginUsuario(email, pass)
│  ├─ Si exito: recarga página
│  └─ Si error: muestra en #msg-login-error
│
├─ submit #form-registro
│  ├─ Valida contraseñas coincidan
│  ├─ registrarUsuario(email, pass)
│  ├─ loginUsuario(email, pass) automático
│  ├─ Si exito: recarga página
│  └─ Si error: muestra en #msg-registro-error
│
├─ click #boton-historial
│  ├─ mostrarHistorial()
│  └─ Abre modal con compras del usuario
│
└─ click compra en historial
   └─ mostrarDetalleCompra(id)
      └─ Abre modal con detalles
```

## Flujo de Seguridad (Validaciones)

```
REGISTRO
├─ Email vacío? → Error
├─ Email duplicado? → Error
├─ Contraseña < 4 caracteres? → Error
└─ Contraseñas no coinciden? → Error

LOGIN
├─ Email existe? → Error
├─ Contraseña correcta? → Error
└─ [Credenciales válidas] → Sesión

COMPRA
├─ Hay usuario logueado? → Rechaza si NO
├─ Carrito vacío? → Rechaza si SÍ
├─ Productos existen? → Valida en tiempo real
└─ Total calculado correctamente? → Verifica

HISTORIAL
├─ Usuario logueado? → Muestra vacío si NO
└─ Historial del usuario actual → Filtra por ID
```

---

**Última actualización:** 2025
**Proyecto:** TemuLandia E-commerce
