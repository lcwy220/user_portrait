// Date format
Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)){
        format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(format)){
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}
 function Search_weibo(){
  this.ajax_method = 'GET';
}


Search_weibo.prototype = {
  call_sync_ajax_request:function(url, method, callback){
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      async: false,
      success:callback
    });
  },
  Draw_model: function(data){
    $('#group_user').empty();
    html = '';
    html += '<table id="modal_table" class="table table-striped table-bordered bootstrap-datatable datatype responsive">';
    html += '<thead><tr><th class="center" style="text-align:center">用户ID</th><th class="center" style="text-align:center">昵称</th><th class="center" style="text-align:center">性别</th>';
    html += '<th class="center" style="text-align:center">注册地</th><th class="center" style="text-align:center">重要度</th><th class="center" style="text-align:center;width:72px">影响力</th></tr></thead>';
    html += '<tbody>';
    for ( i=0 ; i<data.length; i++){
        s = i.toString();
        if (data[s]['2'] == 1){
            sex = '男';
        }else{
            sex = '女';
        }
      html += '<tr><th class="center" style="text-align:center"><a target="_blank" href="/index/personal/?uid=' + data[s]['0']+ '">' + data[s]['0']+ '</a></th><th class="center" style="text-align:center">' + data[s]['1']+ '</th><th class="center" style="text-align:center">' + sex+ '</th>';
      html += '<th class="center" style="text-align:center">' + data[s]['3']+ '</th><th class="center" style="text-align:center">' + data[s]['4'].toFixed(2) + '</th><th class="center" style="text-align:center;width:72px">' + data[s]['5'].toFixed(2) + '</th></tr>';  
    };
    html += '</tbody>';
    html += '</table>';
    $('#group_user').append(html);

      },
  Draw_overview: function(data){
    $('#overview').empty();
    html = '';
    html += '<div id="stickynote" style="height:180px;width:250px;float:left"><ul class="gs_ul" style="margin-top:-50px"><li><a>';
    html += '<p style="font-size:16px">' + data[0] +'</p><p style="font-size:16px">' + data[1] +'</p><p style="font-size:16px">' + data[2] +'</p><p style="font-size:16px;cursor:pointer;text-decoration:underline" data-toggle="modal" data-target="#myModal">群组成员</p>';
    html += '</a></li></ul></div>';
    html += '<table style="height:150px;width:750px;float:right">';
    html += '<tr><td style="text-align:center;vertical-align:middle"><img src="/static/img/closeness.png" style="height:80px"></td>';
    html += '<td style="text-align:center;vertical-align:middle"><img src="/static/img/activeness.png" style="height:80px"></td>';
    html += '<td style="text-align:center;vertical-align:middle"><img src="/static/img/importance.png" style="height:80px"></td>';
    html += '<td style="text-align:center;vertical-align:middle"><img src="/static/img/influence.png" style="height:80px"></td></tr>';
    html += '<tr><td style="text-align:center;vertical-align:middle">' + data[3].toFixed(2) + '(连接紧密)</td><td style="text-align:center;vertical-align:middle">' + data[4].toFixed(2) + '(一般活跃)</td>';
    html += '<td style="text-align:center;vertical-align:middle">' + data[5].toFixed(2) + '(一般重要)</td><td style="text-align:center;vertical-align:middle">' + data[6].toFixed(2) + '(影响较大)</td></tr>';
    html += '<tr><td style="font-size:14px;text-align:center;vertical-align:middle"><b>紧密度<i id="" class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="说明"></i>&nbsp;&nbsp;</b></td>';
    html += '<td style="font-size:14px;text-align:center;vertical-align:middle"><b>活跃度<i id="" class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="说明"></i>&nbsp;&nbsp;</b></td>';
    html += '<td style="font-size:14px;text-align:center;vertical-align:middle"><b>重要度<i id="" class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="说明"></i>&nbsp;&nbsp;</b></td>';
    html += '<td style="font-size:14px;text-align:center;vertical-align:middle"><b>影响力<i id="" class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="说明"></i>&nbsp;&nbsp;</b></td></tr>';
    html += '</table>';
    $('#overview').append(html);
},
Draw_basic: function(data){
    Draw_totalnumber(data);
    Draw_verify(data);
    var myChart = echarts.init(document.getElementById('sex')); 
        var dataStyle = {
        normal: {
            label: {show:false},
            labelLine: {show:false}
        }
    };
    var placeHolderStyle = {
        normal : {
            color: 'rgba(0,0,0,0)',
            label: {show:false},
            labelLine: {show:false}
        },
        emphasis : {
            color: 'rgba(0,0,0,0)'
        }
    };
    option = {
        title: {
            text: '男女？',
            subtext: '',
            sublink: '',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle : {
                color : 'rgba(30,144,255,0.8)',
                fontFamily : '微软雅黑',
                fontSize : 15,
                fontWeight : 'bolder'
            }
        },
        tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : document.getElementById('main').offsetWidth / 2,
            y : 45,
            itemGap:12,
            data:['男','女']
        },
        toolbox: {
            show : true,
            feature : {
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name:'男女比例',
                type:'pie',
                clockWise:false,
                radius : [60, 80],
                itemStyle : dataStyle,
                data:[
                    {
                        value:data['0']['1'],
                        name:'男'
                    },
                    {
                        value:data['0']['2'],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'男女比例',
                type:'pie',
                clockWise:false,
                radius : [40, 60],
                itemStyle : dataStyle,
                data:[
                    {
                        value:data['0']['2'], 
                        name:'女'
                    },
                    {
                        value:data['0']['1'],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            }
        ]
    };
                        
         myChart.setOption(option);  
    },
Draw_activity: function(data){
    Draw_top_location(data);
    Draw_top_platform(data);
    Draw_more_top_location(data);
    Draw_more_top_platform(data);
    active_geo(data);
    data_x = [];
    data_y = [];
    for (var i = 0; i < data['1'].length; i++) {
        var s = i.toString();
        value_x = new Date(parseInt(data['1'][s]['0'])*1000).format("yyyy-MM-dd");
        value_y = data['1'][s]['1'];
        data_x.push(value_x);
        data_y.push(value_y);
       }
    $('#line').highcharts({
        chart: {
            type: 'spline',// line,
            animation: Highcharts.svg, // don't animate in old IE
            style: {
                fontSize: '12px',
                fontFamily: 'Microsoft YaHei'
            }},
        title: {
            text: '微博时间走势图',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
    lang: {
            printChart: "打印",
            downloadJPEG: "下载JPEG 图片",
            downloadPDF: "下载PDF文档",
            downloadPNG: "下载PNG 图片",
            downloadSVG: "下载SVG 矢量图",
            exportButtonTitle: "导出图片"
        },
        xAxis: {
            categories: data_x,
            labels:{
              rotation: 0,
              step: 6
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '微博总量 (条)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '条',
            xDateFormat: '%Y-%m-%d %H:%M:%S'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name:'微博量',
            data: data_y
        }]
    });
},
Draw_social_line: function(data){
    Draw_group(data);
    draw_relation_picture(data);
    draw_relation_table(data);
    draw_group_out_table(data);
    draw_more_group_out_table(data);
},
Draw_keyword: function(data){
    console.log(data);
    Draw_emotion(data);
    Draw_hashtag(data);
    Draw_more_emotion(data);
    Draw_more_hashtag(data);
    // Draw_more_keyword(data);
    keyword = [];
    for (i=0;i<20;i++){
      s=i.toString();
      word = {};
      word['name'] = data['1'][s]['0'];
      word['value'] = data['1'][s]['1']*60;
      word['itemStyle'] = createRandomItemStyle();
      keyword.push(word);
    }
    console.log(keyword);
    var myChart = echarts.init(document.getElementById('keywordcloud'));
    var option = {
    title: {
        text: '',
    },
    tooltip: {
        show: true
    },
    series: [{
        name: '关键词',
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation : [0, 45, 90, -45],
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 15
        },
        data:keyword
    }]
};
                    
      myChart.setOption(option);

    
},
Draw_weibo: function(data){
    Draw_influence(data);
    Draw_importance(data);
    Draw_activeness(data);
    $('#weibo').empty();
    if (data['3'].length > 9){
        $('#weibo').css("height", "615px");
    }
    else{
        var height = data['3'].length * 35 + 265;
        $('#weibo').css("height", height+"px");
    }

    html = '';
    html += '<table id="weibo_table" class="table table-striped table-bordered bootstrap-datatable datatype responsive" style="font-size:14px">'; 
    html += '<thead><tr><th style="text-align:center;vertical-align:middle">用户ID</th><th style="text-align:center;vertical-align:middle;width:180px">昵称</th><th style="text-align:center;vertical-align:middle;width:80px">活跃度</th>';
    html += '<th style="text-align:center;vertical-align:middle;">重要度</th><th style="text-align:center;vertical-align:middle;">影响力</th><th style="text-align:center;vertical-align:middle;">原创微博最大转发数</th>';
    html += '<th style="text-align:center;vertical-align:middle;">原创微博最大评论数</th><th style="text-align:center;vertical-align:middle;">转发微博最大转发数</th><th style="text-align:center;vertical-align:middle;">转发微博最大评论数</th></tr></thead>';
    html += '<tbody>';
    for ( var i = 0 ;i< data['3'].length;i++){
        s = i.toString();
        html += '<tr><th style="text-align:center"><a target="_blank" href="/index/personal/?uid=' + data['3'][s]['0'] + '">' + data['3'][s]['0'] +'</a></th><th style="text-align:center;width:180px">' +  data['3'][s]['1'] + '</th><th style="text-align:center;width:80px">' +  data['3'][s]['2'].toFixed(2) + '</th>';
        html += '<th style="text-align:center">' +  data['3'][s]['3'].toFixed(2) + '</th><th style="text-align:center">' +  data['3'][s]['4'].toFixed(2) + '</th><th style="text-align:center"><a target="_blank" href="' + data['3'][s]['5']['2'] + '">' +  data['3'][s]['5']['0'] + '</a></th>';
        html += '<th style="text-align:center"><a target="_blank" href="' + data['3'][s]['6']['2'] + '">' + data['3'][s]['6']['0'] + '</a></th><th style="text-align:center"><a href="' + data['3'][s]['7']['2'] + '">' + data['3'][s]['7']['0'] + '</a></th><th style="text-align:center"><a href="' + data['3'][s]['8']['2'] + '">' + data['3'][s]['8']['0'] + '</a></th></tr>';
    }
    html += '</tbody>';
    html += '</table>';
    $('#weibo').append(html);
}
}
 
var Search_weibo = new Search_weibo(); 

 // Draw_more_keyword(data){
 //    $('#more_keyword').empty();
 //    html = '';
 //    html += '<table id ="user_group" class="table table-striped table-bordered bootstrap-datatable datatable responsive;font-size:14px">';
 //    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">关键词</th><th style="text-align:center">权重</th></tr>';
 //    for (var i = 0; i < data['1'].length; i++) {
 //       var s = i.toString();
 //       var m = i + 1;
 //       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['1'][s]['0'] + '</th><th style="text-align:center">' + data['1'][s]['1'] +  '</th></tr>';
 //    };
 //    html += '</table>'; 
 //    $('#more_keyword').append(html);

 // }


function Draw_group(data){
    $('#group').empty();
    html = '';
    html += '<table><tr><th style="text-align:center">连接紧密度<i id="closeness_tooltip" class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="群体内所有节点之间实际存在的边数与所有可能边数之比"></i>&nbsp;&nbsp;</th><th style="text-align:center">'+ data['1'].toFixed(2) +'(低于平均)</th></tr>';
    html += '<tr><th style="text-align:center">微博转发频率<i id="weibo_tooltip" class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="群体内单个节点转发群体微博的平均次数"></i>&nbsp;&nbsp;</th><th style="text-align:center">'+ data['2'].toFixed(2) +'(高于平均)</th></tr>';
    html += '<tr><th style="text-align:center">参与转发比例<i id="join_tooltip" class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="群体内所有参与转发群体微博的人数占群体人数的比例"></i>&nbsp;&nbsp;</th><th style="text-align:center">'+ (Math.round(data['3'] * 10000)/100).toFixed(0) + '%' +'(低于平均)</th></tr>';
    html += '</table>'; 
    $('#group').append(html);
}


function active_geo(data){
    $('#top_active_geo').empty();
    html = '';
    html += '<div style="font-size:16px">一周轨迹</div>';
    html += '<div class="clearfix course_nr"><ul class="course_nr2">';
    for (key in data['3']){
        html += '<li><div class="shiji"><h1>' + key.substring(5, 10) + '</h1><p>' + data['3'][key]['0']['1'] + '</p><p>' + data['3'][key]['0']['0'] + '</p><p>' + data['3'][key]['1']['1'] + '</p><p>' + data['3'][key]['1']['0'] + '</p></div></li>';        
    }
    html += '</ul></div>';   
    $('#top_active_geo').append(html);
}

function draw_relation_picture(data){
    total_content = [];
    source_content = []
    for (i=0;i<data['0'].length;i++){
        s=i.toString();
        content = {};
        content['category'] = 1;
        content['name'] = data['0'][s]['1'];
        content['id'] = data['0'][s]['0'];
        content['value'] = 7;
        content['draggable'] = true;
        content['symbolSize'] = [60, 30];
        total_content.push(content);
        content = {};
        content['category'] = 1;
        content['name'] = data['0'][s]['3'];
        content['id'] = data['0'][s]['2'];
        content['value'] = 7;
        content['draggable'] = true;
        content['symbolSize'] = [60, 30];
        total_content.push(content);

        relation = {};
        relation['source'] = data['0'][s]['1'];
        relation['target'] = data['0'][s]['3'];
        relation['weight'] = data['0'][s]['4'];
        relation['name'] = data['0'][s]['4'];

        width = data['0'][s]['4'];
        normal = {'width':width};
        itemStyle= {'normal':normal};
        relation['itemStyle'] = itemStyle;

        source_content.push(relation);
    }

    var option = {
    tooltip : {
        trigger: 'item',
        formatter: '{a} : {b}'
    },
    toolbox: {
        show : true,
        feature : {
            restore : {show: true},
            magicType: {show: true, type: ['force', 'chord']},
            saveAsImage : {show: true}
        }
    },
    legend: {
        x: 'left',
        data:['']
    },
    series : [
        {
            type:'force',
            name : "",
            ribbonType: false,
            categories : [
                {
                    name:'微博用户'
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
            minRadius : 15,
            maxRadius : 25,
            gravity: 1.1,
            scaling: 1.2,
            draggable: false,
            linkSymbol: 'arrow',
            steps: 10,
            coolDown: 0.9,
            //preventOverlap: true,
            nodes:total_content,
            links : source_content
        }
    ]
};
    var myChart = echarts.init(document.getElementById('relation_picture'));
    myChart.setOption(option);
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
                    // console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
                } else{
                        window.open("/index/personal/?uid=" + data.id);                 
                }
            }
                myChart.on(ecConfig.EVENT.CLICK, focus)

                myChart.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
                    console.log(myChart.chart.force.getPosition());
                });
            }
    )
}

