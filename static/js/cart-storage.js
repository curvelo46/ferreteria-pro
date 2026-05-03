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