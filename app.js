
class Producto {
    constructor(nombre, categoria, cantidad, precio) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    
    mostrarDetalles() {
        return `
            <tr>
                <td>${this.nombre}</td>
                <td>${this.categoria}</td>
                <td>${this.cantidad}</td>
                <td>${this.precio}</td>
                <td><button class="boton-eliminar">Eliminar</button></td>
            </tr>
        `;
    }
}


class Inventario {
    constructor() {
        this.productos = [];
    }

    
    agregarProducto(producto) {
        this.productos.push(producto);
        this.mostrarInventario();
    }

    
    mostrarInventario() {
        const tabla = document.getElementById('cuerpo-tabla');
        tabla.innerHTML = ''; 

        
        this.productos.forEach(producto => {
            tabla.innerHTML += producto.mostrarDetalles();
        });

        this.eliminarProductoEvent();
    }

    
    eliminarProducto(nombre) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombre);
        this.mostrarInventario();
    }

    
    eliminarProductoEvent() {
        const botonesEliminar = document.querySelectorAll('.boton-eliminar');
        botonesEliminar.forEach((boton, index) => {
            boton.addEventListener('click', () => {
                this.productos.splice(index, 1); // Eliminar producto por índice
                this.mostrarInventario();
            });
        });
    }
}


const miInventario = new Inventario();


const formulario = document.getElementById('formulario-producto');


formulario.addEventListener('submit', function (event) {
    event.preventDefault(); 

    
    const nombre = document.getElementById('nombre-producto').value;
    const categoria = document.getElementById('categoria-producto').value;
    const cantidad = document.getElementById('cantidad-producto').value;
    const precio = document.getElementById('precio-producto').value;

    
    const nuevoProducto = new Producto(nombre, categoria, cantidad, precio);

    
    miInventario.agregarProducto(nuevoProducto);

    
    formulario.reset();
});
