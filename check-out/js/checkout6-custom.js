function changeResolutionImage() {
  if("#/shipping" == location.hash){
    $(".vtex-omnishipping-1-x-image").each(function(element){
        $(this).attr("src", $(this).attr("src").replace("-50-50","-100-100"))
    })
  }
}
$(document).ajaxStop(function (e) {
  changeResolutionImage();
}),
$(window).on("hashchange", function () {
  setTimeout(function () {
    changeResolutionImage();
  }, 700)
});
$(window).on("load", function () {
  setTimeout(function () {
    changeResolutionImage();
  }, 1000)
}),
$(document).on('ready', function () {
  $(window).on('orderFormUpdated.vtex', function (e, orderForm) {
      /* var uniques = [];
      $('.cart-items').find('.product-item').each(function (index, item) {
          var seller = $(item).find('.product-name').find('span[data-bind="text: sellerName"]').text();

          if ( !uniques.includes(seller) ) {
              uniques.push(seller);
              $(item).find('.product-image').before('<div class="seller-top">' + seller + '</div>');
          }
      }); */

      $('.coupon-fieldset #cart-coupon').attr('placeholder', 'Ingresa el código');
  });

  var sbs =  '<div id="step-by-step-container">';
      sbs +=      '<div class="step-by-step-wrap">';
      sbs +=          '<div class="sbs sbs-1">';
      sbs +=              '<div class="circle">1</div>';
      sbs +=              '<p>RESUMEN DE LA COMPRA</p>';
      sbs +=          '</div>';
      sbs +=          '<div class="sbs sbs-2">';
      sbs +=              '<div class="circle">2</div>';
      sbs +=              '<p>INGRESA TU E-MAIL</p>';
      sbs +=          '</div>';
      sbs +=          '<div class="sbs sbs-3">';
      sbs +=              '<div class="circle">3</div>';
      sbs +=              '<p>MÉTODO DE ENTREGA Y PAGO</p>';
      sbs +=          '</div>';
      sbs +=          '<div class="sbs sbs-4">';
      sbs +=              '<div class="circle">4</div>';
      sbs +=              '<p>CONFIRMACIÓN DE COMPRA</p>';
      sbs +=          '</div>';
      sbs +=      '</div>';
      sbs += '</div>';

  $('.container-main').prepend(sbs);


  /* ########################  ########################### */
  /* ############### STEP BY STEP FUNCTION ############### */
  /* ########################  ########################### */

  var cart_status = {
      cart: {
          active: '.sbs-1'
      },
      email: {
          successfully: ['.sbs-1'],
          active: '.sbs-2'
      },
      payment: {
          successfully: ['.sbs-1', '.sbs-2'],
          active: '.sbs-3'
      },
      shipping: {
          successfully: ['.sbs-1', '.sbs-2'],
          active: '.sbs-3'
      },
      profile: {
          successfully: ['.sbs-1', '.sbs-2'],
          active: '.sbs-3'
      }
  };

  setTimeout(function () { status_active(window.location.hash.split('/')[1]); }, 2000);

  function status_active(hash_value) {
      $('.sbs').removeClass('sbs-active sbs-success');

      console.log(hash_value);
      if ( Object.keys(cart_status[hash_value]).includes('successfully') ) {
          cart_status[hash_value].successfully.forEach(function (success) {
              $(success).addClass('sbs-success');
          });
      }

      $(cart_status[hash_value].active).addClass('sbs-active');
  }

  $('.btn-success, #orderform-to-cart, #orderform-minicart-to-cart, #btn-client-pre-email').on('click', function () {
      setTimeout(function () { status_active(window.location.hash.split('/')[1]); }, 2000);
  });



var pCheckTermConditions = document.createElement("p");
var attributesCheckTermConditions = {
  class: "terms-conditions"
};

var htmlTerms = '';
htmlTerms += '<label for="terms-check" class="checkbox check-label">';
htmlTerms += 	'<input id="terms-check"type="checkbox" />';
htmlTerms +=     '<span class="check-text">';
htmlTerms +=         'He leído y acepto los <a class="custom-link" href="/terminos-y-condiciones" target="_blank">Términos y Condiciones</a>';
htmlTerms +=     '</span>';
htmlTerms += '</label>';
htmlTerms += '<span class="help error check-term-error" style="display: none;">Este campo es obligatorio.</span>';

htmlTerms += '<label for="terms-check" class="checkbox check-label">';
htmlTerms += 	'<input id="policy-check"type="checkbox" />';
htmlTerms +=     '<span class="check-text">';
htmlTerms +=         'He leído y acepto las <a href="/clausula-de-consentimiento" target="_blank">Condiciones</a> y <a href="/tratamiento-de-datos-personales" target="_blank">Tratamiento de mis Datos</a>';
htmlTerms +=     '</span>';
htmlTerms += '</label>';
htmlTerms += '<span class="help error check-term-error" style="display: none;">Este campo es obligatorio.</span>';

pCheckTermConditions.innerHTML = htmlTerms;

var newsletter = document.querySelector(".newsletter");
for(var key in attributesCheckTermConditions) {
  pCheckTermConditions.setAttribute(key, attributesCheckTermConditions[key]);
}

newsletter.parentElement.insertBefore(pCheckTermConditions, newsletter);

$('#go-to-shipping').trigger('click');

$('#go-to-shipping').next();

var payButton = '';
payButton += '<button>'

$('.btn-submit-wrapper').append('<button type="submit" id="go-payment" class="submit btn btn-large btn-success">CONTINUAR</button>');

var count = 0;

$('.box-client-info').on('change', '#terms-check', function () {
  if ( $(this).is(':checked') ) {
    count += 1;
  } else {
    count -= 1;
  }

  if ( count >= 2 ) {
    $('#go-payment').css({ 'pointer-events': 'initial', 'opacity': '1'});
  } else {
    $('#go-payment').css({ 'pointer-events': 'none', 'opacity': '0.4' });
  }
});

});
