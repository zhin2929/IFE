/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/


   function addHandler(element, type, handler){
    if (element.addEventListener){
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent){
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    }

    function removeHandler(element, type, handler){
    if (element.removeEventListener){
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent){
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
  }


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 93; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

function getWidth(time) {
  if(time === 'day') {
    return 13.5;
  } else if(time === 'week') {
    return 12*7;
  } else {
    return 13.5*7*3;
  }
}
/**
 * 渲染图表
 */
function renderChart() {
  var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
  var color = '',text = '';
  var w = getWidth(pageState.nowGraTime);
  for (var item in chartData) {
    // alert(item+"  item");
    color = '#' + Math.floor(Math.random() * 0xFFAACC).toString(16);
    text += '<div class="renderWidth" title="'+item+":"+chartData[item]+'" style="width:'+w+'px; height:'+chartData[item]+'px; background-color:'+color+'"></div>';
  }
  aqiChartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定选项是否发生了变化 
  if(this.value !== pageState.nowGraTime) {
    pageState.nowGraTime = this.value;
  } 
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据
  if(this.value !== pageState.nowSelectCity) {
    pageState.nowSelectCity = this.value;
    // alert(pageState.nowSelectCity);
  } 
  
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */

function initGraTimeForm() {
  //EventUtil
  var a = document.getElementById("form-gra-time");
 
  var radios = a.getElementsByTagName("input");
  // radios[0].checked = true;
  for(var i=0; i<radios.length; i++) {
    addHandler(radios[i],"click", graTimeChange);
  }

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectCity = document.getElementById("city-select");
  var cityList = '';
  for(c in aqiSourceData) {
      cityList += '<option>' + c + '</option>';
      
  }
  selectCity.innerHTML = cityList;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  for(var i=0; i<selectCity.length; i++) {
    addHandler(selectCity,"change",citySelectChange);
  }

}

function getMonthDay(a) {
  //闰年判断
  var b = new Date(a);
  var year = b.getFullYear();

  var feb = 28;
  var m = b.getMonth()+1;
  if( (year % 400 === 0) || (year%4 === 0 && year%100 !== 0) ) {
    feb = 29;
  }
  switch(m) {
    case 1: 
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12: return 31; break;
    case 2: return feb; break;
    default : return 30;  
  }
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式

  // renderAqi是一个城市92天的降水量数组
  var renderAqi = aqiSourceData[pageState.nowSelectCity];
  // alert(pageState.nowSelectCity);
  if(pageState.nowGraTime === 'day') {
    chartData = renderAqi;
    // alert("day");
  }


  var weekSum = 0, dayCnt = 0, j = 1;
  // alert("j:"+j);
  if (pageState.nowGraTime ==='week') {
    chartData = {};
    for(item in renderAqi) {
      weekSum += renderAqi[item];
      dayCnt += 1;
      if (dayCnt%7 === 0) {
        // alert("j="+j);
        chartData['第'+(j++)+'周'] = Math.floor(weekSum/7);
        weekSum = 0;
      }
    }
    
    if ( (dayCnt-(j-1)*7) >= 1 && (dayCnt-(j-1)*7) < 7 ) {
        chartData['第'+(j)+'周'] = Math.floor(weekSum/(dayCnt-(j-1)*7));
    } //保证最后一周若不满也能算一周
  }


  var monthSum = 0, dayCount = 0, monthDay = 0,m=0;
  j = 1;
  dayCnt = 0;   
  if (pageState.nowGraTime ==='month') {
    chartData = {};
    for(item in renderAqi) {
      monthSum += renderAqi[item];
      dayCnt += 1;
      dayCount += 1;
      monthDay = getMonthDay( (new Date(item)) );
      if ( dayCnt% monthDay === 0) {
        m += monthDay;      
        chartData['第'+(j++)+'月'] = Math.floor( monthSum/monthDay );
        monthSum = 0;
        dayCnt = 0;
      }
    }

    if ( (dayCount-m) >= 1 && (dayCount-m)  < getMonthDay(monthDay+1) ) { 
      // alert("j=="+j);    
      chartData['第'+(j)+'月'] = Math.floor(monthSum/getMonthDay(monthDay+1));
    }  //保证最后一月若不满也能算一月
  }
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
