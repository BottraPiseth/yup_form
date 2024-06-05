import React, { useState } from 'react'

const FormWithoutYup = () => {
//useState 
const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interests: [],
        birthDate: "",
    });
    //useState
    const [errors, setErrors]= useState();

    //validEmail
    const isValidEmail = (email) =>{
        // Regular expression for basic email validation
        const emailRegex = /^\S+@+\S+\.\S+$/;
        return emailRegex.test(email);
    };

    //validTelephone
    const isValidtelephone = (telephone) =>{
        // Regular expression for basic email validation
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(telephone);
    }; 
    //validPassword
    const isValidPassword =(password) => {
        // Regular expressions for password validation
        const symbolRegex=/[1@#$%^&*(),.?":{}[<>]/;
        const numberRegex = /[0-9]/;
        const upperCaseRegex =/[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
        return (
            password.length >= 8 && 
            symbolRegex.test(password) && 
            numberRegex.test(password) && 
            upperCaseRegex.test(password) && 
            lowerCaseRegex.test(password)
        );
    };
    //validAge
    const isValidAge =(age) => {
        return parseInt(age) >= 18 && parseInt(age) <= 100;
    }

  //formvalidation
    const validationForm=()=>{
        let newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.telephone) {
            newErrors.telephone = "Phone number is required";
        } else if (!isValidtelephone(formData.telephone)) {
            newErrors.telephone = "Phone number must be 10 digits ";
        } 
        
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!isValidPassword(formData.password)) {
            newErrors.password =
            "Password must be at least 8 characters long and contain at least one symbol,one uppercase letter, and one lowercase letter"
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword ="Confirm password is required";
            } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword ="Passwords must match";
            }
        
        if (!formData.age) {
            newErrors.age = "Age is required";
        } else if (!isValidAge(formData.age)) {
            newErrors.age =
            "You must be at least 18 years old and not older than 100 year";
        }
        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }
        if (formData.interests.length === 0) {
            newErrors.interests = "Select at least one interest";
        }
            if (!formData.birthDate) {
            newErrors.birthDate = "Date of birth is required";
        }

        setErrors(newErrors); 

        return Object.keys(newErrors).length === 0;
    };
    console.log(errors)
  //form
  const handleSubmit = (e) => {
    e.preventDefault(); 

    const isValid = validationForm ();
    if(isValid){
        console.log("Form Submitted" ,formData);
    }else{
        console.log("Form Validation Failed");
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
          <label>last Name: </label>
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
          <label> phoneNumber: </label>
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


    

  );
}

export default FormWithoutYup;

