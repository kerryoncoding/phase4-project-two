import React, { useEffect } from 'react';

function Login() {
   

   return (
      <div className="about-container">
         <h2>Please Log in or Sign up!</h2>
         <div>  
            <label>
               Username
            </label>
            <input type='text' name='name'  />
         </div>
         <div>
            <label>
               Email
            </label>
            <input type='text' name='email'  />
            <div>
               <button>{'login'}</button>
            </div>
         </div>
            <h3>{'Not a member?'}</h3>
            <div>
               <button>{'Sign up!'}</button>
            </div>
      </div>
      
   )
}

export default Login;