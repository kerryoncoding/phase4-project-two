

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function EditFeedItem({ item, editPost, handleEditPost }) {
 
    // Formik
  const formSchema = yup.object().shape({
    body: yup.string().required("Field can not be left blank").max(125, "Exceeds max length"),
  });

  const formik = useFormik({
    initialValues: {
    body: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      editPost(item.id, values.body)
      resetForm()
      handleEditPost()
      },
   });
   
   return (
      <>
         <p><strong>{item.user.username}: </strong>{item.body} </p>
    <form className="new-message" onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="body"
        autoComplete="off"
        value={formik.values.body}
        placeholder="   update message..."
        onChange={formik.handleChange}
      />
      <p style={{ color: "red" }}> {formik.errors.body}</p>  
      <input type="submit" className="messageToggleButton" value="Update" />
    </form>
      </>
  );
}

export default EditFeedItem;