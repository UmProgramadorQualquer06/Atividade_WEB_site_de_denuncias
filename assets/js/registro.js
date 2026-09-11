let etapaAtual = 0;

const totalEtapas = 4;

const botaoAnterior = document.getElementById("botao-anterior");
const botaoProxima = document.getElementById("botao-proxima");

function esconderEtapa(){
    let etapa = document.getElementById(`etapa-${etapaAtual}`)
    etapa.style.display = "none"
}
function mostrarEtapa(){
    let etapa = document.getElementById(`etapa-${etapaAtual}`)
    etapa.style.display = "block"
    if(etapaAtual === 0){
        botaoProxima.style.display = "none"
        etapa.style.display = "flex"
    }else{
        botaoProxima.style.display = "block"
    }
    if(etapaAtual === 4){
        atualizarResumo();
        botaoProxima.textContent = "Finalizar denúncia";
    }
}
mostrarEtapa()

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
    if(etapaAtual === 3) {
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

let tituloFato = ""
function defineFato(fato){
    tituloFato = fato
    FbotaoProxima()
}

function FbotaoProxima(){
    if (etapaAtual < totalEtapas) {
        if (!validarEtapa()) {
            return;
        }
        esconderEtapa()
        etapaAtual += 1
        mostrarEtapa();
    }
    else {
        finalizarDenuncia();
    }
}

function FbotaoAnterior(){
    if (etapaAtual > 0) {
        esconderEtapa()
        etapaAtual -= 1
        mostrarEtapa();
    }
    else {
        window.location.href = "index.html";
    }
}

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
        tituloFato;
}

function finalizarDenuncia() {
    alert("Denúncia preenchida com sucesso!");
    window.location.href = "index.html";
}