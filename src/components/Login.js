import React, { useState } from 'react'


//useHistory is replaced by useNavigate
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    //using useHistory Hook which is now useNavigate
    const navigate = useNavigate();

    //using useState Hook
    const [credentials, setCredentials] = useState({email:"",password:""})

    const handelSubmit = async (e) => {
        e.preventDefault();

        //API call
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
            //save auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully","success");
            navigate("/");
            // navigate('/home');
        }else{
            props.showAlert("Invalid Details","danger");
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
            <form onSubmit={handelSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password" />
                </div>
                <br />
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>


       
        </>
    )
}

export default Login