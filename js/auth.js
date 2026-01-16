// ===== SISTEMA DE AUTENTICACIÓN =====
// Gestiona registro, login y sesión de usuarios

// Obtener usuarios registrados del localStorage
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Guardar usuarios en localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Obtener usuario actual logueado
function obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuario-actual")) || null;
}

// Establecer usuario actual logueado
function establecerUsuarioActual(usuario) {
    localStorage.setItem("usuario-actual", JSON.stringify(usuario));
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuario-actual");
    // Limpiar carrito del usuario anterior
    localStorage.removeItem("productos-en-carrito");
    window.location.href = "./inicio.html";
}

// Registrar nuevo usuario
function registrarUsuario(email, contraseña) {
    const usuarios = obtenerUsuarios();
    
    // Verificar si el email ya existe
    if (usuarios.some(u => u.email === email)) {
        return { exito: false, mensaje: "Este email ya está registrado" };
    }
    
    // Verificar que contraseña no esté vacía
    if (!contraseña || contraseña.length < 4) {
        return { exito: false, mensaje: "La contraseña debe tener al menos 4 caracteres" };
    }
    
    // Crear nuevo usuario
    const nuevoUsuario = {
        id: Date.now(),
        email: email,
        contraseña: contraseña, // Sin hash (proyecto educativo)
        fechaRegistro: new Date().toLocaleString('es-ES')
    };
    
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    
    return { exito: true, mensaje: "Registro exitoso. Ahora puedes iniciar sesión." };
}

// Login de usuario
function loginUsuario(email, contraseña) {
    const usuarios = obtenerUsuarios();
    
    const usuario = usuarios.find(u => u.email === email && u.contraseña === contraseña);
    
    if (!usuario) {
        return { exito: false, mensaje: "Email o contraseña incorrectos" };
    }
    
    // Establecer usuario actual
    establecerUsuarioActual({
        id: usuario.id,
        email: usuario.email,
        fechaRegistro: usuario.fechaRegistro
    });
    
    return { exito: true, mensaje: "Sesión iniciada correctamente" };
}

// Obtener historial de compras del usuario actual
function obtenerHistorialUsuario() {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) return [];
    
    const todosHistoriales = JSON.parse(localStorage.getItem("historial-compras")) || {};
    return todosHistoriales[usuarioActual.id] || [];
}

// Guardar compra en el historial del usuario actual
function guardarCompraUsuario(compra) {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) return false;
    
    const todosHistoriales = JSON.parse(localStorage.getItem("historial-compras")) || {};
    
    if (!todosHistoriales[usuarioActual.id]) {
        todosHistoriales[usuarioActual.id] = [];
    }
    
    todosHistoriales[usuarioActual.id].push(compra);
    localStorage.setItem("historial-compras", JSON.stringify(todosHistoriales));
    return true;
}

// Verificar si hay usuario logueado
function hayUsuarioLogueado() {
    return obtenerUsuarioActual() !== null;
}

// Obtener nombre del usuario (email)
function obtenerNombreUsuario() {
    const usuario = obtenerUsuarioActual();
    return usuario ? usuario.email : null;
}

// ===== SISTEMA DE PRODUCTOS FRECUENTES =====
// Registra y calcula qué productos compra más frecuentemente el usuario

/**
 * Registra la compra de un producto para tracking de frecuencia
 * Se llama cada vez que el usuario completa una compra
 * @param {string} productoId - ID del producto comprado
 */
function registrarFrecuenciaCompra(productoId) {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) return;
    
    // Obtener frecuencia actual
    const frecuenciaKey = `frecuencia-compras-${usuarioActual.id}`;
    const frecuenciaActual = JSON.parse(localStorage.getItem(frecuenciaKey)) || {};
    
    // Incrementar contador para este producto
    if (frecuenciaActual[productoId]) {
        frecuenciaActual[productoId]++;
    } else {
        frecuenciaActual[productoId] = 1;
    }
    
    // Guardar frecuencia actualizada
    localStorage.setItem(frecuenciaKey, JSON.stringify(frecuenciaActual));
}

/**
 * Obtiene el mapa de frecuencia de compras del usuario actual
 * @returns {Object} Objeto con { productoId: cantidadComprada }
 */
function obtenerFrecuenciaCompras() {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) return {};
    
    const frecuenciaKey = `frecuencia-compras-${usuarioActual.id}`;
    return JSON.parse(localStorage.getItem(frecuenciaKey)) || {};
}

/**
 * Obtiene los IDs de los productos más comprados ordenados por frecuencia
 * @param {number} limite - Número de productos a devolver (default: 4)
 * @returns {Array} Array de IDs de productos más comprados
 */
function obtenerProductosMasComprados(limite = 4) {
    const frecuencia = obtenerFrecuenciaCompras();
    
    // Convertir objeto a array de [productoId, cantidad]
    const productosOrdenados = Object.entries(frecuencia)
        .sort((a, b) => b[1] - a[1]) // Ordenar por cantidad descendente
        .slice(0, limite) // Tomar solo los primeros 'limite'
        .map(entry => entry[0]); // Devolver solo los IDs
    
    return productosOrdenados;
}

/**
 * Ordena un array de productos putting los más comprados primero
 * @param {Array} productos - Array de productos a ordenar
 * @returns {Array} Productos ordenados con los más frecuentes primero
 */
function ordenarPorFrecuencia(productos) {
    const productosFrecuentes = obtenerProductosMasComprados(4); // Top 4
    
    if (productosFrecuentes.length === 0) {
        return productos; // Si no hay datos, devolver sin cambios
    }
    
    const frecuencia = obtenerFrecuenciaCompras();
    
    // Crear copia para no mutar original
    const copia = [...productos];
    
    // Ordenar: productos frecuentes primero, luego el resto
    copia.sort((a, b) => {
        const aEsFrecuente = productosFrecuentes.includes(a.id);
        const bEsFrecuente = productosFrecuentes.includes(b.id);
        
        // Si ambos son frecuentes o ninguno lo es, mantener orden original
        if (aEsFrecuente === bEsFrecuente) {
            // Si ambos son frecuentes, ordenar por frecuencia
            if (aEsFrecuente) {
                return frecuencia[b.id] - frecuencia[a.id]; // Mayor frecuencia primero
            }
            return 0;
        }
        
        // Los frecuentes van primero
        return aEsFrecuente ? -1 : 1;
    });
    
    return copia;
}

/**
 * Calcula estadísticas de compra del usuario
 * @returns {Object} Objeto con estadísticas
 */
function obtenerEstadisticasCompras() {
    const historial = obtenerHistorialUsuario();
    const frecuencia = obtenerFrecuenciaCompras();
    
    const totalCompras = historial.length;
    const totalGastado = historial.reduce((sum, compra) => sum + compra.total, 0);
    const productosUnicos = Object.keys(frecuencia).length;
    const totalProductosComprados = Object.values(frecuencia).reduce((sum, count) => sum + count, 0);
    
    // Top 3 productos más comprados
    const topProductos = Object.entries(frecuencia)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([id, cantidad]) => ({ id, cantidad }));
    
    return {
        totalCompras,
        totalGastado,
        productosUnicos,
        totalProductosComprados,
        topProductos
    };
}
