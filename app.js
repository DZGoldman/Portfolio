//puts each letter in the string into a span div, appends them all into a div

var Descriptions = {
  trump: "Donald Trump / Mussolini twitter bot. Stores data from Trump's twitter feed and Mussolini's autobiography and uses a Markov chain algorithm to generate tweets in their combined literary style. Built with Ruby on Rails, posgreSQL, and the twitter API. #‎RendereTwitterDiNuovoGrande‬",

  githubdata: 'Github Data: app for for scraping and analyzing data of Github users. Includes features for uploading and exporting CSV files. Primary Technologies: Node-Express, PostgreSQl. Built as independent contract work for Liquid Talent',

  droptone: 'drop-tone: User-interactive Newtonian piano playing app. If you can come up with a better single sentence description, email me. Final project for the Web Development Immersive course at General Assembly. Primary Technologies: MatterJS, Node.js, Express, and MongoDB.',

  resume: "Resu-me: Job resume analysis and optimization tool that lets users compare their resumes to successful resumes of their desired job title. Created as part of a team with developers AK Williams and Kerstein Perez. Primary Technologies: D3, CasperJS, Node.js, Express, MongoDB, and Bootstrap.",

  cubonic: "Cubonic: Original logic puzzle app with full CRUD functionality. Primary Technologies: Ruby on Rails (with extensive use of the JS assets and CSS animations), and PostreSQL. As of writing this, only one person (barring myself) has managed to solve all 10 levels.",

  freq: "Typography experiment in live text analysis. Provides real time feedback of character frequency and sentence tone. Built with Angular-Node-Express, and uses the Alchemy API for sentiment analysis." ,

  gameoflife: "Interactve environoment for running Conway's Game of Life. Technologies: JavaScript, HTML/CSS, and jQuery-ui.",

  fireworks: "Fireworks show simulation, built with MatterJS.",

  sudoku: "Sudoku playing environment, complete with general solving algorithm. My first web app, so go easy. Technologies: JavaScript/Jquery, HTML/CSS. At no point in building this did I actually solve a Sudoku puzzle.",
  c: '?'
}

