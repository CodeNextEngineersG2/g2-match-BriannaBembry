// image variables
var imageArray;
var backImage, boltImage, cloudImage, sunImage, moonImage, smileyImage, heartImage;
var transitionImage1, transitionImage2, transitionImage3;

// animation variables
var boltAnimation, cloudAnimation, sunAnimation, moonAnimation, smileyAnimation,
heartAnimation;

// sprite variables
var spriteArray;
var boltSprite1, boltSprite2;
var cloudSprite1, cloudSprite2;
var sunSprite1, sunSprite2;
var moonSprite1, moonSprite2;
var smileySprite1, smileySprite2;
var heartSprite1, heartSprite2;
var spriteWidth, spriteHeight;
var spriteX, spriteY;

// sound variables
var flipSound, matchSound, nopeSound, winSound, loseSound, bgMusic;

// game variables
var firstsprite, secondsprite;
var lives, matches;
var spritesActive;

// UI variables
var gameScreen;
var messageDisplay, livesDisplay;
var resetButton, musicButton;


 function addAnimations(){
  var animations = [boltAnimation, boltAnimation, cloudAnimation, cloudAnimation, heartAnimation, heartAnimation, moonAnimation, moonAnimation, smileyAnimation, smileyAnimation, 
      sunAnimation, sunAnimation]; 
  for(var i = 0; i<spriteArray.length; i++) {
  spriteArray[i].addAnimation("flip", animations[i]);
  spriteArray[i].animation.frameDelay = 10; 
  spriteArray[i].animation.looping = false; 
  spriteArray[i].animation.playing = false; 
  activateSprite(spriteArray[i]); 
  }
 }

/*
 * function loadImages()
 * Called in the preload() function. Loads all images needed for your game
 * with the loadImage() function. When testing on your machine, be sure to
 * setup a local test server or the images will not load! Your coach will show
 * you how to do this.
 * Example:
   function loadImages() {
     myImage = loadImage("assets/img/image.png");
   }
 */

 function loadImages(){
  backImage = loadImage("assets/img/back.png"); 
  transitionImage1 = loadImage("assets/img/transition1.png");
  transitionImage2 = loadImage("assets/img/transition2.png");
  transitionImage3 = loadImage("assets/img/transition3.png");
  boltImage = loadImage("assets/img/bolt.png"); 
  cloudImage = loadImage("assets/img/cloud.png");
  heartImage = loadImage("assets/img/heart.png");
  moonImage = loadImage("assets/img/moon.png"); 
  smileyImage = loadImage("assets/img/smiley.png");
  sunImage = loadImage("assets/img/sun.png"); 
}


/*
 * function loadAnimations()
 * Called in the preload() function. Loads all animations using the built-in
 * p5.play function "loadAnimation()". Therefore, this function is called after
 * loadImages(). The loadAnimation() function takes image input in the order
 * you'd like the animation to be played, from the first frame to the last.
 * Example:
   function loadAnimations() {
     myAnimation = loadAnimation(img1, img2, img3, img4);
   }
 */

  function loadAnimations(){
  boltAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, boltImage); 
  cloudAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, cloudImage); 
  heartAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, heartImage);
  moonAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, moonImage);
  smileyAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, smileyImage);
  sunAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, sunImage);
 }


/*
 * function loadSounds()
 * Works very similarly to loadImages(), only for music and sound effects.
 * Example:
   function loadSounds() {
     soundFormats("mp3", "wav");
     mySound = loadSound("assets/sound/sound.wav");
     myOtherSound = loadSound("assets/sound/otherSound.mp3");
   }
 */


/*
 * function preload()
 * Called automatically by p5.play. Loads all assets for your game (e.g.,
 * images, sounds) before p5 calls setup(), to ensure that the game does not
 * begin running until the assets are loaded and ready. Therefore, this function
 * is essentially a "pre-setup" function. 
 */

 function preload() {
  loadImages(); 
  loadAnimations(); 
 }