function draw_relation_table(data){
    $('#relation_table').empty();
    html = '';
    html = '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive">';
    html += '<tr><td style="text-align:center">昵称</td><td style="text-align:center"></td><td style="text-align:center">昵称</td><td style="text-align:center">转发量</td></tr>';
    for (i=0;i<data['0'].length;i++){
        s =i.toString();
    html += '<tr><td style="text-align:center"><a target="_blank" href="/index/personal/?uid=' + data['0'][s]['2'] + '">' + data['0'][s]['3'] +'</a></td><td style="text-align:center"><img src= "/static/img/arrow.png" style="height:20px"></td><td style="text-align:center"><a target="_blank" href="/index/personal/?uid=' + data['0'][s]['0'] + '">' + data['0'][s]['1'] +'</a></td><td style="text-align:center">' + data['0'][s]['4'] +'</td></tr>';
    };
    html += '</table>';
    $('#relation_table').append(html);
}


function draw_group_out_table(data){
    $('#relation_active_table').empty();
    html = '';
    html = '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive">';
    html += '<tr><td style="text-align:center">昵称</td><td style="text-align:center">影响力</td><td style="text-align:center"</td><td style="text-align:center">昵称</td><td style="text-align:center">转发量</td></tr>';
    for (i=0;i<5;i++){
        s =i.toString();
    html += '<tr><td style="text-align:center"><a target="_blank" href="/index/personal/?uid=' + data['4'][s]['2'] + '">' + data['4'][s]['3'] +'</a></td><td style="text-align:center">' + data['4'][s]['5'].toFixed(2) +'</td><td style="text-align:center"><img src= "/static/img/arrow.png" style="height:20px"></td><td style="text-align:center"><a target="_blank" href="/index/personal/?uid=' + data['4'][s]['0'] + '">' + data['4'][s]['1'] +'</a></td><td style="text-align:center">' + data['4'][s]['4'] +'</td></tr>';
    };
    html += '</table>';
    $('#relation_active_table').append(html);
}

