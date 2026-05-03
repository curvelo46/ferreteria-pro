from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import json

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

# ==========================================
# SERVIR ARCHIVOS ESTÁTICOS
# ==========================================

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

