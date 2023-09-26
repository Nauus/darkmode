const personList = document.getElementById("personList");
const searchInput = document.getElementById("searchInput");
const modeButton = document.getElementById("modeButton");
let personsData = [];

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

    const randomNum = Math.floor(Math.random() * 20) + 1;

    return `https://xsgames.co/randomusers/assets/avatars/pixel/${randomNum}.jpg`;

}

function displayPersons (data) {
    personList.innerHTML = "";
    data.forEach(person => {
        const li = document.createElement("li");
        const avatar = document.createElement("img");
        avatar.src = getRandomAvatarUrl();
        avatar.alt = "Avatar de usuario";
        li.appendChild(avatar);
        li.innerHTML += `${person.name}, Vive en: ${person.country}, Teléfono: ${person.phone}`;
        personList.appendChild(li);
    });
}

fetchPersons();


function filterPersonsByName (name) {
    return personsData.filter(person => person.name.toLowerCase().includes(name.toLowerCase()));
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();
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
