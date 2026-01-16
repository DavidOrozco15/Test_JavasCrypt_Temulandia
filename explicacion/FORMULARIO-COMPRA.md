# 📋 Documentación: Formulario de Compra (carrito.html)

> Documentación del modal del formulario de compra que recopila datos de entrega del cliente.

---

## 🎯 Propósito

El formulario de compra se muestra **ANTES** de mostrar el resumen de la compra. Permite que el usuario ingrese sus datos de entrega (nombres, dirección, teléfono, etc.) que se guardarán junto con la compra.

---

## 📋 Estructura del formulario

### HTML del Modal

```html
<!-- Modal: Formulario de Compra -->
<div id="modal-formulario-compra" class="modal formulario-overlay disabled">
    <div class="modal-contenedor modal-formulario">
        <button id="cerrar-formulario" class="modal-cerrar">X</button>
        
        <h2>Información de Entrega</h2>
        
        <form id="form-compra">
            <!-- Fila 1: Nombres -->
            <div class="form-grupo">
                <label for="nombres">Nombres Completos *</label>
                <input 
                    type="text" 
                    id="nombres" 
                    name="nombres" 
                    placeholder="Juan Pérez García"
                    required
                >
            </div>
```

**Línea 1-16:** Contenedor principal del modal
- `id="modal-formulario-compra"`: Identificador para controlar con JavaScript
- Clases:
  - `modal`: Estilos base del modal
  - `formulario-overlay`: Fondo oscuro/transparente
  - `disabled`: Oculto por defecto
- Botón `X` para cerrar
- Título del formulario
- Inicio del formulario HTML

```html
            <!-- Fila 2: Correo (readonly) -->
            <div class="form-grupo">
                <label for="correo">Correo Electrónico *</label>
                <input 
                    type="email" 
                    id="correo" 
                    name="correo" 
                    readonly
                >
            </div>
```

**Línea 17-26:**
- Campo de correo: `readonly` (no se puede editar)
- Se pre-llena automáticamente con el email del usuario logueado
- Función: `mostrarFormularioCompra()` hace esto

```html
            <!-- Fila 3: Teléfono -->
            <div class="form-grupo">
                <label for="telefono">Teléfono *</label>
                <input 
                    type="tel" 
                    id="telefono" 
                    name="telefono" 
                    placeholder="3201234567"
                    required
                >
            </div>
```

**Línea 27-36:**
- Campo de teléfono: `type="tel"`
- Placeholder muestra formato esperado
- Campo obligatorio

```html
            <!-- Fila 4: Dirección -->
            <div class="form-grupo">
                <label for="direccion">Dirección *</label>
                <input 
                    type="text" 
                    id="direccion" 
                    name="direccion" 
                    placeholder="Calle 10 #20-30"
                    required
                >
            </div>
```

**Línea 37-46:**
- Campo de dirección completa
- Campo obligatorio

```html
            <!-- Fila 5: Ciudad y Departamento -->
            <div class="form-fila">
                <div class="form-grupo">
                    <label for="ciudad">Ciudad *</label>
                    <input 
                        type="text" 
                        id="ciudad" 
                        name="ciudad" 
                        placeholder="Bogotá"
                        required
                    >
                </div>
                
                <div class="form-grupo">
                    <label for="departamento">Departamento *</label>
                    <input 
                        type="text" 
                        id="departamento" 
                        name="departamento" 
                        placeholder="Cundinamarca"
                        required
                    >
                </div>
            </div>
```

**Línea 47-69:**
- Clase `form-fila`: Coloca estos dos campos lado a lado (responsive)
- Ciudad (código DIVIPOLA o nombre)
- Departamento/Región

```html
            <!-- Fila 6: Código Postal -->
            <div class="form-grupo">
                <label for="codigo-postal">Código Postal *</label>
                <input 
                    type="text" 
                    id="codigo-postal" 
                    name="codigo-postal" 
                    placeholder="110111"
                    required
                >
            </div>
```

