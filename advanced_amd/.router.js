function setRouter(app){ 
 var router = app; 

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
	var json = ''

	for(var i = 0; i< len; i++ ){
		data.push('news' + (parseInt(curIdx)+i))
	}

    if(data.length > 1){
		json = {
			data: data,
			status: 1,
		}
	}else {
		json = {
			data: data,
			status: 0,		
		}
	}

	res.send(json);
})


app.get('/getNews', function(req, res) {

	var news = [
		{
			img: './images/bread1.jpeg',
			title: 'waking up early in the morning to the smell of bacon and eggs at our grandmother’s house'
		},
		{
			img: './images/bread2.jpeg',
			title: 'waking up early in the morning '
		},
		{
			img: './images/bread3.jpeg',
			title: 'waking house'
		},
		{
			img: './images/bread4.jpeg',
			title: 'bacon and eggs at our grandmother’s house'
		},
		{
			img: './images/bread5.jpeg',
			title: 'waking up early'
		},
		{
			img: './images/bread6.jpeg',
			title: 'waking up early in the morning to the smell of bacon and eggs'
		},
		{
			img: './images/bread1.jpeg',
			title: 'waking up early in the morning to the smell of bacon and eggs at our grandmother’s house'
		},
		{
			img: './images/bread2.jpeg',
			title: 'waking up early in the morning to the smell'
		},
		{
			img: './images/bread3.jpeg',
			title: 'waking eggs'
		},
		{
			img: './images/bread4.jpeg',
			title: 'morning to the smell of bacon and eggs at our grandmother’s house'
		},
		{
			img: './images/bread5.jpeg',
			title: 'waking up early in the morning to the smell of bacon and eggs at our grandmother’s house'
		},
		{
			img: './images/bread6.jpeg',
			title: 'waking up early house'
		},
		{
			img: './images/bread1.jpeg',
			title: 'waking up early in the morning to the smell of bacon and eggs at our grandmother’s house'
		},
		{
			img: './images/bread2.jpeg',
			title: 'waking up early in the morning'
		},
		{
			img: './images/bread3.jpeg',
			title: 'morning'
		},
		{
			img: './images/bread1.jpeg',
			title: 'waking up early in the morning to the smell of bacon and eggs at our grandmother’s house'
		},
		{
			img: './images/bread1.jpeg',
			title: 'waking up early bacon and eggs at our grandmother’s house'
		}

	]

	var pageIndex = req.query.page;
	var len = 6;

	var retNews = news.slice(pageIndex*len, pageIndex*len+len); //0, 3;  3, 6
	var cb = req.query.callback;

	res.send({
		status: 0,
		data: retNews
		// data: cb + '('+ JSON.stringify(retNews) + ')'
	});
});
}
 module.exports.setRouter = setRouter