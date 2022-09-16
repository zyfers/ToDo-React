import React, { useState } from 'react'
import './Todo.css'
import { List, ListItem, ListItemText, Modal, Button } from '@material-ui/core'
import db from './firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    listItemText: {
        fontSize: 'xxx-large',
        fontWeight: 'bolder',
        color: "#d1d4c9",
        marginLeft: '20px'
    },
    listItemSec: {
        marginLeft: '20px'
    }
}))


function Todo(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')

    const updateTodo = () => {
        // update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })
        setOpen(false)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    <h1>I am a modal</h1>
                    <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                    <Button onClick={updateTodo}>Update Todo</Button>
                </div>
            </Modal>
            <List className="todo_list">
                <ListItem>
                    <EditIcon fontSize='large' color='action' onClick={e => setOpen(true)} />
                    <ListItemText classes={{primary:classes.listItemText, secondary:classes.listItemSec}} primary={props.todo.todo} secondary="Dummy deadline !" />
                    <DeleteIcon fontSize='large' color="error" onClick={event => {
                        db.collection('todos').doc(props.todo.id).delete()
                    }} />
                </ListItem>
            </List>
        </>
    )
}

export default Todo
