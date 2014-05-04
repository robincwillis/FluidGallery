(function( $ ) {

    $.fn.fluidGallery = function(options) {

		var base = this;

		var settings = {
			'odd' :  false,
			'margin' : 0,
			'skip' : true
		};

		var updateImage = function(el){

				el.css({
					marginBottom : settings.margin,
					height : "auto"
				});

				if(settings.skip){
					settings.skip = false;
					return;
				}

				var prevEl = el.parent().prev();
				var prevImg = prevEl.children('img');

				var w = parseInt(el.attr('width'));
				var h = parseInt(el.attr('height'));

				var pW = parseInt(prevImg.attr('width'));
				var pH = parseInt(prevImg.attr('height'));

				var landscape = (w/h > h/w) ? true : false;
				var pLandscape = (pW/pH > pH/pW) ? true : false;

				if(!landscape || !pLandscape){

					var containerWidth = base.innerWidth();

					var heightRatio = h / pH;
					var widthRatio = w/(w + pW);
					var decimal = (containerWidth)/(w+(pW * heightRatio));
					var mp = (settings.margin/containerWidth)*100;
					var percent = ((w * decimal) / containerWidth )* (100-mp);

					console.log(percent);

					el.parent().css({
						"width" : percent + "%",
					});
					prevEl.css({
						"width" : (100-mp)-percent + "%",
					});

					if(landscape){

						if(settings.odd){
							prevEl.css({
								float: 'right',
							});
							el.parent().css({
								float: 'left',
							});

						}else{
							prevEl.css({
								float: 'left',
							});
							el.parent().css({
								float: 'right',
							});
						}


					}else{

						if(settings.odd){
							prevEl.css({
								float: 'left',
							});
							el.parent().css({
								float: 'right',
							});

						}else{
							prevEl.css({
								float: 'right',
							});
							el.parent().css({
								float: 'left',
							});
						}

					}

					settings.skip = true;
					settings.odd = !settings.odd;
				}

		};

        return this.each(function() {

            if (options){
				$.extend( settings, options);
			}

			$(this).find('img').each(function(){
				updateImage($(this));
			});
    });

};



}( jQuery ));