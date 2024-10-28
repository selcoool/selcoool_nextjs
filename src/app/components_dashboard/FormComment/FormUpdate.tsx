import React from 'react'

const FormUpdate = ({id,data}:{id?:number;data?:any}) => {
  return (
    <form className="w-full h-fit  rounded-lg">
    <h1 className="text-center text-2xl  font-bold mb-6">
      {/* Form {Type} in {Table} */}
      Update Comment {id}- {data}
    </h1>

    <div className="flex flex-col gap-4">

      <div className="flex items-center justify-between gap-3">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
          placeholder="Enter title"
        />
      </div>


      <div className="flex items-center justify-between gap-3">
        <label htmlFor="nickname">Full Name:</label>
        <input
          type="text"
          id="nickname"
          className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
          placeholder="Enter name"
        />
      </div>

      {/* Description */}
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          className="flex-1 px-2 py-1 rounded-md border focus:outline-none"
          placeholder="Enter description"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="min-w-[90px] h-[34px] bg-green-500 text-white rounded-md hover:bg-green-600 hover:shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  </form>
  )
}

export default FormUpdate