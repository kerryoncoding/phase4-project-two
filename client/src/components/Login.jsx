import React, { useEffect } from 'react';
import { SignupForm } from './Signup';
import { useFormik } from "formik"
import * as yup from "yup";

function Login() {
   
   return (
      <div>
        <SignupForm />
      </div>
    );
  };
   
  export default Login;

   
   
   
   

// function Login() {
   
//    const [signUp, setSignUp] = useState(false)


//    return (
//       <div className="about-container">
//          <h2>Please Log in or Sign up!</h2>
//          <div>  
//             <label>
//                Username
//             </label>
//             <input type='text' name='name' value={"username"} onChange={"x"} />
//          </div>
//          <div>
//             <label>
//                Email
//             </label>
//             <input type='text' name='email' value={"email"} onChange={"x"} />
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