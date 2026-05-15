// ==========================================
// CHECKOUT.JS - Formulario de Pago
// Ferretería Pro
// ==========================================

// ===== CONFIGURACIÓN =====
const CONFIG = {
    ENVIO: {
        estandar: { precio: 15000, dias: '3-5 días hábiles', label: 'Envío Estándar' },
        express: { precio: 35000, dias: '1-2 días hábiles', label: 'Envío Express' },
        recogida: { precio: 0, dias: 'Disponible en 2 horas', label: 'Recoger en Tienda' }
    },
    RENDIMIENTOS: {
        acrilico: { cantidad: 0.4, unidad: 'Litros', precioPorUnidad: 25000, manos: '2-3' },
        membrana: { cantidad: 1.2, unidad: 'kg', precioPorUnidad: 18000, manos: '1-2' },
        poliuretano: { cantidad: 1.3, unidad: 'kg', precioPorUnidad: 35000, manos: '2' },
        asfaltico: { cantidad: 0.7, unidad: 'Litros', precioPorUnidad: 15000, manos: '2' },
        cementoso: { cantidad: 0.9, unidad: 'kg', precioPorUnidad: 12000, manos: '2' }
    },
    DESCUENTOS: {
        'FERRETERIA10': { tipo: 'porcentaje', valor: 10, descripcion: '10% de descuento' },
        'ENVIOFREE': { tipo: 'envio', valor: 0, descripcion: 'Envío gratis' },
        'BIENVENIDO20': { tipo: 'porcentaje', valor: 20, descripcion: '20% de descuento nuevo cliente' }
    }
};

// ===== ESTADO =====
let estadoCheckout = {
    cart: [],
    subtotal: 0,
    envio: 15000,
    descuento: 0,
    total: 0,
    metodoEnvio: 'estandar',
    codigoDescuentoAplicado: null,
    cuotas: 1
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarCheckout();
});

function inicializarCheckout() {
    // Cargar carrito desde storage
    estadoCheckout.cart = getStoredCart ? getStoredCart() : [];

    if (estadoCheckout.cart.length === 0) {
        // Redirigir si el carrito está vacío
        mostrarToast('Tu carrito está vacío', 'warning');
        setTimeout(() => {
            window.location.href = '/carrito';
        }, 2000);
        return;
    }

    // Calcular totales iniciales
    calcularTotales();

    // Renderizar resumen
    renderizarResumen();

    // Inicializar event listeners
    inicializarEventListeners();

    // Inicializar preview de tarjeta
    inicializarCardPreview();

    // Actualizar contador del carrito
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
}

// ===== EVENT LISTENERS =====
function inicializarEventListeners() {
    // Inputs del titular
    const nombreTitular = document.getElementById('nombreTitular');
    if (nombreTitular) {
        nombreTitular.addEventListener('input', function() {
            actualizarCardHolder(this.value);
            validarCampo(this, validarNombre);
        });
    }

    // Input de tarjeta
    const numeroTarjeta = document.getElementById('numeroTarjeta');
    if (numeroTarjeta) {
        numeroTarjeta.addEventListener('input', function(e) {
            const valorFormateado = formatearNumeroTarjeta(this.value);
            this.value = valorFormateado;
            actualizarCardNumber(valorFormateado);
            detectarMarcaTarjeta(valorFormateado);
            validarCampo(this, validarNumeroTarjeta);
        });
    }

    // Fecha de vencimiento
    const fechaVencimiento = document.getElementById('fechaVencimiento');
    if (fechaVencimiento) {
        fechaVencimiento.addEventListener('input', function(e) {
            const valorFormateado = formatearFechaVencimiento(this.value);
            this.value = valorFormateado;
            actualizarCardExpiry(valorFormateado);
            validarCampo(this, validarFechaVencimiento);
        });
    }

    // CVV
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 4);
            validarCampo(this, validarCVV);
        });
    }

    // Documento
    const numeroDocumento = document.getElementById('numeroDocumento');
    if (numeroDocumento) {
        numeroDocumento.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 20);
            validarCampo(this, validarDocumento);
        });
    }

    // Email
    const emailTitular = document.getElementById('emailTitular');
    if (emailTitular) {
        emailTitular.addEventListener('blur', function() {
            validarCampo(this, validarEmail);
        });
    }

    // Teléfono
    const telefonoTitular = document.getElementById('telefonoTitular');
    if (telefonoTitular) {
        telefonoTitular.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9\s]/g, '').substring(0, 15);
            validarCampo(this, validarTelefono);
        });
    }

    // Método de envío
    const metodosEnvio = document.querySelectorAll('input[name="metodoEnvio"]');
    metodosEnvio.forEach(radio => {
        radio.addEventListener('change', function() {
            cambiarMetodoEnvio(this.value);
        });
    });

    // Checkbox misma dirección
    const mismaDireccion = document.getElementById('mismaDireccion');
    if (mismaDireccion) {
        mismaDireccion.addEventListener('change', function() {
            toggleDireccionEnvio(!this.checked);
        });
    }

    // Cuotas
    const cuotas = document.getElementById('cuotas');
    if (cuotas) {
        cuotas.addEventListener('change', function() {
            estadoCheckout.cuotas = parseInt(this.value);
            actualizarBotonPago();
        });
    }

    // Botón CVV help
    const cvvHelpBtn = document.getElementById('cvvHelpBtn');
    if (cvvHelpBtn) {
        cvvHelpBtn.addEventListener('click', abrirModalCvv);
    }
}

