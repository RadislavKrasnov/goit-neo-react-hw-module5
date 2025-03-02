import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWRlMTRlZThmZTUzN2JkYzMyYTM0N2E5ZmQ5ZDViOCIsIm5iZiI6MTc0MDkyODU1OC44NzYsInN1YiI6IjY3YzQ3NjJlZGVmYTQyYWEwZjRiMTA3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VF2ZP3aTwTmyK-_dFWqfaV5KSEo13uwrZKK-LrRmrrw';

const request = async (url) => {
    try {
        const response = await axios.get(url);

        return response.data.results ?? response.data;
    } catch(e) {
        console.error(e);

        return [];
    }
};

export default request;
