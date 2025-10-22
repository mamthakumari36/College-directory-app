import React, { useState } from 'react'
import Message from '../Component/Message'
import '../Admin/ProfileCard.css'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useData } from '../Store/DeptData-store';
import { toast, ToastContainer } from 'react-toastify';
import Enrollment from './Enrollment';

const ViewStudent = ({ fetchedData }) => {

    const token = localStorage.getItem("token")
    const { deptData } = useData()
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false)
    const [did, setDid] = useState(null)
    const [passStudent, setPassStudent] = useState({})
    const [year, setYear] = useState(null)

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setPassStudent({ ...passStudent, [name]: value });
        setYear(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = passStudent.uid;
        const yearVal = year

        try {
            const response = await fetch(`http://localhost:8080/students/${id}/${did}`, {
                method: 'PATCH',
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(passStudent)
            });
            const yearRes = await fetch(`http://localhost:8080/students/${id}?year=${yearVal}`, {
                method: 'PATCH',
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(year)
            })
            const data = await yearRes.json()
            // console.log(data.body)
            toast.success("Updated Successfully")
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            {fetchedData === 'No Students Found' ? <Message /> :
                fetchedData.map((data) => (
                    <div key={data.user.uid} className="profile-card bg-dark ">

                        <div className='d-flex justify-content-center' onClick={() => { setPassStudent(data.user); return setModal(!modal) }}>
                            <div className='d-flex align-items-center'>
                                <img src="https://github.com/mdo.png" alt={`${data.user.name}'s profile`} className="profile-photo" />
                            </div>

                            <div className="profile-details mx-3">
                                <h2 className="profile-name text-light">{data.user.name}</h2>
                                <p className='text-light'>Email: <span className='text-success'>{data.user.email}</span></p>
                                <p className='text-light'>Phone: <span className='text-success'>{data.user.phone}</span></p>
                                <p className='text-light'>Dept: <span className='text-success'>{data.department == null ? 'Not Added' : data.department.dname}</span></p>
                                <p className='text-light'>Status: <span className='text-success'>{data.user.status}</span></p>
                                <p className='text-light'>Year: <span className='text-success'>{(data.year == '' || data.year == null) ? 'Not Added' : data.year}</span></p>
                            </div>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-danger" onClick={() => { setPassStudent(data.user); return setModal2(!modal2) }}><a>Enroll To Course</a></button>
                        </div>
                    </div>))

            }

            <Modal isOpen={modal2} size='lg' toggle={() => setModal2(false)} >
                <ModalHeader>
                    Enroll Student to Course
                </ModalHeader>
                <ModalBody>
                    <Enrollment sid={passStudent.uid} />
                </ModalBody>
            </Modal>

            <Modal isOpen={modal} toggle={() => setModal(false)} style={{ background: '#060505' }} className='cards' centered={true}>
                <ModalBody style={{ background: '#060505' }}>
                    <div className="container mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={passStudent.name}
                                    onChange={handleChange}
                                    className="form-control mx-2 bg-dark text-light"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={passStudent.email}
                                    onChange={handleChange}
                                    className="form-control mx-2 bg-dark text-light"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">ContactNo:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={passStudent.phone}
                                    onChange={handleChange}
                                    className="form-control mx-2 bg-dark text-light"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Department:</label>
                                <select className="form-select mx-2 bg-dark text-light"
                                    required
                                    onChange={(e) => {
                                        const deptName = e.target.value;
                                        const selectedName = deptData.find(item => item.dname === deptName)
                                        // console.log(selectedName)
                                        setDid(selectedName ? selectedName.did : null)
                                    }
                                    } name='department'>
                                    <option value='' >Select</option>
                                    {(deptData == 'No Departments Found in the DB') ? <option></option> :
                                    deptData.map((dept) => (
                                        <option key={dept.did} value={dept.name}>{dept.dname}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Status:</label>
                                <select
                                    name="status"
                                    onChange={handleChange}
                                    className="form-select mx-2 bg-dark text-light"
                                    required
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="InActive">InActive</option>
                                </select>
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={passStudent.username}
                                    onChange={handleChange}
                                    className="form-control mx-2 bg-dark text-light"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Year:</label>
                                <select className="form-select mx-2 bg-dark text-light"
                                    onChange={handleChange} name='year'>
                                    <option value="">Select</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary ">Submit</button>
                            <ToastContainer autoClose={1500} />
                        </form>
                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}

export default ViewStudent
