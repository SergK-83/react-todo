import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";
import {useEffect, useRef, useState} from "react";
import Button from "./Button.jsx";

const Todo = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');

        if (savedTasks) {
            return JSON.parse(savedTasks);
        }

        return [
            {id: 'task-1', title: 'Купить молоко', isDone: false},
            {id: 'task-2', title: 'Погладить кота', isDone: true},
        ]
    });

    // useState — состояние компонента
    // Зачем нужен: хранить данные, изменение которых должно перерисовать компонент и обновить UI.
    // Ключевое свойство: вызов setCount запускает ре-рендер, и новое значение попадает в разметку.
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // useRef — «коробка» для значений без ре-рендера
    // Зачем нужен: хранить мутируемое значение, которое не влияет на отрисовку, либо получить прямую ссылку на DOM-узел.
    const newTaskInputRef = useRef(null);
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id;

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

    const addTask = () => {
       if (newTaskTitle.trim().length > 0) {
           const newTask = {
               id: crypto.randomUUID() ?? Date.now().toString(),
               title: newTaskTitle,
               isDone: false,
           }

           setTasks([...tasks, newTask]);
           setNewTaskTitle('');
           setSearchQuery('');
           newTaskInputRef.current.focus();
       }
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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
    }, []);

    const renderCount = useRef(0);

    // Без второго аргумента эффект срабатывает после каждого рендера.
    useEffect(() => {
        renderCount.current++;
        console.log(`Компонент Todo отрендерился ${renderCount.current} раз(а)`);
    });

    const clearSearchQuery = searchQuery.trim().toLowerCase();

    const filteredTasks = clearSearchQuery.length > 0
        ? tasks.filter((t) => t.title.toLowerCase().includes(clearSearchQuery))
        : null;

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({isDone}) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button
                onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}
            >
                Show first incomplete task
            </Button>
            <TodoList
                tasks={tasks}
                filteredTasks={filteredTasks}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstIncompleteTaskId={firstIncompleteTaskId}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    )
}

export default Todo;