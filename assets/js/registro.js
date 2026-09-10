const parametros = new URLSearchParams(window.location.search);

const fato = parametros.get("fato");

const titulo = document.getElementById("titulo-fato");


if (fato === "furto") {
    titulo.textContent = "FURTO SIMPLES";
}

else if (fato === "golpe") {
    titulo.textContent = "GOLPE";
}

else if (fato === "ameaca") {
    titulo.textContent = "AMEAÇA";
}

else if (fato === "difamacao") {
    titulo.textContent = "DIFAMAÇÃO";
}

else {
    titulo.textContent = "Fato não informado";
}