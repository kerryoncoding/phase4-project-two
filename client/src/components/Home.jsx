import React from "react"
import Squads from "./Squads"

function Home(){

   return (
      <div className="home-container">
         <h1>Welcome to PodSquad</h1>
         <img src="http://www.kerryoncoding.com/images/podsquad_notext.jpg" alt="microphone image" className="homeImage" />
         <h2>Chat about your favorite podcast!</h2>
         <Squads />
      </div>
   )
}

export default Home;