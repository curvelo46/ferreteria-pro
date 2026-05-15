// ==========================================
// DATA.JS - LISTADO UNIVERSAL DE PRODUCTOS
// Ferretería Pro - Catálogo Centralizado
// ==========================================

const products = [
    {
        id: 1,
        nombre: 'Martillo 16oz',
        slug: 'martillo-16oz',
        descripcion: 'Martillo de uña 16oz, mango de fibra de vidrio',
        precio: 25900,
        precio_oferta: null,
        stock: 50,
        tipo: 'simple',
        categoria_id: 1,
        categoria_nombre: 'Herramientas',
        categoria_slug: 'herramientas',
        categoria_icono: '🔧',
        categoria_color: '#FF6B35',
        subcategoria_nombre: 'Manuales',
        subcategoria_slug: 'manuales',
        marca_nombre: 'Stanley',
        imagen: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=300&fit=crop',
        tags: ['construccion', 'golpe', 'herramientas']
    },

    {
        id: 4,
        nombre: 'Bombillo LED 12W',
        slug: 'bombillo-led-12w',
        descripcion: 'LED 12W luz blanca fría, ahorro 80%',
        precio: 8900,
        precio_oferta: 7500,
        stock: 60,
        tipo: 'simple',
        categoria_id: 3,
        categoria_nombre: 'Electricidad',
        categoria_slug: 'electricidad',
        categoria_icono: '💡',
        categoria_color: '#FFD93D',
        subcategoria_nombre: 'Iluminación',
        subcategoria_slug: 'iluminacion',
        marca_nombre: 'Philips',
        imagen: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBESExMSFRAVFhAPEhIPEBUQFRAQFREWFhUVFRYaHiggGBolGxUVITEiJSkrLi4uFyAzRDMsNzQtLisBCgoKDg0OGxAQGS4lICUvLS0rLS0tKysvLSstLS0tKys3LSsxLS0tNystLy0tLS0tLS0xLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHAgj/xABEEAACAgECAwUEBwcBBAsAAAABAgADEQQSBSExBhNBUWEicYGRBzJCUqGx0RQjM2JygsHwQ5Lh8QgVFiRTY4OisrPC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAIBAwQF/8QALREBAAICAAQDBwQDAAAAAAAAAAECAxEEEiExE0FxIjJRYYGRwaGx4fAFM0L/2gAMAwEAAhEDEQA/AO4xEQEREBERAREQEREBERAREQEREBE1/XdqqqrnqZW9kgbhzzlQenxl/T9qNK3+02+jgicfHx71zI8Sm9bZmJHo1tT/AFLEb+lgZInWJieyomJ7ERE1pERAREQEREBERAREQEREBERAREQEREBERAREQEREDl/a0Y1t/vQ/OtT/AJmEYzYO2A/77d/6f/1JMEyT4OX/AGW9Z/d8zJ70+q2thk/T8WvT6ttg9Axx8pjraMc8Z9R1HvlpMeB5/P5yY+MI22fT9stUvVlcfzoPzGJlNN2+P+0pHvRsfgZpKsDy8fDxyfKeVnWufJXtaf76ukZbx5unaXtjpn670P8AMvL8DNgrcMAw6EAj3EZE4oJ2fR/w6/6U/wDiJ7+FzWyb5vJ68GSb72vRET2O5ERAREQEREBERAREQEREBERAREQERKMwAJJAA5knkAPMwKxNU1X0h8PV2rW4WOOZNSs6D32AFceoJkT/ALW9/wDwratvlS6ufic5/KcsmaMfdF8kV7sb2p56u73oPlWo/wATFd3J2tdmdmOCxJJJHM/KRcHy+TZ/wJ8G9+a8z85fLvO7TK1snl6geoB94zLpz5H8553CTtKOdMvgPzls1yaBKNXN2bQdk7NpB+7T+lfyE5E1fOdhUYAHwn0/8f8A9fT8vbwnmrERPovYREQEREBERAREQEREBERAREQERMZxfioq9kYNhGQD0UHOCfkflIyZK0rzW7JtaKxuUnXa5Khljz8FHU/8PWaV2mUa5O7u3d1nISux0GfDdtI3/wB2R6S7dczksxJJ6kzxmfGzcde8+z0h4r57Wnp0ayvZu2tVTT6t1rU7lrvoq1Cg5zyOARInFeF6+z6yaC3pl+7PfY8la4Oqn154m45jAk14zJE/38EcReHOX4Xre8B23aSoFFP7ObuIPYCcFjWjlMDr7KKfQyZZx6tLdQH1DaemskVtxGoNZcei93p61SwpyzvJ5ZAxnON5KAzxZp1ZdpwV+6ea/I8pl81ck7tH21+Yn9ZlXjVn3qwwFN17Vmxa63RVDuBctFyKQxVnps+orbSBucEnwAyZ7s1JUE203V42bgyC3bvOELd0XADHoehlx+yWnDK9aGl1bvFbS2NRtfBG4BCFzgkZx4mRX7O6hWrZNSbO751praU1CI27JsCrsHennm05fmeeecY64J3zzMfT+Z/aGTGC3lMLiX1MxQOneDBKBwrjPTKdR8RLzKQCc4A5kuOQHqcjE592q1Op1Wp7p7l1IRsinShq6K7Oh3s2S74HNiXbqNwkqng4VV/aXNgGCmmQkVJ5ZGeZ9Tk+pnW/DUr1i/6dU2wVjzbjwziOnuuRUYuN6K1lY3VjLAY3/VY+ik/CdfnC+FJa1lFm0JSttG1QMAg3qvJfj1PwndJ7+ExckT83pwU5YIiJ63ciIgIiICIiAiIgIiICIiAiIgJzz6Qsrqq2BIzUo5culj/rOhzn30mui26bc9asy2BVssVC+1lzt3Ebj7Q5Dnznn4qs2xzEOeWN1a/Tr3H2j8ZKr4s3iAZiSCOoI94ld0+Lanxh4Jhnq+KoeoIkmvVoejCazulQ0jkhOm1gg9Dn3T1iatXc+SEDsQr2EICxFaY3NjxxkchzOeQMv2cVeokWEoR/4qmvpt6bsA/WXp94eYm+BfW4jo3ktremwmaTxzi9mqzXU5r0fR7hyfU+lflX/N9r3dZvGuLM1WwgbWPtY+0uPqnzB/HE12y4t1M64ceva810r5rlJSpdlKhF6Z8TI1pzkHx6/GVLTE67jiJkIO9sG/pnYu1dzbiPrYHMgfEieumObT0dq1mezaqOKYuo3Eqj3UrtYhmssOo3cvIAsOnTA5+E7zPmWnSMt+lsuYvqG1OlUMfZVFFikpWg+yPHkOo5DOT9NT6NOsbeqI0RES2kREBERAREQEREBERAREQEREBOLf8ASSpynDn8A2qrP9y1H/8ABnaZzX6c9ALdJpsjO24+Yxmp/wBJVa806hkzpyn6OODftKar9/qKmqNRQU2YU7qdSxDIQQ2Wqr+ZmTfScQq01F63V3i1K7dj0lHG7QPqyo25DYWt1HmQOmeWH4JdqNC7Np3AD7e8S2sWLZt3bQTyYfXboR1mb0Xbi2mutG0dZNQARqbW2gJVZVUuyzJwEsKkliTgeuZ4jh8kUmYpuddPVkTW09WOPay6pnS7TENWtdtmxv4aWBCrNy5fxUHvYCTaO2WmJ2v3lTDkRZWeX+7kj4iX/wDr7h+ofWPaxou1lFWlZbqWVamVHAbvBlcbl0/XH1flhu2dxt4fw/ZZTaw2pqmqZWJ1Z01QpFj5O4iobSc4yjZ9PkViLXil8c1me/f4b9O+4+3xLcPjmNw2rScXpsDiuyty9d1JCXBHUW1NXuHIkEbsjI8JtHC+0FdbsLK7O7NyvXhVZdPp0pq2VgBtzYs01fPHPcT545TZ2GzfrAe8q01PdrVa4qI1BdtgZGsetGQ7LGBDdABzMj28K1GnWw061WNVSal6RZYjpQ+3YxRga+Yes4DE+0J6cc+H7NLfSYnz+cJjFasezLbtapFNYPUBQfftwZgddxGusgEk2HAWtPaZiegAmu39p9U6bGsyPvbFVvmBM12GVDTq7WC95W+mfvHxlU3tY2Cen8HM3Fwsx78opimO7y+k1NxrNoNdDWaZWQHDGq0gksR09gg4/m+Esa1e6GlratHsVNVp2pTKE2M3crYwXmd1YXpgnaecncb7TMxNWmI7sCtTdt6ulaIWqz/QMEjz9DK8BeumvvAC+sd1cu+W2hbMkMT13YGcc+fUT0YuHyTO7RqInpH3h33WI1DKcC4SVuq1GqbOoe1BXVyBQiwDJUcgAfAcvicT6KnAODVO99buSzb6ySf6weQHID0E7/PRevLqGROyIiQ0iIgIiICIiAiIgIiICIiAiIgJqn0kaTvNIg+7ajf+xx/mbXIPGdN3lRX1Bl451aJZbs4fdwr0lKey19gylTEeeNoPuJxmdPo4KgbLAEDoCOp9ZkiJ7LZtdnGKuLazsjqEGWpfHiQu8D37c4jhvZDQXoveWd1dyB9tagWa6xftLggKtTHaftnynZWEw/F+AU35JAWz76jr/UPtfnItk5+llRGuzlVXYTUVVV36TUWVi5mRQrPQ+39pWpNxQ45q4sYE4UbuuJE43wTjIqeu1C9RXYzrTSzvVQ64BtVd5QFVIBb7OccjjbNRwm3TuwUsjHq1Tsm4eByuCRPQ4nqlxl+8wa3UXItm1q87SCRnPtMOvPMyeH31jRF3H9Rw61GKvW6sDghlwVI6g+RkvScPOMHJBIYrn2SwyFJHiRubB9TNz47Q1rvawG53axtoIALHOBkk495jhPCO8dV6A9T5L4mb4VadZOaZWOz3Zk2+2+RUOXLq58h+s25eCUAYFYHqM5+cytdIUBVGFAAA8gJQrON7zMqiNLXBeGYdfRl5/GdYmgcJHL+79Jv852naogiIktIiICIiAiIgIiICIiAiIgIiICUYSsGBjNWvtH4flLJEl65cNnzH5SMBO1eznKw4lphJLiWXE1iDrtILFweo6GYW7g/pNlxMhptKHQHx5g/AzpXJywzW3M+KcI9g8vES7wfRBAT4nl8P9Ym98W4WO7bl5H8ZrV1e0keUnJk5uyq10jsJbaXmlphOKmR4SPZ/u/Sb9NI0abVQePX5nM3eQoiIgIiICIiAiIgIiICIiAiIgIiICIlDAtahcrILLiZB+h90hkGdKosjtLTLL7ieCs6IRysyvDB+7+JkOukscD/l75lakCgAeE53ldVjiQ/dP7ppOs+uffn8JvGvH7t/dNQ19Q5H4SYVLGtPCAZy31Rlm9FAyfwEvWDEh699lFjn6ualYnwVrVDfhmJYxdfE2s19QBOd9ZYZOFBIARR0ICucnxJM7NOQ8N4eK9V6L7Z/mwNqnH2Rkch5JmdekRGmkRE1pERAREQEREBERARKOwAJJAABJJ5AAdSZrHE+07g7aUHlutVsE+GFGDnx5kcvLpA2iJqnCOO6u1wmyhvEsm9Qoz1Oc/4PpNqgViUjEATLTEmVYyglRCZlQrPG0y+BDCbs0jES01IPSSDPBMrbGL41xsabbWgU2FTYWsbYiIM5ZmPgMH/nIul7S2B8WHSvX7QZtLaXNZU4bKnrhhjl4yfxrR9/RdXyDvVdQH2glRYhU46eh6joJyjtFwQG+4rZWxJQ93Yj1H93Q1Sc8EMce1nOFKdMnK85rue7XZf2pLtObK2DIykgj/XWa5rR7I9/+JH7E2Nt1lf2AEs9A7Bg3z2j5SVrfqj3zKz0IncMRdD1o1D1uMq+QR05SmqcDmf9eH+ZiOI6vcBWDguy1jlnG446eMqBBTVLQUrqAVGIYA5Z2Qct7E+B5Y9BO1zgGrYqxaznZyQtnIDBiSB7uY6AcsAATv8AJ1LYIiIaREQEREBERAREQMbxq8BVr3bWsZEHgQCwyfgMn3gTXtZqUWl7QVIFa2KB/wCaWFa4/lRCcdCTKfSJw2yzurEONqXpjOM2NsKfgrj4zT24Vfk17/YJcAnphGAqz/a5+RkzLXSOx+m26VLD9e394T6H6v4c/iZm5E4Om3T0L5VVL5dEAkseMpis8ueU9Szeek2O5LzmVBlvM9Ay9IXklbOhlEMpceUjzV5IxaUZpR/OWt06JVZpgOP6FndMXV1o52lbKe8LPzPsncADgHkQekzjGYDttqmp0VlyqGerbYqnOWYHkFI5hjnAI6E9D0kzOmstwzSV6ah1UksQzO743O2Opx09wmB1etGcHp44OJhez3aB3qdXOeVhVs5yoYqefvGR75Hq1uXOT0GR7W09fCOk05oZWeumE0Gofvta7OWUuK19suFRSzbVJ8OS9PLrIfEOINkMpwysrqfJlORPGpuempt4Istd7MFtx2csEnr5+Q5nlLPZvgOo4jd3dIwikd7cwOypT5/ebyUdfQZIrFHszNi3fouaWvU8R1C1VqDYckhAQlSk+07kk4HTn7gB0E+i5iOzPZyjQ0iqleuDZY2C9r/ec/kOg8Jl5NrRPSFRBERIaREQEREBERAREQLOs0y2oyN0PiOoPgRNS1PBNSpICixeeGRlU49zEYPzm5xJmsS2JYbgOpcV93ajqycgWUgMp6YbofLEyZuEuWICCD0MhNomHRgfIMMfMj9JsdGJIunm45xITB1+spx5jmPw6fGXq7Mj3SoliuZXdKGUMtj2X5S0zQTLbTWBaUE8yoExoZrfb/VLXonLPsBatd2CeZYHGAD1wZshmhfSrwvW6mmlNLQ9tau1txrZcghcIu0kM31mPIHoJkRudNavXxZXYsucbSOYIzy9ecw9/FGVgyn2gQR48xMX3llTbLUsrfB9i5Gqb/dYAzdewH0fPrSuo1IZNH1ROavqR6eK1/zdT4ec9M0rjq5RuZQ+ynZbU8WtNrsyaYHD3kDLYPOukdCfXovqeR7lwfhVOlpSihAlS9APE+LMTzZj4k8zJGl06VotdaqlaAKiIAqqo6AAdBLs8trbdYjRERJaREQEREBERAREQEREBERAREQEj3afxXkfEfe/4yREDHZlcyVfRu5jkfz98htyODyMqJY9TyRGZQmbsUM8mVJlEQscAfHwHvMyZFACSAOpmTpqCqAPifM+c86fThfU+J/SXpLVnV6Su1dliJYnitiB1PwPKXgIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgJ5esMMEZnqIERtCPBiPQ8x+v4zyNCfvfJcf5k2IEdNGo65PvP6S+BjkOnpKxAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQP/Z',
        tags: ['ahorro', 'luz', 'electricidad']
    },
    {
        id: 5,
        nombre: 'Cemento 50kg',
        slug: 'cemento-50kg',
        descripcion: 'Cemento Portland grado 50kg',
        precio: 12500,
        precio_oferta: null,
        stock: 40,
        tipo: 'simple',
        categoria_id: 4,
        categoria_nombre: 'Construcción',
        categoria_slug: 'construccion',
        categoria_icono: '🏗️',
        categoria_color: '#6C5CE7',
        subcategoria_nombre: 'Materiales',
        subcategoria_slug: 'materiales',
        marca_nombre: 'Argos',
        imagen: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
        tags: ['obra', 'cemento', 'construccion']
    },
    {
        id: 6,
        nombre: 'Guantes de Seguridad',
        slug: 'guantes-seguridad',
        descripcion: 'Guantes protección industrial resistentes',
        precio: 9900,
        precio_oferta: null,
        stock: 70,
        tipo: 'simple',
        categoria_id: 5,
        categoria_nombre: 'Seguridad',
        categoria_slug: 'seguridad',
        categoria_icono: '🛡️',
        categoria_color: '#E17055',
        subcategoria_nombre: 'Protección',
        subcategoria_slug: 'proteccion',
        marca_nombre: '3M',
        imagen: 'https://wscolombia.com.co/wp-content/uploads/2024/04/Guantes-de-Seguridad-Anti-impacto-4.jpg',
        tags: ['seguridad', 'trabajo', 'epp']
    },
    {
        id: 7,
        nombre: 'Curso Instalaciones Eléctricas',
        slug: 'curso-electricidad',
        descripcion: '8 módulos, certificado incluido',
        precio: 59900,
        precio_oferta: 49900,
        stock: 999,
        tipo: 'digital',
        categoria_id: 6,
        categoria_nombre: 'Digital',
        categoria_slug: 'digital',
        categoria_icono: '💻',
        categoria_color: '#00B894',
        subcategoria_nombre: 'Cursos',
        subcategoria_slug: 'cursos',
        marca_nombre: 'Propia',
        imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        tags: ['curso', 'electricidad', 'aprendizaje']
    },
    {
        id: 8,
        nombre: 'Plano Casa 70m²',
        slug: 'plano-casa-70m',
        descripcion: 'Planos DWG + PDF, descarga inmediata',
        precio: 49900,
        precio_oferta: null,
        stock: 999,
        tipo: 'digital',
        categoria_id: 6,
        categoria_nombre: 'Digital',
        categoria_slug: 'digital',
        categoria_icono: '💻',
        categoria_color: '#00B894',
        subcategoria_nombre: 'Planos',
        subcategoria_slug: 'planos',
        marca_nombre: 'Propia',
        imagen: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
        tags: ['plano', 'diseno', 'arquitectura']
    },    {
        id: 9,
        nombre: "Alicate Universal 8",
        slug: "alicate-universal-8",
        descripcion: "Alicate universal de 8 pulgadas, acero al cromo vanadio",
        precio: 18900,
        stock: 45,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Manuales",
        subcategoria_slug: "manuales",
        marca_nombre: "Stanley",
        imagen: "data:image/png;base64,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",
        precio_oferta: 15900,
        tags: ["electricidad", "corte", "herramientas"],
    },
    {
        id: 10,
        nombre: "Llave Ajustable 12",
        slug: "llave-ajustable-12",
        descripcion: "Llave ajustable de 12 pulgadas, mandíbula cromada",
        precio: 32900,
        stock: 35,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Manuales",
        subcategoria_slug: "manuales",
        marca_nombre: "Bahco",
        imagen: "https://clientebhp7b0eo.com.co/backend/admin/backend/web/archivosDelCliente/items/images/LLAVES-LLAVES-AJUSTABLES-LLAVE-AJUSTABLE-12-TOTAL-1746020231103140402.jpg",
        precio_oferta: null,
        tags: ["fontaneria", "ajuste", "herramientas"],
    },
    {
        id: 11,
        nombre: "Destornillador Set 6 Piezas",
        slug: "destornillador-set-6",
        descripcion: "Set de 6 destornilladores, puntas planas y Phillips",
        precio: 24900,
        stock: 60,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Manuales",
        subcategoria_slug: "manuales",
        marca_nombre: "Truper",
        imagen: "https://soelco.co/wp-content/uploads/JOY-6E1.webp",
        precio_oferta: 21900,
        tags: ["bricolaje", "atornillar", "herramientas"],
    },
    {
        id: 12,
        nombre: "Sierra para Metal 12",
        slug: "sierra-metal-12",
        descripcion: "Sierra de arco para metal con hoja de acero templado",
        precio: 45900,
        stock: 20,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Manuales",
        subcategoria_slug: "manuales",
        marca_nombre: "Stanley",
        imagen: "https://clientebhp7b0eo.com.co/backend/admin/backend/web/archivosDelCliente/items/images/SIERRAS-Y-CUCHILLAS-PARA-CORTE-DE-METAL-DISCOS-DE-SIERRA-EN-ACERO-O-TUNGSTENO-PA-DISCO-SIERRA-12-x96D-TUNG-PANEL-LAMINADO-597920220615093902.jpg",
        precio_oferta: null,
        tags: ["corte", "metal", "herramientas"],
    },
    {
        id: 13,
        nombre: "Nivel de Burbuja 24",
        slug: "nivel-burbuja-24",
        descripcion: "Nivel de aluminio de 24 pulgadas con 3 burbujas",
        precio: 38900,
        stock: 30,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Manuales",
        subcategoria_slug: "manuales",
        marca_nombre: "Truper",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjjL147pGlHzgWGVoJIKHYFz-PcM2K5a5WTQ&s",
        precio_oferta: 34900,
        tags: ["construccion", "medicion", "herramientas"],
    },
    {
        id: 14,
        nombre: "Cinta Métrica 5m",
        slug: "cinta-metrica-5m",
        descripcion: "Cinta métrica 5 metros, recubierta de goma antideslizante",
        precio: 15900,
        stock: 80,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Manuales",
        subcategoria_slug: "manuales",
        marca_nombre: "Stanley",
        imagen: "https://cdn1.totalcommerce.cloud/metropolis/product-zoom/es/cinta-metrica-5mt-global-plus-stanley-1.webp",
        precio_oferta: null,
        tags: ["medicion", "obra", "herramientas"],
    },
     {
        id: 2,
        nombre: 'Taladro Inalámbrico 18V',
        slug: 'taladro-inalambrico',
        descripcion: 'Taladro percutor con 2 baterías de litio',
        precio: 199900,
        precio_oferta: 179900,
        stock: 25,
        tipo: 'variable',
        categoria_id: 1,
        categoria_nombre: 'Herramientas',
        categoria_slug: 'herramientas',
        categoria_icono: '🔧',
        categoria_color: '#FF6B35',
        subcategoria_nombre: 'Eléctricas',
        subcategoria_slug: 'electricas',
        marca_nombre: 'Bosch',
        imagen: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
        tags: ['taladro', 'bricolaje', 'herramientas'],
        atributos: { voltaje: ['12V', '18V', '20V'], color: ['Amarillo', 'Azul', 'Rojo'] }
    },
    {
        id: 3,
        nombre: 'Pintura Vinilo 1 Galón',
        slug: 'pintura-vinilo',
        descripcion: 'Pintura vinilo acrílico alta calidad',
        precio: 36900,
        precio_oferta: null,
        stock: 30,
        tipo: 'variable',
        categoria_id: 2,
        categoria_nombre: 'Pinturas',
        categoria_slug: 'pinturas',
        categoria_icono: '🎨',
        categoria_color: '#4ECDC4',
        subcategoria_nombre: 'Vinilo',
        subcategoria_slug: 'vinilo',
        marca_nombre: 'Pintuco',
        imagen: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop',
        tags: ['pintura', 'hogar', 'decoracion'],
        atributos: { color: ['Blanco', 'Negro', 'Gris', 'Azul'], acabado: ['Brillante', 'Mate'] }
    },
    {
        id: 15,
        nombre: "Esmeril Angular 4.5 850W",
        slug: "esmeril-angular-850w",
        descripcion: "Esmeril angular 4.5 pulgadas, 850W velocidad variable",
        precio: 149900,
        stock: 18,
        tipo: "variable",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Eléctricas",
        subcategoria_slug: "electricas",
        marca_nombre: "Bosch",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 129900,
        tags: ["corte", "pulido", "herramientas"],
        atributos: {
            potencia: ["650W", "850W", "1000W"],
            diametro: ["4.5","5"],
        }
    },
    {
        id: 16,
        nombre: "Sierra Caladora 650W",
        slug: "sierra-caladora-650w",
        descripcion: "Sierra caladora 650W con velocidad variable y láser",
        precio: 189900,
        stock: 15,
        tipo: "variable",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Eléctricas",
        subcategoria_slug: "electricas",
        marca_nombre: "Makita",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["corte", "madera", "herramientas"],
        atributos: {
            potencia: ["550W", "650W", "800W"],
            velocidad: ["Variable", "Fija"],
        }
    },
    {
        id: 17,
        nombre: "Lijadora Orbital 240W",
        slug: "lijadora-orbital-240w",
        descripcion: "Lijadora orbital 240W, base rectangular con aspiración",
        precio: 119900,
        stock: 22,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Eléctricas",
        subcategoria_slug: "electricas",
        marca_nombre: "Black Decker",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 99900,
        tags: ["acabados", "madera", "herramientas"],
    },
    {
        id: 18,
        nombre: "Pistola de Calor 2000W",
        slug: "pistola-calor-2000w",
        descripcion: "Pistola de aire caliente 2000W, 2 temperaturas",
        precio: 89900,
        stock: 28,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Eléctricas",
        subcategoria_slug: "electricas",
        marca_nombre: "Bosch",
        imagen: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTHEQh6NkJULuZYNFo1KUy_NzwxYfZTBhjv1GVpikb8zV800JhCJbzRwzYDuaBPv5EwKvKRAuhRPqTF-cwI5WU-cTj5FJnnzao07HAegzEi",
        precio_oferta: null,
        tags: ["pintura", "termico", "herramientas"],
    },
    {
        id: 19,
        nombre: "Pintura Esmalte 1/4 Galón",
        slug: "pintura-esmalte-14",
        descripcion: "Esmalte sintético alto brillo para metal y madera",
        precio: 18900,
        stock: 40,
        tipo: "variable",
        categoria_id: 2,
        categoria_nombre: "Pinturas",
        categoria_slug: "pinturas",
        categoria_icono: "🎨",
        categoria_color: "#4ECDC4",
        subcategoria_nombre: "Esmalte",
        subcategoria_slug: "esmalte",
        marca_nombre: "Pintuco",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["metal", "brillante", "pintura"],
        atributos: {
            color: ["Blanco", "Negro", "Rojo", "Azul", "Verde"],
            acabado: ["Brillante", "Mate", "Satinado"],
        }
    },
    {
        id: 20,
        nombre: "Pintura Base Agua 1 Galón",
        slug: "pintura-base-agua",
        descripcion: "Pintura base agua lavable para interiores",
        precio: 42900,
        stock: 35,
        tipo: "variable",
        categoria_id: 2,
        categoria_nombre: "Pinturas",
        categoria_slug: "pinturas",
        categoria_icono: "🎨",
        categoria_color: "#4ECDC4",
        subcategoria_nombre: "Vinilo",
        subcategoria_slug: "vinilo",
        marca_nombre: "Comex",
        imagen: "https://comex-pc.myshopify.com/cdn/shop/files/ACQUA_100_GALON_1800x1800.jpg?v=1747681017",
        precio_oferta: 38900,
        tags: ["interior", "hogar", "pintura"],
        atributos: {
            color: ["Blanco", "Crema", "Gris"],
            tipo: ["Interior", "Exterior"],
        }
    },
    {
        id: 21,
        nombre: "Impermeabilizante 4L",
        slug: "impermeabilizante-4l",
        descripcion: "Impermeabilizante acrílico 4 litros para techos",
        precio: 65900,
        stock: 25,
        tipo: "variable",
        categoria_id: 2,
        categoria_nombre: "Pinturas",
        categoria_slug: "pinturas",
        categoria_icono: "🎨",
        categoria_color: "#4ECDC4",
        subcategoria_nombre: "Especializadas",
        subcategoria_slug: "especializadas",
        marca_nombre: "Pintuco",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["techo", "impermeable", "pintura"],
        atributos: {
            color: ["Blanco", "Rojo", "Gris"],
            presentacion: ["1L", "4L", "20L"],
        }
    },
    {
        id: 22,
        nombre: "Rodillo Felpa 9",
        slug: "rodillo-felpa-9",
        descripcion: "Rodillo de felpa 9 pulgadas para pintura latex",
        precio: 12900,
        stock: 55,
        tipo: "simple",
        categoria_id: 2,
        categoria_nombre: "Pinturas",
        categoria_slug: "pinturas",
        categoria_icono: "🎨",
        categoria_color: "#4ECDC4",
        subcategoria_nombre: "Accesorios",
        subcategoria_slug: "accesorios",
        marca_nombre: "Truper",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 9900,
        tags: ["aplicacion", "rodillo", "pintura"],
    },
    {
        id: 23,
        nombre: "Brocha 3 Profesional",
        slug: "brocha-3-profesional",
        descripcion: "Brocha 3 pulgadas cerdas naturales para pintura",
        precio: 8900,
        stock: 70,
        tipo: "simple",
        categoria_id: 2,
        categoria_nombre: "Pinturas",
        categoria_slug: "pinturas",
        categoria_icono: "🎨",
        categoria_color: "#4ECDC4",
        subcategoria_nombre: "Accesorios",
        subcategoria_slug: "accesorios",
        marca_nombre: "Truper",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["aplicacion", "brocha", "pintura"],
    },
    {
        id: 24,
        nombre: "Masilla Plástica 1kg",
        slug: "masilla-plastica-1kg",
        descripcion: "Masilla plástica lista para usar, secado rápido",
        precio: 15900,
        stock: 45,
        tipo: "simple",
        categoria_id: 2,
        categoria_nombre: "Pinturas",
        categoria_slug: "pinturas",
        categoria_icono: "🎨",
        categoria_color: "#4ECDC4",
        subcategoria_nombre: "Materiales",
        subcategoria_slug: "materiales",
        marca_nombre: "Pintuco",
        imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIWFRUVFxgYFxUVFRcVFxcVFxUXFhUWFxUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGysgICUtLi0tLS0uLS0rLystLSstLS0rLSsrLSsrLSstLS0tLSsrLSstKy0rLSstLS03LS0tLf/AABEIAJABXgMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQIFBwMEBgj/xABPEAABAwEDBQoICgkDBAMAAAABAAIDEQQSIQUGMUFRBxMiUmFxgZHR8BQVU3KSobHBFiMyQkNUgpPS4SUzRGKDorKzwghz8RckY6M0NbT/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQMEAgYF/8QAMBEAAgEDAQYEBQQDAAAAAAAAAAECAwQRIQUSEzEyUUFCUoEUMzRhkUNxgqEVItH/2gAMAwEAAhEDEQA/ALxQhCAELjc+M/o8nPbEYy9723xV1xoFS0Y0NTUFcVad2k1oGwt6XPPqQFzoVCz7tEh0SAebF+IKPm3Ypj9JL0BrUB6KQvNcm61OfLHnkp7FrndXtPEd0zOPuQHpuqC4bV5fO6pa9TB0vesTt1G26g30nn3oD1JfG0daN8G0da8rv3TLftYPTP8Aktd+6Nbz89vU78SA9XGZvGHWE02pg+e30gvJzs/refpG+j+axnPe2n6QegEB6zNti8o30gmnKMPlWekF5L+Glt8qPRaj4Y27y38jexAesvGkHlWekEeNYPKs9ILyX8M7f9YPQxnYnsz4yiNFqcPss/CgPWPjWDyretHjSHyg9a8qM3QcqNGFseOhn4VmbukZXH7dJ1R/hQHqbxlFxx1HsR4yi446j2Ly5/1Myx9ekx0cGP8ACnHdLyx9efhp4EVB/IgPUPjKLjjqPYjxlDxx615f/wCpmWMP+9ea6OBH+FI7dNyv9dd6LOxAeofGcPlG9aUZSh8o3rXll+6VlU6bUTztb2LG7dCyidMwP2GoD1X4wi8o3rCXw2LyjfSC8oHPy3HTI0/Z7Ck+Hdt4zPR/NAesha4+O3rCUWhnGHWF5PGfts/c6j2p43QbWNTP5u1Aert+bxh1hLvzeMOsLy7k/Py1PdQhujUXdqkhnladg9Jy4lUUXhmujZVa0d6CPSG+t2jrS3xtC84DPS0bP5inDPSfW0+mVzxYln+NuPSejapy85jPWXY70injPib/AMg+2VKqROHs+4XlPRKF57jz/tA+klH2z2rO3dKtI+lk6aFdb6OXZ115WX6hUXHusWlvz6+dGD7AtqLdllHymRO52vb71OUVSo1I80y6kKuc1d1WK12iOzOiuvlJDS114VDS7EEAjAFWMpK2scwQhCEAhCEBUf8AqQs7fAYJLovi0hodQVDXRSktrsq0GnIvPQXoz/UaP0bDyWtn9mdedEAqUNSBOCACiiClr39yASiSice/YgoBBTv6gF1uQsxZJi3wiQWcOoWsul87mnQRCKXQdriOYrJmHkYvLZQ0Ole/e7MHAFoe1t+WdwOkRtLacrv3VdWSbJZbEC29elOMkpBc9xpUlxxujXTp5Vivb2NtHllvki2lTc3ocezcps7Wi5GZDr8JmfH/ACwtw608blMR0w2ceZNageguLh6lZUUzXYtIOAOBrgdBTrwGtecnt65zokvY0fDopvKm4++6TA+64YhrnCRnNfDWub6JWPN7NSzWZrnWu5I+81pkeIxFG7H4pgncwPkOk1FBQU1q6wUlvscVojMUrGuDhQhwDgecFb7Lban/AK1VqVToY5FEbqOZcsMhtMbWuhc1t7e2gXboul9GihBoKkaCaEAUJ5jNjNSe3iUwviBiu8B7iC68HEEUBAHBOJoKkDWr5jc+zEWW8H3jdiY9x4TrjrjRJia3WnlcGEYkOLtfI+QbNZJ3mCLfPC30e0XKM3sPL2kOI3rS4kVOLQWjUPQQkpreRQ1jRlJZx5lWuwta+dgumlXMJNK1u1BaCAaGh0VGlc+Bpw6PeVce6tnC6OzmxSNLnPLzG5wAu2ffWkEkClQ6IhrRUgFpJqMacbo748i6wQZQ0YbNuvoSj52GPF1DlKG1rXDAY7G821GrnOG13OoAlBhs26zyBMdTHDHZqHLzrKdJ0YDTqaORYyMB6ht5SpBiIxCO/NzpztJ705k1QAA77Uh96WqXYPUgECQhOJ0+3sRXQgJDII+MPmn3KfooHIQ+M6D7lPrBc9Z6zY3yPcKIolQFnR9jAl1LdTkBdHWEN3tMfGs4THrtE7qNN8axOjW08LEVanoY6lOLeqLC3CrKw2yZxaC5kQLSQCWkuoS06qjBXmFSu4S3/ubT/tM/rcrqC1U+k8jtFJXDSFQhC7MQIQhAVf8A6iG1yWzktMZ/9co9683lelP9QY/RQ5LRH7Hj3rzWgFCcCkBSoBe3v0pKe1KEA0798UAhPf3ICNnfuUU0IC39yN7SyF2uMWlh5HPfC8dbD/K7YV1PgJktbmRuo1kbuE7hEPlcS4jaaHWqYzKzjdY5w52MTyBI0aaC8A9v7zbzsNYc4a1e2TsptNHNcHNcA5rhiHMOh3Ny9GkELz+1oVIT4sddMH0rGaSa8SFss8jCY4i5vDfeLWi9vUMd1oJIxJIWKXKkrg2UucZGWfgm6f1jzwjSlMBpK7mCUHELOGhfE+Nj4xNjqJc4nFsy7MXFu+ENMrGFxbS6wNF5wNMLxrQlblnt0r5RGJHm68NpdoHRXaukeSNegUpoC6q6Ni1coZRigbee4DYBi5x5AojcKbxCGpW5p8onM7obCyzmVo/VRl4OoPikjkhJ+02nSVN5Ps7WWd8jY3Bhq7fLzb7S1xv/ABl4ECt6nIehQs+UoiXeHXLkl2tneC74oOqODQi9UVNdlNOibyMXWkyCDeoo2kEXmvmc4FxOLS8Na03CKN5dFF7Gwozp0IqfM+XcNb5xu7NHA7J0coIe6sbWkY0ecTTUBd3wEebsVHChpq5exXTuyZPk8Fo2Rr2Rva4hlMI2lzKXR8mjpQcak3jUkNFKXZp74LYUmQayBiNWwbTyoaBhiabdZPFCb83nOA1nnWSvCrUYDobzIBh14Y8XZylNfQUHr1nkHIl1AaanRrPOnP0k1wpTm5AgMDteHRs50gGpKa0A79KNZ9vuQCaktMe+KBoA199KDrPcoBvfmSkYnv0lL7vUkHt9aAksgj4z7J9yn1A5D/W/ZPuU+vn3PWes2L8j3BAQlAWdH2BUJ1zg3qjTSlcdFa02YrLFCXkCJjiaCuvhayORdE7yRjY2pprJpjh1p29i8WuNKXhUY4itKchI9am4c2Z5SXyOa0uNSTiTtNApOzZpQj5RllOxgDR1nQukUTuYRXM4d4F3Xero1XaGuO2tEk29cK6XAXhcrQ8HGt6mvR613VqyNZ49NngaNs9qfX0GKMk8CrQixHkb4R/UcFajE7pPkmdLuGxN3+1Frqi4wCuDqXnEOI1A+4q41WO5JZYmTWgxACrI6hrnEfKfxlZy10+k8zfT3q7YIQhdmQEIQgK2/wBQA/RR/wB+L/JeaF6a3fB+iX8ksX9RC8yhAKAnJAlAQC9ncpEHvyrYhsUr2lzIpHCtKtY5wrrqQKIDX9wS69GpOMTqltDe4tDWvKNKRzaV6scMUAgboU5m9nVPZAGNo+KtTG+tATpMbgaxuI1jA6wVBV5e+xFeVRKKksMmMnF5Rb2S90qCmL3RnizRGQfeQ4n0FPR7oMRFRaLH0ySN9RbUKggfySkrBPZdtN5cTSrufjhl1ZR3SYhUG1M5rPDI89D5LrfWuJyxn7I8nwdrmE4b9I4Pm+zTgx6xgCeVcWivL+ato2NCj0ROZXM5LHItXc9ztscLLObTKL0LLQxzJWvdUyzNla9r7rgcAa1oa7VPTbq2T2SlzRObpYQ5kYum7JI9w4TmmhErmYgaKqjTp74fmm+z2rZkzl2Z37q2TrbZnwiK0NLmvAqxlCXMc2hN/DEg15FSzdeGPfEpL2PfBKNHTo286AygDg7NusnkS10mmOzU3l5Shtak1GjE7OQIAwGzUNZx1oApo2bdZPJsTHDA4Y69gHan3sSa6sTqHI1NcMADzge8oDGRo71TToPenMnE6fWexNI0IAH/AB+aKYd/UiunvVKNQ7hAKNPN3xSNbo71/JJ350uv2oCRyEfjD5p9y6EDAmuOGG2tceig61z2QP1h80+5dbkqxtkPCrQagaV6V8+56z1eyHi3z9zVJF6rRhUUBx69qkLLkuV9SOAHadVQTWl3Yp6ywxMwbAK7S7HrJS2+0SgUYyJv7zpWD2uWc2yuG9Ea1lyNBGKycI8ujqUrFbGNFGgAbAKLnTYJXG8+1WYH960M9gqpSCrdNtyeOcX/AGNXag2UVZrxeX7m5actMjFT0BQGUM5pnijXXG8hx61PeERGl+22A81ic/3hHhljGm1WY+Zk4+9ytVL7lMKyXkb/AD/w4C0SFxq41O0mqwkrvpcrWAfSMPm5PaPaVoT5YsOyvNYoR7XKzdx4l3xMn+mzpNwd5MlqFcAyL1uk7FcSrLcgtUEklpMLbtGxXvimR1xkp8gmug6VZq0w5Hmb55ry0wCEIXRkBCEICvN3gfoiX/ci/uBeYwF6e3dx+h5vPh/utXmAIBwShIlCAVXhuQ260Q5FtUlli36Zs5uRkE3iRGDgCDoqqOCtbc+zsZYsi2ze7RHHahLeiY4svuwjFRG75WvUgLDmsoktmR7ZNA2C1S78yVmungkr6O1m6WildF8pM3LBBKcsRTtbvb7Y5jqgCgfDE0UOo1OHKqvzGzutFsy1Y5rdaAQzfgC65GxgMEgNAAA2ppz4Lt7TbIzZM4LsjKulkLKPbV3/AG8dC2hxxGpAaW55m4bJ46skzA50TI7jnNBrG6O0XHtqMKgA4a+ZT+Y+cdmttgntLsnxN8FFLtGOv3IQ+tbgpXpRmJnTHlDJs8ry0WtkBinxoXBrZDE4jYbzzzlwXMbjjh4myl/E/wDzBASmQ7RZcoZNypbG2SKO82S40xxksLLGxtQ66KYtJw2qF3JcmQS5Gt8ksET3tdLdc+NrnNAs7CLriKihxWXcStEdoyfbcnb4GTSB90E4lksW93mjWGkY02japrImRnZDyLbGWySO/KZC0MJIJfE2NjG1ALnEtro9iAgM78k2dmbVkmZZ4myubZqyNjaHmoNavAqa61V+a+RnW21Q2ZumV4aSNTRwnkczQ49Cva0ZuTZRzdsdmgLA8x2d3xhIbRoxxAK09yfMV+TZ7VabYWAwtDGvaSWBpaJJXVIGgXRo2oBN1nMqyHJ75bFBDHJY3DfN6Y1hLAwF7Xlo4RAcx+PvXMblOZFlfZpMqZQo6CO8WMPySGV3x7xpdQ4BujDXgrJzSmyc+a1xw5QbanW1zpHxEtwBbdcG0ANLlBjqaFE5sWOI2W2ZvSyb3NGZWx10vhlcZIpGA/KpeFQEBD5Oz2yDa5RZZMmxQxuN1kroomtB0CpYKx121w1qvs+c1obPbWQ2GZs8VoI3q68Pc1znBu9OI5Tgdh5KrpckbiFsM4banxsgB4Ukb7znAamtIwJ2nQuhzFzIsDMquksj3yxWJvDe4hzDaX1utY5oANxt4nYSNikkmsrbnVjOTnWOGGHwyKBjhKGMEznivCL6VIe5j26dBVP5g2SKSYhzGveGsMbXtDq1mjbM8MNQ9zIi9zW0OI0GivDJ+U8nHKb7QzKbHyzMbB4PeZd4B4IGu8HXtfziqe3W83/AsoyPbwY5xv0ZGmpPDa3YQ6p+0EINrP8Agh8HdLcDXF0Yhe5m9yPxlbO0tIBcxobGQ41oXYGhuivS3QKcvKfyWS0TukIL3l7z857i6gGOJOlY3EVJ/wCT2BAYnHSf+BzJKd9aCcAK9gRhigEp37EuvQk2IJwPfrQB7/WlOtHeu3kCTvzICUyF8s+b7wuvyYxrsL7WnlNK9K5DIR+MPm+8KdXzrnrPVbIjvW+PudrFks0FZI/Tb2qPyjYLteHG4U1Pb7KrmiwbAgBUJH0o27T5mR7aHBCaE5dmpRQqaU9McpR0YZFhKzPWFysRRVLV3BRwrXzRe2RXAqi3BR/8v+F7JFbi2w6Txe0fqJCoQhdGIEIQgOB3cx+hrR50P95i8uheqt2SG/kmduipix/isXmd2SHaiD1hQ2kXU6FSosxWSPSgrbdkuUfNrzYrG6xSDSx3UU3kHb1FzizAivsTzC7WCOgpCCpyivdl2EWxNk+RtS5hAbpIFaYNdq0Cj248q1iFOQZyytrSOOpAqaOxcLlHkXqVpG3Vy6yhGGQ5je0moLaUDqgildAPOhsj2igcW11AkVBGk01KUtmXXSRGLewG1aQS9zyKGpqXfKJPqw1Bb0udryQbgHCa5wvaQ1xc5mDRRhrS7jRCDnY53MN5riHDQ5pLXDmIxC2557TNQyPmlGN2+58lKUvXak6KjrW1kzOB8MbY2twberjpLnsdWlNNGlvM4rfs2c0cbw9sFHgt0OaAA0EANw82vMgIduV7XGGsbPOwAC60SyN4OqjQcBzIly3ayHMfaZyCCHNdNIRTQQ5pd6ipmTOOIsxjJeb14UZR/wAU1gLnUr8oF2H5pZM54TQ+Diu+XiSGu+eXVxOLiDT36KAc3ZbTJE4Oie6Nw0OY4sdy4toVkmyhO+TfHyyPkFAJHPc54poAcTXWdak7DlaBjpS6Aua+UPa03KhofeuOcRophSlOZZ7DluzwgBkTiWmIhxbHeJZM55NcdIcBr0DQgNSfOm3vbvclttLmcQzvpTYccVrWLK9phaWRTyxNJqWskewEkAfJaaaKdCmI84YL7S+ClCwuoyEmRrSS9jrwoA4kmun1LHLl+J44cVTda00ayjw2BsYBdpZRzS4Fu3apJIWBxDmlpILaOFCQWuGIdeGIK2LdlKeYVmnkloTQyPc+laVDA4mlaBZMsW2OWUviYWC6Bdo0Aka6NJoNC0QcBpxOnZyNCEDiMQKaBo2cpKY7Qdp163cgCcRicOjtKbs0466Y8wCAY4Y01D1fmmaufrKV+k8mrtKaEApOPMOpGocuNNvOkrpSjSEAu3v0BNRqqlHsUAksgj4x3mn2hT4UBkD5Z80+0KfCwXPUet2N9P7ghKhZz7ABPTE4LslDkxyeE16lHRgesLlmesJVqKKpbW4KMLXzxex6tpVPuCjg2vzo/wClytlbIdJ4raH1EgQhC6MYIQhAcfurj9GTc8f9xq8+UXoDdh/+otXI1p/9jV5ejynI351ecVVc4OR9OwvY26akuZ1Ea2WLmYsvOGlgPNULajzibrYegqp05H3KW1LV82dBpWSx2ISyMj4IvuDauAoCdFVCMzgi2OHQD71tWbOKJjmva+jmmoq2vWNB5lCjJF8ry1nF4ayT78z3l1BEwtqRfIDRVt80uuo6vAOFNYWmM1JDh4I6tAaXNRrTRzHqWQZ7PNfj2m9pq0V+dhWmjhFZJs85JPlTRn1aWSMJ06aSv6aLvT7mJSz6GRs+bYa286zua2pbeIcBeBukV21wWd+ZLrxZ4ObwcW0vCt4XK6//ACMPSt62Z0mZhY4xcIirgSDRr3PaPlU0vdjSuK3257Skgne3EOLgQ4g0L2PpWuPyKcxpqTTuxKDa0hA5F2b7BpjeKcjhSuArXRWhSNzdjul4Y66CAXVNASaAc9arq3ZzvcyRjm1vtug33UAMTYjVuh3ybw2ElZrBnRvccbN7vb3cFC/g0YHAOaynBeb+J2gKPcl0obvyo5/c4yHN1jzda17jjgCScBU4U5CiTNpoaHkPDcKO1cKt3Gmu67qK7Cx5xiO0yWnebznANaC6lALt4uIGJIbjzlbDM6mto1sJDAQQ2800A36lMKVG+tIw+jCe5E6Ec6UV+ThrNmw2QkRtkeaVIaLxptoAsb834waEuBGokVHOKLs2Zcj36V5Y8NkiEdWFrZKgxm+XUpeJZjQa1vyZ2xuFXWZodvl88Frq8O9U1OLqcHlXSx3IdvBP5Kx+5XRyDFx3dYSsyDFqe7rCsQ5z2ehAs2BkDjUNJNHMdU44EXSAMdIx0p1jzlhc9omioBQ3rkeBG+40Axq10bfsp/Ih0aS14H9letyBFx3Y8oxWeXNlraOc57ajCoAFNVMF3YziguvbvF4uYBfe1lXkMLSXhtA3Eg4bE/4RxONTERS8GuayK8wO3vQDgcWP08dR/I54EH+j/ZXpzdipS+/rHYnfB+LTef1jsU9bZA+R72tuhziQ3ignAYLAVw5NH0IbPtmk3BEG7N6La7rHYk8RRbXdY7FMPTFG/IsWzrX0oivEMP73WnDIUOx3WpNATfkT8BaLyojfEcOw9aXxLDxT6RUiUib0iVZWq8qNAWCOPFgoThpOhZAstp0Dn9xWELPUbzqW06cILEOQ5CELgtBOCRKFJKHBNenBI5dI7MDwsBWw8LA5Woz1C3dwYcC1efH/AEuVrqqdwb9XavPj/pKtZbIcjxV/9RIEIQujGCEJHIDgd2G3fo6WFrS589GMAwxBDiankaV5jtNkkjwexzfOBC9c5wZvR2pm9yioBqCDQtNCKtI0HEri7TufSM/VTkjZK2vrb2IDzpRFFd9rzEl+fZYJOVoa09ZDVFWjMeL59hcOVjnf4uKAqWiFZUuY9l1ttMfrH80fvWu7MayHRaZGn95rfyQFeoqu/O53Efk20Dzo6+xyxv3M3/MtcJ52vb7AUGThKpby7J25pa9UtnPNI8f1MCwP3O7aNG9Hmmb76JgnLOU3w7U4TO2ldE/MO3j6Jp5pIz71hdmVlAfszuhzD/kmETvy7kKLU/jHrKUWyTju6ypN2aVuH7NJ0AH2FY3ZsW0fssvoEphE8Sfdmj4bJx3dZR4dLx3dZWy7IFrGmyz/AHL+xN8R2r6tN90/sTCJ4s+7MIyhLx3dZTvGUvlHdZTvE9p+ry/dP7Enim0eQl+7f2JhDjVPUxPGc3lHdZTxlSbyjutM8WT+Rk+7d2I8XzeRk9B3YmETxqnqY45Um8o7rSeM5vKO6yk8Am8lJ6DuxAyfN5GT0HdiYRHGqep/kDlGbyjusppt8vlHdZTvFs/kZPu3diPFc/kJfu3diYQ4tT1P8jfDpeO7rKabZJx3dZWYZItJ0WeU/wAN/YneJLV9Wm+6f2KMIcSfdmsbU/jO6ymmd3GPWt5ub1rP7NN927sWVua9tP7NJ6NPamERxJd2NyE8mTE6iuhC0ck5rW1r6mzvGB4o96mxkG1+SpzuYPesdem3LRHotlXUIUWpvXJp1S1W+M3LXxWDnkb2pfg3adboh/Er7AqlSl2Ppf5CgvMjQQpEZuyfOniHS4+5OZkFteFaAfNafeV2qMjl7Vt15iNvBMdIpuPN+M/Pmd5rMOsNK2oc2AdFnmd5xLfwrtUGVS21QXLU5SWYLWElTRoJPIK+xWFBmdKfk2WJvLI4H8Sl7HmJO6gdI2MbImaOk0HqVqoswVttJ9KE3E7bvRnhe0tc8te2utrRddhqxIVuRzArkc3M0Y7KS5l4vdg57zVxGwUAAHIBqXVWeG6rksI+HWqurNzfibSEIUlQIQhAJRNLAnoQGF0DdixusTDqW0hARz8lsOpYZMiRnS1S6EBzz814T8xp5wCtWTM2E/Rt9ELq0IDjXZlQ8QesexYjmRHxT0OcPeu3QgODdmU39703dqxOzMA1v9IqwKIogK8OZx4z+v8AJM+CLx89/WOxWNdGxJcGxAV38F5holkHV2Jzcg2kaJ5R1disK4NiLo2IDg48nW1ui1Sjq7FkbZcofWpOpvYu4uDYi4NiA4nesofWn+gz8KDHlH6y70GfhXbXBsRcGwIDiN7yj9af93H+FIYMofWpPRYP8V3FwbAi4NgQHCmxW86bVL/L2LA7ItrOm0ynpHYrB3sbEb2NiAro5uTnTPJ6uxJ8FZDplkPSOxWNvY2IDBsQFdDNB3Hf1/kn/A08Z/pFWHdCKICv25ljXePO93asrcymcU+k/tXd0RRAcQzMmLiDpqfaVsR5mwj6NvohdfRLRAcvFmpCNDG+iFtx5AYNAAU6hTkES3IzVmZkxg1KQQoBqiyM2LMIhsWRCAbdSgJUIAQhCA//2Q==",
        precio_oferta: 13900,
        tags: ["acabados", "masilla", "pintura"],
    },
    {
        id: 25,
        nombre: "Cable THW 12 AWG Rojo",
        slug: "cable-thw-12-rojo",
        descripcion: "Cable THW calibre 12 AWG, rollo 100 metros color rojo",
        precio: 89900,
        stock: 30,
        tipo: "variable",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Cables",
        subcategoria_slug: "cables",
        marca_nombre: "Procables",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["instalacion", "cable", "electricidad"],
        atributos: {
            calibre: ["10 AWG", "12 AWG", "14 AWG"],
            color: ["Rojo", "Negro", "Blanco", "Verde"],
        }
    },
    {
        id: 26,
        nombre: "Tomacorriente Duplex Blanco",
        slug: "tomacorriente-duplex",
        descripcion: "Tomacorriente duplex 15A 125V, placa incluida",
        precio: 5900,
        stock: 100,
        tipo: "simple",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Iluminación",
        subcategoria_slug: "iluminacion",
        marca_nombre: "Leviton",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 4900,
        tags: ["instalacion", "toma", "electricidad"],
    },
    {
        id: 27,
        nombre: "Interruptor Sencillo",
        slug: "interruptor-sencillo",
        descripcion: "Interruptor sencillo 15A, marco y tapa incluidos",
        precio: 4900,
        stock: 90,
        tipo: "simple",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Iluminación",
        subcategoria_slug: "iluminacion",
        marca_nombre: "Leviton",
        imagen: "https://media.falabella.com/sodimacCO/144965_1/w=1160",
        precio_oferta: null,
        tags: ["instalacion", "switch", "electricidad"],
    },
    {
        id: 28,
        nombre: "Panel Eléctrico 8 Circuitos",
        slug: "panel-electrico-8",
        descripcion: "Panel de distribución 8 circuitos con breaker principal",
        precio: 129900,
        stock: 15,
        tipo: "simple",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Iluminación",
        subcategoria_slug: "iluminacion",
        marca_nombre: "Square D",
        imagen: "https://electroservimos.co/845-home_default/tbtr8pb-tablero-8-circuitos-125a-con-puerta-blanco-retie-tercol.jpg",
        precio_oferta: 119900,
        tags: ["distribucion", "panel", "electricidad"],
    },
    {
        id: 29,
        nombre: "Breaker 20A Bipolar",
        slug: "breaker-20a-bipolar",
        descripcion: "Breaker 20A bipolar para carga pesada",
        precio: 18900,
        stock: 40,
        tipo: "simple",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Iluminación",
        subcategoria_slug: "iluminacion",
        marca_nombre: "Square D",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["proteccion", "breaker", "electricidad"],
    },
    {
        id: 30,
        nombre: "Lámpara LED Panel 60x60",
        slug: "lampara-led-panel-60x60",
        descripcion: "Panel LED 60x60 cm, 48W luz blanca neutra",
        precio: 89900,
        stock: 20,
        tipo: "simple",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Iluminación",
        subcategoria_slug: "iluminacion",
        marca_nombre: "Philips",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRAlR3q9deoThavQjBuxSTGUqS_49RJxxgGA&s",
        precio_oferta: 79900,
        tags: ["iluminacion", "led", "electricidad"],
    },
    {
        id: 31,
        nombre: "Cinta Aislante 19mm x 20m",
        slug: "cinta-aislante",
        descripcion: "Cinta aislante PVC 19mm x 20 metros, varios colores",
        precio: 3900,
        stock: 150,
        tipo: "variable",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Cables",
        subcategoria_slug: "cables",
        marca_nombre: "3M",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 2900,
        tags: ["aislante", "cinta", "electricidad"],
        atributos: {
            color: ["Negro", "Rojo", "Azul", "Verde", "Amarillo"],
        }
    },
    {
        id: 32,
        nombre: "Tubo PVC Eléctrico 1/2",
        slug: "tubo-pvc-electrico-12",
        descripcion: "Tubo PVC conduit 1/2 pulgada, barra 3 metros",
        precio: 7900,
        stock: 80,
        tipo: "simple",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Cables",
        subcategoria_slug: "cables",
        marca_nombre: "Tigre",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["conduit", "pvc", "electricidad"],
    },
    {
        id: 33,
        nombre: "Arena Fina x m³",
        slug: "arena-fina-m3",
        descripcion: "Arena fina lavada para construcción por metro cúbico",
        precio: 45000,
        stock: 999,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Materiales",
        subcategoria_slug: "materiales",
        marca_nombre: "Argos",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["obra", "arena", "construccion"],
    },
    {
        id: 34,
        nombre: "Gravilla x m³",
        slug: "gravilla-m3",
        descripcion: "Gravilla triturada 3/4 por metro cúbico",
        precio: 52000,
        stock: 999,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Materiales",
        subcategoria_slug: "materiales",
        marca_nombre: "Argos",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["obra", "gravilla", "construccion"],
    },
    {
        id: 35,
        nombre: "Ladrillo Bloque 10x20x40",
        slug: "ladrillo-bloque-10x20x40",
        descripcion: "Bloque de concreto 10x20x40 cm, resistencia alta",
        precio: 3200,
        stock: 500,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Materiales",
        subcategoria_slug: "materiales",
        marca_nombre: "Argos",
        imagen: "https://ferreteriaabg.com/wp-content/uploads/2025/07/Anadir-un-titulo-2025-09-27T113952.657.png",
        precio_oferta: 2900,
        tags: ["mamposteria", "bloque", "construccion"],
    },
    {
        id: 36,
        nombre: "Varilla Corrugada #4",
        slug: "varilla-corrugada-4",
        descripcion: "Varilla corrugada #4 (1/2 pulgada) por metro",
        precio: 8900,
        stock: 200,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Materiales",
        subcategoria_slug: "materiales",
        marca_nombre: "Acerías",
        imagen: "https://www.construramacolombia.com/medias/?context=bWFzdGVyfGltYWdlc3w2NTM3MnxpbWFnZS9wbmd8aW1hZ2VzL2gxNS9oODMvOTM2MjAwODg2Njg0Ni5wbmd8NzdkMGNmMTc0MTM4YWQyMTAyYjVhY2QyZmMzNTkyOGRhMzZlZWFkODVmZjE4OWEzZDM4Y2RiNTJjMDAxOTU5Mg",
        precio_oferta: null,
        tags: ["acero", "varilla", "construccion"],
    },
    {
        id: 37,
        nombre: "Malla Electrosoldada 6x6",
        slug: "malla-electrosoldada-6x6",
        descripcion: "Malla electrosoldada 6x6-10/10, hoja 2.35x6 metros",
        precio: 129900,
        stock: 25,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Materiales",
        subcategoria_slug: "materiales",
        marca_nombre: "Acerías",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 119900,
        tags: ["acero", "malla", "construccion"],
    },
    {
        id: 38,
        nombre: "Pegante Cerámico 25kg",
        slug: "pegante-ceramico-25kg",
        descripcion: "Pegante para cerámica y porcelanato, saco 25kg",
        precio: 28900,
        stock: 40,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Acabados",
        subcategoria_slug: "acabados",
        marca_nombre: "Argos",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["pegante", "ceramica", "construccion"],
    },
    {
        id: 39,
        nombre: "Estuco Fino 25kg",
        slug: "estuco-fino-25kg",
        descripcion: "Estuco fino para acabados de paredes, saco 25kg",
        precio: 24900,
        stock: 35,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Acabados",
        subcategoria_slug: "acabados",
        marca_nombre: "Pintuco",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 22900,
        tags: ["acabados", "estuco", "construccion"],
    },
    {
        id: 40,
        nombre: "Tubo PVC Sanitario 4",
        slug: "tubo-pvc-sanitario-4",
        descripcion: "Tubo PVC sanitario 4 pulgadas, barra 6 metros",
        precio: 45900,
        stock: 30,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Materiales",
        subcategoria_slug: "materiales",
        marca_nombre: "Tigre",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["fontaneria", "pvc", "construccion"],
    },
    {
        id: 41,
        nombre: "Casco de Seguridad Blanco",
        slug: "casco-seguridad-blanco",
        descripcion: "Casco de seguridad con suspensión ajustable y barbuquejo",
        precio: 22900,
        stock: 50,
        tipo: "variable",
        categoria_id: 5,
        categoria_nombre: "Seguridad",
        categoria_slug: "seguridad",
        categoria_icono: "🛡️",
        categoria_color: "#E17055",
        subcategoria_nombre: "EPP",
        subcategoria_slug: "epp",
        marca_nombre: "3M",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 19900,
        tags: ["cabeza", "proteccion", "seguridad"],
        atributos: {
            color: ["Blanco", "Amarillo", "Naranja", "Azul"],
        }
    },
    {
        id: 42,
        nombre: "Gafas de Seguridad Antiparra",
        slug: "gafas-seguridad-antiparra",
        descripcion: "Gafas de seguridad antiparra con ventilación indirecta",
        precio: 12900,
        stock: 65,
        tipo: "simple",
        categoria_id: 5,
        categoria_nombre: "Seguridad",
        categoria_slug: "seguridad",
        categoria_icono: "🛡️",
        categoria_color: "#E17055",
        subcategoria_nombre: "Protección",
        subcategoria_slug: "proteccion",
        marca_nombre: "3M",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["ojos", "proteccion", "seguridad"],
    },
    {
        id: 43,
        nombre: "Botas de Seguridad Punta Acero",
        slug: "botas-seguridad-punta-acero",
        descripcion: "Botas de seguridad con punta de acero, suela antideslizante",
        precio: 89900,
        stock: 30,
        tipo: "variable",
        categoria_id: 5,
        categoria_nombre: "Seguridad",
        categoria_slug: "seguridad",
        categoria_icono: "🛡️",
        categoria_color: "#E17055",
        subcategoria_nombre: "EPP",
        subcategoria_slug: "epp",
        marca_nombre: "Bata",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 79900,
        tags: ["pies", "proteccion", "seguridad"],
        atributos: {
            talla: ["38", "39", "40", "41", "42", "43", "44"],
            color: ["Negro", "Café"],
        }
    },
    {
        id: 44,
        nombre: "Arnés de Seguridad Completo",
        slug: "arnes-seguridad-completo",
        descripcion: "Arnés de cuerpo completo con 5 puntos de anclaje",
        precio: 159900,
        stock: 20,
        tipo: "variable",
        categoria_id: 5,
        categoria_nombre: "Seguridad",
        categoria_slug: "seguridad",
        categoria_icono: "🛡️",
        categoria_color: "#E17055",
        subcategoria_nombre: "EPP",
        subcategoria_slug: "epp",
        marca_nombre: "3M",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWCz8HBorymhHOVr8vUgm_rkxalTAFTAFbmA&s",    
        precio_oferta: null,
        tags: ["altura", "proteccion", "seguridad"],
        atributos: {
            talla: ["S", "M", "L", "XL"],
        }
    },
    {
        id: 45,
        nombre: "Mascarilla N95 Paquete x10",
        slug: "mascarilla-n95-x10",
        descripcion: "Mascarilla N95, paquete con 10 unidades",
        precio: 18900,
        stock: 100,
        tipo: "simple",
        categoria_id: 5,
        categoria_nombre: "Seguridad",
        categoria_slug: "seguridad",
        categoria_icono: "🛡️",
        categoria_color: "#E17055",
        subcategoria_nombre: "Protección",
        subcategoria_slug: "proteccion",
        marca_nombre: "3M",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: 15900,
        tags: ["respiratoria", "polvo", "seguridad"],
    },
    {
        id: 46,
        nombre: "Conos de Seguridad x4",
        slug: "conos-seguridad-x4",
        descripcion: "Conos de seguridad reflectivos 45cm, paquete x4",
        precio: 34900,
        stock: 40,
        tipo: "simple",
        categoria_id: 5,
        categoria_nombre: "Seguridad",
        categoria_slug: "seguridad",
        categoria_icono: "🛡️",
        categoria_color: "#E17055",
        subcategoria_nombre: "Señalización",
        subcategoria_slug: "senalizacion",
        marca_nombre: "Truper",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrd6yp7ONlC85WbNw5GEElpM04LDWd5_l53w&s",
        precio_oferta: null,
        tags: ["vial", "conos", "seguridad"],
    },
    {
        id: 47,
        nombre: "Curso Fontanería Básica",
        slug: "curso-fontaneria-basica",
        descripcion: "Curso completo de fontanería residencial, 10 módulos",
        precio: 49900,
        stock: 999,
        tipo: "digital",
        categoria_id: 6,
        categoria_nombre: "Digital",
        categoria_slug: "digital",
        categoria_icono: "💻",
        categoria_color: "#00B894",
        subcategoria_nombre: "Cursos",
        subcategoria_slug: "cursos",
        marca_nombre: "Propia",
        imagen: "https://www.forplan.es/wp-content/uploads/2025/05/11.webp",
        precio_oferta: 39900,
        tags: ["curso", "fontaneria", "aprendizaje"],
    },
    {
        id: 48,
        nombre: "Plano Casa 120m²",
        slug: "plano-casa-120m",
        descripcion: "Planos arquitectónicos casa 120m², DWG + PDF",
        precio: 69900,
        stock: 999,
        tipo: "digital",
        categoria_id: 6,
        categoria_nombre: "Digital",
        categoria_slug: "digital",
        categoria_icono: "💻",
        categoria_color: "#00B894",
        subcategoria_nombre: "Planos",
        subcategoria_slug: "planos",
        marca_nombre: "Propia",
        imagen: "data:image/png;base64,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",
        precio_oferta: null,
        tags: ["plano", "casa", "arquitectura"],
    },
    {
        id: 49,
        nombre: "Curso Construcción en Seco",
        slug: "curso-construccion-seco",
        descripcion: "Curso técnicas construcción en seco, drywall y superboard",
        precio: 54900,
        stock: 999,
        tipo: "digital",
        categoria_id: 6,
        categoria_nombre: "Digital",
        categoria_slug: "digital",
        categoria_icono: "💻",
        categoria_color: "#00B894",
        subcategoria_nombre: "Cursos",
        subcategoria_slug: "cursos",
        marca_nombre: "Propia",
        imagen: "https://www.capacitacionifad.com.ar/images/cursos/construccion-en-seco/foto-vertical-construccion-seco.png",
        precio_oferta: 44900,
        tags: ["curso", "drywall", "aprendizaje"],
    },
    {
        id: 50,
        nombre: "Pack 50 Planos Arquitectónicos",
        slug: "pack-50-planos",
        descripcion: "Pack con 50 planos de casas y edificios, formato editable",
        precio: 149900,
        stock: 999,
        tipo: "digital",
        categoria_id: 6,
        categoria_nombre: "Digital",
        categoria_slug: "digital",
        categoria_icono: "💻",
        categoria_color: "#00B894",
        subcategoria_nombre: "Planos",
        subcategoria_slug: "planos",
        marca_nombre: "Propia",
        imagen: "https://img.freepik.com/vector-gratis/plano-bosquejo-arquitectonico-casa_23-2148307429.jpg?w=360",
        precio_oferta: 99900,
        tags: ["planos", "pack", "arquitectura"],
    },
    {
        id: 51,
        nombre: "Sierra Circular 7.1/4 1400W",
        slug: "sierra-circular-1400w",
        descripcion: "Sierra circular 7 1/4 pulgadas, 1400W con guía láser",
        precio: 249900,
        stock: 12,
        tipo: "variable",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Eléctricas",
        subcategoria_slug: "electricas",
        marca_nombre: "Makita",
        imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMVFhUXFhoaFxgWFRoVHhggGBgWFxgaFhgYHSggGholHx0YITMhJSkrLi4uGCAzODMtOCgtLisBCgoKDg0OGhAQGysfHx0tLS0tKy0tLS0vMC0rLS0tLS4rLS0tLS01Mi0tLS0tNy8vKystKy0rLS0tLS0tNy0tN//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABBEAACAQIDBAcEBwcDBQEAAAABAgADEQQSIQUGMUETIlFhcYGRBzKhsSNCUnKSwdEUM2KCwuHwFVOiJENzk7IW/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECBQYEA//EACwRAQACAgEBBQgCAwAAAAAAAAABAgMRBCEFEjFBgRMiUWFxscHwFNEykaH/2gAMAwEAAhEDEQA/AO4xEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBETXx+NSijVKjBVUan8h2k9kkzERuViJmdQ2InM8bvZVrElWaml9FU2I+8RqT8JqUtqVb3FWoD3O36zTZO2sdbaiszEebaV7Jy63aYh1eJSNj73Mhy4jrL/ALgGq/eA4jvEulGqrqGUhlIuCDcHwmx43Lx8iu6T6ebw5+Nkwzq8evk9xET0vgREQEREBERAREQEREBERAREQEREBERAREQERIPefeOnhE+1UYdRP6m7F+cwvetK9606iGePHbJaKUjcy3dsbWpYamXqmw5AcWPYo5mcx23tmpi3zPog9xAdB3ntbvmnjMZUxDmpWbMx4dgHYo5CY7zmud2hbN7telfv9XT8Ps+vH963W3x+H0/tgqHIb8uf6zYVuYmGu3KadCvkOU+6eHd/aeCKTaPm2PjCUvmB119beR+cmt0ttnCvkdmakx1B1yk/WX8xz8ZXUqa3HD5zYvcS48t8N4tSdPjmw1yUmlo6S7RTqBgGUggi4I1BB5iepzzc/ePoiKNU/Rk9Un6hP9J+BnQwZ1vF5NeRTvR4+cOT5XGtx792fSfiRET0vMREQEREBERAREQEREBERAREQEREBETy7gAkkAAXJOlrdsCN3i2ymEomq2p4It7Zm5Dw5nuBnIcTinrVGq1WzMxuT+QHIAWsJub17cOMrlh+6Tq0wezmx72t6WkMKhbRQT4Tn+XkvycncxxMxH7t1XC4+Ph4u/lmItbx39m01dRwM8ftE8nCgW6XOL9lh8/0kzT2JQsD9LqL+8PyExr2RmmPJLdrcWvnM+ivV69pGVNoKWK6m3E8h3GXN938O31nHif0tNF9waZH0dUj4/O/znswdm93/P8A48+btimo9j4/NEYTF/VPkfym/QxNj3T5S3KrBsrV1Cj3WyFj4MA17cdRfw5zX2tgmw1To2dXGUMrroGB7jqCDcEHX1E8XJ4M16thxubize7vqkzrLzuRvFmth6p1/wC2x52+oe8cvSc02djb9U8uHhNsVSCCpsQbgjkRwnkwZL8XLv8AZhlyeLXkY5rPpPzd1iRG7G1xiaCvpnGjjsI525A8ZLzq6Xi9YtXwlx+SlqWmtvGCIiZsCIiAiIgIiICIiAiIgIiICInlnA4kDxNoHqc79oW9KkHC0GzEm1Urrw/7a9veeHLttL7/AG8K0MK3RVU6R2CDK4uAbkkWNxoCL8rznexdmvUPURmJ4tlKqO4MRaw7BrPjkrbJPcjpHnP4h6sFqYo9rPW3lH5n8QxYTZ+bWpw+yOHmecsuz9nGwyJYfhH95K7O2OlMAnrN2kaD7o/PjJOfXHjrjr3axqHxy5b5bd687lW8fhBQHTuodlstNePWYgA68+Q7L+mctW1z4anUsbE0KqsR23z5DfloJk3kGb9nT7WKo+iuGPwla2WUWqlVKmYvV6To3RqTOCKzBgVzqRepzt7mszfLSXrYrDL+8NSh/wCVGRfxVBY+Rm3h8OGANOojjkQbX8OM0cFtDF5yGcdG9QkvQH7WKdwbUcqX4GwJt59a81cFicNVN6+FRaj1RTDUUenU1DOHc0yGVSo0FyTlY8BG00mcRiujIWopN/8ALg8DPFfCpWU2AYc1Yajw7DMuzKOdKi3LClXqIhY3JCkrYnmeV+dp4qUSDfUEc+yJiJjUkTNZ3CobR3fKNnoXIHFDxH3Tz8Dr4yPG1CptYecvtTr6NYPyPJv7yr7f2R0l2UWqjyzW5N39h9e7Wcrs+l/eiPRvOH2raPcy9fn/AG+YDaV+st1I5g5beYtJX/XcTa3T1LDnnIH4uJlA61tCQVNiOBFu2b2B2uQQKmvf+omntxslNzjmfpuW5mMd5jcf7WwbZxN7ivVP85/M6ya2TvxVSwrAVV7Row9AAfA28ZUs9xca+PCfC/f5CfDHyM2OdxaTJxMOSNWrDtGzNpUsQmek2Yc+RHcwOoM3JxPZ21KlBxUpGzd5vcdjDmJ2HZOOFejTqgWDqDbs7R63nRcLmxyI1MatDnOdwZ407id1ltxET3NeREQEREBERAT4TafZCb67T/ZsFXq8whA8ToIHKd8/aXiGrvSw5VaSMVv1rtbQ+6w09ZDbCxVbE53c01VSBdaFIlmPK7KeVz5SnXOp5n85fti0uhw1McyM58W0X0Av5wqe3fosa2UFmUDrm+QDw6MLre3x7DLglC3uk372Zge45ifXjNDd/A9DSAPvt1n8ezy4eslBLpH1TcXiauKxtOjTapVcIilizMbAdY+p5WGplDr7+VMQ7LhUyU1R3zP77ZMgFhqEBzd58ImdLEbXTbWCdxTelbPSqZ1DcDpYg+XfK7VwNNCnSYKrTy3Gai61lsQBY9OLgADQJ7tzbjNnZOzg6PWerXVlGZ71OnF7uCFWqp+z7oCnrAWBk3QqsCFWrh6hIUgHNQNnAy3ZSwubrpbmNNZO8aVdKVEthyuJo/QrkWnWpthDUAtlDFtHK2UiwsSo0m3svC4+k+GX6QoSBVcsKqm5GurVGK2BsQUAzXIHOexFAN+9wz2PFkCVgfOmQ5/DIobIwd7U6hok8UWo+HJvxul6bH4y7RIbp64YP/uPUqf+yozfnJOvQDePbGFoLTRUQWVQAAOQ8pkvAhsRh+IP+d4mjiaWbQ++Boftgf1CWLE0sw75EYilfTgQdD2GVj4KVtjZ4N6g0e2pHO32hzHx9LGuugN7CxHEdneO0S+7RT69ra2Ydh/Q8ZU9qYOxGU2+yRy7VPdNZy8Xcn2kev7+/dvuzOV3o9lb0/pr7NrkAg6jlJBK1+EiqVCpfUX77iSmEQAqGNhcZiOQvqR5TUZ61mdxMdW8reYrrUtjD0WchVBLMbADUk9gnathYE0MPSpHiqAHx4m3neYdi7v0MMPo061rF21Y+fLwFpKzccHhzg3a09Zcxz+d/I1WI6QRETYNcREQEREBERATm3tyx2TB06QP7ypr4KLyxb1b84bAN0dQVHqFQwSmnIkgHMxC8Qed5yf2hb6rtFKYGGan0bEhmqA3uOGVR+cCl7Nw/SVVTtOvkCfyl73doVXxP0zqyLlKhVygBBbUcTc5Bqe2UfZ+Iam+dMhaxHWBtr6SawO8LpfNT480b8j5c+ULDrqYkdo9ZsmuALk6f5/lpyijvKDxYj7wt/abWN3sNKnmR1ZuCC9xm5Mw+yvHxHgZNsu61vaptA1K1KgrE5FL1EBuFZySM1tCwW3hfvmXcDAZrOr5GW+oAOhtcEMCCui+g4SlUK9ZKjVMwqMxLObh8xOpJHGWHd7bNqgKgLfiAbg+XKY2ifFlSY1qXWaWBc2Jp4arwHBqBIUggEDOrAEXsbCfKuFARqbU8VRptkuEVay3QpZlalmdeqiryFgDa/HDsXaRNprDeBEYe91rn6NjcEsbZ1uAAeTHQ93GInbG0aSNIq4Ip4gVD9EDRpuKBUUyMwprcOl+wnuvPRq4lcwr6qBTF3p9JTF1pio5sgzWbP8AXHG+UAXm5TqCon0yK/WtaqqkjqobHS1xmPDsn2nhKYtk6ajfh0dQ5RqB7rEp/wAZkjSTaSqWXIqpTyAsmit0hRVNOnr1cxa+ugA4k6SStz4zVq4So9vpaFcchWpZG+q2lSmdNcp9ziBMidINHo5O8VelUnsBazi/etpYRnmnjaP1vWZqbEgG41HZ8teHrPrG4sRx7Dcfr8JUQGNoi/cwyt/SfXTzlYxmHvdTxv8AGXHEUrgqfCQG2qPuVPtAhvvKbH10PnMclYtWYllivNLRaPGFXV+Vp7PAljYAXM2atIXv2zFXNrDtYD5n8pzE459v7L56dj/Kr7D2sfDbpXs221WrrUSqSQgQqX1YZs4IY8/d56jWXaUb2UYcihUqNa7Mq6cDkW9x3XYy8zo8Ne7XW96393JZ79+/e1Eb14fQiIn1fEiIgIiICIiBpY/ZGHrkGtQpVCBYF6auQOwEjhI6puZs9uODw/8A61+VpNV66oMzsqqOJYhR6mUzavtX2XRuBXNVhyoozg+D2Cf8oGLbXss2fUDNTDYc2NyjdQeKMbAfdyzi1O+FxFUYatTropyuwTOjryNnFjbWxHAg2JHHom/ntNw2JwC08KzF8RmWqh0akqqSVfiOsco0Jupa0ovs6rCnXa/Bl4nno17yjW2SaJoVukZunDJ0aEkDLcZiNOsdSCL6WB5zA1NWuLd15ftp7r0K13oEU37PqHut9Xy07pSq2CqU3KMjhr+7lJJ+6Bx8rgyCCYEHsIPLT0knTrqlSnWt7yZmUWXM4LhrchfKzeemuk2sFupiqze4KeYn94cttLm4+rYa2axnS9ibi9ClnWlXUra2o/luTYg6m+mpOkCNqbco4UKay1VvVFMHJcXJcBr393qE9tiptrLVS2NmABC5goViLqWUC2Vhrf1t3cLStXB06iLnoqbMpCOAQrAix4EAjiCPKUXeLeCpVqMlFmWmpsMpsWtxLEcr8r2mMQzmy7YXAGnTCKGyroLspY6AXYjQ6Ly117Z7NLKezTvB0zKO88AZyjD7Qq02zUqro411JKn7y3swPaNe+dN3S2+MZQzEZXUlai8bMOPlz8DLpjtuhDzVG4XscrX1ve/M6+vYJsYVBZhZgOFj63Gg7ewcJkNBSQbC/aNPW3lPiV1YkKykqbMAQSp7GtwPcYGgoykr339ePxufMT7fkeZt36/MfKZMYLMrdunrp8wsx8x5j/PhKjQxo1v2/Maf3kTj6WalUUC5Uq6+fUa3wk1tFdPAg+vV/ISOpH6Rf4gyn0zD5SiuYvZ7BQw1Fr94019PXuk7uhuguJXpsSrdGD1Fvlz8QSeeXW3frNjbNEKoqjQaZwOYPMd4mYbwtRwb0Q302foqPM2e+o7Qlnt4KOc8luHSc0ZfN7K83JGCcMeH4XTZiUVphaGTowSB0ZBFwTm4c73v3zblE9mGK0q0eAXKyDs0ysLHUG4W8vc9UPJJERCEREBERAREQKJ7W93XxuHpBVZwlQs4T3gCpAZVsc1jbS3PxnG6m5wDELUOmhDLYqe+3Hnp1fGfp+aW0NlUK/72kj95Go8GGo8jKORbrbkbK6pxGKdn0srD9lUG99Dc3Pg5ll3t3TwlCjROFo06V6tiyDU5ka124nhzPOSeP3ApHWjUZO5uuv5N6kyuY/djF4dTYE0x1j0TnKLa5imlz/KYEOcLVTgbyO29tOuKQUMyddQ1rgkG+l+QkzR2q40YK3j1D52Fv+ImtvC6VqDgBg4sVut7271uPW3CBI7vY4VEVACAOGUlbfhliw1GxBzNYfyn1TLft1B5ynezdwQe0G3h4y57awxNO2UGnf6Qam6kEEZRxHr4GYqkRiQwUhha4Omob05eH9jxjbGenU6IpmXMyVLZidDYDqnQE36x4WE6PsiqErdCKgKspZVY3YNcHqtrmBBYkEk9X701t7d1zWJrUrZ7AOp+vbQEHk3AdhsOHOx0HKNmIy1WC3KByFJ58QbeQubfZEvvs+ruuJxCqer0asfvZTa4twsNbWPCRtLd/FsQ3QMNNC5AsPM3HkJP7v7PODzM+ruQWPDhawH8Og07omSIXf8A1OmGKuShBIGcFQ1jYlTwIkLtbZNSrULpkcF83VZbr1KCKxLDT3HN16wupHMT3T3lpNdGOUkaXFwOV9dDMaVKYK5ejJYmzUXaj8rpc3Oh427tINylhGD12vUy9KOjV3ZltkpuWXOTYFyw0NtLcpsBr2I7fkQSO46THgHd1vTrFgOVRVIIPEF094W4Ea3Gt9ZmpYZ9S4VT/CxIIHfYH1BgYcYOqfun4Ff1MhKz2KnsYfmD85nxm8OHSmTVqincZQahCi51sCNOXwkVWxiVVApOlQsygZXDXJNhwMqLKtMVKAHJkt8xKtSrhKmHrMB1GXNflkORvghPiZKHbfQKtMLmKXDWXNwJv9dbeAzHz0kDUrKwJFijOzqRqOsVVgQQCCtm0OoNxErC1brIKe1sWg4A1NP/ACGlX/rl/nF8Dt84FziujNS4yAFsoYtl1LEEmyIQDY8FEvm73tBweLKpmalVYgBKgtcnQBWF1JvyuD3SQStkREqEREBERAREQEREBPjKCLHgZ9iBzbE4BVZqTqG6NiouL6cVI7OraaNXY6n3GK9x6w+Ovxlu3wwdmWuOBsj/ANJ+Y8xIFWgVDE4wUcR0TXWpbqstxmB+yw1t3Xk3S3jrqQGcNb6rrlJHla/iQ01t79jHEUw9P99T1T+Ic1/Md/jMGw9tivRWm97q1mGXNbQjUFWA8xy4xKrDsvbVAPmqUhTa1i6rmtfjquuvcg9BJzE4pKlJxSZXJVgMrcCRbrFQcvHmJV/9HDEENZLi7L1gt+ZClhbu6nlNfaWympEEMtQWBV1BXjqCCeqPxQLHu0MR0bDEXZg/VJKtdSq2sy6HXNxN/hI7eHaNOmGzFCRfQak6kWso0t5nWRFPbFVBbpDqLfSC9+Rs56x7NGtM5x6OuSrT6p006w9DYjyvJo2h9kbYw+JfonBpuT1D7wbu01DeIkrid1qqHNSYj7unfrKhvLsZF69Jsy8rmzL3ENY+fP5232cb3dJ/02IY9J9RmYnNb6pudG+fjGl21KO1sdhTYgFSdQVHzGvZJSlv1nR0aiwqZGsFPE5TYa8Ly8VcOrCzKD4iVLejA0abIKaAORdrchwA89fSRHOdh7Hxe2WrqmS4CkO5ZUp2bSmtlJBIJ7zY3mXB7lDD1KlDGU0aqjKwemzFRcAhcwynNwNiODDvtaG2JtJ6fTbNOVlfrfSZC3VN8qsMjHUXLW5eVQ29tXaaVVOKzpXOhFSkgFQLzBUZWAA1Knz7MokmOia2jSqmqrJfLpcBiO59OZK8Ow66cZhq7Tp0WcOOkYnMqAA3YIoqNbs6vwMgMTvBiKihLol7Z3QG4Btwu3Gx4DW4tMu9uxMJRpYVsNiTXaqtQ1apNrECnkTotWp8W0a579LSjzidvnE61SVAN1UDQf37zLT7LcPQOO6SvWpr0YvSR3VS7EWGUE65esTbmVlC2bSNQ2UXsLnl2Sc3Zx2GoVKx2lgTXSoFCmwbowpa+UEaE3GoYcI6QP0qDE/N28O8VLDVKR2LiMVRplCXRqjMim4yhadQsOF73uOFuc6X7N/aS2PZcPWoOKwXrVaYzUzYcW/2yew3F+BkR0aIiAiIgIiICIiAiIgYsXh1qIyMLqwsf87ZzzF4ZqNRqb8V4H7Q5MP843nSJEbxbI6dLrYVF909vap7j8DApitK/trYbCp+04XSpxdBp0neOxvn48ZsEgkEEEGxB0II4gzIrSK8brb0o+jjLU4NcWOnI85K7dxlCkBWqVLBiFACZidDfKVsw0BPG3wEr+0dk06xzEFXHB10bz+0PGRO1dmYsoqpVJZDdKiNkcEqVNwSAQVJBGaFW6lRptRFRSjLUPLrBhYm5JUG9xYhgSMvGc83sxxw9YiiFUXAy200AJsoOnEcJb9gGqtBadXNmDOzMwVczOxYkKpIC6kWlU3u2BiatUmlT6RXbNe6gLcKLNmOnCES9DB1WUEhDcAkZrEZuHVOvqBxEjsdsemGBem1Jr6MLprx0ZeqTzln2YlXoKdOsEutibEvqtvdLe7e2tu02tM+OwyVqbU3F1Ya93YR3iUQmD23jqPu11rL9mutz5VEs3qTJ7dTGUsTUqnHBadTMpQGpZWBFrAm1yCOHYROYq1XCYhqFVmIvdTc6g8CLye2TixiMQtCkwbMcudtFzEMQLrxFxa9uJ5wjuSLTpJplRAL8lA5k9k4R7Yt6aGOq0qWGZWWiHLVeAYtlGSmx97gDpxvpwk3tvdCsENOtQdqfE9GzMhtrcqh/wDpZz7GbBo3OSs1OxItXpsqmxt1algPnLCoVq1tV1uoBuBa/ElfPnJrYm0dn9H0eMwlZmvfp6NfrdgHRPZMoHfrMH/52qp64GX7SnMD5/rIjEKFY27THQ66XL/T8CFNXC49XKi4o4hDQq94Q6JUNuwctJtYcGouYDxvoNOOsg9zN3KuPrLTpq+W4z1AoK0xzLEkXP8ACNTO67p7i0cGozsazr7pcABfuqNL95ufCY2jaxOlC2B7LDimFXEk06d72VchYdijiB3nyGt51zY+yKOFpilh6a00HJRx7yeJPeZvRKxIiICIiAiIgIiICIiAiIgQe8GwRW69Oy1QPJx2N+spTqyMVcFWHEHj/nfOozQ2rsiliBZxqODDRh4Hs7jCufh57zzc2ju/Xo3IHSp9pBqPvJx9LyJWuDzkVt5p9zTXzT7mgZy4nzPNdqgHEzDUxY5awiH392OMRQzqPpaeq/xDmv5+vbK77N1P7SlwdKtK3Kx6VD56C380uddHv1wyniMyldO0A8o3E2X0mODW0RixP3dR/wAsvxl2adgmLEYdKgyuqsDyYBh6GZYhFN2luBSck0ahp3+oUDoO5QLEDzMr9P2O0WrK9ardBqyUwy5zpYEljlHHhOpRA1tnbPpYemtKjTWmijRVFgP7982YiAiIgIiICIiAiIgIiICIiAiIgIiICaWO2TQrfvKase21j+IazdiBWq25dA+69RO4MCPiL/Gax3HX/ff8I/WW6INqvR3IoD3nqN5gfIX+MmcBsWhR1p0lB+0esfxG5m/EDQ2vsqniEyPoRqrDip7u7unjYmxKWFUimDdjdmOpOpPkNeEkogIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgf/2Q==",
        precio_oferta: 229900,
        tags: ["corte", "madera", "herramientas"],
        atributos: {
            potencia: ["1200W", "1400W", "1800W"],
        }
    },
    {
        id: 52,
        nombre: "Linterna LED Recargable",
        slug: "linterna-led-recargable",
        descripcion: "Linterna LED recargable 500 lúmenes, batería 4000mAh",
        precio: 45900,
        stock: 35,
        tipo: "simple",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Iluminación",
        subcategoria_slug: "iluminacion",
        marca_nombre: "Philips",
        imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIRERESDxAQDxUSEBATEBATExITEBIXFhUWFxcXGBMYHSgiGBslGxYTIT0hMSkrLjouGB8zODUsOCg5LisBCgoKDAwLGg8PGjclHyUrODcrNy41Nys3NzgsKysrNSs3NzArMCs4Ky4rKy0rKzcrLi0zKzg4ODgtNTctLTcuLf/AABEIAOAA4AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcEBQgCA//EAEUQAAIBAgMDBgkKBQIHAAAAAAABAgMRBBIhBQcxE0FRcYGRBiIyNWFyc6GxFCMzQlKys8Hh8GKCkqLRJCUVFkNTZJPC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAIB/8QAGBEBAQEBAQAAAAAAAAAAAAAAABEBAkH/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAAfHGYmFKnOpUllhThKc5WbtGKu3ZavQiW3N42EpU4/JJwx1Wfk0qc7RitLurOz5O1+DWZ8y4tBMwVfPebibq2DpNXV1yk7tdCdtH2MnWxduLEU1N0MRQf2asLPsavdAbYGr2vtpUIZlRr1n9mnB6dbfBd5DnvCrq7eGpW5o55XXobtr3AWKCHbF3iYSpSlLFzhgqlP6SlOWZNczpysuUv0JX9HTKsDjIVqVOtSlnhVhGdOVms0ZK6dmk1o0B9wAAAAAAAAAAAAAAAAAAAAAAAAABofDupl2djH/481/Vp+Zzps6NqjlFuLejataS9KfH4nQu8adtmYx6a0cuv8Uorv14nOeCjLN4su/9LATjA7VqUY3pqmp/93JmmvVzNpdxFNubSrSnKUq9ZtvV8pO/xNhnq5eCf79LI/tTO3ql3oDzg9r4iE4zhia8ZRd01Vnf4kr/AOaa9eK5ZUpzt9NkyTl6yg1F9xBacZX+r3/obbCZ7c3v/wAgZG1Kjk7yd33dyR0Hu6qZtl4D0YanH+lZfyOccbGX1pd363Oit2c77KwOiVqCWn8La79OPSBJwAAAAAAAAAAAAAAAAAAAAAAAAABGd5PmvGezj9+Jzzs/yu06J3h+bcX7OP34nPOAinJ3XOBvF5P7/f7749tbi/3++f8AdyYbL2S67yReXS7k5Ssl1J66s0e1PB3EOc406UpZMl25QjpNtQ0lLncWuxARinxNxg+BjU9hYq6Xyatq9PFdnx4PhwTfVrwNhDAzp5VVpzpuSulJSi2upgYm0DoTdh5pwXsn9+Rz9j4pcEdBbsfNWC9k/vyAlAAAAAAAAAAAAAAAAAAAAAAAAAAAw9scjyFZ4lJ0lTm6qkrrIld6L0HNfhROFHFzWz4cpRvFxhNtVFdJtavrOltqUs9GtDIqualUjycvJneLWV+h8DlzaMEsRGLjNWVlBt9seu9wMzCeFOJpNP5FWXS4TqWfoeRJ27TC2r4ZYipUnUUatCU4qLyq1opNWTeqWsufnNxhsqjpy1PrlWt/cmjQbcqSv4lVPjfM12cF1gfBeFWKcoy5Su3F3i9NPFlHo+zOa6pNH3W3cTUtehVqWWjk2ktEvs+hdx8Nkpa8pGU/TTzWXXY2FBxa41JdCTqf/KA+3g/iKc8TTW0oOFHxnONNuVR2TaWj4XsdMbDdB4ag8IoxoOlB0FFZYqDScbJ8NGcu4S/LzVPSWXyX1aRXpeh1LsihydCjDk40clGnHko+RTtFLKtXouHYBlgAAAAAAAAAAAAAAAAAAAAAAAAADzON00+dNd5yxtSMY4lxjOWSLlFZvpLRbSb5rq1n1HVJzP4aU5R2piU5Rm1WrPlOi7byvn57da0uBkYVScfFmpL1Z/FSsRrwkje2aDnrwWe6046kiw9JOOtOMn0pU3/gj+36ej40/Tbh/cBi7FbUZZZcjx8WSu5d7Nphk7ayS/ll+bsafZ30ctFVTds7tePY9TcYWmreTFPpaiv8gfCjTjOuoVM04TyQeS3KRU2otrS2Z3sus6uhGySXMku45l8E6cpbUwijNUm8TQfKatSytScdFz2y9b1OnAAAAAAAAAAAAAAAAAAAAAAAAAAAAFE759jQoY6nXpp/6iEpVafNmTScl16adK9JexUG/f6TB8F4tTX+aN18LdoECwuPp5bOTg7eS3r/AHo0+2a0Xe0r/wDr/IyatGM4VVJXtGLXWn0ki2FsLBtp0aM9oqeEaqSl/p4YXEPh4ztnt6MzWj1uVzzfWbsV/haysrtJ3d0suX0fmbmhjoJWzX9F7P8AtRJ6vg7QjDBwxVJ4eMXU+XY6nLllK6bg1TteKvZXy2VyIVqFOLqck80VUShNqzlFN2eXmurOw65mWmbU/wBzOyKeIx9StVT/ANNThOlDmzybSk+qz06XfmRfJS+4Rv5Rj7uL+aocOMVmnZdPT7i6CWgAAAAAAAAAAAAAAAAAAAAAAAAAAFPb+F85gvFv4tTV8NJLVelX95cJT+/eL5TBt8HCrbrjKN/dJd4FbQfiV/UNv4V4l0aeHwlJuFONCM5W05SUm7t9Oqb7TUUvIr+ovijIWPpV6UKeJcoTpLLTrJN3j0SXYv0A+GwcbOnVgot5ZyUZw+rJPTgYu0aahKrGPBVFbqu7IzKc6FB5oTdeavl8VxivSaytJuM29W5RbfXcCz9wSfyjH+IorkqFmue8p6u3Tb3F1FL7g6NsRjpJP6LD5ne+rlUaXcmXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAqrfzR+bwU/s1K0LW+1GDv2ZPeWqQTfNQjLZzk4pyhWpuEraxbunbs0AprD7PpVYNOc43s2ozs3bhozXbQwHJeTOUvWS+KsbTZ2KlltOi5Lpisyf8qTZrdtZXwpOP8tgNfSk5O17dSNjRwlNJtycm7XTl0fwo1OGhr9G3/KblVJqFo07el6JdjswLU3DYe0MdUX1qlCGW3DJGcr9vKe4tcgO5SlFbNzJLNPEVs8rJOTTSV+paE+AAAAAAAAAAAAAAAAAAAAAAAAAAAAQre9G+zZ+2o/eJqQze35tqe1offQFK7Lm4TSTvGTtZ626mfLwiPeE8uHrR+J48IgNJgvKM3E1ZS0u1FaWWl+tmFgvKMqpxfWwL53Mq2y4e2r/AHidEH3Nr/a6ftq/32TgAAAAAAAAAAAAAAAAAAAAAAAAAAABDt7Pmyr7Wh+IiYkP3sebK3tKH4kQKQwnlw9aPxPHhEe8L5cPWj8Tx4RAaTB+UZVTi+tmLgvKMqfF9bAv3c55rpe1xH4kibEK3PeaqPtMR+LMmoAAAAAAAAAAAAAAAAAAAAAAAAAAACIb1/Nlb18P+LAl5Ed6z/2yvw1nh7en56H5XAo7C+XD1o/E8eER9MNFqcL/AGo/E+fhEBpMF5RlVOL62YuC4mZKDbdlzsC/dz3mqh7TE/jTJoQvc+1/wqgrptVMSn6Hy9TR9lu8mgAAAAAAAAAAAAAAAAAAAAAAAAAAACq9+uNlGGEpLhOVabfNeKhFe6cu8tQq/fpXfI4WmlfPOrNaJu8MiVnx+uwKy2bi3FLlYT04SUXNd8bvvRh7fxcJcJLtTT95lbKx101ZSa4qLWZdcXw7zX7aq+sutf4YGtwdVXvf3N/A3E8RePzcJN88msiXa9e5Gjw9TX6z7P8ALNxLEZIXdorpk/y/UC0dwWKlbHUX5MZYeqnzZpqpGS7qcS3Cp9wWNc6WMpvhGdCotEvpFUXRf/potgAAAAAAAAAAAAAAAAAAAAAAAAAAABWO+3DyccFUUW4QqVYylzJz5NxT68ku4s4rPfnQqPDUJwTcIVJqo1wi5ZcjfRqpK/S10gVVsjZ1KrT+cpxk89W0uEl48vrLVGrxNFKeKheTjB0VC8pNxuk3Zt35zL2XtRUlkk+Sd27VIvK7u7tNacWYmMq+NXmnGfLOm1lkmlltz9gGDQpK/GX9TM7ZdCMnWlKMZOM1lbSbXi8xgUKrT1SXXKxk0MUocoqearKbTajG6jpbyuAFybh8LNLH1XFqE5YaEJc0pU+Vcl2KpDvLXKt3C4WrHD4mpUi1CpVp8m+aTipKbXStYq/SmuYtIAAAAAAAAAAAAAAAAAAAAAAAAAAAB4q0ozi4zipRkmpRkk4tPimnxR7AEK2ju1wk7ug5Ye/1ElUo/wBEtV1JpER2puZqTfzdfC9boyh7lcuMAUjg9yFdPx8ZhoL+GjOfxlEmexd12Eo2deU8U1bxZWp0r+pHV9TbROwB4pU4xiowioxikoxikopLgklwR7AAAAAAAAAAAAAAAP/Z",
        precio_oferta: 39900,
        tags: ["iluminacion", "portatil", "electricidad"],
    },
    {
        id: 53,
        nombre: "Caja de Herramientas 19",
        slug: "caja-herramientas-19",
        descripcion: "Caja de herramientas metálica 19 pulgadas con bandeja",
        precio: 79900,
        stock: 25,
        tipo: "simple",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Manuales",
        subcategoria_slug: "manuales",
        marca_nombre: "Truper",
        imagen: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRNKFiYGri0W9R7AKotBNFZk5LDm2EP8-Ja34KWtN3oJ0H6utXd8ahkAk7bIsHoY_PAKOxZveDTICOvpEd6fM9H3XJchKi11xx9myVxGH28olL41Xhi_Ryd",
        precio_oferta: null,
        tags: ["almacenamiento", "metal", "herramientas"],
    },
    {
        id: 54,
        nombre: "Pintura Anticorrosiva 1/4 Galón",
        slug: "pintura-anticorrosiva",
        descripcion: "Pintura anticorrosiva para metal, base alquídica",
        precio: 22900,
        stock: 30,
        tipo: "variable",
        categoria_id: 2,
        categoria_nombre: "Pinturas",
        categoria_slug: "pinturas",
        categoria_icono: "🎨",
        categoria_color: "#4ECDC4",
        subcategoria_nombre: "Esmalte",
        subcategoria_slug: "esmalte",
        marca_nombre: "Comex",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_b-zVXx-StWjExpsdODgH17X8n1X0Nbj0Gw&s",
        precio_oferta: 19900,
        tags: ["metal", "anticorrosivo", "pintura"],
        atributos: {
            color: ["Rojo Óxido", "Gris", "Negro", "Blanco"],
        }
    },
    {
        id: 55,
        nombre: "Soldadora Inverter 160A",
        slug: "soldadora-inverter-160a",
        descripcion: "Soldadora inverter 160A, portátil con accesorios",
        precio: 389900,
        stock: 10,
        tipo: "variable",
        categoria_id: 1,
        categoria_nombre: "Herramientas",
        categoria_slug: "herramientas",
        categoria_icono: "🔧",
        categoria_color: "#FF6B35",
        subcategoria_nombre: "Eléctricas",
        subcategoria_slug: "electricas",
        marca_nombre: "Bosch",
        imagen: "data:image/jpeg;base64,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EQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/9k=",
        precio_oferta: 349900,
        tags: ["soldadura", "metal", "herramientas"],
        atributos: {
            amperaje: ["120A", "160A", "200A"],
        }
    },
    {
        id: 56,
        nombre: "Calentador de Agua 30L",
        slug: "calentador-agua-30l",
        descripcion: "Calentador de agua eléctrico 30 litros, acero inoxidable",
        precio: 289900,
        stock: 15,
        tipo: "simple",
        categoria_id: 4,
        categoria_nombre: "Construcción",
        categoria_slug: "construccion",
        categoria_icono: "🏗️",
        categoria_color: "#6C5CE7",
        subcategoria_nombre: "Acabados",
        subcategoria_slug: "acabados",
        marca_nombre: "Rheem",
        imagen: "data:image/jpeg;base64,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",
        precio_oferta: null,
        tags: ["agua", "calentador", "construccion"],
    },
    {
        id: 57,
        nombre: "Chaleco Reflectivo Clase 2",
        slug: "chaleco-reflectivo-clase2",
        descripcion: "Chaleco reflectivo clase 2, cierre frontal y bolsillos",
        precio: 15900,
        stock: 80,
        tipo: "variable",
        categoria_id: 5,
        categoria_nombre: "Seguridad",
        categoria_slug: "seguridad",
        categoria_icono: "🛡️",
        categoria_color: "#E17055",
        subcategoria_nombre: "Señalización",
        subcategoria_slug: "senalizacion",
        marca_nombre: "3M",
        imagen: "https://seguridadglobal.com.ar/wp-content/uploads/2022/01/Chaleco-reflectivo-Clase-2-Prisma.jpg",
        precio_oferta: 12900,
        tags: ["reflectivo", "chaleco", "seguridad"],
        atributos: {
            talla: ["M", "L", "XL", "XXL"],
            color: ["Naranja", "Amarillo"],
        }
    },
    {
        id: 58,
        nombre: "Generador Eléctrico 3500W",
        slug: "generador-electrico-3500w",
        descripcion: "Generador eléctrico 3500W, motor 4 tiempos",
        precio: 899900,
        stock: 8,
        tipo: "simple",
        categoria_id: 3,
        categoria_nombre: "Electricidad",
        categoria_slug: "electricidad",
        categoria_icono: "💡",
        categoria_color: "#FFD93D",
        subcategoria_nombre: "Iluminación",
        subcategoria_slug: "iluminacion",
        marca_nombre: "Honda",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8UWraQyKWVJYEphnDDHfW0F1aq0wvQY6rbQ&s",
        precio_oferta: 799900,
        tags: ["energia", "generador", "electricidad"],
    }
];

