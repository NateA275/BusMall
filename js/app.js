'use strict';
/**
 * Construct and fill Product Array
 */
var urls = ['../img/bag.jpg', '../img/banana.jpg', '../img/bathroom.jpg', '../img/boots.jpg', '../img/breakfast.jpg', '../img/bubblegum.jpg', '../img/chair.jpg', '../img/cthulhu.jpg', '../img/dog-duck.jpg', '../img/dragon.jpg', '../img/pen.jpg', '../img/pet-sweep.jpg', '../img/scissors.jpg', '../img/shark.jpg', '../img/sweep.png', '../img/tauntaun.jpg', '../img/unicorn.jpg', '../img/usb.gif', '../img/water-can.jpg', '../img/wine-glass.jpg'];

var allProducts = []; //Holds all products
var displayedProducts = []; //Holds products that have been displayed
var currentDisplay = []; //Holds products that are currently displayed
for(var i = 0; i < urls.length; i++ ) {
  allProducts.push(new Product(urls[i]));
}
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
function Product(url) {
  this.url = url;
  this.votes = 0;
  this.displays = 0;
}

function selectImages() {
  for(var i = 0; i < NUMBER_DISPLAYED; i++) {
    if(allProducts.length === 0) {
      allProducts = allProducts.concat(displayedProducts);
    }
    var randomNum = Math.floor(Math.random() * allProducts.length);
    currentDisplay.push(allProducts[randomNum]);
    allProducts.splice(randomNum, 1);
  }
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