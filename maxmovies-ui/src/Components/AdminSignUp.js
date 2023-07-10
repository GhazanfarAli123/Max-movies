import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const AdminSignUp = () => {
    const [name ,setName] = useState("")
    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    let navigate = useNavigate();
     const handelSubmit = async(e) =>{
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:1000/api/v1/auth/register",{name,email,password})
        }catch(err){
            console.log(err) 
           }
     }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8'>
                        <form onClick={handelSubmit}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" class="form-control" id="name" name='name' aria-describedby="emailHelp" placeholder="Enter Your name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="text" class="form-control" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className='col-2'></div>
                </div>
            </div>
        </>
    )
}

export default AdminSignUp