// ==========================================
// CART-PAGE.JS - Renderizado del carrito
// ==========================================

function formatPrice(price) {
    return '$ ' + Number(price).toLocaleString('es-CO');
}

function renderCart() {
    const cart = getStoredCart();
    const container = document.getElementById('cartContainer');

    if (!container) {
        console.error('No se encontró el contenedor del carrito (#cartContainer)');
        return;
    }

    // Si el carrito está vacío
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart" style="text-align: center; padding: 60px 20px;">
                <i class="fas fa-shopping-cart" style="font-size: 4rem; color: #ddd; margin-bottom: 20px;"></i>
                <h3>Tu carrito está vacío</h3>
                <p style="color: #666; margin: 15px 0;">Añade productos desde el inicio para verlos aquí.</p>
                <a href="/productos" class="btn btn-primary" style="display: inline-block; margin-top: 10px; text-decoration: none; padding: 12px 24px; background: #e74c3c; color: white; border-radius: 8px;">
                    <i class="fas fa-shopping-bag"></i> Ver Productos
                </a>
            </div>
        `;
        updateCartCount();
        return;
    }

    // Generar filas de productos
    const rows = cart.map((item, index) => {
        // Verificar si tiene variantes
        const hasVariants = item.variantes && Object.keys(item.variantes).length > 0;
        const variantBadges = hasVariants ? renderVariantBadges(item.variantes) : '';
        
        return `
            <tr>
                <td class="cart-product" style="padding: 15px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="position: relative;">
                            <img src="${item.imagen}" 
                                 alt="${item.nombre}" 
                                 style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid #eee;"
                                 onerror="this.src='https://via.placeholder.com/80x80?text=${encodeURIComponent(item.nombre)}'">
                            ${hasVariants ? `
                                <div style="position: absolute; bottom: -5px; right: -5px; 
                                            background: white; border-radius: 50%; width: 24px; height: 24px;
                                            display: flex; align-items: center; justify-content: center;
                                            box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: 1px solid #eee;">
                                    <i class="fas fa-layer-group" style="font-size: 0.7rem; color: #e74c3c;"></i>
                                </div>
                            ` : ''}
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <strong style="display: block; margin-bottom: 5px; font-size: 0.95rem;">${item.nombre}</strong>
                            <p style="color: #666; font-size: 0.8rem; margin: 0 0 6px 0; line-height: 1.4;">${item.descripcion || item.categoria_nombre || ''}</p>
                            <div style="display: flex; flex-wrap: wrap; gap: 2px;">
                                ${variantBadges}
                            </div>
                        </div>
                    </div>
                </td>
                <td style="padding: 15px; white-space: nowrap;">
                    <strong style="color: #e74c3c;">${formatPrice(item.precio)}</strong>
                    ${item.precio_original && item.precio !== item.precio_original ? `
                        <div style="font-size: 0.75rem; color: #999; text-decoration: line-through;">
                            ${formatPrice(item.precio_original)}
                        </div>
                    ` : ''}
                </td>
                <td style="padding: 15px; text-align: center;">
                    <div class="cart-qty-controls" style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <button type="button" onclick="updateCartQuantity(${index}, -1)" 
                                style="width: 32px; height: 32px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; font-size: 1rem; transition: all 0.2s;"
                                onmouseover="this.style.background='#f8f9fa'" 
                                onmouseout="this.style.background='white'">-</button>
                        <span style="min-width: 30px; text-align: center; font-weight: 600;">${item.quantity || 1}</span>
                        <button type="button" onclick="updateCartQuantity(${index}, 1)" 
                                style="width: 32px; height: 32px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; font-size: 1rem; transition: all 0.2s;"
                                onmouseover="this.style.background='#f8f9fa'" 
                                onmouseout="this.style.background='white'">+</button>
                    </div>
                </td>
                <td style="padding: 15px; white-space: nowrap;">
                    <strong>${formatPrice((item.precio || 0) * (item.quantity || 1))}</strong>
                </td>
                <td style="padding: 15px;">
                    <button onclick="removeCartItem(${index})" 
                            style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                            onmouseover="this.style.background='#c82333'" 
                            onmouseout="this.style.background='#dc3545'">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    // Renderizar tabla completa
    container.innerHTML = `
        <div class="cart-wrapper" style="display: grid; grid-template-columns: 1fr 350px; gap: 30px; align-items: start;">
            <div style="overflow-x: auto;">
                <table class="cart-table" style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 20px; text-align: left;">Producto</th>
                            <th style="padding: 20px; text-align: left;">Precio</th>
                            <th style="padding: 20px; text-align: center;">Cantidad</th>
                            <th style="padding: 20px; text-align: left;">Total</th>
                            <th style="padding: 20px;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>

            <div class="cart-summary" style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 20px;">
                <h3 style="margin-bottom: 20px; color: #333; font-size: 1.3rem;">Resumen del pedido</h3>

                <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <span style="color: #666;">Productos:</span>
                    <strong>${cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</strong>
                </div>

                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 1.1rem;">
                    <span>Subtotal:</span>
                    <strong style="color: #e74c3c; font-size: 1.3rem;">${formatPrice(getCartTotal(cart))}</strong>
                </div>

                <div class="cart-actions" style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="/checkout" style="width: 100%; padding: 15px; font-size: 1rem; background: #e74c3c; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; text-decoration: none; text-align: center; display: block; transition: all 0.2s;"
                       onmouseover="this.style.background='#c0392b'" 
                       onmouseout="this.style.background='#e74c3c'">
                        <i class="fas fa-credit-card"></i> Ir a pagar
                    </a>
                    <button onclick="clearCart()" 
                            style="width: 100%; padding: 12px; border: 1px solid #ddd; background: white; border-radius: 8px; cursor: pointer; color: #666; transition: all 0.2s;"
                            onmouseover="this.style.background='#f8f9fa'" 
                            onmouseout="this.style.background='white'">
                        <i class="fas fa-trash"></i> Vaciar carrito
                    </button>
                    <a href="/productos" 
                       style="text-align: center; padding: 12px; border: 1px solid #ddd; text-decoration: none; color: #333; display: block; border-radius: 8px; transition: all 0.2s;"
                       onmouseover="this.style.background='#f8f9fa'" 
                       onmouseout="this.style.background='white'">
                        <i class="fas fa-arrow-left"></i> Seguir comprando
                    </a>
                </div>
            </div>
        </div>
    `;

    updateCartCount();
}

