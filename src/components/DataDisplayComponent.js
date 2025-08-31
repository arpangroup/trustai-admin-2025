import React from "react";
import useFetch from "../api/useFetch";

const DataDisplayComponent = () => {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleClick = () => {
        console.log("button_clicked.....");
    };

    return (
        <div>
            <h1>Data</h1>
            <button onClick={handleClick} id="btn1" className="btn btn-test" data-userid="1">Test</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default DataDisplayComponent;