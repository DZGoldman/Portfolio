//puts each letter in the string into a span div, appends them all into a div
var $subCats;

const bio = "This is my bio todo"
var Descriptions = {
  trump:
    "Donald Trump / Mussolini twitter bot. Stores data from Trump's twitter feed and Mussolini's autobiography and uses a Markov chain algorithm to generate tweets in their combined literary style. #‎RendereTwitterDiNuovoGrande‬ (Ruby on Rails, postgreSQL)",

  githubdata:
    "Github Data: internal tool for for scraping and analyzing data of Github users. Includes features for uploading and exporting CSV files.Built as independent contract work for Liquid Talent. (Node-Express, PostgreSQl)",

  droptone:
    "drop-tone: User-interactive Newtonian piano playing app. If you can come up with a better single sentence description, email me. (MatterJS, Node.js, Express, MongoDB)",

  resume:
    "Resu-me: Job resume analysis and optimization tool that lets users compare their resumes to successful resumes of their desired job title. Created as part of a team with developers AK Williams and Kerstein Perez. (D3, CasperJS, Node.js, Express, MongoDB)",

  cubonic:
    "Cubonic: Original logic puzzle app with full CRUD functionality. As of writing this, two people (barring myself) have managed to solve all 10 levels. (Ruby on Rails, JQuery animations, postreSQL)",

  freq:
    "Typography experiment in live text analysis. Provides real time feedback of character frequency and sentence tone. (Angular, Node-Express, Alchemy API)",

  gameoflife:
    "Interactve environoment for running Conway's Game of Life. (JavaScript, HTML/CSS, and jQuery-UI)",

  fireworks: "Fireworks show simulation (MatterJS)",

  sudoku:
    "Sudoku playing environment, complete with general solving algorithm. My first web app, so go easy. Technologies: JavaScript/Jquery, HTML/CSS. At no point in building this did I actually solve a Sudoku puzzle.",
  c: "?",
  cryptocanvas:
    "Coming Soon! Distributed pixel art dAPP on Ethereum (React, truffle-suite, Ethereum)",
  tetherprinter:
    "Twitter bot tracking activity of the Tether stablecoin on the omni-layer on the Bitcoin blockchain",
  verge1:
    "Technical overview of the mining exploit on the Verge currency in April of 2018; number 1 article on medium the week of publication.",
  verge2:
    "Follow up piece explaining the second hack on Verge; wonkier and angier than the first one.",
  upgoer:
    "'Upgoer 5 challenge' piece: explanation of a complex topic using only the 1000 most common English words.",
  dnc:
    "Account of three days loitering at the 2016 Democratic National Convention",
  wwta: "My stab at explaining what Blockchain technology is and isn't.",
  lightning:
    "Explanations of technical developments in Bitcoin's layer two scaling solution (featured in Messari newsletter)",
  newmath: "Published in Make Magazine",
  captives: "Published in Words Without Borders",
  awsy:
    "Tracking data on the stablecoins currently on the market (Flask, React)",
  talkcoin:
    'Slack bot for tracking cryptocurrency prices; add to slack and message "\\talkcoin" for instructions (Python)',
  coindesk: "Interviewed for piece on mining exploits",
  cryptoconomy: "Wide ranging discussion on all things crypto",
  italian: "Italian translation of Verge hack piece",
  reconsiderations: "Wacky short story collection I wrote in college",
  nouriel: "Response to Nouriel Roubini's testinomy in front of the US Senate Committee on Cryptocurency",
  btcenergy: "Explnataion of the relationship between Bitcoin mining and energy consumption",
  tether: "Commentary on Tether and Bitfinex",
  hottakes: "Twitter bot for generating hot takes (and only hot takes) about the crypto space",
  soundmoney: "Bitcoin paper wallet generator using audio entropy (react-mic, bitcoin-js)",
  cryptoterms: "On the confusing state of the terms we're currently stuck with the crypto space",
  plasma: "Three part series for The Block on Plasma technology.",
  awdy: "Data aggregation for top cryptocurrencies; initally created owned by Dogecoin creator Jackson Palmer (now owned and revamped by me)",
  ethereum: "'Understanding Plasma' piece top link for Plasma resources on ethereum.org",
  "ln-junkies": "Discussion on layer 2 constructions, Bitcoin & Ethereum tribalism, social dynamics of protocol changes, and more",
  ethcritique: "A handy guide for Bitoiners (featured in Bankless Newsletter)",
  rollup: "Overview of Optimistic Rollup tech, commissioned by MolochDao",
  defirollup: "Thoughts on scaling the DeFi ecosystem, written for the Bankless newsletter",
  "keyword-crypto": "Wide ranging dicussion on Keyword: Crypto podcast",
  guilaga: "Press shift + s to start (sound on)",
  bio: bio,
  "bio-line": bio
};