function updateCartQuantity(productId, delta) {
    const cart = getStoredCart();
    const product = cart.find(item => item.id === productId);
    if (!product) return;

    product.quantity = Math.max(1, (product.quantity || 1) + delta);
    saveCart(cart);
    renderCart();
}

function removeCartItem(productId) {
    let cart = getStoredCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartCount();
}

function clearCart() {
    if (!confirm('¿Estás seguro de que deseas vaciar el carrito?')) return;
    saveCart([]);
    renderCart();
}

function renderVariantBadges(variantes) {
    if (!variantes || Object.keys(variantes).length === 0) return '';
    
    const colors = {
        'Rojo': '#e74c3c', 'Azul': '#3498db', 'Amarillo': '#f1c40f',
        'Verde': '#2ecc71', 'Negro': '#2c3e50', 'Blanco': '#ecf0f1',
        'Gris': '#95a5a6', 'Naranja': '#e67e22', 'Rosa': '#fd79a8'
    };
    
    return Object.entries(variantes).map(([attr, value]) => {
        const bgColor = attr.toLowerCase() === 'color' ? (colors[value] || '#ddd') : '#f8f9fa';
        const textColor = attr.toLowerCase() === 'color' && ['Amarillo', 'Blanco', 'Rosa'].includes(value) ? '#333' : 'white';
        
        return `
            <span style="display: inline-flex; align-items: center; gap: 4px; 
                         background: ${attr.toLowerCase() === 'color' ? bgColor : '#f0f0f0'}; 
                         color: ${attr.toLowerCase() === 'color' ? textColor : '#666'};
                         padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; 
                         font-weight: 500; margin-right: 6px; margin-top: 4px;
                         border: ${attr.toLowerCase() === 'color' ? '1px solid rgba(0,0,0,0.1)' : 'none'};">
                ${attr.toLowerCase() === 'color' ? `<span style="width: 10px; height: 10px; border-radius: 50%; background: ${bgColor}; display: inline-block; border: 1px solid rgba(0,0,0,0.2);"></span>` : ''}
                ${value}
            </span>
        `;
    }).join('');
}

function updateCartQuantity(index, delta) {
    const cart = getStoredCart();
    if (index < 0 || index >= cart.length) return;
    
    const item = cart[index];
    item.quantity = Math.max(1, (item.quantity || 1) + delta);
    saveCart(cart);
    renderCart();
}

// Función checkout eliminada — ahora se maneja en checkout.js

// Exponer funciones al scope global
window.updateCartQuantity = updateCartQuantity;
window.removeCartItem = removeCartItem;
window.clearCart = clearCart;

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
});