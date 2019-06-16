$(document).ready(function() {
  var config = {
    apiKey: 'AIzaSyAxQ1-piRtYq9WU2vl9HLZ4mVeD1W05ln0',
    authDomain: 'fir-projecttodo.firebaseapp.com',
    databaseURL: 'https://fir-projecttodo.firebaseio.com',
    projectId: 'fir-projecttodo',
    storageBucket: 'fir-projecttodo.appspot.com',
    messagingSenderId: '785921218074',
    appId: '1:785921218074:web:49f44b1bab4b54a2'
  }
  // Initialize Firebase
  firebase.initializeApp(config)
  db = firebase.database()

  let todoArray = []

  function Todo(todo, time) {
    this.todo = todo
    this.time = time
  }

  db.ref().on('value', function(snap) {
    $('#todoList').empty()

    try {
      todoArray = snap.val().todos
      console.log(todoArray)
      todoArray.forEach((element, index) => {
        $('#todoList').append(
          `<h1 class="todoItem" id="${index}">${element.todo}</h1>` +
            `<p>${element.time}</p>`
        )
      })
      //this deletes todo
      $('.todoItem').on('click', function() {
        var id = $(this).attr('id')
        todoArray.splice(id, 1)
        db.ref().set({
          todos: todoArray
        })
      })
    } catch {
      console.error('Todos are null, add a todo')
    }
  })

  function submitTodo() {
    textValue = $('#textInput').val()
    time = String(moment()._d)
    NewTodo = new Todo(textValue, time)
    todoArray.push(NewTodo)
    db.ref().set({
      todos: todoArray
    })
  }

  document.onkeyup = checkKey

  function checkKey(e) {
    if (e.keyCode === 13) {
      submitTodo()
    }
  }

  $('#submit').click(() => {
    submitTodo()
  })
})
