// carrito.js

// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio }); // precio como número (ej: 13000)
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  alert(nombre + " agregado al carrito");
}

// Función para actualizar el contador del carrito en el header
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  if (contador) {
    contador.textContent = carrito.length; // cantidad de productos agregados
  }
}

// Función para mostrar productos en la página carrito.html
function mostrarCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
  } else {
    let total = 0;
    contenedor.innerHTML = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          ${carrito.map((p, index) => {
            total += p.precio;
            return `
              <tr>
                <td>${p.nombre}</td>
                <td>$${p.precio.toLocaleString("es-CO")}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
      <h5 class="mt-3">Total: $${total.toLocaleString("es-CO")}</h5>
    `;
  }
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContador();
}

// Al cargar cualquier página, actualiza el contador automáticamente
document.addEventListener("DOMContentLoaded", actualizarContador);
