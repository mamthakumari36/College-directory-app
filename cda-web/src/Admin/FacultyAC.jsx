import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import ViewFaculty from './ViewFaculty'
import { getAllFaculty, saveFaculty, saveUser } from '../Services/ApiServices'

const FacultyAC = () => {

  const [modal, setModal] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    username: "",
    password: "",
  })
  const [fetchedData, setFetchedData] = useState([])
  const [faculty, setFaculty] = useState({
    officeHours: ""
  })

  const handleChanges = (e) => {
    const {name, value} = e.target
    // setUser(user.role = "FACULTY")
    setUser((prev) => ({ ...prev,
        role : "FACULTY", 
        [name]: value 
      })
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(faculty)
    if (user.name == "" || user.email == "" || user.phone == "" || user.username == "" || user.password == "") {
      toast.error("Please fill all the fields")
    }
    else {
      try {
        const userResponse = await saveUser(user);
        const uid = userResponse.data.body.uid;
        await saveFaculty(uid, faculty);
        toast.success("Saved Successfully");

        // Reset input fields
        setUser({
          name: "",
          email: "",
          phone: "",
          role: "FACULTY",
          username: "",
          password: "",
        });

        setFaculty(faculty.officeHours = "")

      } catch (error) {
        console.log("Error saving faculty:", error)
        toast.error("Failed to save faculty");
      }
    }
  }

  //  Fetch All Faculty details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFaculty();
        // console.log(response.data)
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
      <Modal isOpen={modal} toggle={() => setModal(false)} className=' text-dark' centered={true}>
        <ModalHeader>
          <p className='fs-2 text-center'>Create Account</p>
        </ModalHeader>
        <ModalBody>
          <center>
            <form onSubmit={handleSubmit} method='post' style={{ width: '400px' }}>
              <div className="mb-3">
                <input type="text" name='name' value={user.name} onChange={handleChanges} placeholder='Enter Name' className="form-control" id="name" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <input type="email" name='email' value={user.email} onChange={handleChanges} placeholder='Enter Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <input type="text" name='phone' value={user.phone} onChange={handleChanges} placeholder='Enter PhoneNo' className="form-control" id="phone" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <input type="text" name='username' value={user.username} onChange={handleChanges} placeholder='Enter Username' className="form-control" id="usernmae" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <input type="password" name='password' value={user.password} onChange={handleChanges} placeholder='Enter Password' className="form-control" id="exampleInputPassword1" />
              </div>
              <button type="submit" className="w-50 btn btn-primary">Create</button>
              <ToastContainer autoClose={1500} />
            </form>
          </center>
        </ModalBody>
      </Modal>

      <h2 style={{ textAlign: 'center', color: 'white' }}>Faculty Details</h2>
      <div className="d-flex justify-content-end">
        <button type="button" onClick={() => setModal(!modal)} className="btn btn-success mx-3 mb-3">Add Faculty</button>
      </div>

      <div className='boxmodel-con'>
        {/* {console.log(fetchedData)} */}
        <ViewFaculty fetchedData={fetchedData} />
      </div>
    </>
  )
}

export default FacultyAC
