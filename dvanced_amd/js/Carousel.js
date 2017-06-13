		var Carousel = (function(){
			function _Carousel($container){
				this.container = $container;
				this.init();
				this.bind();
				this.autoPlay(3000);
			}

			_Carousel.prototype.init = function(){
				var $buttonPre = this.$buttonPre = this.container.find('.pre'),
					$buttonNext = this.$buttonNext = this.container.find('.next'),
					$imgCarousel = this.$imgCarousel = this.container.find('.carousel')
					$imgContent = this.$imgContent = this.container.find('.img-content'),
					$imgs = this.$imgs = this.container.find('.img-content img'),
					$bullets = this.$bullets = this.container.find('.bullet >li');
					
				this.pageIndex = 0;
				this.islock = true;

				this.imgLen = $imgs.length;
				this.$imgs.width(window.innerWidth);
				this.imgWidth = $imgs.width();

				$imgContent.append($imgs.first().clone())
				$imgContent.prepend($imgs.last().clone())
				$imgContent.css('width',$('.img-content img').length*this.imgWidth)
				$imgContent.css('left',-this.imgWidth);			
			}

			_Carousel.prototype.bind = function(){
				var _this = this;
				this.$buttonPre.on('click',function(e){
					e.preventDefault();
					if(_this.islock)
					_this.playPre(1);
				})
				this.$buttonNext.on('click',function(e){
					e.preventDefault();
					if(_this.islock)
					_this.playNext(1);
				})
				this.$bullets.on('click',function(){
					var index = $(this).index();
					// console.log('index',index);
					if(index > _this.pageIndex){
						_this.playNext(index-_this.pageIndex);
					}else if(index < _this.pageIndex){
						_this.playPre(_this.pageIndex-index);
					}
				})
			}

		_Carousel.prototype.autoPlay = function(time){
			var _this = this;
			timeClock = setInterval(function(){
				_this.playNext(1);
			},time)
		}

			_Carousel.prototype.playNext = function(len){
				var _this = this;
				this.islock = false;
				this.$imgContent.animate({
					left: '-='+_this.imgWidth*len
				},function(){
					_this.pageIndex += len;
					if(_this.pageIndex === _this.imgLen){
						_this.pageIndex = 0
						_this.$imgContent.css('left',-_this.imgWidth)
					}
					_this.islock = true;
					_this.setbullet()
				})				
			}

			_Carousel.prototype.playPre = function(len){
				var _this = this;
				_this.islock = false;
				this.$imgContent.animate({
					left: '+='+_this.imgWidth*len
				},function(){
					_this.pageIndex -= len;
					if(_this.pageIndex<0){
						_this.pageIndex =_this.imgLen-1 
						_this.$imgContent.css('left',-_this.imgLen*_this.imgWidth)
					}
					_this.islock = true;
					_this.setbullet()
				})
			}

			_Carousel.prototype.setbullet = function(){
				this.$bullets.removeClass('active')
								.eq(this.pageIndex)
								.addClass('active')			
			}

			return {
				init: function($ct){
					$ct.each(function(index,node){
						new _Carousel($(node));
					})
				}
			}
		})()
