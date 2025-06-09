/**
 * banco.js
 * Sistema de gestão bancária simples em um único arquivo.
 *
 * Funcionalidades:
 * 1. Criar uma nova conta bancária.
 * 2. Realizar um depósito em uma conta existente.
 * 3. Realizar um saque de uma conta existente.
 * 4. Consultar o saldo de uma conta.
 *
 * O código utiliza o módulo 'readline-sync' para a entrada de dados do usuário.
 * Para instalar: npm install readline-sync
 */

const readlineSync = require('readline-sync');

// Lista (Array) para armazenar os dados das contas bancárias.
// Cada conta é um objeto com numeroDaConta, nomeDoCliente e saldo.
let contas = [
    { numeroDaConta: 1, nomeDoCliente: "João Silva", saldo: 1500.50 },
    { numeroDaConta: 2, nomeDoCliente: "Maria Souza", saldo: 2500.00 }
];
let proximoNumeroDeConta = 3; // Controla o número da próxima conta a ser criada

// --- Funções do Sistema Bancário ---

/**
 * Cria uma nova conta e a adiciona à lista de contas.
 */
function criarConta() {
    console.log("\n--- Criação de Nova Conta ---");
    const nomeDoCliente = readlineSync.question("Digite o nome do cliente: ");
    const depositoInicial = parseFloat(readlineSync.question("Digite o valor do deposito inicial: R$"));

    if (!nomeDoCliente || isNaN(depositoInicial) || depositoInicial < 0) {
        console.log("\nErro: Dados inválidos. Por favor, preencha o nome e um valor de depósito positivo.");
        return;
    }

    const novaConta = {
        numeroDaConta: proximoNumeroDeConta,
        nomeDoCliente: nomeDoCliente,
        saldo: depositoInicial
    };

    contas.push(novaConta);
    console.log(`\nConta criada com sucesso para ${nomeDoCliente}. Número da conta: ${proximoNumeroDeConta}`);
    proximoNumeroDeConta++;
}

/**
 * Encontra uma conta pelo seu número.
 * @param {number} numeroDaConta - O número da conta a ser encontrada.
 * @returns {object|null} O objeto da conta ou null se não for encontrada.
 */
function encontrarConta(numeroDaConta) {
    return contas.find(conta => conta.numeroDaConta === numeroDaConta);
}


/**
 * Adiciona um valor ao saldo de uma conta específica.
 */
function depositar() {
    console.log("\n--- Realizar Depósito ---");
    const numeroDaConta = parseInt(readlineSync.question("Digite o numero da conta: "));
    const conta = encontrarConta(numeroDaConta);

    if (conta) {
        const valor = parseFloat(readlineSync.question("Digite o valor a ser depositado: R$"));

        if (isNaN(valor) || valor <= 0) {
            console.log("\nErro: Valor de depósito inválido.");
            return;
        }

        conta.saldo += valor;
        console.log(`\nDepósito de R$${valor.toFixed(2)} realizado com sucesso. Novo saldo: R$${conta.saldo.toFixed(2)}`);
    } else {
        console.log("\nErro: Conta não encontrada.");
    }
}

/**
 * Remove um valor do saldo de uma conta, se houver fundos suficientes.
 */
function sacar() {
    console.log("\n--- Realizar Saque ---");
    const numeroDaConta = parseInt(readlineSync.question("Digite o numero da conta: "));
    const conta = encontrarConta(numeroDaConta);

    if (conta) {
        const valor = parseFloat(readlineSync.question("Digite o valor a ser sacado: R$"));

        if (isNaN(valor) || valor <= 0) {
            console.log("\nErro: Valor de saque inválido.");
            return;
        }

        if (valor > conta.saldo) {
            console.log("\nErro: Saldo insuficiente para realizar o saque.");
        } else {
            conta.saldo -= valor;
            console.log(`\nSaque de R$${valor.toFixed(2)} realizado com sucesso. Novo saldo: R$${conta.saldo.toFixed(2)}`);
        }
    } else {
        console.log("\nErro: Conta não encontrada.");
    }
}

/**
 * Exibe o saldo atual de uma conta específica.
 */
function consultarSaldo() {
    console.log("\n--- Consultar Saldo ---");
    const numeroDaConta = parseInt(readlineSync.question("Digite o numero da conta: "));
    const conta = encontrarConta(numeroDaConta);

    if (conta) {
        console.log(`\nO saldo da conta de ${conta.nomeDoCliente} é: R$${conta.saldo.toFixed(2)}`);
    } else {
        console.log("\nErro: Conta não encontrada.");
    }
}


// --- Lógica da Interface do Usuário ---

/**
 * Exibe o menu principal de opções.
 */
function exibirMenu() {
    console.log("\n--- Sistema de Gestão Bancária ---");
    console.log("1. Criar nova conta");
    console.log("2. Depositar");
    console.log("3. Sacar");
    console.log("4. Consultar Saldo");
    console.log("0. Sair do sistema");
    console.log("------------------------------------");
}

/**
 * Inicia e gerencia o loop principal do sistema.
 */
function iniciarSistema() {
    let encerrar = false;

    while (!encerrar) {
        exibirMenu();
        const opcao = readlineSync.question("Escolha uma opcao: ");

        switch (opcao) {
            case '1':
                criarConta();
                break;
            case '2':
                depositar();
                break;
            case '3':
                sacar();
                break;
            case '4':
                consultarSaldo();
                break;
            case '0':
                encerrar = true;
                console.log("\nObrigado por utilizar nosso sistema. Até logo!");
                break;
            default:
                console.log("\nOpção inválida! Por favor, escolha um número do menu.");
        }
        
        if (opcao !== '0') {
            readlineSync.question("\nPressione ENTER para continuar...");
        }
    }
}

// Inicia a execução do sistema bancário.
iniciarSistema();