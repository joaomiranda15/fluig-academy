<#assign parametros = "{'prop1':'valor 1','modo':'estou na view', 'par': '${par!''}', 'impar': '${impar!''}'}">


<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance(${parametros})">
	
	<div class="panel panel-primary">
	    <div class="panel-heading">
	        <h3 class="panel-title">"Boletim Escolar - Bem-vindo, ${pageRender.getUser().fullName}</h3>
	    </div>
	    <div class="panel-body">
			<table class="table">
				<tr>
					<td>
						<label>Matéria</label>
						<input id="materia_${instanceId}" placeholder="Digite o nome da matéria">
					</td>
				</tr>
				
				<tr>
					<td>
						<label>Nota 1</label>
						<input id="nota1_${instanceId}" placeholder="Digite a nota 1">
					</td>
				</tr>
				
				<tr>
					<td>
						<label>Nota 2</label>
						<input id="nota2_${instanceId}" placeholder="Digite a nota 2">
					</td>
					<td></td>
				</tr>

				<tr>
					<td>
						<label>Nota 3</label>
						<input id="nota3_${instanceId}" placeholder="Digite a nota 3">
					</td>
				</tr>
				
				<tr>
					<td>
						<label>Média</label>
						<input id="media_${instanceId}" readonly>
						<button type="button" class="btn btn-info" data-calculaMedia>Calcular Médias</button>
					</td>
				</tr>

			</table>
	    </div>
	</div>
	
	
</div>