// ===== CARD PREVIEW =====
function inicializarCardPreview() {
    // La tarjeta se inicializa con valores por defecto
    actualizarCardHolder('');
    actualizarCardNumber('');
    actualizarCardExpiry('');
}

function actualizarCardHolder(nombre) {
    const display = document.getElementById('cardHolderDisplay');
    if (display) {
        display.textContent = nombre.trim() || 'NOMBRE APELLIDO';
    }
}

function actualizarCardNumber(numero) {
    const display = document.getElementById('cardNumberDisplay');
    if (display) {
        const limpio = numero.replace(/\s/g, '');
        const enmascarado = limpio.padEnd(16, '*').replace(/(.{4})/g, '$1 ').trim();
        display.textContent = enmascarado || '**** **** **** ****';
    }
}

function actualizarCardExpiry(fecha) {
    const display = document.getElementById('cardExpiryDisplay');
    if (display) {
        display.textContent = fecha || 'MM/AA';
    }
}

function detectarMarcaTarjeta(numero) {
    const limpio = numero.replace(/\s/g, '');
    const visaIcon = document.getElementById('iconVisa');
    const mastercardIcon = document.getElementById('iconMastercard');
    const amexIcon = document.getElementById('iconAmex');
    const cardLogo = document.getElementById('cardLogo');

    // Reset
    [visaIcon, mastercardIcon, amexIcon].forEach(icon => {
        if (icon) icon.classList.remove('active');
    });

    let marca = null;
    let iconoClase = '';

    // Visa: empieza con 4
    if (/^4/.test(limpio)) {
        marca = 'visa';
        if (visaIcon) visaIcon.classList.add('active');
        iconoClase = 'fa-cc-visa';
    }
    // Mastercard: empieza con 51-55 o 2221-2720
    else if (/^(5[1-5]|2(2(2[1-9]|[3-9])|[3-6]|7[0-1]|720))/.test(limpio)) {
        marca = 'mastercard';
        if (mastercardIcon) mastercardIcon.classList.add('active');
        iconoClase = 'fa-cc-mastercard';
    }
    // Amex: empieza con 34 o 37
    else if (/^3[47]/.test(limpio)) {
        marca = 'amex';
        if (amexIcon) amexIcon.classList.add('active');
        iconoClase = 'fa-cc-amex';
    }

    // Actualizar logo principal de la tarjeta visual
    if (cardLogo && iconoClase) {
        cardLogo.innerHTML = `<i class="fab ${iconoClase}"></i>`;
    }

    return marca;
}

// ===== FORMATEO =====
function formatearNumeroTarjeta(valor) {
    const limpio = valor.replace(/\s/g, '').replace(/\D/g, '');
    const partes = limpio.match(/.{1,4}/g);
    return partes ? partes.join(' ').substring(0, 19) : '';
}

function formatearFechaVencimiento(valor) {
    const limpio = valor.replace(/\D/g, '');
    if (limpio.length >= 2) {
        return limpio.substring(0, 2) + '/' + limpio.substring(2, 4);
    }
    return limpio;
}

function formatearPrecio(precio) {
    return '$ ' + Number(precio).toLocaleString('es-CO');
}

// ===== VALIDACIÓN =====
function validarCampo(input, funcionValidacion) {
    const valor = input.value.trim();
    const errorElement = document.getElementById('error-' + input.id);
    const resultado = funcionValidacion(valor);

    if (!resultado.valido) {
        input.classList.add('error');
        if (errorElement) errorElement.textContent = resultado.mensaje;
        return false;
    } else {
        input.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
        return true;
    }
}

