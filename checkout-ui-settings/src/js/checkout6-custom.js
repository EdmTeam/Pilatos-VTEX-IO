// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

//SCRIPT DIA SIN IVA //

$(document).ready(function () {
  $(window).on('orderFormUpdated.vtex', function (t, e) {
    calculatePromotions(e)
  })
})
var calculatePromotions = (t) => {
  var e = '',
    o = '',
    r = '',
    n = 0,
    a = ((r = 0), t.storePreferencesData.currencySymbol)
  if (null != t.ratesAndBenefitsData) {
    var i = t.ratesAndBenefitsData.rateAndBenefitsIdentifiers,
      s = t.items
    for (let t = 0; t < i.length; t++) {
      ;(n = 0), (r = 0)
      for (let e = 0; e < s.length; e++)
        for (let o = 0; o < s[e].priceTags.length; o++)
          s[e].priceTags[o].identifier == i[t].id && (n += s[e].priceTags[o].value)
      ;(e = n.toString().substr(0, n.toString().length - 2)),
        (r = n.toString().slice('-2')),
        (n = new Intl.NumberFormat('es-CO').format(e)),
        (o += `\n                <tr class="promotion-row promotion-row-${i[t].id}">\n                    <td class="info">${i[t].name}</td>\n                    <td class="space"></td>\n                    <td class="monetary">${a} ${n},${r}</td>\n                    <td class="empty"></td>\n                </tr>`)
    }
    $('.promotion-row').remove(),
      setTimeout(function () {
        $('.promotion-row').remove(), $('.totalizers-list').append(o)
      }, 1e3)
  }
}

//FINALIZA EL SCRIPT //

