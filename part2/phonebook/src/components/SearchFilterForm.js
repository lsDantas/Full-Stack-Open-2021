const SearchFilterForm = ({ filterQuery, changeFilterQuery }) => {
    return (
        <div>
            Filter shown with a
            <input
                name={filterQuery}
                onChange={changeFilterQuery}
            />
        </div>
    );
}

export default SearchFilterForm;