let movies = [];
let charCache = JSON.parse(localStorage.getItem('characters')) || {};

async function init() {
    let select = document.getElementById("films");
    try {
        let response = await fetch("https://swapi.co/api/films");
        let data = await response.json();
        movies = data.results.sort((a, b) => a.episode_id - b.episode_id);

        let options = "";
        for (let movie of movies) {
            options += `<option value="${movie.episode_id - 1}">${movie.title}</option>`
        }
        select.innerHTML = options;
        select.value = 0;
    }
    catch (e) {
        console.log(e);
        select.innerHTML = "<option>ERROR</option>";
    }
    select.addEventListener("change", loadChars);

    loadChars();
}

async function loadChars() {
    let movieIndex = document.getElementById("films").value;
    let ul = document.getElementById("chars");
    let charList = [];
    ul.innerHTML = "Loading...";
    try {
        for (let url of movies[movieIndex].characters) {
            if (!charCache[url]) {
                let response = await fetch(url);
                let data = await response.json();
                charCache[url] = data.name;
            }
            charList.push(charCache[url]);
        }
        localStorage.setItem('characters', JSON.stringify(charCache));
        ul.innerHTML = charList.sort().map((name) => `<li>${name}</li>`).join("");
    }
    catch (e) {
        console.log(e);
        ul.innerHTML = "";
    }

    document.querySelectorAll("li")
        .forEach((n) => n.style.fontStyle = 'italic');
}
init();
