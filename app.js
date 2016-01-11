

//puts each letter in the string into a span div, appends them all into a div
function spanify(string, div) {
  string.split('').forEach(function (letter) {
    var letterDiv = $('<span>').text(letter)
      letterDiv.addClass(letter.toLowerCase());
      div.append(letterDiv);
  })
}



$(function () {
console.log('yo');

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


})
