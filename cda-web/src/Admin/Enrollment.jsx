import React, { useEffect, useState } from 'react'
import Message from '../Component/Message'
import { Modal, ModalBody } from 'reactstrap'
import { toast, ToastContainer } from 'react-toastify'
import { getAllCourses, getAllEnrollment, saveEnrollment } from '../Services/ApiServices'
// import './Enrollment.css'

const Enrollment = ({ sid }) => {

    const token = localStorage.getItem("token");
    const [course, setCourse] = useState([])
    const [enroll, setEnroll] = useState([])
    const [modal, setModal] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (e.target[0].value == '') {
            toast.error("Select Any Course")
        }
        else {
            try {
                const response = await saveEnrollment(sid, selectedCourse)
                toast.success("Enrolled Successfully")
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllCourses();
            const data = await response.json()
            setCourse(data.body);
        }
        fetchData()
        const enrollData = async () => {
            const response = await getAllEnrollment()
            const data = await response.json()
            setEnroll(data.body)
        }
        enrollData()
        // console.log(enroll)
    }, [])



    return (
        <>
            <h3>Courses Enrolled</h3>
            {enroll == 'No enrollments found' ? <Message /> :
                enroll.map((data) => (
                    (data.student.id == sid) && <button key={data.id} className='btn btn-info mx-3'>{data.course.title}</button>

                ))
            }

            <div className="d-flex flex-row-reverse">
                <button className="btn btn-success" onClick={() => setModal(!modal)}><a>Add Course</a></button>
            </div>


            <Modal isOpen={modal} toggle={() => setModal(false)}>
                <ModalBody>
                    {course == 'No Courses found in the db' ? <Message /> :
                        <form onSubmit={handleSubmit} action="">
                            <div className="app-container">
                                <div className="form-container">
                                    <select
                                        className="select-field "
                                        onChange={(e) => {
                                            const cName = e.target.value;
                                            const selectedName = course.find(item => item.title === cName)
                                            setSelectedCourse(selectedName ? selectedName.cid : null)
                                            // console.log(selectedCourse)
                                        }}
                                    >
                                        <option value="">Select an option</option>
                                        {course.map((data) => (
                                            <option key={data.cid} value={data.title}>{data.title}</option>
                                        ))}
                                    </select>
                                    <button type="submit" className="submit-button">
                                        Submit
                                    </button>
                                    <ToastContainer autoClose={1500}/>
                                </div>
                            </div>
                        </form>
                    }
                </ModalBody>
            </Modal>
        </>
    )
}

export default Enrollment
