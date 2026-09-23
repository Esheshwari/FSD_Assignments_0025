// import { useState } from "react";
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Forms() {
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");


    function handleSubmit(event) {
        console.log(`Name: ${name}, Password: ${password}`);
        toast.success('Form submitted successfully!');
        console.log("Form submitted successfully!");
        event.preventDefault();
        // alert("Form submitted successfully!");
    }

    
    return (
        <div>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}


export default Forms