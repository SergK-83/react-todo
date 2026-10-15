import Todo from "./components/Todo.jsx";
import {TasksProvider} from "./context/TasksContext.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import Router from "./Router.jsx";

const App = () => {
    const routes = {
        '/': TasksPage,
        '/tasks/:id': TaskPage,
        '*': () => <div>404 Page not found</div>,
    }

    return (
        // <TasksProvider>
        //     <Todo/>
        // </TasksProvider>

        <Router routes={routes} />
    )
}

export default App
