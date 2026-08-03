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
            'chamarEvento2': ['click_minhaFuncao1'],
            'chamarEvento3': ['dblclick_minhaFuncao2'],
            'chamarEvento1': ['mouseover_minhaFuncao3'],
            'chamarEvento4': ['click_minhaFuncao4']
        },
        global: {}
    },
 
    minhaFuncao1: function(htmlElement, event) {
        console.log("Cliquei no botão 2");

    },

    minhaFuncao2: function (htmlElement, event) {
        console.log("Dei um clique duplo no botão 3");
    },

    minhaFuncao3: function (htmlElement, event) {
        console.log("Passei o mouse encima do botão 1.");
    },

    minhaFuncao4: function(htmlElement, event) {
        var email = $("#exampleInputEmail1_" + this.instanceId).val();
        console.log("Valor do email: " + email);
    }

});