function spanify(string, div) {
  string.split('').forEach(function(letter) {
    var letterDiv = $('<span>').text(letter)
    if (letter == ':') {
      letterDiv.addClass('q');
    } else {
      letterDiv.addClass(letter.toLowerCase());
    }
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

function switchCase($node) {
  var original = $node.text()
  var upper = $node.text().toUpperCase();
  var lower = $node.text().toLowerCase();
  if (original== upper) {
    $node.text(lower)
  } else if (original== lower) {
    $node.text(upper)
  }
}

function caseAnimation($node, forward) {
  if($node.length){
    switchCase($node)
    window.setTimeout(function () {
      switchCase($node)
    },160)
    window.setTimeout(function () {
      if (forward) {
        caseAnimation($node.next(), forward)
      } else{
        caseAnimation($node.prev(), forward)
      }
    },80)
  }
}


$(function() {
    $info = $('#info')
    console.info("%cLinks aren't all you can click.", 'color: green;');

    console.info('%cThis page has an unnecessarily elaborate Easter Egg.', 'color: blue;');

    $('._').toggle()
    spanify('Daniel Goldman', $('#bio'));
    $('#bio').append('<br>');
    spanify('Full Stack Developer', $('#bio'));

    spanify('Projects:', $('#projects-head'));
    spanify('Github Data', $('#githubdata'));
    spanify('Donaldo Trumpilini', $('#trump'));
    spanify('drop-tone', $('#droptone'));
    spanify('Resu-me', $('#resume'));
    spanify('Cubonic', $('#cubonic'));
    spanify('other projects:', $('#other-head'));
    spanify('Sudoku', $('#sudoku'))
    spanify('Fireworks', $('#fireworks'))
    spanify('Game of Life', $('#gameoflife'))
    spanify('Freq', $('#freq'));
    spanify('Links:', $('#links-head'));
    spanify('Resume', $('#myresume'));
    spanify('Github', $('#Github'));
    spanify('LinkedIn', $('#LinkedIn'));
    spanify('Email', $('#email'));
      spanify('Writing Portfolio', $('#writing'))
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
        case '2':
          cb('t');
          cb('w');
          cb('o');
          break
        case '0':
          cb('o')
          break
        case '1':
          cb('o');
          cb('n');
          cb('e')
          break
        case '6':
          cb('s');
          cb('i');
          cb('x')
          break
        default:
      }

    }
    var onHover = function(e) {
      var $project = $(this).parent()
      if ($project.attr('class') == 'project' && $info.text() == "") {
        $info.show()
        spanify(Descriptions[$project.attr('id')], $info)
        $info.children().each(function(index, cell) {
          window.setTimeout(function() {
            $cell = $(cell)
            $cell.css('opacity', 0.8)
              // $cell.fadeTo(200, 0.8)
          }, Math.random() * 500)
        })
      }
      //check for spaces
      if (!$(e.target).attr('class')) {
        return 'stop'
      }

      var letterClass = $(e.target).attr('class')[0];
      spin(letterClass)
      $('title').text(letterClass.toUpperCase())
        //special cases:
      special(letterClass, spin)
    }

    var offHover =     function(e) {
          if (!$(e.target).attr('class')) {
            return 'stop'
          }
          var letterClass = $(e.target).attr('class')[0];
          unspin(letterClass)
          special(letterClass, unspin)
          $('title').text('DZG')
        }
    $('span').hover(
      //on hover
      onHover,
      //off hover
      offHover

    )
    $('.project').mouseleave(function() {
      $info.empty()
      $info.hide()

    })

    $('body').fadeIn(500)
      //...
    jQuery.fn.reverse = [].reverse;
    $('#c').click(function() {
      var audio = new Audio('audio/feelgood.mp3');
      $('#tab-icon').attr('href', "images/gor.png")

      audio.play();
      window.setTimeout(function() {
        location.reload()
      }, 13500)
      var size = $('span').length

      $('span').each(function(i, c) {
        var color = getRandomColor()
        $('body').animate({
          backgroundColor: 'black'
        }, 5500);
        $(c).animate({
          color: color,
          width: 30,
          height: 20,
        }, 5500, function() {
          window.setTimeout(function() {

            $('body').addClass('body-rotate')

            fly($(c))
          }, Math.random() * 3000 + 1300)
        });
      })
    })
    $('#other-head').children().on('mouseup',function(e) {
      e.preventDefault()
      var $t = $(e.target);
      caseAnimation($t, true)
      caseAnimation($t)
      window.getSelection && window.getSelection().collapse($t[0])
    })
    $('#projects-head').children().draggable()
    $('#links-head').click(function () {
      if($(this).hasClass('hrotate')){
        $(this).removeClass('hrotate')
        $(this).addClass('bhrotate')
      }else{
        $(this).removeClass('bhrotate')
        $(this).addClass('hrotate')

      }

    })

    $('#bio').click(function (e) {
      e.preventDefault()
      var $t = $(e.target);
        $(this).children().each(function (i , node) {
          $(node).css('color', getRandomColor())
        })

      window.getSelection && window.getSelection().collapse($t[0])
    })

    $('.corner').click(function (e) {
      var id = $(e.target).attr('id')
      if(id=='corner-4'){
        $('#corner-3').fadeIn(blinkFade)
      } else if( id=='corner-3'){
        $('#corner-2').fadeIn(blinkFade)
      } else if (id=='corner-2'){
        $('#corner-1').fadeIn(blinkFade)
      } else if (id=='corner-1'){
        $('#corner-3 #corner-1 #corner-2').fadeOut()
        morseCodify()
      }

    })
  }) //end on load


function fly($span) {

  switch (Math.floor(Math.random() * 4)) {
    case 0:
      $span.addClass('scatterx')
      break;
    case 1:
      $span.addClass('scattery')
      break;
    case 2:
      $span.addClass('scattermx')
      break;
    case 3:
      $span.addClass('scattermy')
      break;
    case 4:
      $span.addClass('scattermy')
      $span.addClass('scatterx')
      break;
    case 5:
      $span.addClass('scattermx')
      $span.addClass('scattery')
      break
    case 6:
      $span.addClass('scattery')
      $span.addClass('scatterx')
      break;
    case 7:
      $span.addClass('scattermy')
      $span.addClass('scattermx')
      break;
    default:
  }
}

var morse = {
    '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e',
    '..-.': 'f', '--.': 'g', '....': 'h', '..': 'i', '.---': 'j',
    '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o',
    '.--.': 'p', '--.-': 'q', '.-.': 'r', '...': 's', '-': 't',
    '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x', '-.--': 'y',
    '--..': 'z', '.----': '1', '..---': '2', '...--': '3',
    '....-': '4', '.....': '5', '-....': '6', '--...': '7',
    '---..': '8', '----.': '9', '-----': '0', '.-.-.-': '.',
    '--..--': ',', '..--..': '?', '-..-.': '/', '.--.-.': '@'
};

var val;
var morseD = {}
for (key in morse){
  val = morse[key]
  morseD[val] = key
}
function morseConvert(l) {
  return morseD[l] || l
}



function morseCodify(){
  var $spans = $('span')
  function morseCodeOne(index){
    var $currentSpan = $spans.eq(index)
    if(!$currentSpan.length) return
    $currentSpan.text(morseConvert($currentSpan.text().toLowerCase()))
    window.setTimeout(function () {
      morseCodeOne(index+1)
    },15)
  }
  morseCodeOne(0)
}

function blinkFade() {
  $(this).fadeOut('fast',function () {
      $(this).fadeIn('fast', blinkFade)
  })
}
