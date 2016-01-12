

//puts each letter in the string into a span div, appends them all into a div
function spanify(string, div) {
  string.split('').forEach(function (letter) {
    var letterDiv = $('<span>').text(letter)
      letterDiv.addClass(letter.toLowerCase());
      div.append(letterDiv);
  })
}



$(function () {

spanify('Daniel Goldman', $('#bio'));
$('#bio').append('<br>');
spanify('Full Stack Developer', $('#bio'));

spanify('Projects', $('#projects-head'))
spanify('drop-tone', $('#drop-tone'));
spanify('Resu-me', $('#resu-me'));
spanify('Cubonic', $('#cubonic'));
spanify('Sudoku', $('#sudoku'))
spanify('Fireworks', $('#fireworks'))

spanify('Links', $('#links-head'))
spanify('Github', $('#Github'));
spanify('LinkedIn', $('#LinkedIn'))

var letterClass
$('span').hover(
  function (e) {

    var letterClass= $(e.target).attr('class')[0]
    $('.'+letterClass).removeClass('back-rotate')
    $('.'+letterClass).addClass('color');
    $('.'+letterClass).addClass('rotate');

    console.log(e.target);
  },function (e) {
    var letterClass= $(e.target).attr('class')[0]

    $('.'+letterClass).addClass('back-rotate')


    $('.'+letterClass).removeClass('color')
    $('.'+letterClass).removeClass('rotate')
    console.log(e.target);
  }
)


})
