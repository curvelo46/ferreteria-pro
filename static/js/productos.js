    // ==========================================
    // PRODUCTOS.JS - Página de catálogo con filtros y variantes
    // ==========================================

    let currentFilters = {
        categoria: null,
        subcategoria: null,
        tipo: null,
        marca: null,
        precio_min: null,
        precio_max: null,
        q: null,
        orden: 'nombre_asc'
    };

    // Estado temporal para variantes seleccionadas antes de agregar al carrito
    let selectedVariants = {};

    let wishlistSelectedVariants = {};

    document.addEventListener('DOMContentLoaded', function() {
        loadInitialData();
        checkUrlParams();
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                currentFilters.q = e.target.value || null;
                if (e.target.value.length > 2 || e.target.value.length === 0) {
                    applyFilters();
                }
            });
        }
    });

    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const marcaParam = urlParams.get('marca');
        if (marcaParam) {
            currentFilters.marca = marcaParam;
            const checkbox = document.getElementById(`brand-${marcaParam}`);
            if (checkbox) checkbox.checked = true;
        }
        
        const categoriaParam = urlParams.get('categoria');
        if (categoriaParam) {
            currentFilters.categoria = categoriaParam;
            const checkbox = document.getElementById(`cat-${categoriaParam}`);
            if (checkbox) checkbox.checked = true;
            renderSubcategoryFilters();
        }
        
        const subcategoriaParam = urlParams.get('subcategoria');
        if (subcategoriaParam) {
            currentFilters.subcategoria = subcategoriaParam;
        }
        
        const tipoParam = urlParams.get('tipo');
        if (tipoParam) {
            currentFilters.tipo = tipoParam;
            document.querySelectorAll('.type-badge').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.type === tipoParam);
            });
        }
        
        const qParam = urlParams.get('q');
        if (qParam) {
            currentFilters.q = qParam;
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = qParam;
        }
        
        if (categoriaParam || subcategoriaParam || tipoParam || marcaParam || qParam) {
            applyFilters();
            updateActiveFilters();
        }
    }


    function addToWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Si es variable, abrir modal para seleccionar variantes
    if (product.tipo === 'variable' && product.atributos) {
        openWishlistVariantModal(product);
        return;
    }

    // Si no es variable, agregar directamente
    addToWishlistDirect(product);
}



    function applyFilters() {
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        const sortValue = document.getElementById('sortSelect');

        currentFilters.precio_min = priceMin && priceMin.value ? priceMin.value : null;
        currentFilters.precio_max = priceMax && priceMax.value ? priceMax.value : null;
        currentFilters.orden = sortValue && sortValue.value ? sortValue.value : 'nombre_asc';

        allProducts = filterProducts(currentFilters);
        renderProducts();
        updateResultsCount();
        updateActiveFilters();
    }

    // ==========================================
    // RENDERIZADO DE PRODUCTOS CON VARIANTES
    // ==========================================

   function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (allProducts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 15px;"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o realizar una nueva búsqueda</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = allProducts.map(product => {
        return `
            <div class="product-card" data-id="${product.id}" data-slug="${product.slug}">
                ${getBadge(product.tipo)}
                <div class="product-image">
                    <img src="${product.imagen}" alt="${product.nombre}" loading="lazy"
                        onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.nombre)}'">
                    <div class="product-actions">
                        <button class="action-btn" onclick="openDetailModal(${product.id})" title="Ver detalle">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="addToWishlist(${product.id})" title="Favoritos">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">
                        <i class="fas fa-tag" style="color: ${product.categoria_color || '#666'}"></i>
                        ${product.categoria_nombre || 'General'} / ${product.subcategoria_nombre || 'General'}
                    </div>
                    <h3 class="product-title">${product.nombre}</h3>
                    <div class="product-meta">
                        <span class="product-brand">
                            <i class="fas fa-certificate"></i> ${product.marca_nombre || 'Genérica'}
                        </span>
                        <span class="product-stock ${getStockClass(product.stock, product.tipo)}">
                            <i class="fas fa-box"></i> ${getStockText(product.stock, product.tipo)}
                        </span>
                    </div>
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="price-current">${formatPrice(product.precio)}</span>
                            ${product.precio_oferta ? `<span class="price-old">${formatPrice(product.precio_oferta)}</span>` : ''}
                        </div>
                        <button class="btn-add-cart" onclick="openDetailModal(${product.id})" title="Ver opciones">
                            <i class="fas fa-shopping">
                                ::before
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

    // ==========================================
    // SELECTORES DE VARIANTES (SOLO PRODUCTOS VARIABLES)
    // ==========================================

    function renderVariantSelectors(product) {
        if (!product.atributos) return '';
        
        let html = '<div class="variant-selectors" style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 8px;">';
        
        for (const [attrName, attrValues] of Object.entries(product.atributos)) {
            const selectId = `variant-${product.id}-${attrName}`;
            html += `
                <div class="variant-group" style="margin-bottom: 8px;">
                    <label style="display: block; font-size: 0.8rem; font-weight: 600; color: #555; margin-bottom: 4px; text-transform: capitalize;">
                        ${attrName}:
                    </label>
                    <select id="${selectId}" 
                            onchange="updateVariantSelection(${product.id}, '${attrName}', this.value)"
                            style="width: 100%; padding: 6px 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.85rem; background: white;">
                        <option value="">Seleccionar ${attrName}...</option>
                        ${attrValues.map(val => `<option value="${val}">${val}</option>`).join('')}
                    </select>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }

    function updateVariantSelection(productId, attrName, value) {
        if (!selectedVariants[productId]) {
            selectedVariants[productId] = {};
        }
        if (value) {
            selectedVariants[productId][attrName] = value;
        } else {
            delete selectedVariants[productId][attrName];
        }
    }

    // ==========================================
    // AGREGAR AL CARRITO CON VARIANTES
    // ==========================================

   // ==========================================
