import React, { useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContex } from '../Store/AuthContex'
import profileImage from '../assets/profile.jpg'
import './ProfilePage.css'
import { toast, ToastContainer } from 'react-toastify'
import {
  uploadAdminPic,
  uploadFacultyPic,
  uploadStudentPic,
  getAdminById,
  getFacultyById,
  getStudentById,
  getUserById,
} from "../Services/ApiServices";

const ProfileCard = () => {

    const { user, logout } = useContext(AuthContex);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loggedInUserDetails, setDetails] = useState([])
    const navigate = useNavigate();

    // Handle file selection
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
        let response;
        if (user.role === "ADMINISTRATOR") response = await uploadAdminPic(user.userId, file);
        else if (user.role === "FACULTY") response = await uploadFacultyPic(user.userId, file);
        else if (user.role === "STUDENT") response = await uploadStudentPic(user.userId, file);

        toast.success("Profile picture updated successfully");
        setImageUrl(response.data.body.photo);
        } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload image");
        } finally {
        setLoading(false);
        }
    };

    // ================================
    //  code to fetch profile picutre

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                let response;
                if (user.role === "ADMINISTRATOR") response = await getAdminById(user.userId);
                else if (user.role === "FACULTY") response = await getFacultyById(user.userId);
                else if (user.role === "STUDENT") response = await getStudentById(user.userId);
                setImageUrl(response.data.body.photo);
            } catch (error) {
                console.error("Error fetching profile picture:", error);
            }
        };

        const fetchUserDetails = async () => {
            try{
                const response = await getUserById(user.userId)
                setDetails(response.data.body)
            }
            catch(error){
                console.log("Error FEtching Details :", error)
            }
        };

        fetchProfilePicture();
        fetchUserDetails();
    }, [user.role, user.userId]);

    // handle Logout

    const handleLogout = () => {
        logout();         // clear user + storage
        navigate("/"); // redirect to login
    };

    return (
        <div className="card bg-dark text-light profile-card">
        <div className="profile-picture-container text-center mt-3">
            <input
            type="file"
            id="file-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
            />

            <img
            src={imageUrl || profileImage}
            alt="Profile"
            className="profile-picture"
            onClick={() => document.getElementById("file-input").click()}
            />

            {loading && <p className="mt-2 text-info">Uploading...</p>}
        </div>

        <div className="card-body text-start mt-3">
            <h5>Name: {loggedInUserDetails.name}</h5>
            <h5>Email: {loggedInUserDetails.email}</h5>
            <h5>Contact: {loggedInUserDetails.phone}</h5>
            <h5>Username: {loggedInUserDetails.username}</h5>
            <h5>Status: {loggedInUserDetails.status}</h5>

            <button onClick={handleLogout} className="btn btn-outline-danger w-100 mt-3">
            Logout
            </button>
        </div>

        <ToastContainer autoClose={1500} />
        </div>
    );

}

export default ProfileCard
