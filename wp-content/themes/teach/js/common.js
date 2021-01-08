;
//$(function () {

//  $('nav').scrollToFixed({
//    marginTop: 0,
//    preFixed: function () {
//      $(this).find('.logo').css({
//        'opacity': '1',
//        'visibility': 'visible'
//      });
//      $(this).find('.header-contacts').css({
//        'opacity': '1',
//        'visibility': 'visible'
//      });
//    },
//    postFixed: function () {
//      $(this).find('.logo').css({
//        'opacity': '0',
//        'visibility': 'hidden'
//      });
//      $(this).find('.header-contacts').css({
//        'opacity': '0',
//        'visibility': 'hidden'
//      });
//    }
//  });

//});
jQuery(document).ready(function ($) {
  var width_header = $(".header-video").width();
  var height_header = width_header * .56;
  $(".header-video iframe").attr({
    'width': width_header,
    'height': height_header
  });
  $('nav').scrollToFixed({
    marginTop: 0,
    preFixed: function () {
      $(this).addClass('fixed');
      //      $(this).find('.logo').css({
      //        'opacity': '1',
      //        'visibility': 'visible'
      //      });
      //      $(this).find('.header-contacts').css({
      //        'opacity': '1',
      //        'visibility': 'visible'
      //      });
    },
    postFixed: function () {
      $(this).removeClass('fixed');
      //      $(this).find('.logo').css({
      //        'opacity': '0',
      //        'visibility': 'hidden'
      //      });
      //      $(this).find('.header-contacts').css({
      //        'opacity': '0',
      //        'visibility': 'hidden'
      //      });
    }
  });
  $('.hamburger').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      //      $('.menu').removeClass('active');
      $(".menu").slideUp();
      $('.sub-menu').css('display', 'none');
    } else {
      $(this).addClass('active');
      $('.menu').slideDown();
      var delay = 1;
      $('.menu > li').each(function () {
        $(this).addClass("animated slideInDown");
        $(this).addClass('delay-0' + delay + '');
        delay += 1;
      });
      $('.sub-menu').css('display', 'none');
    }
  });
  $(".menu-name").click(function() {
    $('.hamburger').trigger('click');
  });
  //  if ($(window).width() < 1200) {
  $('.sub-menu').css('display', 'none');
  //  }
  $('.menu-item-has-children > a').click(function (e) {
    e.preventDefault();
    if ($(this).next().is(":hidden")) {
      $(this).next().slideDown();
    } else {
      $(this).next().slideUp();
    }
  });

  lightbox.option({
    'wrapAround': true,
    "albumLabel": '',
    'positionFromTop': 20
  });

  $('figure a img').each(function() {
    $(this).parent('a').attr('data-lightbox', 'post-image')
  });
  // $('.popup-content').magnificPopup({
  //    type: 'inline'
  // });
  $('.popup-content').click(function(e) {
    e.preventDefault();
    var act = $(this).data('act');
    var goal = $(this).data('goal');
    if(goal) {
      $('#form-popup .uniSendBtn').attr('onclick', goal);
    }
    $('#form-popup .uniSendBtn').attr('data-act', '');
    $('#form-popup .uniSendBtn').attr('data-act', act);
    $(this).magnificPopup({
       type: 'inline',
       callbacks: {
        close: function() {
          $('#form-popup .uniSendBtn').attr('onclick', '');
        }
       }
    }).magnificPopup('open');
  });
  var inputmask_96e76a5f = {"mask":"+7(999)999-99-99"};
  jQuery("input[type=tel]").inputmask(inputmask_96e76a5f);
  $('.single-courses img').each(function() {
    $(this).parent('a').addClass('image-popup-zoom');
  });
  $('.image-popup-zoom').magnificPopup({
   type: 'image',
   zoom: {
       enabled: true,
       duration: 300 // продолжительность анимации. Не меняйте данный параметр также и в CSS
   }
   });
   jQuery("form").submit(function(e){ 
      e.preventDefault();
      var formid = jQuery(this).data("formid");
      var message = jQuery(this).data("mailmsg");
      var phone = $(this).find('input[type=tel]').val();
      var title_form = $(this).data('form');
      console.log(title_form);
      // var name = $(this).siblings('input[name=name]').val();
      // var email = $(this).siblings('input[type=email]').val();
      var name = '';
      if($(this).find('input[name=name]') != 0) {
        name = jQuery(this).find('input[name=name]').val();
      }
      var comment = '';
      if($(this).find('textarea[name=comment]') != 0) {
        comment = jQuery(this).find('textarea[name=comment]').val();
      }
      var email = '';
      if($(this).find('input[type=email]') != 0) {
        email = $(this).find('input[type=email]').val();
      }
      var form = $(this).data('form');
      var product_name = '';
      if($(this).find('input[name=h1]') != 0) {
        product_name = $(this).find('input[name=h1]').val();
      }
      
      if ((phone == "")||(phone.indexOf("_")>0)) {
        $(this).find('input[type=tel]').css("background-color","#ff91a4")
      } else {
        var  jqXHR = jQuery.post(
          allAjax.ajaxurl,
          {
            action: 'universal_send',    
            nonce: allAjax.nonce,
            name: name,
            phone: phone,
            comment: comment,
            email: email,
            title_form: title_form,
            h1: product_name
          }
          
        );
        
        
        jqXHR.done(function (responce) {
          console.log(responce);
          jQuery('form')[0].reset();
          jQuery('form').each(function() {
            $(this)[0].reset();
          });
          
           // $('input[type=tel]').css("background-color","transparent")
          // jQuery.magnificPopup.close();
          $.magnificPopup.open({
            items: {
              src: '#send-success', // can be a HTML string, jQuery object, or CSS selector
              type: 'inline'
            }
          });
              
           setTimeout(function() {
            $.magnificPopup.close();
          }, 2000);
          
        });
        
        jqXHR.fail(function (responce) {
          jQuery('#messgeModal #lineIcon').html('');
          jQuery('#messgeModal #lineMsg').html("Произошла ошибка! Попробуйте позднее.");
          jQuery('#messgeModal').arcticmodal();
        });
      }
    });

    var video_width = $(".reviews .video-item").width();
  var video_height = video_width * .56;
  $(".reviews .video-item iframe").attr({
    'width': video_width,
    'height': video_height
  });

});
