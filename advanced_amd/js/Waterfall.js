//1. 获取数据
//http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
//2. 把数据变为 Dom，通过瀑布流的方式放到页面上
//3. 当滚动到底部的时候， --》 1

define(['jquery'], function($){	
	var Waterfall = (function(){
		function _Waterfall(){
			this.init();
			this.bind();
		}

	_Waterfall.prototype.init = function(){
		var pageIndex = 1;
		this.getNews();
	}


	_Waterfall.prototype.insetNode = function(ret){
		var _this = this;
		for(var i=0; i<ret.length; i++){  //for循环中的load后会插入10张相同的第10张图片在页面上
			var nodeTemps ='';
			nodeTemps +='<div class="item">';
			nodeTemps += '<img src="' + ret[i].img + '" alt="">';
			nodeTemps += '<p class="text" >' + ret[i].title+ '</p>';
			nodeTemps += '</div>';
			var  img = new Image()
			!function(nodeTemps){//需要创建一个单独变量作用域解决异步变量时机访问的问题
				img.onload = (function(){
					$('.card1-list').append($(nodeTemps));
					_this.render();
				})
			}(nodeTemps)
			window.nodeImg =  nodeTemps;
			console.log('imgs',ret[i].img)
			img.src = ret[i].img;
		}
	}




	_Waterfall.prototype.bind = function(){
		var _this = this;
		$('.load').on('click',function(){
			_this.getNews();
		})
	}


	_Waterfall.prototype.getNews =function(){
			var _this = this;
			$.ajax({
				url:"http://localhost:8080/getNews",
				dataType: 'json',
				data: {
					page: 1
				}
			}).done(function(ret){
				if(ret.status === 0){
					_this.insetNode(ret.data);  //如果数据没问题，那么生成节点插入页面同时摆放好位置
					_this.pageIndex++;
				}else {
					console.log("get error data")
				}
			})
	}

	_Waterfall.prototype.render = function(){
			// console.log(xxx);
				var nodeWidth = $('.portfolio .item').outerWidth(true)
						nodeNum = parseInt($('.portfolio .card1-list').width()/nodeWidth),
						nodeSumHeight = [];
					
				for(var i= 0; i< nodeNum; i++){
					nodeSumHeight.push(0)
				}

				$('.portfolio .item').each(function(){
					var $cur = $(this),
							index = 0,
							minSumHeight = nodeSumHeight[0];
							for(var i=0; i<nodeSumHeight.length; i++){
								if(nodeSumHeight[i] < minSumHeight){//找出最小高度
									index = i;
									minSumHeight = nodeSumHeight[i]
									//console.log('index:'+(cont++),index)
								}
							}
							$cur.css({
								left: nodeWidth*index,
								top: minSumHeight
							})
							nodeSumHeight[index] += $cur.outerHeight(true); 
							// console.log(nodeSumHeight)
							$('.portfolio .card1-list').height(Math.max.apply(null,nodeSumHeight));
				})
			}

		return {
			init: function(){
				new _Waterfall();
			}
		}
	})()

return Waterfall;

	// 	$('.portfolio').on('resize',function(){
	// 		render();
	// 	})
	// }
 
})



