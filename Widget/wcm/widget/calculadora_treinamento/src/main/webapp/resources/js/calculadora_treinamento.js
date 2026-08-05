var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,
    operacaoAtual: null,

    //método iniciado quando a widget é carregada
    init: function () {
        this.criarTemplate();
        this.criarObjeto();
        this.spreadOperator();
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
        let v1 = Number($("#valor1").val());
        let v2 = Number($("#valor2").val());

        if (this.operacaoAtual === 'soma') {
            $("#resultado").val(v1 + v2);
        } else if (this.operacaoAtual === 'subtracao') {
            $("#resultado").val(v1 - v2);
        } else if (this.operacaoAtual === 'multiplicacao') {
            $("#resultado").val(v1 * v2);
        } else if (this.operacaoAtual === 'divisao') {
            if (v2 === 0) {
                this.exibirAvisoToast('Divisão por 0 não é permitida!');
            } else {
                $("#resultado").val(v1 / v2);
            }
        }
    },

    exibirAvisoToast: function (message) {
            
        FLUIGC.toast({
            title: 'Atenção:',
            message: 'A operação selecionada foi a divisão por 0. Por favor troque o número antes de concluir a operação.',
            type: 'warning'
        });
    },

    valorVazio: function (message) {
        if ($("#valor1").val() == '') {
            $("#valor1").val(0);

        } else if ($("#valor2") == '') {
            $("#valor2").val(0)
        }
    },

    criarTemplate: function() {
        const numeros = [10, , 30];

        const [a, b = 20, c] = numeros; // Quando o b for vazio, segundo a chamada de números, então, o valor dele será 20.

        console.log(a, b, c);
    },

    criarObjeto: function() {
        const usuario = { nome: "Bruno", idade: 30};
        const { nome: n, idade: i } = usuario;
        console.log(n,i);
    },

    spreadOperator: function() {
        const numeros = [1,2,3];
        const novosNumeros = [...numeros,4,5,6,7]; // A nova Array vai receber os valores da primeira Array, com os novos números que foram adicionados ("4,...,7")

        console.log(novosNumeros);
    }
});

