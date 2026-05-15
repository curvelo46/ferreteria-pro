import pathlib

folders = ['templates', 'blogs']
modified_files = []

for folder in folders:
    root = pathlib.Path(folder)
    if not root.exists():
        print(f'❌ CARPETA NO EXISTE: {folder}')
        continue
        
    for path in sorted(root.glob('*.html')):
        lines = path.read_text(encoding='utf-8').splitlines()
        new_lines = []
        i = 0
        changes = False
        
        while i < len(lines):
            line = lines[i]
            stripped = line.strip()
            
            # Detectar inicio exacto del bloque de favoritos
            if (stripped.startswith('<a') and 
                'href="#"' in stripped and 
                'nav-action' in stripped):
                
                # Verificar en las siguientes 3 líneas si es el bloque de favoritos
                context = ' '.join(lines[i:min(i+4, len(lines))]).lower()
                if 'fa-heart' in context and 'favoritos' in context:
                    changes = True
                    # Saltar líneas hasta el </a> (inclusive)
                    while i < len(lines) and '</a>' not in lines[i]:
                        i += 1
                    i += 1  # saltar el </a>
                    continue  # volver al while sin agregar nada
            
            # Línea normal: agregarla
            new_lines.append(line)
            i += 1
        
        if changes:
            path.write_text('\n'.join(new_lines) + '\n', encoding='utf-8')
            modified_files.append(f"{folder}/{path.name}: favoritos eliminado")

if modified_files:
    print('✅ Archivos modificados:')
    for f in modified_files:
        print(f'  - {f}')
else:
    print('ℹ️ Ningún archivo necesitaba cambios')