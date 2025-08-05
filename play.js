$(function () {
  console.log("Document is ready");

  // Track spaceship position
  let spaceshipX = 0;
  let spaceshipY = 0;

  // Get screen boundaries
  const getScreenBounds = () => {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const spaceshipWidth = $("#space-ship").width() || 100;
    const spaceshipHeight = $("#space-ship").height() || 100;
    const spaceshipOffset = $("#space-ship").offset();
    const spaceshipInitialY = spaceshipOffset
      ? spaceshipOffset.top
      : windowHeight - 200;

    return {
      minX: -windowWidth / 2 + spaceshipWidth / 2,
      maxX: windowWidth / 2 - spaceshipWidth / 2,
      minY: -spaceshipInitialY + spaceshipHeight / 2,
      maxY: windowHeight - spaceshipInitialY - spaceshipHeight / 2,
    };
  };
  const SHIFT = 25;
  const ship = $("#space-ship");
  // ship.show()
  let bulletId = 0;
  let lastShotTime = 0;
  const SHOT_COOLDOWN = 250; // 0.5 seconds in milliseconds

  const shootBullet = () => {
    const currentTime = Date.now();

    // Check if enough time has passed since last shot
    if (currentTime - lastShotTime < SHOT_COOLDOWN) {
      return; // Exit early if cooldown hasn't finished
    }

    lastShotTime = currentTime;

    const shipOffset = ship.offset();
    var audio = new Audio("audio/laser.mov");
    audio.play();

    // Calculate bullet position based on ship's current visual position
    const bulletX = (shipOffset ? shipOffset.left : 0) + ship.width() / 2;
    const bulletY = shipOffset ? shipOffset.top : 0;

    const bullet =
      $(`<img class="bullet" id="bullet-${bulletId++}" src="images/bullet.png" style="
            position: absolute;
            left: ${bulletX}px;
            top: ${bulletY}px;
            width: 10px;
            height: 20px;
            z-index: 1000;
        ">`);

    $("body").append(bullet);

    // Animate bullet moving up with collision detection
    let bulletSpeed = 2; // Starting speed
    const bulletAnimation = setInterval(() => {
      const currentTop = parseInt(bullet.css("top"));
      bulletSpeed += 2; // Acceleration - increase speed each frame
      const newTop = currentTop - bulletSpeed;

      // Check for collision with .letter class spans
      const bulletRect = bullet[0].getBoundingClientRect();
      let hit = false;

      $('span[isLetter="true"]').each(function () {
        const letterRect = this.getBoundingClientRect();

        // Check if bullet overlaps with letter
        if (
          bulletRect.left < letterRect.right &&
          bulletRect.right > letterRect.left &&
          bulletRect.top < letterRect.bottom &&
          bulletRect.bottom > letterRect.top
        ) {
          var audio = new Audio("audio/hit.mov");
          audio.play();
          $(this).remove();
          bullet.remove();
          clearInterval(bulletAnimation);
          hit = true;
          return false; // Break out of .each()
        }
      });

      if (!hit) {
        if (newTop < -50) {
          bullet.remove();
          clearInterval(bulletAnimation);
        } else {
          bullet.css("top", newTop + "px");
        }
      }
    }, 50);
  };

  const launchRandomLetter = () => {
    // Get all span elements with isLetter="true" attribute
    const allSpans = $('span[isLetter="true"]');
    if (allSpans.length === 0) return;

    // Pick a random span
    const randomIndex = Math.floor(Math.random() * allSpans.length);
    const randomSpan = allSpans.eq(randomIndex);

    // Store original position and styling
    const originalPosition = randomSpan.position();
    const originalParent = randomSpan.parent();

    // Clone the span and make it absolutely positioned
    const flyingSpan = randomSpan.clone();
    flyingSpan.css({
      position: "absolute",
      left: randomSpan.offset().left + "px",
      top: randomSpan.offset().top + "px",
      zIndex: 999,
    });

    var audio = new Audio("audio/arc.mov");
    audio.play();

    // Remove original and add flying version
    randomSpan.css("visibility", "hidden");
    $("body").append(flyingSpan);
    flyingSpan.animate(
      {
        "font-size": "50px",
      },
      1000
    );

    const colors = ["#00FF00", "#00FFDE", "#FFFF00", "#FF0000", "#0068DE"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    console.log("randomColor", randomColor);

    flyingSpan.css("color", randomColor);

    // Generate random arc trajectory
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const startX = parseInt(flyingSpan.css("left"));
    const startY = parseInt(flyingSpan.css("top"));

    // Get ship's current position
    const shipOffset = ship.offset();
    const shipX = (shipOffset ? shipOffset.left : 0) + ship.width() / 2;

    // Random end position within 1/3 window width of the ship
    const quarterWindow = windowWidth / 3;
    const endX = shipX + (Math.random() - 0.5) * 2 * quarterWindow; // +/- 1/4 window from ship
    const endY = windowHeight + 100; // Below screen

    // Arc height (peak of the arc)
    const arcHeight = Math.random() * 300 + 200;
    const midX = (startX + endX) / 2;
    const midY = Math.min(startY, endY) - arcHeight;

    // Animate along the arc
    let progress = 0;
    const arcAnimation = setInterval(() => {
      progress += 0.02;

      if (progress >= 1) {
        flyingSpan.remove();
        randomSpan.remove(); // Remove the original hidden span
        clearInterval(arcAnimation);
        return;
      }

      // Quadratic bezier curve calculation
      const currentX =
        Math.pow(1 - progress, 2) * startX +
        2 * (1 - progress) * progress * midX +
        Math.pow(progress, 2) * endX;

      const currentY =
        Math.pow(1 - progress, 2) * startY +
        2 * (1 - progress) * progress * midY +
        Math.pow(progress, 2) * endY;

      flyingSpan.css({
        left: currentX + "px",
        top: currentY + "px",
        transform: `rotate(${progress * 360}deg)`, // Add spinning
      });

      // Check for collision with spaceship
      const letterRect = flyingSpan[0].getBoundingClientRect();
      const shipRect = ship[0].getBoundingClientRect();

      if (
        letterRect.left < shipRect.right &&
        letterRect.right > shipRect.left &&
        letterRect.top < shipRect.bottom &&
        letterRect.bottom > shipRect.top
      ) {
        console.log("collide");
        var audio = new Audio("audio/dead.wav");

        audio.play();

        flyingSpan.remove();
        randomSpan.remove();
        clearInterval(arcAnimation);
      }
    }, 50); // ~60fps
  };

  const startGame = () => {
    // Empty function for now
    var audio = new Audio("audio/game_intro.mp3");
    audio.play();

    $("#c").animate({ opacity: 0 }, 500, function () {
      // Animation complete
      $(this).empty();
      $(this).remove();
    });
    ship.fadeIn(7000);

    $("body").animate(
      {
        backgroundColor: "black",
      },
      3000,
      function (params) {}
    );

    $('span[isLetter="true"]').css("color", "white");
    
    // Start heading drifting animation
    startHeadingDrift();
  };
  
  const startHeadingDrift = () => {
    $('li.heading').each(function(index, el) {
      const $heading = $(el);
      console.log('text', $heading.text());
      
      const driftDistance = $(window).width()/2 + (Math.random() * 40); // 300-340 pixels drift
      const driftDuration = 10000 + (Math.random() * 3000); // 10-13 seconds
      const delay = index * 500; // Stagger by 200ms
      
      // Start the drifting animation after a delay
      setTimeout(() => {
        const driftLoop = () => {
          // Drift right
          $heading.animate({
            left: '+=' + driftDistance + 'px'
          }, driftDuration, 'swing', () => {
            // Drift left
            $heading.animate({
              left: '-=' + driftDistance + 'px'
            }, driftDuration, 'swing', driftLoop);
          });
        };
        
        // Start the drift loop
        driftLoop();
      }, delay);
    });
  };

  $(document).keydown(function (e) {
    switch (e.which) {
      case 32: // spacebar
        shootBullet();
        break;
    }
  });

  $(document).keydown(function (e) {
    const bounds = getScreenBounds();

    switch (e.which) {
      // case 32: // spacebar
      //     shootBullet();
      //     break;
      case 80: // p key
        launchRandomLetter();
        break;
      case 83: // s key
        if (e.shiftKey) {
          startGame();
        }
        break;
      case 37: // left arrow
        spaceshipX = Math.max(bounds.minX, spaceshipX - SHIFT);
        ship.css("transform", `translate(${spaceshipX}px, ${spaceshipY}px)`);
        break;
      case 38: // up arrow
        spaceshipY = Math.max(bounds.minY, spaceshipY - SHIFT);
        ship.css("transform", `translate(${spaceshipX}px, ${spaceshipY}px)`);
        break;
      case 39: // right arrow
        spaceshipX = Math.min(bounds.maxX, spaceshipX + SHIFT);
        ship.css("transform", `translate(${spaceshipX}px, ${spaceshipY}px)`);
        break;
      case 40: // down arrow
        spaceshipY = Math.min(bounds.maxY, spaceshipY + SHIFT);
        ship.css("transform", `translate(${spaceshipX}px, ${spaceshipY}px)`);
        break;
      default:
        return;
    }
    e.preventDefault();
  });
});
