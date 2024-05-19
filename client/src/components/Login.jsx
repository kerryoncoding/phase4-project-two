import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from "yup"


function Login({ updateUser }) {

   const [signUp, setSignUp] = useState(false)
   // const history = useNavigate()


   const handleClick = () => setSignUp((signUp) => !signUp)
   const formSchema = yup.object().shape({
      name: yup.string().required("Please enter a username"),
      email: yup.string().email()
   })

   const formik = useFormik({
      initialValues: {
         name: "",
         email: ""
      },
      validationSchema: formSchema,
      onSubmit: (values, {resetForm}) => {
         fetch(signUp ? '/api/users' : '/api/login', {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
         })
            .then(res => res.json())
            .then(user => {
               // update user function needs to be made
               updateUser(user)
               resetForm()
               // history.push('/')
               // need to clear form after
            })
      },
   });


   return (
      <div className="about-container">
         <div className="card-container">
            <h1>Login or sign up to enter PodSquad</h1>
            <br />
            <div className="formContainer"> 
               <h2>{signUp ? 'Already a member?' : 'Not a member?'}</h2>
               <br/>
               <button className="messageToggleButton" onClick={handleClick}>{signUp ? 'Log In!' : 'Register now!'}</button>
               <br />
               <form className="squadForm" onSubmit={formik.handleSubmit}>
                  <label>Username: </label>
                  <br />
                  <input
                     id="name"
                     name="name"
                     type="text"
                     onChange={formik.handleChange}
                     value={formik.values.name}
                  />
                  <p style={{ color: "red" }}> {formik.errors.name}</p>
                  <br />
                  <br />
                  {signUp && (
                     <>
                        <label>Email Address: </label>
                        <br />
                        <input
                           id="email"
                           name="email"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.email}
                        />
                        <p style={{ color: "red" }}> {formik.errors.email}</p>
                        <br />
                     </>
                  )}
                  <br />
                  <input className="messageToggleButton" type='submit' value={signUp ? 'Sign Up!' : 'Log In!'} />
               </form>
            </div>
         </div>
         </div>
   );
}

export default Login;

