'use strict';

function Animal(animal) {
  this.title = animal.name;
  this.image_url = animal.image_url;
  this.description = animal.description;
  this.keyword= animal.keyword;
  this.horns =animal.horns;
  selectKeyword.push(animal.keyword);

  //loop over array, extract elements, render over page
}

let selectKeyword=[];
console.log('selectKeyword', this.keyword);

//console.log('select keyword', selectKeyword);
Animal.allAnimals = [];

// Animal.prototype.renderKeyword = function () {
  
//   $('option').append('<li class="list"></li>');
//    for(let i =0; i< animal.length;i++){
//     $('<option/>').val(Animal.this.keyword[i]).html(Animal.this.keyword[i]).appendTo('#list');
//   }

// }

Animal.prototype.render = function () {//does nothing more than take data and render on time
  $('main').append('<div class="clone"></div>'); // add to dom
  let animalClone = $('div[class="clone"]'); //read what there
  let animalHtml = $('#animal-template').html(); //
  animalClone.html(animalHtml);
  

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr('src', this.image_url); //there are other ways to grab image
  animalClone.find('p').text(this.description);
  animalClone.find('p').text(this.keyword);
  animalClone.find('p').text(this.horns);
  animalClone.removeClass('clone');
  animalClone.attr('class', this.keyword);
}

Animal.readJSON = () => {
  // $.get('data.json', 'json', function(data) {

  // }) // old way
  $.get('page-1.json', 'json') //get request to JSON file within directory, second argument the type of data
    .then(data => { //once you get data, do this
      data.forEach(obj => { //iterate over each place in array, then create new object
        Animal.allAnimals.push(new Animal(obj))
      })
    })
    .then(Animal.loadAnimals)//will invoke as soon as ready on its own, no invocation needed
}

Animal.loadAnimals = () => { //function that actually renders dogs on page whereas render piece deals with dom
  Animal.allAnimals.forEach(animal => animal.render());
}

$(() => Animal.readJSON());// anonymous function that kicks everything off

$('select').on('click',function() {
  let selectAnimal = $('option');
  let selectedAnimal= selectAnimal.val();
  $('main').append(`<div class="clone">${selectedAnimal}</div>`); 
  selectAnimal.val('');
});


