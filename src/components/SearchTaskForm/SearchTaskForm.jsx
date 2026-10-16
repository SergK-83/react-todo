import Field from "../Field/Field.jsx";
import {useContext} from "react";
import {TasksContext} from "../../context/TasksContext.jsx";

const SearchTaskForm = (props) => {
    const {styles} = props;

    const {
        searchQuery,
        setSearchQuery
    } = useContext(TasksContext);

    return (
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <Field
                className={styles.field}
                label="Search task"
                id="search-task"
                type="search"
                value={searchQuery}
                onInput={({target}) => setSearchQuery(target.value)}
            />
        </form>
    )
}

export default SearchTaskForm;