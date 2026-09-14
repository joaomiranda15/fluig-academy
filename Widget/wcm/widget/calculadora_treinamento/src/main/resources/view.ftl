<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
    <h2>Estou usando o view.ftl</h2>
    <div class="panel panel-danger">
        <div class="panel-heading">
            <h3 class="panel-title mensagem">Calculadora Academy Aluno</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class ="form-group">
                    <label for="valor1_${instanceId}">primeiro número:</label>
                    <input type="number" id="valor1_${instanceId}" name="valor1">
                    <label for="valor2_${instanceId}">Segundo número:</label>
                    <input type="number" id="valor2_${instanceId}" name="valor2">
                </div>
            </div>
            <div class="row">
                <div class="form-group">
                    <label for="resultado_${instanceId}">Resultado:</label>
                    <input type="number" readonly id="resultado_${instanceId}" name="resultado" class="resultado">
                </div>
            </div>
            <hr>

            <div class="row">
                <div class="form-group">
                    <button type="button" class="btn btn-default" data-adicao><i class="flaticon flaticon-add-plus icon-xl" aria-hidden="true"></i></button>

                    <button type="button" class="btn btn-default" data-subtracao><i class="flaticon flaticon-minus icon-xl" aria-hidden="true"></i></button>

                    <button type="button" class="btn btn-default" data-multiplicacao><i class="animaliaicon animaliaicon-x icon-xl" aria-hidden="true"></i></button>

                    <button type="button" class="btn btn-default divisao" data-divisao><i class="animaliaicon animaliaicon-divide icon-xl" aria-hidden="true"></i></button>
                </div>
            </div>
            <button type="button" class="btn btn-success" data-confirmar><i class="animaliaicon animaliaicon-equals icon-xl" aria-hidden="true"></i></button>
        </div>
    </div>
</div>