const categories = [
    {
        id: 1,
        nombre: 'Herramientas',
        slug: 'herramientas',
        icono: '🔧',
        color: '#FF6B35',
        total_productos: 2,
        subcategorias: [
            { nombre: 'Manuales', slug: 'manuales', icono: '🔨' },
            { nombre: 'Eléctricas', slug: 'electricas', icono: '⚡' }
        ]
    },
    {
        id: 2,
        nombre: 'Pinturas',
        slug: 'pinturas',
        icono: '🎨',
        color: '#4ECDC4',
        total_productos: 1,
        subcategorias: [
            { nombre: 'Vinilo', slug: 'vinilo', icono: '🖌️' },
            { nombre: 'Esmalte', slug: 'esmalte', icono: '🎭' }
        ]
    },
    {
        id: 3,
        nombre: 'Electricidad',
        slug: 'electricidad',
        icono: '💡',
        color: '#FFD93D',
        total_productos: 1,
        subcategorias: [
            { nombre: 'Iluminación', slug: 'iluminacion', icono: '💡' },
            { nombre: 'Cables', slug: 'cables', icono: '🔌' }
        ]
    },
    {
        id: 4,
        nombre: 'Construcción',
        slug: 'construccion',
        icono: '🏗️',
        color: '#6C5CE7',
        total_productos: 1,
        subcategorias: [
            { nombre: 'Materiales', slug: 'materiales', icono: '🧱' },
            { nombre: 'Acabados', slug: 'acabados', icono: '✨' }
        ]
    },
    {
        id: 5,
        nombre: 'Seguridad',
        slug: 'seguridad',
        icono: '🛡️',
        color: '#E17055',
        total_productos: 1,
        subcategorias: [
            { nombre: 'Protección', slug: 'proteccion', icono: '🛡️' },
            { nombre: 'EPP', slug: 'epp', icono: '⛑️' }
        ]
    },
    {
        id: 6,
        nombre: 'Digital',
        slug: 'digital',
        icono: '💻',
        color: '#00B894',
        total_productos: 2,
        subcategorias: [
            { nombre: 'Cursos', slug: 'cursos', icono: '📚' },
            { nombre: 'Planos', slug: 'planos', icono: '📐' }
        ]
    }
];

