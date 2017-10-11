(function(window){

var path = "./emoji/",  //项目所在的根地址
	emojis = {
	"baidu" : {
		"name" : "贴吧",
		"col" : 10,
		"path" : path+"emojiSources/tiebaemoji/",
		"enable" : true,
		"sources" : ["1.png","2.png","3.png","4.png","6.png","7.png","8.png",
					 "9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png",
					 "17.png","18.png","19.png","20.png","21.png","22.png","23.png","24.png",
					 "25.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png",
					 "33.png","34.png","35.png","36.png","37.png","38.png","39.png","40.png",
					 "41.png","42.png","43.png","44.png","45.png","46.png","47.png","48.png",
					 "49.png","50.png"
					]
	},
	"paopao" : {
		"name" : "泡泡", //名字
		"col" : 10, //每一行最大的表情个数(建议填选的时候值不要太大或太小)
		"path" : path+"emojiSources/paopao/", //相对于项目根地址的路径
		"enable" : false, //是否启用本表情包
		"sources" : ["1.jpg","2.jpg","3.jpg","4.jpg","6.jpg","7.jpg","8.jpg",
					 "9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg",
					 "17.jpg","18.png","19.png","20.png","21.png","22.png","23.png","24.png",
					 "25.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png",
					 "33.png","34.png","35.png","36.png","37.png","38.jpg","39.png","40.png",
					 "41.jpg","42.png","43.png","44.png"
					] //中间的值也支持{title:"笑",url:"1.jpg"}的形式,且可单独设置
	},
	"paopao2" : {
		"name" : "泡泡2",
		"col" : 4,
		"path" : path+"emojiSources/paopao/",
		"enable" : false,
		"sources" : ["1.jpg","2.jpg","3.jpg","4.jpg","6.jpg","7.jpg","8.jpg",
					 "9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg",
					 "17.jpg","18.png","19.png","20.png","21.png","22.png","23.png","24.png",
					 "25.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png",
					 "33.png","34.png","35.png","36.png","37.png","38.jpg","39.png","40.png",
					 "41.jpg","42.png","43.png","44.png"
					]
	},
	"paopao3" : {
		"name" : "泡泡3",
		"col" : 8,
		"path" : path+"emojiSources/paopao/",
		"enable" : false,
		"sources" : ["1.jpg","2.jpg","3.jpg","4.jpg","6.jpg","7.jpg","8.jpg",
					 "9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg",
					 "17.jpg","18.png","19.png","20.png","21.png","22.png","23.png","24.png",
					 "25.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png",
					 "33.png","34.png","35.png","36.png","37.png","38.jpg","39.png","40.png",
					 "41.jpg","42.png","43.png","44.png"
					]
	},
	"qq" : {
		"name" : "QQ",
		"col" : 14,
		"path" : path+"emojiSources/qq/",
		"enable" : true,
		"sources" : [
					"1.gif","2.gif","3.gif","4.gif","5.gif","6.gif","7.gif","8.gif","9.gif","10.gif",
					"11.gif","12.gif","13.gif","14.gif","15.gif","16.gif","17.gif","18.gif","19.gif","20.gif",
					"21.gif","22.gif","23.gif","24.gif","25.gif","26.gif","27.gif","28.gif","29.gif","30.gif",
					"31.gif","32.gif","33.gif","34.gif","35.gif","36.gif","37.gif","38.gif","39.gif","40.gif",
					"41.gif","42.gif","43.gif","44.gif","45.gif","46.gif","47.gif","48.gif","49.gif","50.gif",
					"51.gif","52.gif","53.gif","54.gif","55.gif","56.gif","57.gif","58.gif","59.gif","60.gif",
					"61.gif","62.gif","63.gif","64.gif","65.gif","66.gif","67.gif","68.gif","69.gif","70.gif",
					"71.gif","72.gif","73.gif","74.gif","75.gif","76.gif","77.gif","78.gif","79.gif","80.gif",
					"81.gif","82.gif","83.gif","84.gif","85.gif","86.gif","87.gif","88.gif","89.gif","90.gif",
					"91.gif"
					]
	}
};

window.emojis = emojis;

})(window);