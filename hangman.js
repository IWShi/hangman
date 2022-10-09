var word = "";
var usedLetters = [];
var wrongGuesses = 0;
var rightGuesses = 0;
var whiteSpace = 0;
var line = 0;
var wordList = [
  "abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure",
  "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buffalo", "buffoon", "buzzard", "buzzing", "buzzwords",
  "cobweb", "cockiness", "croquet", "crypt", "cycle",
  "disavow", "dizzying", "dwarves",
  "embezzle", "equip", "espionage", "exodus",
  "faking", "fishhook", "fixable", "fjord", "flpajack", "flopping", "fluffiness", "frazzled", "frizzled", "fuchsia", "funny",
  "gabby", "galaxy", "galvanize", "gazebo", "gizmo", "glowworm", "glyph", "gnarly", "gossip", "grogginess",
  "haiku", "haphazard", "hyphen",
  "icebox", "injury", "ivory", "ivy",
  "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo",
  "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "klutz", "knapsack",
  "larynx", "lengths", "lucky", "luxury", "lymph",
  "marquis", "matrix", "microwave", "mnemonic", "mystify",
  "nightclub", "nowadays", "numbskull", "nymph",
  "onyx", "oxidize", "oxygen",
  "pajama", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "psyche", "puppy", "puzzling",
  "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quota",
  "rhubarb", "rhythm", "rickshaw",
  "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome",
  "thumbscrew", "topaz", "transcript", "transgress", "transplant", "twelfth",
  "unknown", "unworthy", "unzip", "uptown",
  "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism",
  "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern",
  "xylophone",
  "yoke", "youthful", "yummy",
  "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"
];

