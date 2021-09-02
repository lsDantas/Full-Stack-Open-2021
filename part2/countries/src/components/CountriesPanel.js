const CountriesPanel = ({ countriesList, query }) => {
    // Check for Query Match
    const matchesQuery = (country) => { 
        // Case Insensitive Search
        const nameLower = country.name.toLowerCase();
        const queryLower = query.toLowerCase();

        return nameLower.includes(queryLower);
    } 
    const select_countries = countriesList.filter(matchesQuery);

    // Display According to Number of Matches
    if (select_countries.length < 10) {
        if (select_countries.length === 1) {
            // Display Country Card
            const profiledCountry = select_countries[0];
            return ( 
                <>
                    <CountryCard key={profiledCountry.name}country={profiledCountry} />
                </>
            );
        }
        else {
            // List Countries
            return (
                <>
                    {select_countries.map(country =>
                        <CountryName key={country.name} name={country.name} />
                    )}
                </>
            );
        }
        
    }
    else {
        // Too Many Matches Scenario
        return (
            <>Too many matches, specify another filter</>
        );
    }
}

const CountryName = ({ name }) => {
    return (
        <>
            {name}
            <br></br>
        </>
    );
}

const CountryCard = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <br></br>
            Capital: {country.capital}
            <br></br>
            Population: {country.population}
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language =>
                    <LanguageName key={language.name} languageName={language.name} />
                )}
            </ul>
            <img src={country.flag} alt={`${country.demonym} flag`}></img>
        </div>     
    );
}

const LanguageName = ({languageName}) => {
    return (
        <li>{languageName}</li>
    );
}

export default CountriesPanel;