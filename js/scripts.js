$(document).ready(function() {

  // TESTING ---------------------------------------
  for (i = 0; i < 20; i++) {
    addRow($('#dishes-list'), "dish-test");
  }

  for (i = 0; i < 5; i++) {
    addRow($('#groceries-list'), "grocery-test");
  }

  $.ajax({
      url: "https://thegoldenmane.github.io/EasyShopping/lists.json",
      dataType: "json"
  }).done(function(result){
      console.log(result);
  });

  // -----------------------------------------------

  // Open add dish modal
  $('#add-dish').click(function(event) {
    $('#dish-modal-activate').css('display', 'block');
  });

  // Close add dish modal
  $('.modal-background').click(function(event) {
    target = $( event.target );
    if(target.is($('.modal-background'))) {
      $('#dish-modal-activate').css('display', 'none');
    }
  });

  // Add new dish to list
  $('#add-dish').click(function(event) {
    /*newGrocery = $('#grocery-name').val();
    if(newGrocery != '') {
      //TODO check is item already exists
      addRow($('#groceries-list'), newGrocery);
      $('#dish-name').val('');
      $('#dish-name').focus();
      //Todo sql add
    }*/
  });

  // Add dish ingredients to shopping cart
  $('#shopping-cart-list').on('click', '.row-content', function() {
    console.log("add dish ingredients to shopping cart");
    text = $(event.target).text();
    //addRow($('#shopping-cart-list'), text);
    $(event.target).parent().remove();
  });








  // Open add grocery modal
  $('#add-grocery').click(function(event) {
    $('#grocery-modal-activate').css('display', 'block');
  });

  // Close add grocery modal
  $('.modal-background').click(function(event) {
    target = $( event.target );
    if(target.is($('.modal-background'))) {
      $('#grocery-modal-activate').css('display', 'none');
    }
  });

  // Add new grocery item to list
  $('#grocery-add').click(function(event) {
    newGrocery = $('#grocery-name').val();
    if(newGrocery != '') {
      //TODO check is item already exists
      addRow($('#groceries-list'), newGrocery);
      $('#grocery-name').val('');
      $('#grocery-name').focus();
      //Todo sql add
    }
  });

  //Delete grocery item
  $('#groceries-list').on('click', '.delete', function() {
    $(event.target).parent().remove();
    //TODO Sql delete
  });


  // Add grocery item to shopping cart
  $('#groceries-list').on('click', '.row-content', function() {
    text = $(event.target).text();
    addRow($('#shopping-cart-list'), text);
    $(event.target).parent().remove();
  });






  // Clear shopping cart
  $('#clear-shopping-bar').click(function(event) {
    $('#shopping-cart-list').empty();
  });
});

// Add row
function addRow(target, rowText) {
  var li = document.createElement("li");

  var content = document.createElement("div");
  content.innerHTML = rowText;
  content.classList.add("row-content");

  var deleteIcon = document.createElement("div");
  deleteIcon.innerHTML = "X";
  deleteIcon.classList.add('delete');

  li.append(content);
  li.append(deleteIcon);

  target.append(li);
}