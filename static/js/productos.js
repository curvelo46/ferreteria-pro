// ==========================================
// PRODUCTOS.JS - Página de catálogo con filtros
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

document.addEventListener('DOMContentLoaded', function() {
    loadInitialData();
    
    // Verificar si hay parámetros en la URL al cargar
    checkUrlParams();

    // Search input
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
    
    // Verificar si hay marca en la URL
    const marcaParam = urlParams.get('marca');
    if (marcaParam) {
        currentFilters.marca = marcaParam;
        
        // Actualizar la UI para reflejar el filtro seleccionado
        const checkbox = document.getElementById(`brand-${marcaParam}`);
        if (checkbox) {
            checkbox.checked = true;
        }
    }
    
    // Verificar si hay categoría en la URL
    const categoriaParam = urlParams.get('categoria');
    if (categoriaParam) {
        currentFilters.categoria = categoriaParam;
        
        const checkbox = document.getElementById(`cat-${categoriaParam}`);
        if (checkbox) {
            checkbox.checked = true;
        }
        
        renderSubcategoryFilters();
    }
    
    // Verificar otros parámetros posibles
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
    
    // Aplicar filtros si hay algún parámetro
    if (categoriaParam || subcategoriaParam || tipoParam || marcaParam || qParam) {
        applyFilters();
        updateActiveFilters();
    }
}


function applyFilters() {
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const sortValue = document.getElementById('sortSelect');

    currentFilters.precio_min = priceMin && priceMin.value ? priceMin.value : null;
    currentFilters.precio_max = priceMax && priceMax.value ? priceMax.value : null;
    currentFilters.orden = sortValue && sortValue.value ? sortValue.value : 'nombre_asc';

    // Usar filterProducts de data.js
    allProducts = filterProducts(currentFilters);

    renderProducts();
    updateResultsCount();
    updateActiveFilters();
}

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

    grid.innerHTML = allProducts.map(product => `
        <div class="product-card" data-id="${product.id}" data-slug="${product.slug}">
            ${getBadge(product.tipo)}
            <div class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}" loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.nombre)}'">
                <div class="product-actions">
                    <button class="action-btn" onclick="addToWishlist(${product.id})" title="Favoritos">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="quickView('${product.slug}')" title="Ver detalle">
                        <i class="fas fa-eye"></i>
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
                    <button class="btn-add-cart" onclick="addToCart(${product.id})" title="Agregar al carrito">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

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

    // Obtener marcas únicas de los productos con su slug
    const marcasMap = new Map();
    products.forEach(p => {
        if (p.marca_nombre) {
            const slug = p.marca_nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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

// Funciones de carrito y acciones
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

function quickView(slug) {
    window.location.href = `/producto/${slug}`;
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



function loadInitialData() {
    // Usar datos de data.js en lugar de fetch a la API
    allCategories = categories;
    allBrands = brands;

    renderCategoryFilters();
    renderBrandFilters();
    checkUrlParams();
    applyFilters();
    updateCartCount();
}