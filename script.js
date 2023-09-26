const personList = document.getElementById("personList");
const searchInput = document.getElementById("searchInput");
const modeButton = document.getElementById("modeButton");
let personsData = []; // Almacenar los datos de las personas

async function fetchPersons () {
    try {
        const response = await fetch("https://api.npoint.io/7aa84c899c5d1d440af5");
        personsData = await response.json();
        displayPersons(personsData);
    } catch (error) {
        console.error("Error al cargar las personas:", error);
    }
}

function getRandomAvatarUrl () {
    // Genera un número aleatorio entre 1 y 10 (o cualquier rango que desees)
    const randomNum = Math.floor(Math.random() * 10) + 1;
    // Construye la URL de la imagen con el número aleatorio
    return `https://xsgames.co/randomusers/assets/avatars/pixel/${randomNum}.jpg`;

}

function displayPersons (data) {
    personList.innerHTML = ""; // Limpiar la lista
    data.forEach(person => {
        const li = document.createElement("li");
        const avatar = document.createElement("img"); // Crear elemento de imagen
        avatar.src = getRandomAvatarUrl(); // Obtener una URL de avatar aleatoria
        avatar.alt = "Avatar de usuario"; // Texto alternativo para la imagen
        li.appendChild(avatar); // Agregar la imagen al elemento li
        li.innerHTML += `${person.name}, Vive en: ${person.country}, Teléfono: ${person.phone}`;
        personList.appendChild(li);
    });
}

fetchPersons();

// Función para filtrar las personas según el nombre ingresado
function filterPersonsByName (name) {
    return personsData.filter(person => person.name.toLowerCase().includes(name.toLowerCase()));
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim(); // Obtener el valor del campo de búsqueda
    const filteredPersons = filterPersonsByName(searchTerm);
    displayPersons(filteredPersons);
});

const savedMode = localStorage.getItem("mode");
if (savedMode === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector(".container").classList.add("dark-mode");
}

modeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    const currentMode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("mode", currentMode);
});
