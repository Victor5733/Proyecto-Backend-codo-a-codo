//const URL = "http://127.0.0.1:5000/"

//Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
const URL = "https://vm5733.pythonanywhere.com/"

// Obtiene el contenido del inventario
function obtenerAutos() {
    fetch(URL + 'autos') // Realiza una solicitud GET al servidor y obtener la lista de productos.
        .then(response => {
            // Si es exitosa (response.ok), convierte los datos de la respuesta de formato JSON a un objeto JavaScript.
            if (response.ok) { return response.json(); }
        })
        // Asigna los datos de los productos obtenidos a la propiedad productos del estado.
        .then(data => {
            const AutosTable = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
            AutosTable.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos
            data.forEach(auto => {
                const row = AutosTable.insertRow();
                row.innerHTML = `
                            <td align="center">${auto.codigo}</td>
                            <td align="center">${auto.color}</td>
                            <td align="center">${auto.modelo}</td>
                            <td align="center">${auto.marca}</td>
                            <td align="center">${auto.cantidad}</td>
                            <td align="center"> $ ${auto.precio}</td>
                            <td align="center"><button class="btnEliminar" onclick="eliminarAuto('${auto.codigo}')">Eliminar</button></td>
                        `;
            });
        })
        // Captura y maneja errores, mostrando una alerta en caso de error al obtener los productos.
        .catch(error => {
            console.log('Error:', error);
            alert('Error al obtener los productos.');
        });
}

// Se utiliza para eliminar un producto.
function eliminarAuto(codigo) {
    // Se muestra un diálogo de confirmación. Si el usuario confirma, se realiza una solicitud DELETE al servidor a través de fetch(URL + 'productos/${codigo}', {method: 'DELETE' }).
    if (confirm('¿Estás seguro de que quieres eliminar este auto?')) {
        fetch(URL + `autos/${codigo}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // Si es exitosa (response.ok), elimina el producto y da mensaje de ok.
                    obtenerAutos(); // Vuelve a obtener la lista de productos para actualizar la tabla.
                    alert('Auto eliminado correctamente.');
                }
            })
            // En caso de error, mostramos una alerta con un mensaje de error.
            .catch(error => {
                alert(error.message);
            });
    }
}

// Cuando la página se carga, llama a obtenerProductos para cargar la lista de productos.
document.addEventListener('DOMContentLoaded', obtenerAutos);
