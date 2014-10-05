var start_delay = 2000;
var fast_update = 10000;
var slow_update = 30000;
var live_time_clear = null;
$(document).ready(function(){
  delay_update(start_delay);
  live_time_clear = setInterval(live_times, 250);
  live_times()
});

function delay_update(timeout){
    setTimeout(update, timeout);
}

function update(){
  var el = $('[load-from]');
  if (document.URL.indexOf('?') != -1){
    return;
  }
  el.load(el.attr('load-from'), function(response, status, xhr){
    var code = xhr.status;
    if (code == 200) {
      delay_update(fast_update);
    }
    else if (code == 201){
      delay_update(slow_update);
    }
  });
}

function live_times(){
  var live_times = $('.live-time');
  if (live_times.length == 0){
    clearInterval(live_time_clear);
    return;
  }
  $('.live-time').each(function(){
    var start = new Date(Date.parse($(this).attr('data-start')));
    var now = new Date();
    var diff = Math.round((now - start.getTime())/1000);
    $(this).text(diff + 's')
  })
}
