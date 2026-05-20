from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import json
import uuid
from datetime import datetime


app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ferreteria.db')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# ==========================================
# API REST ENDPOINTS - PRODUCTOS CON FILTROS
# ==========================================

@app.route('/api/productos', methods=['GET'])
def get_productos():
    conn = get_db()
    cursor = conn.cursor()
    
    # Obtener parámetros de filtro
    categoria = request.args.get('categoria')
    subcategoria = request.args.get('subcategoria')
    tipo = request.args.get('tipo')
    marca = request.args.get('marca')
    busqueda = request.args.get('q')
    precio_min = request.args.get('precio_min')
    precio_max = request.args.get('precio_max')
    orden = request.args.get('orden', 'nombre_asc')
    
    query = """
        SELECT p.*, c.nombre as categoria_nombre, c.slug as categoria_slug,
               c.icono as categoria_icono, c.color as categoria_color,
               s.nombre as subcategoria_nombre, s.slug as subcategoria_slug,
               m.nombre as marca_nombre, m.logo as marca_logo
        FROM productos p
        LEFT JOIN categorias c ON p.categoria_id = c.id
        LEFT JOIN subcategorias s ON p.subcategoria_id = s.id
        LEFT JOIN marcas m ON p.marca_id = m.id
        WHERE p.estado = 'activo'
    """
    params = []
    
    if categoria:
        query += " AND c.slug = ?"
        params.append(categoria)
    if subcategoria:
        query += " AND s.slug = ?"
        params.append(subcategoria)
    if tipo:
        query += " AND p.tipo = ?"
        params.append(tipo)
    if marca:
        query += " AND m.slug = ?"
        params.append(marca)
    if busqueda:
        query += " AND (p.nombre LIKE ? OR p.tags LIKE ? OR p.descripcion LIKE ?)"
        params.extend([f'%{busqueda}%', f'%{busqueda}%', f'%{busqueda}%'])
    if precio_min:
        query += " AND p.precio >= ?"
        params.append(float(precio_min))
    if precio_max:
        query += " AND p.precio <= ?"
        params.append(float(precio_max))
    
    # Ordenamiento
    orden_map = {
        'nombre_asc': 'p.nombre ASC',
        'nombre_desc': 'p.nombre DESC',
        'precio_asc': 'p.precio ASC',
        'precio_desc': 'p.precio DESC',
        'stock_asc': 'p.stock ASC',
        'stock_desc': 'p.stock DESC',
        'nuevos': 'p.id DESC'
    }
    query += f" ORDER BY {orden_map.get(orden, 'p.nombre ASC')}"
    
    cursor.execute(query, params)
    productos = cursor.fetchall()
    
    result = []
    for p in productos:
        producto = dict(p)
        producto['tags'] = producto['tags'].split(',') if producto['tags'] else []
        producto['atributos'] = json.loads(producto['atributos']) if producto['atributos'] else None
        
        if producto['tipo'] == 'variable':
            cursor.execute("SELECT * FROM variaciones WHERE producto_id = ?", (producto['id'],))
            variaciones = cursor.fetchall()
            producto['variaciones'] = [dict(v) for v in variaciones]
        
        result.append(producto)
    
    conn.close()
    return jsonify(result)

