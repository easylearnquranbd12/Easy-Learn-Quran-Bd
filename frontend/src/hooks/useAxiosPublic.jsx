import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://easy-learn-quran-bd.vercel.app',
    // baseURL: 'https://easy-learn-quran-bd.vercel.app',
    withCredentials: true, // ✅ REQUIRED for cookies to be sent
});


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
