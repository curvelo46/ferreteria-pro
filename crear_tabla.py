import sqlite3
import os

# Misma ruta que usas en app.py
DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ferreteria.db')

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
    
    # Crear índices para búsquedas rápidas
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_pedidos_email ON pedidos(email)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(fecha_creacion DESC)")
    
    conn.commit()
    conn.close()
    
    print("✅ Tabla 'pedidos' creada exitosamente")
    print(f"📁 Base de datos: {DATABASE}")

if __name__ == '__main__':
    crear_tabla_pedidos()