function draw_more_group_out_table(data){
    $('#more_group_out_user').empty();
    html = '';
    html = '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive">';
    html += '<tr><td style="text-align:center">昵称</td><td style="text-align:center">影响力</td><td style="text-align:center"</td><td style="text-align:center">昵称</td><td style="text-align:center">转发量</td></tr>';
    for (i=0;i<data['4'].length;i++){
        s =i.toString();
    html += '<tr><td style="text-align:center"><a target="_blank" href="/index/personal/?uid=' + data['4'][s]['2'] + '">' + data['4'][s]['3'] +'</a></td><td style="text-align:center">' + data['4'][s]['5'].toFixed(2) +'</td><td style="text-align:center"><img src= "/static/img/arrow.png" style="height:20px"></td><td style="text-align:center"><a target="_blank" href="/index/personal/?uid=' + data['4'][s]['0'] + '">' + data['4'][s]['1'] +'</a></td><td style="text-align:center">' + data['4'][s]['4'] +'</td></tr>';
    };
    html += '</table>';
    $('#more_group_out_user').append(html);
}

function Draw_importance(data){
    x_data = [];
    y_data = [];
    for (var i = 0; i < data['0']['0'].length; i++) {
       var s = i.toString();
       x_value = data['0']['0'][s];
       x_data.push(x_value);
    };
    for (var i = 0; i < data['0']['1'].length; i++) {
       var s = i.toString();
       y_value = data['0']['1'][s].toFixed(0);
       y_data.push(y_value);
    };
    xdata = [];
    for (i = 0; i< y_data.length-1; i++){
    xdata.push(y_data[i] + '-' + y_data[i+1])
    };
    $('#importance').highcharts({
        chart: {
        type: 'column',
        margin: [ 50, 50, 100, 80]
    },
    title: {
        text: '重要度排名分布'
    },
    lang: {
            printChart: "打印",
            downloadJPEG: "下载JPEG 图片",
            downloadPDF: "下载PDF文档",
            downloadPNG: "下载PNG 图片",
            downloadSVG: "下载SVG 矢量图",
            exportButtonTitle: "导出图片"
        },
    xAxis: {
        title: {
                text: '排名'
            },
        categories: xdata,
        labels: {
            rotation: -45,
            align: 'right'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '数量 (人)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '<b>{point.y:.1f} 人</b>',
    },
    plotOptions: {
           series: {
               pointPadding: 0, //数据点之间的距离值
               groupPadding: 0, //分组之间的距离值
               borderWidth: 0,
               shadow: false,
               pointWidth:38//柱子之间的距离值
           }
       },
    series: [{
        name: '',
        data: x_data ,
        dataLabels: {
            // enabled: true,
            rotation: 0,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
                fontSize: '13px',
                fontFamily: '微软雅黑',
                textShadow: '0 0 3px black'
            }
        }
    }]
});
}

