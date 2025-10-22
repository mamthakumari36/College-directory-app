import { createContext, useContext, useState, useEffect } from "react"

const dataContext = createContext();

export const DataProvider = ({ children }) => {

    const token = localStorage.getItem("token");
    const [deptData, setDeptData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/department', {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                setDeptData(data.body)
                
            } catch (error) {
                console.error("Error While Fetching data", error)
            }
        }
        fetchData()
    }, [])

    return (
        <dataContext.Provider value={{ deptData }}>
            {children}
        </dataContext.Provider>
    )
}

export const useData = () => useContext(dataContext);

