var HelloWorld = SuperWidget.extend({
    variavelNumerica: null,
    variavelCaracter: null,

    init: function () {
        this.exemploMustache();
        this.exemploMustache1();
        this.exemploMustache2();
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

    exemploMustache2: function () {
        const view = {
        produtos: [
            {"nome": "Produto A",
            "descricao": "alguma descrição do produto aqui",
            "preco": "R$ 112,00",
            }
        ]
        };
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