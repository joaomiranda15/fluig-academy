var MyWidget = SuperWidget.extend({   
	
    //método iniciado quando a widget é carregada
    init: function() {
    	
    	if(this.isEditMode == true){
    		console.log("Estou no modo de edição!");
    		this.iniciarColorPicker();
    	} else {
    		console.log("Estou no modo de view!");
    	}
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'chamarEvento1': ['click_minhaFuncao1'],
            'chamarEvento2': ['dblclick_minhaFuncao2'],
            'chamarEvento3': ['mouseover_minhaFuncao3'],
            'chamarEvento4': ['click_minhaFuncao4'],
            'salvarDados': ['click_salvarDadosParImpar'],
            'calculaMedia': ['click_calculaMedia']
        },
        global: {}
    },
    calculaMedia: function(){
		var nota1 = $("#nota1_"+this.instanceId).val();
		var nota2 = $("#nota2_"+this.instanceId).val();
		var nota3 = $("#nota3_"+this.instanceId).val();

		$("#media_"+this.instanceId).val((nota1+nota2+nota3)/ 3);

    	var numero = $("#media_"+this.instanceId).val();
    	
    	if(numero >= 7){
    		console.log("A média " + numero + " é superior ");
    		
    		$("#media_"+this.instanceId).css({
    			"color": this.superior,
    			"border-color": this.superior
    		});
    	} else{
    		console.log("A média " + numero + " é inferior ");
    		
    		$("#media_"+this.instanceId).css({
    			"color": this.inferior,
    			"border-color": this.inferior
    		});
    	}
    },
    salvarDadosParImpar: function(){
    	var hexPar = $("#colorpicker_superior_"+this.instanceId).val();
    	var hexImpar = $("#colorpicker_inferior_"+this.instanceId).val();
    	
    	var preferences = {
		   par: hexPar,
		   impar: hexImpar
		};
		  
		WCMSpaceAPI.PageService.UPDATEPREFERENCES({
		    async: true,
		    success: function (data) {
		        console.log("Valores salvos com sucesso!");
		        console.log(data);
		        FLUIGC.toast({
		        	title: 'Sucesso: ',
		        	message: 'Os dados foram salvos!',
		        	type: 'success'
		        });
		    },
		    fail: function (xhr, message, errorData) {
		    	console.log("Erro ao salvar dados!");
		        console.log(xhr, message, errorData);
		        FLUIGC.toast({
		        	title: 'Erro: ',
		        	message: 'Não foi possível salvar os dados!',
		        	type: 'danger'
		        });
		    }
		}, this.instanceId, preferences);
    },
    iniciarColorPicker: function(){
    	var settings = {
		    changeDelay: 200,
		    control: 'wheel',
		    inline: false,
		    letterCase: 'lowercase',
		    opacity: true,
		    position: 'bottom left',
		    customColorNames: {
		        'mycustomcolor': '#123456'
		    }
		} 
		var myColorPickerSuperior = FLUIGC.colorpicker('#colorpicker_par_'+this.instanceId, settings);
    	var myColorPickerInferior = FLUIGC.colorpicker('#colorpicker_impar_'+this.instanceId, settings);
    },

});

