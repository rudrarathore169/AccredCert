import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AppContext = createContext();

const Context = ({ children }) => {
    const [services, setServices] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [certificates,setCertificates]=useState([])
    // Fetch services

    const callservices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/getservices');
            console.log(response.data)
            setServices(response.data);
        } catch (err) {
            console.error("Error fetching services:", err);
        }
    };

    // Fetch blogs
    const callblogs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/getblogs');
            setBlogs(response.data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    const callcertificates = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/getcertificates');
            setCertificates(response.data);
        } catch (err) {
            console.error("Error fetching certificates:", err);
        }
    };



    // Initial load
    useEffect(() => {
        callservices();
        callblogs();
        callcertificates()
    }, []);

    return (
        <AppContext.Provider value={{ services, callservices, blogs, callblogs ,certificates,callcertificates}}>
            {children}
        </AppContext.Provider>
    );
};

export default Context;
