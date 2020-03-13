'use strict';
// constructor function
// FEATURE 1

let hornCollection = [];
let uniqueKeywords = [];
let $list = $("#list");
let template = $('#horns-template').html();
let renderTemplate = Handlebars.compile(template);

function Horn(instancedHorn) {
  this.image_url = instancedHorn.image_url;
  this.title = instancedHorn.title;
  this.description = instancedHorn.description;
  this.keyword = instancedHorn.keyword;
  this.horns = instancedHorn.horns;
  hornCollection.push(this);
}
// $('.pagination').click(function(){
//   let page =
//   page = $(this).attr(${page}); renderJSON(page, defaultSort);
// });

//render prototype

Horn.prototype.render = function () {
  let html = renderTemplate(this);
  $list.append(html)
}

const filterKeywords = () => {
  hornCollection.forEach(obj => {
    if (!uniqueKeywords.includes(obj.keyword)) {
      uniqueKeywords.push(obj.keyword)
    }
  })
}

function addDropDownMenu() {
  const $dropdown = $('select');
  uniqueKeywords.sort().forEach(keywords => {
    const $newOption = $(`<option value = ‘${keywords}’>${keywords}</option>`);
    $dropdown.append($newOption);
  });
};

let userSelection = () => {
  $('select').on('change', function () {
    let selected = this.value;
    $('section').hide(); /// Hide anything that's not got the class = section
    hornCollection.forEach(image => {
      if (selected === image.uniqueKeywords) {
        var keyword = selected;
        $("." + keyword).show();
      };
    });
  });
}

// ajax is calling our json file
$.ajax(`data/page-1.json`, { METHOD: 'GET', DATATYPE: 'JSON' })
  .then(data => {
    data.forEach(horn => {
      new Horn(horn).render();
    })
    filterKeywords();
    addDropDownMenu();
    userSelection();
  });