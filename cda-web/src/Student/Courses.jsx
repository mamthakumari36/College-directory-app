import React, { useContext, useEffect, useState } from 'react'
import { AuthContex } from '../Store/AuthContex'

const Courses = () => {

    const token = localStorage.getItem("token")
    const [course, setCourse] = useState([])
    const { user } = useContext(AuthContex)
    // console.log(user)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:8080/enrollments`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                setCourse(data.body)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourse()
    }, [])

    return (
        <>
            <h3 className='text-center text-light mb-4'>Enrolled Courses</h3>
            {/* {console.log(course)} */}
            {course == 'No enrollments found' ? <Message /> :
                course.map((data) => (
                    (data.student.id == user.uid) && <button key={data.id} className='btn btn-info mx-3'>{data.course.title}</button>
                    // console.log(data)
                ))
            }

        </>
    )
}

export default Courses
