import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const FormCreate = () => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      nickname: "",
      description: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Vui lòng nhập tên tài khoản "),
      nickname: yup.string().required("Vui lòng nhập họ và tên"),
      description: yup.string().required("Vui lòng nhập email"),
    }),
    onSubmit: async (values) => {
      try {
        console.log('Form data:', values);
        // You can send data to the server here
      } catch (error) {
        console.log('error', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full h-fit rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-6">Create Comment</h1>

      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
            placeholder="Enter title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
        </div>
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500 text-sm">{formik.errors.title}</div>
        ) : null}

        {/* Nickname */}
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="nickname">Full Name:</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
            placeholder="Enter name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nickname}
          />
        </div>
        {formik.touched.nickname && formik.errors.nickname ? (
          <div className="text-red-500 text-sm">{formik.errors.nickname}</div>
        ) : null}

        {/* Description */}
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
            placeholder="Enter description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
        </div>
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500 text-sm">{formik.errors.description}</div>
        ) : null}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty} // Disable if form is invalid or untouched
            className={`min-w-[90px] h-[34px] ${!formik.isValid || !formik.dirty ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-md hover:bg-green-600 hover:shadow-md`}
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCreate;


// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';

// const FormCreate = () => {
//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       nickname: "",
//       description: "",
//     },
//     validationSchema: yup.object().shape({
//       title: yup.string().required("Vui lòng nhập tên tài khoản "),
//       nickname: yup.string().required("Vui lòng nhập họ và tên"),
//       description: yup.string().required("Vui lòng nhập email"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         console.log('Form data:', values);
//         // You can send data to the server here
//       } catch (error) {
//         console.log('error', error);
//       }
//     }
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="w-full h-fit rounded-lg">
//       <h1 className="text-center text-2xl font-bold mb-6">Create Comment</h1>

//       <div className="flex flex-col gap-4">
//         {/* Title */}
//         <div className="flex items-center justify-between gap-3">
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title" // Added name attribute
//             className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//             placeholder="Enter title"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.title} // Bind value to Formik
//           />
        
//         </div>
//         {formik.touched.title && formik.errors.title ? (
//             <div className="text-red-500 text-sm">{formik.errors.title}</div>
//           ) : null}

//         {/* Nickname */}
//         <div className="flex items-center justify-between gap-3">
//           <label htmlFor="nickname">Full Name:</label>
//           <input
//             type="text"
//             id="nickname"
//             name="nickname" // Added name attribute
//             className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//             placeholder="Enter name"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.nickname} // Bind value to Formik
//           />
      
//         </div>
//         {formik.touched.nickname && formik.errors.nickname ? (
//             <div className="text-red-500 text-sm">{formik.errors.nickname}</div>
//           ) : null}

//         {/* Description */}
//         <div className="flex items-center justify-between gap-3">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             name="description" // Added name attribute
//             className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//             placeholder="Enter description"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.description} // Bind value to Formik
//           />
        
//         </div>
//         {formik.touched.description && formik.errors.description ? (
//             <div className="text-red-500 text-sm">{formik.errors.description}</div>
//           ) : null}

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="min-w-[90px] h-[34px] bg-green-500 text-white rounded-md hover:bg-green-600 hover:shadow-md"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default FormCreate;

// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// // Validation schema with Yup
// const FormSchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   nickname: Yup.string().required('Full Name is required'),
//   description: Yup.string().required('Description is required'),
// });

// const FormCreate = () => {
//   return (
//     <Formik
//       initialValues={{ title: '', nickname: '', description: '' }}
//       validationSchema={FormSchema}
//       onSubmit={(values, { setSubmitting }) => {
//         console.log('Form data:', values);
//         setSubmitting(false);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form className="w-full h-fit rounded-lg">
//           <h1 className="text-center text-2xl font-bold mb-6">Create Comment</h1>

//           <div className="flex flex-col gap-4">
//             {/* Title */}
//             <div className="flex items-center justify-between gap-3">
//               <label htmlFor="title">Title:</label>
//               <Field
//                 type="text"
//                 name="title"
//                 id="title"
//                 className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                 placeholder="Enter title"
//               />
             
//             </div>
//             <div className="min-h-[20px]">
//                 <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
//               </div>

//             {/* Nickname */}
//             <div className="flex items-center justify-between gap-3">
//               <label htmlFor="nickname">Full Name:</label>
//               <Field
//                 type="text"
//                 name="nickname"
//                 id="nickname"
//                 className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                 placeholder="Enter name"
//               />
//               <div className="min-h-[20px]">
//                 <ErrorMessage name="nickname" component="div" className="text-red-500 text-sm" />
//               </div>
//             </div>

//             {/* Description */}
//             <div className="flex items-center justify-between gap-3">
//               <label htmlFor="description">Description:</label>
//               <Field
//                 as="textarea"
//                 name="description"
//                 id="description"
//                 className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                 placeholder="Enter description"
//               />
//               <div className="min-h-[20px]">
//                 <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="min-w-[90px] h-[34px] bg-green-500 text-white rounded-md hover:bg-green-600 hover:shadow-md"
//               >
//                 {isSubmitting ? 'Sending...' : 'Send'}
//               </button>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default FormCreate;


// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';

// const FormCreate = () => {
//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       nickname: "",
//       description: "",
//     },
//     validationSchema: yup.object().shape({
//       title: yup.string().required("Vui lòng nhập tên tài khoản "),
//       nickname: yup.string().required("Vui lòng nhập họ và tên"),
//       description: yup.string().required("Vui lòng nhập email"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         console.log('Form data:', values);
//         // You can send data to the server here
//       } catch (error) {
//         console.log('error', error);
//       }
//     }
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="w-full h-fit rounded-lg">
//       <h1 className="text-center text-2xl font-bold mb-6">Create Comment</h1>

//       <div className="flex flex-col gap-4">
//         {/* Title */}
//         <div className="flex items-center justify-between gap-3">
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title" // Added name attribute
//             className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//             placeholder="Enter title"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.title} // Bind value to Formik
//           />
        
//         </div>
//         {formik.touched.title && formik.errors.title ? (
//             <div className="text-red-500 text-sm">{formik.errors.title}</div>
//           ) : null}

//         {/* Nickname */}
//         <div className="flex items-center justify-between gap-3">
//           <label htmlFor="nickname">Full Name:</label>
//           <input
//             type="text"
//             id="nickname"
//             name="nickname" // Added name attribute
//             className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//             placeholder="Enter name"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.nickname} // Bind value to Formik
//           />
      
//         </div>
//         {formik.touched.nickname && formik.errors.nickname ? (
//             <div className="text-red-500 text-sm">{formik.errors.nickname}</div>
//           ) : null}

//         {/* Description */}
//         <div className="flex items-center justify-between gap-3">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             name="description" // Added name attribute
//             className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//             placeholder="Enter description"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.description} // Bind value to Formik
//           />
        
//         </div>
//         {formik.touched.description && formik.errors.description ? (
//             <div className="text-red-500 text-sm">{formik.errors.description}</div>
//           ) : null}

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="min-w-[90px] h-[34px] bg-green-500 text-white rounded-md hover:bg-green-600 hover:shadow-md"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default FormCreate;


// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// // Validation schema with Yup
// const FormSchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   nickname: Yup.string().required('Full Name is required'),
//   description: Yup.string().required('Description is required'),
// });

// const FormCreate = () => {
//   return (
//     <Formik
//       initialValues={{ title: '', nickname: '', description: '' }}
//       validationSchema={FormSchema}
//       onSubmit={(values, { setSubmitting }) => {
//         console.log('Form data:', values);
//         setSubmitting(false);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form className="w-full h-fit rounded-lg">
//           <h1 className="text-center text-2xl font-bold mb-6">Create Comment</h1>

//           <div className="flex flex-col gap-4">
//             {/* Title */}
//             <div className="flex items-center justify-between gap-3">
//               <label htmlFor="title">Title:</label>
//               <Field
//                 type="text"
//                 name="title"
//                 id="title"
//                 className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                 placeholder="Enter title"
//               />
//               <div className="min-h-[20px]">
//                 <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
//               </div>
//             </div>

//             {/* Nickname */}
//             <div className="flex items-center justify-between gap-3">
//               <label htmlFor="nickname">Full Name:</label>
//               <Field
//                 type="text"
//                 name="nickname"
//                 id="nickname"
//                 className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                 placeholder="Enter name"
//               />
//               <div className="min-h-[20px]">
//                 <ErrorMessage name="nickname" component="div" className="text-red-500 text-sm" />
//               </div>
//             </div>

//             {/* Description */}
//             <div className="flex items-center justify-between gap-3">
//               <label htmlFor="description">Description:</label>
//               <Field
//                 as="textarea"
//                 name="description"
//                 id="description"
//                 className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                 placeholder="Enter description"
//               />
//               <div className="min-h-[20px]">
//                 <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="min-w-[90px] h-[34px] bg-green-500 text-white rounded-md hover:bg-green-600 hover:shadow-md"
//               >
//                 {isSubmitting ? 'Sending...' : 'Send'}
//               </button>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default FormCreate;


// import React from 'react'

// const FormCreate = () => {
//   return (
    
//     <form className="w-full h-fit  rounded-lg">
//     <h1 className="text-center text-2xl  font-bold mb-6">
//       {/* Form {Type} in {Table} */}
//       Create Comment
//     </h1>

//     <div className="flex flex-col gap-4">

//       <div className="flex items-center justify-between gap-3">
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//           placeholder="Enter title"
//         />
//       </div>


//       <div className="flex items-center justify-between gap-3">
//         <label htmlFor="nickname">Full Name:</label>
//         <input
//           type="text"
//           id="nickname"
//           className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//           placeholder="Enter name"
//         />
//       </div>

//       {/* Description */}
//       <div className="flex items-center justify-between gap-3">
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//           placeholder="Enter description"
//         ></textarea>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="min-w-[90px] h-[34px] bg-green-500 text-white rounded-md hover:bg-green-600 hover:shadow-md"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   </form>
//   )
// }

// export default FormCreate