function validarNombre(valor) {
    if (!valor) return { valido: false, mensaje: 'El nombre es obligatorio' };
    if (valor.length < 3) return { valido: false, mensaje: 'Mínimo 3 caracteres' };
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return { valido: false, mensaje: 'Solo letras y espacios' };
    return { valido: true };
}

function validarNumeroTarjeta(valor) {
    const limpio = valor.replace(/\s/g, '');
    if (!limpio) return { valido: false, mensaje: 'El número de tarjeta es obligatorio' };
    if (limpio.length < 15) return { valido: false, mensaje: 'Número incompleto' };
    if (!validarLuhn(limpio)) return { valido: false, mensaje: 'Número de tarjeta inválido' };
    return { valido: true };
}

function validarLuhn(numero) {
    let sum = 0;
    let alternate = false;
    for (let i = numero.length - 1; i >= 0; i--) {
        let n = parseInt(numero.substring(i, i + 1), 10);
        if (alternate) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}

function validarFechaVencimiento(valor) {
    if (!valor || valor.length < 5) return { valido: false, mensaje: 'Fecha incompleta (MM/AA)' };

    const [mes, anio] = valor.split('/');
    const mesNum = parseInt(mes);
    const anioNum = parseInt(anio);

    if (mesNum < 1 || mesNum > 12) return { valido: false, mensaje: 'Mes inválido (01-12)' };

    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear() % 100;
    const mesActual = fechaActual.getMonth() + 1;

    if (anioNum < anioActual || (anioNum === anioActual && mesNum < mesActual)) {
        return { valido: false, mensaje: 'La tarjeta ha expirado' };
    }

    return { valido: true };
}

function validarCVV(valor) {
    if (!valor) return { valido: false, mensaje: 'El CVV es obligatorio' };
    if (!/^\d{3,4}$/.test(valor)) return { valido: false, mensaje: '3 o 4 dígitos numéricos' };
    return { valido: true };
}

function validarDocumento(valor) {
    if (!valor) return { valido: false, mensaje: 'El documento es obligatorio' };
    if (valor.length < 5) return { valido: false, mensaje: 'Mínimo 5 dígitos' };
    return { valido: true };
}

function validarEmail(valor) {
    if (!valor) return { valido: false, mensaje: 'El email es obligatorio' };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) return { valido: false, mensaje: 'Formato de email inválido' };
    return { valido: true };
}

function validarTelefono(valor) {
    if (!valor) return { valido: false, mensaje: 'El teléfono es obligatorio' };
    const limpio = valor.replace(/\s/g, '');
    if (limpio.length < 7) return { valido: false, mensaje: 'Mínimo 7 dígitos' };
    return { valido: true };
}

function validarDireccion() {
    const direccion = document.getElementById('direccion');
    if (!direccion || !direccion.value.trim()) {
        return { valido: false, mensaje: 'La dirección es obligatoria' };
    }
    return { valido: true };
}

function validarCiudad() {
    const ciudad = document.getElementById('ciudad');
    if (!ciudad || !ciudad.value.trim()) {
        return { valido: false, mensaje: 'La ciudad es obligatoria' };
    }
    return { valido: true };
}

function validarDepartamento() {
    const departamento = document.getElementById('departamento');
    if (!departamento || !departamento.value) {
        return { valido: false, mensaje: 'Selecciona un departamento' };
    }
    return { valido: true };
}

function validarFormularioCompleto() {
    const campos = [
        { id: 'nombreTitular', validador: validarNombre },
        { id: 'numeroDocumento', validador: validarDocumento },
        { id: 'emailTitular', validador: validarEmail },
        { id: 'telefonoTitular', validador: validarTelefono },
        { id: 'numeroTarjeta', validador: validarNumeroTarjeta },
        { id: 'fechaVencimiento', validador: validarFechaVencimiento },
        { id: 'cvv', validador: validarCVV }
    ];

    let valido = true;
    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        if (input && !validarCampo(input, campo.validador)) {
            valido = false;
        }
    });

    // Validar dirección si no está usando la misma
    const mismaDireccion = document.getElementById('mismaDireccion');
    if (!mismaDireccion || !mismaDireccion.checked) {
        const dirValida = validarDireccion();
        const ciudadValida = validarCiudad();
        const deptoValido = validarDepartamento();

        if (!dirValida.valido) {
            const errorDir = document.getElementById('error-direccion');
            if (errorDir) errorDir.textContent = dirValida.mensaje;
            valido = false;
        }
        if (!ciudadValida.valido) {
            const errorCiudad = document.getElementById('error-ciudad');
            if (errorCiudad) errorCiudad.textContent = ciudadValida.mensaje;
            valido = false;
        }
        if (!deptoValido.valido) {
            const errorDepto = document.getElementById('error-departamento');
            // Crear elemento si no existe
            valido = false;
        }
    }

    return valido;
}

