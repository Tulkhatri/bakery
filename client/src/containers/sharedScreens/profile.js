import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const Profile = () => {
    const { _id } = useSelector(State => State.user)
    const [file, setFile] = useState(null);
    const [userDetails,setUserDetails]=useState({})
    const saveImage = async () => {
        const formData = new FormData()
        formData.append('avatar', file)
        formData.append('_id', _id)
        const requestOptions = {
            method: 'POST',
            body: formData,

        };
        const res = await fetch('http://localhost:3005/profile', requestOptions);
        const data = await res.json()
       
    }
    const fetchUser = () => {
        axios.get(`http://localhost:3005/user/${_id}`).then((res) => {
            setUserDetails(res.data.userDetails)
           
        })
        
    }

    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <>
            <h1>profile</h1>
            <input type='file' onChange={(e) => setFile(e.target.files[0])}></input>
            <button className="button_submit" onClick={() => saveImage()}>Save</button>
           { userDetails.avatar && <img src={require(`../../uploads/profile/${userDetails.avatar}`)} width={100}height={100}alt='Loading'/>}
            {JSON.stringify(userDetails)}
          
        </>
    );
}
export default Profile;