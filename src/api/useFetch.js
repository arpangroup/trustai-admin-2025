import { useState, useEffect } from "react";
import { config, log } from "../config";



// Local mock data
const localData = {
    "/posts/1": {id: 1, userId: 1, title: "Local Title", body: "Local Body"},
    "/api/users": [{id: 1, name: "John Doe"}],
    "/api/users/100": {id: 1, name: "John Doe"},
    "/api/products/1": {id: 1, name: "Apple MacBook Pro"}
}


// Custom hook
const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        log(`Fetching data from: ${url}`);
        
        const fetchData = async () => {
            setLoading(true);
            try {
                let result;
                if (config.useLocalData) {
                    log(`🔄 Using local data for: ${url}`);
                    result = getLocalData(url);
                    log(`✅ Local data loaded:`, result);
                } else {
                    log(`🌐 Sending API request to: ${url}`);
                    // const response = await fetch(url, options);
                    const response = await fetch(url, {
                        method: options.method || "GET",
                        headers: {
                            "Content-Type": "application/json",
                            ...options.headers,
                        },
                        body: options.body ? JSON.stringify(options.body) : undefined,
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    result = await response.json();
                    log(`✅ API response received:`, result);
                }
                setData(result);               
            } catch(err) {
                log(`🚨 Fetch error:`, err.message);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();        
    }, [url, JSON.stringify(options)]); // Ensure options are stable
    return { data, loading, error };
};


// Function to extract matching data from localData based on URL
const getLocalData = (url) => {
    if(localData[url]) {
        return localData[url];
    }

    try {
        const path = new URL(url).pathname;
        const urlParts = url.split('/');
        const resource = urlParts[2];
        const id = urlParts[3];

        if(localData[path]) {
            return localData[path];
        }

        const resourceData = localData[`/api/${resource}`];
        if (Array.isArray(resourceData)) {
            const match = resourceData.find(item => item.id.toString() === id);
            return match || { error: "Data not found" };
        }
    } catch (err) {
        log("⚠️ Invalid URL format:", url);
    }
    return {error: "Data not found"};
}

export default useFetch;