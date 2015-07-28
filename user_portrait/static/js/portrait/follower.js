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
	var UserID = parent.personalData.uid;
	var UserName = parent.personalData.uname;
	//console.log(UserID);
	follower(data,UserID,UserName);	
}
}
var Follower = new Follower();
url = '/attribute/follower/?uid=1642591402' ;
Follower.call_sync_ajax_request(url, Follower.ajax_method, Follower.Draw_Follower);

function follower(data,UserID,UserName){
	uids = [];
	unames = [];
	values = [];
	
	for (var key in data){
		uids.push(key);
		unames.push(data[key][0]);
		values.push(data[key][1]);
	}
//console.log(uids);
	
	var nod = {};
	nodeContent = []
	nod['category'] = 0;
	nod['name'] = UserName;
	nod['value'] = 10;
	nodeContent.push(nod);
	for (i=0;i<10;i++){
			nod = {};
			nod['category'] = 1;
			nod['name'] = uids[i];
			nod['value'] = values[i];
			nodeContent.push(nod);
	}
	//console.log(nodeContent);
	var linkline =[];
	for (i=0;i<10;i++){
		line ={};
		line['source'] = uids[i];
		line['target'] = UserName;
		line['weight'] = 1;
		linkline.push(line);
	}
//console.log(linkline);
	var myChart1 = echarts.init(document.getElementById('test1'));
	var option = {
            title : {
                text: '粉丝',
                x:'left',
                y:'top'
            },
            legend: {
                x: 'right',
                data:['用户','朋友']
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
                            name:'朋友'
                        }
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
	myChart1.setOption(option); 
	
}