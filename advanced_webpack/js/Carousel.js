require('jquery')

export default function Carousel($container) {
	this.container = $container;
	this.init();
	this.resize();
	this.bind();
	this.autoPlay(3000);
}

Carousel.prototype.init = function () {
	var $buttonPre = this.$buttonPre = this.container.find('.pre'),
		$buttonNext = this.$buttonNext = this.container.find('.next'),
		$imgCarousel = this.$imgCarousel = this.container.find('.carousel'),
		$imgContent = this.$imgContent = this.container.find('.img-content'),
		$imgs = this.$imgs = this.container.find('.img-content img'),
		$bullets = this.$bullets = this.container.find('.bullet >li');

	this.pageIndex = 0;
	this.islock = true;

	this.imgLen = $imgs.length;
	//设置图片初始宽度= 窗口宽度
	this.$imgs.width(window.innerWidth);

	$imgContent.append($imgs.first().clone())
	$imgContent.prepend($imgs.last().clone())
	//设置轮播容器初始宽度
	$imgContent.css('width', $('.img-content img').length * (window.innerWidth))
	$imgContent.css('left', -window.innerWidth);
}

Carousel.prototype.bind = function () {
	var _this = this;
	this.$buttonPre.on('click', function (e) {
		e.preventDefault();
		if (_this.islock)
			_this.playPre(1);
	})
	this.$buttonNext.on('click', function (e) {
		e.preventDefault();
		if (_this.islock)
			_this.playNext(1);
	})
	this.$bullets.on('click', function () {
		var index = $(this).index();
		// console.log('index',index);
		if (index > _this.pageIndex) {
			_this.playNext(index - _this.pageIndex);
		} else if (index < _this.pageIndex) {
			_this.playPre(_this.pageIndex - index);
		}
	})
}
//窗口改变是从新设置轮播图大小	
Carousel.prototype.resize = function () {
	var _this = this
	$(window).resize(function () {
		//console.log('resize_start')
		_this.container.find('.img-content img').width(window.innerWidth);//设置改变窗口后的图片宽度
		_this.$imgContent.css('width', $('.img-content img').length * window.innerWidth)//设置改变窗口后轮播容器的宽度
		_this.$imgContent.css('left', -window.innerWidth);	//设置新的轮播距离
		//console.log(_this.$imgContent,$('.img-content img').length* window.innerWidth)
		//console.log('resize_end')
	})
}


Carousel.prototype.autoPlay = function (time) {
	var _this = this,
	timeClock = setInterval(function () {
		_this.playNext(1);
	}, time)
}

Carousel.prototype.playNext = function (len) {
	var _this = this;
	this.islock = false;
	this.$imgContent.animate({
		left: '-=' + window.innerWidth * len
	}, function () {
		_this.pageIndex += len;
		if (_this.pageIndex === _this.imgLen) {
			_this.pageIndex = 0
			_this.$imgContent.css('left', -window.innerWidth)
		}
		_this.islock = true;
		_this.setbullet()
	})
}

Carousel.prototype.playPre = function (len) {
	var _this = this;
	_this.islock = false;
	this.$imgContent.animate({
		left: '+=' + window.innerWidth * len
	}, function () {
		_this.pageIndex -= len;
		if (_this.pageIndex < 0) {
			_this.pageIndex = _this.imgLen - 1
			_this.$imgContent.css('left', -_this.imgLen * window.innerWidth)
		}
		_this.islock = true;
		_this.setbullet()
	})
}

Carousel.prototype.setbullet = function () {
	this.$bullets.removeClass('active')
		.eq(this.pageIndex)
		.addClass('active')
}
