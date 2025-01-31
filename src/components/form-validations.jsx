import React, { useState } from 'react'
import * as Yup from 'yup'

const FormValidations = () => {
//useState 
const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        password: "",
        confirmPassword: "",
        age: 0,
        gender: "",
        interests: [],
        birthDate: "",
    });
    
    const [users, setUsers] = useState([]);
    //useState
    const [errors, setErrors]= useState();

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
            .required("Email is Required")
            .email("Invalid email format"),
        telephone: Yup.string()
            .matches( /^\d{9}$/, "Phone number must be 10 digits ")
            .required(""),
        password: Yup.string()
            .required("")
            .min(8,
                "Password must be at least 8 characters"
                )
            .matches(
                /[1@#$%^&*(),.?":{}[<>]/," Password must at least one symbol " 
                )
            .matches(
                /[0-9]/,"Password must contain at least one number "
                )
            .matches(
                /[A-Z]/,"Password must contain at least one uppercase letter"
                )
            .matches(
                /[a-z]/, "Password must contain at least one lowercase letter"
             ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")],"Password must match")
            .required("Confirm Password is Required"),
        age: Yup.number()
            .typeError("Age must be a number")
            .min(6, "You must be at least 6 years old")
            .max (100, "You cannot be older than 100 years")
            .required("Age is required"), 
        gender: Yup.string().required("Gender is required"),
        interests: Yup
            .array()
            .min(1, "Select at least one interest")
            .required("Select at least one interest"),
        birthDate: Yup.date().required("Date of birth is required"),
    });
    
    //const user = await validationSchema.validate(await fetchUser());
   

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
            await validationSchema.validate(formData, {abortEarly: false });
            setUsers([...users, formData])
            console.log("Form Submitted", formData);
        } catch (error) {
        console.log(error.inner);
       
    }
  };


  //eventonChange
  const handleChange = (e) => {
    const {name, value}=e.target;

    setFormData({
        ...formData,
        [name]:value,
    })
  };
//eventonCheckboxChange
const handleCheckboxChange = (e) =>{
    const {name, checked}=e.target;
    let updatedInterests = [ ...formData.interests];
    if (checked) {
        updatedInterests.push (name);
    } else{
        updatedInterests = updatedInterests.filter(
            (interests) => interests !== name
        )
    }
    setFormData({
            ...formData,
        interests: updatedInterests,
        })
    };

  return (
<>

  <form className='form onSubmit' onSubmit={handleSubmit}>
      <div>
          <label>First Name: </label>
          <input
            className="w-80% rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter your First name"
            onChange={handleChange}
          />
          {/* {errors.firstName && <div className="errors" >{errors.firstName}</div>} */}
      </div>
      <div>
          <label>Last Name: </label>
          <input
           className="w-80% rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter your Last Name"
              onChange={handleChange}
          />
          {/* {errors.lastName && <div className="error" >{errors.lastName}</div>} */}
      </div>
      <div>
          <label>Email: </label>
          <input
           className="w-80%  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              type="text"
              name="email"
              value={formData.email}
              placeholder="Enter your Email"
              onChange={handleChange}
          />
      </div>
      
      
      <div>
          <label>Phone Number: </label>
          <input
           className="w-80%  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              type="text"
              name="telephone"
              value={formData.telephone}
              placeholder="Enter your telephone"
              onChange={handleChange}
          />
      </div>
      <div>
          <label>Password: </label>
          <input
           className="w-80%  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Confirm your first name"
              onChange={handleChange}
          />
      </div>
      <div>
          <label>ConfirmPassword: </label>
          <input
           className="w-80%  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm your Password"
              onChange={handleChange}
          />
      </div>
      <div>
          <label>Age: </label>
          <input
           className="w-80%  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              type="number"
              name="age"
              value={formData.age}
              placeholder="Enter your Age"
              onChange={handleChange}
          />
      </div>
      <div>
      <label>Gender: </label>
        <select 
            name="gender" 
            value={formData.gender}  
            className="w-50%  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
        </select>
      </div>
      <div >
        <label >Interests: </label>
        <div className="w-80%  rounded-lg border-gray-200  p-4 pe-12 text-sm shadow-sm m-4">
            <label >
                
                <input
                    type="checkbox"
                    name="coding"
                    checked={formData.interests.includes("coding")}
                    onChange={handleCheckboxChange}
                />
                Coding
            </label>
            <label>
                <input
                    type="checkbox"
                    name="sports"
                    checked={formData.interests.includes("sports")}
                    onChange={handleCheckboxChange}
                />
                    Sports
            </label>
            <label>
                <input
                    type="checkbox"
                    name="reading"
                    checked={formData.interests.includes("reading")}
                    onChange={handleCheckboxChange}
                />
                    Reading
            </label>
        </div>
       
      </div>
      <div >
          <label>Date of Birth: </label>
          <input
           className="w-80%  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              placeholder="Enter your Date of Birth:"
              onChange={handleChange}
          />
      </div>

      <button type='submit'  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
        Submit
        </button>
    </form>

   

<div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">First Name</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Last Name</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Phone Number</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Age</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gender</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Interests</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date of Birth</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
     {users.length > 0 && users.map((user, index) => (
      <tr key={index}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.firstName}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.lastName}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td> 
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.telephone}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.age}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.gender}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.interests}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.birthDate}</td> 
        <td>
                <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                <button
                    className="inline-block rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
                    //  onClick={() => deleteItem(index.id)}
                >
                    Delete
                </button>
            </div>
        </td> 
      </tr>
        ))} 
    </tbody>


  </table>
</div>
    
</>
    

  );
}

export default FormValidations;

