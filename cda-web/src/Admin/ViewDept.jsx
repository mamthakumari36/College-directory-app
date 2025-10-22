import { useEffect, useState } from 'react';
import Message from '../Component/Message';
import { useData } from '../Store/DeptData-store'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const ViewDept = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const { deptData } = useData();
    const [modal, setModal] = useState(false);
    const [dept, setDept] = useState({
        dname:"",
        description:""
    });
    const [did,setDid] = useState(null)

    const handleChanges = (e) => {
        const newData = e.target.name;
        const value = e.target.value;
        setDept(
            { ...dept, [newData]: value }
        )
    }

    const handleUpdate = async (did) => {
        try {
            const response = await fetch(`http://localhost:8080/department/${did}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json();
            setDept(data.body)
            console.log(data.body)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
        try {
            const response = await fetch(`http://localhost:8080/department/${did}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(dept)
            })
            toast.success("Updated Successfylly")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {(deptData == 'No Departments Found in the DB') ? <Message /> :
                deptData.map((item) => (
                    <div key={item.did} className="card text-bg-dark" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{item.dname}</h5>
                            <p className="card-text">{item.description}</p>
                            <button className="btn btn-info" onClick={() => { handleUpdate(item.did); setDid(item.did); return setModal(!modal) }}>Update</button>
                            <a href="#" className="btn btn-danger mx-3">Delete</a>
                        </div>
                    </div>
                ))
            }

            <Modal isOpen={modal} toggle={() => setModal(false)}>
                <ModalHeader>Update Department</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit} method='post' style={{ width: '400px' }}>
                        <div className="mb-3">
                            <label htmlFor="" className='fw-bold'>Name :</label>
                            <input type="text" name='dname' value={dept.dname} onChange={handleChanges} placeholder='Enter department name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="" className='fw-bold'>Description :</label>
                            <textarea name='description' value={dept.description} onChange={handleChanges} placeholder='Enter description' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                        <ToastContainer position='top-left' autoClose={1500} />
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ViewDept
