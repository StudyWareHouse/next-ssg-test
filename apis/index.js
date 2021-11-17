import axios from 'axios';

export const fetchRandomPeople = async () => await axios.get('https://randomuser.me/api/');