// AGREGAR AL CARRITO (ACTUALIZADO - abre modal si no hay variantes seleccionadas)
// ==========================================

function handleAddToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Si es variable, verificar que todas las variantes estén seleccionadas
    if (product.tipo === 'variable') {
        const requiredAttrs = Object.keys(product.atributos || {});
        const selected = selectedVariants[productId] || {};
        const missing = requiredAttrs.filter(attr => !selected[attr]);
        
        // Si faltan variantes por seleccionar, abrir modal de detalle
        if (missing.length > 0) {
            openDetailModal(productId);
            showToast(`Selecciona las opciones de ${product.nombre} en el detalle`, 'info');
            return;
        }
    }

    // Resto de la lógica permanece igual...
    const cart = getStoredCart();
    const variantKey = product.tipo === 'variable' 
        ? `${productId}-${JSON.stringify(selectedVariants[productId] || {})}`
        : `${productId}`;
    
    const existingItem = cart.find(item => item.variantKey === variantKey);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        const cartItem = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen,
            descripcion: product.descripcion,
            categoria_nombre: product.categoria_nombre,
            tipo: product.tipo,
            quantity: 1,
            variantKey: variantKey
        };

        if (product.tipo === 'variable' && selectedVariants[productId]) {
            cartItem.variantes = { ...selectedVariants[productId] };
            const variantText = Object.entries(selectedVariants[productId])
                .map(([k, v]) => `${k}: ${v}`).join(', ');
            cartItem.nombre = `${product.nombre} (${variantText})`;
        }

        cart.push(cartItem);
    }

    saveCart(cart);
    updateCartCount();
    showToast(`${cartItem?.nombre || product.nombre} agregado al carrito`);
    
    // Limpiar selección después de agregar
    if (product.tipo === 'variable') {
        delete selectedVariants[productId];
    }
}

    // ==========================================
    // MODAL DE DETALLE DEL PRODUCTO
    // ==========================================

    function openDetailModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Crear modal si no existe
    let modal = document.getElementById('productDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'productDetailModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #eee;">
                    <h2 id="modalTitle">Detalle del Producto</h2>
                    <button onclick="closeDetailModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="modalBody" style="padding: 20px;">
                    <!-- Contenido dinámico -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeDetailModal();
        });
    }

    const isVariable = product.tipo === 'variable';
    const variantSelectors = isVariable ? renderModalVariantSelectors(product) : '';
    
    // Guardar el producto actual en el modal para referencia
    modal.dataset.currentProductId = productId;
    
    // Limpiar variantes previas al abrir
    modalSelectedVariants = {};
    if (product.tipo === 'variable') {
        modalSelectedVariants[productId] = {};
    }

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
                <img id="modal-product-img-${productId}" 
                     src="${product.imagen}" 
                     alt="${product.nombre}" 
                     data-default-image="${product.imagen}"
                     style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; transition: opacity 0.3s ease;"
                     onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.nombre)}'">
                ${product.tags ? `
                    <div style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 8px;">
                        ${product.tags.map(tag => `<span style="background: #f0f0f0; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; color: #666;">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
            <div>
                <div style="margin-bottom: 10px;">
                    <span style="background: ${product.categoria_color || '#666'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem;">
                        ${product.categoria_nombre || 'General'}
                    </span>
                    <span style="background: #f0f0f0; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; margin-left: 8px;">
                        ${product.subcategoria_nombre || 'General'}
                    </span>
                </div>
                
                <h2 style="margin: 0 0 10px 0; font-size: 1.5rem;">${product.nombre}</h2>
                <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">${product.descripcion || 'Sin descripción disponible.'}</p>
                
                <div style="margin-bottom: 20px;">
                    <span style="font-size: 1.8rem; font-weight: 700; color: #e74c3c;">
                        ${formatPrice(product.precio)}
                    </span>
                    ${product.precio_oferta ? `
                        <span style="text-decoration: line-through; color: #999; margin-left: 10px; font-size: 1.2rem;">
                            ${formatPrice(product.precio_oferta)}
                        </span>
                    ` : ''}
                </div>
                
                <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #666;">Marca:</span>
                        <strong>${product.marca_nombre || 'Genérica'}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #666;">Stock:</span>
                        <strong class="${getStockClass(product.stock, product.tipo)}">${getStockText(product.stock, product.tipo)}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #666;">Tipo:</span>
                        <strong>${product.tipo === 'variable' ? 'Producto Variable' : product.tipo === 'digital' ? 'Producto Digital' : 'Producto Simple'}</strong>
                    </div>
                </div>
                
                ${isVariable ? `
                    <div style="margin-bottom: 20px;">
                        <h4 style="margin-bottom: 10px;">Selecciona tus opciones:</h4>
                        ${variantSelectors}
                    </div>
                ` : ''}
                
                <button onclick="addToCartFromModal(${product.id})" 
                        style="width: 100%; padding: 15px; background: #e74c3c; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        </div>
        
        ${product.atributos && !isVariable ? `
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <h3 style="margin-bottom: 15px;">Especificaciones</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    ${Object.entries(product.atributos).map(([key, values]) => `
                        <div style="padding: 10px; background: #f8f9fa; border-radius: 8px;">
                            <strong style="display: block; margin-bottom: 5px; text-transform: capitalize;">${key}:</strong>
                            <span style="color: #666;">${Array.isArray(values) ? values.join(', ') : values}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderModalVariantSelectors(product) {
    if (!product.atributos) return '';
    
    let html = '<div class="modal-variant-selectors">';
    
    for (const [attrName, attrValues] of Object.entries(product.atributos)) {
        const selectId = `modal-variant-${product.id}-${attrName}`;
        html += `
            <div style="margin-bottom: 12px;">
                <label style="display: block; font-weight: 600; margin-bottom: 6px; text-transform: capitalize;">
                    ${attrName} <span style="color: #e74c3c;">*</span>
                </label>
                <select id="${selectId}" 
                        onchange="updateModalVariantSelection(${product.id}, '${attrName}', this.value); updateModalImage(${product.id})"
                        style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.9rem;">
                    <option value="">Seleccionar ${attrName}...</option>
                    ${attrValues.map(val => `<option value="${val}">${val}</option>`).join('')}
                </select>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

    // Estado para variantes seleccionadas en el modal
    let modalSelectedVariants = {};

    function updateModalVariantSelection(productId, attrName, value) {
        if (!modalSelectedVariants[productId]) {
            modalSelectedVariants[productId] = {};
        }
        if (value) {
            modalSelectedVariants[productId][attrName] = value;
        } else {
            delete modalSelectedVariants[productId][attrName];
        }
    }

function addToCartFromModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    if (product.tipo === 'variable') {
        const requiredAttrs = Object.keys(product.atributos || {});
        const selected = modalSelectedVariants[productId] || {};
        const missing = requiredAttrs.filter(attr => !selected[attr]);
        
        if (missing.length > 0) {
            showToast(`Por favor selecciona: ${missing.join(', ')}`, 'warning');
            missing.forEach(attr => {
                const select = document.getElementById(`modal-variant-${productId}-${attr}`);
                if (select) {
                    select.style.border = '2px solid #e74c3c';
                    setTimeout(() => select.style.border = '1px solid #ddd', 2000);
                }
            });
            return;
        }

        // Transferir variantes del modal al estado global temporal
        selectedVariants[productId] = { ...modalSelectedVariants[productId] };
    }

    handleAddToCart(productId);
    closeDetailModal();
    
    // Limpieza completa
    delete modalSelectedVariants[productId];
    delete selectedVariants[productId];
}

function closeDetailModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Limpiar variantes seleccionadas
        const productId = modal.dataset.currentProductId;
        if (productId) {
            delete modalSelectedVariants[productId];
            delete selectedVariants[productId];
        }
        modal.dataset.currentProductId = '';
    }
}

// También limpiar al cerrar con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDetailModal();
    }
});

    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetailModal();
        }
    });

    // ==========================================
    // FUNCIONES ORIGINALES (mantenidas)
    // ==========================================

    function renderCategoryFilters() {
        const container = document.getElementById('categoryFilters');
        if (!container) return;

        container.innerHTML = allCategories.map(cat => `
            <div class="checkbox-item" onclick="toggleCategoryFilter('${cat.slug}')">
                <input type="checkbox" id="cat-${cat.slug}" 
                    ${currentFilters.categoria === cat.slug ? 'checked' : ''}
                    onchange="toggleCategoryFilter('${cat.slug}')">
                <label for="cat-${cat.slug}">
                    <span>${cat.icono} ${cat.nombre}</span>
                    <span class="count">${cat.total_productos}</span>
                </label>
            </div>
        `).join('');
    }

    function renderSubcategoryFilters() {
        const section = document.getElementById('subcategorySection');
        const container = document.getElementById('subcategoryFilters');
        if (!section || !container) return;

        if (!currentFilters.categoria) {
            section.style.display = 'none';
            return;
        }

        const category = allCategories.find(c => c.slug === currentFilters.categoria);
        if (!category || !category.subcategorias || category.subcategorias.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        container.innerHTML = category.subcategorias.map(sub => `
            <div class="checkbox-item" onclick="toggleSubcategoryFilter('${sub.slug}')">
                <input type="checkbox" id="sub-${sub.slug}"
                    ${currentFilters.subcategoria === sub.slug ? 'checked' : ''}
                    onchange="toggleSubcategoryFilter('${sub.slug}')">
                <label for="sub-${sub.slug}">
                    <span>${sub.icono || '•'} ${sub.nombre}</span>
                </label>
            </div>
        `).join('');
    }

    function renderBrandFilters() {
        const container = document.getElementById('brandFilters');
        if (!container) return;
        
        const marcasMap = new Map();
        products.forEach(p => {
            if (p.marca_nombre) {
                const slug = p.marca_nombre;
                if (!marcasMap.has(slug)) {
                    marcasMap.set(slug, {
                        nombre: p.marca_nombre,
                        slug: slug,
                        count: 0
                    });
                }
                marcasMap.get(slug).count++;
            }
        });

        const marcas = Array.from(marcasMap.values()).sort((a, b) => a.nombre.localeCompare(b.nombre));

        container.innerHTML = marcas.map(brand => `
            <div class="checkbox-item" onclick="toggleBrandFilter('${brand.slug}')">
                <input type="checkbox" id="brand-${brand.slug}"
                    ${currentFilters.marca === brand.slug ? 'checked' : ''}
                    onchange="toggleBrandFilter('${brand.slug}')">
                <label for="brand-${brand.slug}">
                    <span>${brand.nombre}</span>
                    <span class="count">${brand.count}</span>
                </label>
            </div>
        `).join('');
    }

    function toggleCategoryFilter(slug) {
        currentFilters.categoria = currentFilters.categoria === slug ? null : slug;
        currentFilters.subcategoria = null;
        renderCategoryFilters();
        renderSubcategoryFilters();
        applyFilters();
    }

    function toggleSubcategoryFilter(slug) {
        currentFilters.subcategoria = currentFilters.subcategoria === slug ? null : slug;
        renderSubcategoryFilters();
        applyFilters();
    }

    function toggleTypeFilter(type) {
        currentFilters.tipo = currentFilters.tipo === type ? null : type;
        document.querySelectorAll('.type-badge').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === currentFilters.tipo);
        });
        applyFilters();
    }

    function toggleBrandFilter(slug) {
        currentFilters.marca = currentFilters.marca === slug ? null : slug;
        renderBrandFilters();
        applyFilters();
    }

    function updatePriceMax(value) {
        const priceMax = document.getElementById('priceMax');
        const priceMaxLabel = document.getElementById('priceMaxLabel');
        if (priceMax) priceMax.value = value;
        if (priceMaxLabel) priceMaxLabel.textContent = '$' + parseInt(value).toLocaleString('es-CO');
    }

    function clearAllFilters() {
        currentFilters = {
            categoria: null,
            subcategoria: null,
            tipo: null,
            marca: null,
            precio_min: null,
            precio_max: null,
            q: null,
            orden: 'nombre_asc'
        };

        const searchInput = document.getElementById('searchInput');
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        const priceRange = document.getElementById('priceRange');
        const priceMaxLabel = document.getElementById('priceMaxLabel');
        const sortSelect = document.getElementById('sortSelect');

        if (searchInput) searchInput.value = '';
        if (priceMin) priceMin.value = '';
        if (priceMax) priceMax.value = '';
        if (priceRange) priceRange.value = 300000;
        if (priceMaxLabel) priceMaxLabel.textContent = '$300,000';
        if (sortSelect) sortSelect.value = 'nombre_asc';

        document.querySelectorAll('.type-badge').forEach(btn => btn.classList.remove('active'));

        renderCategoryFilters();
        renderSubcategoryFilters();
        renderBrandFilters();
        applyFilters();
    }

    function updateActiveFilters() {
        const container = document.getElementById('activeFilters');
        const section = document.getElementById('activeFiltersSection');
        if (!container || !section) return;

        const filters = [];

        if (currentFilters.categoria) {
            const cat = allCategories.find(c => c.slug === currentFilters.categoria);
            filters.push({ type: 'categoria', label: cat ? cat.nombre : currentFilters.categoria, value: currentFilters.categoria });
        }
        if (currentFilters.subcategoria) {
            filters.push({ type: 'subcategoria', label: 'Sub: ' + currentFilters.subcategoria, value: currentFilters.subcategoria });
        }
        if (currentFilters.tipo) {
            const typeLabels = { simple: 'Simple', variable: 'Variable', digital: 'Digital' };
            filters.push({ type: 'tipo', label: typeLabels[currentFilters.tipo], value: currentFilters.tipo });
        }
        if (currentFilters.marca) {
            const brand = allBrands.find(b => b.slug === currentFilters.marca);
            filters.push({ type: 'marca', label: brand ? brand.nombre : currentFilters.marca, value: currentFilters.marca });
        }
        if (currentFilters.precio_min || currentFilters.precio_max) {
            const min = currentFilters.precio_min ? '$' + parseInt(currentFilters.precio_min).toLocaleString('es-CO') : '$0';
            const max = currentFilters.precio_max ? '$' + parseInt(currentFilters.precio_max).toLocaleString('es-CO') : '∞';
            filters.push({ type: 'precio', label: `${min} - ${max}`, value: 'precio' });
        }
        if (currentFilters.q) {
            filters.push({ type: 'q', label: `Buscar: "${currentFilters.q}"`, value: currentFilters.q });
        }

        if (filters.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        container.innerHTML = filters.map(f => `
            <span class="filter-tag">
                ${f.label}
                <button onclick="removeFilter('${f.type}', '${f.value}')">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
    }

    function removeFilter(type, value) {
        switch(type) {
            case 'categoria': currentFilters.categoria = null; currentFilters.subcategoria = null; break;
            case 'subcategoria': currentFilters.subcategoria = null; break;
            case 'tipo': currentFilters.tipo = null; break;
            case 'marca': currentFilters.marca = null; break;
            case 'precio': 
                currentFilters.precio_min = null; 
                currentFilters.precio_max = null; 
                const priceMin = document.getElementById('priceMin');
                const priceMax = document.getElementById('priceMax');
                const priceRange = document.getElementById('priceRange');
                if (priceMin) priceMin.value = '';
                if (priceMax) priceMax.value = '';
                if (priceRange) priceRange.value = 300000;
                break;
            case 'q': 
                currentFilters.q = null; 
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.value = ''; 
                break;
        }

        renderCategoryFilters();
        renderSubcategoryFilters();
        renderBrandFilters();
        document.querySelectorAll('.type-badge').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === currentFilters.tipo);
        });

        applyFilters();
    }

    function updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = allProducts.length;
        }
    }

    function setView(view) {
        const grid = document.getElementById('productsGrid');
        const buttons = document.querySelectorAll('.view-btn');
        if (!grid) return;

        buttons.forEach(btn => btn.classList.remove('active'));
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }

        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar) sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('open');
    }

    // ==========================================
    // FUNCIONES DE CARRITO (actualizadas para variantes)
    // ==========================================

    function addToCart(productId) {
        // Esta función ahora redirige a handleAddToCart que maneja variantes
        handleAddToCart(productId);
    }


    function addToWishlistDirect(product, variantes = null) {
    const wishlist = getStoredWishlist();
    const variantKey = variantes 
        ? `${product.id}-${JSON.stringify(variantes)}`
        : `${product.id}`;

    // Verificar si ya existe
    const exists = wishlist.some(item => item.variantKey === variantKey);
    if (exists) {
        showToast('Este producto ya está en favoritos', 'warning');
        return;
    }

    const wishlistItem = {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        descripcion: product.descripcion,
        categoria_nombre: product.categoria_nombre,
        tipo: product.tipo,
        variantKey: variantKey,
        addedAt: new Date().toISOString()
    };

    // Agregar variantes si existen
    if (variantes) {
        wishlistItem.variantes = { ...variantes };
        const variantText = Object.entries(variantes)
            .map(([k, v]) => `${k}: ${v}`).join(', ');
        wishlistItem.nombre = `${product.nombre} (${variantText})`;
    }

    wishlist.push(wishlistItem);
    saveWishlist(wishlist);
    updateWishlistCount();
    showToast(`${wishlistItem.nombre} agregado a favoritos`);
}





    function quickView(slug) {
        // Ahora usamos openDetailModal en lugar de redirigir
        const product = products.find(p => p.slug === slug);
        if (product) {
            openDetailModal(product.id);
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

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.className = 'toast show ' + type;
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }

    function loadInitialData() {
        allCategories = categories;
        allBrands = brands;

        renderCategoryFilters();
        renderBrandFilters();
        checkUrlParams();
        applyFilters();
        updateCartCount();
        updateWishlistCount(); // NUEVO
    }


function openWishlistVariantModal(product) {
    // Crear modal si no existe
    let modal = document.getElementById('wishlistVariantModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'wishlistVariantModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #eee;">
                    <h2 id="wishlistModalTitle">Seleccionar Variantes</h2>
                    <button onclick="closeWishlistVariantModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="wishlistModalBody" style="padding: 20px;">
                    <!-- Contenido dinámico -->
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid #eee; display: flex; gap: 10px;">
                    <button onclick="closeWishlistVariantModal()" 
                            style="flex: 1; padding: 12px; background: #f0f0f0; color: #333; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Cancelar
                    </button>
                    <button id="wishlistConfirmBtn" 
                            style="flex: 1; padding: 12px; background: #e74c3c; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeWishlistVariantModal();
        });
    }

    // Generar selectores de variantes
    let selectorsHtml = '<div class="wishlist-variant-selectors">';
    
    for (const [attrName, attrValues] of Object.entries(product.atributos)) {
        const selectId = `wishlist-variant-${product.id}-${attrName}`;
        selectorsHtml += `
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: 600; margin-bottom: 8px; text-transform: capitalize; color: #333;">
                    ${attrName} <span style="color: #e74c3c;">*</span>
                </label>
                <select id="${selectId}" 
                        onchange="updateWishlistVariantSelection(${product.id}, '${attrName}', this.value)"
                        style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 0.95rem; background: white; transition: border-color 0.2s;">
                    <option value="">Seleccionar ${attrName}...</option>
                    ${attrValues.map(val => `<option value="${val}">${val}</option>`).join('')}
                </select>
            </div>
        `;
    }
    selectorsHtml += '</div>';

    // Info del producto en el modal
    const modalBody = document.getElementById('wishlistModalBody');
    modalBody.innerHTML = `
        <div style="display: flex; gap: 15px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
            <img src="${product.imagen}" alt="${product.nombre}" 
                 style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;"
                 onerror="this.src='https://via.placeholder.com/80x80?text=${encodeURIComponent(product.nombre)}'">
            <div>
                <h3 style="margin: 0 0 5px 0; font-size: 1.1rem;">${product.nombre}</h3>
                <p style="margin: 0; color: #e74c3c; font-weight: 700; font-size: 1.2rem;">
                    ${formatPrice(product.precio)}
                </p>
                <span style="background: ${product.categoria_color || '#666'}; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.75rem; margin-top: 5px; display: inline-block;">
                    ${product.categoria_nombre || 'General'}
                </span>
            </div>
        </div>
        
        <div style="margin-bottom: 15px;">
            <p style="color: #666; font-size: 0.9rem; margin: 0;">
                <i class="fas fa-info-circle" style="color: #3498db;"></i> 
                Selecciona las opciones para agregar este producto al carrito.
            </p>
        </div>
        
        ${selectorsHtml}
    `;

    // Configurar botón de confirmar con las variantes seleccionadas
    const confirmBtn = document.getElementById('wishlistConfirmBtn');
    confirmBtn.onclick = function() {
        addToCartFromWishlistModal(product.id);
    };

    // Limpiar estado previo
    wishlistSelectedVariants[product.id] = {};
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}


function addToCartFromWishlistModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Verificar que todas las variantes estén seleccionadas
    if (product.tipo === 'variable') {
        const requiredAttrs = Object.keys(product.atributos || {});
        const selected = wishlistSelectedVariants[productId] || {};
        const missing = requiredAttrs.filter(attr => !selected[attr]);
        
        if (missing.length > 0) {
            showToast(`Por favor selecciona: ${missing.join(', ')}`, 'warning');
            missing.forEach(attr => {
                const select = document.getElementById(`wishlist-variant-${productId}-${attr}`);
                if (select) {
                    select.style.border = '2px solid #e74c3c';
                    select.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        select.style.border = '2px solid #ddd';
                        select.style.animation = '';
                    }, 2000);
                }
            });
            return;
        }


        handleAddToCart(productId);
    closeWishlistVariantModal();
    
    // 🆕 LIMPIAR TODO
    delete wishlistSelectedVariants[productId];
    delete selectedVariants[productId];
    currentWishlistModalProductId = null;

        // Copiar variantes del modal de favoritos al estado global temporalmente
        selectedVariants[productId] = { ...wishlistSelectedVariants[productId] };
    }

    // Usar handleAddToCart que ya maneja el carrito correctamente
    handleAddToCart(productId);
    
    closeWishlistVariantModal();
    
    // Limpiar estado del modal de favoritos
    delete wishlistSelectedVariants[productId];
}



