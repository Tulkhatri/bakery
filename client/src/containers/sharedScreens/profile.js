import './../../App.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
import axios from "axios";
const Profile = () => {
    const { _id } = useSelector(State => State.user)
    const [file, setFile] = useState(null);
    const [userDetails, setUserDetails] = useState({})
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
        if(data){
            message.success(data.msg, [1])
        }

    }
    const fetchUser = () => {
        axios.get(`http://localhost:3005/user/${_id}`).then((res) => {
            setUserDetails(res.data.userDetails)

        })

    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <h1>profile</h1>
            <div className='profile_page'>
                {userDetails.avatar && <img src={require(`../../uploads/profile/${userDetails.avatar}`)} className='profile_image' alt='Loading'/>}
                <div>
                <FontAwesomeIcon icon={faCamera} className='edit_profile' />
                <input type='file' onChange={(e) => setFile(e.target.files[0])}className='file_input'></input>
                </div>
                <div className='profile_name'>{userDetails.name}</div>
                <div className='profile_email'>{userDetails.email}</div>
                <button className="btn_save_profile" onClick={() =>file? saveImage():message.error("Please choose the image", [2])}>Save</button>
                {/* {JSON.stringify(userDetails)} */}
            </div>

        </>
    );
}
export default Profile;