var badPuncuation = {};

":/,.()".split("").forEach(function(s) {
  badPuncuation[s] = true;
});

var $info;
$(function() {
  $info = $("#info");
  console.info("%cLinks aren't all you can click.", "color: green;");

  console.info(
    "%cThis page has unnecessarily elaborate Easter Eggs.",
    "color: blue;"
  );

  $("._").toggle();
  $(".spanify-this,.project,.heading,#c,#bio-line,.link").each(function() {
    spanify($(this));
  });

  var currentHeadingId = "";

  var headingClick = function(e) {
    const $heading = $(this);
    const id = $heading.attr("id");

    if (currentHeadingId == id) {
      return;
    } else {
      currentHeadingId = id;
    }

    $heading.css("font-weight", 900);
    $(".sub-cat")
      .find("span")
      .css("opacity", 0);
    const sub = $subCats.eq($heading.attr("i"));
    $subCats.detach();
    $("#sub-cats").prepend(sub);

    var headings = $(".heading");
    headings.each(function() {
      var heading = $(this);
      if (heading.attr("id") == id) {
        return;
      }

      heading.css("font-weight", 100);
    });

    shimmerOn(sub);
  };



    // $("#bio, #bio-line").hover(()=>{
    //   console.log('??');
      
    // });

  //    $(".project").mouseleave(function() {
  //   $info.empty();
  //   // $info.hide();
  // });


  $(".heading").click(
    //on hover
    headingClick
  );

  var projectHover = function() {
    var $project = $(this);
    if ($info.text() == "") {
      $info.show();
      var id = $project.attr("id");

      spanify($info, Descriptions[$project.attr("id")]);
      shimmerOn($info);
    }
  };
  $(".project,#bio,#bio-line").hover(projectHover);

  var onHover = function(e) {
    if (isMobile()) return;
    //check for spaces
    if (!$(e.target).attr("class")) {
      return "stop";
    }

    var letterClass = $(e.target).attr("class")[0];
    spin(letterClass);
    $("title").text(letterClass.toUpperCase());
    //special cases:
    special(letterClass, spin);
  };

  var offHover = function(e) {
    if (isMobile()) return;

    if (!$(e.target).attr("class")) {
      return "stop";
    }
    var letterClass = $(e.target).attr("class")[0];
    unspin(letterClass);
    special(letterClass, unspin);
    $("title").text("DZG");
  };

  $("span").hover(
    //on hover
    onHover,
    //off hover
    offHover
  );

  $(".project,#bio,#bio-line").mouseleave(function() {
    $info.empty();
    // $info.hide();
  });

  $("body").fadeIn(500);
  //...
  jQuery.fn.reverse = [].reverse;
  $("#c").click(function() {
    var audio = new Audio("audio/feelgood.mp3");
    $("#tab-icon").attr("href", "images/gor.png");

    audio.play();
    window.setTimeout(function() {
      location.reload();
    }, 13500);
    var size = $("span").length;

    $("span").each(function(i, c) {
      var color = getRandomColor();
      $("body").animate(
        {
          backgroundColor: "black"
        },
        5500
      );
      $(c).animate(
        {
          color: color,
          width: 30,
          height: 20
        },
        5500,
        function() {
          window.setTimeout(function() {
            $("body").addClass("body-rotate");

            fly($(c));
          }, Math.random() * 3000 + 1300);
        }
      );
    });
  });
  $("#other-head")
    .children()
    .on("mouseup", function(e) {
      e.preventDefault();
      var $t = $(e.target);
      caseAnimation($t, true);
      caseAnimation($t);
      window.getSelection && window.getSelection().collapse($t[0]);
    });
  $("#writing-head")
    .children()
    .draggable();
  $("#links-head").click(function() {
    if ($(this).hasClass("hrotate")) {
      $(this).removeClass("hrotate");
      $(this).addClass("bhrotate");
    } else {
      $(this).removeClass("bhrotate");
      $(this).addClass("hrotate");
    }
  });

  var writeText;
  var midRun = false;
  $("#projects-head").click(function() {
    if (midRun) return;
    var $children = $(this).children();
    var contentText = $children.text();
    var originalcontentText = contentText;
    var count = 0;
    var intId = window.setInterval(function() {
      midRun = true;
      contentText = contentText.slice(1) + contentText[0];
      var $el;
      $children.each(function(i, el) {
        $el = $(el);
        $el.text(contentText[i]);
      });
      if (originalcontentText == contentText) {
        count++;
        if (count == 4) {
          window.clearInterval(intId);
          midRun = false;
        }
      }
    }, 40);
  });
  var midXRun = false;
  $("#other-writing-head").click(function() {
    if (midXRun) return;
    midXRun = true;
    var $children = $(this).children();
    var contentText = $children.text();
    var originalcontentText = contentText;
    var end = originalcontentText.length - 1;
    var start = 0;
    var intId = window.setInterval(function() {
      if (start < end) {
        $children.eq(start).text("x");
        $children.eq(end).text("x");
      } else {
        $children.eq(start).text(originalcontentText[start]);
        $children.eq(end).text(originalcontentText[end]);
      }
      start++;
      end--;
      if (end < 0 || start > originalcontentText.length - 1) {
        window.clearInterval(intId);
        midXRun = false;
      }
    }, 70);
  });

  $("#press-head").click(function() {
    $(this).animate(
      {
        opacity: 0
      },
      300,
      function() {
        $(this).animate({
          opacity: 1
        });
      }
    );
  });

  $("#bio, #bio-line").click(function(e) {
    e.preventDefault();
    var $t = $(e.target);
    $(this)
      .children()
      .each(function(i, node) {
        $(node).css("color", getRandomColor());
      });

    window.getSelection && window.getSelection().collapse($t[0]);
  });

  $(".corner").click(function(e) {
    var id = $(e.target).attr("id");
    if (id == "corner-4") {
      $("#corner-3").fadeIn(blinkFade);
    } else if (id == "corner-3") {
      $("#corner-2").fadeIn(blinkFade);
    } else if (id == "corner-2") {
      $("#corner-1").fadeIn(blinkFade);
    } else if (id == "corner-1") {
      $("#corner-3 #corner-1 #corner-2").fadeOut();
      // $('#corner-1').css('background-color', 'red')
      $("#corner-1").css({
        width: 10,
        height: 10,
        "border-radius": 5,
        "background-color": "red"
      });
      morseCodify();
    }
  });
  try {
    var localStorage = window.localStorage;
  } catch {
    localStorage = null
  }
  if (localStorage) {
    if (!localStorage["clickCount"]) {
      localStorage["clickCount"] = 5;
    }
    $("#counter").text(localStorage["clickCount"]);

    var clicked = false;
    $("#counter").click(function() {
      if (clicked) return;
      clicked = true;
      localStorage["clickCount"]--;
      $("#counter").text(localStorage["clickCount"]);
      if (localStorage["clickCount"] == 0) {
        $("#counter").fadeOut(2000, function() {
          localStorage["clickCount"] = 5;
          $("#counter").text(localStorage["clickCount"]);
          $("#counter").fadeIn();
        });
        melt();
      }
    });
  }
  // empty sub cats div, keeping events
  $subCats = $(".sub-cat").detach();
}); //end on load

