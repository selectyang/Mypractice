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
			link: 'http://view.inews.qq.com/a/20160830A02SEB00',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531730377_150120/0',
			title: '中国轰6K研发险些被俄罗斯发动机厂商卡脖子',
			brif:  '近日，轰6K＂战神＂轰炸机首次公开亮相。在中国...'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '外媒称中国已经决心造出世界先进的航空发动机',
			brif: '资料图：2012年11月14日，第九届中国国际...'
		},
		{
			link: 'http://view.inews.qq.com/a/20160828A007LB00',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531727868_150120/0',
			title: '传奇导弹专家冯·布劳恩：其实到美国后曾被当局忽视',
			brif: '小火箭出品本文作者：邢强博士原文标题：布劳恩博...'
		},
		{
			link: 'http://xw.qq.com/mil/20160830033420/MIL2016083003342001',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531646423_150120/0',
			title: '中国空军演习加快反导能力建设 韩媒：或针对“萨德',
			brif: '中国空军演习加快反导能力建设 韩媒：或针对“萨德'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '外媒称中国已经决心造出世界先进的航空发动机',
			brif: '资料图：2012年11月14日，第九届中国国际...'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '为了喝酒，应该海军当年那些水兵也是蛮拼的……',
			brif: '嚣张（aggressive）这个词，腐国海军当...'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '西媒臆断老挝“弃华投美” 认为现政府更亲越南',
			brif: '西媒臆断老挝“弃华投美” 认为现政府更亲越南'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '中国武警2016年征兵宣传片震撼首发',
			brif: '中国武警2016年征兵宣传片震撼首发'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '韩国多次宣称“一旦开战三天内消灭朝鲜空军”，靠谱吗？',
			brif: '韩国多次宣称“一旦开战三天内消灭朝鲜空军”，靠谱吗？'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '韩促朝停止诋毁韩国元首 批其丧失最基本礼仪常识',
			brif: '韩促朝停止诋毁韩国元首 批其丧失最基本礼仪常识'
		},
		{
			link: 'http://xw.qq.com/mil/20160830033420/MIL2016083003342001',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531646423_150120/0',
			title: '中国空军演习加快反导能力建设 韩媒：或针对“萨德',
			brif: '中国空军演习加快反导能力建设 韩媒：或针对“萨德'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '外媒称中国已经决心造出世界先进的航空发动机',
			brif: '资料图：2012年11月14日，第九届中国国际...'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '为了喝酒，应该海军当年那些水兵也是蛮拼的……',
			brif: '嚣张（aggressive）这个词，腐国海军当...'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '西媒臆断老挝“弃华投美” 认为现政府更亲越南',
			brif: '西媒臆断老挝“弃华投美” 认为现政府更亲越南'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '中国武警2016年征兵宣传片震撼首发',
			brif: '中国武警2016年征兵宣传片震撼首发'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '韩国多次宣称“一旦开战三天内消灭朝鲜空军”，靠谱吗？',
			brif: '韩国多次宣称“一旦开战三天内消灭朝鲜空军”，靠谱吗？'
		},
		{
			link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
			img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
			title: '韩促朝停止诋毁韩国元首 批其丧失最基本礼仪常识',
			brif: '韩促朝停止诋毁韩国元首 批其丧失最基本礼仪常识'
		}

	]

	var pageIndex = req.query.page;
	var len = 3;

	var retNews = news.slice(pageIndex*len, pageIndex*len+len); //0, 3;  3, 6


	res.send({
		status: 0,
		data: retNews
	});
});
