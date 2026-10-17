import {createContext} from "react";
import useTasks from "./useTasks.js";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll.js";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
    const {children} = props;

    const {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
    } = useTasks();

    /**
     * отделяем UX логику прокрутки от бизнес логики управления задачами
     * через отдельный кастомный хук useIncompleteTaskScroll
     */
    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = useIncompleteTaskScroll(tasks);

    return (
        <TasksContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskId,
                deleteTask,
                deleteAllTasks,
                toggleTaskComplete,
                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                setSearchQuery,
                newTaskInputRef,
                addTask,
                disappearingTaskId,
                appearingTaskId,
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}
