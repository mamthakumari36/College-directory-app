import React, { useEffect, useState } from 'react'
import { TiDelete } from "react-icons/ti";
import { Modal, ModalBody } from 'reactstrap';
import { useData } from '../Store/DeptData-store';
import Message from '../Component/Message';
import { toast, ToastContainer } from 'react-toastify';

const ViewCourse = ({ courseData }) => {

  const token = localStorage.getItem("token")
  const { deptData } = useData()
  const [dispalyCourse, setdispalyCourse] = useState([]);
  const [open, setOpen] = useState(false)
  const [passCourse, setPassCourse] = useState({})
  const [faculty, setFaculty] = useState([])
  const [did, setDid] = useState(null)
  const [fid, setFid] = useState(null)
  const [cid, setCid] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/course',{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setdispalyCourse(data.body);
    }
    const fetchFaculty = async () => {
      try{
          const response = await fetch('http://localhost:8080/faculties',{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        if(Array.isArray(data)){
          setFaculty(data.body)
        }else{
          setFaculty([])
        }
      }
      catch(error){
        console.log("Error fetching faculty:", error)
        setFaculty([])
      }
    }
    fetchData()
    fetchFaculty()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target[1].value == 'Select' || e.target[2].value == 'Select') {
      toast.error("Fill All The Fields")
    }
    else {
      try {
        const response1 = await fetch(`http://localhost:8080/course/faculty/${cid}/${fid}`, {
          method: 'PATCH',
          headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
           },
          body: JSON.stringify(dispalyCourse)
        })
        const response2 = await fetch(`http://localhost:8080/course/department/${cid}/${did}`, {
          method: 'PATCH',
          headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
           },
          body: JSON.stringify(dispalyCourse)
        })
        toast.success("Updated Successfully")
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <>
      {dispalyCourse == 'No Courses found in the db' ? <Message /> :
        dispalyCourse.map((courseList) => (
          <div className="card text-bg-dark" key={courseList.cid} onClick={() => { setPassCourse(courseList); return setOpen(!open) }} style={{ width: "18rem" }} >
            <div className="d-flex flex-row-reverse">
              <TiDelete color='red' className='fs-2 text-xl-end ' />

            </div>

            <div className="card-body">
              <h5 className="card-title">{courseList.title}</h5>
              <p className="card-text">Description : {courseList.description} </p>
              {courseList.faculty == null ?
                <p className="card-text">Faculty : Not Added</p>
                : <p className="card-text">Faculty : {courseList.faculty.user.name}</p>
              }
              {courseList.department == null ?
                <p className="card-text">Dept : Not Added</p>
                : <p className="card-text">Dept : {courseList.department.dname}</p>
              }
            </div>
          </div >
        ))
      }

      <Modal isOpen={open} toggle={() => setOpen(false)} centered={true}>
        <ModalBody >
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input type="text" value={passCourse.title} className="form-control" id="inputEmail3" readOnly />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="faculty" className="col-sm-2 col-form-label">Faculty</label>
              <div className="col-sm-10">
                <select className="form-select" name='faculty' onChange={(e) => {
                  const facultyName = e.target.value;
                  const selectedName = faculty.find(item => item.user.name === facultyName)
                  // console.log(selectedName)
                  setFid(selectedName ? selectedName.fid : null)
                  setCid(passCourse.cid)
                }}>
                  <option>Select</option>
                  {faculty.length > 0 ? (
                    faculty.map(f => (
                        <option key={f.fid} value={f.user.name}>{f.user.name}</option>
                      ))
                    ) : (
                      <option disabled>No Faculty Found</option>
                  )}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="dept" className="col-sm-2 col-form-label">Department</label>
              <div className="col-sm-10">
                <select className="form-select" name='department' onChange={(e) => {
                  const deptName = e.target.value;
                  const selectedName = deptData.find(item => item.dname === deptName)
                  // console.log(selectedName)
                  setDid(selectedName ? selectedName.did : null)
                  setCid(passCourse.cid)
                }}>
                  <option>Select</option>
                  {(deptData == 'No Departments Found in the DB') ? <option></option> :
                  deptData.map((dept) => (
                    <option key={dept.did} value={dept.name}>{dept.dname}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="desc" className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <textarea className="form-control" value={passCourse.description} id="desc" readOnly />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" >Update</button>
          </form>
        </ModalBody>
        <ToastContainer autoClose={1500} />
      </Modal>
    </>
  )
}

export default ViewCourse
