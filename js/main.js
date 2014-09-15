// Open About modal
$(".info").click(function() {
    $('#aboutWrapper').animate({ 
        opacity: 1
    }, 1, function(){
        $(this).css({
            visibility: 'visible'
        }).hide().fadeIn(300);
	});
});

// Close button for modal
$(".btnClose").click(function() {
    $('#aboutWrapper').animate({
        opacity: 0
    }, 300, function() {
        $(this).css('visibility', 'hidden');
    });
});
