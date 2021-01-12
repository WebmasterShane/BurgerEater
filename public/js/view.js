$(document).ready(function() {

  var $newItemInput = $("input.new-item");
 
  var $todoContainer = $(".todo-container");

  $(document).on("click", "button.delete", deleteTodo);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".todo-item", editTodo);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", insertTodo);


  var burg = [];


  getBurg();

  
  function initializeRows() {
    $todoContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burg.length; i++) {
      rowsToAdd.push(createNewRow(burg[i]));
    }
    $todoContainer.prepend(rowsToAdd);
  }


  function getBurg() {
    $.get("/api/burgers", function(data) {
      burg = data;
      initializeRows();
    });
  }


  function deleteTodo(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(getBurg);
  }

  function editTodo() {
    var currentTodo = $(this).data("todo");
    $(this).children().hide();
    $(this).children("input.edit").val(currentTodo.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }


  function toggleComplete(event) {
    event.stopPropagation();
    var burg = $(this).parent().data("burg");
    burg.complete = !burg.complete;
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

  function cancelEdit() {
    var currentTodo = $(this).data("todo");
    if (currentTodo) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentTodo.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a todo-item row
  function createNewRow(burg) {
    var $newInputRow = $(
      [
        "<li class='list-group-item todo-item'>",
        "<span>",
        burg.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
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

  // This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault();
    var burg = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/burgers", burg, getBurg);
    $newItemInput.val("");
  }
});
