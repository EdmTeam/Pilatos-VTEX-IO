// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

//SCRIPT DIA SIN IVA //

// $(document).ready(function () { $(window).on("orderFormUpdated.vtex", function (t, e) { calculatePromotions(e) }) }); var calculatePromotions = t => { var e = "", o = "", r = "", n = 0, a = (r = 0, t.storePreferencesData.currencySymbol); if (null != t.ratesAndBenefitsData) { var i = t.ratesAndBenefitsData.rateAndBenefitsIdentifiers, s = t.items; for (let t = 0; t < i.length; t++) { n = 0, r = 0; for (let e = 0; e < s.length; e++)for (let o = 0; o < s[e].priceTags.length; o++)s[e].priceTags[o].identifier == i[t].id && (n += s[e].priceTags[o].value); e = n.toString().substr(0, n.toString().length - 2), r = n.toString().slice("-2"), n = new Intl.NumberFormat("es-CO").format(e), o += `\n                <tr class="promotion-row promotion-row-${i[t].id}">\n                    <td class="info">${i[t].name}</td>\n                    <td class="space"></td>\n                    <td class="monetary">${a} ${n},${r}</td>\n                    <td class="empty"></td>\n                </tr>` } $(".promotion-row").remove(), setTimeout(function () { $(".promotion-row").remove(), $(".totalizers-list").append(o) }, 1e3) } };

//FINALIZA EL SCRIPT //

const CustomCheckout = (function () {
  let init = function () {
    editsOrderForm();
    checkTerms();
    validateTerms();
    editsSummaryCart();
  };

  const editsOrderForm = () => {
    let changePlaceHolderEmail = setInterval(() => {
      if ($("#client-pre-email")) {
        $("#client-pre-email").attr(
          "placeholder",
          "Ingresa tu correo electrÃ³nico"
        );
        clearInterval(changePlaceHolderEmail);
      }
    }, 500);
  };

  const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const pasosCheckout = (location) => {
    var statusCheckout = {
      step1: "cart",
      step2: "profile",
      step3: "shipping",
      step4: "payment",
      step5: "email",
      step6: "orderPlaced",
    };

    $(".checkoutPasos li").click(function (e) {
      e.preventDefault();
      window.location = `/checkout#/${$(this).attr("data-step")}`;
    });

    let assignClassStep = (step) => {
      // console.log(step);
      var htmlStep = setInterval(() => {
        if ($(".checkoutPasos li").length) {
          clearInterval(htmlStep);
          $(".checkoutPasos li").removeClass("pasoActivo currentPaso");
          $('.checkoutPasos li[data-step*="' + step + '"')
            .prevAll()
            .addClass("pasoActivo");
          $('.checkoutPasos li[data-step*="' + step + '"').addClass(
            "pasoActivo currentPaso"
          );
        }
      }, 500);
    };

    if (location.indexOf(statusCheckout.step1) > 0) {
      assignClassStep(statusCheckout.step1);
    }
    if (
      location.indexOf(statusCheckout.step5) > 0 ||
      location.indexOf(statusCheckout.step2) > 0
    ) {
      assignClassStep(statusCheckout.step5);
    }
    if (
      location.indexOf(statusCheckout.step3) > 0 ||
      location.indexOf(statusCheckout.step4) > 0
    ) {
      assignClassStep(statusCheckout.step3);
    }
    if (location.indexOf(statusCheckout.step6) > 0) {
      assignClassStep(statusCheckout.step6);
    }
  };

  const checkTerms = () => {
    let $totalizers = $(
      ".cart-template:not(.mini-cart) .summary-template-holder .cart-totalizers"
    );
    if ($totalizers.length) {
      var newCheck = "";
      newCheck += '    <div id="contain-terms">';
      newCheck += '    <p class="terms-conditions dataCheck">';
      newCheck +=
        '        <label for="terms-conditions" class="checkbox check-label label-error">';
      newCheck +=
        '            <input id="terms-conditions" type="checkbox" required>';
      newCheck += '            <span class="btnCheckbox"></span>';
      newCheck += '            <span class="check-text">';
      newCheck +=
        "                He leÃ­do y aceptado las polÃ­ticas de privacidad y Tratamiento de datos Personales";
      newCheck += "            .</span>";
      newCheck += "        </label>";
      newCheck +=
        '        <span class="help error check-error terms-data-error" style="display:none">';
      newCheck += "            Este campo es obligatorio.";
      newCheck += "        </span>";
      newCheck += "    </p>";
      newCheck +=
        '    <p style="margin-top: 10px; font-size: 12px; color: grey">Mediante la aceptaciÃ³n de la PolÃ­tica de Habeas Data y Tratamiento de Datos personales se certifica que el usuario o cliente es una persona mayor de edad (18 aÃ±os) y podrÃ¡ ser tratada de acuerdo con la polÃ­tica de tratamiento de datos.</p>';
      newCheck += "    </div>";

      $(newCheck).insertAfter($totalizers);

      if (getCookie("terminosCondiciones")) {
        $("#terms-conditions").attr("checked", true);
      }

      $("#terms-conditions, #authorize-data").change(function () {
        let checkInput = $(this);
        if (checkInput.prop("checked") === false) {
          checkInput.parent().next().show();
        } else {
          checkInput.parent().next().hide();
        }
      });
    }
  };

  const validateTerms = () => {
    setTimeout(function () {
      const buttonFinalizePurchase =
        document.getElementById("cart-to-orderform");
      const checkboxTyc = document.getElementById("terms-conditions");
      checkboxTyc.checked = true;

      checkboxTyc.addEventListener("click", function () {
        if (checkboxTyc.checked === true) {
          buttonFinalizePurchase.classList.remove("disabled");
        } else {
          buttonFinalizePurchase.classList.add("disabled");
        }
      });

      $("button#payment-data-submit").on("click", function () {
        const dataClient = {
          documentNumber: window.API.orderForm.clientProfileData.document,
          documentType: "CÃ©dula de CiudadanÃ­a",
          firstName: window.API.orderForm.clientProfileData.firstName,
          isCorporate: window.API.orderForm.clientProfileData.isCorporate,
          lastName: window.API.orderForm.clientProfileData.lastName,
          phone: window.API.orderForm.clientProfileData.phone,
          email: window.API.orderForm.clientProfileData.email,
          acceptTerms: true,
        };
        const validateEmpty = Object.values(dataClient).some(
          (obj) => obj === ""
        );

        if (!validateEmpty) {
          guardarDatosMasterData(dataClient, "CC");
        }
      });
    }, 1000);
  };

  const editsSummaryCart = () => {
    setInterval(() => {
      if ($(".empty-cart-content").is(":hidden")) {
        $(
          ".checkout-container >.cart-template .summary-template-holder .summary"
        ).css("display", "flex");
      } else {
        $(
          ".checkout-container >.cart-template .summary-template-holder .summary"
        ).css("display", "none");
      }
    }, 500);
  };

  const changeResolutionImage = () => {
    if ("#/shipping" == location.hash) {
      $(".vtex-omnishipping-1-x-image").each(function (element) {
        $(this).attr("src", $(this).attr("src").replace("-50-50", "-100-100"));
      });
    }
  };

  const guardarDatosMasterData = (datosInputs, entidadMasterData) => {
    console.log("Estoy en guardarDatosMasterData");
    var contentPost = {
      url: "/api/ds/pub/documents/" + entidadMasterData,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(datosInputs),
      type: "POST",
      beforeSend: function () {},
      success: function (data) {
        console.log("Successfully Registered Customer");
      },
      error: function (data) {
        console.log("Client Registration Error");
      },
      complete: function () {},
    };
    $.ajax(contentPost);
  };

  return {
    init: init,
    pasosCheckout: pasosCheckout,
    changeResolutionImage: changeResolutionImage,
  };
})();

