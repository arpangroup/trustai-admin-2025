export const config = {
    logEnabled: true,
    useLocalData: false,
    apiBaseUrl: "https://jsonplaceholder.typicode.com", // example
};


export const log = (...args) => {
    if (config.logEnabled) {
        console.log(...args);
    }
};
