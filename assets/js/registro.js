let etapaAtual = 1;

const totalEtapas = 4;

const etapas = document.querySelectorAll(".etapa-registro");
const indicadores = document.querySelectorAll(".etapa");
const botaoAnterior = document.getElementById("botao-anterior");
const botaoProxima = document.getElementById("botao-proxima");
const tituloFato = document.getElementById("titulo-fato");

const parametros = new URLSearchParams(window.location.search);

const fato = parametros.get("fato");


if (fato === "furto") {
    tituloFato.textContent = "FURTO SIMPLES";
}
else if (fato === "golpe") {
    tituloFato.textContent = "GOLPE";
}
else if (fato === "ameaca") {
    tituloFato.textContent = "AMEAÇA";
}
else if (fato === "difamacao") {
    tituloFato.textContent = "DIFAMAÇÃO";
}
else {
    tituloFato.textContent = "Fato não informado";
}

function mostrarEtapa(numero) {
    etapaAtual = numero;
    etapas.forEach(function (etapa) {
        etapa.style.display = "none";
    });
    const etapa = document.getElementById("etapa-" + etapaAtual);
    etapa.style.display = "block";

    indicadores.forEach(function (indicador) {
        const numeroEtapa = Number(indicador.dataset.etapa);
        indicador.classList.remove("atual");
        indicador.classList.remove("concluida");
        if (numeroEtapa === etapaAtual) {
            indicador.classList.add("atual");
        }
        else if (numeroEtapa < etapaAtual) {
            indicador.classList.add("concluida");
        }
    });
    if (etapaAtual === 1) {
        botaoAnterior.disabled = true;
    }
    else {
        botaoAnterior.disabled = false;
    }

    if (etapaAtual === totalEtapas) {
        botaoProxima.textContent = "Finalizar denúncia";
    }
    if (etapaAtual === 4) {
        atualizarResumo();
    }
}

function validarEtapa() {
    if (etapaAtual === 1) {
        const data = document.getElementById("data").value;
        const hora = document.getElementById("hora").value;
        const minuto = document.getElementById("minuto").value;
        if (data === "") {
            alert("Informe a data do fato.");
            return false;
        }
        if (hora === "" || minuto === "") {
            alert("Informe a hora do fato.");
            return false;
        }
        return true;
    }

    if (etapaAtual === 2) {
        const logradouro =
            document.getElementById("logradouro").value;
        const bairro =
            document.getElementById("bairro").value;
        const cidade =
            document.getElementById("cidade").value;
        const estado =
            document.getElementById("estado").value;

        if (logradouro === "") {
            alert("Informe o logradouro.");
            return false;
        }
        if (bairro === "") {
            alert("Informe o bairro.");
            return false;
        }
        if (cidade === "") {
            alert("Informe a cidade.");
            return false;
        }
        if (estado === "") {
            alert("Informe o estado.");
            return false;
        }
        return true;
    }

    if (etapaAtual === 3) {
        const relato =
            document.getElementById("relato").value.trim();
        if (relato === "") {
            alert("Informe o relato do fato.");
            return false;
        }
        return true;
    }
    return true;
}

botaoProxima.addEventListener("click", function () {
    if (etapaAtual < totalEtapas) {
        if (!validarEtapa()) {
            return;
        }
        mostrarEtapa(etapaAtual + 1);
    }
    else {
        finalizarDenuncia();
    }
});

botaoAnterior.addEventListener("click", function () {
    if (etapaAtual > 1) {
        mostrarEtapa(etapaAtual - 1);
    }
    else {
        window.location.href = "denuncia.html";
    }
});

function atualizarResumo() {
    const data =
        document.getElementById("data").value;
    const hora =
        document.getElementById("hora").value;
    const minuto =
        document.getElementById("minuto").value;
    const logradouro =
        document.getElementById("logradouro").value;
    const numero =
        document.getElementById("numero").value;
    const complemento =
        document.getElementById("complemento").value;
    const bairro =
        document.getElementById("bairro").value;
    const cidade =
        document.getElementById("cidade").value;
    const estado =
        document.getElementById("estado").value;
    const referencia =
        document.getElementById("referencia").value;
    const relato =
        document.getElementById("relato").value;
    document.getElementById("resumo-data").textContent =
        data;
    document.getElementById("resumo-hora").textContent =
        hora + ":" + minuto;
    let local = logradouro;
    if (numero !== "") {
        local += ", " + numero;
    }
    if (complemento !== "") {
        local += ", " + complemento;
    }
    local += " - " + bairro;
    local += " - " + cidade;
    local += " - " + estado;
    if (referencia !== "") {
        local += " (Referência: " + referencia + ")";
    }
    document.getElementById("resumo-local").textContent =
        local;
    document.getElementById("resumo-relato").textContent =
        relato;
    document.getElementById("resumo-fato").textContent =
        tituloFato.textContent;
}

function finalizarDenuncia() {
    alert("Denúncia preenchida com sucesso!");
}