$(document).ready(function () {
  CustomCheckout.init();
  CustomCheckout.pasosCheckout(location.pathname + location.hash);
});
$(document).ajaxStop(function (e) {
  CustomCheckout.changeResolutionImage();
});
$(window).on("hashchange", function () {
  CustomCheckout.changeResolutionImage();
  CustomCheckout.pasosCheckout(location.pathname + location.hash);
});

$(window).on("load", function () {
  CustomCheckout.changeResolutionImage();
});

addiAllySlug = "pilatos-ecommerce";
$.getScript(
  "https://s3.amazonaws.com/statics.addi.com/vtex/js/vtex-checkout-co.bundle.min.js"
);

$(
  ".product-item-attachment-offerings-select option:contains('prices')"
).remove();

// Nequi como medio de pago oculto de PSE
$(window).on("load", function () {
  $(".btn.debit-list-selector").find('option:contains("NEQUI")').hide();
});

// PersonalizaciÃ³n del checkout Express
const CustomCheckoutExpress = (function () {
  // FunciÃ³n para obtener el mÃ©todo de envÃ­o seleccionado de la orden
  const selectedSla = (orderForm) =>
    orderForm.shippingData.logisticsInfo[0].selectedSla;

  // Oculta el mÃ©todo de pago "Contraentrega" y muestra otros mÃ©todos de pago
  const hidePaymentMethod = () => {
    // Elimina el mÃ©todo de pago "Contraentrega"
    $(".pg-contra-entrega").remove();
    // Muestra todos los mÃ©todos de pago excepto "Contraentrega"
    $(".payment-group-list-btn a:not(.pg-contra-entrega)").show();
    // Simula un clic en el primer mÃ©todo de pago distinto de "Contraentrega"
    $(".payment-group-list-btn a:not(.pg-contra-entrega):first-child").click();
  };

  // Muestra todos los mÃ©todos de pago, incluyendo "Contraentrega"
  const showAllPaymentMethods = () => {
    // Muestra "Contraentrega" y otros mÃ©todos de pago
    $(".pg-contra-entrega, .payment-group-list-btn a").show();
    // Simula un clic en el primer mÃ©todo de pago
    $(".payment-group-list-btn a:first-child").click();
  };

  // Valida el mÃ©todo de pago seleccionado segÃºn el mÃ©todo de envÃ­o
  const validatePaymentMethod = function (orderForm) {
    if (!selectedSla(orderForm)) {
      return;
    }

    // Verifica si el mÃ©todo de envÃ­o es "EnvÃ­o a Domicilio Express"
    if (selectedSla(orderForm) === "pickit - EnvÃ­o a Domicilio") {
      console.log(
        "Entro en EnvÃ­o a Domicilio Express",
        selectedSla(orderForm)
      );
      hidePaymentMethod(); // Oculta los mÃ©todos de pago segÃºn las reglas
    } else {
      console.log("Entro en el caso else", selectedSla(orderForm));
      showAllPaymentMethods(); // Muestra todos los mÃ©todos de pago
    }

    // Verifica si el mÃ©todo de envÃ­o es "Recogida en tienda"
    if (selectedSla(orderForm) === "Recogida en tienda (1)") {
      console.log("Recogida en tienda", selectedSla(orderForm));
      hidePaymentMethod(); // Oculta los mÃ©todos de pago segÃºn las reglas
    }
  };

  // Inicializa la personalizaciÃ³n del checkout
  const init = function () {
    $(window).on("hashchange load", function () {
      // Verifica si la pÃ¡gina actual es la pÃ¡gina de pago
      if (location.hash === "#/payment" || location.hash === "#payment") {
        // Obtiene el formulario de orden y realiza validaciones
        vtexjs.checkout.getOrderForm().then(function (orderForm) {
          validatePaymentMethod(orderForm); // Valida el mÃ©todo de pago
        });
      }
    });
  };

  // Expone la funciÃ³n "init" para iniciar la personalizaciÃ³n del checkout
  return {
    init: init,
    hidePaymentMethod: hidePaymentMethod,
  };
})();

