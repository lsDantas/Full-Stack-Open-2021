const SearchForm = ({ query, changeQuery }) => {
    return (
        <div>
            Find countries
            <input
                query={query}
                onChange={changeQuery}
            />
        </div>
    );
}

export default SearchForm;