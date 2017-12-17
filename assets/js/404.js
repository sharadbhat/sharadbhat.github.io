/**
 * ===================================================================
 * Main js
 *
 * -------------------------------------------------------------------
 */

(function($) {

	"use strict";

	/* --------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
   $(window).load(function() {
      // will first fade out the loading animation
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });
  	})



  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('.main-content h1').fitText(.8, { minFontSize: '42px', maxFontSize: '94px' });

  	}, 100);


  	/* --------------------------------------------------- */
	/* lettering js
	------------------------------------------------------ */
	$(".kern-this").lettering();


	/* --------------------------------------------------- */
  	/* Menu
   ------------------------------------------------------ */
   var toggleButton = $('.menu-toggle'),
       nav = $('#menu-nav-wrap'),
       mainContent = $('#main-404-content'),
       mainHeader = $('.main-header');


   /* --------------------------------------------------- */
	/*  Particle JS
	------------------------------------------------------ */
	$('.main-content-particle-js').particleground({
	    dotColor: '#fff',
	    lineColor: '#555555',
	    particleRadius: 6,
	    curveLines: true,
	    density: 9000,
	    proximity: 100
	});


})(jQuery);
