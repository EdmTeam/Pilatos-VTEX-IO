$(document).ready(function() {
    $(window).on("orderFormUpdated.vtex", function(e, t) {
        calculatePromotions(t);
    });
});

var calculatePromotions = e => {
    var t, n, a = "", s = 0, i = e.storePreferencesData.currencySymbol;
    if (null != e.ratesAndBenefitsData) {
        var r = e.ratesAndBenefitsData.rateAndBenefitsIdentifiers, c = e.items;
        for (let o = 0; o < r.length; o++) {
            for (let t = s = 0; t < c.length; t++) for (let e = 0; e < c[t].priceTags.length; e++) c[t].priceTags[e].identifier == r[o].id && (s += c[t].priceTags[e].value);
            t = s.toString().substr(0, s.toString().length - 2), n = s.toString().slice("-2"), 
            s = new Intl.NumberFormat("es-CO").format(t), a += `
                <tr class="promotion-row promotion-row-${r[o].id}">
                    <td class="info">${r[o].name}</td>
                    <td class="space"></td>
                    <td class="monetary">${i} ${s},${n}</td>
                    <td class="empty"></td>
                </tr>`;
        }
        $(".promotion-row").remove(), setTimeout(function() {
            $(".promotion-row").remove(), $(".totalizers-list").append(a);
        }, 1e3);
    }
};

const CustomCheckout = function() {
    const o = e => {
        for (var t = e + "=", o = document.cookie.split(";"), n = 0; n < o.length; n++) {
            for (var a = o[n]; " " == a.charAt(0); ) a = a.substring(1, a.length);
            if (0 == a.indexOf(t)) return a.substring(t.length, a.length);
        }
        return null;
    };
    const n = (e, t) => {
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
                o("terminosCondiciones") && $("#terms-conditions").attr("checked", !0), 
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
                    Object.values(e).some(e => "" === e) || n(e, "CC");
                });
            }, 1e3), setInterval(() => {
                $(".empty-cart-content").is(":hidden") ? $(".checkout-container >.cart-template .summary-template-holder .summary").css("display", "flex") : $(".checkout-container >.cart-template .summary-template-holder .summary").css("display", "none");
            }, 500), document.addEventListener("DOMContentLoaded", function() {
                var e = document.querySelector(".link-gift-card");
                e ? e.addEventListener("click", function() {
                    console.log("You finally clicked without jQuery");
                }) : console.log("Element with class 'link-gift-card' not found.");
            });
        },
        pasosCheckout: e => {
            var t = "cart", o = "profile", n = "shipping", a = "payment", s = "email", i = "orderPlaced", r = ($(".checkoutPasos li").click(function(e) {
                e.preventDefault(), window.location = "/checkout#/" + $(this).attr("data-step");
            }), e => {
                var t = setInterval(() => {
                    $(".checkoutPasos li").length && (clearInterval(t), $(".checkoutPasos li").removeClass("pasoActivo currentPaso"), 
                    $('.checkoutPasos li[data-step*="' + e + '"').prevAll().addClass("pasoActivo"), 
                    $('.checkoutPasos li[data-step*="' + e + '"').addClass("pasoActivo currentPaso"));
                }, 500);
            });
            0 < e.indexOf(t) && r(t), (0 < e.indexOf(s) || 0 < e.indexOf(o)) && r(s), 
            (0 < e.indexOf(n) || 0 < e.indexOf(a)) && r(n), 0 < e.indexOf(i) && r(i);
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
    const a = e => e.shippingData.logisticsInfo[0].selectedSla, s = () => {
        $(".pg-contra-entrega").remove(), $(".payment-group-list-btn a:not(.pg-contra-entrega)").show(), 
        $(".payment-group-list-btn a:not(.pg-contra-entrega):first-child").click();
    }, i = () => {
        $(".pg-contra-entrega, .payment-group-list-btn a").show(), $(".payment-group-list-btn a:first-child").click();
    };
    return {
        init: function() {
            $(window).on("hashchange load", function() {
                "#/payment" !== location.hash && "#payment" !== location.hash || (vtexjs.checkout.getOrderForm().then(function(e) {
                    t = e, a(t) && ("pickit - Envío a Domicilio" === a(t) ? (console.log("Entro en Envío a Domicilio Express", a(t)), 
                    s) : (console.log("Entro en el caso else", a(t)), i))();
                    var t = e.sellers || [];
                    const o = $(".pg-contra-entrega"), n = t.some(e => "Estudio de Moda S.A." !== e.name);
                    setTimeout(() => {
                        n ? (o.addClass("hidden"), console.log("Hay al menos un vendedor diferente de Estudio de Moda S.A.")) : (o.removeClass("hidden"), 
                        console.log("Todos los vendedores son Estudio de Moda S.A."));
                    }, 800);
                }), setTimeout(() => {
                    document.querySelector(".link-gift-card").addEventListener("click", function() {
                        var e, t = $("#gift-card-provider-selector option:first-child"), o = t.text(), n = (console.log("selectedOptionText2", o), 
                        document.querySelector("#payment-discounts-code"));
                        o.includes("Gift Card") ? ($(".payment-discounts-options").addClass("mensaje-ohgift"), 
                        n.placeholder = "1234567891011121314", e = (o = document.getElementById("gift-card-provider-selector")).querySelector("option:first-child"), 
                        o.appendChild(e)) : ($(".payment-discounts-options").addClass("mensaje-saldo"), 
                        n.placeholder = "XXXX-XXXX-XXXX-XXXX", t.prop("selected", !0)), 
                        $("#gift-card-provider-selector").change(function() {
                            var e = $("#gift-card-provider-selector option:selected").text(), t = document.querySelector("#payment-discounts-code"), e = (e.includes("Gift Card") ? t.placeholder = "1234567891011121314" : t.placeholder = "XXXX-XXXX-XXXX-XXXX", 
                            $(this).children("option:selected").val("option:selected").text());
                            "Vale de Recompra" == e ? ($(".payment-discounts-options").removeClass("mensaje-ohgift"), 
                            $(".payment-discounts-options").addClass("mensaje-saldo")) : ($(".payment-discounts-options").addClass("mensaje-ohgift"), 
                            $(".payment-discounts-options").removeClass("mensaje-saldo"));
                        });
                    });
                }, 2500));
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
    const o = [];
    try {
        e.forEach((e, t) => {
            isGiftcard(e) && o.push({
                index: t,
                sku: e.id
            });
        });
    } finally {
        return o;
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
    var t = document.getElementsByClassName("shp-summary-package"), o = document.querySelectorAll("td.shipping-date");
    for (const s of e) {
        var {
            index: n,
            sku: a
        } = s;
        hideHtmlElement(t[n]), hideHtmlElement(o[n]?.firstElementChild), hidePurchaseSummaryElementBySku(a);
    }
}, scheduleDelayedExcecutions = e => {
    e(), setTimeout(e, 500), setTimeout(e, 1e3), setTimeout(e, 1500);
}, updateAllHiddenElements = e => {
    showHiddenElements();
    const t = getGiftcardIndexesAndSkus(e);
    var o = t?.length || 0;
    o && (o === e.length ? scheduleDelayedExcecutions(hideAllShippingInformation) : 0 < o && scheduleDelayedExcecutions(() => hideGiftcardsShippingItems(t)));
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
    var o, n, e = document.getElementById(e);
    e && (o = Object.getOwnPropertyDescriptor(e, "value").set, n = Object.getPrototypeOf(e), 
    n = Object.getOwnPropertyDescriptor(n, "value").set, (o && o !== n ? n : o).call(e, t), 
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