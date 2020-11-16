$(document).ready(function() {
  // Fetch json data
  $.ajax({
    url: 'https://thegoldenmane.github.io/EasyShopping/lists.json',
    datatype: 'json'
  })
  .done(function (data) { 
    dishesList = data.dishes; 

    // Fill dishes list
    $.each( dishesList, function( key, val ) {
      addRow($('#dishes-list'), key, 0);
    });

    // Fill groceries list
    $.each( data.groceries, function( i, val ) {
      addRow($('#groceries-list'), val, 0);
    });
  })
  .fail(function (jqXHR, textStatus, errorThrown) { console.log(errorThrown); });


  // Add dish ingredients to shopping cart
  $('#dishes-list').on('click', '.row-content', function() {
    $.each( dishesList[$(event.target).text()], function( key, val ) {
      addItemToShoppingList(key, val);
    });
});


  // Add grocery item to shopping cart
  $('#groceries-list').on('click', '.row-content', function() {
    addItemToShoppingList($(event.target).text(), 1);
  });


  // Clear shopping cart
  $('#clear-shopping-bar').click(function(event) {
    $('#shopping-cart-list').empty();
  });
});


// Add row
function addRow(target, rowText, amount) {
  var li = document.createElement("li");

  var content = document.createElement("div");
  content.innerHTML = rowText;
  content.classList.add("row-content");
  li.append(content);

  if(amount > 0) {
    var amountDisplay = document.createElement("div");
    amountDisplay.innerHTML = amount;
    amountDisplay.classList.add('amount');
    li.append(amountDisplay);
  }

  target.append(li);
}

// Add item to shopping list
function addItemToShoppingList(itemName, amount) {
  if($('#shopping-cart-list li').length == 0) {
      // If list is empty add row
      addRow($('#shopping-cart-list'), itemName, amount);
  } else {
    // If list is not empty check if grocery item already exists -> if true increase amount
    exists = false;
    $("#shopping-cart-list li").each(function(index, li) {
      if($(li).find(".row-content").text() == itemName) {
        $(li).find(".amount").html(parseInt($(li).find(".amount").text()) + amount);
        exists = true;
      }       
    });

    // If list is not empty but grocery item doesn't exist yet add new row
    if(!exists) {
      addRow($('#shopping-cart-list'), itemName, amount);
    }
  }
}