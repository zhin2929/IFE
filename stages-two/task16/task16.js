  /**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 

function addAqiData() {
  var city = document.getElementById("aqi-city-input").value.trim();
  var air = document.getElementById("aqi-value-input").value.trim();
  // 使用正则判断用户输入的是不是整数
  if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
    alert("城市名必须为中英文字符！");
    return ; //结束函数
  }
  if(!air.match(/^\d+$/)) {
    alert("空气质量指数必须为整数！");
    return ; //结束函数
  }
  aqiData[city] = air;

  /*var re = /^[0-9]*[1-9][0-9]*$/ ;
  function testNum(re, num) {
    return re.test(num);
  }
  if(!testNum(re,air) && air !=='') {
    alert("空气质量指数输入为整数");
  } */

}

/**
 * 渲染aqi-table表格
 */
var table = document.getElementById("aqi-table");

// var oldDataLength = 0;

function renderAqiList() {
  // var data = [];
  // var n=0;
  // for(data[n++] in aqiData);
  // alert("table的值"+table.children.length);
  // if(!table.innerHTML) {
  //   table.insertRow(0);
  //   table.rows[0].insertCell(0);
  //   table.rows[0].insertCell(1);
  //   table.rows[0].insertCell(2);
  //   table.rows[0].cells[0].appendChild(document.createTextNode('城市'));
  //   table.rows[0].cells[1].appendChild(document.createTextNode('空气质量'));
  //   table.rows[0].cells[2].appendChild(document.createTextNode('操作'));
  // }

  // if( (data.length >= 1 && data.length !== oldDataLength) ) {
  //   for(var i=data.length; (i-1)<data.length; i++) {
  //     table.insertRow(i);
  //     table.rows[i].insertCell(0);
  //     table.rows[i].insertCell(1);
  //     table.rows[i].insertCell(2);
  //     table.rows[i].cells[0].appendChild(document.createTextNode(data[i-1]));
  //     table.rows[i].cells[1].appendChild(document.createTextNode(aqiData[data[i-1]]));
  //     var button = document.createElement("button");
  //     button.innerHTML = "删除";
  //     table.rows[i].cells[2].appendChild(button);
  //   }
  //   oldDataLength = data.length;
  // }
  var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? items : "";
  
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(t) {
  // do sth.
  var tr = t.parentElement.parentElement;
  var c = tr.children[0].innerHTML;

  delete aqiData[c];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addbtn = document.getElementById("add-btn");
  addbtn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  // var del-button = document.getElementsByName("del-btn");

  document.getElementById("aqi-table").addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            // alert("删除");
            delBtnHandle(e.target);
        }
    });
  
}

init();