@app.route('/api/productos/<slug>', methods=['GET'])
def get_producto(slug):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT p.*, c.nombre as categoria_nombre, c.slug as categoria_slug,
               c.icono as categoria_icono, c.color as categoria_color,
               s.nombre as subcategoria_nombre, s.slug as subcategoria_slug,
               m.nombre as marca_nombre, m.logo as marca_logo
        FROM productos p
        LEFT JOIN categorias c ON p.categoria_id = c.id
        LEFT JOIN subcategorias s ON p.subcategoria_id = s.id
        LEFT JOIN marcas m ON p.marca_id = m.id
        WHERE p.slug = ? AND p.estado = 'activo'
    """, (slug,))
    
    producto = cursor.fetchone()
    if not producto:
        return jsonify({'error': 'Producto no encontrado'}), 404
    
    result = dict(producto)
    result['tags'] = result['tags'].split(',') if result['tags'] else []
    result['atributos'] = json.loads(result['atributos']) if result['atributos'] else None
    
    if result['tipo'] == 'variable':
        cursor.execute("SELECT * FROM variaciones WHERE producto_id = ?", (result['id'],))
        variaciones = cursor.fetchall()
        result['variaciones'] = [dict(v) for v in variaciones]
    
    conn.close()
    return jsonify(result)

@app.route('/api/categorias', methods=['GET'])
def get_categorias():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM categorias ORDER BY id")
    categorias = cursor.fetchall()
    
    result = []
    for cat in categorias:
        categoria = dict(cat)
        cursor.execute("SELECT * FROM subcategorias WHERE categoria_id = ?", (cat['id'],))
        categoria['subcategorias'] = [dict(s) for s in cursor.fetchall()]
        
        cursor.execute("SELECT COUNT(*) as total FROM productos WHERE categoria_id = ? AND estado = 'activo'", (cat['id'],))
        categoria['total_productos'] = cursor.fetchone()['total']
        
        result.append(categoria)
    
    conn.close()
    return jsonify(result)

@app.route('/api/marcas', methods=['GET'])
def get_marcas():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT m.*, COUNT(p.id) as total_productos 
        FROM marcas m
        LEFT JOIN productos p ON m.id = p.marca_id AND p.estado = 'activo'
        GROUP BY m.id
        ORDER BY m.id
    """)
    marcas = cursor.fetchall()
    
    conn.close()
    return jsonify([dict(m) for m in marcas])

@app.route('/api/entradas', methods=['GET'])
def get_entradas():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT e.*, c.nombre as categoria_nombre, c.slug as categoria_slug
        FROM entradas e
        LEFT JOIN categorias c ON e.categoria_id = c.id
        ORDER BY e.fecha_creacion DESC
    """)
    entradas = cursor.fetchall()
    
    result = []
    for e in entradas:
        entrada = dict(e)
        entrada['tags'] = entrada['tags'].split(',') if entrada['tags'] else []
        result.append(entrada)
    
    conn.close()
    return jsonify(result)



def crear_tabla_pedidos():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero_orden TEXT UNIQUE NOT NULL,
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            nombre_titular TEXT NOT NULL,
            tipo_documento TEXT NOT NULL,
            numero_documento TEXT NOT NULL,
            email TEXT NOT NULL,
            telefono TEXT NOT NULL,
            direccion TEXT NOT NULL,
            ciudad TEXT NOT NULL,
            departamento TEXT NOT NULL,
            barrio TEXT,
            codigo_postal TEXT,
            instrucciones TEXT,
            metodo_pago TEXT DEFAULT 'tarjeta',
            cuotas INTEGER DEFAULT 1,
            productos TEXT NOT NULL,
            subtotal REAL NOT NULL,
            envio REAL NOT NULL,
            descuento REAL DEFAULT 0,
            total REAL NOT NULL,
            metodo_envio TEXT DEFAULT 'estandar',
            estado TEXT DEFAULT 'pendiente',
            fecha_pago TIMESTAMP,
            fecha_envio TIMESTAMP,
            fecha_entrega TIMESTAMP,
            guia_envio TEXT
        )
    """)
    conn.commit()
    conn.close()


@app.route('/api/pedidos', methods=['POST'])
def crear_pedido():
    """Crear un nuevo pedido después del pago"""
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Datos requeridos'}), 400

    # Generar número de orden único
    numero_orden = f"FP-{datetime.now().strftime('%Y')}-{str(uuid.uuid4().int % 100000).zfill(5)}"

    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO pedidos (
                numero_orden, nombre_titular, tipo_documento, numero_documento,
                email, telefono, direccion, ciudad, departamento, barrio,
                codigo_postal, instrucciones, metodo_pago, cuotas,
                productos, subtotal, envio, descuento, total, metodo_envio, estado
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            numero_orden,
            data.get('nombreTitular'),
            data.get('tipoDocumento'),
            data.get('numeroDocumento'),
            data.get('emailTitular'),
            data.get('telefonoTitular'),
            data.get('direccion'),
            data.get('ciudad'),
            data.get('departamento'),
            data.get('barrio'),
            data.get('codigoPostal'),
            data.get('instrucciones'),
            data.get('metodoPago', 'tarjeta'),
            data.get('cuotas', 1),
            json.dumps(data.get('productos', [])),
            data.get('subtotal', 0),
            data.get('envio', 0),
            data.get('descuento', 0),
            data.get('total', 0),
            data.get('metodoEnvio', 'estandar'),
            'pagado'  # En simulación, marcamos como pagado inmediatamente
        ))

        conn.commit()

        return jsonify({
            'success': True,
            'numero_orden': numero_orden,
            'mensaje': 'Pedido creado exitosamente'
        }), 201

    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


