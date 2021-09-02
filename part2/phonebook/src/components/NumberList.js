const NumberList = ({ persons, filter, deleteHandler }) => {
    const matchesSearchTerm = (person) => person.name.includes(filter);
    const selected_people = persons.filter(matchesSearchTerm)

    return (
        <>
            {selected_people.map(person =>
                <Person key={person.name} person={person} deleteHandler={deleteHandler} />
            )}
        </>
    );
}

const Person = ({ person, deleteHandler }) => {
    return (
        <>
        <form onSubmit={deleteHandler(person.id)} >
            {person.name} {person.number}
            <button type="submit">Delete</button>
            <br></br>
        </form>
        </>
    );
}

export default NumberList;