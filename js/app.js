
const API_URL = "http://localhost:3000/servidores";
const serverForm = document.getElementById("serverForm");
const listaServidores = document.getElementById("listaServidores");

document.addEventListener("DOMContentLoaded", obtenerServidores);

// --- FUNCIONALIDAD GET ---
async function obtenerServidores() {
    try {
        const respuesta = await fetch(API_URL);
        const servidores = await respuesta.json();
        renderizarTarjetas(servidores);
    } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
    }
}

// Pintado tarjetas
function renderizarTarjetas(servidores) {
    listaServidores.innerHTML = ""; 

    servidores.forEach(servidor => {
        const claseAlmacenamiento = servidor.almacenamiento === "SSD" ? "card-ssd" : "card-hdd"           
        const col = document.createElement("div");
        col.className = "col";
        
        // Estructura HTML
        col.innerHTML = `
            <div class="card h-100 shadow-sm ${claseAlmacenamiento}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title fw-bold text-dark">${servidor.nombre}</h5>
                        <p class="card-text mb-1"><strong>CPU:</strong> ${servidor.cpu} núcleos</p>
                        <p class="card-text mb-1"><strong>RAM:</strong> ${servidor.ram} GB</p>
                        <p class="card-text mb-1"><strong>Almacenamiento:</strong> ${servidor.almacenamiento}</p>
                        <p class="card-text mb-1"><strong>Presupuesto:</strong> ${servidor.presupuesto} €</p>
                    </div>
                    <div class="text-end mt-3">
                        <button class="btn btn-outline-danger btn-sm" onclick="eliminarServidor('${servidor.id}')">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
        listaServidores.appendChild(col);
    });
}

// --- FUNCIONALIDAD POST ---
serverForm.addEventListener("submit", async (e) => {
    
    if (!serverForm.checkValidity()) {
        serverForm.reportValidity();
        e.preventDefault(); 
        return;                      
    }

    e.preventDefault();
    const nuevoServidor = {
        nombre: document.getElementById("nombre").value.trim(),
        cpu: document.getElementById("cpu").value,
        ram: document.getElementById("ram").value,
        almacenamiento: document.getElementById("almacenamiento").value,
        presupuesto: Number(document.getElementById("presupuesto").value) 
    };

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoServidor)
        });

        if (respuesta.ok) {           
            obtenerServidores();
            serverForm.reset();
        }
    } catch (error) {
        console.error("Error al registrar el servidor:", error);
    }
});

// --- FUNCIONALIDAD DELETE ---
async function eliminarServidor(id) {   
    if (!confirm("¿Seguro que deseas eliminar este registro permanente?")) return;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (respuesta.ok) {    
            obtenerServidores();
        }
    } catch (error) {
        console.error("Error al eliminar el servidor:", error);
    }
}