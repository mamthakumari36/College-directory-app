import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import ViewDept from './ViewDept';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveDept } from '../Services/ApiServices';

const Department = () => {

    const [modal, setModal] = useState(false);
    const [data, setData] = useState({
        dname: "",
        description: ""
    })

    const handleChanges = (e) => {
        const newData = e.target.name;
        const value = e.target.value;
        setData(
            { ...data, [newData]: value }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let name = e.target[0].value;
        let desc = e.target[1].value;
        if (name == '' || desc == '')
            toast.error("Fill All The Fields");
        else {
            try {
                const response = await saveDept(data);
                toast.success("Saved Successfully");
            } catch (error) {
                console.error("Error While Saving", error)
                toast.error("Failed to save department");
            }
        }
    }

    return (
        <>
            <h2 className='text-center text-light mb-4'>Departments</h2>
            <div className="dept-con">
                <div>
                    <button type="button" onClick={() => setModal(!modal)} className="mx-3 btn btn-success">Add Department</button>

                </div>
                <div className="depts">
                    <ViewDept />
                </div>
            </div>

            <Modal isOpen={modal} toggle={() => setModal(false)} centered={true}>
                <ModalHeader>
                    Add Department
                </ModalHeader>
                <ModalBody>
                    <center>
                        <form onSubmit={handleSubmit} method='post' style={{ width: '400px' }}>
                            <div className="mb-3">
                                <input type="text" name='dname' value={data.dname} onChange={handleChanges} placeholder='Enter department name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <textarea name='description' value={data.description} onChange={handleChanges} placeholder='Enter description' className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <ToastContainer position='top-left' autoClose={1500}/>
                        </form>
                    </center>
                </ModalBody>
            </Modal>
        </>
    )
}

export default Department
