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

  db.ref().on('value', function(snap) {
    $('#todoList').empty()
    if (todoArray != null) {
      todoArray = snap.val().todos
      console.log(todoArray)
      todoArray.forEach((element, index) => {
        $('#todoList').append(
          `<h1 class="todoItem" id="${index}">${element}</h1>`
        )
      })
    }
    //this deletes todo
    $('.todoItem').on('click', function() {
      var id = $(this).attr('id')
      todoArray.splice(id, 1)
      db.ref().set({
        todos: todoArray
      })
    })
  })

  $('#submit').click(() => {
    textValue = $('#textInput').val()
    todoArray.push(textValue)
    console.log(todoArray)

    db.ref().set({
      todos: todoArray
    })
  })
})
