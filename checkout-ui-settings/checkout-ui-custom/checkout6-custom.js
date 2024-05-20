$(document).ready(function() {
    $(window).on("orderFormUpdated.vtex", function(e, t) {
        calculatePromotions(t);
    });
});

var calculatePromotions = e => {
    var t, a, n = "", s = 0, i = e.storePreferencesData.currencySymbol;
    if (null != e.ratesAndBenefitsData) {
        var r = e.ratesAndBenefitsData.rateAndBenefitsIdentifiers, c = e.items;
        for (let o = 0; o < r.length; o++) {
            for (let t = s = 0; t < c.length; t++) for (let e = 0; e < c[t].priceTags.length; e++) c[t].priceTags[e].identifier == r[o].id && (s += c[t].priceTags[e].value);
            t = s.toString().substr(0, s.toString().length - 2), a = s.toString().slice("-2"), 
            s = new Intl.NumberFormat("es-CO").format(t), n += `
                <tr class="promotion-row promotion-row-${r[o].id}">
                    <td class="info">${r[o].name}</td>
                    <td class="space"></td>
                    <td class="monetary">${i} ${s},${a}</td>
                    <td class="empty"></td>
                </tr>`;
        }
        $(".promotion-row").remove(), setTimeout(function() {
            $(".promotion-row").remove(), $(".totalizers-list").append(n);
        }, 1e3);
    }
};

