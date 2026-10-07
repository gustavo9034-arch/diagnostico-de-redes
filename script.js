const problemas = [
    {
        titulo: "Computador sem acesso à internet",
        descricao: "O computador está conectado à rede, mas não consegue acessar sites ou serviços online.",
        causas: [
            "Falha no roteador ou no provedor.",
            "Problema no gateway ou no endereço IP.",
            "Falha no DNS, cabo ou Wi-Fi."
        ],
        diagnostico: [
            "Execute ipconfig /all para verificar as configurações.",
            "Use ping no gateway informado pelo computador.",
            "Teste ping 8.8.8.8 e nslookup google.com."
        ],
        solucoes: [
            "Verifique o cabo ou a conexão Wi-Fi.",
            "Confira o endereço IP e o gateway.",
            "Se a rede utilizar DHCP, tente renovar o endereço IP.",
            "Se apenas os nomes dos sites falharem, verifique o DNS."
        ],
        comandos: "ipconfig /all\nping 192.168.1.1\nping 8.8.8.8\nnslookup google.com"
    },
    {
        titulo: "Endereço IP incorreto",
        descricao: "O computador está utilizando um endereço IP incompatível com a rede.",
        causas: [
            "Configuração manual incorreta.",
            "Falha no servidor DHCP.",
            "Configuração de outra rede."
        ],
        diagnostico: [
            "Execute ipconfig /all.",
            "Confira o IP, a máscara e o gateway.",
            "Um IP iniciado por 169.254 pode indicar falha na obtenção de endereço pelo DHCP."
        ],
        solucoes: [
            "Configure o IP automático se a rede utilizar DHCP.",
            "Solicite uma nova configuração ao DHCP.",
            "Se o IP for manual, corrija os dados conforme as orientações do administrador."
        ],
        comandos: "ipconfig /all\nipconfig /release\nipconfig /renew"
    },
    {
        titulo: "Problema de DNS",
        descricao: "O computador não consegue localizar sites pelo nome, mesmo que exista conexão com a rede.",
        causas: [
            "Servidor DNS indisponível.",
            "Endereço DNS incorreto.",
            "Falha temporária na resolução de nomes."
        ],
        diagnostico: [
            "Execute ping 8.8.8.8 para testar a conexão por IP.",
            "Execute nslookup google.com.",
            "Confira os servidores DNS em ipconfig /all."
        ],
        solucoes: [
            "Confira o DNS configurado.",
            "Utilize um DNS autorizado e adequado à rede.",
            "Limpe o cache DNS do computador."
        ],
        comandos: "ipconfig /all\nping 8.8.8.8\nnslookup google.com\nipconfig /flushdns"
    },
    {
        titulo: "Cabo de rede desconectado ou com defeito",
        descricao: "A conexão Ethernet não é estabelecida ou apresenta quedas frequentes.",
        causas: [
            "Cabo desconectado ou danificado.",
            "Conector mal encaixado.",
            "Porta de rede com defeito."
        ],
        diagnostico: [
            "Verifique as duas extremidades do cabo.",
            "Observe as luzes da porta de rede, se houver.",
            "Confira o estado do adaptador nas configurações do Windows."
        ],
        solucoes: [
            "Reconecte o cabo.",
            "Teste outro cabo funcional.",
            "Teste outra porta de rede, se autorizado.",
            "Se o problema continuar, solicite a verificação do equipamento."
        ],
        comandos: "ipconfig /all\nping 192.168.1.1"
    },
    {
        titulo: "Conflito de endereço IP",
        descricao: "Dois dispositivos estão utilizando o mesmo endereço IP na rede, causando falhas de comunicação.",
        causas: [
            "Endereço IP manual repetido.",
            "Configuração incorreta do DHCP.",
            "IP fixo dentro do intervalo distribuído automaticamente."
        ],
        diagnostico: [
            "Observe se o Windows apresenta um aviso de conflito de IP.",
            "Execute ipconfig /all.",
            "Peça ao administrador para conferir as concessões DHCP e os IPs fixos."
        ],
        solucoes: [
            "Utilize DHCP automático quando essa for a configuração da rede.",
            "Configure um IP fixo autorizado e que não esteja em uso.",
            "Renove o endereço depois de corrigir a configuração."
        ],
        comandos: "ipconfig /all\nipconfig /release\nipconfig /renew"
    }
];

const lista = document.getElementById("listaProblemas");

const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const numero = document.getElementById("numero");
const causas = document.getElementById("causas");
const diagnostico = document.getElementById("diagnostico");
const solucoes = document.getElementById("solucoes");
const comandos = document.getElementById("comandos");

function preencherLista(elemento, itens) {
    elemento.innerHTML = "";

    itens.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        elemento.appendChild(li);
    });
}

function mostrarProblema(indice) {
    const problema = problemas[indice];

    titulo.textContent = problema.titulo;
    descricao.textContent = problema.descricao;
    numero.textContent = `SITUAÇÃO ${String(indice + 1).padStart(2, "0")}`;
    comandos.textContent = problema.comandos;

    preencherLista(causas, problema.causas);
    preencherLista(diagnostico, problema.diagnostico);
    preencherLista(solucoes, problema.solucoes);

    document.querySelectorAll(".problema").forEach((botao, i) => {
        botao.classList.toggle("ativo", i === indice);
    });

    document.getElementById("mensagem").textContent = "";
}

problemas.forEach((problema, indice) => {
    const botao = document.createElement("button");

    botao.className = "problema";
    botao.textContent = `${String(indice + 1).padStart(2, "0")} — ${problema.titulo}`;

    botao.addEventListener("click", () => {
        mostrarProblema(indice);
    });

    lista.appendChild(botao);
});

document.getElementById("copiar").addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(comandos.textContent);
        document.getElementById("mensagem").textContent =
            "Comandos copiados com sucesso!";
    } catch {
        document.getElementById("mensagem").textContent =
            "Selecione e copie os comandos manualmente.";
    }
});

mostrarProblema(0);
