

import React, { useState, useContext, useEffect } from "react"
// import { socket } from '../socket';
import ThemeContext from './ThemeContext'
// import { Events } from "./Events";
// import { MyForm } from './MyForm';


function Chat( {user} ) {

   const { theme } = useContext(ThemeContext);

   // const [fooEvents, setFooEvents] = useState([]);

   // useEffect(() => {
  
   //    function onFooEvent(value) {
   //      setFooEvents(previous => [...previous, value]);
   //    }
  
   //    socket.on('foo', onFooEvent);
  
   //    return () => {
   //      socket.off('foo', onFooEvent);
   //    };
   //  }, []);


   return (
      <div className={`your-component ${theme}`}>
         <div className="squad-container">
            <br/>
            <div className="card-container">

               <h1>Welcome to Live Chat, {user.username}!</h1>
               {/* <hr className="breakline" /> */}
               {/* <h3>TBD</h3> */}
               <div className="chatbox">
                  chat Line item here....
                  {/* <Events events={fooEvents} /> */}
               </div>
               {/* <MyForm />                */}
            </div>
         </div>
      </div>
   )
}

export default Chat