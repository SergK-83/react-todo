import {memo, useContext} from "react";
import {TasksContext, TodoItem} from "@/entities/todo";

const TodoList = (props) => {
    const {styles} = props;

    const {
        tasks,
        filteredTasks
    } = useContext(TasksContext);

    const hasTasks = tasks.length > 0;
    const isEpmtyFilteredTasks = filteredTasks?.length === 0;

    if (!hasTasks) {
        return (
            <div className={styles.emptyMessage}>There are no tasks yet</div>
        )
    }

    if (hasTasks && isEpmtyFilteredTasks) {
        return (
            <div className={styles.emptyMessage}>Tasks not found</div>
        )
    }

    return (
        <ul className={styles.list}>
            {(filteredTasks ?? tasks).map((task) => (
                <TodoItem
                    className={styles.item}
                    key={task.id}
                    {...task}
                />
            ))}
        </ul>
    )
}

export default memo(TodoList)