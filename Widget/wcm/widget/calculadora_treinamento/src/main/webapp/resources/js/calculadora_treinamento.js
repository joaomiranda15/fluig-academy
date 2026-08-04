var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,
    operacaoAtual: null,

    //método iniciado quando a widget é carregada
    init: function() {
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'adicao': ['adicao'],
            'subtracao': ['subtracao'],
            'multiplicacao': ['multiplicacao'],
            'divisao': ['divisao'],
            'confirmar': ['confirmar']
        },
        global: {}
    },
 
    adicao: function(htmlElement, event) {
        this.operacaoAtual = 'soma';
    },

    subtracao: function(htmlElement, event) {
        this.operacaoAtual = 'subtracao';
    },

    multiplicacao: function(htmlElement, event) {
        this.operacaoAtual = 'multiplicacao';
    },

    divisao: function(htmlElement, event) {
        this.operacaoAtual = 'divisao';
    },

    confirmar: function(htmlElement, event) {
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
                alert('Divisão por zero não é permitida!');
            } else {
                $("#resultado").val(v1 / v2);
            }
        }
    }

});

