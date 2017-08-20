require('jquery')

export default function GoTop($ct){
		this.ct = $ct;
		this.target = $('<p class="gotop">GoTop</p>');
		this.createNode();
		this.bindEvent();
	}

	GoTop.prototype.bindEvent = function(){
		var _this = this;
		$(window).on('scroll',function(){
			let nodeShow = $(window).scrollTop() > window.innerHeight;
			if(nodeShow){
				_this.target.addClass('show')
			}else{
				_this.target.removeClass('show')
			}
		})
		this.target.on('click',function(){
			// console.log('click')
			$(window).scrollTop(0);
		})
	}

	GoTop.prototype.createNode = function(){
		var _this = this;
		this.ct.append(_this.target)
	}




	
