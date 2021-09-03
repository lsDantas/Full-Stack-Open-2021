const NewContactForm = ({ entry, addContactHandler, changeEntryHandler }) => {
    return (
        <>
            <form onSubmit={addContactHandler}>
                <div>
                    Name:
                    <input
                        name={entry.name}
                        onChange={changeEntryHandler("name")}
                    />
                    <br></br>
                    Number:
                    <input
                        number={entry.number}
                        onChange={changeEntryHandler("number")}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
}

export default NewContactForm;