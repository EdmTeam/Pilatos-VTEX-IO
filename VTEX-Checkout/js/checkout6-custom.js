// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

const CustomCheckout = function () {

    let init = function () {
        general()
        editsOrderForm()
        // validateDocument()
        checkTerms()
        editsProfileForm()
        editsSummaryCart()
    }

    const general = () => {

    }
    const editsOrderForm = () => {
        let changePlaceHolderEmail = setInterval(() => {
            if ($('#client-pre-email')) {
                $('#client-pre-email').attr('placeholder', 'Ingresa tu correo electrónico');
                clearInterval(changePlaceHolderEmail)
            }
        }, 500);
    }

    const setCookie = (name, value, days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    const getCookie = (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    const eraseCookie = (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    const pasosCheckout = (location) => {

        /* ESTRUCTURA PASOS CHECKOUT*/
        /*
        <ul class="checkoutPasos">
            <li class="pasoActivo currentPaso" data-step="cart">
                <div class="icon">
                    <i class="icom-checkout-resumen-compra"></i>
                </div>
                <p class="nameStep">RESUMEN DE <br />COMPRA</p>
            </li>
            <li data-step="email">
                <div class="icon">
                    <i class="icom-checkout-ingreso-email"></i>
                </div>
                <p class="nameStep">INGRESA TU <br />EMAIL</p>
            </li>
            <li data-step="shipping">
                <div class="icon">
                    <i class="icom-checkout-envio-pago"></i>
                </div>
                <p class="nameStep">ENVÍO Y <br />PAGO</p>
            </li>
            <li data-step="orderPlaced">
                <div class="icon">
                    <i class="icom-checkout-pedido-confirmado"></i>
                </div>
                <p class="nameStep">PEDIDO <br />CONFIRMADO</p>
            </li>
        </ul>
        */

        var statusCheckout = {
            "step1": "cart",
            "step2": "profile",
            "step3": "shipping",
            "step4": "payment",
            "step5": "email",
            "step6": "orderPlaced",
        }

        $('.checkoutPasos li').click(function (e) {
            e.preventDefault();
            window.location = `/checkout#/${$(this).attr('data-step')}`
        });

        let assignClassStep = (step) => {
            // console.log(step);
            var htmlStep = setInterval(() => {
                if ($('.checkoutPasos li').length) {
                    clearInterval(htmlStep)
                    $('.checkoutPasos li').removeClass('pasoActivo currentPaso');
                    $('.checkoutPasos li[data-step*="' + step + '"').prevAll().addClass('pasoActivo');
                    $('.checkoutPasos li[data-step*="' + step + '"').addClass('pasoActivo currentPaso');
                }
            }, 500)
        }

        if (location.indexOf(statusCheckout.step1) > 0) {
            assignClassStep(statusCheckout.step1)
        }
        if (location.indexOf(statusCheckout.step5) > 0 || location.indexOf(statusCheckout.step2) > 0) {
            assignClassStep(statusCheckout.step5)
        }
        if (location.indexOf(statusCheckout.step3) > 0 || location.indexOf(statusCheckout.step4) > 0) {
            assignClassStep(statusCheckout.step3)
        }
        if (location.indexOf(statusCheckout.step6) > 0) {
            assignClassStep(statusCheckout.step6)
        }

    }

    const editsProfileForm = () => {
        var $docTypeSelect = $('<select>').attr("id", "client-doc-type");
        var $originaldocTypSelect = $('#client-document-type');
        var $clientNewdocument = $('#client-new-document');
        var $checkTerms = $("#terms-conditions");
        var $checkData = $("#authorize-data");

        const endCookies = (24 * 2)

        // docTypeSelector($docTypeSelect, $originaldocTypSelect, $clientNewdocument)

        $('#go-to-shipping, #go-to-payment').click(function (e) {
            // e.preventDefault();
            // if ($docTypeSelect.val().lenght !== '') {
            //   checkDocTypeExist($docTypeSelect.val(), $originaldocTypSelect, $docTypeSelect)
            // }

            $('.dataCheck input').each(function () {
                let $checkProfile = $(this);
                if ($checkProfile.prop("checked") === false) {
                    $checkProfile.parent().next().show()
                }
            })
            // if ($originaldocTypSelect.val().length > 0 && $clientNewdocument.val().length > 0 && $checkTerms.prop("checked") === true && $checkData.prop("checked") === true) {
            if ($checkTerms.prop("checked") === true) {
                // console.log('PUEDE AVANZAR');
                // eraseCookie('numDocumento')
                // eraseCookie('tipoDocumento')
                eraseCookie('terminosCondiciones')
                // eraseCookie('tratamientoDatos')
                // setCookie('numDocumento', $clientNewdocument.val(), endCookies)
                // setCookie('tipoDocumento', $originaldocTypSelect.val(), endCookies)
                setCookie('terminosCondiciones', true, endCookies)
                // setCookie('tratamientoDatos', true, endCookies)
                // console.log(e.target)
                // console.log(e.target.id)

                const dataClient = {
                    documentNumber: document.getElementById("client-document").value,
                    documentType: "Cédula de Ciudadanía",
                    firstName: document.getElementById("client-first-name").value,
                    isCorporate: (document.getElementById("client-company-ie") && document.getElementById("client-company-ie").value != "") ? true : false,
                    lastName: document.getElementById("client-last-name").value,
                    phone: document.getElementById("client-phone").value,
                    email: document.getElementById("client-email").value,
                    acceptTerms: true,
                }
                const validateEmpty = Object.values(dataClient).some(obj => obj === "");
                
                if (!validateEmpty) {
                    guardarDatosMasterData(dataClient, "CC");
                }

                switch (e.target.id) {
                    case 'go-to-shipping':
                        window.location.hash = 'shipping'
                        break;
                    case 'go-to-payment':
                        window.location.hash = 'payment'
                        break;
                }
            }
            else {
                // console.log('NO PUEDE AVANZAR');
            }
        });
    };

    const checkTerms = () => {
        let $newsletter = $('.box-client-info .newsletter');
        if ($newsletter.length) {
            var newCheck = '';

            newCheck += '    <p id="contain-terms" class="terms-conditions dataCheck">'
            newCheck += '        <label for="terms-conditions" class="checkbox check-label label-error">'
            newCheck += '            <input id="terms-conditions" type="checkbox" required>'
            newCheck += '            <span class="btnCheckbox"></span>'
            newCheck += '            <span class="check-text">'
            newCheck += '                He leído y aceptado las políticas de privacidad y Tratamiento de datos Personales'
            /*
            newCheck += '                <a href="/estatico/terminos-condiciones" target="_blank" class="linkAcceptTerms">Términos y Condiciones </a>'
            newCheck += '                y las '
            newCheck += '                <a href="/estatico/politicas-privacidad" target="_blank" class="linkAcceptTerms">Políticas de uso de cookies</a>'
            */
            newCheck += '            .</span>'
            newCheck += '        </label>'
            newCheck += '        <span class="help error check-error terms-data-error" style="display:none">'
            newCheck += '            Este campo es obligatorio.'
            newCheck += '        </span>'
            newCheck += '    </p>'
            /*
            newCheck += '    <p id="contain-authorize" class="authorize-data dataCheck">'
            newCheck += '        <label for="authorize-data" class="checkbox check-label label-error">'
            newCheck += '            <input id="authorize-data" type="checkbox" required>'
            newCheck += '            <span class="btnCheckbox"></span>'
            newCheck += '            <span class="check-text">'
            newCheck += '                Acepto recibir comunicaciones informativas y/o promocionales relacionadas a los diversos productos y servicios que se comercializan en Diners Club Mall'
            newCheck += '            .</span>'
            newCheck += '        </label>'
            newCheck += '        <span class="help error check-error authorize-data-error" style="display:none">'
            newCheck += '            Este campo es obligatorio.'
            newCheck += '        </span>'
            newCheck += '    </p>'
            */

            $(newCheck).insertBefore($newsletter)
            if (getCookie('terminosCondiciones')) {
                $('#terms-conditions').attr("checked", true)
            }
            // if (getCookie('tratamientoDatos')) {
            //   $('#authorize-data').attr("selected", "selected")
            // }

            $('#terms-conditions, #authorize-data').change(function () {
                let checkInput = $(this);
                if (checkInput.prop("checked") === false) {
                    checkInput.parent().next().show()
                }
                else {
                    checkInput.parent().next().hide()
                }
            })

        }
    }

    const docTypeSelector = (selectDoc, inputOrgDoc, inputNumDoc) => {

        var docTypeOptions;
        docTypeOptions += '<option value="">Selecciona un Tipo</option>';
        docTypeOptions += '<option value="DNI">DNI</option>';
        docTypeOptions += '<option value="DNI Extranjero">DNI Extranjero</option>';

        $(docTypeOptions).appendTo(selectDoc);
        inputOrgDoc.before(selectDoc).trigger('blur');

        $('#no-document-key').trigger('click');

        if (getCookie('tipoDocumento')) {
            checkDocTypeExist(getCookie('tipoDocumento'), inputOrgDoc, selectDoc)
            inputNumDoc.val(getCookie('numDocumento')).addClass('success').removeClass('error');
        }
        if (inputOrgDoc.val().length > 0) {
            selectDoc.find('option').removeAttr('selected');
            selectDoc.find('option[value="' + inputOrgDoc.val() + '"]').prop("selected", "selected");
        }

        selectDoc.change(function () {
            checkDocTypeExist($(this).val(), inputOrgDoc, $(this))
        });
    }

    const checkDocTypeExist = (value, inputOrgDoc, selectDoc) => {
        inputOrgDoc.val(value);

        if (value !== '') {
            // console.log('if')
            selectDoc.removeClass('error')
            inputOrgDoc.addClass('success').removeClass('error');
            inputOrgDoc.next().removeClass('showError')
        }
        else {
            // console.log('else')
            selectDoc.addClass('error')
            inputOrgDoc.addClass('error').removeClass('success');
            inputOrgDoc.next().addClass('showError')
        }
    };

    const validateDocument = () => {
        $('#client-document, #client-new-document').keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($('#client-doc-type').val() !== '') {
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A, Command+A
                    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: home, end, left, right, down, up
                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            }
        });
    };

    const editsSummaryCart = () => {
        setInterval(() => {
            if ($(".empty-cart-content").is(":hidden")) {
                $('.checkout-container >.cart-template .summary-template-holder .summary').css('display', 'flex');
            }
            else {
                $('.checkout-container >.cart-template .summary-template-holder .summary').css('display', 'none');
            }
        }, 500);
    }

    const changeResolutionImage = () => {
        if ('#/shipping' == location.hash) {
            $('.vtex-omnishipping-1-x-image').each(function (element) {
                $(this).attr(
                    'src',
                    $(this).attr('src').replace('-50-50', '-100-100')
                );
            });
        }
    }

    const guardarDatosMasterData = (datosInputs, entidadMasterData) => {
        console.log("Estoy en guardarDatosMasterData");
        var contentPost = {
            url: "/api/ds/pub/documents/" + entidadMasterData,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(datosInputs),
            type: "POST",
            beforeSend: function () {

            },
            success: function (data) {
                console.log("Successfully Registered Customer")
            },
            error: function (data) {
                console.log("Client Registration Error")
            },
            complete: function () {

            },
        }
        $.ajax(contentPost);
    };

    return {
        init: init,
        pasosCheckout: pasosCheckout,
        changeResolutionImage: changeResolutionImage
    }
}()

$(document).ready(function () {
    CustomCheckout.init()
    CustomCheckout.pasosCheckout((location.pathname + location.hash));
});
$(document).ajaxStop(function (e) {
    CustomCheckout.changeResolutionImage();
})
$(window).on('hashchange', function () {
    CustomCheckout.changeResolutionImage();
    CustomCheckout.pasosCheckout((location.pathname + location.hash));
});

$(window).on('load', function () {
    CustomCheckout.changeResolutionImage();
})

addiAllySlug='pilatos-ecommerce';
$.getScript('https://s3.amazonaws.com/statics.addi.com/vtex/js/vtex-checkout-co.bundle.min.js');

$(".product-item-attachment-offerings-select option:contains('prices')").remove();

// inicio codigo
$(document).ready(function() {
  // Obtener el elemento .newsletter-text
  const containerForm = $(".terms-conditions.dataCheck");

  // Crear el mensaje
  const containerInfo = $("<div>Mediante la aceptación de la Política de Habeas Data y Tratamiento de Datos personales se certifica que el usuario o cliente es una persona mayor de edad (18 años) y podrá ser tratada de acuerdo con la política de tratamiento de datos.</div>");

  // Agregar estilos al mensaje
  containerInfo.css({
    marginTop: "10px",
    fontSize: "12px",
    color: "grey"
  });

  // Agregar el mensaje después del elemento .newsletter-text
  containerForm.after(containerInfo);
});

 // Nequi como medio de pago oculto de PSE
$( window ).on( "load", function() {$(".btn.debit-list-selector").find('option:contains("NEQUI")').hide()})