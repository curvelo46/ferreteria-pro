// ==========================================
// PEDIDOS.JS - Historial de pedidos
// Ferretería Pro
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarPedidos();
});

function inicializarPedidos() {
    // Actualizar contador del carrito
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }

    // Configurar buscador
    const emailInput = document.getElementById('emailBusqueda');
    if (emailInput) {
        // Intentar recuperar email del checkout anterior
        const emailGuardado = localStorage.getItem('ultimo_email_pedido');
        if (emailGuardado) {
            emailInput.value = emailGuardado;
            cargarPedidos(emailGuardado);
        }

        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                cargarPedidos(this.value.trim());
            }
        });

        emailInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                cargarPedidos(this.value.trim());
            }
        });
    }
}

async function cargarPedidos(email) {
    if (!email) {
        mostrarEstadoVacio('Ingresa tu email para ver tus pedidos');
        return;
    }

    // Guardar email para futuras visitas
    localStorage.setItem('ultimo_email_pedido', email);

    const container = document.getElementById('pedidosList');
    if (!container) return;

    // Mostrar loading
    container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="spinner" style="width: 40px; height: 40px; border: 4px solid #e0e0e0; border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div>
            <p style="color: var(--gray);">Buscando pedidos...</p>
        </div>
    `;

    try {
        const response = await fetch(`/api/pedidos?email=${encodeURIComponent(email)}`);

        if (!response.ok) {
            throw new Error('Error al cargar pedidos');
        }

        const pedidos = await response.json();

        if (pedidos.length === 0) {
            mostrarEstadoVacio(`No encontramos pedidos para ${email}`);
            return;
        }

        renderizarPedidos(pedidos);

    } catch (error) {
        console.error('Error:', error);
        mostrarEstadoVacio('Error al cargar pedidos. Intenta de nuevo.');
    }
}

function renderizarPedidos(pedidos) {
    const container = document.getElementById('pedidosList');
    if (!container) return;

    container.innerHTML = pedidos.map(pedido => {
        const fecha = new Date(pedido.fecha_creacion);
        const fechaFormateada = fecha.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const productosHTML = pedido.productos.map(prod => `
            <div class="pedido-producto">
                <img src="${prod.imagen || 'https://via.placeholder.com/50?text=FP'}" 
                     alt="${prod.nombre}" 
                     onerror="this.src='https://via.placeholder.com/50?text=FP'">
                <div class="pedido-producto-info">
                    <div class="nombre">${prod.nombre}</div>
                    <div class="cantidad">Cant: ${prod.quantity || 1} x $${Number(prod.precio).toLocaleString('es-CO')}</div>
                </div>
                <div class="pedido-producto-precio">
                    $${Number((prod.precio || 0) * (prod.quantity || 1)).toLocaleString('es-CO')}
                </div>
            </div>
        `).join('');

        return `
            <div class="pedido-card">
                <div class="pedido-header">
                    <div class="pedido-info">
                        <h3>Orden #${pedido.numero_orden}</h3>
                        <span class="pedido-fecha">${fechaFormateada}</span>
                    </div>
                    <span class="pedido-estado estado-${pedido.estado}">
                        ${getEstadoLabel(pedido.estado)}
                    </span>
                </div>

                <div class="pedido-productos">
                    ${productosHTML}
                </div>

                <div class="pedido-footer">
                    <div class="pedido-total">
                        Total: <span>$${Number(pedido.total).toLocaleString('es-CO')}</span>
                    </div>
                    <a href="/pedido/${pedido.numero_orden}" class="btn-ver-detalle">
                        <i class="fas fa-eye"></i> Ver detalle
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

function getEstadoLabel(estado) {
    const labels = {
        'pendiente': 'Pendiente',
        'pagado': 'Pagado',
        'enviado': 'Enviado',
        'entregado': 'Entregado',
        'cancelado': 'Cancelado'
    };
    return labels[estado] || estado;
}

function mostrarEstadoVacio(mensaje) {
    const container = document.getElementById('pedidosList');
    if (!container) return;

    container.innerHTML = `
        <div class="pedidos-empty">
            <i class="fas fa-box-open"></i>
            <h3>${mensaje}</h3>
            <p>¿Listo para tu primera compra?</p>
            <a href="/productos" class="btn btn-primary" style="display: inline-block; padding: 12px 24px; background: var(--primary); color: white; text-decoration: none; border-radius: 50px; font-weight: 600;">
                <i class="fas fa-shopping-bag"></i> Ir a comprar
            </a>
        </div>
    `;
}

function mostrarToast(mensaje, tipo = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = mensaje;
    const icon = toast.querySelector('i');

    const colores = {
        success: '#00c853',
        error: '#d50000',
        warning: '#ff9100',
        info: '#1a237e'
    };

    if (icon) icon.style.color = colores[tipo] || colores.info;

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}