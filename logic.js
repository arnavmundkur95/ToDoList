var button = document.getElementsByClassName("add-task")[0];
var field = document.getElementById("text-field");
var todos = document.getElementsByClassName("todos")[0];
var search_field = document.getElementById("search-field");
var search_button = document.getElementById("search-button");
var sort_button = document.getElementById("priority-button");
var taskTexts = [];

var opac = 0.8;
var colors = [
  "rgba(7,166,139," + opac + ")",
  "rgba(240,240,19," + opac + ")",
  "rgba(186,97,2," + opac + ")",
  "rgba(214,43,17," + opac + ")"
];

var colorPriority = new Map();
colorPriority.set("rgba(7,166,139,0.8)", 0);
colorPriority.set("rgba(240,240,19,0.8)", 1);
colorPriority.set("rgba(186,97,2,0.8)", 2);
colorPriority.set("rgba(214,43,17,0.8)", 3);


button.addEventListener("click", addTodo);

search_button.addEventListener("click", function() {
  search(search_field.value);
});

sort_button.addEventListener("click", sort);

function addTodo() {
  var text = field.value;

  if (text == "") {
    return;
  }

  taskTexts.push(text);

  var div = document.createElement("div");
  div.setAttribute("class", "todoItem");
  div.setAttribute("priority", "-1");

  // Div contents
  var content = document.createElement("SPAN");

  var editForm = document.createElement("INPUT");
  editForm.setAttribute("type", "text-field");
  editForm.setAttribute("id", "editForm");

  var button1 = document.createElement("BUTTON");
  button1.innerHTML = "Check";

  var button2 = document.createElement("BUTTON");
  button2.innerHTML = "Edit";

  var button3 = document.createElement("BUTTON");
  button3.innerHTML = "Change Priority";

  var button4 = document.createElement("BUTTON");
  button4.innerHTML = "Save Changes";
  button4.setAttribute("id", "save-changes");

  var button5 = document.createElement("BUTTON");
  button5.innerHTML = "Cancel";
  button5.setAttribute("id", "cancel");

  var button6 = document.createElement("BUTTON");
  button6.innerHTML = "Delete";
  button6.setAttribute("id", "delete");

  content.innerHTML = text;

  div.appendChild(content);
  div.appendChild(editForm);
  div.appendChild(button4);
  div.appendChild(button5);
  div.appendChild(button6);
  div.appendChild(button1);
  div.appendChild(button2);
  div.appendChild(button3);

  // Adding Event Listeners

  div.addEventListener("mouseover", function() {
    show(div);
  });

  div.addEventListener("mouseout", function() {
    hide(div);
  });

  button1.addEventListener("click", function() {
    crossOff(div);
  });

  button2.addEventListener("click", function() {
    editTask(div);
  });

  button3.addEventListener("click", function() {
    changeColor(div);
  });

  button4.addEventListener("click", function() {
    saveChanges(div);
  });

  button5.addEventListener("click", function() {
    cancel(div);
  });

  button6.addEventListener("click", function() {
    del(div);
  });

  todos.appendChild(div);
  field.value = "";
  todoID += 1;
}

function crossOff(todo) {
  todo.getElementsByTagName("span")[0].style.textDecoration =
    todo.getElementsByTagName("span")[0].style.textDecoration == ""
      ? "line-through"
      : "";
}

function show(todo) {
  var buttons = todo.getElementsByTagName("button");
  for (const el of buttons) {
    if (el.id != "save-changes" && el.id != "cancel" && el.id != "delete") {
      el.style.display = "inline-block";
    }
  }
}

function hide(todo) {
  var buttons = todo.getElementsByTagName("button");
  for (const el of buttons) {
    if (el.id != "save-changes" && el.id != "cancel" && el.id != "delete") {
      el.style.display = "none";
    }
  }
}

function changeColor(todo) {
  var c = getComputedStyle(todo).getPropertyValue("background-color");

  var r = c.split(",")[0].match(/(\d+)/)[0];
  var g = c.split(",")[1].match(/(\d+)/)[0];
  var b = c.split(",")[2].match(/(\d+)/)[0];

  var index = colors.indexOf(
    "rgba(" + r + "," + g + "," + b + "," + opac + ")"
  );

  index += 1;
  if (index == colors.length) {
    index = 0;
  }
  todo.style.backgroundColor = colors[index];
}

function editTask(todo) {
  console.log(todo.getElementsByTagName("input")[0]);
  todo.style.gridTemplateColumns = "7fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
  todo.getElementsByTagName("input")[0].style.display = "inline";
  todo.getElementsByTagName("BUTTON")[0].style.display = "inline";
  todo.getElementsByTagName("BUTTON")[1].style.display = "inline";
  todo.getElementsByTagName("BUTTON")[2].style.display = "inline";
}

function saveChanges(todo) {
  var val = todo.getElementsByTagName("input")[0].value;
  if (val == "") {
    return;
  }
  todo.getElementsByTagName("SPAN")[0].innerHTML = val;
  cancel(todo);
  todo.getElementsByTagName("input")[0].value = "";
  todo.style.gridTemplateColumns = "10fr 1fr 1fr 1fr";
}

function search(searchTerm) {
  search_field.value = "";
  // console.log(todos);
  console.log(todos.getElementsByTagName("SPAN"));
  for (const txt of todos.getElementsByTagName("SPAN")) {
    var val = txt.innerText;
    if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
      console.log(txt.parentNode);
      var previousVal = txt.parentNode.style.backgroundColor;
      txt.parentNode.style.backgroundColor = "white";
      txt.parentNode.scrollIntoView();
      setTimeout(() => {
        txt.parentNode.style.backgroundColor = previousVal;
      }, 2000);
    }
  }
}

function cancel(todo) {
  todo.getElementsByTagName("input")[0].style.display = "none";
  todo.getElementsByTagName("BUTTON")[0].style.display = "none";
  todo.getElementsByTagName("BUTTON")[1].style.display = "none";
  todo.getElementsByTagName("BUTTON")[2].style.display = "none";
  todo.style.gridTemplateColumns = "10fr 1fr 1fr 1fr";
}

function del(todo) {
  todo.style.display = "none";
}


