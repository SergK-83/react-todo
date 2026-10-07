import Field from "./Field.jsx";

const SearchTaskForm = (props) => {
    const {
        searchQuery,
        setSearchQuery
    } = props;

    return (
        <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
            <Field
                className="todo__field"
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