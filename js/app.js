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

// $('.pagination').click(function(){
//   let page = 
//   page = $(this).attr(${page}); renderJSON(page, defaultSort);
// });

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

function addDropDownMenu(){
  const $dropdown = $('select');
  uniqueKeywords.forEach(keywords => {
      console.log(keywords)
      const $newOption = $(`<option value = ‘${keywords}’>${keywords}</option>`);
      $dropdown.append($newOption);
  });
};

let userSelection = () => {
  $('select').on('change', function() {
      let selected = this.value;
      console.log('value',selected);
      $('section').hide();
      hornCollection.forEach(image => {
          if(selected === image.uniqueKeywords) {
              var keyword = selected;
              $("." + keyword).show();
          };
      });
  });
}

// ajax is calling our json file
$.ajax(`data/page-1.json`, {METHOD: 'GET', DATATYPE: 'JSON'})
  .then(data => {
    data.forEach(horn => {
      new Horn(horn).render();
      console.log(horn);
    })
    filterKeywords();
    addDropDownMenu();
    userSelection();
});