function updateWishlistVariantSelection(productId, attrName, value) {
    if (!wishlistSelectedVariants[productId]) {
        wishlistSelectedVariants[productId] = {};
    }
    if (value) {
        wishlistSelectedVariants[productId][attrName] = value;
    } else {
        delete wishlistSelectedVariants[productId][attrName];
    }
}

function confirmWishlistVariantSelection(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const requiredAttrs = Object.keys(product.atributos || {});
    const selected = wishlistSelectedVariants[productId] || {};
    const missing = requiredAttrs.filter(attr => !selected[attr]);

    if (missing.length > 0) {
        showToast(`Por favor selecciona: ${missing.join(', ')}`, 'warning');
        // Resaltar selects faltantes
        missing.forEach(attr => {
            const select = document.getElementById(`wishlist-variant-${productId}-${attr}`);
            if (select) {
                select.style.border = '2px solid #e74c3c';
                select.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    select.style.border = '2px solid #ddd';
                    select.style.animation = '';
                }, 2000);
            }
        });
        return;
    }

    // Agregar a favoritos con las variantes seleccionadas
    addToWishlistDirect(product, { ...wishlistSelectedVariants[productId] });
    
    closeWishlistVariantModal();
    delete wishlistSelectedVariants[productId];
}

function closeWishlistVariantModal() {
    const modal = document.getElementById('wishlistVariantModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}


function updateModalImage(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const imgElement = document.getElementById(`modal-product-img-${productId}`);
    if (!imgElement) return;
    
    const selected = modalSelectedVariants[productId] || {};
    
    // Estrategia 1: Buscar en imagenes_variantes (clave combinada de todas las variantes)
    if (product.imagenes_variantes) {
        // Ordenar atributos alfabéticamente para consistencia en la clave
        const variantKeys = Object.keys(product.atributos).sort();
        const selectedKey = variantKeys
            .map(attr => selected[attr])
            .filter(Boolean)
            .join('_');
        
        if (selectedKey && product.imagenes_variantes[selectedKey]) {
            // Transición suave
            imgElement.style.opacity = '0.5';
            setTimeout(() => {
                imgElement.src = product.imagenes_variantes[selectedKey];
                imgElement.style.opacity = '1';
            }, 150);
            return;
        }
    }
    
    // Estrategia 2: Buscar por color individual (si solo quieres cambiar por color)
    if (product.imagenes_por_color && selected.color) {
        const colorImg = product.imagenes_por_color[selected.color];
        if (colorImg) {
            imgElement.style.opacity = '0.5';
            setTimeout(() => {
                imgElement.src = colorImg;
                imgElement.style.opacity = '1';
            }, 150);
            return;
        }
    }
    
    // Estrategia 3: Buscar por cualquier atributo individual
    // Recorre todos los atributos seleccionados buscando coincidencia
    for (const [attrName, attrValue] of Object.entries(selected)) {
        const imagenesPorAttr = product[`imagenes_por_${attrName.toLowerCase()}`];
        if (imagenesPorAttr && imagenesPorAttr[attrValue]) {
            imgElement.style.opacity = '0.5';
            setTimeout(() => {
                imgElement.src = imagenesPorAttr[attrValue];
                imgElement.style.opacity = '1';
            }, 150);
            return;
        }
    }
    
    // Si no hay coincidencia, volver a imagen por defecto
    const defaultImg = imgElement.dataset.defaultImage || product.imagen;
    if (imgElement.src !== defaultImg) {
        imgElement.style.opacity = '0.5';
        setTimeout(() => {
            imgElement.src = defaultImg;
            imgElement.style.opacity = '1';
        }, 150);
    }
}

// En tu productos.js o donde manejas el "Agregar al carrito"
function addToCartWithVariant(productId, selectedVariants) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Determinar la imagen correcta según la variante seleccionada
    let imagenFinal = product.imagen;
    
    // Si tiene imágenes por color y se seleccionó un color
    if (product.imagenes_por_color && selectedVariants.color) {
        const colorKey = selectedVariants.color;
        if (product.imagenes_por_color[colorKey]) {
            imagenFinal = product.imagenes_por_color[colorKey];
        }
    }
    
    const cartItem = {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio, // o precio de la variante si aplica
        imagen: imagenFinal,     // ← IMAGEN DE LA VARIANTE
        variantes: selectedVariants, // { color: 'Azul', voltaje: '18V' }
        descripcion: product.descripcion,
        categoria_nombre: product.categoria_nombre
    };
    
    addToCart(cartItem); // tu función existente
}






function normalizeSlug(text) {
    return text
        .toString()
        .trim()
        .replace(/\+/g, '+')       // + → -
        .replace(/\s+/g, '-')      // espacio → -
        .replace(/[^a-zA-Z0-9\-]/g, '') // limpiar especiales
        .toLowerCase();
}





    // Exponer funciones globales necesarias
    window.openDetailModal = openDetailModal;
    window.closeDetailModal = closeDetailModal;
    window.updateVariantSelection = updateVariantSelection;
    window.updateModalVariantSelection = updateModalVariantSelection;
    window.addToCartFromModal = addToCartFromModal;
    window.handleAddToCart = handleAddToCart;
    window.addToCart = addToCart;
    window.addToWishlist = addToWishlist;
    window.quickView = quickView;
    window.toggleCart = toggleCart;

    

    window.openWishlistVariantModal = openWishlistVariantModal;
window.closeWishlistVariantModal = closeWishlistVariantModal;
window.updateWishlistVariantSelection = updateWishlistVariantSelection;
window.confirmWishlistVariantSelection = confirmWishlistVariantSelection;
