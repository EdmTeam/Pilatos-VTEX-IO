$(document).ready(function() {
    $(window).on("orderFormUpdated.vtex", function(e, t) {
        calculatePromotions(t);
    });
});

var calculatePromotions = e => {
    var t, a, o = "", i = 0, s = e.storePreferencesData.currencySymbol;
    if (null != e.ratesAndBenefitsData) {
        var r = e.ratesAndBenefitsData.rateAndBenefitsIdentifiers, c = e.items;
        for (let n = 0; n < r.length; n++) {
            for (let t = i = 0; t < c.length; t++) for (let e = 0; e < c[t].priceTags.length; e++) c[t].priceTags[e].identifier == r[n].id && (i += c[t].priceTags[e].value);
            t = i.toString().substr(0, i.toString().length - 2), a = i.toString().slice("-2"), 
            i = new Intl.NumberFormat("es-CO").format(t), o += `
                <tr class="promotion-row promotion-row-${r[n].id}">
                    <td class="info">${r[n].name}</td>
                    <td class="space"></td>
                    <td class="monetary">${s} ${i},${a}</td>
                    <td class="empty"></td>
                </tr>`;
        }
        $(".promotion-row").remove(), setTimeout(function() {
            $(".promotion-row").remove(), $(".totalizers-list").append(o);
        }, 1e3);
    }
};

