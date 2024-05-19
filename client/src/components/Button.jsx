
import React, {useContext} from "react"
import ThemeContext from './ThemeContext'
import PostingItem from "./PostingItem"

function Button({ getPostsByUser, myPostList }) {

   const { theme } = useContext(ThemeContext);  

   function handleGetPosts() {
      getPostsByUser()
   }
   
   const postings = myPostList.map((item) => {
      return (
         <PostingItem
            key={item.id}
            body = {item.body}
            squad= {item.squad.name}         
         />
      )
   })

   return (
      <div className={`your-component ${theme}`}>
         <div className="squad-container">
               <br />
            <div className="card-container">
               <h1>See all of my posts</h1>
               <div>
                  <button className="messageToggleButton" onClick={handleGetPosts}>all post</button>
                  <ul>
                     {postings}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Button
      