function spin(letterClass) {
  $("." + letterClass).removeClass("back-rotate");
  $("." + letterClass).addClass("rotate");
  $("." + letterClass).css("color", "rgb(215, 0, 26)");
}

function unspin(letterClass) {
  $("." + letterClass).addClass("back-rotate");
  $("." + letterClass).removeClass("rotate");
  $("." + letterClass).css("color", "black");
}

function special(letterClass, cb) {
  switch (letterClass) {
    case "2":
      cb("t");
      cb("w");
      cb("o");
      break;
    case "0":
      cb("o");
      break;
    case "1":
      cb("o");
      cb("n");
      cb("e");
      break;
    case "6":
      cb("s");
      cb("i");
      cb("x");
      break;
    case "5":
      cb("f");
      cb("i");
      cb("v");
      cb("e");
      break;
    default:
  }
}

function spanify(div, string) {
  if (!string) {
    string = div.text();
    div.text("");
  }
  string.split("").forEach(function(letter) {
    var letterSpan;
    if (window.morse) {
      letterSpan = $("<span>").text(morseD[letter]);
    } else {
      letterSpan = $("<span>").text(letter);
    }
    letterSpan.attr("original", letter);
    letterSpan.attr("isLetter", true);
    if (badPuncuation[letter]) {
      letterSpan.addClass("q");
    } else {
      letterSpan.addClass(letter.toLowerCase());
    }
    div.append(letterSpan);
  });
}