/*
 * function setup()
 * Called automatically by p5.js when the game begins, but after preload().
 * Therefore, assets are assumed to have been loaded and ready before this
 * function is called.
 */

 function setup() {
  gameScreen = createCanvas(790,370); 
  gameScreen.parent("#game-screen");
  spriteWidth = 120; 
  spriteHeight = 168;
  spriteX = 70; 
  spriteY = 95; 
  imageArray = [backImage, transitionImage1, transitionImage2, transitionImage3, boltImage, cloudImage, heartImage, moonImage, smileyImage, sunImage];
  resizeImages(); 
  createSprites(); 
  spriteArray = [boltSprite1, boltSprite2, cloudSprite1, cloudSprite2, heartSprite1, heartSprite2, moonSprite1, moonSprite2, smileySprite1, smileySprite2, sunSprite1, sunSprite2]; 
  addAnimations(); 
  shuffle(spriteArray, true); 
  placeSprites(); 
  spritesActive = true; 
  matches = 0; 
  lives = 5; 
  firstChoice = undefined; 
  secondChoice = undefined; 
 }


/*
 * function draw()
 */

 function draw() {
  background(144, 12, 63); 
  drawSprites(); 
 }

/*
 * function init()
 * Initializes various elements of the game. Called in both setup() and
 * resetGame(). Helps reduce some of the bloat and redundancy in both of those
 * functions (DRY principle = "don't repeat yourself")
 */


/*
 * function resetGame()
 * Resets the game by calling init(), resetAllSprites(), then after a 1000
 * millisecond delay, calls shuffle(spriteArray, true), placeSprites(), and
 * sets spritesActive to true.
 */


/*
 * function toggleMusic()
 * Toggles the background music on and off.
 */


/*
 * function resizeImages()
 * Resizes all images in imageArray such that each image has a width of
 * spriteWidth and a height of spriteHeight. To resize an image use the
 * resize(width, height) method on the image itself.
 * Example of resizing one image:
   image.resize(40, 50);
 */

 function resizeImages() {
  for (var i = 0; i<imageArray.length; i++){
    imageArray[i].resize(spriteWidth, spriteHeight); 
  }
}


/*
 * function createSprites()
 * Initializes each sprite variable (e.g., sunSprite1) as a sprite object
 * through the createSprite(x, y, width, height) p5.play method. For all sprites,
 * x and y parameters should be passed values 0 and 0 (sprites are actually placed
 * in a separate function), while width and height correspond to spriteWidth and
 * spriteHeight.
 * Example:
   function createSprites() {
     mySprite = createSprite(0, 0, spriteWidth, spriteHeight);
   }
 */

 function createSprites(){
  boltSprite1 = createSprite(0,0,spriteWidth, spriteHeight); 
  boltSprite2 = createSprite(0,0,spriteWidth, spriteHeight);
  cloudSprite1 = createSprite(0,0,spriteWidth, spriteHeight);
  cloudSprite2 = createSprite(0,0,spriteWidth, spriteHeight);
  heartSprite1 = createSprite(0,0,spriteWidth, spriteHeight);
  heartSprite2 = createSprite(0,0,spriteWidth, spriteHeight);
  moonSprite1 = createSprite(0,0,spriteWidth, spriteHeight);
  moonSprite2 = createSprite(0,0,spriteWidth, spriteHeight);
  smileySprite1 = createSprite(0,0,spriteWidth, spriteHeight);
  smileySprite2 = createSprite(0,0,spriteWidth, spriteHeight);
  sunSprite1 = createSprite(0,0,spriteWidth, spriteHeight);
  sunSprite2 = createSprite(0,0,spriteWidth, spriteHeight);
 }


/*
 * function addAnimations()
 * Adds an animation to each sprite in spriteArray. The animations have already
 * been loaded using loadAnimations(), so this function is responsible for
 * actually adding them to the sprites. Additionally, this function initializes
 * each animation's frameDelay, loop, and playing properties. Finally, this
 * function calls activateSprite(s) with each sprite as input.
 */

function addAnimations(){
  var animations = [boltAnimation, boltAnimation, cloudAnimation, cloudAnimation, heartAnimation, heartAnimation, moonAnimation, moonAnimation, smileyAnimation, smileyAnimation, sunAnimation, sunAnimation]; 
  for (var i = 0; i<spriteArray.length; i++){
    spriteArray[i].addAnimation("flip", animations[i]); 
    spriteArray[i].animation.frameDelay = 10; 
    spriteArray[i].animation.looping = false; 
    spriteArray[i].animation.playing = false; 
    activateSprite(spriteArray[i]); 
  }
}
/*
 * function placeSprites()
 * Places all sprites in spriteArray on the game screen, according to any
 * pattern you like. For starters, try arranging the sprites in a simple
 * grid-like pattern (e.g., 2x2 if you only have four sprites).
 */