function Draw_activeness(data){
    x_data = [];
    y_data = [];
    for (var i = 0; i < data['1']['0'].length; i++) {
       var s = i.toString();
       x_value = data['1']['0'][s];
       x_data.push(x_value);
    };
    for (var i = 0; i < data['1']['1'].length; i++) {
       var s = i.toString();
       y_value = data['1']['1'][s].toFixed(0);
       y_data.push(y_value);
    };
    xdata = [];
    for (i = 0; i< y_data.length-1; i++){
        xdata.push(y_data[i] + '-' + y_data[i+1])
    };

    $('#activeness').highcharts({
        chart: {
        type: 'column',
        margin: [ 50, 50, 100, 80]
    },
    title: {
        text: '活跃度排名分布'
    },
    lang: {
        printChart: "打印",
        downloadJPEG: "下载JPEG 图片",
        downloadPDF: "下载PDF文档",
        downloadPNG: "下载PNG 图片",
        downloadSVG: "下载SVG 矢量图",
        exportButtonTitle: "导出图片"
    },
    xAxis: {
        title: {
                text: '排名'
            },
        categories: xdata,
        labels: {
            rotation: -45,
            align: 'right'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '数量 (人)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '<b>{point.y:.1f} 人</b>',
    },
    plotOptions: {
           series: {
               pointPadding: 0, //数据点之间的距离值
               groupPadding: 0, //分组之间的距离值
               borderWidth: 0,
               shadow: false,
               pointWidth:38//柱子之间的距离值
           }
       },
    series: [{
        name: '',
        data: x_data ,
        dataLabels: {
            // enabled: true,
            rotation: 0,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
                fontSize: '13px',
                fontFamily: '微软雅黑',
                textShadow: '0 0 3px black'
            }
        }
    }]
});
}