@app.route('/api/pedidos', methods=['GET'])
def get_pedidos():
    """Obtener pedidos por email (para "Mis Pedidos")"""
    email = request.args.get('email')

    if not email:
        return jsonify({'error': 'Email requerido'}), 400

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM pedidos 
        WHERE email = ? 
        ORDER BY fecha_creacion DESC
    """, (email,))

    pedidos = cursor.fetchall()
    result = []

    for p in pedidos:
        pedido = dict(p)
        pedido['productos'] = json.loads(pedido['productos']) if pedido['productos'] else []
        result.append(pedido)

    conn.close()
    return jsonify(result)


@app.route('/api/pedidos/<numero_orden>', methods=['GET'])
def get_pedido(numero_orden):
    """Obtener detalle de un pedido específico"""
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM pedidos WHERE numero_orden = ?", (numero_orden,))
    pedido = cursor.fetchone()

    if not pedido:
        return jsonify({'error': 'Pedido no encontrado'}), 404

    result = dict(pedido)
    result['productos'] = json.loads(result['productos']) if result['productos'] else []

    conn.close()
    return jsonify(result)


@app.route('/api/pedidos/<numero_orden>/estado', methods=['PUT'])
def actualizar_estado_pedido(numero_orden):
    """Actualizar estado del pedido (para admin)"""
    data = request.get_json()
    nuevo_estado = data.get('estado')

    estados_validos = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado']
    if nuevo_estado not in estados_validos:
        return jsonify({'error': 'Estado no válido'}), 400

    conn = get_db()
    cursor = conn.cursor()

    # Actualizar según el estado
    campos = {'estado': nuevo_estado}

    if nuevo_estado == 'pagado':
        campos['fecha_pago'] = datetime.now().isoformat()
    elif nuevo_estado == 'enviado':
        campos['fecha_envio'] = datetime.now().isoformat()
    elif nuevo_estado == 'entregado':
        campos['fecha_entrega'] = datetime.now().isoformat()

    set_clause = ', '.join([f"{k} = ?" for k in campos.keys()])
    valores = list(campos.values()) + [numero_orden]

    cursor.execute(f"UPDATE pedidos SET {set_clause} WHERE numero_orden = ?", valores)
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'estado': nuevo_estado})




















# ==========================================
# RUTAS DE LA WEB
# ==========================================

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/productos')
def productos():
    return render_template('productos.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/sobre-nosotros')
def sobre_nosotros():
    return render_template('sobre-nosotros.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/terminos')
def terminos():
    return render_template('terminos.html')

@app.route('/producto/<slug>')
def producto_page(slug):
    return render_template('producto.html', slug=slug)

@app.route('/categoria/<slug>')
def categoria(slug):
    return render_template('categoria.html', slug=slug)

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

@app.route('/guia-elegir-taladro-perfecto')
def taladro_perfecto():
    return render_template('blogs/guia-elegir-taladro-perfecto.html')

@app.route('/10-tips-pintar-como-profesional')
def pintar_profesional():
    return render_template('blogs/guia_pintar_como_profesional.html')

@app.route('/Instalciones_electricas')
def Instalciones_electricas():
    return render_template('blogs/guia_instalaciones_electricas_residenciales.html')


@app.route('/blog/cemento-portland-vs-blanco')
def cemento_portland_vs_blanco():
    return render_template('/blogs/guia_cemento_portland_vs_blanco.html')


@app.route('/blog/epp-construccion-equipos-obligatorios')
def epp_construccion():
    return render_template('/blogs/guia_epp_construccion.html')

@app.route('/blog/drywall-vs-mamposteria')
def drywall_vs_mamposteria():
    return render_template('/blogs/guia_drywall_vs_mamposteria.html')

@app.route('/blog/iluminacion-led-ahorro-energetico')
def iluminacion_led_ahorro_energetico():
    return render_template('/blogs/iluminacion_led_ahorro_energetico.html')

@app.route('/blog/calcular-cantidad-pintura')
def calcular_pintura():
    return render_template('/blogs/como-calcular-cantidad-pintura.html')

@app.route('/blog/humedad-paredes-soluciones')
def solucionar_humedad_paredes():
    return render_template('/blogs/como_solucionar_humedad_paredes.html')

@app.route('/blog/mantenimiento-herramientas-electricas')
def mantenimiento_herramientas_electricas():
    return render_template('/blogs/mantenimiento_herramientas_electricas.html')

@app.route('/blog/como-elegir-brochas-rodillos')
def elegir_brochas_rodillos():
    return render_template('/blogs/como_elegir_brochas_rodillos.html')

@app.route('/blog/tipos-lijas-usos')
def tipos_lijas_usos():
    return render_template('/blogs/tipos-lijas-usos.html')

@app.route('/blog/errores-comunes-construccion')
def errores_comunes_construccion():
    return render_template('/blogs/errores-comunes-construccion.html')

@app.route('/blog/como-instalar-tomacorriente')
def como_instalar_tomacorriente():
    return render_template('/blogs/como-instalar-tomacorriente.html')

@app.route('/blog/herramientas-basicas-hogar')
def herramientas_basicas_hogar():
    return render_template('/blogs/herramientas-basicas-hogar.html')

from flask import render_template

@app.route('/checkout')
def checkout():
    """Página de checkout/pago"""
    return render_template('checkout_pago.html')



@app.route('/pedidos')
def pedidos_page():
    """Página de "Mis Pedidos"""
    return render_template('pedidos.html')

