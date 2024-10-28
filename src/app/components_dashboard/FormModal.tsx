'use client';
import React, { useState } from 'react';
import FormCreate from './FormComment/FormCreate';
import FormUpdate from './FormComment/FormUpdate';

const FormModal = ({
  Table, 
  Type,
  Icon, 
  Style,
  data,
  id
}: {
  Table: "comments" | "events" | "messages" | "products" | "users";
  Type: "create" | "update" | "delete";
  Icon: React.ElementType; 
  Style?: string;
  data?: any;
  id?: number;
}) => {
  const [open, setOpen] = useState(false);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close only if the target is the outer wrapper
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const Form = () => {
    if (Type === "create") {
     return <FormCreate/>
    } else if (Type === "update" && id && data) {
      return <FormUpdate id={id} data={data} />
    } else {
      console.log("Unknown operation");
    }

  }


  return (
    <>
      <Icon className={Style} onClick={() => setOpen(true)} />
      {open && (
        <div
          id='wrapper'
          onClick={handleCloseModal}
          className="w-[100vw] h-[100vh] absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
        >
          <div className="bg-white h-fit p-4 rounded-md relative w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[40%]" >
          {/* onClick={(e) => e.stopPropagation()} */}
            <div
              className="absolute right-3 top-3 text-black font-bold cursor-pointer hover:text-red-600"
              onClick={() => setOpen(false)}
            >X</div>

<Form/>



          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;


// 'use client';
// import React, { useState } from 'react';

// const FormModal = ({
//   Table, 
//   Type,
//   Icon, 
//   Style,
//   data,
//   id
// }: {
//   Table: "comments" | "events" | "messages" | "products" | "users";
//   Type: "create" | "update" | "delete";
//   Icon: React.ElementType; 
//   Style?: string;
//   data?: any;
//   id?: number;
// }) => {
//   const [open, setOpen] = useState(false);

//   const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.currentTarget.id === "wrapper") {
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <Icon className={Style} onClick={() => setOpen(true)} />
//       {open && (
//         <div
//           id='wrapper'
//           onClick={handleCloseModal}
//           className="w-[100vw] h-[100vh] absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
//         >
//           <div className="bg-white h-fit p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
//             {/* Close Button */}
//             <div
//               className="absolute right-3 top-3 text-black font-bold cursor-pointer hover:text-red-600"
//               onClick={() => setOpen(false)}
//             >
//               X
//             </div>

//             <form className="w-full h-fit bg-gray-100 p-4 shadow-md hover:shadow-lg rounded-lg">
//               <h1 className="text-center text-2xl text-gray-800 font-bold mb-6">
//                 CONTACT ME
//               </h1>

//               <div className="flex flex-col gap-4">
//                 {/* Title */}
//                 <div className="flex items-center justify-between gap-3">
//                   <label htmlFor="title">Title:</label>
//                   <input
//                     type="text"
//                     id="title"
//                     className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                     placeholder="Enter title"
//                   />
//                 </div>

//                 {/* Nickname */}
//                 <div className="flex items-center justify-between gap-3">
//                   <label htmlFor="nickname">Nick Name or Full Name:</label>
//                   <input
//                     type="text"
//                     id="nickname"
//                     className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                     placeholder="Enter name"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div className="flex items-center justify-between gap-3">
//                   <label htmlFor="description">Description:</label>
//                   <textarea
//                     id="description"
//                     className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
//                     placeholder="Enter description"
//                   ></textarea>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     className="min-w-[90px] h-[34px] bg-green-500 text-white rounded-md hover:bg-green-600 hover:shadow-md"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FormModal;

// 'use client';
// import React, { useState } from 'react';

// const FormModal = (
//   {
//     Table, 
//     Type,
//     Icon, // Expecting an Icon component
//     Style, // For custom class-based styles
//     data,
//     id
//   }: {
//     Table: "comments" | "events" | "messages" | "products" | "users";
//     Type: "create" | "update" | "delete";
//     Icon: React.ElementType; 
//     Style?: string; // Optional for custom className
//     data?: any;
//     id?: number;
//   }
// ) => {
//   const [open, setOpen] = useState(false);
//   const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.currentTarget.id === "wrapper") {
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <Icon className={Style} onClick={() => setOpen(true)} />
//       {open && (
//         <div id='wrapper' onClick={handleCloseModal} className=" w-[100vw] h-[100vh] absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center custom-scrollbar">
//           <div className="bg-white h-fit p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:[40%]">
       
//                      <div
//         id='wrapper'
//         className='fixed z-10 flex justify-center pt-20 top-0 bottom-0 w-full h-full'
//         onClick={handleCloseModal}
//       >
    
//           <form className='w-fit h-fit bg-red-500 px-4 shadow-md hover:shadow-slate-400 rounded-lg'>
//             <div className='flex items-center justify-center gap-3 relative'>
//               <div
//                 className='absolute font-bold text-black right-0 top-1 hover:text-white cursor-pointer'
//                 onClick={() => setOpen(false)}
//               >
//                 X
//               </div>
//             </div>

//             <h1 className='text-center mt-6 pb-2 text-2xl text-white font-bold'>CONTACT ME</h1>

//             <div className='flex flex-col gap-3 pb-5 pt-5 h-fit w-fit overflow-auto no-scrollbar'>
//               <div className='flex items-center justify-center gap-3'>
//                 <label>Title:</label>
//                 <input
//                   type='text'
//                   className='flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer'
//                   placeholder='Nhập tên tài khoản'
//                 />
//               </div>

//               <div className='flex items-center justify-center gap-3'>
//                 <label>Nick Name or Full Name:</label>
//                 <input
//                   type='text'
//                   className='flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer'
//                   placeholder='Nhập tên tài khoản'
//                 />
//               </div>

//               <div className='flex items-center justify-center gap-3'>
//                 <label>Description:</label>
//                 <textarea
//                   className='flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer'
//                   placeholder='Nhập mô tả'
//                 ></textarea>
//               </div>

//               <div className='flex items-center justify-end gap-3'>
//                 <button
//                   type='submit'
//                   className='min-w-[90px] w-30 h-[34px] bg-green-500 flex justify-center rounded-md items-center hover:shadow-md hover:shadow-gray-300 cursor-pointer hover:text-white'
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
          
//           </div>

//       )}
//     </>
//   );
// };

// export default FormModal;



     {/* Replace 'adas' with the actual modal content */}
                    {/* <div className='absolute  top-4 right-4 cursor-pointer'>
                    <h3>Modal for {Type} {Table}</h3>
                    <button onClick={() => setOpen(false)} className="mt-4 text-red-600">Close</button>
                    </div> */}