// ===== CÁLCULO DE TOTALES =====
function calcularTotales() {
    estadoCheckout.subtotal = estadoCheckout.cart.reduce((sum, item) => {
        return sum + ((item.precio || 0) * (item.quantity || 1));
    }, 0);

    estadoCheckout.envio = CONFIG.ENVIO[estadoCheckout.metodoEnvio].precio;

    // Aplicar descuento
    let totalConDescuento = estadoCheckout.subtotal;
    if (estadoCheckout.descuento > 0) {
        if (estadoCheckout.codigoDescuentoAplicado && 
            CONFIG.DESCUENTOS[estadoCheckout.codigoDescuentoAplicado].tipo === 'porcentaje') {
            totalConDescuento = estadoCheckout.subtotal * (1 - estadoCheckout.descuento / 100);
        }
    }

    // Si el descuento es envío gratis
    if (estadoCheckout.codigoDescuentoAplicado && 
        CONFIG.DESCUENTOS[estadoCheckout.codigoDescuentoAplicado].tipo === 'envio') {
        estadoCheckout.envio = 0;
    }

    estadoCheckout.total = totalConDescuento + estadoCheckout.envio;

    actualizarBotonPago();
}

function actualizarBotonPago() {
    const btnPayAmount = document.getElementById('btnPayAmount');
    if (btnPayAmount) {
        btnPayAmount.textContent = formatearPrecio(estadoCheckout.total);
    }
}

function cambiarMetodoEnvio(metodo) {
    estadoCheckout.metodoEnvio = metodo;

    // Actualizar UI
    document.querySelectorAll('.shipping-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    const selectedOption = document.querySelector(`input[value="${metodo}"]`).closest('.shipping-option');
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }

    calcularTotales();
    renderizarResumen();
}

function toggleDireccionEnvio(mostrar) {
    const campos = document.getElementById('direccionEnvioFields');
    if (campos) {
        campos.style.display = mostrar ? 'block' : 'none';

        // Toggle required
        const inputs = campos.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.required = mostrar;
        });
    }
}

// ===== RENDERIZAR RESUMEN =====
function renderizarResumen() {
    const container = document.getElementById('summaryProducts');
    const subtotalEl = document.getElementById('summarySubtotal');
    const envioEl = document.getElementById('summaryEnvio');
    const descuentoEl = document.getElementById('summaryDescuento');
    const rowDescuento = document.getElementById('rowDescuento');
    const totalEl = document.getElementById('summaryTotal');

    // Renderizar productos
    if (container) {
        if (estadoCheckout.cart.length === 0) {
            container.innerHTML = '<p class="empty-cart-msg">No hay productos en el carrito</p>';
        } else {
            container.innerHTML = estadoCheckout.cart.map(item => `
                <div class="summary-product-item">
                    <img src="${item.imagen || 'https://via.placeholder.com/50'}" 
                         alt="${item.nombre}" 
                         class="summary-product-img"
                         onerror="this.src='https://via.placeholder.com/50?text=FP'">
                    <div class="summary-product-info">
                        <span class="summary-product-name">${item.nombre}</span>
                        <span class="summary-product-meta">Cant: ${item.quantity || 1} x ${formatearPrecio(item.precio || 0)}</span>
                    </div>
                    <span class="summary-product-price">${formatearPrecio((item.precio || 0) * (item.quantity || 1))}</span>
                </div>
            `).join('');
        }
    }

    // Actualizar totales
    if (subtotalEl) subtotalEl.textContent = formatearPrecio(estadoCheckout.subtotal);
    if (envioEl) {
        if (estadoCheckout.envio === 0) {
            envioEl.textContent = 'GRATIS';
            envioEl.style.color = 'var(--checkout-accent)';
        } else {
            envioEl.textContent = formatearPrecio(estadoCheckout.envio);
            envioEl.style.color = '';
        }
    }

    // Mostrar/ocultar descuento
    if (rowDescuento && descuentoEl) {
        if (estadoCheckout.descuento > 0) {
            rowDescuento.style.display = 'flex';
            const montoDescuento = estadoCheckout.subtotal * (estadoCheckout.descuento / 100);
            descuentoEl.textContent = '-' + formatearPrecio(montoDescuento);
        } else {
            rowDescuento.style.display = 'none';
        }
    }

    if (totalEl) totalEl.textContent = formatearPrecio(estadoCheckout.total);
}