// Inicia la personalizaciÃ³n del checkout cuando el documento estÃ© listo
$(document).ready(function () {
  CustomCheckoutExpress.init();

  // Llamar a la funciÃ³n por primera vez para mostrar el mÃ©todo de pago actual
  vtexjs.checkout.getOrderForm().done(function (orderForm) {
    handlePaymentMethodChange(orderForm);
  });
});
// FIN

// OCULTAR EL VALE CUANDO SE SELECCIONA CONTRA ENTREGA

// FunciÃ³n para verificar si estamos en la ruta "/#/payment" o "/#/payment/"
function isInPaymentRoute() {
  const validRoutes = ["#/payment", "/payment"];
  return validRoutes.includes(window.location.hash);
}

// FunciÃ³n para manejar los cambios en el mÃ©todo de pago
function handlePaymentMethodChange(orderForm) {
  if (isInPaymentRoute()) {
    const selectedPaymentMethod =
      orderForm.paymentData.payments[0]?.paymentSystem;

    if (selectedPaymentMethod) {
      // Verificar si el mÃ©todo de pago seleccionado es igual a "201" (Contraentrega)
      if (selectedPaymentMethod === "201") {
        // Ocultar el bloque con el ID "show-gift-card-group" si el mÃ©todo de pago es "Addi"
        $("#show-gift-card-group").hide();
      } else {
        // Mostrar el bloque con el ID "show-gift-card-group" para cualquier otro mÃ©todo de pago
        $("#show-gift-card-group").show();
      }
    }

    //ajuste para validar si existen items de aguabenidta o disandina

    const externalSellers = orderForm.items.some(
      (item) =>
        item.seller == "aguabendita" ||
        ["Quiksilver", "Oakley", "Roxy", "Stance", "Alpinestars"].includes(
          item.additionalInfo.brandName
        )
    );
    if (externalSellers) {
      CustomCheckoutExpress.hidePaymentMethod();
    }
  }
}

// Escuchar el evento "orderFormUpdated" para detectar cambios en el formulario de pedido
$(window).on("orderFormUpdated.vtex", function (e, orderForm) {
  handlePaymentMethodChange(orderForm);
});
