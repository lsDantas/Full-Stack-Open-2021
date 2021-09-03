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

const updatePerson = (newPerson) => {
    const request = axios.put(`${personsURL}/${newPerson.id}`, newPerson);
    return request.then(response => response.data);
}

const deletePerson = (id) => {
    const request = axios.delete(`${personsURL}/${id}`);
    return request.then(response => response.data);
}

const personsService = { getPersons, createPerson, updatePerson, deletePerson };
export default personsService;