var shimmerOn = function(el) {
  // your pale blue ees
  el.find("span").each(function(index, cell) {
    window.setTimeout(function() {
      $cell = $(cell);
      $cell.css("opacity", 0.8);
      // $cell.fadeTo(200, 0.8)
    }, Math.random() * 500);
  });
};

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function switchCase($node) {
  var original = $node.text();
  var upper = $node.text().toUpperCase();
  var lower = $node.text().toLowerCase();
  if (original == upper) {
    $node.text(lower);
  } else if (original == lower) {
    $node.text(upper);
  }
}

function caseAnimation($node, forward) {
  if ($node.length) {
    switchCase($node);
    window.setTimeout(function() {
      switchCase($node);
    }, 160);
    window.setTimeout(function() {
      if (forward) {
        caseAnimation($node.next(), forward);
      } else {
        caseAnimation($node.prev(), forward);
      }
    }, 80);
  }
}

function isMobile() {
  return $(window).width() < 500 && $(window).height() < 800;
}
function fly($span) {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      $span.addClass("scatterx");
      break;
    case 1:
      $span.addClass("scattery");
      break;
    case 2:
      $span.addClass("scattermx");
      break;
    case 3:
      $span.addClass("scattermy");
      break;
    case 4:
      $span.addClass("scattermy");
      $span.addClass("scatterx");
      break;
    case 5:
      $span.addClass("scattermx");
      $span.addClass("scattery");
      break;
    case 6:
      $span.addClass("scattery");
      $span.addClass("scatterx");
      break;
    case 7:
      $span.addClass("scattermy");
      $span.addClass("scattermx");
      break;
    default:
  }
}

var morse = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  "-..-.": "/",
  ".--.-.": "@"
};

var val;
var morseD = {};
for (key in morse) {
  val = morse[key];
  morseD[val] = key;
}
function morseConvert(l) {
  return morseD[l] || l;
}

window.morse = false;

function morseCodify() {
  var $spans = $("span");
  window.morse = !window.morse;
  function morseCodeOne(index) {
    var $currentSpan = $spans.eq(index);
    if (!$currentSpan.length) return;
    if (window.morse) {
      $currentSpan.text(morseConvert($currentSpan.text().toLowerCase()));
    } else {
      $currentSpan.text($currentSpan.attr("original"));
    }
    window.setTimeout(function() {
      morseCodeOne(index + 1);
    }, 15);
  }
  morseCodeOne(0);
}

function blinkFade() {
  $(this).fadeOut("fast", function() {
    $(this).fadeIn("fast", blinkFade);
  });
}
var letters = "wertyuiopasdfghjklqzxcvbnm2016a";
function melt() {
  let lettersArray = letters.split("");
  shuffle(lettersArray);
  $("span").animate(
    {
      "font-size": 0,
      "line-height": 0
    },
    2000
  );
  window.setTimeout(function() {
    meltOne();
  }, 2000);
  function meltOne() {
    if (!lettersArray.length) {
      window.setTimeout(function() {
        $("span").animate(
          {
            "font-size": 16,
            "line-height": 23
          },
          1000
        );
      }, 500);
      return;
    }
    var letter = lettersArray.pop();
    $("." + letter).animate(
      {
        "font-size": 16,
        "line-height": 23
      },
      1000 * Math.random() + 1000
    );
    window.setTimeout(function() {
      meltOne();
    }, 150);
  }
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}
