import React, {useState, useEffect, useContext, createContext} from 'react';

const EshopContext = React.createContext();

const EshopProvider = ({ children }) => {

    const [email, setEmail] = useState("admin@mail.com");
    const [password, setPassword] = useState("pass");
    const [error, setError] = useState("");
    const [account, setAccount] = useState({});

    console.log(account)

    const [isLoading, setIsLoading] = useState(false);
    // error
    // const [error, setError] = useState({ show: false, msg: '' });

    const handleAccount = async (e) => {
        console.log("log")
        e.preventDefault();
        if (email === "" || password === "" ) {
            setError("Enter all fields");
        } else {
            try {
                const settings = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": email,
                        "password": password
                    })
                }
                const response = await fetch("/login", settings);
                if (response.ok) {
                    const data = await response.json();
                    // return <Redirect to='/' />
                    console.log(data)
                    setAccount(data);
                } else {
                    setError("Wrong username or password.")
                }
            } catch (e) {
                console.log(e)
            }
        }

    }

    useEffect(() => {
        console.log("f")
        handleAccount;
    },[]);



    function toggleError(show = false, msg = '') {
        setError({ show, msg });
    }

    return (
        <EshopContext.Provider
            value={{
                error,
                isLoading,
                setPassword, setEmail, handleAccount, account
            }}
        >
            {children}
        </EshopContext.Provider>
    );
};

export { EshopProvider, EshopContext };
