'use strict';

/**
 * Variables
 */
Product.allProducts = []; //Holds all products
Product.allNames = []; //Holds all product names
Product.allVotes = []; //Holds number of votes for all products
Product.currentDisplay = []; //Holds index numbers of products that are currently displayed
Product.indexHolder = []; //Holds index numbers to be compared to current display
Product.ITERATIONS = 25; //Constant number of voting rounds
Product.NUMBER_DISPLAYED = 3; //Constant how many images are displayed per voting round
Product.iterationCounter = 0; //Tracks number of iterations
Product.choice; //Contains user's latest choice
Product.firstImage = document.getElementById('firstImage'); //HTML location of first image
Product.secondImage = document.getElementById('secondImage'); //HTML location of second image
Product.thirdImage = document.getElementById('thirdImage'); //HTML location of third image
Product.elementObject = document.getElementById('chooseProduct'); //HTML location of form
Product.elementObject.addEventListener('click', handleVote); //Create event listener for clicks on images

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

/**
 * Generates Random Index Numbers
 */
function getIndexNumbers() {
  for (var i = 0; i < Product.NUMBER_DISPLAYED; i++) {
    do {
      var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    } while (Product.currentDisplay.includes(randomIndex) || Product.indexHolder.includes(randomIndex));
    Product.indexHolder.push(randomIndex);
  }
  Product.currentDisplay = Product.indexHolder; //Assign validated index values to current display
  Product.indexHolder = []; //Reset Index Holder
}

/**
 * Post selected images to HTML Element
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

/**
 * Increments iterations and vote counter for selected object
 * @param {event} event Called upon submit
 */
function handleVote(event) {
  if(event.target === Product.firstImage || event.target === Product.secondImage || event.target === Product.thirdImage) {
    Product.iterationCounter++;
    for (var i = 0; i < Product.allProducts.length; i++) {
      if (event.target.alt === Product.allProducts[i].name) {
        Product.allProducts[i].votes++;
        break;
      }
    }
    if (Product.iterationCounter < Product.ITERATIONS) {
      postImages();
    } else {
      Product.elementObject.removeEventListener('click', handleVote); //Remove event listener
      updateVotes();
      renderResults();
    }
  }
}

/**
 * Update Vote Counter Array for all Products
 * Store allProducts Array to local storage
 */
function updateVotes() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    Product.allVotes.push(Product.allProducts[i].votes);
    Product.allNames.push(Product.allProducts[i].name);
  }
  localStorage.setItem('allProducts', JSON.stringify(Product.allProducts)); //Save Array of products to local storage
}

/**
 * Display all results in chart form
 */
function renderResults() {
  var ctx = document.getElementById('results');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.allNames,
      datasets: [{
        label: 'Number of Votes',
        data: Product.allVotes, 
        backgroundColor: 'rgba(250, 9, 9, .4)',
        hoverBackgroundColor: 'red',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Results'
      }
    }
  });
}

/**
 * Create Objects
 */
Product.allProducts = JSON.parse(localStorage.getItem('allProducts')) || [
  new Product('img/bag.jpg', 'R2D2 Bag'),
  new Product('img/banana.jpg', 'Banana Slicer'),
  new Product('img/bathroom.jpg', 'Bathroom Caddy'),
  new Product('img/boots.jpg', 'Open-toe Rainboots'),
  new Product('img/breakfast.jpg', 'All-in-one Breakfast'),
  new Product('img/bubblegum.jpg', 'Meatball Bubblegum'),
  new Product('img/chair.jpg', 'Rounded Seat Chair'),
  new Product('img/cthulhu.jpg', 'Cthulhu Figure'),
  new Product('img/dog-duck.jpg', 'Duck Muzzle'),
  new Product('img/dragon.jpg', 'Dragon Spam'),
  new Product('img/pen.jpg', 'Pen Utensils'),
  new Product('img/pet-sweep.jpg', 'Pet FloorSweeper'),
  new Product('img/scissors.jpg', 'Pizza Scissors'),
  new Product('img/shark.jpg', 'Shark Sleeping Bag'),
  new Product('img/sweep.png', 'Baby Sweeper'),
  new Product('img/tauntaun.jpg', 'Tauntaun Sleeping Bag'),
  new Product('img/unicorn.jpg', 'Unicorn Spam'),
  new Product('img/usb.gif', 'Tentacle USB'),
  new Product('img/water-can.jpg', 'Impossible Watering Can'),
  new Product('img/wine-glass.jpg', 'Inconvenient Wine Glass'),
];

postImages(); //Call on page load