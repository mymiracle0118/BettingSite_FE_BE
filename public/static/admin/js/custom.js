$(document).on("click", ".nav-tabs .nav-item", function () {
  centerItFixedWidth($(this), $(this).parent());
});

function centerItFixedWidth(target, outer) {
  var out = $(outer);
  var tar = $(target);
  var x = out.width();
  var y = tar.outerWidth(true);
  var z = tar.index();
  var q = 0;
  var m = out.find('li');
  //Just need to add up the width of all the elements before our target. 
  for (var i = 0; i < z; i++) {
    q += $(m[i]).outerWidth(true);
  }
  out.animate({
    scrollLeft: (Math.max(0, q - (x - y) / 2))
  }, 300);
}