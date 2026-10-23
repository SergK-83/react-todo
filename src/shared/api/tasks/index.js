import localApi from "./local";
import serverAPI from "./server";

const isLocal = import.meta.env.VITE_STATIC_BACKEND === 'true';

const tasksAPI = isLocal ? localApi : serverAPI;

export default tasksAPI;