//puts each letter in the string into a span div, appends them all into a div
function spanify(string, div) {
  string.split('').forEach(function(letter) {
    var letterDiv = $('<span>').text(letter)
    letterDiv.addClass(letter.toLowerCase());
    div.append(letterDiv);

  })
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


$(function() {
  console.log('I am in here.');

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
  spanify('LinkedIn', $('#LinkedIn'));
  spanify('Email', $('#email'))
  spanify('Daniel Goldman 2016', $('#c'))

  var letterClass


  function spin(letterClass) {
    $('.' + letterClass).removeClass('back-rotate')
    $('.' + letterClass).addClass('rotate');
    $('.' + letterClass).css('color', 'rgb(215, 0, 26)')
  }

  function unspin(letterClass) {
    $('.' + letterClass).addClass('back-rotate')
    $('.' + letterClass).removeClass('rotate')
    $('.' + letterClass).css('color', 'black')
  }

  function special(letterClass, cb) {
    switch (letterClass) {
      case '_':
        cb('c')
        // ;cb('o');cb('p');cb('y');cb('r');cb('i');cb('g');cb('h');cb('t');
        break;
      case '2':
        cb('t');cb('w');cb('o');
        break
      case '0':
        cb('o')
        break
      case '1':
        cb('o');cb('n');cb('e')
        break
      case '6':
      cb('s');cb('i');cb('x')
        break
      default:
    }

  }


  $('span').hover(
    //on hover
    function(e) {
      //check for spaces
      if (!$(e.target).attr('class')) {
        return 'stop'
      }
      var letterClass = $(e.target).attr('class')[0];
      spin(letterClass)
      //special cases:
      special(letterClass, spin)
    },
    //off hover
    function(e) {
      if (!$(e.target).attr('class')) {
        return 'stop'
      }
      var letterClass = $(e.target).attr('class')[0];
      unspin(letterClass)
      special(letterClass, unspin)
    }
  )


})