const brands = [
    { id: 1, nombre: 'Stanley', slug: 'stanley', logo: 'STANLEY' },
    { id: 2, nombre: 'Bosch', slug: 'bosch', logo: 'BOSCH' },
    { id: 3, nombre: 'Pintuco', slug: 'pintuco', logo: 'PINTUCO' },
    { id: 4, nombre: 'Philips', slug: 'philips', logo: 'PHILIPS'},
    { id: 5, nombre: 'Argos', slug: 'argos', logo: 'ARGOS'},
    { id: 6, nombre: '3M', slug: '3m', logo: '3M'},
    { id: 7, nombre: 'Propia', slug: 'propia', logo: 'PROPIA' }
];

// ==========================================
// FUNCIONES UTILITARIAS GLOBALES
// ==========================================


cargarProductosConStock();

function formatPrice(price) {
    return '$ ' + price.toLocaleString('es-CO');
}

function getStockClass(stock, tipo) {
    if (tipo === 'digital') return 'stock-available';
    if (stock === 0) return 'stock-out';
    if (stock < 10) return 'stock-low';
    return 'stock-available';
}

function getStockText(stock, tipo) {
    if (tipo === 'digital') return 'Disponible';
    if (stock === 0) return 'Agotado';
    if (stock < 10) return `Solo ${stock} unidades`;
    return `${stock} en stock`;
}

