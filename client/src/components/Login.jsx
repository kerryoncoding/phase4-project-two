// import React, { useEffect } from 'react';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login = () => (
   <div>
     <h1>Any place in your app!</h1>
      <Formik
         initialValues={{ email: '', password: '' }}
         validate={values => {
            const errors = {};
            if (!values.email) {
               errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
               errors.email = 'Invalid email address';
            }
            return errors;
         }}
         onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
               alert(JSON.stringify(values, null, 2));
               setSubmitting(false);
            }, 400);
         }}
      >
      
         {({ isSubmitting }) => (
            <Form>
               <label>Email</label>
               <Field type="email" name="email" />
               <ErrorMessage name="email" component="div" />
               <label>Password</label>
               <Field type="password" name="password" />
               <ErrorMessage name="password" component="div" />
               <br/>
               <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
         )}
     </Formik>
   </div>
);

export default Login;




// function Login() {
   

//    return (
//       <div className="about-container">
//          <h2>Please Log in or Sign up!</h2>
//          <div>  
//             <label>
//                Username
//             </label>
//             <input type='text' name='name'  />
//          </div>
//          <div>
//             <label>
//                Email
//             </label>
//             <input type='text' name='email'  />
//             <div>
//                <button>{'login'}</button>
//             </div>
//          </div>
//             <h3>{'Not a member?'}</h3>
//             <div>
//                <button>{'Sign up!'}</button>
//             </div>
//       </div>
      
//    )
// }

// export default Login;