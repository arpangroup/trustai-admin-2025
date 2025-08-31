// EventFlusher.js
import { useEffect, useState } from "react";
import globalEventLogger from "./globalEventLogger";
import useFetch from "../api/useFetch";

const EventFlusher = () => {
    console.log("EventFlusher......");
    const [payload, setPayload] = useState(null);
    const [trigger, setTrigger] = useState(0); // used to trigger useFetch manually

    const { data, loading, error } = useFetch("/api/events", {
        method: "POST",
        body: payload
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const events = globalEventLogger.getEvents();
            if (events.length > 0) {
                setPayload({ events }); // This will trigger a POST
                setTrigger(t => t + 1);
            }
        }, 5000); // every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Clear events after successful send
    useEffect(() => {
        if (data && !loading && !error) {
            globalEventLogger.clearEvents();
            console.log("✅ Events flushed:", data);
        }
    }, [data, loading, error]);

    return null; // no UI
};

export default EventFlusher;
