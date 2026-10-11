import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import tasksAPI from "../api/api.js";

const useTasks = () => {

    const [tasks, setTasks] = useState([]);

    // useState — состояние компонента
    // Зачем нужен: хранить данные, изменение которых должно перерисовать компонент и обновить UI.
    // Ключевое свойство: вызов setCount запускает ре-рендер, и новое значение попадает в разметку.
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // useRef — «коробка» для значений без ре-рендера
    // Зачем нужен: хранить мутируемое значение, которое не влияет на отрисовку, либо получить прямую ссылку на DOM-узел.
    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Delete all?');

        if (isConfirmed) {
            tasksAPI.deleteAll(tasks).then(() => setTasks([]))
        }
    }, [tasks]);

    const deleteTask = useCallback((taskId) => {
        tasksAPI.delete(taskId)
            .then(() => {
                setTasks(tasks.filter((t) => t.id !== taskId));
            })
    }, [tasks]);

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        tasksAPI.toggleComplete(taskId, isDone)
            .then(() => {
                setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone} : t))
            })
    }, [tasks]);

    /**
     * prop Функция создает новый объект функцию при каждом рендере родителя
     * и для memo() в дочернем компоненте это выглядит так, будто пропсы изменились, т.к. в JS функции сравниваются по ссылке.
     * И для этого есть useCallback() - пока зависимости не изменились, функция остается той же самой ссылкой.
     */
    const addTask = useCallback((title) => {
        const newTask = {
            // Используем son-server, параметр id будет сгенерирован сервером
            // id: crypto.randomUUID() ?? Date.now().toString(),
            title,
            isDone: false,
        }

        tasksAPI.add(newTask)
            .then((addedTask) => {
                setTasks((prevTasks) => [...prevTasks, addedTask]);
                setNewTaskTitle('');
                setSearchQuery('');
                newTaskInputRef.current.focus();
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

        tasksAPI.getAll().then(setTasks)
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
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
    }
}

export default useTasks
