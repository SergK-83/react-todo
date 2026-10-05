import Field from "./Field.jsx";

const SearchTaskForm = (props) => {
    const {
        onSearchInput
    } = props;

    return (
        <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
            <Field
                className="todo__field"
                label="Search task"
                id="search-task"
                type="search"
                onInput={({target}) => onSearchInput(target.value)}
            />
        </form>
    )
}

export default SearchTaskForm;