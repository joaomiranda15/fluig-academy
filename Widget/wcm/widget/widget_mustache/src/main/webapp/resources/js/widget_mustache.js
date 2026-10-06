var HelloWorld = SuperWidget.extend({
    variavelNumerica: null,
    variavelCaracter: null,

    init: function () {
        this.exemploMustache();
        this.exemploMustache1();
    },

    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {},
    },

    exemploMustache1: function () {
        const view = {
        pessoas: [
            {"nome": "joao", "idade": "18"},
            {"nome": "luisa", "idade": "18"},
        ]
        };

        var template = document.getElementById("pessoasTemplate").innerHTML
        const output = Mustache.render(template, view);
        $("[data-pessoasTemplate]").append(output);
    },

    exemploMustache: function () {

        const view = {
        title: "Joe",
        calc: function () { return 2 + 4 },
        };

        var template = document.getElementById("meuPrimeiroTemplate").innerHTML
        const output = Mustache.render(template, view);
        $("[data-meuPrimeiroTemplate]").append(output);
        }
});