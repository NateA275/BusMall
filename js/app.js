'use strict';
/**
 * Construct and fill Product Array
 */
var urls = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];
var names = ['R2D2 Luggage', 'Banana Slicer', 'TP Caddy', 'Open-toe Rainboots', 'All-in-one Breakfast', 'Meatball Bubblegum', 'Rounded Seat Chair', 'Cthulhu Figure', 'Duck Muzzle', 'Dragon Spam', 'Pen Utensils', 'Pet Floor Sweeper', 'Pizza Scissors', 'Shark Bag', 'Baby Sweeper', 'Tauntaun Sleeping Bag', 'Unicorn Spam', 'Tenticle USB', 'Self-watering Can', 'Unique Wine Glass'];
for(var i = 0; i < urls.length; i++ ) {
  new Product(urls[i], names[i]);
}

var allProducts = []; //Holds all products
var currentDisplay = []; //Holds products that are currently displayed

var ITERATIONS = 25; //Number of voting rounds
var NUMBER_DISPLAYED = 3; //How many images are displayed per voting round
var iterationCounter = 0;

var firstImage = document.getElementById('firstImage'); //HTML location of first image
var secondImage = document.getElementById('secondImage'); //HTML location of second image
var thirdImage = document.getElementById('thirdImage'); //HTML location of third image

var formElement = document.getElementById('chooseProduct'); //HTML location of form
formElement.addEventListener('submit', handleVote);

/**
 * Constructor for listed items.
 * @param {string} url Location of product image in img directory
 */
function Product(url, name) {
  this.url = url;
  this.name = name;
  this.votes = 0;
  this.displays = 0;
  allProducts.push(this);
}

/**
 * select new image
 * compare image to previous three images
 * store into currentDisplay[]
 */
function selectImages() {
  var holdingArray = [];
  for(var i = 0; i < NUMBER_DISPLAYED; i++) {
    do {
      var randomNum = Math.floor(Math.random() * allProducts.length);
      holdingArray.push(allProducts[randomNum]);
    } while (currentDisplay.contains(holdingArray[i]));
  }
  currentDisplay = holdingArray;
  firstImage.src = currentDisplay[0].url;
  secondImage.src = currentDisplay[1].url;
  thirdImage.src = currentDisplay[2].url;
}

function handleVote(event) {
  event.preventDefault(); //Prevent page from reloading
  var choices = document.getElementsByName('imageChoice');
  var imageChoice;
  for (var i = 0; i < choices.length; i++) {
    if(choices[i].checked) {
      imageChoice = Number(choices[i].value);
    }
  }
  currentDisplay[imageChoice].votes++;
  for(i = 0; i < currentDisplay.length; i++) {
    currentDisplay[i].displays++;
    displayedProducts.push(currentDisplay[i]);
  }
  currentDisplay = []; //Reset Current display;
  formElement.reset(); //Reset radio buttons
  iterationCounter++;
  if(iterationCounter < ITERATIONS) {
    selectImages();
  }
}

selectImages();