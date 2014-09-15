$("#projects").click(function() {
    $('#projectsWrapper').animate({ 
        opacity: 1
    }, 1, function(){
        $(this).css({
            visibility: 'visible',
            opacity: .96
        }).hide().fadeIn(300);
	});
});

var year = new Date().getFullYear();
$('.year').text(year);
