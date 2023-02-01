import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
const ImageUPload = () => {
    const [persons, setPersons] = useState([]);
    const url = 'http://localhost:3005/persons'
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      photo: '',
    },
    onSubmit: (values)=>{
        console.log(values);

        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        axios.post(url, formData).then((res) => {
          setPersons(persons.concat(res.data));
        });
    }
  });
  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
    <div>
      <label> Name</label>
      <input
        type='text'
        name='name'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
    </div>
    <div>
      <label> Number</label>
      <input
        type='tel'
        name='number'
        onChange={formik.handleChange}
        value={formik.values.number}
      />
    </div>
    <div>
        <label> Upload File</label>
        <input
          type='file'
          name='photo'
          accept='image/*'
          onChange={(e) =>
            formik.setFieldValue('photo', e.currentTarget.files[0])
          }
        />
      </div>

    <button type='submit'>Submit</button>
  </form>

    );
  
};

export default ImageUPload;
