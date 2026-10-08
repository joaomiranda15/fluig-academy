<div id="myWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="myWidget.instance({})">
    <script id="meuPrimeiroTemplate" type="text/template">
        <div class="row">
            <div class="col-md-3">
                {{title}} spends {{calc}}
            </div>
        </div>    
    </script>
    
    <script id="pessoasTemplate" type="text/template">
        <div class="row">
            {{#pessoas}}
            <div class="col-md-3">
                <p>{{nome}} possui {{idade}} anos de idade</p>
            </div>
            {{/pessoas}}
        </div>    
    </script>

    <script id="produtosTemplate" type="text/template">

    <div class="row">

    {{#produtos}}
    <div class="col-md-4">
        <div class="card">
            <img class="card-img-top" src="{{icone}}" alt="{{alt}}">
            <div class="card-body">
                <h3 class="card-title">{{nome}}</h3>
                <p class="card-text">{{descricao}}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                {{#avaliacao}}
                    <p class="card-text">Avaliação feita por {{autor}}: {{conteudo}}</p>
                {{/avaliacao}}

                {{^avaliacao}}
                    <p class="card-text">Não tem avaliações</p>
                {{/avaliacao}}

            </div>
        </div>
       </div>
    {{/produtos}}
    </div>

    </script>

    <div data-pessoasTemplate>Exemplo 1</div>

    <div data-meuPrimeiroTemplate>Exxemplo 2</div>

    <div data-produtosTemplate>Exemplo 3</div>
</div>