function numGenerator(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isLetter(x) {
  if (x.toUpperCase() != x.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

function clearResponse() {
  var response = document.getElementById("guessResponse");
  response.style.display = "none";
}

function beginGame() {
  var startScreen = document.getElementById("startScreen");
  var gameScreen = document.getElementById("gameScreen");

  startScreen.style.display = "none";
  gameScreen.style.display = "initial";

  var num = numGenerator(0, wordList.length);
  word = wordList[num].toUpperCase();

  var blankSpaces = document.getElementById("blankSpaces");
  var blankDraw = blankSpaces.getContext("2d");
  var xStart = 0;
  whiteSpace = (1300 / word.length) * 0.05;
  line = (1300 / word.length) * 0.9;
  for (i = 0; i < word.length; i++) {
    xStart += whiteSpace;
    blankDraw.beginPath();
    blankDraw.moveTo(xStart, 225);
    xStart += line;
    blankDraw.lineTo(xStart, 225);
    xStart += whiteSpace;
    blankDraw.stroke();
    blankDraw.closePath();
  }

  var hangman = document.getElementById("hangman");
  var hangmanDraw = hangman.getContext("2d");
  hangmanDraw.beginPath();
  hangmanDraw.moveTo(25, 25);
  hangmanDraw.lineTo(25, 425);
  hangmanDraw.stroke();
  hangmanDraw.closePath();

  hangmanDraw.beginPath();
  hangmanDraw.moveTo(25, 25);
  hangmanDraw.lineTo(227, 25);
  hangmanDraw.stroke();
  hangmanDraw.closePath();

  hangmanDraw.beginPath();
  hangmanDraw.moveTo(227, 25);
  hangmanDraw.lineTo(227, 50);
  hangmanDraw.stroke();
  hangmanDraw.closePath();

  hangmanDraw.beginPath();
  hangmanDraw.moveTo(0, 425);
  hangmanDraw.lineTo(50, 425);
  hangmanDraw.stroke();
  hangmanDraw.closePath();
  //document.getElementById("word").innerHTML = word;
}

function testLetter() {
  var letter = document.getElementById("guessedLetter").value;
  letter = letter.trim();
  letter = letter.toUpperCase();
  var response = document.getElementById("guessResponse");
  response.innerHTML = "";
  response.style.display = "initial";
  document.getElementById("guessedLetter").value = null;

  if (letter.length < 1 || !isLetter(letter)) {
    response.innerHTML = "Please input a letter."
  } else if (letter.length > 1) {
    response.innerHTML = "Please input one letter at a time."
  } else if (usedLetters.indexOf(letter) != -1) {
    response.innerHTML = "Please input a letter that has not already been guessed."
  } else {
    usedLetters.push(letter);
    var used = document.getElementById("usedLetters");
    used.innerHTML = usedLetters.join(", ");
    if (word.indexOf(letter) != -1) {
      drawLetter(letter);
    } else {
      wrongGuesses++;
      drawPerson();
    }
  }
}

function drawLetter(letter) {
  var blankSpaces = document.getElementById("blankSpaces");
  var blankDraw = blankSpaces.getContext("2d");
  blankDraw.font = "200px monospace";
  blankDraw.textAlign = "center";
  var indices = [];
  for (i = 0; i < word.length; i++) {
    if (word[i] == letter) {
      indices.push(i);
    }
  }
  rightGuesses += indices.length;
  for (index of indices) {
    var x = (line / 2) + whiteSpace;
    for (i = 0; i < index; i++) {
      x = x + line + (whiteSpace * 2);
    }
    blankDraw.fillText(letter, x, 175);
  }
  if (rightGuesses == word.length) {
    document.getElementById("duringGame").style.display = "none";
    document.getElementById("gameOver").style.display = "initial";
    document.getElementById("gameResult").innerHTML = "You Win";
  }
}

function drawPerson() {
  var hangman = document.getElementById("hangman");
  var hangmanDraw = hangman.getContext("2d");
  switch (wrongGuesses) {
    case 1:
    hangmanDraw.beginPath();
    hangmanDraw.arc(227, 100, 50, 0, 2 * Math.PI);
    hangmanDraw.stroke();
    break;
    case 2:
    hangmanDraw.beginPath();
    hangmanDraw.moveTo(227, 150);
    hangmanDraw.lineTo(227, 375);
    hangmanDraw.stroke();
    hangmanDraw.closePath();
    break;
    case 3:
    hangmanDraw.beginPath();
    hangmanDraw.moveTo(227, 375);
    hangmanDraw.lineTo(177, 425);
    hangmanDraw.stroke();
    hangmanDraw.closePath();
    break;
    case 4:
    hangmanDraw.beginPath();
    hangmanDraw.moveTo(227, 375);
    hangmanDraw.lineTo(277, 425);
    hangmanDraw.stroke();
    hangmanDraw.closePath();
    break;
    case 5:
    hangmanDraw.beginPath();
    hangmanDraw.moveTo(227, 262);
    hangmanDraw.lineTo(177, 212);
    hangmanDraw.stroke();
    hangmanDraw.closePath();
    break;
    default:
    hangmanDraw.beginPath();
    hangmanDraw.moveTo(227, 262);
    hangmanDraw.lineTo(277, 212);
    hangmanDraw.stroke();
    hangmanDraw.closePath();
    for (letters of word) {
      drawLetter(letters);
    }
    document.getElementById("duringGame").style.display = "none";
    document.getElementById("gameOver").style.display = "initial";
    document.getElementById("gameResult").innerHTML = "You Lose";
    break;
  }
}

function retry() {
  usedLetters = [];
  rightGuesses = 0;
  wrongGuesses = 0;
  word = "";
  document.getElementById("duringGame").style.display = "initial";
  document.getElementById("gameOver").style.display = "none";
  var blankSpaces = document.getElementById("blankSpaces");
  var blankDraw = blankSpaces.getContext("2d");
  blankDraw.clearRect(0, 0, 1300, 350);
  var hangman = document.getElementById("hangman");
  var hangmanDraw = hangman.getContext("2d");
  hangmanDraw.clearRect(0, 0, 430, 450);
  document.getElementById("usedLetters").innerHTML = "";
  beginGame();
}
