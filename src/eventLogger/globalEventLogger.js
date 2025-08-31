
import { config, log } from "../config";

const eventQueue = [];


const logEvent = (eventType, eventData) => {
    const event = {
        type: eventType,
        data: eventData,
        timestamp: new Date().toISOString(),
    };
    eventQueue.push(event);
    log(`Event: `, event);
}

const getEvents = () => {
    return [...eventQueue];
};

const clearEvents = () => {
    eventQueue.length = 0;
};

const setupGlobalEventListeners = () => {
    document.addEventListener('click', (event) => {
        console.log("EVENT: ", event);
        const target = event.target;
        if (target) {
            logEvent('click', {
                tagName: target.tagName,
                id: target.id,
                className: target.className,
                dataset: target.dataset,
                name: target.name
            });
        }
    });

    // Add more event listener as needed
};


export default {
    setupGlobalEventListeners,
    getEvents,
    clearEvents
};