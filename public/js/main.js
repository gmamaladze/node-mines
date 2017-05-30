'use strict';

var id = new URLSearchParams(window.location.search).get("id");
if (!id) {
    startNew();
} else {
    loadExisting(id);
}

var gameUrl;
var cellsUrl;

function loadExisting(id) {
    gameUrl = `/api/games/${id}`;
    cellsUrl = `${gameUrl}/cells`;
    fetch(gameUrl)
        .then((res) => res.json())
        .then((game) => {
            createTable(game.size);
            document.getElementById("level").value = game.level;
        })
        .then(()=>fetch(cellsUrl))
        .then((res) => res.json())
        .then((updates) => updates.forEach(onUpdate));
}

function startNew(level) {
    var url = '/api/games';
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                level
            })
        })
        .then((res) => res.json())
        .then((game) => window.location.replace(`/?id=${game.id}`));
}

function createTable(size) {
    var table = document.getElementById("main");
    var row = table.rows[0];
    var cell = row.cells[0];
    for (var i = 1; i < size.x; i++) {
        row.appendChild(cell.cloneNode(true));
    }
    for (var j = 1; j < size.y; j++) {
        table.appendChild(row.cloneNode(true));
    }
}

var cellclick = function uncover(cell) {
    setFace("oops");
    var point = getPoint(cell);
    var url = `${cellsUrl}/${point.x}.${point.y}/cover`;
    fetch(url, {
            method: 'DELETE'
        })
        .then((res) => res.json())
        .then((updates) => updates.forEach(onUpdate))
        .then(
            fetch(gameUrl)
            .then((res) => res.json())
            .then((game) => {
                setTimeout(function() {
                    setFace(game.state);
                }, 300);
                if (game.state !== 'in-progress') {
                    cellclick = function() {};
                }
            }));
};

function flag(cell) {
    var point = getPoint(cell);
    var url = `${cellsUrl}/${point.x}.${point.y}/flag`;
    fetch(url, {
            method: 'PUT'
        })
        .then((res) => res.json())
        .then(onUpdate)
}

function setFace(state) {
    document
        .getElementById("face")
        .setAttribute("src", `img/${state}.png`);
}

function onUpdate(update, id) {
    document
        .getElementById("main")
        .rows[update.point.y]
        .cells[update.point.x]
        .getElementsByTagName("img")[0]
        .setAttribute("src", `img/${update.value}.png`);
}

function getPoint(cell) {
    return {
        x: cell.cellIndex,
        y: cell.parentNode.rowIndex
    };
}
