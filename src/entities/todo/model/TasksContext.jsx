import {createContext, useMemo} from "react";
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

    // Чтобы все компоненты не перерисовывались при изменении любого из свойств ниже используем useMemo()
    const value = useMemo(() => ({
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    }), [
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    ])

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}
