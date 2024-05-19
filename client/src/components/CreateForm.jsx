import React from "react"
import { useFormik } from "formik";
import * as yup from "yup"


function SquadForm({ addSquad, user }) {

// FORMIK 
   const formSchema = yup.object().shape({
      name: yup.string().required("Must enter a name").max(30),
      image: yup.string().required("Must invlude an image URL").min(9),
      description: yup.string().required("Description must be at least 15 characters").min(15),
   });

   const formik = useFormik({
      initialValues: {
         name: "",
         image: "",
         description: "",
      },
      validationSchema: formSchema,
      onSubmit: (values, { resetForm }) => {

         const formData = {
            ...values,
            owner: user.id
          };

         fetch(("/api/squads"), {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },

            body: JSON.stringify(formData, null, 2),
         })
            .then(res => res.json())
            .then(data => {
               addSquad(data)
               resetForm()
            })
      },
   });
   

   return (
      <div className="formContainer">
         <h2>Create your own PodSquad</h2>
         <form className="squadForm" onSubmit={formik.handleSubmit}>
            <div>
               <label>Name: </label>
               <br />
               <input type="text" id="name" onChange={formik.handleChange} value={formik.values.name}
               />
               <p style={{ color: "red" }}> {formik.errors.name}</p>
            </div>
            <div>
               <label>Image URL: </label>
            <br />
               <input type="text" id="image" onChange={formik.handleChange} value={formik.values.image} />
               <p style={{ color: "red" }}> {formik.errors.image}</p>
            </div>
            <div>
               <label>Description: </label>
            <br />
               <input type="text" id="description" onChange={formik.handleChange} value={formik.values.description} />
               <p style={{ color: "red" }}> {formik.errors.description}</p>
            </div>
            <div>
               <button className="messageToggleButton" type="submit">Submit</button>
            </div>
         </form>
      </div>
   )  
}


export default SquadForm;
