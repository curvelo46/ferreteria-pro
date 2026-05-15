// ==========================================
// INDEX.JS - Página de inicio
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Renderizar categorías
    renderCategories('categoriesGrid');

    // Renderizar productos destacados (solo los primeros 5)
    renderProductsGrid(products.slice(0, 8), 'productsGrid');

    // Renderizar marcas
    renderBrands('brandsGrid');

    // Actualizar contador del carrito
    updateCartCount();

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            if (e.target.value.length > 2 || e.target.value.length === 0) {
                searchProductsPage();
            }
        });

        // Enter en búsqueda
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchProductsPage();
        });
    }
});

// Función de búsqueda para la página de inicio
function searchProductsPage() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) {
        // Al limpiar búsqueda, volver a mostrar solo 5
        renderProductsGrid(products.slice(0, 5), 'productsGrid');
        return;
    }

    const filtered = searchProducts(query);
    // En búsqueda puedes mostrar todos los resultados o también limitar
    renderProductsGrid(filtered, 'productsGrid');

    // Scroll a productos
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        productosSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ... resto de funciones sin cambios
// Función de búsqueda para la página de inicio
function searchProductsPage() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) {
        renderProductsGrid(products, 'productsGrid');
        return;
    }

    const filtered = searchProducts(query);
    renderProductsGrid(filtered, 'productsGrid');

    // Scroll a productos
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        productosSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Funciones de interacción (compatibles con cart-storage.js)
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const cart = getStoredCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen,
            descripcion: product.descripcion,
            categoria_nombre: product.categoria_nombre,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    showToast(`${product.nombre} agregado al carrito`);
}

function addToWishlist(productId) {
    showToast('Producto agregado a favoritos');
}

function quickView(productId) {
    const product = getProductById(productId);
    if (product) {
        showToast(`Vista rápida: ${product.nombre}`);
    }
}

function toggleCart() {
    const cart = getStoredCart();
    if (cart.length === 0) {
        showToast('El carrito está vacío');
    } else {
        const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        showToast(`Tienes ${count} productos en el carrito`);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

function subscribeNewsletter() {
    showToast('¡Gracias por suscribirte! Revisa tu correo.');
}