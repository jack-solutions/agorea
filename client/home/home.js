Template.imagesSlider.rendered = function() {
    $("#slider").flexslider({
        animation: "fade",
        controlNav: true,
        animationLoop: true,
        slideshow: true,
        sync: "#carousel",
    });
}