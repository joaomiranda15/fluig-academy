var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,
    par : null,
    impar: null,

    //método iniciado quando a widget é carregada
    init: function() {

        if (this.isEditMode == true) {
            console.log("Estou no modo de edição");
            this.iniciarColorPicker();
        } else {
            console.log("Estou no modo de view.")
        }
    },
  
    //BIND de eventos
    bindings: {
        local: {
            // 'enviar': ['click_enviar'],
            // 'salvarDados': ['click_salvarDadosParImpar'],
            'verificarParImpar': ['click_pintarCampoParImpar'],
        },
        global: {}
    },


    pintarCampoParImpar: function () {
        var numero = $("#numero_" + this.instanceId).val();
        if (numero % 2 == 0) {
            console.log("O número " + numero + " é par ${par}");
            $("#numero_"+this.instanceId).css({
                "color": "green",
                "border-color": "green"
            })
        } else {
            console.log("O número " + numero + " é ímpar ${impar}")
            $("#numero_"+this.instanceId).css({
                "color": "red",
                "border-color": "red"
            })
        }
    },

    // salvarDadosParImpar: function () {
    //     var hexPar = $("#colorpicker_par_"+this.instanceId).val();
    //     var hexImpar = $("#colorpicker_impar_"+this.instanceId).val();
    //     var preferences = {
    //     par: hexPar,
    //     impar: hexImpar
    // };
    
    // WCMSpaceAPI.PageService.UPDATEPREFERENCES({
    //     async: true,
    //     success: function (data) {
    //         console.log("Valores salvos com sucesso");

    //         console.log(data);
    //         FLUIGC.toast({
    //             title: 'Sucesso ',
    //             message: 'Os dados foram salvos',
    //             type: 'success'
    //     });
    //     },
    //     fail: function (xhr, message, errorData) {
    //         console.log("Erro ao salvar dados!");

    //         console.log(xhr,message,errorData);
    //         FLUIGC.toast({
    //             title: 'Erro: ',
    //             message: 'Não foi possível salvar os dados',
    //             type: 'danger'
    //     });
    //     }
    // }, this.instanceId, preferences
    // );
    // },
    
    iniciarColorPicker: function() {
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
    var myColorPickerPar = FLUIGC.colorpicker('#colorpicker_par_'+ this.instanceId, settings);
    var myColorPickerImpar = FLUIGC.colorpicker('#colorpicker_impar_' + this.instanceId, settings);
    },

    // enviar: function(htmlElement, event) {
    //     var numero = Number($("#numero").val());

    //     if (numero % 2 == 0) {
    //         $("#numero_${instanceId}").css('background-color', 'green');
    //     } else {
    //         $("#numero_${instanceId}").css('background-color', 'red');
    //     }
    // }

});