**Línea 70-79:**
- Campo de código postal
- Formato: números (validación en JavaScript)

```html
            <!-- Fila 7: Método de Pago -->
            <div class="form-grupo">
                <label for="metodo-pago">Método de Pago *</label>
                <select 
                    id="metodo-pago" 
                    name="metodo-pago" 
                    required
                >
                    <option value="">Selecciona un método</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta de Crédito</option>
                </select>
            </div>
```

**Línea 80-91:**
- Campo `<select>` con opciones
- Valores: "efectivo" o "tarjeta"
- Se guarda con la compra

```html
            <!-- Mensaje de error -->
            <div id="form-error" class="form-error"></div>

            <!-- Botones -->
            <div class="form-acciones">
                <button type="submit" class="btn-completar">Completar Compra</button>
            </div>
        </form>
    </div>
</div>
```

**Línea 92-99:**
- Div para mostrar errores de validación
- Botón "Completar Compra" (type="submit")
- Al hacer click, ejecuta JavaScript que valida y llama `completarCompra()`

---

## 🎨 Clases CSS relacionadas

```css
.modal {
    /* Base de todo modal */
    fixed positioning
    z-index alto
}

.formulario-overlay {
    /* Fondo oscuro detrás del formulario */
    background: rgba(0,0,0,0.5)
    z-index: 9998
}

.modal-formulario {
    /* Contenedor blanco del formulario */
    background: white
    border-radius
    padding
}

.form-grupo {
    /* Cada campo del formulario */
    margin-bottom
    display: flex / grid
}

.form-fila {
    /* Agrupa campos horizontalmente */
    display: grid
    grid-template-columns: 1fr 1fr
    gap
}

.form-error {
    /* Mensaje de error */
    color: red
    font-size: pequeño
    padding
}

.btn-completar {
    /* Botón de submit */
    background: color
    padding
    border-radius
    cursor: pointer
    transition
}
```

---

## 🔄 Flujo de JavaScript

### 1. Mostrar formulario

```javascript
// En carrito.js - función comprarCarrito()
function comprarCarrito() {
    if (!productosEnCarrito || productosEnCarrito.length === 0) return;
    
    // Mostrar formulario
    mostrarFormularioCompra();
}

// Abre el modal y pre-llena el correo
function mostrarFormularioCompra() {
    const modalFormulario = document.querySelector('#modal-formulario-compra');
    const inputCorreo = document.querySelector('#correo');
    
    // Pre-llenar correo del usuario logueado
    inputCorreo.value = obtenerNombreUsuario();  // De auth.js
    
    // Mostrar modal
    modalFormulario.classList.remove('disabled');
}
```

**Flujo:**
1. Usuario click en "Comprar Ahora"
2. `comprarCarrito()` se ejecuta
3. `mostrarFormularioCompra()` abre el modal
4. Correo pre-rellenado con `obtenerNombreUsuario()` (de auth.js)

---

### 2. Validar y procesar formulario

```javascript
// En carrito.js - Event listener en el formulario
const formCompra = document.querySelector('#form-compra');

if (formCompra) {
    formCompra.addEventListener('submit', (e) => {
        e.preventDefault();  // Evita recarga de página
        
        // Obtener valores
        const nombres = document.querySelector('#nombres').value.trim();
        const correo = document.querySelector('#correo').value.trim();
        const telefono = document.querySelector('#telefono').value.trim();
        const direccion = document.querySelector('#direccion').value.trim();
        const ciudad = document.querySelector('#ciudad').value.trim();
        const departamento = document.querySelector('#departamento').value.trim();
        const codigoPostal = document.querySelector('#codigo-postal').value.trim();
        const metodoPago = document.querySelector('#metodo-pago').value;
        const msgError = document.querySelector('#form-error');
        
        // Validaciones
        if (!nombres || !correo || !telefono || !direccion || !ciudad || !departamento || !codigoPostal || !metodoPago) {
            msgError.textContent = 'Por favor completa todos los campos.';
            return;
        }
        
        // Validar teléfono (debe tener al menos 7 dígitos)
        if (!/^\d{7,}$/.test(telefono.replace(/\s|-/g, ''))) {
            msgError.textContent = 'Teléfono inválido.';
            return;
        }
        
        // Si todo está bien
        msgError.textContent = '';
        
        // Crear objeto con los datos
        const datosCliente = {
            nombres,
            correo,
            telefono,
            direccion,
            ciudad,
            departamento,
            codigoPostal,
            metodoPago
        };
        
        // Procesar compra
        completarCompra(datosCliente);
        
        // Limpiar formulario
        formCompra.reset();
    });
}
```

