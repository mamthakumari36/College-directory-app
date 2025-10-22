import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Attach token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------------- API CALLS ---------------------- //

//  Courses Api

export const saveCourse = (courseData) => api.post("/course", courseData);
export const getAllCourses = () => api.get("/course")
export const setFacultyToCourse = (cid,fid) => api.patch(`/course/faculty/${cid}/${fid}`)
export const setDeptToCourse = (cid,did) => api.patch(`/course/department/${cid}/${did}`)

// Department Api

export const saveDept = (data) => api.post("/department", data);
export const getDeptById = (did) => api.get(`/department/${did}`);
export const updateDept = (did, data) => api.put(`/department/${did}`, data)
export const setDeptToFaculty = (fid,did) => api.patch(`/faculties/${fid}/${did}`)
export const updateOfficeHours = (fid, hours) => api.patch(`/faculties/officehours/${fid}?officeHours=${hours}`)


// Enrollment Api

export const saveEnrollment = (sid,cid) => api.post(`/enrollments/${sid}/${cid}`)
export const getAllEnrollment = () => api.get("/enrollments")

//  Users Api

export const saveUser = (userData) => api.post("/users/signup", userData)
export const loginUser = (username, password) => api.post(`/users/login`, { username, password })
export const getUserById = (uid) => api.get(`/users/${uid}`)

//  Faculty Api

export const saveFaculty = (uid, data) => api.post(`/faculties/${uid}`, data)
export const getAllFaculty = () => api.get(`/faculties`)
export const uploadFacultyPic = (uid, file) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post(`/faculties/upload/${uid}`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
}
export const getFacultyById = (uid) => api.get(`/faculties/${uid}`)

// Admin Api

export const uploadAdminPic = (uid, file) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post(`/administrator/upload/${uid}`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
}
export const getAdminById = (uid) => api.get(`/administrator/${uid}`)
export const saveAdmin = (uid, data) => api.post(`/administrator/${uid}`, data);

// Student Api

export const uploadStudentPic = (uid, file) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post(`/students/upload/${uid}`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
}
export const getStudentById = (uid) => api.get(`/students/${uid}`)
export const saveStudent = (uid, data) => api.post(`/students/${uid}`, data)
export const getAllStudent = () => api.get(`/students`)
export const setDeptToStudent = (id,did) => api.patch(`/students/${id}/${did}`)
export const updateStudent = (id,yearVal) => api.patch(`/students/${id}?year=${yearVal}`)
