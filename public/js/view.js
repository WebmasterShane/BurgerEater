$(document).ready(function() {

  var $newItemInput = $("input.new-item");
 
  var $burgerContainer = $(".burger-container");

  
  $(document).on("click", "button.complete", toggleComplete);



  $(document).on("submit", "#burg-form", insertBurg);


  var burg = [];


  getBurg();

  
  function initializeRows() {
    $burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burg.length; i++) {
      rowsToAdd.push(createNewRow(burg[i]));
    }
    $burgerContainer.prepend(rowsToAdd);
  }


  function getBurg() {
    $.get("/api/burgers", function(data) {
      burg = data;
      console.log(burg)
      initializeRows();
    });
  }



  function toggleComplete(event) {
    event.stopPropagation();
    var burg = $(this).parent().data("burg");
    burg.devoured = true;
    console.log(burg);
    updateTodo(burg);
  }


  function finishEdit(event) {
    var updateBurg = $(this).data("Burg");
    if (event.which === 13) {
      updatedBurg.text = $(this).children("input").val().trim();
      $(this).blur();
      updateTodo(updateBurg);
    }
  }


  function updateTodo(burg) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burg
    }).then(getBurg);
  }

  function createNewRow(burg) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burg-item'>",
        "<span>",
        burg.burgerName,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        ,
        "<button class='complete btn btn-primary'>Eat</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burg.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", burg);
    if (burg.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }


  function insertBurg(event) {
    event.preventDefault();
    var burg = {
      burgerName: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/burgers", burg, getBurg);
    $newItemInput.val("");
  }
});