**Validaciones:**
- Todos los campos deben estar completos
- Teléfono: mínimo 7 dígitos
- Se muestran errores en `#form-error`

---

### 3. Procesar compra

```javascript
function completarCompra(datosCliente) {
    // Crear snapshot de la compra
    const productosComprados = productosEnCarrito.map(p => ({ ...p }));
    const totalCompra = productosEnCarrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    // Crear objeto de compra CON datos del cliente
    const compra = {
        id: Date.now(),
        fecha: new Date().toLocaleString('es-ES'),
        productos: productosComprados,
        total: totalCompra,
        cliente: datosCliente  // ← Aquí se guardan los datos
    };
    
    // Guardar en localStorage
    guardarCompraUsuario(compra);  // De auth.js
    
    // Mostrar resumen CON datos del cliente
    renderizarResumenCompra(productosComprados, totalCompra, datosCliente);
    
    // Vaciar carrito
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    // Ocultar formulario
    const modalFormulario = document.querySelector('#modal-formulario-compra');
    modalFormulario.classList.add('disabled');
}
```

**Datos guardados:**
```javascript
compra = {
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
```

---

### 4. Mostrar resumen con datos

```javascript
function renderizarResumenCompra(productosComprados, total, datosCliente = null) {
    // ...
    
    // Si hay datos del cliente, mostrar primero
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
    }
    
    // Mostrar productos...
}
```

**Resultado:** El resumen muestra:
1. Información de entrega (datos del cliente)
2. Línea separadora
3. Productos comprados
4. Total

---

## 💾 Datos guardados en localStorage

### Estructura antes (v1):
```javascript
localStorage["historial-compras"] = [
    {
        id: 123,
        fecha: "16/1/2026",
        productos: [ ... ],
        total: 50.00
        // SIN datos del cliente
    }
]
```

### Estructura ahora (v2):
```javascript
localStorage["historial-compras"] = {
    "usuarioId1": [
        {
            id: 123,
            fecha: "16/1/2026, 10:30:45",
            productos: [ ... ],
            total: 50.00,
            cliente: {  // ← NUEVO
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
    ]
}
```

---

## ✅ Checklist de campos del formulario

| Campo | Tipo | Obligatorio | Validación | Guardado |
|-------|------|-------------|-----------|----------|
| Nombres | text | ✅ | No vacío | ✅ |
| Correo | email | ✅ | readonly (auto-llenar) | ✅ |
| Teléfono | tel | ✅ | ≥ 7 dígitos | ✅ |
| Dirección | text | ✅ | No vacío | ✅ |
| Ciudad | text | ✅ | No vacío | ✅ |
| Departamento | text | ✅ | No vacío | ✅ |
| Código Postal | text | ✅ | No vacío | ✅ |
| Método Pago | select | ✅ | efectivo/tarjeta | ✅ |

---

## 🔐 Notas de privacidad

- Los datos se guardan en **localStorage del navegador**
- No se envían a servidor (proyecto educativo)
- Se pueden ver en DevTools (F12 → Application → localStorage)
- Se guardan **por usuario** (solo usuario logueado ve su info)

---

## 🎯 Próximas mejoras posibles

- Validación de dirección con autocompletado
- Guardar direcciones favoritas del usuario
- Envío a servidor real
- Confirmación de compra por email
- Integración con pasarela de pago real

---
