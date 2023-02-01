import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ImageDisplay=()=>{
   
    const [persons, setPersons] = useState([]);
    const url = 'http://localhost:3005/persons'
    
     useEffect(() => {
        axios.get(url).then((res) => {
          setPersons(res.data);
          
        });
    }, []);
    console.log(persons)
    return(
        <>
        <h1>Image Display</h1>
        <div>
        {persons.map((person) => (
            <div key={person.id}>
           { person.photo && <img src={require(`../../server/uploads/${person.photo}`)} alt='profile-pic'style={{width:"100 px", height:"100 px"}} />}
           {console.log(person.photo)}
            <h4>Name:{person.name}</h4>
            <h4>Number:{person.number}</h4>
          </div>
        ))}
      </div>

        </>
    );
}
export default ImageDisplay