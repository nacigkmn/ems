import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployee, updateEmployee } from '../services/EmployeeService';


const EditEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfEmployment, setDateOfEmployment] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [imagePath, setImagePath] = useState(null); 
    
    const navigator = useNavigate()
    const {id}= useParams()

     useEffect(()=>{

        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setDateOfEmployment(response.data.dateOfEmployment)
                setDateOfBirth(response.data.dateOfBirth)
                setImagePath(response.data.imagePath)
            }).catch(error=>{
                console.error(error)
            })
        }

    },[id])

     const saveEmployee = (e) => {
        e.preventDefault();
    
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !imagePath) {
          alert('Please fill in all fields');
          return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Enter a valid e-mail');
          return;
        }

    
        const formData = new FormData();
        formData.append(
          'employee',
          JSON.stringify({ firstName, lastName, email, dateOfEmployment, dateOfBirth })
        );
        formData.append('image', imagePath);


        updateEmployee(id, formData)
            .then((response) => {
                console.log("Employee updated:", response.data);
                navigator('/employees');
            })
            .catch((error) => {
                console.error(error);
            });
    
      };

  return (
  <div className="container my-5" style={{ maxWidth: '900px' }}>
  <div className="card shadow p-4">
    <h3 className="text-center mb-4">Update Employee</h3>

    <div className="row">
      <div className="col-md-6">
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Date of Employment</label>
          <input type="date" className="form-control" value={dateOfEmployment} onChange={(e) => setDateOfEmployment(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Date of Birth</label>
          <input type="date" className="form-control" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
      </div>
      <div className="col-md-6 text-center">
        {imagePath && (
          <img
            src={typeof imagePath === 'string' ? `http://localhost:8080/${imagePath}` : URL.createObjectURL(imagePath)}
            alt="Preview"
            className="img-thumbnail mb-3"
            style={{ width: '160px', height: '160px', objectFit: 'cover' }}
          />
        )}
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setImagePath(e.target.files[0])}
        />
      </div>
    </div>

    
    <div className="d-flex justify-content-center gap-3 mt-4">
      <button type="submit" className="btn btn-primary" onClick={saveEmployee}>Update</button>
      <button className="btn btn-secondary" onClick={() => navigator('/employees')}>Cancel</button>
    </div>
  </div>
</div>

);

}

export default EditEmployeeComponent