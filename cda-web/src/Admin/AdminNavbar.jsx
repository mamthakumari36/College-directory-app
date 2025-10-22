import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import ProfileCard from './ProfileCard'

const AdminNavbar = () => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <header className="d-flex text-bg-dark flex-wrap justify-content-center py-3  border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <span className="fs-4 text-light">College Directory App</span>
                </a>

                <ul className="nav nav-pills fw-bold">
                    <li className="nav-item"><Link to="/admin" className="nav-link text-info">Dashboard</Link></li>
                    <li className="nav-item"><Link to="/admin/student" className="nav-link text-info">Student</Link></li>
                    <li className="nav-item"><Link to="/admin/faculty" className="nav-link text-info">Faculty</Link></li>
                    <li className="nav-item"><Link to="/admin/dept" className="nav-link text-info">Departments</Link></li>
                    <li className="nav-item"><Link to="/admin/courses" className="nav-link text-info">Course</Link></li>
                    
                    <li className="nav-item">
                        <Link to="#" className="d-flex align-items-center text-info text-decoration-none " data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="" alt="" style={{ border: '1px solid white' }} width="40" height="40" className="rounded-circle me-4" onClick={() => setOpen(!open)} />
                        </Link>
                    </li>
                </ul>
            </header>


            <Modal isOpen={open} toggle={() => setOpen(false)} className='mt-3' centered={true}>
                <ModalHeader>
                    Profile
                </ModalHeader>
                <ModalBody>
                    <ProfileCard />
                </ModalBody>
            </Modal>
        </>
    )
}

export default AdminNavbar
