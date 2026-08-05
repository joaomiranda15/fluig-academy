var MyWidget = SuperWidget.extend({
    //variáveis da widget
    init() {
        this.criarTemplate();
    },

    criarTemplate: function() {
        const pessoa = {
            nome: "Brunão",
            idade: 30
        }

        console.log(pessoa.nome);
        console.log(pessoa.idade);
    }
});

