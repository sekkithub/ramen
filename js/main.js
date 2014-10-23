$.fn.animateBG = function(x, y, speed) {
    var pos = this.css('background-position').split(' ');
    this.x = pos[0] || 0,
    this.y = pos[1] || 0;
    $.Animation( this, {
        x: x,
        y: y
      }, { 
        duration: speed
      }).progress(function(e) {
          this.css('background-position', e.tweens[0].now+'px '+e.tweens[1].now+'px');
    });
    return this;
}


// Open About modal
$(".infoIcon").click(function() {
    // List appears delay
    $('.aboutContents ul li').css({
        top : '100px',
        opacity: 0
    }).each(function(i) {
        $(this).delay(200 * i).animate({
            top : '0',
            opacity: 1
        }, 700);
    }),

    //Logo animation
    $('#aboutWrapper').animate({ 
        opacity: 1
    }, 1, function(){
        $(this).css({
            visibility: 'visible'
        }).hide().fadeIn(300),
        $('.logo').animateBG(0, -129, 300)
	});
});


$(function() {
    var trigger = $('#hamburger'),
        isClosed = true;
    
    trigger.click(function () {
      burgerTime();
    });
    
    function burgerTime() {
      if (isClosed == true) {
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }
});



// Close button for modal
$(".btnClose, .logo").click(function() {
    $('.logo').animateBG(0, 0, 300),
    $('#aboutWrapper').animate({
        opacity: 0
    }, 300, function(){
        $(this).css({
            visibility: 'hidden'
        }).hide().fadeIn(300)
	});
});

$(".bubbleYuriy").prepend('<a href="http://oparenko.com/" target="_blank" title="oparenko.com"><img src="images/iconYuiry.png" /></a>')
$(".bubbleMasato").prepend('<a href="http://sekkithub.com/" target="_blank" title="sekkithub.com"><img src="images/iconMasato.png" /></a>')