function getBadge(tipo) {
    switch(tipo) {
        case 'digital': return '<span class="product-badge badge-digital"><i class="fas fa-download"></i> Digital</span>';
        case 'variable': return '<span class="product-badge badge-variable"><i class="fas fa-sliders-h"></i> Variable</span>';
        default: return '<span class="product-badge badge-new">Nuevo</span>';
    }
}

// ==========================================
// FUNCIONES DE BÚSQUEDA Y FILTRADO
// ==========================================

function searchProducts(query) {
    if (!query || query.trim() === '') return products;
    const q = query.toLowerCase().trim();
    return products.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q)) ||
        p.categoria_nombre.toLowerCase().includes(q) ||
        p.marca_nombre.toLowerCase().includes(q)
    );
}

function filterProducts(filters) {
    let result = [...products];

    if (filters.categoria) {
        result = result.filter(p => p.categoria_slug === filters.categoria);
    }
    if (filters.subcategoria) {
        result = result.filter(p => p.subcategoria_slug === filters.subcategoria);
    }
    if (filters.tipo) {
        result = result.filter(p => p.tipo === filters.tipo);
    }
    if (filters.marca) {
        result = result.filter(p => p.marca_nombre.toLowerCase() === filters.marca.toLowerCase() || p.marca_nombre === filters.marca);
    }
    if (filters.precio_min) {
        result = result.filter(p => p.precio >= parseFloat(filters.precio_min));
    }
    if (filters.precio_max) {
        result = result.filter(p => p.precio <= parseFloat(filters.precio_max));
    }
    if (filters.q) {
        result = searchProducts(filters.q);
    }

    // Ordenamiento
    if (filters.orden) {
        switch(filters.orden) {
            case 'nombre_asc':
                result.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre_desc':
                result.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            case 'precio_asc':
                result.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio_desc':
                result.sort((a, b) => b.precio - a.precio);
                break;
            case 'nuevos':
                result.sort((a, b) => b.id - a.id);
                break;
        }
    }

    return result;
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

function getProductBySlug(slug) {
    return products.find(p => p.slug === slug);
}

function getProductsByCategory(slug) {
    return products.filter(p => p.categoria_slug === slug);
}

function getProductsByBrand(brandName) {
    return products.filter(p => p.marca_nombre === brandName);
}



// ==========================================
// FUNCIONES DE RENDERIZADO
// ==========================================

function renderProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}" data-slug="${product.slug}">
            ${getBadge(product.tipo)}
            <div class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}" loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.nombre)}'">
                <div class="product-actions">
                   
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">
                    <i class="fas fa-tag" style="color: ${product.categoria_color}"></i>
                    ${product.categoria_nombre} / ${product.subcategoria_nombre}
                </div>
                <h3 class="product-title">${product.nombre}</h3>
                <div class="product-meta">
                    <span class="product-brand">
                        <i class="fas fa-certificate"></i> ${product.marca_nombre}
                    </span>
                    <span class="product-stock ${getStockClass(product.stock, product.tipo)}">
                        <i class="fas fa-box"></i> ${getStockText(product.stock, product.tipo)}
                    </span>
                </div>
                ${product.tags ? `
                <div class="tags-container">
                    ${product.tags.slice(0, 3).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                ` : ''}
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
    `;
}

function renderProductsGrid(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 15px;"></i>
                <p>No se encontraron productos</p>
            </div>
        `;
        return;
    }

    container.innerHTML = productsToRender.map(p => renderProductCard(p)).join('');
}

