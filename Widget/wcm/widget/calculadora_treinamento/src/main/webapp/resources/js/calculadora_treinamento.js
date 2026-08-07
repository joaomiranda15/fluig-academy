var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,
    operacaoAtual: null,

    //método iniciado quando a widget é carregada
    init: function () {
        // this.criarTemplate();
        // this.criarObjeto();
        // this.spreadOperator();
        // this.restOperator();
        // this.gerarObjeto("aleatorio");
        // // this.metodoAleatorio();
        // this.jQuery();
    },

    //BIND de eventos
    bindings: {
        local: {
            'adicao': ['click_adicao'],
            'subtracao': ['click_subtracao'],
            'multiplicacao': ['click_multiplicacao'],
            'divisao': ['click_divisao'],
            'confirmar': ['click_confirmar']
        },
        global: {}
    },

    adicao: function (htmlElement, event) {
        this.operacaoAtual = 'soma';
    },

    subtracao: function (htmlElement, event) {
        this.operacaoAtual = 'subtracao';
    },

    multiplicacao: function (htmlElement, event) {
        this.operacaoAtual = 'multiplicacao';
    },

    divisao: function (htmlElement, event) {
        this.operacaoAtual = 'divisao';
    },

    confirmar: function (htmlElement, event) {
        let idBase = this.instanceId; // Criando a variável para o instanceId dos elementos na Widget
        let valor1Id = '#valor1_' + idBase; // Concatenando o id + o instanceId
        let valor2Id = '#valor2_' + idBase;
        let resultado = '#resultado_' + idBase;

        this.valorVazio();

        let v1 = Number($(valor1Id).val());
        let v2 = Number($(valor2Id).val());

        if (!this.operacaoAtual) {
            this.exibirAvisoToast('Selecione uma operação entes de enviar.');
            return;
        }
        else if (this.operacaoAtual === 'soma') {
            $(resultado).val(v1 + v2);
        } else if (this.operacaoAtual === 'subtracao') {
            $(resultado).val(v1 - v2);
        } else if (this.operacaoAtual === 'multiplicacao') {
            $(resultado).val(v1 * v2);
        } else if (this.operacaoAtual === 'divisao') {
            if (v2 === 0) {
                this.exibirAvisoToast('Divisão por 0 não é permitida!');
            } else {
                $(resultado).val(v1 / v2);
            }
        }
    },

    exibirAvisoToast: function (message) {
        FLUIGC.toast({
            title: 'Atenção:',
            message: message,
            type: 'warning'
        });
    },

    valorVazio: function () {
        let idBase = this.instanceId; // Criando a variável para o instanceId dos elementos na Widget
        let valor1Id = '#valor1_' + idBase; // Concatenando o id + o instanceId
        let valor2Id = '#valor2_' + idBase;

        if ($(valor1Id).val() === '') {
            $(valor1Id).val(0);

        } 

        if ($(valor2Id) === '') {
            $(valor2Id).val(0);
        }
    }

    // criarTemplate: function() {
    //     const numeros = [10, , 30];

    //     const [a, b = 20, c] = numeros; // Quando o b for vazio, segundo a chamada de números, então, o valor dele será 20.

    //     console.log(a, b, c);
    // },

    // criarObjeto: function() {
    //     const usuario = { nome: "Bruno", idade: 30};
    //     const { nome: n, idade: i } = usuario;
    //     console.log(n,i);
    // },

    // spreadOperator: function() {
    //     const numeros = [1,2,3];
    //     const novosNumeros = [...numeros,4,5,6,7]; // A nova Array vai receber os valores da primeira Array, com os novos números que foram adicionados ("4,...,7")

    //     console.log(novosNumeros);
    // },

    // restOperator() {
    //     function soma(...numeros) {
    //         return numeros.reduce((total, n) => total + n, 0)
    //     }
    //     console.log(soma(1,2,3,4));
    // },

    // gerarObjeto(aleatorio) {
    //     const campo = "email";
    //     const usuario = {
    //         nome: "Brunalha",
    //         [campo]: "brunera@email.com",
    //         [aleatorio]: "Aleatório"
    //     };
    //     console.log(campo, usuario)
    // },

    // // metodoAleatorio() {
    // //     valor = 10;
    // //     console.log(valor)
    // // },

    // jQuery() {
    //     $('.mensagem').css('color', 'blue');

    //     // Usando js moderno

    //     this.DOM.querySelector('.mensagem').style.backgroundColor = 'green'; 
    //     // DOM serve para mostrar para o js que só se quer realizar a alteração na Widget.
    // }
});

