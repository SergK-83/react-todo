import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";

const Todo = () => {
    const tasks = [
        {id: 'task-1', title: 'Купить молоко', isDone: false},
        {id: 'task-2', title: 'Погладить кота', isDone: true},
    ]

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm/>
            <SearchTaskForm/>
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({isDone}) => isDone).length}
            />
            <TodoList tasks={tasks}/>
        </div>
    )
}

export default Todo;