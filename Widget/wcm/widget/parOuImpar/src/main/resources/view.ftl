<#assign parametros = "{'prop1': 'valor 1', 'modo': 'estou na view', 'par': '${par!''}', 'impar': '${impar!''}'}">

<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance(${parametros})">
    <h2>Estou usando o view.ftl</h2>
    <div class="panel panel-danger">
        <div class="panel-heading">
            <h3 class="panel-title">Par ou ímpar</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class ="form-group">
                    <label for="numero">Número:</label>
                    <input type="number" id="numero_${instanceId}" name="numero_${instanceId}" placeholder="Digite o número">
                </div>
            </div>
            <hr>
            <div class="row">
                <div class ="form-group">
                    <p style="color: ${par!'green'}">Cor do número par</p>
                    <p style="color: ${impar!'red'}">Cor do número ímpar</p>
                </div>
            </div>

            <div class="row">
                <button type="button" class="btn btn-info" data-verificarParImpar>Verificar</button>
            </div>
        </div>
    </div>
</div>

