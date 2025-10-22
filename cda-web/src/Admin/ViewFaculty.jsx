import React, { useState } from 'react'
import Message from '../Component/Message'
import '../Admin/ProfileCard.css'
import { Modal, ModalBody } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useData } from '../Store/DeptData-store';

const ViewFaculty = ({ fetchedData }) => {

    const token = localStorage.getItem("token");
    const { deptData } = useData()
    const [modal, setModal] = useState(false)
    const [did, setDid] = useState(null)
    const [passFaculty, setPassFaculty] = useState({})
    const [officeHours, setOfficeHours] = useState('')

    const handleChange = (e) => {
        setOfficeHours(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = passFaculty.uid;
        const hours = officeHours

        try {
            const response = await fetch(`http://localhost:8080/faculties/${id}/${did}`, {
                method: 'PATCH',
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(passFaculty)
            });
            const hoursRes = await fetch(`http://localhost:8080/faculties/officehours/${id}?officeHours=${hours}`, {
                method: 'PATCH',
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(officeHours)
            })
            const data = await hoursRes.json()
            // console.log(data.body)
            toast.success("Updated Successfully")
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            {fetchedData === 'No Faculties found in Db' ? <Message /> :
                fetchedData.map((data) => (
                    <div key={data.user.uid} className="profile-card bg-dark d-flex justify-content-center" onClick={() => { setPassFaculty(data.user); return setModal(!modal) }}>
                        <div className='d-flex align-items-center'>
                            <img src="https://github.com/mdo.png" alt={`${data.user.name}'s profile`} className="profile-photo" />
                        </div>

                        <div className="profile-details mx-3">
                            <h2 className="profile-name text-light">{data.user.name}</h2>
                            <p className='text-light'>Email: <span className='text-success'>{data.user.email}</span></p>
                            <p className='text-light'>Phone: <span className='text-success'>{data.user.phone}</span></p>
                            <p className='text-light'>Dept: <span className='text-success'>{data.department == null ? 'Not Added' : data.department.dname}</span></p>
                            <p className='text-light'>Status: <span className='text-success'>{data.user.status}</span></p>
                            <p className='text-light'>OfficeHrs: <span className='text-success'>{(data.officeHours == '' || data.officeHours == null) ? 'Not Added' : data.officeHours}</span></p>
                        </div>
                    </div>))
            }


            <Modal isOpen={modal} toggle={() => setModal(false)} style={{ background: '#060505' }} className='cards' centered={true}>
                <ModalBody style={{ background: '#060505' }}>
                    <div className="container mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={passFaculty.name}
                                    className="form-control mx-2 bg-dark text-light"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={passFaculty.email}
                                    className="form-control mx-2 bg-dark text-light"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">ContactNo:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={passFaculty.phone}
                                    className="form-control mx-2 bg-dark text-light"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Department:</label>
                                <select className="form-select mx-2 bg-dark text-light"
                                    onChange={(e) => {
                                        const deptName = e.target.value;
                                        const selectedName = deptData.find(item => item.dname === deptName)
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
                                    value={passFaculty.username}
                                    className="form-control mx-2 bg-dark text-light"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3 fw-bolder d-flex align-items-center">
                                <label className="form-label text-light">Office Hours:</label>
                                <input type='time' onChange={handleChange} value={officeHours} name='officeHours' className="form-control mx-2 bg-dark text-light"/>
                            </div>
                            <button type="submit" className="btn btn-primary ">Submit</button>
                            <ToastContainer autoClose={1500}/>
                        </form>
                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}

export default ViewFaculty
