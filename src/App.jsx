import Todo from "./components/Todo.jsx";
import {TasksProvider} from "./context/TasksContext.jsx";

const App = () => {
    return (
        <TasksProvider>
            <Todo/>
        </TasksProvider>
    )
}

export default App
