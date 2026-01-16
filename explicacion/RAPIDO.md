# 📑 Índice Rápido - Documentación TemuLandia

> Acceso rápido a la documentación. Presiona Ctrl+F para buscar.

---

## 🎯 Inicio rápido

**¿Por dónde empiezo?**
→ Lee [INDICE-DOCUMENTACION.md](INDICE-DOCUMENTACION.md)

**¿Quiero saber qué cambió?**
→ Lee [RESUMEN-DOCUMENTACION.md](RESUMEN-DOCUMENTACION.md)

---

## 📚 Archivos de documentación

### 1. **INDICE-DOCUMENTACION.md** (260 líneas)
**Punto de entrada principal**
- Descripción de cada archivo .md
- Flujos completos del sistema
- Estructura localStorage
- Relación entre archivos
- Cómo usar la documentación

👉 **Empieza aquí**

---

### 2. **RESUMEN-DOCUMENTACION.md** (250 líneas)
**Resumen de todo lo documentado**
- Qué se documentó
- Cuántas funciones por módulo
- Cambios v1 → v2
- Checklist de características
- Estado del proyecto

👉 **Lee esto para overview**

---

### 3. **auth.md** (360 líneas)
**Sistema de Autenticación**
- 11 funciones documentadas línea por línea
- Flujos de: registro, login, logout, compra, historial
- Estructura localStorage de usuarios
- Notas de seguridad

**Buscar función:**
- `obtenerUsuarios()` - línea 5
- `registrarUsuario()` - línea 35
- `loginUsuario()` - línea 59
- `obtenerHistorialUsuario()` - línea 79
- `guardarCompraUsuario()` - línea 87
- `hayUsuarioLogueado()` - línea 101

👉 **Lee para entender autenticación**

---

### 4. **carrito.md** (650 líneas)
**Carrito y Compras (ACTUALIZADO)**
- Código original + cambios nuevos
- Todas las funciones documentadas línea por línea
- **NUEVO:** Formulario de compra
- **NUEVO:** Datos del cliente en compra
- Flujos v1 vs v2

**Buscar función:**
- `cargarProductosCarrito()` - línea 31
- `eliminarDelCarrito()` - línea 73
- `comprarCarrito()` - línea 99 (modificada)
- **`mostrarFormularioCompra()`** - línea 127 (NUEVA)
- **`completarCompra()`** - línea 141 (NUEVA)
- `renderizarResumenCompra()` - línea 182 (modificada)
- `mostrarHistorial()` - línea 227
- `mostrarDetalleCompra()` - línea 275

👉 **Lee para entender flujo de compra**

---

### 5. **FORMULARIO-COMPRA.md** (310 líneas)
**Documentación del formulario (NUEVO)**
- Estructura HTML detallada
- Clases CSS relacionadas
- Flujo JavaScript completo
- Validaciones
- Datos guardados

**Secciones:**
- Estructura HTML del modal
- Campos del formulario (8 campos)
- Clases CSS
- Flujo: mostrar → validar → procesar
- Datos en localStorage

👉 **Lee para detalles del formulario**

---

### 6. **main.md** (560 líneas)
**Catálogo y Búsqueda**
- 10 funciones documentadas línea por línea
- API FakeStore
- Búsqueda, filtrado, ordenamiento
- Agregar al carrito
- Modales

**Buscar función:**
- `obtenerProductos()` - línea 11
- `filtrarProductos()` - línea 50
- `agregarAlCarrito()` - línea 150
- `abrirModal()` - línea 200
- Integración con auth.js - línea 545

👉 **Lee para entender catálogo**

---

### 7. **menu.md** (200 líneas)
**Navegación**
- Estructura del menú
- Links de navegación
- Botones de login/logout

👉 **Lee para entender navegación**

---

## 🔍 Buscar por tema

