// ========================================
// CONFIGURAÇÃO INICIAL
// ========================================

let etapaAtual = 1;

const totalEtapas = 4;


// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const etapas = document.querySelectorAll(".etapa-registro");

const indicadores = document.querySelectorAll(".etapa");

const botaoAnterior = document.getElementById("botao-anterior");

const botaoProxima = document.getElementById("botao-proxima");

const tituloFato = document.getElementById("titulo-fato");


// ========================================
// IDENTIFICAR O FATO ESCOLHIDO
// ========================================

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


// ========================================
// MOSTRAR ETAPA
// ========================================

function mostrarEtapa(numero) {

    etapaAtual = numero;


    // Esconde todas as etapas

    etapas.forEach(function(etapa) {

        etapa.style.display = "none";

    });


    // Mostra somente a etapa atual

    const etapa = document.getElementById("etapa-" + etapaAtual);

    etapa.style.display = "block";


    // Atualiza os indicadores laterais

    indicadores.forEach(function(indicador) {

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


    // Controla o botão "Etapa anterior"

    if (etapaAtual === 1) {

        botaoAnterior.disabled = true;

    }

    else {

        botaoAnterior.disabled = false;

    }


    // Controla o texto do botão da próxima etapa

    if (etapaAtual === totalEtapas) {

        botaoProxima.textContent = "Finalizar denúncia";

    }

    else {

        botaoProxima.textContent = "Próxima etapa ▶";

    }


    // Se estivermos na confirmação,
    // atualiza o resumo

    if (etapaAtual === 4) {

        atualizarResumo();

    }

}


// ========================================
// VALIDAR ETAPA
// ========================================

function validarEtapa() {

    // ETAPA 1

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


    // ETAPA 2

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


    // ETAPA 3

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


// ========================================
// PRÓXIMA ETAPA
// ========================================

botaoProxima.addEventListener("click", function() {


    // Se ainda não estamos na última etapa

    if (etapaAtual < totalEtapas) {


        // Verifica se os dados estão preenchidos

        if (!validarEtapa()) {

            return;

        }


        // Vai para a próxima etapa

        mostrarEtapa(etapaAtual + 1);

    }

    else {

        // Estamos na última etapa

        finalizarDenuncia();

    }

});


// ========================================
// ETAPA ANTERIOR
// ========================================

botaoAnterior.addEventListener("click", function() {

    if (etapaAtual > 1) {

        mostrarEtapa(etapaAtual - 1);

    }

    else {

        // Na primeira etapa,
        // volta para a seleção do fato

        window.location.href = "denuncia.html";

    }

});


// ========================================
// ATUALIZAR RESUMO
// ========================================

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


    // Data

    document.getElementById("resumo-data").textContent =
        data;


    // Hora

    document.getElementById("resumo-hora").textContent =
        hora + ":" + minuto;


    // Local

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


    // Relato

    document.getElementById("resumo-relato").textContent =
        relato;


    // Fato

    document.getElementById("resumo-fato").textContent =
        tituloFato.textContent;

}


// ========================================
// FINALIZAR
// ========================================

function finalizarDenuncia() {

    alert("Denúncia preenchida com sucesso!");

}