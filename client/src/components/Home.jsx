import React from "react"
// import Squads from "./Squads"
import Login from "./Login"

function Home(){

   return (
      <div className="home-container">
         <h1>Welcome to PodSquad</h1>
         <img src="http://www.kerryoncoding.com/images/podsquad_notext.jpg" alt="microphone image" className="homeImage" />
         <h2>Come chat about your favorite podcast!</h2>
         {/* <Squads /> */}
         <br />
         <br />
       {/* <Login /> */}
      </div>
   )
}

export default Home;