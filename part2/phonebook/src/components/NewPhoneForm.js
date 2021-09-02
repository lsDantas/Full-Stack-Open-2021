const NewPhoneForm = ({ entry, addHandler, changeEntry }) => {
    return (
        <>
            <form onSubmit={addHandler}>
                <div>
                    Name:
                    <input
                        name={entry.name}
                        onChange={changeEntry("name")}
                    />
                    <br></br>
                    Number:
                    <input
                        number={entry.number}
                        onChange={changeEntry("number")}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
}

export default NewPhoneForm;