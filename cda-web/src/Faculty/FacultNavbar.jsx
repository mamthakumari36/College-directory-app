import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ProfileCard from '../Admin/ProfileCard';

const FacultyNavbar = () => {

    const [modal, setModal] = useState(false);

    return (
        <>
            <header className="d-flex text-bg-dark flex-wrap justify-content-center py-3  border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <span className="fs-4 text-light">College Directory App</span>
                </a>

                <ul className="nav nav-pills fw-bold">
                    <li className="nav-item"><Link to="/faculty" className="nav-link text-info">Course</Link></li>
                    <li className="nav-item">
                        <Link to="#" className="d-flex align-items-center text-info text-decoration-none " data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="" alt="" onClick={() => setModal(!modal)} style={{ border: '1px solid white' }} width="40" height="40" className="rounded-circle mx-4 me-4" />
                        </Link>
                    </li>
                </ul>
            </header>

            <Modal isOpen={modal} toggle={()=>setModal(false)} centered={true}>
                <ModalHeader>Profile</ModalHeader>
                <ModalBody>
                    <ProfileCard/>
                </ModalBody>

            </Modal>
        </>
    )
}

export default FacultyNavbar
