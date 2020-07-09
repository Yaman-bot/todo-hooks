import React, { useState,useEffect } from 'react'
import TodoList from "./TodoList";
import TodoForm from "./Todoform";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { v4 as uuidv4 } from 'uuid';
//import useTodoState from "./hooks/useTodoState";

function TodoApp(){
    const initialTodos=JSON.parse(window.localStorage.getItem("todos") || "[]" )
    // const initialTodos=[
    //     {id:1,task:'grow beard',completed:true},
    //     {id:2,task:'study',completed:true},
    //     {id:3,task:'clean',completed:false}
    // ]
    const [todos,setTodos]=useState(initialTodos)
    
    useEffect(()=>{
        window.localStorage.setItem("todos",JSON.stringify(todos))
    },[todos])  //Array is passsed to make it clear when todos changed then only useEffect runs

    const addTodo=newTodotext=>{
        setTodos([...todos,{id:uuidv4(),task:newTodotext,completed:false}])
    }

    const removeTodo=todoId=>{
        //filter out removed todo
        const updatedTodos=todos.filter(todo=>todo.id!==todoId)
        //call setTodos with new todos array
        setTodos(updatedTodos)
    }

    const toggleTodo=todoId=>{
        const updatedTodos=todos.map(todo=>(
            todo.id===todoId ? {...todo,completed: !todo.completed} :todo
        )) 

        setTodos(updatedTodos)
    }

    const editTodo=(todoId,newTask)=>{
        const updatedTodos=todos.map(todo=>{
           return  todo.id===todoId ? {...todo,task:newTask} : todo
        })
        setTodos(updatedTodos)
    }
    return(
        <Paper
            style={{
                padding: 0,
                margin: 0,
                height: "100vh",
                background: 'linear-gradient(to right bottom, #009688,#0288d1)'
            }}
            elevation={0}
            >
            <AppBar position='static' style={{ height: "64px",background:'#455a64' }}>
                <Toolbar>
                <Typography color='inherit'>TODOS WITH HOOKS</Typography>
                </Toolbar>
            </AppBar>
            <Grid container justify='center' style={{ marginTop: "1rem" }}>
                <Grid item xs={11} md={8} lg={4}>
                <TodoForm addTodo={addTodo} />
                <TodoList
                    todos={todos}
                    removeTodo={removeTodo}
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default TodoApp;