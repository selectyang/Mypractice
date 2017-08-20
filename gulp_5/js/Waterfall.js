//1. 获取数据
//http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
//2. 把数据变为 Dom，通过瀑布流的方式放到页面上
//3. 当滚动到底部的时候， --》 1

//1. 获取数据
//http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
//2. 把数据变为 Dom，通过瀑布流的方式放到页面上
//3. 当滚动到底部的时候， --》 1

function Waterfall() {
	this.init();
	this.bind();
}

Waterfall.prototype.init = function () {
	var perPageCount = 10,
		pageIndex = 1;
	this.getNews();
};

Waterfall.prototype.insetNode = function (ret) {
	var _this = this;
	$.each(ret,function(index,news){
		var nodeTemps = '';
		nodeTemps +='<div class="item">';
		nodeTemps += '<a class="link" href="'+ news.url +'">';
		nodeTemps += '<img src="' + news.img_url + '" alt=""></a>';
		nodeTemps += '<h4 class="header" >' + news.name + '</h4>';
		nodeTemps += '<p class="text" >' + news.short_intro+ '</p>';
		nodeTemps += '</div>';
		$(nodeTemps).find('img').load(function(){
				$('.waterfall').append($(nodeTemps));	
				_this.render();
		});
	});
};


Waterfall.prototype.bind = function () {
	var _this = this;
	$('.load').on('click', function () {
		_this.getNews();
	});
};

Waterfall.prototype.getNews = function () {
	var _this = this;
	$.ajax({
		url:"https://platform.sina.com.cn/slide/album_tech",
		dataType: 'jsonp',
		jsonp:"jsoncallback",
		data: {
			app_key: '1271687855',
			num: _this.perPageCount,
			page: _this.pageIndex
		}
	}).done(function (ret) {
		console.log(ret.status.code );
		if (ret.status.code === '0') {
			_this.insetNode(ret.data);  //如果数据没问题，那么生成节点插入页面同时摆放好位置
			_this.pageIndex++;
		} else {
			console.log("get error data");
		}
	});
};

Waterfall.prototype.render = function () {
	// console.log(xxx);
	var nodeWidth = $('.item').outerWidth(true),
		nodeNum = parseInt($('.waterfall').width() / nodeWidth),
		nodeSumHeight = [];

	for (var i = 0; i < nodeNum; i++) {
		nodeSumHeight.push(0);
	}

	$('.item').each(function () {
		var $cur = $(this),
			index = 0,
			minSumHeight = nodeSumHeight[0];
		for (var i = 0; i < nodeSumHeight.length; i++) {
			if (nodeSumHeight[i] < minSumHeight) {//找出最小高度
				index = i;
				minSumHeight = nodeSumHeight[i];
				//console.log('index:'+(cont++),index)
			}
		}
		$cur.css({
			left: nodeWidth * index,
			top: minSumHeight
		});
		nodeSumHeight[index] += $cur.outerHeight(true);
		// console.log(nodeSumHeight)
		$('.waterfall').height(Math.max.apply(null, nodeSumHeight));
	});
};


new Waterfall();