// ===== CÓDIGO DE DESCUENTO =====
function aplicarDescuento() {
    const input = document.getElementById('codigoDescuento');
    const errorEl = document.getElementById('error-descuento');

    if (!input) return;

    const codigo = input.value.trim().toUpperCase();

    if (!codigo) {
        if (errorEl) errorEl.textContent = 'Ingresa un código';
        return;
    }

    const descuento = CONFIG.DESCUENTOS[codigo];

    if (!descuento) {
        if (errorEl) errorEl.textContent = 'Código inválido o expirado';
        mostrarToast('Código de descuento inválido', 'error');
        return;
    }

    // Aplicar descuento
    estadoCheckout.codigoDescuentoAplicado = codigo;
    estadoCheckout.descuento = descuento.valor;

    if (errorEl) errorEl.textContent = '';
    input.value = '';

    calcularTotales();
    renderizarResumen();

    mostrarToast(`${descuento.descripcion} aplicado`, 'success');
}

// ===== PROCESAR PAGO =====
function procesarPago() {
    // Validar formulario
    if (!validarFormularioCompleto()) {
        mostrarToast('Por favor corrige los errores del formulario', 'error');

        // Scroll al primer error
        const primerError = document.querySelector('.error');
        if (primerError) {
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            primerError.focus();
        }
        return;
    }

    // Mostrar modal de procesando
    abrirModal('modalProcesando');

    // Simular progreso
    const progressFill = document.getElementById('progressFill');
    let progreso = 0;

    const intervalo = setInterval(() => {
        progreso += Math.random() * 15 + 5;
        if (progreso > 100) progreso = 100;

        if (progressFill) {
            progressFill.style.width = progreso + '%';
        }

        if (progreso >= 100) {
            clearInterval(intervalo);
            setTimeout(() => {
                cerrarModal('modalProcesando');

                // Simular éxito (95% de probabilidad)
                if (Math.random() > 0.05) {
                    mostrarExito();
                } else {
                    mostrarError('La transacción fue rechazada por el banco emisor. Intenta con otra tarjeta.');
                }
            }, 500);
        }
    }, 300);
}

async function mostrarExito() {
    // 1. VERIFICAR STOCK PRIMERO (antes de cualquier otra cosa)
    const verificacionStock = verificarStockDisponible(estadoCheckout.cart);
    
    if (!verificacionStock.valido) {
        const nombresFaltantes = verificacionStock.faltantes.map(f => 
            `${f.nombre} (solicitado: ${f.solicitado}, disponible: ${f.disponible})`
        ).join(', ');
        
        mostrarError(`Stock insuficiente para: ${nombresFaltantes}. Por favor ajusta las cantidades.`);
        cerrarModal('modalProcesando');
        return;
    }
    
    // 2. ACTUALIZAR STOCK (restar productos comprados)
    const stockActualizado = actualizarStockProductos(estadoCheckout.cart);
    
    if (!stockActualizado) {
        console.warn('No se pudo actualizar el stock correctamente');
        // Podrías mostrar un warning al usuario o continuar igual
    }

    // 3. Recopilar datos del formulario
    const datosPago = {
        nombreTitular: document.getElementById('nombreTitular')?.value,
        tipoDocumento: document.getElementById('tipoDocumento')?.value,
        numeroDocumento: document.getElementById('numeroDocumento')?.value,
        emailTitular: document.getElementById('emailTitular')?.value,
        telefonoTitular: document.getElementById('telefonoTitular')?.value,
        direccion: document.getElementById('direccion')?.value || 'No especificada',
        ciudad: document.getElementById('ciudad')?.value || 'No especificada',
        departamento: document.getElementById('departamento')?.value || 'No especificado',
        barrio: document.getElementById('barrio')?.value,
        codigoPostal: document.getElementById('codigoPostal')?.value,
        instrucciones: document.getElementById('instrucciones')?.value,
        metodoPago: 'tarjeta',
        cuotas: estadoCheckout.cuotas,
        productos: estadoCheckout.cart,
        subtotal: estadoCheckout.subtotal,
        envio: estadoCheckout.envio,
        descuento: estadoCheckout.descuento,
        total: estadoCheckout.total,
        metodoEnvio: estadoCheckout.metodoEnvio
    };

    // Guardar email para pedidos futuros
    if (datosPago.emailTitular) {
        localStorage.setItem('ultimo_email_pedido', datosPago.emailTitular);
    }

    // 4. Enviar a backend
    try {
        const response = await fetch('/api/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosPago)
        });
        
        const resultado = await response.json();
        
        if (!resultado.success) {
            // Si falla el backend, RESTAURAR el stock
            restaurarStockProductos(estadoCheckout.cart);
            throw new Error(resultado.error || 'Error al crear pedido');
        }
        
        // Mostrar modal con número real de orden
        const modal = document.getElementById('modalExito');
        const orderNumber = document.getElementById('orderNumber');
        const orderTotal = document.getElementById('orderTotal');
        
        if (orderNumber) orderNumber.textContent = resultado.numero_orden;
        if (orderTotal) orderTotal.textContent = formatearPrecio(estadoCheckout.total);
        
        abrirModal('modalExito');
        
        // Vaciar carrito
        if (typeof saveCart === 'function') saveCart([]);
        if (typeof updateCartCount === 'function') updateCartCount();
        
    } catch (error) {
        console.error('Error:', error);
        // Si falla el backend, asegurar que el stock se restaure
        restaurarStockProductos(estadoCheckout.cart);
        mostrarError('Hubo un problema al registrar tu pedido. Contacta soporte.');
    }
}   