const CustomCheckout = function() {
    const o = e => {
        for (var t = e + "=", o = document.cookie.split(";"), a = 0; a < o.length; a++) {
            for (var n = o[a]; " " == n.charAt(0); ) n = n.substring(1, n.length);
            if (0 == n.indexOf(t)) return n.substring(t.length, n.length);
        }
        return null;
    };
    const a = (e, t) => {
        console.log("Estoy en guardarDatosMasterData");
        t = {
            url: "/api/ds/pub/documents/" + t,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(e),
            type: "POST",
            beforeSend: function() {},
            success: function(e) {
                console.log("Successfully Registered Customer");
            },
            error: function(e) {
                console.log("Client Registration Error");
            },
            complete: function() {}
        };
        $.ajax(t);
    };
    return {
        init: function() {
            {
                let e = setInterval(() => {
                    $("#client-pre-email") && ($("#client-pre-email").attr("placeholder", "Ingresa tu correo electrónico"), 
                    clearInterval(e));
                }, 500);
            }
            {
                var e = $(".cart-template:not(.mini-cart) .summary-template-holder .cart-totalizers"), t;
                e.length && (t = "", t += '    <div id="contain-terms">    <p class="terms-conditions dataCheck">        <label for="terms-conditions" class="checkbox check-label label-error">            <input id="terms-conditions" type="checkbox" required>            <span class="btnCheckbox"></span>            <span class="check-text">                He leído y aceptado las políticas de privacidad y Tratamiento de datos Personales            .</span>        </label>        <span class="help error check-error terms-data-error" style="display:none">            Este campo es obligatorio.        </span>    </p>    <p style="margin-top: 10px; font-size: 12px; color: grey">Mediante la aceptación de la Política de Habeas Data y Tratamiento de Datos personales se certifica que el usuario o cliente es una persona mayor de edad (18 años) y podrá ser tratada de acuerdo con la política de tratamiento de datos.</p>    </div>', 
                $('    <div id="contain-terms">    <p class="terms-conditions dataCheck">        <label for="terms-conditions" class="checkbox check-label label-error">            <input id="terms-conditions" type="checkbox" required>            <span class="btnCheckbox"></span>            <span class="check-text">                He leído y aceptado las políticas de privacidad y Tratamiento de datos Personales            .</span>        </label>        <span class="help error check-error terms-data-error" style="display:none">            Este campo es obligatorio.        </span>    </p>    <p style="margin-top: 10px; font-size: 12px; color: grey">Mediante la aceptación de la Política de Habeas Data y Tratamiento de Datos personales se certifica que el usuario o cliente es una persona mayor de edad (18 años) y podrá ser tratada de acuerdo con la política de tratamiento de datos.</p>    </div>').insertAfter(e), 
                o("terminosCondiciones") && $("#terms-conditions").attr("checked", !0), 
                $("#terms-conditions, #authorize-data").change(function() {
                    var e = $(this);
                    !1 === e.prop("checked") ? e.parent().next().show() : e.parent().next().hide();
                }));
            }
            setTimeout(function() {
                const e = document.getElementById("cart-to-orderform"), t = document.getElementById("terms-conditions");
                t.checked = !0, t.addEventListener("click", function() {
                    !0 === t.checked ? e.classList.remove("disabled") : e.classList.add("disabled");
                }), $("button#payment-data-submit").on("click", function() {
                    var e = {
                        documentNumber: window.API.orderForm.clientProfileData.document,
                        documentType: "Cédula de Ciudadanía",
                        firstName: window.API.orderForm.clientProfileData.firstName,
                        isCorporate: window.API.orderForm.clientProfileData.isCorporate,
                        lastName: window.API.orderForm.clientProfileData.lastName,
                        phone: window.API.orderForm.clientProfileData.phone,
                        email: window.API.orderForm.clientProfileData.email,
                        acceptTerms: !0
                    };
                    Object.values(e).some(e => "" === e) || a(e, "CC");
                });
            }, 1e3), setInterval(() => {
                $(".empty-cart-content").is(":hidden") ? $(".checkout-container >.cart-template .summary-template-holder .summary").css("display", "flex") : $(".checkout-container >.cart-template .summary-template-holder .summary").css("display", "none");
            }, 500);
        },
        pasosCheckout: e => {
            var t = "cart", o = "profile", a = "shipping", n = "payment", s = "email", i = "orderPlaced", r = ($(".checkoutPasos li").click(function(e) {
                e.preventDefault(), window.location = "/checkout#/" + $(this).attr("data-step");
            }), e => {
                var t = setInterval(() => {
                    $(".checkoutPasos li").length && (clearInterval(t), $(".checkoutPasos li").removeClass("pasoActivo currentPaso"), 
                    $('.checkoutPasos li[data-step*="' + e + '"').prevAll().addClass("pasoActivo"), 
                    $('.checkoutPasos li[data-step*="' + e + '"').addClass("pasoActivo currentPaso"));
                }, 500);
            });
            0 < e.indexOf(t) && r(t), (0 < e.indexOf(s) || 0 < e.indexOf(o)) && r(s), 
            (0 < e.indexOf(a) || 0 < e.indexOf(n)) && r(a), 0 < e.indexOf(i) && r(i);
        },
        changeResolutionImage: () => {
            "#/shipping" == location.hash && $(".vtex-omnishipping-1-x-image").each(function(e) {
                $(this).attr("src", $(this).attr("src").replace("-50-50", "-100-100"));
            });
        }
    };
}(), CustomCheckoutExpress = ($(document).ready(function() {
    CustomCheckout.init(), CustomCheckout.pasosCheckout(location.pathname + location.hash);
}), $(document).ajaxStop(function(e) {
    CustomCheckout.changeResolutionImage();
}), $(window).on("hashchange", function() {
    CustomCheckout.changeResolutionImage(), CustomCheckout.pasosCheckout(location.pathname + location.hash);
}), $(window).on("load", function() {
    CustomCheckout.changeResolutionImage();
}), addiAllySlug = "pilatos-ecommerce", $.getScript("https://s3.amazonaws.com/statics.addi.com/vtex/js/vtex-checkout-co.bundle.min.js"), 
$(".product-item-attachment-offerings-select option:contains('prices')").remove(), 
$(window).on("load", function() {
    $(".btn.debit-list-selector").find('option:contains("NEQUI")').hide();
}), function() {
    const t = e => e.shippingData.logisticsInfo[0].selectedSla, o = () => {
        $(".pg-contra-entrega").remove(), $(".payment-group-list-btn a:not(.pg-contra-entrega)").show(), 
        $(".payment-group-list-btn a:not(.pg-contra-entrega):first-child").click();
    }, a = () => {
        $(".pg-contra-entrega, .payment-group-list-btn a").show(), $(".payment-group-list-btn a:first-child").click();
    };
    return {
        init: function() {
            $(window).on("hashchange load", function() {
                "#/payment" !== location.hash && "#payment" !== location.hash || vtexjs.checkout.getOrderForm().then(function(e) {
                    e = e, t(e) && ("pickit - Envío a Domicilio" === t(e) ? (console.log("Entro en Envío a Domicilio Express", t(e)), 
                    o) : (console.log("Entro en el caso else", t(e)), a))();
                });
            });
        }
    };
}());

function isInPaymentRoute() {
    return [ "#/payment", "/payment" ].includes(window.location.hash);
}

function handlePaymentMethodChange(e) {
    isInPaymentRoute() && (e = e.paymentData.payments[0]?.paymentSystem) && ("201" === e ? $("#show-gift-card-group").hide() : $("#show-gift-card-group").show());
}

$(document).ready(function() {
    CustomCheckoutExpress.init();
}), $(window).on("orderFormUpdated.vtex", function(e, t) {
    handlePaymentMethodChange(t);
}), vtexjs.checkout.getOrderForm().done(function(e) {
    handlePaymentMethodChange(e);
});