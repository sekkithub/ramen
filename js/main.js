// Open About modal
$(".info").click(function() {
    $('#aboutWrapper').animate({ 
        opacity: 1
    }, 1, function(){
        $(this).css({
            visibility: 'visible'
        }).hide().fadeIn(300),
        $('.logo').animate({
            backgroundPositionY: -129
        })
	});
});

// Close button for modal
$(".btnClose, .logo").click(function() {
    $('.logo').animate({
        backgroundPositionY: 0
    }),
    $('#aboutWrapper').animate({
        opacity: 0
    }, 300, function(){
        $(this).css({
            visibility: 'hidden'
        }).hide().fadeIn(300)
	});
});


$(".bubbleYuriy").prepend('<img src="images/iconYuiry.png" />')
$(".bubbleMasato").prepend('<img src="images/iconMasato.png" />')