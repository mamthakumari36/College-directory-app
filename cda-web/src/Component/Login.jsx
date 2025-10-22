import React, { useContext, useState, useEffect} from 'react'
import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContex } from '../Store/AuthContex';

const Login = () => {

    const { user, userLogin } = useContext(AuthContex);
    // const userRole = user.role;
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        userType: "",
        username: "",
        password: ""
    })

    
    // ✅ useEffect to handle navigation after user state updates
    useEffect(() => {
        if (user?.role) {
            if (user.role === "ADMINISTRATOR") {
                navigate("/admin");
            } else if (user.role === "STUDENT") {
                navigate("/student");
            } else if (user.role === "FACULTY") {
                navigate("/faculty");
            } else {
                toast.error("Invalid role");
            }
        }
    }, [user, navigate]);

    const handleChanges = (e) => {
        // const newData = e.target.name;
        // const value = e.target.value;
        const {name, value} = e.target;
        setLogin(
            { ...login, [name]: value }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // let role = e.target[0].value;
        // let uName = e.target[1].value;
        // let password = e.target[2].value;

        const { userType, username, password } = login;
        if (userType === 'Select' || username === '' || password === '') {
            toast.error("Enter valid credentials")
        }
        else {
            await userLogin(login);
        }
    }

    // if(userRole != undefined && user.username != undefined && user.password != undefined)
    // {
    //     // console.log(user.name + " " + user.password)
    //     if (userRole== "ADMINISTRATOR") {
    //         navigate("/admin")
    //     }
    //     else if (userRole == 'STUDENT')
    //         navigate("/student")
    //     else if (userRole == 'FACULTY')
    //         navigate("/faculty")
    //     else
    //         toast.error("Invalid Credentials")
    // }
    


    return (
        <center>

            <div className='log-con containers cards' style={{ marginTop: '100px' }}>
                <h3 className='mb-4'>Login</h3>
                <form onSubmit={handleSubmit} method='post' style={{ width: '350px' }}>
                    <div className="mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <select className="form-select" value={login.userType} onChange={handleChanges} name='userType'>
                                    <option>Select</option>
                                    <option>ADMINISTRATOR</option>
                                    <option>STUDENT</option>
                                    <option>FACULTY</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">Select User type</label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={login.username} onChange={handleChanges} name='username' placeholder='Enter Username' className="form-control" id="username" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={login.password} onChange={handleChanges} name='password' placeholder='Enter Password' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <p style={{ marginLeft: '-70px' }}>Don't have an account? <Link to='/registeradmin'>Create Account</Link></p>
                    <button type="submit" className="w-50 btn btn-primary">login</button>
                    <ToastContainer position='top-center' theme='dark' autoClose={1500} />
                </form>
            </div>
        </center>
    )
}

export default Login;
