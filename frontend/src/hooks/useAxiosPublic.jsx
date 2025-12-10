import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'https://api.betheshape.com',
    withCredentials: true, // ✅ REQUIRED for cookies to be sent
});


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
