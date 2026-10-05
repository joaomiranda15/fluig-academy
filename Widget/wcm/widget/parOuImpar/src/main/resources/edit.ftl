<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance({'prop1': 'valor1', 'modo': 'Estou na edit'})">
    <div class="panel panel-danger">
        <div class="panel-heading">
            <h3 class="panel-title">Configurações da widget parOuImpar</h3>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <label for="colorpicker_par_${instanceId}">Cor do n° par</label>
                <input class="form-control" id="colorpicker_par_${instanceId}" type="text" name="colorpicker_par_${instanceId}" value="${par!'green'}" />
            </div>

            <div class="form-group">
                <label for="colorpicker_impar_${instanceId}">Cor do n° ímpar</label>
                <input class="form-control" id="colorpicker_impar_${instanceId}" type="text" name="colorpicker_impar_${instanceId}" value="${impar!'red'}" />
            </div>
        </div>
    </div>
</div>


