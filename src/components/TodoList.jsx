import TodoItem from "./TodoItem.jsx";

const TodoList = (props) => {
    const {
        tasks = [],
        filteredTasks,
        onDeleteTaskButtonClick,
        onTaskCompleteChange
    } = props;

    const hasTasks = tasks.length > 0;
    const isEpmtyFilteredTasks = filteredTasks?.length === 0;

    if (!hasTasks) {
        return (
            <div className="todo__empty-message">There are no tasks yet</div>
        )
    }

    if (hasTasks && isEpmtyFilteredTasks) {
        return (
            <div className="todo__empty-message">Tasks not found</div>
        )
    }

    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map((task) => (
                <TodoItem
                    className="todo__item"
                    key={task.id}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskCompleteChange={onTaskCompleteChange}
                    {...task}
                />
            ))}
        </ul>
    )
}

export default TodoList