import localApi from "./local";
import serverAPI from "./server";

const isLocal = () => {
    console.log('MODE:', import.meta.env.MODE);
    console.log('ENV:', import.meta.env);
    console.log('VITE_STATIC_BACKEND:', import.meta.env.VITE_STATIC_BACKEND);

    return import.meta.env.VITE_STATIC_BACKEND === 'true';
}

const tasksAPI = isLocal() ? localApi : serverAPI;

export default tasksAPI;