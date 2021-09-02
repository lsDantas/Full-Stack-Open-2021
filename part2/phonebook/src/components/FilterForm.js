const FilterForm = ({ filter, changeFilter }) => {
    return (
        <div>
            Filter shown with a
            <input
                name={filter}
                onChange={changeFilter}
            />
        </div>
    );
}

export default FilterForm