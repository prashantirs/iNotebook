import React, { useState } from 'react'

import "./Login Form/style.css"
import logo from './Login Form/image/prashant.png';

//useHistory is replaced by useNavigate
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    //using useHistory Hook which is now useNavigate
    const navigate = useNavigate();

    //using useState Hook
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })


    const handelSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        //API call
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //save auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            // navigate('/home');
            props.showAlert("Account Created Successfully", "success");
        } else {
            props.showAlert("Invalid Crdentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handelSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  minLength={5} required onChange={onChange} placeholder="Password" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required  onChange={onChange} placeholder="Confirm Password" />
                </div>

                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>



          
        </>
    )
}

export default Signup