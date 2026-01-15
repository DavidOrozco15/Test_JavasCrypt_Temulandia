# 📚 Documentación: js/menu.js

> Este archivo es muy pequeño y gestiona solo el menú hamburguesa para dispositivos móviles.

---

## 🔍 Índice de funciones

1. **Selector de elementos**
2. **Evento: Abrir menú**
3. **Evento: Cerrar menú**
4. **Evento: Cerrar menú al seleccionar categoría**

---

## 📌 Explicación línea por línea

### 1️⃣ Selectores del menú

```javascript
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");
```
**Línea 1-3:** Selecciona elementos HTML:
- `openMenu`: botón de hamburguesa (menú abierto)
- `closeMenu`: botón X (cerrar menú)
- `aside`: el panel lateral con el menú de categorías

---

### 2️⃣ Evento: Abrir menú

```javascript
openMenu.addEventListener("click", ()=>{
    aside.classList.add("aside-visible");
})
```
**Línea 5-7:**
- Cuando el usuario hace click en el botón de hamburguesa
- Agrega la clase `aside-visible` al `aside`
- Esta clase (definida en CSS) hace que el menú se deslice hacia la vista

---

### 3️⃣ Evento: Cerrar menú

```javascript
closeMenu.addEventListener("click", ()=>{
    aside.classList.remove("aside-visible");
})
```
**Línea 9-11:**
- Cuando el usuario hace click en el botón X
- Remueve la clase `aside-visible` del `aside`
- El menú se desliza fuera de la vista (cierra)

---

### 4️⃣ Evento: Cerrar menú al seleccionar categoría

```javascript
botonesCategorias.forEach(boton => boton.addEventListener("click", ()=>{
    aside.classList.remove("aside-visible");
}))
```
**Línea 13-15:**
- Por cada botón de categoría en el menú
- Cuando el usuario clickea una categoría
- Remueve la clase `aside-visible` (cierra el menú automáticamente)
- **Nota:** `botonesCategorias` está definida en `main.js`, por eso este script debe cargarse DESPUÉS de `main.js`

---

## 🎯 Propósito

Este archivo solo **controla la visibilidad del menú en móviles**:
- El menú está inicialmente oculto
- Al abrir (hamburguesa) → se muestra
- Al cerrar (X) → se oculta
- Al seleccionar algo → se cierra automáticamente

---

## 📊 Dependencias

Este script depende de:
- **`main.js`** debe cargar ANTES porque usa `botonesCategorias` definida ahí
- **`carrito.html` y `inicio.html`** deben tener los elementos HTML con IDs correctos

---

## 💡 Cómo funciona en CSS

El CSS en `main.css` tiene reglas para:
```css
aside {
    transform: translateX(-100%);  /* Fuera de pantalla */
    opacity: 0;
    visibility: hidden;
    transition: .2s;  /* Animación suave */
}

.aside-visible {
    transform: translateX(0);  /* En pantalla */
    opacity: 1;
    visibility: visible;
}
```

Por eso solo añadir/remover la clase `.aside-visible` controla si se ve o no el menú.

---
