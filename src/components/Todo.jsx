import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";
import Button from "./Button.jsx";
import {useContext} from "react";
import {TasksContext} from "../context/TasksContext.jsx";

const Todo = () => {
    const {firstIncompleteTaskRef} = useContext(TasksContext);

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm/>
            <SearchTaskForm/>
            <TodoInfo/>
            <Button
                onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}
            >
                Show first incomplete task
            </Button>
            <TodoList/>
        </div>
    )
}

export default Todo;