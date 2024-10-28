"use client"
import React from 'react';
import { MdMoreHoriz } from "react-icons/md";

interface UserCardProps {
    Type: string;
    Quality: number;
    Date: Date; // Rename this to another name
}

const UserCard = ({ Type, Quality, Date: originalDate }: UserCardProps) => { // Rename here
    // Format the date to a readable string
    const formattedDate = originalDate.toLocaleDateString();

    // Calculate the date 14 days later
    const datePlus14Days = new Date(originalDate); // Create a new Date object to avoid mutating the original
    datePlus14Days.setDate(originalDate.getDate() + 14);
    const formattedDatePlus14Days = datePlus14Days.toLocaleDateString();

    return (
        <div className='flex flex-col justify-between space-y-1 rounded-2xl odd:bg-[#db9566] even:bg-[#ae9953] flex-1 min-w-[10rem] p-3 sm:p-4 lg:p-6 hover:bg-[#9fae53] cursor-pointer'>
            {/* Title */}
            {/* Date and Icon */}
            <div className="flex justify-between items-center text-sm text-[gray-700]">
                <span className='text-[1rem] p-[0.5rem] bg-white rounded-[1rem]'>{formattedDate}</span>
                <MdMoreHoriz className='text-[1.3rem] text-white cursor-pointer' />
            </div>
            <div className="text-lg font-bold">{Type}</div>

            {/* Quality */}
            <div className="text-sm text-[#334b52] font-bold">Quality: {Quality}</div>

          
        </div>
    );
}

export default UserCard;



// import React from 'react';
// import { MdMoreHoriz } from "react-icons/md";

// interface UserCardProps {
//     Type: string;
//     Quality: number;
//     Date: Date;
// }

// const UserCard= ({ Type, Quality, Date }:UserCardProps) => {
//     // Format the date to a readable string
//     const formattedDate = Date.toLocaleDateString();

//     return (
//         <div className='flex flex-col justify-between space-y-1 rounded-2xl odd:bg-[#db9566] even:bg-[#ae9953] flex-1 min-w-[10rem] p-2 sm:p-4 lg:p-6 hover:bg-[#9fae53] cursor-pointer '>
//             {/* Title */}
//             {/* Date and Icon */}
//             <div className="flex justify-between items-center text-sm text-[gray-700]">
//                 <span className='text-[1rem] p-[0.5rem] bg-white rounded-[1rem]'>{formattedDate}</span>
//                 <MdMoreHoriz className='text-[1.3rem] text-white cursor-pointer' />
//             </div>
//             <div className="text-lg font-bold">{Type}</div>

//             {/* Quality */}
//             <div className="text-sm text-[#334b52] font-bold">Quality: {Quality}</div>

            
//         </div>
//     );
// }

// export default UserCard;


