class Menu {
    constructor() {
        this.button = document.querySelector("#app-menu");
    }
}

class Debug {
    constructor() {
        this.button = document.querySelector("#app-debug");
        this.box = document.querySelector("#debug");
    }
}

class History {
    constructor() {
        this.button = document.querySelector("#app-history");
        this.container = document.querySelector("#history");
        this.list = document.querySelector("#history-list");
    }
}

function buildHistoryItem() {
    return;
}

const menu = new Menu();
const debug = new Debug();
const history = new History();

debug.button.addEventListener("click", () => {
    debug.box.classList.toggle("debug");
    debug.box.classList.toggle("display-none");
});

// TODO: Use localStorage to handle player score history
history.button.addEventListener("click", (event) => {
    // TODO: Toggle history display
    return;
});

menu.button.addEventListener("click", () => {
    window.location.href = "/index.html";
});
