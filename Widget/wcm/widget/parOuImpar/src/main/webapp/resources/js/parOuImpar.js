var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'enviar': ['click_enviar']
        },
        global: {}
    },
 
    enviar: function(htmlElement, event) {
        var numero = Number($("#numero").val());

        if (numero % 2 == 0) {
            $("#numero").css('background-color', 'red');
        } else {
            $("#numero").css('background-color', 'green');
        }
    }

});

