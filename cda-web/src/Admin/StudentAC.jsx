import React from 'react'
import { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import '../index.css'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import ViewStudent from './ViewStudent'
import { getAllStudent, saveStudent, saveUser } from '../Services/ApiServices'

const StudentAC = () => {

    const token = localStorage.getItem("token");
    const [open, setOpen] = useState(false)
    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        username: "",
        password: "",
    })
    const [stu, setStu] = useState({
        year: ""
    })

    const [fetchedData, setFetchedData] = useState([])

    const handleChanges = (e) => {
        const {name, value} = e.target;
        setStudent(
            { ...student, 
                role : "STUDENT",
                [name]: value 
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(student)

        if (student.name == "" || student.email == "" || student.phone == "" || student.username == "" || student.password == "") {
            toast.error("Please Fill all the fields")
        }
        else {
            try {
                const response = await saveUser(student)
                const uid = response.body.uid;
                saveStudent(uid,stu)
                toast.success("Saved Successfully");

                // Reset input fields
                setUser({
                    name: "",
                    email: "",
                    phone: "",
                    role: "STUDENT",
                    username: "",
                    password: "",
                });

                setStu(stu.year = "")
            } catch (error) {
                console.log("Error Saving Student", error)
                toast.error("Failed to save faculty");
            }
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllStudent();
                setFetchedData(response.data.body)
            } catch (error) {
                console.log(error.response.data)
                setFetchedData(error.response.data.body)
            }
        }
        fetchData()
    }, [])


    return (
        <>
            <Modal isOpen={open} toggle={() => setOpen(false)} className=' text-dark' centered={true}>
                <ModalHeader>
                    <p className='fs-2 text-center'>Create Account</p>
                </ModalHeader>
                <ModalBody>
                    <center>
                        <form onSubmit={handleSubmit} method='post' style={{ width: '400px' }}>
                            <div className="mb-3">
                                <input type="text" name='name' value={student.name} onChange={handleChanges} placeholder='Enter Name' className="form-control" id="name" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <input type="email" name='email' value={student.email} onChange={handleChanges} placeholder='Enter Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <input type="text" name='phone' value={student.phone} onChange={handleChanges} placeholder='Enter PhoneNo' className="form-control" id="phone" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <input type="text" name='username' value={student.username} onChange={handleChanges} placeholder='Enter Username' className="form-control" id="usernmae" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <input type="password" name='password' value={student.password} onChange={handleChanges} placeholder='Enter Password' className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="w-50 btn btn-primary">Create</button>
                            <ToastContainer autoClose={1500} />
                        </form>
                    </center>
                </ModalBody>
            </Modal>

            <h2 style={{ textAlign: 'center', color: 'white' }}>Student Details</h2>
            <div className="d-flex justify-content-end">
                <button type="button" onClick={() => setOpen(!open)} className="btn btn-success mx-3 mb-3">Add Student</button>
            </div>

            <div className='boxmodel-con'>
                <ViewStudent fetchedData={fetchedData} />
            </div>
        </>
    )
}

export default StudentAC