function Draw_influence(data){
    x_data = [];
    y_data = [];
    for (var i = 0; i < data['2']['0'].length; i++) {
       var s = i.toString();
       x_value = data['2']['0'][s];
       x_data.push(x_value);
    };
    for (var i = 0; i < data['2']['1'].length; i++) {
       var s = i.toString();
       y_value = data['2']['1'][s].toFixed(0);
       y_data.push(y_value);
    };
    xdata = [];
    for (i = 0; i< y_data.length-1; i++){
        xdata.push(y_data[i] + '-' + y_data[i+1])
    };
    $('#influence').highcharts({
        chart: {
        type: 'column',
        margin: [ 50, 50, 100, 80]
    },
    title: {
        text: '影响力排名分布'
    },
    lang: {
            printChart: "打印",
            downloadJPEG: "下载JPEG 图片",
            downloadPDF: "下载PDF文档",
            downloadPNG: "下载PNG 图片",
            downloadSVG: "下载SVG 矢量图",
            exportButtonTitle: "导出图片"
        },
    xAxis: {
        title: {
                text: '排名'
            },
        categories: xdata,
        labels: {
            rotation: -45,
            align: 'right'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '数量 (人)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '<b>{point.y:.1f} 人</b>',
    },
    plotOptions: {
           series: {
               pointPadding: 0, //数据点之间的距离值
               groupPadding: 0, //分组之间的距离值
               borderWidth: 0,
               shadow: false,
               pointWidth:38//柱子之间的距离值
           }
       },
    series: [{
        name: '',
        data: x_data ,
        dataLabels: {
            // enabled: true,
            rotation: 0,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
                fontSize: '13px',
                fontFamily: '微软雅黑',
                textShadow: '0 0 3px black'
            }
        }
    }]
});
}

function createRandomItemStyle(){
      
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}