// En index.js - Modificar la función que renderiza categorías
// o si usas data.js, modificar la función renderCategories allí

function renderCategories(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = categories.map(cat => `
        <a href="/productos?categoria=${cat.slug}" class="category-card" data-slug="${cat.slug}">
            <div class="category-icon" style="background: ${cat.color}20; color: ${cat.color};">
                <span>${cat.icono}</span>
            </div>
            <h3>${cat.nombre}</h3>
            <p>${cat.total_productos} productos</p>
        </a>
    `).join('');
}

// ==========================================
// RENDERIZAR MARCAS CON ENLACE A PRODUCTOS
// ==========================================

function renderBrands(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Obtener marcas únicas de los productos
    const marcasUnicas = [...new Set(products.map(p => p.marca_nombre))].filter(Boolean).sort();

    // O si tienes un array de marcas definido en data.js, úsalo:
    // const marcasUnicas = brands || [...new Set(products.map(p => p.marca_nombre))].filter(Boolean).sort();

    if (marcasUnicas.length === 0) {
        container.innerHTML = '<p>No hay marcas disponibles</p>';
        return;
    }

    container.innerHTML = marcasUnicas.map(marca => {
        // Crear slug para la marca (minúsculas, sin espacios)
        const marcaSlug = marca;
        
        // Buscar un producto de esta marca para obtener el logo/color si existe
        const productoMarca = products.find(p => p.marca_nombre === marca);
        
        return `
            <a href="/productos?marca=${marcaSlug}" class="brand-card" data-marca="${marcaSlug}">
                <div class="brand-logo">
                    <span class="brand-letter">${marca}</span>
                </div>
                <h4 class="brand-name">${marca}</h4>
                <span class="brand-count">${products.filter(p => p.marca_nombre === marca).length} productos</span>
            </a>
        `;
    }).join('');

}



