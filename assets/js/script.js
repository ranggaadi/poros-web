$(window).scroll(function () {
  if ($(window).scrollTop() > 10) {
    $('#navbar').addClass('box-shadow-1');
  } else {
    $('#navbar').removeClass('box-shadow-1');
  }
});