import React, { useEffect, useState } from "react";

// Server Communication
import axios from 'axios'


const CountriesPanel = ({ countriesList, query, changeToggle, weather, checkWeather }) => {
    // Check for Query Match
    const matchesQuery = (country) => { 
        // Case Insensitive Search
        const nameLower = country.name.toLowerCase();
        const queryLower = query.toLowerCase();

        return nameLower.includes(queryLower);
    } 
    const select_countries = countriesList.filter(matchesQuery);

    // Display Countries According to Number of Matches
    if (select_countries.length < 10) {
        if (select_countries.length === 1) {
            // Display Country Card
            const profiledCountry = select_countries[0];
            return ( 
                <>
                    <CountryCard key={profiledCountry.name}country={profiledCountry} />
                    <WeatherPanel key={profiledCountry.capital} city={profiledCountry.capital} weather={weather} checkWeather={checkWeather}/>
                </>
            );
        }
        else {
            // List Countries
            return (
                <>
                    {select_countries.map(select_country =>
                        <CountryName key={select_country.name} country={select_country} changeToggle={changeToggle} />
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

const CountryName = ({ country, changeToggle}) => {
    // Decide Between Name or Country Card Display
    const toggleOption = country.show ? "Hide" : "Show";
    let country_info;
    if(country.show) {
        country_info = (
            <>
                <CountryCard key={country.name} country={country} />
            </>
        );
    }
    else {
        country_info = (
            <>
            </>
        );
    }

    return (
        <>
            {country.name} <button type="submit" onClick={changeToggle(country.name)}>{toggleOption} </button>
            <br></br>
            {country_info}
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

const WeatherPanel = ({ city, weatherData, weather, checkWeather}) => {
    useEffect(checkWeather(city), []);

    return (
        <div>
            <h2>Weather in {city}</h2>
            <b>Temperature: </b> {weather.temperature} Celsius
            <br></br>
            <b>Wind</b> {weather.wind_speed} mph Direction {weather.wind_direction}
        </div>
    )
}

export default CountriesPanel;