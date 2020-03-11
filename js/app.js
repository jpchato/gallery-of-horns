'use strict';
// constructor function
// FEATURE 1
let hornCollection = [];
let uniqueKeywords = [];
function Horn(instancedHorn){
  this.image_url = instancedHorn.image_url;
  this.title = instancedHorn.title;
  this.description = instancedHorn.description;
  this.keyword = instancedHorn.keyword;
  this.horns = instancedHorn.horns;
  hornCollection.push(this);
}
console.log(uniqueKeywords)

//render prototype
Horn.prototype.render = function (){
  let template = $('#photo-template').html();
  let $section = $('<section></section>');
  $section.html(template);
  $section.find('h2').text(this.title);
  // $section.find('h3').text(this.)
  $section.find('p').text(this.description);
  $section.find('img').attr('src', this.image_url)
  $('main').append($section)
  // create a piece to add to the section that is not included in the html. Need piece for horns, keyword
}

const filterKeywords = () => {
  hornCollection.forEach(obj =>{
    if (!uniqueKeywords.includes(obj.keyword)){
      uniqueKeywords.push(obj.keyword)
    }
  })
}



// ajax is calling our json file
$.ajax(`data/page-1.json`, {METHOD: 'GET', DATATYPE: 'JSON'})
  .then(data => {
    data.forEach(horn => {
      new Horn(horn).render();
      console.log(horn);
    })
    filterKeywords();
})

// FEATURE 2
// Creating a `select` element with unique `option` elements that are extracted dynamically from the JSON file. One for each keyword
// Event handler to respond when users chooses an option from the menu. Hide all images, then show images that match keyword
