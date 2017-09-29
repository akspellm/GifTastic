d3.selectAll(".day-high .temp")
  .data([45, 78, 88, 77, 66])
  .html(function(d, i) {
    if(i == 0){
      return '<strong class="text-muted style="font-size: 2rem>' + d + '</strong>'
    } else {
    return '<strong>' + d + '</strong>';
  }
  })
  