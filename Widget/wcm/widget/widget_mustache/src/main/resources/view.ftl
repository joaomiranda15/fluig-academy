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

    <div data-pessoasTemplate></div>

    <div data-meuPrimeiroTemplate></div>
</div>
