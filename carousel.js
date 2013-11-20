jQuery(document).ready(function(){

  var speed = 5000;
  var run = setInterval('rotate()', speed);

  var item_width = jQuery('.carousel-item').outerWidth();
  var left_value = item_width * (-1);
  var wrapper = jQuery('.wrapper');

  jQuery('.wrapper img:first').before(jQuery('.wrapper img:last'));

  wrapper.css({'left' : left_value});

  jQuery('.scroll-buttons .scroll-button:first').addClass('activelink');

  jQuery('.left-link').click(function(){
    var left_indent = parseInt(wrapper.css('left')) + item_width;

    wrapper.animate({'left': left_indent}, 200, function(){
      jQuery('.wrapper img:first').before(jQuery('.wrapper img:last'));

      wrapper.css({'left' : left_value});
    }); 

    var currentActiveLink = jQuery('.scroll-buttons').find('.activelink');
    var nextActiveLink = currentActiveLink.prev();

    if(nextActiveLink.length == 0){
      nextActiveLink = jQuery('.scroll-buttons').children().last();
    }

    currentActiveLink.removeClass('activelink');
    nextActiveLink.addClass('activelink');

    return false;
  });

  jQuery('.right-link').click(function(){
    var left_indent = parseInt(wrapper.css('left')) - item_width;
    wrapper.animate({'left': left_indent}, 200, function(){
      jQuery('.wrapper img:last').after(jQuery('.wrapper img:first'));
      wrapper.css({'left': left_value});
    });

    var currentActiveLink = jQuery('.scroll-buttons').find('.activelink');
    var nextActiveLink = currentActiveLink.next();

    if(nextActiveLink.length == 0){
      nextActiveLink = jQuery('.scroll-buttons').children().first();
    }

    currentActiveLink.removeClass('activelink');
    nextActiveLink.addClass('activelink');

    return false;
  });


  //stops auto scroll on hover
  jQuery('.wrapper').hover(
    function() {
      clearInterval(run);
    },
    function() {
      run = setInterval('rotate()', speed);
    }
  );


  //clickable nav
  jQuery('.scroll-buttons .scroll-button').click(function(){
    var currentActiveLink = jQuery('.scroll-buttons').find('.activelink');
    console.log(currentActiveLink);
    var indexOfActiveLink = jQuery('.scroll-buttons').find('li').index(currentActiveLink);
    console.log(indexOfActiveLink);
    var indexOfClickedLink = jQuery('.scroll-buttons').find('li').index(jQuery(this));
    console.log(indexOfClickedLink);

    if(indexOfActiveLink < indexOfClickedLink){
      console.log('true');
      
      var left_indent = parseInt(wrapper.css('left')) - item_width * indexOfClickedLink - item_width;
      wrapper.animate({'left': left_indent}, 200, function(){
        jQuery('.wrapper img:last').after(jQuery('.wrapper img:first'));
        wrapper.css({'left': left_value});
      });
    }
  });
});

//auto scrolls
function rotate(){
  jQuery('.right-link').click();
}