const CustomCheckout = function() {
    const n = e => {
        for (var t = e + "=", n = document.cookie.split(";"), a = 0; a < n.length; a++) {
            for (var o = n[a]; " " == o.charAt(0); ) o = o.substring(1, o.length);
            if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
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
                var e = $(".box-client-info-pj"), t;
                e.length && (t = "", t += '    <div id="contain-terms">    <p class="terms-conditions dataCheck">        <label for="terms-conditions" class="checkbox check-label label-error">            <input id="terms-conditions" type="checkbox" required>            <span class="btnCheckbox"></span>            <span class="check-text">                He leído y aceptado las <a href="/politicas" target="_blank">políticas de privacidad</a> y <a href="/politicas" target="_blank">Tratamiento de datos Personales</a>            .</span>        </label>        <span class="help error check-error terms-data-error" style="display:none">            Este campo es obligatorio.        </span>    </p>    <p style="margin-top: 10px; font-size: 12px; color: grey">Mediante la aceptación de la Política de Habeas Data y Tratamiento de Datos personales se certifica que el usuario o cliente es una persona mayor de edad (18 años) y podrá ser tratada de acuerdo con la política de tratamiento de datos.</p>    </div>', 
                $('    <div id="contain-terms">    <p class="terms-conditions dataCheck">        <label for="terms-conditions" class="checkbox check-label label-error">            <input id="terms-conditions" type="checkbox" required>            <span class="btnCheckbox"></span>            <span class="check-text">                He leído y aceptado las <a href="/politicas" target="_blank">políticas de privacidad</a> y <a href="/politicas" target="_blank">Tratamiento de datos Personales</a>            .</span>        </label>        <span class="help error check-error terms-data-error" style="display:none">            Este campo es obligatorio.        </span>    </p>    <p style="margin-top: 10px; font-size: 12px; color: grey">Mediante la aceptación de la Política de Habeas Data y Tratamiento de Datos personales se certifica que el usuario o cliente es una persona mayor de edad (18 años) y podrá ser tratada de acuerdo con la política de tratamiento de datos.</p>    </div>').insertAfter(e), 
                n("terminosCondiciones") && $("#terms-conditions").attr("checked", !0), 
                $("#terms-conditions, #authorize-data").change(function() {
                    var e = $(this);
                    !1 === e.prop("checked") ? e.parent().next().show() : e.parent().next().hide();
                }));
            }
            setTimeout(function() {
                const e = document.getElementById("go-to-shipping"), t = document.getElementById("terms-conditions");
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
            var t = "cart", n = "profile", a = "shipping", o = "payment", i = "email", s = "orderPlaced", r = ($(".checkoutPasos li").click(function(e) {
                e.preventDefault(), window.location = "/checkout#/" + $(this).attr("data-step");
            }), e => {
                var t = setInterval(() => {
                    $(".checkoutPasos li").length && (clearInterval(t), $(".checkoutPasos li").removeClass("pasoActivo currentPaso"), 
                    $('.checkoutPasos li[data-step*="' + e + '"').prevAll().addClass("pasoActivo"), 
                    $('.checkoutPasos li[data-step*="' + e + '"').addClass("pasoActivo currentPaso"));
                }, 500);
            });
            0 < e.indexOf(t) && r(t), (0 < e.indexOf(i) || 0 < e.indexOf(n)) && r(i), 
            (0 < e.indexOf(a) || 0 < e.indexOf(o)) && r(a), 0 < e.indexOf(s) && r(s);
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
    const t = e => e.shippingData.logisticsInfo[0].selectedSla, n = () => {
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
                    n) : (console.log("Entro en el caso else", t(e)), a))();
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

const getScreenEndpoint = () => {
    try {
        var e = window.location["href"];
        return e.slice(e.lastIndexOf("/") + 1);
    } catch (e) {
        return "";
    }
}, isGiftcard = e => {
    return Object.values(e.productCategories).includes("ohgiftcard");
}, getGiftcardIndexesAndSkus = e => {
    const n = [];
    try {
        e.forEach((e, t) => {
            isGiftcard(e) && n.push({
                index: t,
                sku: e.id
            });
        });
    } finally {
        return n;
    }
}, hideHtmlElement = e => {
    e && (e.style.display = "none", e.classList.add("hiddenByScript"));
}, showHiddenElements = () => {
    for (const e of Array.from(document.getElementsByClassName("hiddenByScript"))) e.style.display = "", 
    e.classList.remove("hiddenByScript");
}, hideInfoElementByI18n = t => {
    var e = Array.from(document.getElementsByClassName("info")).find(e => e.dataset.i18n === t);
    hideHtmlElement(e?.parentElement);
}, hideElementsByClassName = e => {
    for (const t of document.getElementsByClassName(e)) hideHtmlElement(t);
}, hideElementById = e => hideHtmlElement(document.getElementById(e)), hideShippingCalculator = () => {
    var e = document.getElementById("shipping-calculate-link")?.parentElement?.parentElement;
    hideHtmlElement(e);
}, hideAllShippingInformation = () => {
    hideElementById("shipping-data"), hideElementById("shipping-preview-container"), 
    hideInfoElementByI18n("totalizers.Shipping"), hideElementsByClassName("shipping-date"), 
    hideElementsByClassName("Shipping"), hideShippingCalculator();
    var e = getScreenEndpoint();
    /shipping/.test(e) && fillShippingDetails();
}, hidePurchaseSummaryElementBySku = e => {
    for (const t of document.getElementsByClassName("hproduct item")) e === t.dataset.sku && hideHtmlElement(t.getElementsByClassName("shipping-date")[0]);
}, hideGiftcardsShippingItems = e => {
    var t = document.getElementsByClassName("shp-summary-package"), n = document.querySelectorAll("td.shipping-date");
    for (const i of e) {
        var {
            index: a,
            sku: o
        } = i;
        hideHtmlElement(t[a]), hideHtmlElement(n[a]?.firstElementChild), hidePurchaseSummaryElementBySku(o);
    }
}, scheduleDelayedExcecutions = e => {
    e(), setTimeout(e, 500), setTimeout(e, 1e3), setTimeout(e, 1500);
}, updateAllHiddenElements = e => {
    showHiddenElements();
    const t = getGiftcardIndexesAndSkus(e);
    var n = t?.length || 0;
    n && (n === e.length ? scheduleDelayedExcecutions(hideAllShippingInformation) : 0 < n && scheduleDelayedExcecutions(() => hideGiftcardsShippingItems(t)));
}, addOrderFormListener = (window.addEventListener("DOMContentLoaded", () => defer(addOrderFormListener)), 
() => {
    $(window).on("orderFormUpdated.vtex", (e, t) => {
        updateAllHiddenElements(t.items);
    });
}), defer = e => {
    if (window.jQuery) return e();
    setTimeout(() => {
        defer(e);
    }, 50);
}, setElementValue = (e, t) => {
    var n, a, e = document.getElementById(e);
    e && (n = Object.getOwnPropertyDescriptor(e, "value").set, a = Object.getPrototypeOf(e), 
    a = Object.getOwnPropertyDescriptor(a, "value").set, (n && n !== a ? a : n).call(e, t), 
    e.dispatchEvent(new Event("input", {
        bubbles: !0
    })));
}, fillShippingDetails = () => {
    setElementValue("ship-postalCode", "3333"), setElementValue("ship-street", "Por email"), 
    setElementValue("ship-number", "1"), setElementValue("ship-receiverName", "Por email");
    var e = vtexjs.checkout.orderForm.shippingData.selectedAddresses[0];
    e && ("" === e.city && (e.city = "Ciudad Autónoma de Buenos Aires"), "" === e.number && (e.number = "1"), 
    "" === e.postalCode && (e.postalCode = "3333"), "" === e.street && (e.street = "Por email"), 
    "" === e.receiverName) && (e.receiverName = "Por email");
    scheduleDelayedExcecutions(() => $("#btn-go-to-payment").click());
};