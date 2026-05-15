// ==========================================
// CART-STORAGE.JS - Almacenamiento del carrito
// ==========================================

const CART_KEY = 'ferreteria_cart';

function getStoredCart() {
    try {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error('Error al leer carrito:', e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
        console.error('Error al guardar carrito:', e);
    }
}

function updateCartCount() {
    const cart = getStoredCart();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function getCartTotal(cart) {
    return cart.reduce((sum, item) => sum + ((item.precio || 0) * (item.quantity || 1)), 0);
}

// Inicializar contador al cargar cualquier página
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});




// ===== FUNCIONES DE STOCK =====

/**
 * Verifica si hay stock suficiente para todos los productos del carrito
 * @param {Array} cart - Items del carrito
 * @returns {Object} { valido: boolean, faltantes: Array }
 */
function verificarStockDisponible(cart) {
    const faltantes = [];
    
    for (const item of cart) {
        // Buscar el producto en el catálogo
        const producto = products.find(p => p.id === item.id);
        
        if (!producto) {
            faltantes.push({ 
                id: item.id, 
                nombre: item.nombre || 'Producto desconocido', 
                solicitado: item.quantity,
                disponible: 0 
            });
            continue;
        }
        
        // Verificar stock (considerando que puede ser undefined o null)
        const stockDisponible = producto.stock !== undefined ? producto.stock : 0;
        const cantidadSolicitada = item.quantity || 1;
        
        if (stockDisponible < cantidadSolicitada) {
            faltantes.push({
                id: producto.id,
                nombre: producto.nombre,
                solicitado: cantidadSolicitada,
                disponible: stockDisponible
            });
        }
    }
    
    return {
        valido: faltantes.length === 0,
        faltantes: faltantes
    };
}

/**
 * Actualiza el stock de los productos comprados restando las cantidades
 * @param {Array} cart - Items del carrito
 * @returns {boolean} true si se actualizó correctamente
 */
function actualizarStockProductos(cart) {
    try {
        let actualizado = false;
        
        for (const item of cart) {
            const producto = products.find(p => p.id === item.id);
            
            if (producto && producto.stock !== undefined) {
                const cantidadComprada = item.quantity || 1;
                
                // Restar del stock
                producto.stock = Math.max(0, producto.stock - cantidadComprada);
                actualizado = true;
                
                console.log(`Stock actualizado: ${producto.nombre} - Nuevo stock: ${producto.stock}`);
            }
        }
        
        // Guardar los cambios en localStorage para persistencia
        if (actualizado && typeof localStorage !== 'undefined') {
            localStorage.setItem('ferreteria_products', JSON.stringify(products));
        }
        
        return actualizado;
    } catch (error) {
        console.error('Error al actualizar stock:', error);
        return false;
    }
}

/**
 * Restaura el stock de productos (útil si el pago falla)
 * @param {Array} cart - Items del carrito
 */
function restaurarStockProductos(cart) {
    try {
        for (const item of cart) {
            const producto = products.find(p => p.id === item.id);
            
            if (producto && producto.stock !== undefined) {
                const cantidad = item.quantity || 1;
                producto.stock += cantidad;
            }
        }
        
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('ferreteria_products', JSON.stringify(products));
        }
    } catch (error) {
        console.error('Error al restaurar stock:', error);
    }
}