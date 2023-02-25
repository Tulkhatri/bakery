import axios from "axios";
import { useEffect, useState } from "react";

const Student=()=>{
    const [allStudent,getAllStudent]=useState([])
    const getStudent=async()=>{
        const allStudent=await axios.get('http://localhost:3005/student')
        console.log(allStudent.data.studentDetails)

    }
    useEffect(()=>{
        getStudent();
    },[]);
    return(
        <>
        <div>Student</div>
        </>
    );
}
export default Student;