const CustomCheckout = (function () {
  let init = function () {
    editsOrderForm()
    checkTerms()
    validateTerms()
    editsSummaryCart()
    //changePlaceGiftcard()

    document.addEventListener('DOMContentLoaded', function () {
      const giftCardLink = document.querySelector('.link-gift-card');
      if (giftCardLink) {
        giftCardLink.addEventListener('click', function () {
          console.log("You finally clicked without jQuery");
        });
      } else {
        console.log("Element with class 'link-gift-card' not found.");
      }
    });

  }

  const editsOrderForm = () => {
    let changePlaceHolderEmail = setInterval(() => {
      if ($('#client-pre-email')) {
        $('#client-pre-email').attr('placeholder', 'Ingresa tu correo electrónico')
        clearInterval(changePlaceHolderEmail)
      }
    }, 500)
  }

  const getCookie = (name) => {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  const pasosCheckout = (location) => {
    var statusCheckout = {
      step1: 'cart',
      step2: 'profile',
      step3: 'shipping',
      step4: 'payment',
      step5: 'email',
      step6: 'orderPlaced',
    }

    $('.checkoutPasos li').click(function (e) {
      e.preventDefault()
      window.location = `/checkout#/${$(this).attr('data-step')}`
    })

    let assignClassStep = (step) => {
      // console.log(step);
      var htmlStep = setInterval(() => {
        if ($('.checkoutPasos li').length) {
          clearInterval(htmlStep)
          $('.checkoutPasos li').removeClass('pasoActivo currentPaso')
          $('.checkoutPasos li[data-step*="' + step + '"')
            .prevAll()
            .addClass('pasoActivo')
          $('.checkoutPasos li[data-step*="' + step + '"').addClass('pasoActivo currentPaso')
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

  const checkTerms = () => {
    //let $totalizers = $('.cart-template:not(.mini-cart) .summary-template-holder .cart-totalizers');
    const $formProfile = $('.box-client-info-pj')
    if ($formProfile.length) {
      var newCheck = ''
      newCheck += '    <div id="contain-terms">'
      newCheck += '    <p class="terms-conditions dataCheck">'
      newCheck += '        <label for="terms-conditions" class="checkbox check-label label-error">'
      newCheck += '            <input id="terms-conditions" type="checkbox" required>'
      newCheck += '            <span class="btnCheckbox"></span>'
      newCheck += '            <span class="check-text">'
      newCheck +=
        '                He leído y aceptado las <a href="/politicas" target="_blank">políticas de privacidad</a> y <a href="/politicas" target="_blank">Tratamiento de datos Personales</a>'
      newCheck += '            .</span>'
      newCheck += '        </label>'
      newCheck += '        <span class="help error check-error terms-data-error" style="display:none">'
      newCheck += '            Este campo es obligatorio.'
      newCheck += '        </span>'
      newCheck += '    </p>'
      newCheck +=
        '    <p style="margin-top: 10px; font-size: 12px; color: grey">Mediante la aceptación de la Política de Habeas Data y Tratamiento de Datos personales se certifica que el usuario o cliente es una persona mayor de edad (18 años) y podrá ser tratada de acuerdo con la política de tratamiento de datos.</p>'
      newCheck += '    </div>'

      $(newCheck).insertAfter($formProfile)

      if (getCookie('terminosCondiciones')) {
        $('#terms-conditions').attr('checked', true)
      }

      $('#terms-conditions, #authorize-data').change(function () {
        let checkInput = $(this)
        if (checkInput.prop('checked') === false) {
          checkInput.parent().next().show()
        } else {
          checkInput.parent().next().hide()
        }
      })
    }
  }

  const validateTerms = () => {
    setTimeout(function () {
      const buttonFinalizePurchase = document.getElementById('go-to-shipping')
      const checkboxTyc = document.getElementById('terms-conditions')
      checkboxTyc.checked = true

      checkboxTyc.addEventListener('click', function () {
        if (checkboxTyc.checked === true) {
          buttonFinalizePurchase.classList.remove('disabled')
        } else {
          buttonFinalizePurchase.classList.add('disabled')
        }
      })

      $('button#payment-data-submit').on('click', function () {
        const dataClient = {
          documentNumber: window.API.orderForm.clientProfileData.document,
          documentType: 'Cédula de Ciudadanía',
          firstName: window.API.orderForm.clientProfileData.firstName,
          isCorporate: window.API.orderForm.clientProfileData.isCorporate,
          lastName: window.API.orderForm.clientProfileData.lastName,
          phone: window.API.orderForm.clientProfileData.phone,
          email: window.API.orderForm.clientProfileData.email,
          acceptTerms: true,
        }
        const validateEmpty = Object.values(dataClient).some((obj) => obj === '')

        if (!validateEmpty) {
          guardarDatosMasterData(dataClient, 'CC')
        }
      })
    }, 1000)
  }

  const editsSummaryCart = () => {
    setInterval(() => {
      if ($('.empty-cart-content').is(':hidden')) {
        $('.checkout-container >.cart-template .summary-template-holder .summary').css('display', 'flex')
      } else {
        $('.checkout-container >.cart-template .summary-template-holder .summary').css('display', 'none')
      }
    }, 500)
  }

  const changeResolutionImage = () => {
    if ('#/shipping' == location.hash) {
      $('.vtex-omnishipping-1-x-image').each(function (element) {
        $(this).attr('src', $(this).attr('src').replace('-50-50', '-100-100'))
      })
    }
  }

  const guardarDatosMasterData = (datosInputs, entidadMasterData) => {
    console.log('Estoy en guardarDatosMasterData')
    var contentPost = {
      url: '/api/ds/pub/documents/' + entidadMasterData,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(datosInputs),
      type: 'POST',
      beforeSend: function () {},
      success: function (data) {
        console.log('Successfully Registered Customer')
      },
      error: function (data) {
        console.log('Client Registration Error')
      },
      complete: function () {},
    }
    $.ajax(contentPost)
  }

  return {
    init: init,
    pasosCheckout: pasosCheckout,
    changeResolutionImage: changeResolutionImage,
  }
})()

$(document).ready(function () {
  CustomCheckout.init()
  CustomCheckout.pasosCheckout(location.pathname + location.hash)
})
$(document).ajaxStop(function (e) {
  CustomCheckout.changeResolutionImage()
})
$(window).on('hashchange', function () {
  CustomCheckout.changeResolutionImage()
  CustomCheckout.pasosCheckout(location.pathname + location.hash)
})

$(window).on('load', function () {
  CustomCheckout.changeResolutionImage()
})

addiAllySlug = 'pilatos-ecommerce'
$.getScript('https://s3.amazonaws.com/statics.addi.com/vtex/js/vtex-checkout-co.bundle.min.js')

$(".product-item-attachment-offerings-select option:contains('prices')").remove()

// Nequi como medio de pago oculto de PSE
$(window).on('load', function () {
  $('.btn.debit-list-selector').find('option:contains("NEQUI")').hide()
})

// Personalización del checkout Express
const CustomCheckoutExpress = (function () {
  // Función para obtener el método de envío seleccionado de la orden
  const selectedSla = (orderForm) => orderForm.shippingData.logisticsInfo[0].selectedSla

  // Oculta el método de pago "Contraentrega" y muestra otros métodos de pago
  const hidePaymentMethod = () => {
    // Elimina el método de pago "Contraentrega"
    $('.pg-contra-entrega').remove()
    // Muestra todos los métodos de pago excepto "Contraentrega"
    $('.payment-group-list-btn a:not(.pg-contra-entrega)').show()
    // Simula un clic en el primer método de pago distinto de "Contraentrega"
    $('.payment-group-list-btn a:not(.pg-contra-entrega):first-child').click()
  }

  // Muestra todos los métodos de pago, incluyendo "Contraentrega"
  const showAllPaymentMethods = () => {
    // Muestra "Contraentrega" y otros métodos de pago
    $('.pg-contra-entrega, .payment-group-list-btn a').show()
    // Simula un clic en el primer método de pago
    $('.payment-group-list-btn a:first-child').click()
  }

  // Valida el método de pago seleccionado según el método de envío
  const validatePaymentMethod = function (orderForm) {
    if (!selectedSla(orderForm)) {
      return
    }

    // Verifica si el método de envío es "Envío a Domicilio Express"
    if (selectedSla(orderForm) === 'pickit - Envío a Domicilio') {
      console.log('Entro en Envío a Domicilio Express', selectedSla(orderForm))
      hidePaymentMethod() // Oculta los métodos de pago según las reglas
    } else {
      console.log('Entro en el caso else', selectedSla(orderForm))
      showAllPaymentMethods() // Muestra todos los métodos de pago
    }
  }

  // Inicializa la personalización del checkout
  const init = function () {
    $(window).on('hashchange load', function () {
      // Verifica si la página actual es la página de pago
      if (location.hash === '#/payment' || location.hash === '#payment') {
        // Obtiene el formulario de orden y realiza validaciones
        vtexjs.checkout.getOrderForm().then(function (orderForm) {
          validatePaymentMethod(orderForm) // Valida el método de pago

          const sellers = orderForm.sellers || [];
          const itemContraentrega = $('.pg-contra-entrega');
          const hasDifferentSeller = sellers.some(seller => seller.name !== "Estudio de Moda S.A.");

          setTimeout(() => {
            if (hasDifferentSeller) {
                itemContraentrega.addClass('hidden');
                console.log('Hay al menos un vendedor diferente de Estudio de Moda S.A.');
            } else {
                itemContraentrega.removeClass('hidden');
                console.log('Todos los vendedores son Estudio de Moda S.A.');
            }
          }, 800);
        })

        setTimeout(() => {
          document.querySelector('.link-gift-card').addEventListener('click', function () {
            let firstOption = $("#gift-card-provider-selector option:first-child");
            let optionText = firstOption.text();
            console.log("selectedOptionText2", optionText);
            let inputGC = document.querySelector("#payment-discounts-code");
            if (optionText.includes("Gift Card")) {
              $(".payment-discounts-options").addClass('mensaje-ohgift');
              inputGC.placeholder = '1234567891011121314';
              let select = document.getElementById('gift-card-provider-selector');
              let firstOption = select.querySelector('option:first-child');
              select.appendChild(firstOption);
            } else {
              $(".payment-discounts-options").addClass('mensaje-saldo');
              inputGC.placeholder = 'XXXX-XXXX-XXXX-XXXX';
              firstOption.prop('selected', true);
            }

            $("#gift-card-provider-selector").change(function () {
                //  Condicional para cambiar placeholder de gift card y tarjeta de regalo
                let selectedOptionText = $("#gift-card-provider-selector option:selected").text();
                let inputGC = document.querySelector("#payment-discounts-code");
                if (selectedOptionText.includes("Gift Card")) {
                    inputGC.placeholder = '1234567891011121314';
                } else {
                    inputGC.placeholder = 'XXXX-XXXX-XXXX-XXXX';
                }
                // Fin Condicional para cambiar placeholder de gift card y tarjeta de regalo
                let cardSelected = $(this).children("option:selected").val("option:selected").text();
                if (cardSelected == 'Vale de Recompra') {
                    $(".payment-discounts-options").removeClass('mensaje-ohgift');
                    $(".payment-discounts-options").addClass('mensaje-saldo');
                } else {
                    $(".payment-discounts-options").addClass('mensaje-ohgift');
                    $(".payment-discounts-options").removeClass('mensaje-saldo');
                }
            });
          });
        }, 2500);


      }
    })
  }

  // Expone la función "init" para iniciar la personalización del checkout
  return {
    init: init,
  }
})()

// Inicia la personalización del checkout cuando el documento esté listo
$(document).ready(function () {
  CustomCheckoutExpress.init()
})
// FIN

// OCULTAR EL VALE CUANDO SE SELECCIONA CONTRA ENTREGA

// Función para verificar si estamos en la ruta "/#/payment" o "/#/payment/"
function isInPaymentRoute() {
  const validRoutes = ['#/payment', '/payment']
  return validRoutes.includes(window.location.hash)
}

// Función para manejar los cambios en el método de pago
function handlePaymentMethodChange(orderForm) {
  if (isInPaymentRoute()) {
    const selectedPaymentMethod = orderForm.paymentData.payments[0]?.paymentSystem

    if (selectedPaymentMethod) {
      // Verificar si el método de pago seleccionado es igual a "201" (Contraentrega)
      if (selectedPaymentMethod === '201') {
        // Ocultar el bloque con el ID "show-gift-card-group" si el método de pago es "Addi"
        $('#show-gift-card-group').hide()
      } else {
        // Mostrar el bloque con el ID "show-gift-card-group" para cualquier otro método de pago
        $('#show-gift-card-group').show()
      }
    }
  }
}

// Escuchar el evento "orderFormUpdated" para detectar cambios en el formulario de pedido
$(window).on('orderFormUpdated.vtex', function (e, orderForm) {
  handlePaymentMethodChange(orderForm)
})

// Llamar a la función por primera vez para mostrar el método de pago actual
vtexjs.checkout.getOrderForm().done(function (orderForm) {
  handlePaymentMethodChange(orderForm)
})

// Recoger en tienda que oculte el metodo de pago contra entrega
//const hideContraEntregaStore = (location) => {

//if (!location.includes('payment')) return

//const slaList = ['Recogida en tienda (1)']

//const { selectedSla } = vtexjs.checkout.orderForm?.shippingData?.logisticsInfo[0]

//if (!selectedSla) return

//const hide = slaList.includes(selectedSla)

//if (hide) $('.pg-contra-entrega').hide();
//}

//GIFTCARD OGF
const getScreenEndpoint = () => {
  try {
      const { href } = window.location;
      const screen = href.slice(href.lastIndexOf('/') + 1);
      return screen;
  } catch (error) {
      return '';
  }
};

const isGiftcard = (item) => {
  const categoryValues = Object.values(item.productCategories);
  return categoryValues.includes('ohgiftcard');
};

const getGiftcardIndexesAndSkus = (items) => {
  const itemIndexes = [];
  try {
      items.forEach((item, index) => {
          if (isGiftcard(item)) itemIndexes.push({ index, sku: item.id });
      });
  } finally {
      return itemIndexes;
  }
};

const hideHtmlElement = (element) => {
  if (element) {
      element.style.display = 'none';
      element.classList.add('hiddenByScript');
  }
};

const showHiddenElements = () => {
  const elements = Array.from(document.getElementsByClassName('hiddenByScript'));
  for (const element of elements) {
      element.style.display = '';
      element.classList.remove('hiddenByScript');
  }
};

const hideInfoElementByI18n = (i18n) => {
  const infoElements = Array.from(document.getElementsByClassName('info'));
  const foundElement = infoElements.find((element) => element.dataset.i18n === i18n);
  // We hide the parent element which is the row element
  hideHtmlElement(foundElement?.parentElement);
};

const hideElementsByClassName = (className) => {
  const arrayOfElements = document.getElementsByClassName(className);
  for (const element of arrayOfElements) hideHtmlElement(element);
};

const hideElementById = (id) => hideHtmlElement(document.getElementById(id));

const hideShippingCalculator = () => {
  const shippingCalculatorButton = document.getElementById('shipping-calculate-link');
  const shippingCalculatorContainer = shippingCalculatorButton?.parentElement?.parentElement;
  hideHtmlElement(shippingCalculatorContainer);
};

const hideAllShippingInformation = () => {
  hideElementById('shipping-data');
  hideElementById('shipping-preview-container');
  hideInfoElementByI18n('totalizers.Shipping');
  hideElementsByClassName('shipping-date');
  hideElementsByClassName('Shipping');
  hideShippingCalculator();
  const screenEndpoint = getScreenEndpoint();
  if (/shipping/.test(screenEndpoint)) fillShippingDetails();
};

const hidePurchaseSummaryElementBySku = (sku) => {
  const list = document.getElementsByClassName('hproduct item');
  for (const container of list) {
      if (sku === container.dataset.sku) {
          hideHtmlElement(container.getElementsByClassName('shipping-date')[0]);
      }
  }
};

const hideGiftcardsShippingItems = (giftcardsIndexAndSku) => {
  const shippingDetails = document.getElementsByClassName('shp-summary-package');
  const shippingDates = document.querySelectorAll('td.shipping-date');

  for (const giftcardIndexAndSku of giftcardsIndexAndSku) {
      const { index, sku } = giftcardIndexAndSku;
      hideHtmlElement(shippingDetails[index]);
      hideHtmlElement(shippingDates[index]?.firstElementChild);
      hidePurchaseSummaryElementBySku(sku);
  }
};

const scheduleDelayedExcecutions = (functionToExecute) => {
  functionToExecute();
  setTimeout(functionToExecute, 500);
  setTimeout(functionToExecute, 1000);
  setTimeout(functionToExecute, 1500);
};

const updateAllHiddenElements = (items) => {
  showHiddenElements();

  const giftcardIndexesAndSkus = getGiftcardIndexesAndSkus(items);

  const numberOfGiftcards = giftcardIndexesAndSkus?.length || 0;
  if (!numberOfGiftcards) return;

  if (numberOfGiftcards === items.length) {
      scheduleDelayedExcecutions(hideAllShippingInformation);
  } else if (numberOfGiftcards > 0) {
      scheduleDelayedExcecutions(() => hideGiftcardsShippingItems(giftcardIndexesAndSkus));
  }
};

window.addEventListener('DOMContentLoaded', () => defer(addOrderFormListener));

const addOrderFormListener = () => {
  $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
      updateAllHiddenElements(orderForm.items);
  });
};

const defer = (method) => {
  if (window.jQuery) return method();

  setTimeout(() => {
      defer(method);
  }, 50);
};

const setElementValue = (id, value) => {
  const element = document.getElementById(id);
  if (!element) return;

  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  if (valueSetter && valueSetter !== prototypeValueSetter) prototypeValueSetter.call(element, value);
  else valueSetter.call(element, value);

  element.dispatchEvent(new Event('input', { bubbles: true }));
};

const fillShippingDetails = () => {

  setElementValue('ship-postalCode', '3333');
  setElementValue('ship-street', 'Por email');
  setElementValue('ship-number', '1');
  setElementValue('ship-receiverName', 'Por email');

  const firstSelectedAddress = vtexjs.checkout.orderForm.shippingData.selectedAddresses[0];
  if (firstSelectedAddress) {
      if (firstSelectedAddress.city === '') firstSelectedAddress.city = 'Ciudad Autónoma de Buenos Aires';
      if (firstSelectedAddress.number === '') firstSelectedAddress.number = '1';
      if (firstSelectedAddress.postalCode === '') firstSelectedAddress.postalCode = '3333';
      if (firstSelectedAddress.street === '') firstSelectedAddress.street = 'Por email';
      if (firstSelectedAddress.receiverName === '') firstSelectedAddress.receiverName = 'Por email';
  }

  const clickGoToPaymentButton = () => $('#btn-go-to-payment').click();
  scheduleDelayedExcecutions(clickGoToPaymentButton);
};
