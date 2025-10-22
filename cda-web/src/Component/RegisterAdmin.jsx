import React, { useState } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterAdmin = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        const newData = e.target.name;
        const value = e.target.value;
        setData(data.role = "ADMINISTRATOR")
        setData(
            { ...data, [newData]: value }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data)
        let name = e.target[0].value;
        let email = e.target[1].value;
        let phone = e.target[2].value;
        let uName = e.target[3].value;
        let password = e.target[4].value;

        if (name === '' || email === '' || phone === '' || uName === '' || password === '') {
            toast.error("Fill all the details")
        }
        else {

            try {
                const response = await fetch("http://localhost:8080/users", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                const savedUser = await response.json();
                const uid = savedUser.body.uid;
                saveAdmin(uid)
                toast.success("Saved Successfully...")
            } catch (error) {
                console.error("Error While Saving Data", error)
            }
        }
    }

    const saveAdmin = async (uid) => {
        try {
            const response = await fetch(`http://localhost:8080/administrator/${uid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log("Error while saving in admin table" + error)
        }
    }

    return (
        <center>
            <div className='m-5 containers cards'>

                <h3 className='mb-4 '>Create Account</h3>

                <form onSubmit={handleSubmit} method='post' style={{ width: '400px' }}>
                    <div className="mb-3">
                        <input type="text" value={data.name} onChange={handleInput} name='name' placeholder='Enter Your Name' className="form-control" id="name" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="email" value={data.email} onChange={handleInput} name='email' placeholder='Enter Your Email' className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={data.phone} onChange={handleInput} name='phone' placeholder='Enter Your PhoneNo' className="form-control" id="phone" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={data.username} onChange={handleInput} name='username' placeholder='Enter Username' className="form-control" id="username" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={data.password} onChange={handleInput} name='password' placeholder='Enter Password' className="form-control" id="password" />
                    </div>
                    <p style={{ marginLeft: '-170px' }}>Already have an account? <Link to='/'>Login</Link></p>
                    <button type="submit" className="w-50 btn btn-primary">Create</button>
                    <ToastContainer position='top-center' theme='dark' autoClose={1500} />
                </form>
            </div>
        </center>
    )
}

export default RegisterAdmin
