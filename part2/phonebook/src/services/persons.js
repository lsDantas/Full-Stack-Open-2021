import axios from 'axios';
const personsURL = "http://localhost:3001/persons";

const getPersons = () => {
    const request = axios.get(personsURL);
    return request.then(response => response.data);
}

const createPerson = (newPerson) => {
    const request = axios.post(personsURL, newPerson);
    return request.then(response => response.data);
};

const personsService = { getPersons, createPerson }
export default personsService;