@app.route('/blog/impermeabilizantes-techos')
def impermeabilizantes_techos():
    """Página de "Impermeabilizantes para Techos"""
    return render_template('blogs/impermeabilizantes-techos.html')


@app.route('/blog/ahorrar-agua-construccion')
def ahorrar_agua_construccion():
    """Página de "Cómo Ahorrar Agua en Proyectos de Construcción"""
    return render_template('blogs/ahorrar-agua-construccion.html')


@app.route('/blog/pisos-ceramica-vs-porcelanato')
def PORCELANA():
    """Página de "Cómo Ahorrar Agua en Proyectos de Construcción"""
    return render_template('blogs/pisos-ceramica-vs-porcelanato.html')

@app.route('/blog/seguridad-escaleras-obra')
def seguridad_escaleras_obra():
    """Página de "Seguridad al Usar Escaleras en Obras y Hogares"""
    return render_template('blogs/seguridad-escaleras-obra.html')

@app.route('/blog/como-usar-nivel-laser')
def nivel_laser():
    """Página de "Nivel Láser para Construcción"""
    return render_template('blogs/nivel-laser.html')

@app.route('/blog/tipos-de-brocas')
def tipos_brocas():
    """Página de "Tipos de Brocas para Construcción"""
    return render_template('blogs/tipos-de-brocas.html')

@app.route('/blog/errores-al-pintar')
def errores_al_pintar():
    """Página de "Errores Comunes al Pintar"""
    return render_template('blogs/errores-al-pintar.html')

@app.route('/blog/cables-electricos-colores')
def cables_electricos_colores():
    """Página de "Qué Significan los Colores de los Cables Eléctricos"""
    return render_template('blogs/cables-electricos-colores.html')

@app.route('/blog/mezcla-concreto-perfecta')
def mezcla_concreto_perfecta():
    """Página de "Cómo Hacer una Mezcla de Concreto Perfecta"""
    return render_template('blogs/mezcla-concreto-perfecta.html')

@app.route('/blog/uso-correcto-esmeril')
def uso_correcto_esmeril():
    """Página de "Uso Correcto del Esmeril Angular"""
    return render_template('blogs/uso-correcto-esmeril.html')

@app.route('/blog/como-instalar-ceramica')
def instalacion_ceramica():
    """Página de "Instalación de Cerámica"""
    return render_template('blogs/instalar-ceramica.html')

@app.route('/blog/mantenimiento-techos')
def mantenimiento_techos():
    """Página de "Mantenimiento de Techos"""
    return render_template('blogs/mantenimiento_techos.html')

@app.route('/blog/cambiar-breaker-casa')
def cambiar_breaker_casa():
    """Página de "Mantenimiento de Techos"""
    return render_template('blogs/breaker.html')

@app.route('/blog/construccion-sostenible-2026')
def contruccion_sostenible_2026():
    """Página de "Construcción Sostenible en 2026"""
    return render_template('blogs/construccion-sostenible-2026.html')

@app.route('/creditos')
def creditos():
    """Página de "Construcción Sostenible en 2026"""
    return render_template('blogs/Creditos.html')



# ==========================================
# SERVIR ARCHIVOS ESTÁTICOS
# ==========================================

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

