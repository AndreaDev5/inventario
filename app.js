// Clase para representar un producto
class Producto {
    constructor(nombre, categoria, cantidad, precio) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    // Método para devolver los detalles en formato de tabla
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

// Clase para gestionar el inventario
class Inventario {
    constructor() {
        this.productos = [];
    }

    // Método para agregar producto
    agregarProducto(producto) {
        this.productos.push(producto);
        this.mostrarInventario();
    }

    // Método para mostrar el inventario en la tabla HTML
    mostrarInventario() {
        const tabla = document.getElementById('cuerpo-tabla');
        tabla.innerHTML = ''; // Limpiar la tabla

        // Agregar cada producto al cuerpo de la tabla
        this.productos.forEach(producto => {
            tabla.innerHTML += producto.mostrarDetalles();
        });

        // Agregar evento para eliminar producto
        this.eliminarProductoEvent();
    }

    // Método para eliminar producto
    eliminarProducto(nombre) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombre);
        this.mostrarInventario();
    }

    // Agregar el evento para eliminar producto desde la tabla
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

// Crear instancia del inventario
const miInventario = new Inventario();

// Capturar el formulario
const formulario = document.getElementById('formulario-producto');

// Evento para agregar producto al inventario
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar recarga de página

    // Capturar los valores del formulario
    const nombre = document.getElementById('nombre-producto').value;
    const categoria = document.getElementById('categoria-producto').value;
    const cantidad = document.getElementById('cantidad-producto').value;
    const precio = document.getElementById('precio-producto').value;

    // Crear un nuevo producto
    const nuevoProducto = new Producto(nombre, categoria, cantidad, precio);

    // Agregar el producto al inventario
    miInventario.agregarProducto(nuevoProducto);

    // Limpiar el formulario
    formulario.reset();
});
