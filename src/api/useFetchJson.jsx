import { useState, useEffect } from 'react';

/**
 * Fetch example Json data
 * Not recommended for production use!
 */
export const useFetchJson = (url) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        console.log("useFetchJson.......");

        const fetchData = async () => {
            try{            
                const resp = await fetch(url);    
                const json = await resp.json();
                console.log("RANK_DATA TYPE:", typeof data, Array.isArray(json));
                console.log("RANK_DATA: ", json)
                
                if (!resp.ok) throw new Error(json.message || 'Fetch error');

                if (active) {
                    setData(json);
                    setLoading(false);
                }

            } catch (err) {
                if (active) {
                    setError(err);
                    setLoading(false);
                }
            }
        };
        fetchData();

        return () => {
            active = false; // Prevent state update on unmounted component
        };

    }, [url]);
    return { data, loading, error };
};
