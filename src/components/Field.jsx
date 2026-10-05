const Field = (props) => {
    const {className, id, label, type = 'text', placeholder, onInput} = props;

    return (
        <div className={`field ${className}`}>
            <label
                className="field__label"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="field__input"
                id={id}
                placeholder={placeholder}
                autoComplete="off"
                type={type}
                onInput={onInput}
            />
        </div>
    )
}

export default Field;