function mostrarError(mensaje) {
    const modal = document.getElementById('modalError');
    const mensajeEl = document.getElementById('errorPagoMensaje');

    if (mensajeEl) mensajeEl.textContent = mensaje || 'No se pudo procesar la transacción. Verifica los datos de tu tarjeta.';

    abrirModal('modalError');
}

function cerrarModalError() {
    cerrarModal('modalError');
}

// ===== MODALES =====
function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Modal CVV
function abrirModalCvv() {
    abrirModal('modalCvv');
}

function cerrarModalCvv() {
    cerrarModal('modalCvv');
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        // Solo cerrar modales que no sean procesando o éxito
        if (e.target.id !== 'modalProcesando' && e.target.id !== 'modalExito') {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Cerrar con ESC
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            if (modal.id !== 'modalProcesando' && modal.id !== 'modalExito') {
                modal.classList.remove('active');
            }
        });
        document.body.style.overflow = '';
    }
});

// ===== TOAST =====
function mostrarToast(mensaje, tipo = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast || !toastMessage) return;

    const iconos = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const colores = {
        success: 'var(--checkout-accent)',
        error: 'var(--checkout-danger)',
        warning: 'var(--checkout-warning)',
        info: 'var(--checkout-primary)'
    };

    toastMessage.textContent = mensaje;
    const icon = toast.querySelector('i');
    if (icon) {
        icon.className = 'fas ' + (iconos[tipo] || iconos.success);
        icon.style.color = colores[tipo] || colores.success;
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== FUNCIONES AUXILIARES DEL CARRITO (fallback) =====
if (typeof getStoredCart !== 'function') {
    window.getStoredCart = function() {
        try {
            return JSON.parse(localStorage.getItem('ferreteria_cart')) || [];
        } catch (e) {
            return [];
        }
    };
}

if (typeof saveCart !== 'function') {
    window.saveCart = function(cart) {
        localStorage.setItem('ferreteria_cart', JSON.stringify(cart));
    };
}

if (typeof getCartTotal !== 'function') {
    window.getCartTotal = function(cart) {
        return (cart || []).reduce((sum, item) => sum + ((item.precio || 0) * (item.quantity || 1)), 0);
    };
}

if (typeof updateCartCount !== 'function') {
    window.updateCartCount = function() {
        const cart = getStoredCart();
        const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const badge = document.getElementById('cartCount');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    };
}

// Exponer funciones globales necesarias para los onclick inline
window.procesarPago = procesarPago;
window.aplicarDescuento = aplicarDescuento;
window.cerrarModalError = cerrarModalError;
window.abrirModalCvv = abrirModalCvv;
window.cerrarModalCvv = cerrarModalCvv;
window.cambiarMetodoEnvio = cambiarMetodoEnvio;