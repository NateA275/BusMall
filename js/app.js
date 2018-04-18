'use strict';
/**
 * Variables
 */
Product.allProducts = []; //Holds all products
Product.allNames = []; //Holds all product names
Product.allVotes = []; //Holds number of votes for all products
Product.currentDisplay = []; //Holds index numbers of products that are currently displayed
Product.indexHolder = []; //Holds index numbers to be compared to current display
Product.ITERATIONS = 25; //Number of voting rounds
Product.NUMBER_DISPLAYED = 3; //How many images are displayed per voting round
Product.iterationCounter = 0; //Tracks number of iterations
Product.choice; //Contains user's latest choice
Product.firstImage = document.getElementById('firstImage'); //HTML location of first image
Product.secondImage = document.getElementById('secondImage'); //HTML location of second image
Product.thirdImage = document.getElementById('thirdImage'); //HTML location of third image
Product.elementObject = document.getElementById('chooseProduct'); //HTML location of form
Product.elementObject.addEventListener('submit', handleVote); //Create event listener

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
  Product.allNames.push(this.name);
  Product.allProducts.push(this);
}

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

/**
 * Increments iterations and vote counter for selected object
 * @param {*} event Called upon submit
 */
function handleVote(event) {
  event.preventDefault(); //Prevent Page Refresh
  Product.iterationCounter++;
  Product.choice = parseInt(Product.elementObject.imageChoice.value);
  Product.allProducts[Product.currentDisplay[Product.choice]].votes++;
  Product.elementObject.reset(); //Resets radio buttons
  if(Product.iterationCounter < Product.ITERATIONS) {
    postImages();
  } else {
    Product.elementObject.removeEventListener('submit', handleVote); //Remove event listener
    Product.elementObject.style.display='none'; //Hide elemnents
    updateVotes();
    renderResults();
  }
}

function updateVotes() {
  for(var i = 0; i < Product.allProducts.length; i++) {
    Product.allVotes.push(Product.allProducts[i].votes);
  }
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
        label: 'Number Of Votes',
        data: Product.allVotes,
        backgroundColor: 'blue',
        hoverbackgroundColor: 'red',
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

//Call on page load
postImages();