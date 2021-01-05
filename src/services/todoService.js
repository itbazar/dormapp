import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URL}/todos`;

export const insert = (data) => {
    axios.post(apiUrl, data)
    .then((result) => {return result.data;})
    .catch((error) => {return error});
}

export const insertAsync = async(data) => {
    const response = await axios.post(apiUrl, data);
    return response.data ;
}

export const getAll = () => {
    axios.get(apiUrl)
    .then(result => {return result.data;})
    .catch((error) => {return error;})
}

export const getAllAsync = async() => {
    const response = await axios.get(apiUrl);
    return response.data;
}