// ==========================================
// FUNCIONES DE ACTUALIZACIÓN DE STOCK
// ==========================================

/**
 * Actualiza el stock de productos después de una compra
 * @param {Array} itemsComprados - Array de objetos {id, quantity}
 * @returns {boolean} - true si se actualizó correctamente
 */
function actualizarStockProductos(itemsComprados) {
    if (!itemsComprados || itemsComprados.length === 0) return false;
    
    let actualizado = false;
    

        
    if (actualizado) {
        guardarProductosEnStorage(); // PERSISTIR CAMBIOS
    }


    itemsComprados.forEach(itemComprado => {
        const producto = products.find(p => p.id === itemComprado.id);
        
        if (producto && producto.stock > 0) {
            // Verificar que hay suficiente stock
            if (producto.stock >= (itemComprado.quantity || 1)) {
                producto.stock -= (itemComprado.quantity || 1);
                actualizado = true;
                
                // Si el stock llega a 0, marcar como agotado
                if (producto.stock === 0) {
                    console.warn(`Producto ${producto.nombre} (ID: ${producto.id}) agotado`);
                }
            } else {
                console.error(`Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}, Solicitado: ${itemComprado.quantity || 1}`);
            }
        }
    });
    
    return actualizado;
}


function guardarProductosEnStorage() {
    try {
        localStorage.setItem('ferreteria_products', JSON.stringify(products));
    } catch (e) {
        console.error('Error guardando productos:', e);
    }
}


