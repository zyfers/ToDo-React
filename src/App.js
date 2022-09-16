import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import { Button, FormControl, InputLabel, Input, makeStyles, TextField, FilledInput } from '@material-ui/core';
import db from "./firebase"
import firebase from 'firebase'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    width: 200,
    padding: '0 30px',
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: 'center'
  }
});


function App() {
  // state is short term memory for an app component
  // todos - array to store todos
  // we use setTodos everytime we want to change todos
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('')
  const classes = useStyles();
  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  // useEffect is a hook which runs once the app loads
  useEffect(() => {
    // this code here... fires when the app.js loads or when there is a change in dependencies
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data().todo))
      setTodos(snapshot.docs.map(doc => (
        {
          id: doc.id,
          todo: doc.data().todo
        }
      )))
    })
  }, [])

  const addTodo = (event) => {
    // this will fire off when we click the button
    // stop reload on submit
    event.preventDefault()

    // when we add it create a snapshot 
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // ... spread the current array (keep what we currently have) and add to it
    // setTodos([...todos, input]) // non db local
    setInput('')
  }

  return (
    // dynamic javascript using jsx
    // JSX = JavaScript + HTML
    <div className="App">
      <h1 className="app_name">Best TODO app ever!</h1>
      <form>
        <FormControl>
          {/* value maps it with state input at line 28 */}
          <input placeholder="Write a Todo" className="todo_input" value={input} onChange={event => setInput(event.target.value)} />
          <Button disabled={!input} type="submit" onClick={addTodo} className={classes.root}>Add</Button>
        </FormControl>
      </form>
      <div className="todo_list">
        <ul>
          {todos.map(todo => (
            <Todo todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
