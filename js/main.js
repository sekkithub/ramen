// Open About modal
$(".info").click(function() {
    $('#aboutWrapper').animate({ 
        opacity: 1
    }, 1, function(){
        $(this).css({
            visibility: 'visible'
        }).hide().fadeIn(300),
        $('.logo img').addClass('invert')
	});
});

// Close button for modal
$(".btnClose").click(function() {
    $('.logo img').removeClass('invert'),
    $('#aboutWrapper').animate({
        opacity: 0
    }, 300, function() {
        $(this).css('visibility', 'hidden')
    });
});

$(".bubbleYuriy").prepend('<img src="images/iconYuiry.png" />')
$(".bubbleMasato").prepend('<img src="images/iconMasato.png" />')