function cargarProductosConStock() {
    try {
        const guardados = localStorage.getItem('ferreteria_products');
        if (guardados) {
            const productosParseados = JSON.parse(guardados);
            // Actualizar solo el stock de los productos existentes
            productosParseados.forEach(pGuardado => {
                const productoActual = products.find(p => p.id === pGuardado.id);
                if (productoActual) {
                    productoActual.stock = pGuardado.stock;
                }
            });
        }
    } catch (e) {
        console.error('Error cargando productos guardados:', e);
    }
}





/**
 * Verifica si hay stock suficiente para todos los items
 * @param {Array} items - Array de objetos {id, quantity}
 * @returns {Object} - {valido: boolean, faltantes: Array}
 */
function verificarStockDisponible(items) {
    const faltantes = [];
    
    items.forEach(item => {
        const producto = products.find(p => p.id === item.id);
        
        if (!producto) {
            faltantes.push({ id: item.id, nombre: 'Desconocido', motivo: 'Producto no encontrado' });
        } else if (producto.stock < (item.quantity || 1)) {
            faltantes.push({ 
                id: item.id, 
                nombre: producto.nombre, 
                stockDisponible: producto.stock,
                stockSolicitado: item.quantity || 1,
                motivo: 'Stock insuficiente' 
            });
        }
    });
    
    return {
        valido: faltantes.length === 0,
        faltantes: faltantes
    };
}

// Exponer funciones globalmente
window.actualizarStockProductos = actualizarStockProductos;
window.verificarStockDisponible = verificarStockDisponible;

