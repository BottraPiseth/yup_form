import React, { useState } from 'react'
import './App.css'
import FormWithoutYup from './components/form-without-yup';
import FormWithYup from './components/form-with-yup';
import FormValidations from './components/form-validations';


function App() {

  return (
    <div>
      {/* <FormWithoutYup  /> */}
      {/* <FormWithYup  /> */}
       <FormValidations  /> 
    </div>
  )
}

export default App;
