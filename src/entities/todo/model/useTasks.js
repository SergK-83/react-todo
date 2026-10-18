import {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import tasksAPI from "@/shared/api/tasks";

const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL': {
            return Array.isArray(action.tasks) ? action.tasks : state;
        }
        case 'ADD': {
            return [...state, action.task];
        }
        case 'TOGGLE_COMPLETE': {
            const {id, isDone} = action;

            return state.map((task) => task.id === id ? {...task, isDone} : task);
        }
        case 'DELETE': {
            return state.filter((task) => task.id !== action.id);
        }
        case 'DELETE_ALL': {
            return [];
        }
        default: {
            return state;
        }
    }
}

const useTasks = () => {
    // const [tasks, setTasks] = useState([]);
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    // useState — состояние компонента
    // Зачем нужен: хранить данные, изменение которых должно перерисовать компонент и обновить UI.
    // Ключевое свойство: вызов setCount запускает ре-рендер, и новое значение попадает в разметку.
    const [searchQuery, setSearchQuery] = useState('');
    const [disappearingTaskId, setDisappearingTaskId] = useState(null);
    const [appearingTaskId, setAppearingTaskId] = useState(null);

    // useRef — «коробка» для значений без ре-рендера
    // Зачем нужен: хранить мутируемое значение, которое не влияет на отрисовку, либо получить прямую ссылку на DOM-узел.
    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Delete all?');

        if (isConfirmed) {
            // tasksAPI.deleteAll(tasks).then(() => setTasks([]))
            tasksAPI.deleteAll(tasks).then(() => dispatch({type: 'DELETE_ALL'}))
        }
    }, [tasks]);

    // const deleteTask = useCallback((taskId) => {
    //     tasksAPI.delete(taskId)
    //         .then(() => {
    //             setDisappearingTaskId(taskId);
    //             setTimeout(() => {
    //                 setTasks(tasks.filter((t) => t.id !== taskId));
    //                 setDisappearingTaskId(null);
    //             }, 400);
    //         })
    // }, [tasks]);

    const deleteTask = useCallback((taskId) => {
        tasksAPI.delete(taskId)
            .then(() => {
                setDisappearingTaskId(taskId);
                setTimeout(() => {
                    dispatch({type: 'DELETE', id: taskId})
                    setDisappearingTaskId(null);
                }, 400);
            })
    }, []);

    // const toggleTaskComplete = useCallback((taskId, isDone) => {
    //     tasksAPI.toggleComplete(taskId, isDone)
    //         .then(() => {
    //             setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone} : t))
    //         })
    // }, [tasks]);

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        tasksAPI.toggleComplete(taskId, isDone)
            .then(() => {
                dispatch({type: 'TOGGLE_COMPLETE', id: taskId, isDone})
            })
    }, []);

    /**
     * prop Функция создает новый объект функцию при каждом рендере родителя
     * и для memo() в дочернем компоненте это выглядит так, будто пропсы изменились, т.к. в JS функции сравниваются по ссылке.
     * И для этого есть useCallback() - пока зависимости не изменились, функция остается той же самой ссылкой.
     */
    const addTask = useCallback((title, callbackAfterAdding) => {
        const newTask = {
            // Используем son-server, параметр id будет сгенерирован сервером
            // id: crypto.randomUUID() ?? Date.now().toString(),
            title,
            isDone: false,
        }

        tasksAPI.add(newTask)
            .then((addedTask) => {
                // setTasks((prevTasks) => [...prevTasks, addedTask]);
                dispatch({type: 'ADD', task: addedTask})
                callbackAfterAdding()
                setSearchQuery('');
                newTaskInputRef.current.focus();
                setAppearingTaskId(addedTask.id);
                setTimeout(() => {
                    setAppearingTaskId(null);
                }, 400);
            })
    }, []);

    /**
     * Чтобы отловить момент загрузки страницы и последующего рендера компонента и его внутренностей
     * воспользуемся хуком useEffect с пустым массивом зависимостей (сработает только один раз при первом рендере).
     *
     * - С пустым массивом зависимостей эффект сработает только один раз при первом рендере.
     * - Со списком зависимостей эффект срабатывает при кождом их изменении.
     * - Без второго аргумента эффект срабатывает после каждого рендера.
     */
    useEffect(() => {
        // Сначала отрисуется компонент и только потом выполнится код ниже и newTaskInputRef точно не будет null
        newTaskInputRef.current.focus();

        // tasksAPI.getAll().then(setTasks);
        tasksAPI.getAll().then((tasks) => dispatch({type: 'SET_ALL', tasks}));
    }, []);

    const renderCount = useRef(0);

    // Без второго аргумента эффект срабатывает после каждого рендера.
    useEffect(() => {
        renderCount.current++;
        console.log(`Компонент Todo отрендерился ${renderCount.current} раз(а)`);
    });

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase();

        return clearSearchQuery.length > 0
            ? tasks.filter((t) => t.title.toLowerCase().includes(clearSearchQuery))
            : null;
    }, [searchQuery, tasks]);

    return {
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
    }
}

export default useTasks