### Autenticación
- [auth.md](auth.md) - Todo sobre login/registro
- [carrito.md](carrito.md#integración-con-sistema-de-autenticación) - Autenticación en compra
- [main.md](main.md#integración-con-sistema-de-autenticación) - Autenticación en catálogo

### Formulario de compra
- [FORMULARIO-COMPRA.md](FORMULARIO-COMPRA.md) - Detalle completo
- [carrito.md](carrito.md#1011-mostrarformulariocompra-nuevo) - Integración en carrito

### Historial de compras
- [auth.md](auth.md#8️⃣-obtenerhistorialusuario) - `obtenerHistorialUsuario()`
- [auth.md](auth.md#9️⃣-guardarcomprasusuario) - `guardarCompraUsuario()`
- [carrito.md](carrito.md#1️⃣3️⃣-mostrarhistorial-copilot---funciona-con-datos-del-cliente) - `mostrarHistorial()`
- [carrito.md](carrito.md#1️⃣4️⃣-mostrardetallecompra-copilot---muestra-datos-del-cliente) - `mostrarDetalleCompra()`

### localStorage
- [INDICE-DOCUMENTACION.md](INDICE-DOCUMENTACION.md#-estructura-localstorage) - Estructura general
- [auth.md](auth.md#-estructura-localstorage) - Estructura de usuarios y compras
- [carrito.md](carrito.md#-estructura-localstorage-actualizada) - Datos con cliente
- [FORMULARIO-COMPRA.md](FORMULARIO-COMPRA.md#-datos-guardados-en-localstorage) - Datos del formulario

### Flujos completos
- [INDICE-DOCUMENTACION.md](INDICE-DOCUMENTACION.md#-flujo-completo-del-sistema) - Todos los flujos
- [auth.md](auth.md#-flujo-completo-de-autenticación) - Auth flow
- [carrito.md](carrito.md#-flujo-de-compra-actualizado) - Compra flow
- [carrito.md](carrito.md#-actualización-formulario-de-compra) - Formulario flow

---

## 🔢 Tabla de funciones

### auth.js (11 funciones)

| # | Función | Línea | Archivo |
|---|---------|-------|---------|
| 1 | `obtenerUsuarios()` | 5 | auth.md |
| 2 | `guardarUsuarios()` | 10 | auth.md |
| 3 | `obtenerUsuarioActual()` | 15 | auth.md |
| 4 | `establecerUsuarioActual()` | 20 | auth.md |
| 5 | `cerrarSesion()` | 25 | auth.md |
| 6 | `registrarUsuario()` | 35 | auth.md |
| 7 | `loginUsuario()` | 59 | auth.md |
| 8 | `obtenerHistorialUsuario()` | 79 | auth.md |
| 9 | `guardarCompraUsuario()` | 87 | auth.md |
| 10 | `hayUsuarioLogueado()` | 101 | auth.md |
| 11 | `obtenerNombreUsuario()` | 106 | auth.md |

### carrito.js (11 funciones)

| # | Función | Línea | Archivo | Estado |
|---|---------|-------|---------|--------|
| 1 | `cargarProductosCarrito()` | 31 | carrito.md | Original |
| 2 | `actualizarBotonesEliminar()` | 66 | carrito.md | Original |
| 3 | `eliminarDelCarrito()` | 73 | carrito.md | Original |
| 4 | `vaciarCarrito()` | 84 | carrito.md | Original |
| 5 | `actualizarTotal()` | 95 | carrito.md | Original |
| 6 | `comprarCarrito()` | 99 | carrito.md | ✨ Modificada |
| 7 | `mostrarFormularioCompra()` | 127 | carrito.md | 🆕 Nueva |
| 8 | `completarCompra()` | 141 | carrito.md | 🆕 Nueva |
| 9 | `renderizarResumenCompra()` | 182 | carrito.md | ✨ Modificada |
| 10 | `mostrarHistorial()` | 227 | carrito.md | Original |
| 11 | `mostrarDetalleCompra()` | 275 | carrito.md | ✨ Modificada |

### main.js (10 funciones)

| # | Función | Línea | Archivo |
|---|---------|-------|---------|
| 1 | `obtenerProductos()` | 11 | main.md |
| 2 | `filtrarProductos()` | 50 | main.md |
| 3 | `ordenarProductos()` | 100 | main.md |
| 4 | `cargarProductos()` | 150 | main.md |
| 5 | `actualizarBotonesAgregar()` | 180 | main.md |
| 6 | `agregarAlCarrito()` | 200 | main.md |
| 7 | `actualizarNumerito()` | 220 | main.md |
| 8 | `abrirModal()` | 240 | main.md |
| 9 | `cerrarModal()` | 280 | main.md |
| 10 | `renderizarModal()` | 290 | main.md |

---

## ⚡ Acceso rápido a secciones

### Explicaciones detalladas
- Función explicada línea por línea → Busca "**Línea X**:" en el archivo

### Flujos visuales
- Flujo de ejecución → Busca "**Flujo:**" en el archivo

### Ejemplos de código
- Código ejecutable → Busca "```javascript" en el archivo

### Estructura de datos
- localStorage, objetos, arrays → Busca "```javascript" o tabla con formato

### Validaciones
- Qué valida una función → Busca "**Validac**" o "**Verif**" en el archivo

---

## 🎓 Niveles de documentación

### Nivel 1: Principiante
**Tiempo:** 30 minutos
1. Lee: INDICE-DOCUMENTACION.md
2. Lee: RESUMEN-DOCUMENTACION.md
3. Lee: Sección "📊 Flujo" de carrito.md

**Resultado:** Entiendes flujo general del sistema

### Nivel 2: Intermedio
**Tiempo:** 2 horas
1. Lee: auth.md (completo)
2. Lee: carrito.md (secciones 1-8)
3. Lee: FORMULARIO-COMPRA.md
4. Busca las funciones que usas frecuentemente

**Resultado:** Entiendes autenticación y compras

### Nivel 3: Avanzado
**Tiempo:** 4 horas
1. Lee: auth.md (completo con notas)
2. Lee: carrito.md (completo)
3. Lee: main.md (completo)
4. Analiza relaciones en INDICE-DOCUMENTACION.md

**Resultado:** Puedes modificar y extender el sistema

---

## 🚀 Casos de uso comunes

### "¿Cómo funciona el login?"
1. Abre [auth.md](auth.md)
2. Busca `loginUsuario()` (sección 7)
3. Lee explicación línea por línea
4. Ve flujo en [auth.md](auth.md#-flujo-completo-de-autenticación)

### "¿Cómo se guardan las compras?"
1. Abre [carrito.md](carrito.md)
2. Busca `completarCompra()` (sección 11)
3. Busca `guardarCompraUsuario()` (en auth.md)
4. Ve estructura localStorage en [INDICE-DOCUMENTACION.md](INDICE-DOCUMENTACION.md#-estructura-localstorage)

### "¿Qué valida el formulario?"
1. Abre [FORMULARIO-COMPRA.md](FORMULARIO-COMPRA.md)
2. Ve tabla "Checklist de campos"
3. Lee sección "Validar y procesar formulario"

### "¿Cómo veo el historial de un usuario?"
1. Abre [carrito.md](carrito.md)
2. Busca `mostrarHistorial()` (sección 13)
3. Busca `obtenerHistorialUsuario()` (en auth.md sección 8)
4. Ve flujo en [INDICE-DOCUMENTACION.md](INDICE-DOCUMENTACION.md#4-usuario-ve-historial)

### "¿Dónde se guarda el carrito?"
1. Abre [INDICE-DOCUMENTACION.md](INDICE-DOCUMENTACION.md#-estructura-localstorage)
2. Busca "productos-en-carrito"
3. Ve estructura en multiple archivos

---

## 📱 Archivos relacionados en el proyecto

```
TemuLandia/
├─ js/
│  ├─ auth.js (11 funciones) → Documentado en auth.md
│  ├─ carrito.js (11 funciones) → Documentado en carrito.md
│  ├─ main.js (10 funciones) → Documentado en main.md
│  └─ menu.js → Documentado en menu.md
├─ carrito.html → Formulario documentado en FORMULARIO-COMPRA.md
├─ index.html → Catálogo (main.js)
├─ inicio.html → Login/Registro (auth.js)
└─ explicacion/
   ├─ INDICE-DOCUMENTACION.md ← EMPIEZA AQUÍ
   ├─ RESUMEN-DOCUMENTACION.md ← Overview
   ├─ auth.md
   ├─ carrito.md
   ├─ FORMULARIO-COMPRA.md
   ├─ main.md
   ├─ menu.md
   └─ RAPIDO.md ← TÚ ESTÁS AQUÍ
```

---

## ✅ Checklist para empezar

- [ ] Leo [INDICE-DOCUMENTACION.md](INDICE-DOCUMENTACION.md)
- [ ] Leo [RESUMEN-DOCUMENTACION.md](RESUMEN-DOCUMENTACION.md)
- [ ] Entiendo flujo de autenticación (auth.md)
- [ ] Entiendo flujo de compra (carrito.md)
- [ ] Entiendo estructura del formulario (FORMULARIO-COMPRA.md)
- [ ] Entiendo localStorage
- [ ] Puedo encontrar cualquier función rápidamente

---

## 💡 Tips

1. **Usar Ctrl+F** para buscar "Línea X" o "función nombre"
2. **Buscar por emoji:** 🔟, 1️⃣1️⃣, etc. para encontrar funciones numeradas
3. **Ver tabla de contenidos** al inicio de cada archivo
4. **Seguir los flujos:** Busca "**Flujo:**" o diagrama ASCII

---

## 📞 Preguntas frecuentes

**P: ¿Por dónde empiezo?**
R: Lee [INDICE-DOCUMENTACION.md](INDICE-DOCUMENTACION.md)

**P: ¿Dónde busco una función específica?**
R: Usa Ctrl+F, busca "función nombre" o ve tabla de funciones en este archivo

**P: ¿Cómo entiendo un flujo completo?**
R: Ve sección "📊 Flujo" en cada archivo .md

**P: ¿Dónde está localStorage documentado?**
R: Busca "💾 Estructura localStorage" en cualquier archivo

**P: ¿Qué cambió de la v1 a v2?**
R: Lee [RESUMEN-DOCUMENTACION.md](RESUMEN-DOCUMENTACION.md) sección "Cambios principales"

---

**Última actualización:** 16/01/2026  
**Total documentado:** 2,340 líneas en 7 archivos  
**Funciones documentadas:** 32 funciones (11 + 11 + 10)

---
