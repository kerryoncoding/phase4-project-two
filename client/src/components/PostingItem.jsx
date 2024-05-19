import React from "react"

function PostingItem ({ body, squad }) {


	
   return (
      <li>
         <h3>Post: {body} -- Squad: {squad} </h3>
         <br/>
      </li>
   )
}

export default PostingItem;
