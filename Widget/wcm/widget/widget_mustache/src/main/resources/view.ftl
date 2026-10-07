<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
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
    <div class="col-md-4">
        <div class="card">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-body">
                <h3 class="card-title">Card title</h3>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
       </div>
    </div>

    </script>

    <div data-pessoasTemplate></div>

    <div data-meuPrimeiroTemplate></div>
</div>
