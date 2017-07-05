//假设域名是localhost, 端口是8080
//更多详细使用方法参考 http://www.expressjs.com.cn/guide/routing.html

/**
 * 当 http://localhost:8080/getInfo 的GET请求到来时被下面匹配到进行处理
 * 发送JSON格式的响应数据 {name: 'ruoyu'}
 */
app.get('/login', function (req, res) {
	res.send({ name: 'login success' })
})


/**
 * 当 http://localhost:8080/getFriends 的GET请求到来时被下面匹配到进行处理
 * 通过req.query获取请求的参数对象 
 * 通过 req.send发送响应
 */
app.get('/getFriends', function (req, res) {
	var username = req.query.username // 通过 req.query获取请求参数
	var friends

	//根据请求参数mock数据
	switch (username) {
		case 'ruoyu':
			friends = ['小明ssss', '小刚', '<script>alert(1)</script>']
			break
		case 'hunger':
			friends = ['小谷sf1111', '小花']
			break;
		default:
			friends = ['没有朋友']
	}
	res.send(friends);
});


/**
 * 当 http://localhost:8080/comment 的GET请求到来时被下面匹配到进行处理
 * 通过req.body获取post请求的参数对象 
 * 通过 req.send发送响应
 */
app.post('/comment', function (req, res) {
	console.log(req.body.comment); // 可通过req.body获取 post 提交的参数
	res.send({ status: 'ok' });
});


/**
 * 当 http://localhost:8080//loadMore 的GET请求到来时被下面匹配到进行处理
 * 通过req.query获取请求的参数对象 
 * 通过 req.send发送响应
 */
app.get('/loadMore', function (req, res) {
	var curIdx = req.query.index
	var len = req.query.length
	var data = []

	for(var i = 0; i< len; i++ ){
		data.push('news' + (parseInt(curIdx)+i))
	}
	// setTimeout(function(){
	// 	res.send(data);
	// },0)
	res.send(data);
})

/**
 * 当 http://localhost:8080//getNews 的GET请求到来时被下面匹配到进行处理
 * 通过req.query获取请求的参数对象 
 * 通过 req.send发送响应
 */
app.get('/getNews', function(req, res){
	var news = [
		"第11日前瞻：中国冲击4金 博尔特再战200米羽球",
		"正直播柴飚/洪炜出战 男双力争会师决赛",
		"女排将死磕巴西！郎平安排男陪练模仿对方核心",
		"没有中国选手和巨星的110米栏 我们还看吗？",
		"中英上演奥运金牌大战",
		"博彩赔率挺中国夺回第二纽约时报：中国因对手服禁药而丢失的奖牌最多",
		"最“出柜”奥运？同性之爱闪耀里约",
		"下跪拜谢与洪荒之力一样 都是真情流露"
	]
	var data = [];
	for(var i=0; i<3; i++){
		var index = parseInt(Math.random()*news.length);
		data.push(news[index]);
		news.splice(index, 1);
	}

	var cb = req.query.callback;
	if(cb){
		res.send(cb + '('+ JSON.stringify(data) + ')');
	}else{
		res.send(data);
	}
})
