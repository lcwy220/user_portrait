 function Follower(){
  this.ajax_method = 'GET';
}
Follower.prototype = {   //获取数据，重新画表
  call_sync_ajax_request:function(url, method, callback){
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      async: false,
      success:callback
    });
  },
Draw_Follower:function(data){
    console.log(data);
	var UserID = parent.personalData.uid;
    var UserName = parent.personalData.uname;
    var Fnumber = document.getElementById('fansNumber');
    Fnumber.innerHTML = data[1];
   
	var items = data[0]
    //console.log(data[0]);
	if(items==null){
		var say = document.getElementById('test1');
		say.innerHTML = '该用户暂无此数据';
	}else{
		follower(items,UserID,UserName);		
	}	
}
}
var Follower = new Follower();

function follower(data,UserID,UserName){
	uids = [];
	unames = [];
	values = [];
	
	for(i=0;i<data.length;i++){
        uids.push(data[i][0]);
        // if(data[i][1][0] == '未知'){
        //     data[i][1][0] = "未知("+ data[i][0] +")";
        // }
        unames.push(data[i][1][0]);
        values.push(data[i][1][1]);
    }
	var personal_url = 'http://'+ window.location.host + '/index/personal/?uid=';
	var nod = {};
    var nod0 = {};
	nodeContent = [];
    nodeContent0 = [];
	nod['category'] = 0;
	nod['name'] = UserName;
	nod['value'] = 10;
    nod0['category'] = 0;
    nod0['name'] = UserName;
    nod0['value'] = 10;
	nodeContent.push(nod);
    nodeContent0.push(nod0);
	for (i=0;i<uids.length;i++){
			nod = {};
            nod0 = {};
			console.log(data[i][1][2]);   
			if(data[i][1][2]==0){
				nod0['category'] = 2;
                nod0['name'] = uids[i];
                nod0['value'] = values[i];
                nod0['label'] = unames[i];
			}else{
				nod['category'] = 1;
                nod['name'] = uids[i];
                nod['value'] = values[i];
                nod['label'] = unames[i];
			}
			nodeContent.push(nod);
            nodeContent0.push(nod0);
	}
	var linkline =[];
	for (i=0;i<uids.length;i++){
		line ={};
		line['source'] = uids[i];
		line['target'] = UserName;
		line['weight'] = 1;
		linkline.push(line);
	}
	var myChart1 = echarts.init(document.getElementById('test1'));
	var option = {
            title : {
                text: '粉丝',
                x:'left',
                y:'top'
            },
            legend: {
                x: 'right',
                data:['用户','未入库']
            },
            series : [
                {
                    type:'force',
                    name : "人物关系",
                    ribbonType: false,
                    categories : [
                        {
                            name: '用户'
                        },
						{
                            name:'未入库'
                        },
                    ],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            nodeStyle : {
                                brushType : 'both',
                                borderColor : 'rgba(255,215,0,0.4)',
                                borderWidth : 1
                            },
                            linkStyle: {
                                type: 'curve'
                            }
                        },
                        emphasis: {
                            label: {
                                show: false
                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                            },
                            nodeStyle : {
                                //r: 30
                            },
                            linkStyle : {}
                        }
                    },
                    useWorker: false,
                    minRadius : 15,
                    maxRadius : 25,
                    gravity: 1.1,
                    scaling: 1.1,
                    roam: 'move',
                    nodes:nodeContent0,
                    links : linkline
                }
            ]
    };  
	myChart1.setOption(option); 

    var myChart2 = echarts.init(document.getElementById('test1-2'));
    var option = {
            title : {
                text: '粉丝',
                x:'left',
                y:'top'
            },
            legend: {
                x: 'right',
                data:['用户','已入库']
            },
            series : [
                {
                    type:'force',
                    name : "人物关系",
                    ribbonType: false,
                    categories : [
                        {
                            name: '用户'
                        },
                        {
                            name:'已入库'
                        },
                    ],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            nodeStyle : {
                                brushType : 'both',
                                borderColor : 'rgba(255,215,0,0.4)',
                                borderWidth : 1
                            },
                            linkStyle: {
                                type: 'curve'
                            }
                        },
                        emphasis: {
                            label: {
                                show: false
                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                            },
                            nodeStyle : {
                                //r: 30
                            },
                            linkStyle : {}
                        }
                    },
                    useWorker: false,
                    minRadius : 15,
                    maxRadius : 25,
                    gravity: 1.1,
                    scaling: 1.1,
                    roam: 'move',
                    nodes:nodeContent,
                    links : linkline
                }
            ]
    };  
    myChart2.setOption(option); 

    require([
            'echarts'
        ],
        function(ec){
            var ecConfig = require('echarts/config');
            function focus(param) {
                var data = param.data;
                var links = option.series[0].links;
                var nodes = option.series[0].nodes;
                if (
                    data.source != null
                    && data.target != null
                ) { //点击的是边
                    var sourceNode = nodes.filter(function (n) {return n.name == data.source})[0];
                    var targetNode = nodes.filter(function (n) {return n.name == data.target})[0];
                    } else {
                    var node_url;
                    var weibo_url ;
                    var ajax_url ;
                    if(data.category == 0){
                        ajax_url = '/attribute/identify_uid/?uid='+UserID;
                        weibo_url = 'http://weibo.com/u/'+ UserID;
                        node_url = personal_url + UserID;
                    }else{
                        ajax_url = '/attribute/identify_uid/?uid='+data.name; 
                        weibo_url = 'http://weibo.com/u/'+ data.name;
                        node_url = personal_url + data.name;
                    } 
                    $.ajax({
                      url: ajax_url,
                      type: 'GET',
                      dataType: 'json',
                      async: false,
                      success:function(data){
                        if(data == 1){
                            window.open(node_url);
                        }
                        else{
                            window.open(weibo_url);
                        }
                      }
                    });
                }
            }
                myChart1.on(ecConfig.EVENT.CLICK, focus)

                myChart1.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
                });
            }
    )   
	
}