$(document).ready(function(){
	var downloadurl = window.location.host;
    Draw_think_emotion();
    Draw_think_domain();
    Draw_think_topic();
    weibo_url =  'http://' + downloadurl + "/group/show_group_result/?task_name=" + name + "&module=overview";
    Search_weibo.call_sync_ajax_request(weibo_url, Search_weibo.ajax_method, Search_weibo.Draw_overview);
    model_url =  'http://' + downloadurl + "/group/show_group_list/?task_name=" + name;
    Search_weibo.call_sync_ajax_request(model_url, Search_weibo.ajax_method, Search_weibo.Draw_model);
    basic_url =  'http://' + downloadurl + "/group/show_group_result/?task_name=" + name + "&module=basic";
    Search_weibo.call_sync_ajax_request(basic_url, Search_weibo.ajax_method, Search_weibo.Draw_basic);
    activity_url =  'http://' + downloadurl + "/group/show_group_result/?task_name=" + name + "&module=activity";
    Search_weibo.call_sync_ajax_request(activity_url, Search_weibo.ajax_method, Search_weibo.Draw_activity);
    social_url =  'http://' + downloadurl + "/group/show_group_result/?task_name=" + name + "&module=social";
    Search_weibo.call_sync_ajax_request(social_url, Search_weibo.ajax_method, Search_weibo.Draw_social_line);
    think_url =  'http://' + downloadurl + "/group/show_group_result/?task_name=" + name + "&module=think";
    text_url =  'http://' + downloadurl + "/group/show_group_result/?task_name=" + name + "&module=text";
    Search_weibo.call_sync_ajax_request(text_url, Search_weibo.ajax_method, Search_weibo.Draw_keyword);
    influence_url =  'http://' + downloadurl + "/group/show_group_result/?task_name=" + name + "&module=influence";
    Search_weibo.call_sync_ajax_request(influence_url, Search_weibo.ajax_method, Search_weibo.Draw_weibo);

})

function Draw_verify(data){
    var myChart = echarts.init(document.getElementById('verify')); 
        var dataStyle = {
        normal: {
            label: {show:false},
            labelLine: {show:false}
        }
    };
    var placeHolderStyle = {
        normal : {
            color: 'rgba(0,0,0,0)',
            label: {show:false},
            labelLine: {show:false}
        },
        emphasis : {
            color: 'rgba(0,0,0,0)'
        }
    };
    option = {
        title: {
            text: '你认证了吗？',
            subtext: '',
            sublink: '',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle : {
                color : 'rgba(30,144,255,0.8)',
                fontFamily : '微软雅黑',
                fontSize : 15,
                fontWeight : 'bolder'
            }
        },
        tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : document.getElementById('main').offsetWidth / 2,
            y : 45,
            itemGap:12,
            data:['已认证','未认证']
        },
        toolbox: {
            show : true,
            feature : {
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name:'认证比例',
                type:'pie',
                clockWise:false,
                radius : [60, 80],
                itemStyle : dataStyle,
                data:[
                    {
                        value:data['0']['1'],
                        name:'已认证'
                    },
                    {
                        value:data['0']['2'],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'认证比例',
                type:'pie',
                clockWise:false,
                radius : [40, 60],
                itemStyle : dataStyle,
                data:[
                    {
                        value:data['0']['2'], 
                        name:'未认证'
                    },
                    {
                        value:data['0']['1'],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            }
        ]
    };
                        
         myChart.setOption(option);  
    }
function Draw_totalnumber(data){
    $('#totalnumber').empty();
    html = '';
    html += '<a class="well top-block" style="height:180px;width:180px;border-radius:400px;margin-top:10px">';
    html += '<div><img src="/static/img/user_group.png" style="height:40px;margin-top:40px"></div>';
    html += '<div>群组总人数</div>'
    html += '<div>' + data['1'] + '</div></a>';
    $('#totalnumber').append(html);
}

function Draw_think_emotion(){
    var myChart = echarts.init(document.getElementById('pie_emotion')); 
    var option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: false},
            dataView : {show: false, readOnly: false},
            magicType : {
                show: false, 
                type: ['pie', 'funnel']
            },
            restore : {show: false},
            saveAsImage : {show: true}
        }
    },
    calculable : false,
    series : [
        {
            name:'',
            type:'pie',
            selectedMode: 'single',
            radius : [0, 35],
            
            // for funnel
            x: '20%',
            width: '40%',
            funnelAlign: 'right',
            max: 1548,
            
            itemStyle : {
                normal : {
                    label : {
                        position : 'inner'
                    },
                    labelLine : {
                        show : false
                    }
                }
            },
            data:[
                {value:5, name:'积极'},
                {value:5, name:'中性'},
                {value:12, name:'消极', selected:true}
            ]
        },
        {
            name:'',
            type:'pie',
            radius : [50, 70],
            
            // for funnel
            x: '60%',
            width: '35%',
            funnelAlign: 'left',
            max: 1048,
            
            data:[
                {value:5, name:'积极'},
                {value:5, name:'中性'},
                {value:3, name:'生气'},
                {value:4, name:'悲伤'},
                {value:5, name:'其他'}
            ]
        }
    ]
}
    myChart.setOption(option);  
                    
}

