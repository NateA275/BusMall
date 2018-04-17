'use strict';
/**
 * Variables
 */
Product.allProducts = []; //Holds all products
Product.currentDisplay = []; //Holds index numbers of products that are currently displayed
Product.indexHolder = []; //Holds index numbers to be compared to current display

Product.ITERATIONS = 5; //Number of voting rounds
Product.NUMBER_DISPLAYED = 3; //How many images are displayed per voting round
Product.iterationCounter = 0;

Product.firstImage = document.getElementById('firstImage'); //HTML location of first image
Product.secondImage = document.getElementById('secondImage'); //HTML location of second image
Product.thirdImage = document.getElementById('thirdImage'); //HTML location of third image

Product.formElement = document.getElementById('chooseProduct'); //HTML location of form
Product.formElement.addEventListener('submit', handleVote); //Create event listener

/**
 * Constructor for listed items.
 * @param {string} url Location of product image in img directory
 * @param {string} name Unique product identifying name
 */
function Product(url, name) {
  this.url = url;
  this.name = name;
  this.votes = 0;
  this.displays = 0;
  Product.allProducts.push(this);
}

new Product('img/bag.jpg', 'R2D2 Bag');
new Product('img/banana.jpg', 'Banana Slicer');
new Product('img/bathroom.jpg', 'Bathroom Caddy');
new Product('img/boots.jpg', 'Open-toe Rainboots');
new Product('img/breakfast.jpg', 'All-in-one Breakfast');
new Product('img/bubblegum.jpg', 'Meatball Bubblegum');
new Product('img/chair.jpg', 'Rounded Seat Chair');
new Product('img/cthulhu.jpg', 'Cthulhu Figure');
new Product('img/dog-duck.jpg', 'Duck Muzzle');
new Product('img/dragon.jpg', 'Dragon Spam');
new Product('img/pen.jpg', 'Pen Utensils');
new Product('img/pet-sweep.jpg', 'Pet Floor Sweeper');
new Product('img/scissors.jpg', 'Pizza Scissors');
new Product('img/shark.jpg', 'Shark Sleeping Bag');
new Product('img/sweep.png', 'Baby Sweeper');
new Product('img/tauntaun.jpg', 'Tauntaun Sleeping Bag');
new Product('img/unicorn.jpg', 'Unicorn Spam');
new Product('img/usb.gif', 'Tentacle USB');
new Product('img/water-can.jpg', 'Impossible Watering Can');
new Product('img/wine-glass.jpg', 'Inconvenient Wine Glass');

/**
 * Generates Random Index Numbers
 */
function getIndexNumbers() {
  for(var i = 0; i < Product.NUMBER_DISPLAYED; i++) {
    do {
      var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    } while (Product.currentDisplay.includes(randomIndex) || Product.indexHolder.includes(randomIndex));
    Product.indexHolder.push(randomIndex);
  }
  Product.currentDisplay = Product.indexHolder; //Assign validated index values to current display
  Product.indexHolder = []; //Reset Index Holder
  return(Product.currentDisplay);
}

/**
 * TODO Figure out how to scale this with NUMBER_DISPLAYED
 */
function postImages() {
  getIndexNumbers();
  Product.allProducts[Product.currentDisplay[0]].displays++;
  Product.allProducts[Product.currentDisplay[1]].displays++;
  Product.allProducts[Product.currentDisplay[2]].displays++;
  Product.firstImage.src = Product.allProducts[Product.currentDisplay[0]].url;
  Product.firstImage.alt = Product.allProducts[Product.currentDisplay[0]].name;
  Product.secondImage.src = Product.allProducts[Product.currentDisplay[1]].url;
  Product.secondImage.alt = Product.allProducts[Product.currentDisplay[1]].name;
  Product.thirdImage.src = Product.allProducts[Product.currentDisplay[2]].url;
  Product.thirdImage.alt = Product.allProducts[Product.currentDisplay[2]].name;
}

function handleVote(event) {
  event.preventDefault(); //Prevent Page Refresh
  Product.iterationCounter++;
  console.log(Product.iterationCounter);
  var choice = parseInt(Product.formElement.imageChoice.value);
  Product.allProducts[Product.currentDisplay[choice]].votes++;
  Product.formElement.reset();

  if(Product.iterationCounter < Product.ITERATIONS) {
    postImages();
  } else {
    Product.formElement.removeEventListener('submit', handleVote); //Remove event listener
    renderResults();
  }
}

function renderResults() {
  Product.formElement.innerHtml = '';
  var newChart = document.createElement('canvas');
  Product.formElement.appendChild(newChart);
}

//Call on page load
postImages();