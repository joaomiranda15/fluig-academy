var myWidget = SuperWidget.extend({
    variavelNumerica: null,
    variavelCaracter: null,

    init: function () {
        try { this.exemploMustache(); } catch (e) { console.error("exemploMustache:", e); }
        try { this.exemploMustache1(); } catch (e) { console.error("exemploMustache1:", e); }
        try { this.exemploMustache2(); } catch (e) { console.error("exemploMustache2:", e); }
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
            "alt": "Alternativo da imagem",
            "icone": "/widget_mustache/resources/images/bg-card-default.png",
            "avaliacao": [
                {"autor": "FUlano 1", "conteudo": "Descricao da avaliacao"},
                {"autor": "Pessoa 2", "conteudo": "Descricao da avaliacao 2"},
            ],
            },
            {"nome": "Produto B",
            "descricao": "alguma descrição do produto aqui",
            "preco": "R$ 122,00",
            "alt": "Imagem do card",
            "icone": "/widget_mustache/resources/images/bg-card-default.png",
            "avaliacao": [
                
            ],
            }
        ]
        };
        var template = document.getElementById("produtosTemplate").innerHTML
        const output = Mustache.render(template, view);
        $("[data-produtosTemplate]").append(output);
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