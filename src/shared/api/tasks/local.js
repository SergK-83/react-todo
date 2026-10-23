const STORAGE_KEY = 'tasks';

const read = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (error) {
        return [];
    }
}

const write = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

const delay = (ms = 150) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const localApi = {
    getAll: async () => {
        await delay()

        return read();
    },

    getById: async (id) => {
        await delay();

        return read().find((t) => t.id === id) ?? null;
    },

    add: async (task) => {
        await delay();

        const newTask = {...task, id: crypto?.randomUUID() ?? Date.now().toString()}

        write([...read(), newTask]);

        return newTask;
    },

    delete: async (id) => {
        await delay();

        const tasks = read().filter((t) => t.id !== id);

        write(tasks);
    },

    deleteAll: async () => {
        await delay();

        write([]);
    },

    toggleComplete: async (id, isDone) => {
        await delay();

        const tasks = read()
            .map((t) => t.id === id ? {...t, isDone} : t);

        write(tasks);
    },
};

export default localApi;
