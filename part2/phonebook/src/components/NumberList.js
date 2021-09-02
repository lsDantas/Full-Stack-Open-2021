const NumberList = ({ persons, filter }) => {
    const matchesSearchTerm = (person) => person.name.includes(filter);
    const selected_people = persons.filter(matchesSearchTerm)

    return (
        <>
            {selected_people.map(person =>
                <Person key={person.name} person={person} />
            )}
        </>
    );
}

const Person = ({ person }) => {
    return (
        <>
            {person.name} {person.number}
            <br></br>
        </>
    );
}

export default NumberList;