function Draw_think_topic(){
    var myChart = echarts.init(document.getElementById('radar_domain')); 
        
        var option = {
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            x : 'center',
            data:['话题']
        },
        toolbox: {
            show : true,
            feature : {
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        polar : [
            {
            indicator : [
                {text : '娱乐', max  : 100},
                {text : '计算机', max  : 100},
                {text : '经济', max  : 100},
                {text : '教育', max  : 100},
                {text : '自然', max  : 100},
                {text : '健康', max  : 100}],
                radius : 80
            }
        ],
        series : [
            {
                name: '',
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data : [
                    {
                        value : [97, 42, 88, 94, 90, 86],
                        name : '话题'
                    }
                ]
            }
        ]
    };                
        // 为echarts对象加载数据 
        myChart.setOption(option); 
}
function Draw_think_domain(){
    var myChart = echarts.init(document.getElementById('radar_topic')); 
        
        var option = {
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            x : 'center',
            data:['领域']
        },
        toolbox: {
            show : true,
            feature : {
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        polar : [
            {
                indicator : [
                {text : '高校微博', max  : 100},
                {text : '境内机构', max  : 100},
                {text : '境外机构', max  : 100},
                {text : '媒体', max  : 100},
                {text : '律师', max  : 100},
                {text : '草根', max  : 100}],
                radius : 80
            }
        ],
        series : [
            {
                name: '',
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data : [
                    {
                        value : [97, 56, 28, 94, 45, 86],
                        name : '领域'
                    }
                ]
            }
        ]
    };                
        // 为echarts对象加载数据 
        myChart.setOption(option); 
}

   
function Draw_hashtag(data){
    $('#hashtag').empty();
    html = '';
    html += '<div><span style="font-size:16px;">hashtag排名</span><span style="font-size:16px;float:right;cursor:pointer" type="button"data-toggle="modal" data-target="#rank_hashtag"><u>查看更多</u></span></div>';
    html += '<table id ="user_group" class="table table-striped table-bordered bootstrap-datatable datatable responsive;font-size:14px">';
    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">hashtag</th><th style="text-align:center">微博数</th></tr>';
    for (var i = 0; i < 5; i++) {
       var s = i.toString();
       var m = i + 1;
       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['0'][s]['0'] + '</th><th style="text-align:center">' + data['0'][s]['1'] +  '</th></tr>';
    };
    html += '</table>'; 
    $('#hashtag').append(html);    
}

function Draw_more_hashtag(data){
    $('#more_hashtag').empty();
    html = '';
    html += '<table id ="user_group" class="table table-striped table-bordered bootstrap-datatable datatable responsive;font-size:14px">';
    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">hashtag</th><th style="text-align:center">微博数</th></tr>';
    for (var i = 0; i < data['0'].length; i++) {
       var s = i.toString();
       var m = i + 1;
       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['0'][s]['0'] + '</th><th style="text-align:center">' + data['0'][s]['1'] +  '</th></tr>';
    };
    html += '</table>'; 
    $('#more_hashtag').append(html);    
}
function text2icon(text){
    var icon = '';
    for (var i = 0;i < emoticon_list.length;i++){
        var item = emoticon_list[i];
        if (item['value'] == text){
            icon = item['icon'];
            return icon;
        }
    }
    return icon;
}

function Draw_emotion(data){
    $('#emotion').empty();
    html = '';
    html += '<div><span style="font-size:16px;">表情符号排名</span><span style="font-size:16px;float:right;cursor: pointer" type="button"data-toggle="modal" data-target="#rank_emotion"><u>查看更多</u></span></div>';
    html += '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive;font-size:14px">';
    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">表情符号</th><th style="text-align:center">微博数</th></tr>';
    for (var i = 0; i <  5; i++) {
       var s = i.toString();
       var m = i + 1;
       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['2'][s]['0'] + '<img src=' + text2icon(data['2'][s]['0']) + ' /></th><th style="text-align:center">' + data['2'][s]['1'] +  '</th></tr>';
    };
    html += '</table>'; 
    $('#emotion').append(html);    
}

function Draw_more_emotion(data){
    $('#more_emotion').empty();
    html = '';
    html += '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive;font-size:14px">';
    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">表情符号</th><th style="text-align:center">微博数</th></tr>';
    for (var i = 0; i <  data['2'].length; i++) {
       var s = i.toString();
       var m = i + 1;
       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['2'][s]['0'] + '<img src=' + text2icon(data['2'][s]['0']) + ' /></th><th style="text-align:center">' + data['2'][s]['1'] +  '</th></tr>';
    };
    html += '</table>'; 
    $('#more_emotion').append(html);    
}

function Draw_top_location(data){
    $('#top_location').empty();
    html = '';
    html += '<div><span style="font-size:16px;">发布地点排名</span><span style="font-size:16px;margin-left:240px;cursor: pointer" type="button"data-toggle="modal" data-target="#rank_geo"><u>查看更多</u></span></div>';
    html += '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive" style="width:400px;font-size:14px">';
    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">地点</th><th style="text-align:center">微博数</th></tr>';
    for (var i = 0; i <  5; i++) {
       var s = i.toString();
       var m = i + 1;
       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['0'][s]['0'] + '</th><th style="text-align:center">' + data['0'][s]['1'] +  '</th></tr>';
    };
    html += '</table>'; 
    $('#top_location').append(html);
}

function Draw_more_top_location(data){
    $('#top_more_location').empty();
    html = '';
    html += '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive" font-size:14px">';
    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">地点</th><th style="text-align:center">微博数</th></tr>';
    for (var i = 0; i <  data['0'].length; i++) {
       var s = i.toString();
       var m = i + 1;
       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['0'][s]['0'] + '</th><th style="text-align:center">' + data['0'][s]['1'] +  '</th></tr>';
    };
    html += '</table>'; 
    $('#top_more_location').append(html);
}
function Draw_top_platform(data){
    $('#top_platform').empty();
    html = '';
 html += '<div><span style="font-size:16px;">发布平台排名</span><span style="font-size:16px;margin-left:240px;cursor:pointer" type="button"data-toggle="modal" data-target="#rank_platform"><u>查看更多</u></span></div>';
    html += '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive" style="width:400px;font-size:14px">';
    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">平台</th><th style="text-align:center">微博数</th></tr>';
    for (var i = 0; i < data['2'].length; i++) {
       var s = i.toString();
       var m = i + 1;
       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['2']['0']['0'] + '</th><th style="text-align:center">2819</th></tr>';
    };
    html += '<tr><th style="text-align:center">' + 2 + '</th><th style="text-align:center">iphone</th><th style="text-align:center">237</th></tr>';
    html += '<tr><th style="text-align:center">' + 3 + '</th><th style="text-align:center">ipad</th><th style="text-align:center">158</th></tr>';
    html += '<tr><th style="text-align:center">' + 4 + '</th><th style="text-align:center">huawei</th><th style="text-align:center">74</th></tr>';
    html += '<tr><th style="text-align:center">' + 5 + '</th><th style="text-align:center">SAMSUNG</th><th style="text-align:center">30</th></tr>';
    html += '</table>'; 
    $('#top_platform').append(html);
}

function Draw_more_top_platform(data){
    $('#top_more_platform').empty();
    html = '';
    html += '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive" font-size:14px">';
    html += '<tr><th style="text-align:center">排名</th><th style="text-align:center">平台</th><th style="text-align:center">微博数</th></tr>';
    for (var i = 0; i < data['2'].length; i++) {
       var s = i.toString();
       var m = i + 1;
       html += '<tr><th style="text-align:center">' + m + '</th><th style="text-align:center">' + data['2']['0']['0'] + '</th><th style="text-align:center">2819</th></tr>';
    };
    html += '<tr><th style="text-align:center">' + 2 + '</th><th style="text-align:center">iphone</th><th style="text-align:center">237</th></tr>';
    html += '<tr><th style="text-align:center">' + 3 + '</th><th style="text-align:center">ipad</th><th style="text-align:center">158</th></tr>';
    html += '<tr><th style="text-align:center">' + 4 + '</th><th style="text-align:center">huawei</th><th style="text-align:center">74</th></tr>';
    html += '<tr><th style="text-align:center">' + 5 + '</th><th style="text-align:center">SAMSUNG</th><th style="text-align:center">30</th></tr>';
    html += '</table>'; 
    $('#top_more_platform').append(html);
}

function Draw_think_status(){
    var myChart = echarts.init(document.getElementById('radar_status')); 
        
        var option = {
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            x : 'center',
            data:['身份']
        },
        toolbox: {
            show : true,
            feature : {
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        polar : [
            {
                indicator : [
                {text : '进攻', max  : 100},
                {text : '防守', max  : 100},
                {text : '体能', max  : 100},
                {text : '速度', max  : 100},
                {text : '力量', max  : 100},
                {text : '技巧', max  : 100}],
                radius : 80
            }
        ],
        series : [
            {
                name: '',
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data : [
                    {
                        value : [97, 42, 88, 94, 90, 86],
                        name : '身份'
                    }
                ]
            }
        ]
    };                
        // 为echarts对象加载数据 
        myChart.setOption(option); 
}
