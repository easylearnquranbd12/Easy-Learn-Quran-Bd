import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://learning-quiz-platfrom-paid-project-ten.vercel.app',
    // baseURL: 'https://learning-quiz-platfrom-paid-project-ten.vercel.app',
    withCredentials: true, // ✅ REQUIRED for cookies to be sent
});


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
