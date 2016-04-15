//puts each letter in the string into a span div, appends them all into a div

var Descriptions = {
  githubdata:'Github Data: app for for scraping and analyzing data of Github users. Includes features for uploading and exporting CSV files. Primary Technologies: Node-Express, PostgreSQl. Built as independent contract work for Liquid Talent',
  droptone: 'drop-tone: User-interactive Newtonian piano playing app. If you can come up with a better single sentence description, email me. Final project for the Web Development Immersive course at General Assembly. Primary Technologies: MatterJS, Node.js, Express, and MongoDB.',

  resume: "Resu-me: Job resume analysis and optimization tool that lets users compare their resumes to successful resumes of their desired job title. Created as part of a team with developers AK Williams and Kerstein Perez. Primary Technologies: D3, CasperJS, Node.js, Express, MongoDB, and Bootstrap.",

  cubonic: "Cubonic: Original logic puzzle app with full CRUD functionality. Primary Technologies: Ruby on Rails (with extensive use of the JS assets and CSS animations), and PostreSQL. As of writing this, only one person (barring myself) has managed to solve all 10 levels.",

  gameoflife: "Interactve environoment for running Conway's Game of Life. Technologies: JavaScript, HTML/CSS, and jQuery-ui.",

  fireworks: "Fireworks show simulation, built with MatterJS.",

  sudoku: "Sudoku playing environment, complete with general solving algorithm. My first web app, so go easy. Technologies: JavaScript/Jquery, HTML/CSS. At no point in building this did I actually solve a Sudoku puzzle.",
  c: '?'
}

function spanify(string, div) {
  string.split('').forEach(function(letter) {
    var letterDiv = $('<span>').text(letter)
    if (letter==':') {
      letterDiv.addClass('q');
    }else{
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


$(function() {
  $info = $('#info')
  console.log("If you can't click it, you can drag it.");

  console.log('This page has  an unnecessarily elaborate Easter Egg.');

  $('._').toggle()
  spanify('Daniel Goldman', $('#bio'));
  $('#bio').append('<br>');
  spanify('Full Stack Developer', $('#bio'));

  spanify('Projects:', $('#projects-head'));
  spanify('Github Data', $('#githubdata'));
  spanify('drop-tone', $('#droptone'));
  spanify('Resu-me', $('#resume'));
  spanify('Cubonic', $('#cubonic'));
  spanify('Sudoku', $('#sudoku'))
  spanify('Fireworks', $('#fireworks'))
  spanify('Game of Life', $('#gameoflife'))

  spanify('Links:', $('#links-head'));
  spanify('Resume', $('#myresume'));
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
      var $project = $(this).parent()
      if ( $project.attr('class')=='project' && $info.text()=="" ){
            $info.show()
            spanify( Descriptions[$project.attr('id')] , $info)
            $info.children().each(function (index, cell) {
              window.setTimeout(function () {
                $cell = $(cell)
                $cell.css('opacity', 0.8)
                // $cell.fadeTo(200, 0.8)
              }, Math.random()*500)
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
    },
    //off hover
    function(e) {
      if (!$(e.target).attr('class')) {
        return 'stop'
      }
      var letterClass = $(e.target).attr('class')[0];
      unspin(letterClass)
      special(letterClass, unspin)
        $('title').text('DZG')
    }

  )
  $('.project').mouseleave(function () {
    $info.empty()
    $info.hide()

  })

$('body').fadeIn(500)
//...
  jQuery.fn.reverse = [].reverse;
  $('#c').click(function () {
    var audio = new Audio('http://dj.newmp3mad.com/data48/30300/Feel_Good_Inc-Gorillaz%5Bwww.Mp3MaD.Com%5D.mp3');
    audio.play();
    window.setTimeout(function () {
      location.reload()
    },13500)
    var size = $('span').length

    $('span').each(function(i, c){
      var color = getRandomColor()
      $('body').animate({
        backgroundColor:'black'
      }, 6000);
      $(c).animate({
            color: color,
            width:30,
            height: 20,
          },6000,function () {
                window.setTimeout(function(){

                  $('body').addClass('body-rotate')

                  fly($(c))
                },Math.random()*3000+1300)
          } );
    })
  })
  $('#bio').children().draggable()
  $('#projects-head').children().draggable()
  $('#links-head').children().draggable()
}) //end on load


function fly($span) {

    switch (Math.floor(Math.random()*4)) {
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
