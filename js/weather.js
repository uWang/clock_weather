function findWeather() {
  var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
  $.getScript(cityUrl, function(script, textStatus, jqXHR) {
    var citytq = remote_ip_info.city ;// 获取城市
    var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
    $.ajax({
      url : url,
      dataType : "script",
      scriptCharset : "gbk",
      success : function(data) {
        var _w = window.SWther.w[citytq][0];

        if(_w.s1.indexOf("雨") != -1 || _w.s2.indexOf("雨") != -1)
          $("i").removeClass().addClass("wi wi-rain");
        else if(_w.s1.indexOf("云") != -1 || _w.s2.indexOf("云") != -1)
          $("i").removeClass().addClass("wi wi-cloud");
        else
          $("i").removeClass().addClass("wi wi-day-sunny");
        
        $(".temperature_min").text(_w.t2+"℃");
        $(".temperature_max").text(_w.t1+"℃");
        
      },
      error : function() {
        $("i").removeClass().addClass("wi wi-na");
        $(".temperature_min").text("14℃");
      }
    });
  });
}

findWeather();

$(function(){
    t = setInterval("findWeather();", 10800000); 
})