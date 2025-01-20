import { useState } from 'react';

function Form  ()  {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const messageRegex = /^[a-zA-Z\s0-9.,!?]+$/;

        let newErrors = {}; 

        if (name === "") {
            newErrors.name = "Name is required";
        } else if (!nameRegex.test(name)) {
            newErrors.name = "Invalid name";
        }

        if (email === "") {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email";
        }

        if (message === "") {
            newErrors.message = "Message is required";
        } else if (!messageRegex.test(message)) {
            newErrors.message = "Invalid message";
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors); 
        } else {
            setError({}); 
            setSubmitted({ name, email, message }); 
            setName("");
            setEmail("");
            setMessage("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
            setError((prev) => ({ ...prev, name: "" })); 
        }
        if (name === "email") {
            setEmail(value);
            setError((prev) => ({ ...prev, email: "" })); 
        }
        if (name === "message") {
            setMessage(value);
            setError((prev) => ({ ...prev, message: "" })); 
        }
    };

    return (
        <div>
            <h1>Contact Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={name} onChange={handleInputChange}/>
                    {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
                </div>
                <br></br>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={handleInputChange}/>
                    {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
                </div>
                <br></br>

                <div>
                    <label>Message:</label>
                    <br></br>
                    <textarea name="message" value={message} onChange={handleInputChange} />
                    {error.message && <p style={{ color: 'red' }}>{error.message}</p>
                    }
                </div>
                <br></br>

                <button type="submit">Submit</button>
            </form>

            {submitted && (
                <div>
                    <h2>Submitted Data:</h2>
                    <p><strong>Name:</strong> {submitted.name}</p>
                    <p><strong>Email:</strong> {submitted.email}</p>
                    <p><strong>Message:</strong> {submitted.message}</p>
                </div>
            )}
        </div>
    );
}

export default Form