function placeSprites(){
  for(var i = 0; i<spriteArray.length; i++){
    spriteArray[i].position.x = spriteX; 
    spriteArray[i].position.y = spriteY; 
    if((i+1)%6 === 0){
      spriteX = 70; 
      spriteY = spriteY + spriteHeight + 10; 
    }
    else{
      spriteX = spriteX + spriteWidth + 10;  
    }
  }
}

/*
 * function activateSprite(s)
 * Activates a sprite by initializing its onMousePressed property to a function.
 * This will essentially cause the sprite to "come alive" and behave like a
 * real playing card when it is clicked.
 * To initialize the onMousePressed property as a function, use a function
 * expression.
 * The onMousePressed function itself plays sprite animations and assigns
 * spriteOne and spriteTwo to sprites in the order tht they are clicked. When
 * two sprites have been clicked, the function calls checkMatch().
 */

 function activateSprite(s){
  s.onMousePressed = function(){
    if(spritesActive == true && s.animation.getFrame() !== s.animation.getLastFrame()){
      if(firstChoice === undefined){
        firstChoice = s; 
        s.animation.goToFrame(s.animation.getLastFrame()); 
      }
      else if(firstChoice !== s){
        secondChoice = s;  
        s.animation.goToFrame(s.animation.getLastFrame()); 
        checkMatch(); 
      }
    }
  }
}



/*
 * function checkMatch()
 * Checks if spriteOne and spriteTwo match. If they do, the player is notified
 * in some way and those sprites remain "flipped". If they do not, the player is
 * notified in some way and, after a short delay, the sprites are returned to
 * face-down position. If the player has matched all sprites, they are notified
 * that they have won. IF the player has matched incorrectly too many times
 * (as indicated by the "lives" variable), they are notified that they have
 * lost and all sprites are simultaneously flipped face-up, revealing their
 * locations to the player. Win or lose, the player is given the option to
 * reset and try again with a fresh shuffle.
 */

function checkMatch(){
  var boltMatch = (firstChoice === boltSprite1 && secondChoice === boltSprite2) || (firstChoice === boltSprite2 && secondChoice === boltSprite1); 
  var cloudMatch = (firstChoice === cloudSprite1 && secondChoice === cloudSprite2) || (firstChoice === cloudSprite2 && secondChoice === cloudSprite1); 
  var heartMatch = (firstChoice === heartSprite1 && secondChoice === heartSprite2) || (firstChoice === heartSprite2 && secondChoice === heartSprite1); 
  var moonMatch = (firstChoice === moonSprite1 && secondChoice === moonSprite2) || (firstChoice === moonSprite2 && secondChoice === moonSprite1); 
  var smileyMatch = (firstChoice === smileySprite1 && secondChoice === smileySprite2) || (firstChoice === smileySprite2 && secondChoice === smileySprite1); 
  var sunMatch = (firstChoice === sunSprite1 && secondChoice === sunSprite2) || (firstChoice === sunSprite2 && secondChoice === sunSprite1); 

  if(boltMatch || cloudMatch || heartMatch || moonMatch || smileyMatch || sunMatch == true){
    matches++; 
    if(matches == spriteArray.length){
      spritesActive = false; 
      setTimeout(function(){
        alert("You Win!!"); 
      }, 2000); 
    }
    else{
      firstChoice = undefined; 
      secondChoice = undefined; 
    }
  }
  else{
    lives--; 
    spritesActive = false; 
    if(lives == 0){
      setTimeout(function(){
        flipAllSprites(); 
        alert("You Lost!");
      }, 2000)
    }
    else{
      setTimeout(function(){ 
        firstChoice.animation.goToFrame(0);
        secondChoice.animation.goToFrame(0); 
        firstChoice = undefined; 
        secondChoice = undefined; 
        spritesActive = true; 
      }, 2000)
    }
  }
}

 /* function flipAllSprites()
 * Flips all sprites in spriteArray to their last animation frame (i.e.,
 * "face-up").
 */

 function flipAllSprites(){
  for(var i = 0; i < spriteArray.length; i++){
    spriteArray[i].animation.getLastFrame(); 
  } 
}

 /*
  * function resetAllSprites()
  * Does exactly the opposite of the above function!
  */
