let vehicles = [];
let tableIndex = [];
async function init() {
    let next = "https://swapi.co/api/vehicles";
    let select = document.getElementById("vh");
    try {
        while (next) {
            let request = await fetch(next);
            let data = await request.json();
            next = data.next;
            vehicles = vehicles.concat(data.results);
        }
        vehicles = vehicles.sort((a,b) => Number(a.name > b.name));
        select.innerHTML = vehicles.map((v, i) => `<option value="${i}">${v.name}</option>`).join('');
    }
    catch (e) {
        console.log(e);
        select.innerHTML = "<option>ERROR</option>";
    }
}

function refreshTable() {
    let table = document.getElementById("vhTable");
    let rows = '';
    let counter = 0;
    for (let index of tableIndex) {
        let vh = vehicles[index];
        rows += `<tr></tr><td>${counter + 1}</td><td>${vh.name}</td><td>${vh.model}</td><td>${vh.manufacturer}</td>
                <td>${vh.vehicle_class}</td><td>${vh.cost_in_credits}</td><td>${vh.length}</td>
                <td>${vh.max_atmosphering_speed}</td><td>${vh.crew}</td><td>${vh.passengers}</td>
                <td><button onclick="delVh(${counter});">Effacer</button></td></tr>`;
        counter += 1;
    }
    table.innerHTML = rows;
}

function addVh() {
    let index = document.getElementById("vh").value;
    if (!tableIndex.includes(index)) {
        tableIndex.push(index);
    }
    refreshTable();
}

function emptyTable() {
    if (tableIndex.length) {
        tableIndex = [];
        refreshTable();
    }
}

function delVh(index) {
    tableIndex.splice(index, 1);
    refreshTable();
}

init();
