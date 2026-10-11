import Field from "./Field.jsx";
import Button from "./Button.jsx";
import {useContext, useState} from "react";
import {TasksContext} from "../context/TasksContext.jsx";

const AddTaskForm = () => {
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = useContext(TasksContext);

    const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim();
    const isNewTaskTitleEpmty = clearNewTaskTitle.length === 0;

    const onSubmit = (event) => {
        // Браузерное поведени по дефолту перезагрузит страницу, отменяем это
        event.preventDefault();

        if (!isNewTaskTitleEpmty) {
            addTask(clearNewTaskTitle);
        }
    }

    const onInput = (event) => {
        const {value} = event.target;
        const clearValue = value.trim();
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

        setNewTaskTitle(value);
        setError(hasOnlySpaces ? 'The task can not be empty' : '');
    }

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field
                className="todo__field"
                label="New task title"
                id="new-task"
                value={newTaskTitle}
                error={error}
                onInput={onInput}
                ref={newTaskInputRef}
            />
            <Button
                type="submit"
                isDisabled={isNewTaskTitleEpmty}
            >
                Add
            </Button>
        </form>
    )
}

export default AddTaskForm;