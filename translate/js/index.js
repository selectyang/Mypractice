//callback Render 
let	explains_node = document.querySelector('.explains')
let web_explains_node = document.querySelector('.web_explains')
let panel = document.querySelector('.panel')

function showData(data) {
	let node_list = document.querySelectorAll('li')
	if(node_list.length){
		for(let i=0; i<node_list.length; i++){
			node_list[i].parentNode.removeChild(node_list[i])
		}
	}	
	document.querySelector(".usPlay").innerText = "[" + data.basic['us-phonetic'] + "]"
	document.querySelector(".ukPlay").innerText = "[" + data.basic['uk-phonetic'] + "]"
	document.querySelector(".queryText").innerText = data.query
	explains(data)
	webExplains(data)
	isShow(data)
}
//显示基本释义
function explains(data) {
	let length = data.basic.explains.length,
		explains_data = data.basic.explains

	for (let i = 0; i < length; i++) {
		explains_node.insertAdjacentHTML("afterend",`<li>${explains_data[i]}</li>`)
	}
}
//显示网络释义
function webExplains(data) {
	let length = data.web.length,
		WebExplains = data.web;
	for (let i = 0; i < length; i++) {
		web_explains_node.insertAdjacentHTML("beforeend",`<li><h5>* ${WebExplains[i].key}</h5>
								<p>${WebExplains[i].value}</p></li>`)
	}
}
//
function isShow(data){
	if(data){
		panel.classList.remove('panel-default')
	}
}



function translate(){
	this.bind()
}

translate.prototype.ajax = function(options){
	options.data = options.data || {}
	options.key = options.key||'callback'
	options.callback = options.callback||function(){} 
	options.data[options.key] = '__onGetData__'

	window.__onGetData__ = function(data){
		options.callback (data);
	}

	let script = document.createElement('script')
	let query = []
	query = this.formatParams(options.data)
	script.src = options.url + '?' + query
	document.head.appendChild(script)
	document.head.removeChild(script)
}

//格式化参数
translate.prototype.formatParams = function(data) {
	let arr = [];
	for (var name in data) {
		arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
	}
	arr.push('v=' + this.random());//防止缓存
	return arr.join('&');
}

//生成随机数
translate.prototype.random =  function(){ 
	return Math.floor(Math.random() * 10000 + 500); 
}

//type=1 英UK
//type=2 美US
translate.prototype.audio = function(audio,type) {
	let audioHtml = `<audio autoplay name="media" style="display:none">
				<source src="http://dict.youdao.com/dictvoice?audio=${audio}&type=${type}"
				type="audio/mpeg"></audio>`
	document.body.insertAdjacentHTML("beforeend",audioHtml);
	let event = document.querySelector('audio') 
	event.addEventListener("ended", function(e) {
		document.body.removeChild(event);
	})
}

//绑定事件
translate.prototype.bind = function(){
	//提交数据
	let _this = this
	function ajax_event(e) {
		let query = document.querySelector(".input").value
		_this.ajax({
			url: 'https://fanyi.youdao.com/openapi.do',
			key: 'jsoncallback',
			data: {
				callback: 'showData',
				keyfrom: 'f2ec-org',
				key: '1787962561',
				type: 'data',
				doctype: 'jsonp',
				version: '1.1',
				q: query			
			},
			callback: showData
		})
	}
	document.querySelector('.submit').addEventListener('click', ajax_event)
	document.querySelector('.submit').addEventListener('keypress', ajax_event)
	//美式发声
	document.querySelector('.playUs').addEventListener('click', function () {
		let AudioVal = document.querySelector(".input").value
		_this.audio(AudioVal, 2)
	})
	//英式发声
	document.querySelector('.playUk').addEventListener('click', function () {
		let AudioVal = document.querySelector(".input").value
		_this.audio(AudioVal, 1)
	})

}

new translate()

