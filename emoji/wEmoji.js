/*
*	wEmoji v1.00
*	date: 2017-05-17
*	author: 孤月
*	email: 454236029@qq.com | z454236029@gmail.com
*/
(function(){

var wantEmoji = function(options){
	options = options || {};
	var selector = options.wrapper || "body";  

	this.wrapper = document.querySelector(selector);	//包裹元素
	this.row = options.row || 4;  						//每页表情的行数
	this.callback = options.callback || function(){}; 	//当表情被点击时的回调，返回表情的code值

	this.emojis = window.emojis || emojis;		//加载表情包配置

	this.content = null;   				//.wEmoji-content
	this.navRow = null;					//.wEmoji-row
	this.currentWrapper = null; 		//.wEmoji-wrapper[data-choose="true"]

	this.activePage = 0;
	this.totalPage = 0;
	this.eachPartsNum = 4; 				//每一批显示的表情包数(导航栏的表情包的最大显示个数)

	this.wrapWidth = 0;
	this.contentWidth = 0;
	this.count = this.getEMJPackageCount();
	
	if(options.autoInit) //当设置了autoInit之后会自动调用init函数，默认不会
	this.init();
};

wantEmoji.prototype = {

	init : function(){
		if(this.count > this.eachPartsNum)
			this.wrapper.className += " wEmoji wEmoji-more";
		else
			this.wrapper.className += " wEmoji";

		this.wrapWidth = 300;

		this.initTemplete();
	},

	//初始化模板
	initTemplete : function(){

		var wrapper = this.wrapper,
			tpl = '<div class="wEmoji-header">'+
					'<div class="wEmoji-prev-btn">&lt;</div>'+
					'<div class="wEmoji-nav">'+
						'<div class="wEmoji-row"></div>'+
					'</div>'+
					'<div class="wEmoji-next-btn">&gt;</div>'+
				'</div>'+
				'<div class="wEmoji-container">'+
					'<div class="wEmoji-content"></div>'+
					'<div class="wEmoji-pages"></div>'+
				'</div>';

		wrapper.innerHTML = tpl;

		this.content = wrapper.querySelector(".wEmoji-content");
		this.navRow = wrapper.querySelector(".wEmoji-row");

		// this.contentWidth = this.content.clientWidth;
		// alert(contentWidth);


		this.__initData();
		this.__bindEvent();
	},

	//生成数据
	__initData : function(){
		var emojis = this.emojis,
			wrapper = this.wrapper,
			navRow = this.navRow,
			content = this.content,
			count = this.count;

		//减少重排
		wrapper.style.display = "none";

		content.innerHTML = "";
		// navRow.style.width = count / this.eachPartsNum * 100 + "%";

		for( var key in emojis ){
			var emj = emojis[key];

			if(!emj.enable)
			continue;

			content.appendChild(this.__initContent(key,emj));
			navRow.innerHTML += '<div class="wEmoji-list" data-eid="'+key+'" >'+emj.name+'</div>';
		}

		this.__initStyle();
		this.wrapper.style.display = "block";
	},

	//初始化样式
	__initStyle : function(){
		
		//选择某个表情包
		this.chooseEmoji("baidu");

		//生成分页导航
		this.__createPageList();
	},

	//生成每页具体数据
	__initContent : function(key,emj){
		var row = this.row, 							//行数
			col = emj.col,								//每行表情个数
			wrapWidth = this.wrapWidth,
			content = this.content,
			sources = emj.sources,
			path 	= emj.path,
			totalNum = sources.length,
			eachPageNum = col * row, 					//分页后每页最大的表情个数
			pageNum = Math.ceil(totalNum / eachPageNum),//计算分页面数
			column = document.createElement("div");

			// alert(wrapWidth);

		column.className = "wEmoji-wrapper";
		column.setAttribute("data-eid",key);
		column.setAttribute("data-pageNum",pageNum);
		column.style.width = wrapWidth * pageNum + "px";

		for( var p = 0; p < pageNum; p++ ){
			var tempPage = document.createElement("div"),
				temp = "",idx;
			tempPage.className = "wEmoji-column";
			// tempPage.style.width = wrapWidth + "px";
			tempPage.style.width = "100%";
			for( var i = 0; i < eachPageNum; i++ ){
				var url,code,title="",
					source,
					isObject;

				idx = p * eachPageNum + i;
				source = sources[idx];
				isObject = (typeof source == "object");
				//如果数据类型是对象,则按照对象格式进行读取
				url = isObject ? source.url : source;
				title = isObject ? source.title : "";

				if(!url){
					break;
				}
				var imgArr = url.split("."),
					type = imgArr.pop();
				//自动生成code,方便后面的自动解析
				code = '[:'+key+"_"+imgArr.join(".")+"_"+type+':]';

				temp += '<div class="wEmoji-item" data-emj="'+code+'" style="width:'+(100/col)+'%;">'+
							'<img src="'+path+url+'" title="'+title+'" />'+
						'</div>';
			}
			tempPage.innerHTML = temp;
			column.appendChild(tempPage);
		}
		return column;
	},

	//生成分页导航
	__createPageList : function(){
		//wrapper为当前显示的wrapper
		var pageNum = this.currentWrapper.getAttribute("data-pageNum"),
			pageWrapper = this.wrapper.querySelector(".wEmoji-pages"),
			temp = "";

		for( var i = 1; i <= pageNum; i++ ){
			temp += '<li class="wEmoji-page-list" data-pageIdx="'+i+'">'+i+'</li>';
		}

		pageWrapper.innerHTML = temp;

		this.totalPage = pageNum;
		//使第一页被选择
		this.showPage(0);
	},

	//绑定事件
	__bindEvent : function(){
		var _self = this,
			wrapper = this.wrapper,
			row = this.navRow,
			pageBox = wrapper.querySelector('.wEmoji-pages'),
			prev = wrapper.querySelector('.wEmoji-prev-btn'),
			next = wrapper.querySelector('.wEmoji-next-btn'),
			content = this.content,
			down = "ontouchstart" in document ? "touchstart" : "mousedown",
			up = "ontouchend" in document ? "touchend" : "mouseup",
			move = "ontouchmove" in document ? "touchmove" : "mousemove",
			drag = false,
			x = 0;

		pageBox.onclick = function(e){
			e = e || event;
			var target = e.target || e.srcElement,
				idx = target.getAttribute("data-pageIdx");
			if(target.tagName.toLowerCase() != "li" || !idx){
				return false;
			}
			_self.showPage(idx-1);
		};

		row.onclick = function(e){
			e = e || event;
			var target = e.target || e.srcElement,
				eid = target.getAttribute("data-eid");

			if( eid && _self.emojis[eid] ){
				_self.chooseEmoji(eid);
				_self.showPage(0);
			}
		};

		var parts = Math.ceil(this.count / this.eachPartsNum), //可以将表情包数分为N批（默认4个一批）
			partsIdx = 0,
			navWidth = wrapper.querySelector(".wEmoji-nav").clientWidth;

		prev.onclick = function(e){
			partsIdx = partsIdx - 1 < 0 ? 0 : partsIdx - 1;
			row.style.webkitTransform = "translateX("+(-partsIdx * navWidth)+"px) translateZ(0px)";
			row.style.transform = "translateX("+(-partsIdx * navWidth)+"px) translateZ(0px)";
		};

		next.onclick = function(e){
			partsIdx = partsIdx + 1 >= parts ? partsIdx : partsIdx + 1;
			row.style.webkitTransform = "translateX("+(-partsIdx * navWidth)+"px) translateZ(0px)";
			row.style.transform = "translateX("+(-partsIdx * navWidth)+"px) translateZ(0px)";
		};

		content.onclick = function(e){
			e = e || event;
			var target = e.target || e.srcElement,
				trueTarget = getTargetNode(target,".wEmoji-item"),
				emjCode;

			if(trueTarget)
			emjCode = trueTarget.getAttribute("data-emj");

			if(!emjCode)
			return false;

			_self.callback.call(_self,emjCode);
			console.log(emjCode);
		};

		content["on"+down] = function(e){
			e = e || event;
			drag = true;
			x = e.pageX || e.touches[0].pageX;
		};

		content["on"+move] = function(e){
			e = e || event;
			e.stopPropagation();
			e.preventDefault();
		};

		content["on"+up] = function(e){
			e = e || event;
			if(drag){
				drag = false;
				var endX = e.pageX || e.changedTouches[0].pageX,
					dis = endX - x,
					idx;

				if(dis > 50){
					idx = Math.max(_self.activePage - 1,0);
					_self.showPage(idx);
				} else if (dis < -50){
					idx = Math.min(_self.activePage + 1,_self.totalPage - 1);
					_self.showPage(idx);
				}
				x = 0;
			}
		};

	},

	//选择表情包
	chooseEmoji : function(eid){
		var navRow = this.navRow,
			content = this.content,
			targetWrapper = content.querySelector(".wEmoji-wrapper[data-eid='"+eid+"']"),
			targetList = navRow.querySelector(".wEmoji-list[data-eid='"+eid+"']"),
			chooseWrapper = content.querySelector(".wEmoji-wrapper[data-choose='true']"),
			chooseList = navRow.querySelector(".wEmoji-list[data-choose='true']");

		if(chooseWrapper){
			chooseList.setAttribute("data-choose","false");
			chooseWrapper.setAttribute("data-choose","false");
		}
		targetWrapper.setAttribute("data-choose","true");
		targetList.setAttribute("data-choose","true");

		this.currentWrapper = targetWrapper;
		this.__createPageList();
	},

	//使当前显示的表情包的第n页显示
	showPage : function(idx){
		this.activePage = idx;
		var wrapper = this.wrapper,
			currentWrapper = this.currentWrapper,
			pageTargetList = wrapper.querySelector(".wEmoji-page-list[data-pageIdx='"+(idx+1)+"']"),
			pageChoose = wrapper.querySelector(".wEmoji-page-list[data-choose='true']");

		if(pageChoose)
		pageChoose.setAttribute("data-choose","false");
		pageTargetList.setAttribute("data-choose","true");

		currentWrapper.style.webkitTransform = "translateX("+(-this.wrapWidth*idx)+"px) translateZ(0px)";
		currentWrapper.style.transform = "translateX("+(-this.wrapWidth*idx)+"px) translateZ(0px)";
	},

	//解释表情代码
	explain : function(str){
		var reg = /\[:(\w+):\]/g,
			_self = this;

		return str.replace(reg,function(str,target){
			var tempArr = target.split("_"),
				eid = tempArr.shift(),
				type = tempArr.pop(),
				name = tempArr.join("_");
				path = _self.emojis[eid].path;
				url = name+"."+type;

			return '<img src="'+path+url+'" />';
		});
	},

	//获取需要启用的表情包的数量
	getEMJPackageCount : function(){
		var emojis = this.emojis,
			count = 0;
		for( var key in emojis ){
			if(emojis[key].enable){
				count++;
			}
		}
		return count;
	}
};

//获取目标元素
var getTargetNode = function(ele,selector){
	var type = getSelectorType(selector),
		nSec = selector.replace(/.|#/,"");
	if(ele === document){
		return null;
	}

	if( new RegExp(nSec).test(ele[type]) ){
		return ele;
	} else {
		return getTargetNode(ele.parentNode,selector);
	}
};

//判断selector类型
var getSelectorType = (function(){
	var checkIdName = function(selector){
		var idReg = new RegExp("#");
		return (idReg.test(selector) ? "id" : checkClassName(selector));
	};
	var checkClassName = function(selector){
		var classReg = new RegExp(".");
		return (classReg.test(selector) ? "className" : "tagName");
	};
	return function(selector){
		return checkIdName(selector);
	};
})();

if(typeof module != "undefined" && module.exports){
	module.exports = wantEmoji;
} else if( typeof define == "function" && define.amd ){
	define(function(){ return wantEmoji; });
} else {
	window.wantEmoji = wantEmoji;
}

})(window,document,undefined)