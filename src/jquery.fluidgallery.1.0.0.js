(function( $ ) {

    $.fn.fluidGallery = function(options) {

		var base = this;

		var settings = {
			'reverse' : false,
			'odd' :  false,
			'margin' : 0
		};

		var updateImage = function(el){

				el.css({
					marginBottom : settings.margin,
					height : "auto"
				})

				var w = parseInt(el.attr('width'));
				var h = parseInt(el.attr('height'));

				var prevEl = el.parent().prev();
				var prevImg = prevEl.children('img');
				var landscape = (w/h > h/w) ? true : false;

				if(!landscape || settings.reverse){
					//get window width

					var containerWidth =base.innerWidth();

					//get prev el width
					var pw = parseInt(prevImg.attr('width'),10);
					var ph = parseInt(prevImg.attr('height'),10);

					if(pw/ph < ph/pw && !settings.reverse){
						settings.reverse = true;
						settings.odd = !settings.odd;
						return;
					}

					settings.reverse = false;
					var heightRatio = h / ph;
					var widthRatio = w/(w + pw);
					var decimal = (containerWidth)/(w+(pw * heightRatio));
					var mp = (settings.margin/containerWidth)*100;
					var percent = ((w * decimal) / containerWidth )* (100-mp);
					el.parent().css({
						"width" : percent + "%",
					});
					prevEl.css({
						"width" : (100-mp)-percent + "%",

					});
					if( prevEl.css('float') != 'right' && prevEl.css('float') != 'left' ){
					//if(!prevEl.prev().hasClass('right-thumb') && !prevEl.prev().hasClass('left-thumb')){
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
					}
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