const User = require('../models/user');

const initialUsers = [
    {
        username: 'TheOrwell',
        name: 'George Orwell',
        passwordHash: '$2b$10$IQPl2ATeVUawVXHvD0anCecciSFXvd1Swp/Pi1asQJi4fVPxDPv/i',
    },
    {
        username: 'Roach',
        name: 'Franz Kafka',
        passwordHash: '$2b$10$N2D.pl1NmagX8e.a6pi2purCw.Hu.V2Yyx8LwncKz2z6Yivy6n7re',
    },
    {
        username: 'SoItGoes',
        name: 'Kurt Vonnegut',
        passwordHash: '$2b$10$N2D.pl1NmagX8e.a6pi2purCw.Hu.V2Yyx8LwncKz2z6Yivy6n7re',
    },
];

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

module.exports = {
    initialUsers, usersInDb,
};
