// Add a controlled form that includes:
//      A text input
//      A button with the text of “Click Me!”
//      A paragraph that has a counter that starts at 0
// -When they input text in the text field and submit it, the text input should reset. At the same time the counter should increment based on the word length.
// -The counter will continue to increment based on word length and will never reset back to zero. So for example: if the student typed in hi and submitted 3 times, the counter would be at 6.

//create text input on Home page, with button "click me", paragraph starting at zero

// entered text ... need to know length and store info...state

// submit... function to add stored length to counter

import React, {useState} from "react"

function Challenge(){
   const [counter, setCounter] = useState(0)
   const [tempLength, setTempLength] = useState("")


   function handleInput(e){
      console.log(e.target.value)
      setTempLength(e.target.value)
   }

   function upDateCounter(e){
      e.preventDefault()
      console.log("clicked")
      let newCounter = counter + tempLength.length
      setCounter(newCounter)
      setTempLength("")
   }


   return (
      <div>
         <form onSubmit={upDateCounter}>
            <input type="text" value = {tempLength} onChange={handleInput} />
            <input type="submit" value="Click Me!"></input>
            <p>{counter}</p>
         </form>

      </div>
   
   )
}

export default Challenge
