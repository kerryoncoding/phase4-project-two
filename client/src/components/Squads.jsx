import React, {useContext} from "react"
import ThemeContext from './ThemeContext'
import SquadItem from "./SquadItem"
import PostFeedItem from "./PostFeedItem"
import FeedNewMessage from "./FeedNewMessage"


function Squads({ user, makePosting, active, logOut, displayedSquads, toggleView, member, displayedPosts, deleteCard, deletePost, editPost, joinSquad, leaveSquad }) {

   const { theme } = useContext(ThemeContext);   
     
   function handleLogout() {
      logOut()
   }


   const squads = displayedSquads.map((item) => {
      return (
         <SquadItem 
            item={item}
            key={item.id}
            toggleView={toggleView}
            active={active}
            deleteCard={deleteCard}
            user={user}
         />
      )
   })

   const myPost = displayedPosts.map((item) => {
      return (
         <PostFeedItem
            item = { item }
            key = { item.id }
            body = {item.body}
            user={user}
            deletePost={deletePost}
            editPost={editPost}
            member={member}
         />
      )
   })

   if (active == true) {
      return (
         <div className={`your-component ${theme}`}>
            <div className="logout">
               <button className="messageToggleButton" onClick={handleLogout}>Logout</button>
            </div>
            <div className="squad-container">
               <br />
               <div className="card-container">
                  <h2>PodSquads:</h2>
                  <br />
                  {squads}
               </div>
            </div>  
         </div>   
      )

   } else {
      return (
         <div className={`your-component ${theme}`}>
            <div className="logout">
               {/* <button className="messageToggleButton" onClick={handleLogout}>Logout</button> */}
            </div>
            <div className="squad-container">
               <br />
               <div className="card-container">
                  <h2>PodSquads:</h2>
                  <br />
                  {squads}
                  <hr className="breakline" />
                  {myPost}
                  <hr className="breakline" />
                  <h2>{user.username}, join the conversation...</h2>
                  <FeedNewMessage makePosting={makePosting} member={member} joinSquad={joinSquad} leaveSquad={leaveSquad} />
               </div>
            </div>  
         </div>   
      )

   }

}


export default Squads;