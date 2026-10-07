import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";
import {useState} from "react";

const Todo = () => {
    const [tasks, setTasks] = useState([
        {id: 'task-1', title: 'Купить молоко', isDone: false},
        {id: 'task-2', title: 'Погладить кота', isDone: true},
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Delete all?');

        if (isConfirmed) {
            setTasks([]);
        }
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
    }

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(tasks.map((t) => t.id ===taskId ? {...t, isDone} : t))
    }

    const filterTasks = (query) => {
        console.log(`!!! Поиск: ${query}`)
    }

    const addTask = () => {
       if (newTaskTitle.trim().length > 0) {
           const newTask = {
               id: crypto.randomUUID() ?? Date.now().toString(),
               title: newTaskTitle,
               isDone: false,
           }

           setTasks([...tasks, newTask]);
           setNewTaskTitle('');
       }
    }

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm onSearchInput={filterTasks}/>
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({isDone}) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    )
}

export default Todo;