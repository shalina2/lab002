'use strict';
function Animal(animal) {
  this.title = animal.name;
  this.image_url = animal.image_url;
  this.description = animal.description;
  this.keyword= animal.keyword;
  this.horns =animal.horns;
}
Animal.allAnimals = [];
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
Animal.renderKeyword = function () { //renders keyword into selector
  let selectKeyword=[]; //empty array for selected keyword
  Animal.allAnimals.forEach( animal=>{ //for each designed to itterate over object array and identify keyword
  if ( !selectKeyword.includes(animal.keyword)) {
      $('select').append('<option class="clone"></option>'); //appends each keyword to selection
      let $opt = $('option[class="clone"]'); //$ essential for jQuery identifier
      $opt.text(animal.keyword); //places text on selector
      selectKeyword.push(animal.keyword); //pushes keyword to empty array
      $opt.removeClass('clone'); //removes to set stage for next keyword
    }
  })
}
Animal.readJSON = () => {
  $.get('./data/page-1.json', 'json') //get request to JSON file within directory, second argument the type of data
    .then(data => { //once you get data, do this
      data.forEach(obj => { //iterate over each place in array, then create new object
        Animal.allAnimals.push(new Animal(obj))
      })
    })
    .then(Animal.loadAnimals).then(Animal.renderKeyword)//will invoke as soon as ready on its own, no invocation needed
}
Animal.loadAnimals = () => { //function that actually renders dogs on page whereas render piece deals with dom
  Animal.allAnimals.forEach(animal => animal.render());
}
$(() => Animal.readJSON());// anonymous function that kicks everything off
$('select').on('change',function() { //event delegatrion
  let selectedAnimal= $(this).val(); //variable that holds selected value
  $(`div`).not('.'+selectedAnimal).hide(); //hides what is not selected
  $('.'+selectedAnimal).show(); //shows what is selected
});


