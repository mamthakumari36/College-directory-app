import React, { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import ViewCourse from './ViewCourse';
import { toast, ToastContainer } from 'react-toastify';
import { saveCourse } from '../Services/ApiServices';

const Course = () => {

    const [course, setCourse] = useState(false);
    const [courseData, setCourseData] = useState({
        title: "",
        description: ""
    })

    const handleChanges = (e) => {
        let newData = e.target.name;
        let value = e.target.value;
        setCourseData(
            { ...courseData, [newData]: value }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(courseData)
        let title = e.target[0].value;
        let dept = e.target[1].value;
        if (title == '' || dept == '')
            toast.error("Fill All The Fields")
        else {
            try {
                const response = await saveCourse(courseData)
                toast.success("Course Saved Successfully")
            } catch (error) {
                console.log(error)
                toast.error("Failed to save course");
            }
        }
    }

    return (
        <>
            <h2 className='text-center text-light mb-4'>Courses</h2>
            <div className="dept-con">
                <div>
                    <button type="button" onClick={() => setCourse(!course)} className=" mx-3 btn btn-success">Add Course</button>
                </div>

                <div className="depts">
                    <ViewCourse courseData={courseData}/>
                </div>
            </div>

            <Modal isOpen={course} toggle={() => setCourse(false)} centered={true}>
                <ModalHeader>
                    Add Course
                </ModalHeader>
                <ModalBody>
                    <center>
                        <form onSubmit={handleSubmit} method='post' style={{ width: '400px' }}>
                            <div className="mb-3">
                                <input type="text" name='title' value={courseData.title} onChange={handleChanges} placeholder='Enter Course Name' className="form-control" id="cname" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <textarea name='description' value={courseData.description} onChange={handleChanges} placeholder='Enter description' className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <ToastContainer position='top-center' autoClose={1500}/>
                        </form>
                    </center>
                </ModalBody>
            </Modal>


        </>
    )
}

export default Course
