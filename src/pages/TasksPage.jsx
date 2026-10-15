import {TasksProvider} from "../context/TasksContext.jsx";
import Todo from "../components/Todo.jsx";

const TasksPage = () => {
    return (
        <TasksProvider>
            <Todo/>
        </TasksProvider>
    )
}

export default TasksPage;
