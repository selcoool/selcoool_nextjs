import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page





// "use client";

// import React from 'react';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// const InforPage3 = () => {
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const pathname = usePathname();

//   // Get the value of the 'q' parameter
//   const q = searchParams.get('q') || ''; // Use .get() to retrieve the value of 'q'

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const params = new URLSearchParams(searchParams.toString()); // Clone the existing search params

//     // Update the 'q' parameter based on user input
//     if (e.target.value) {
//       params.set('q', e.target.value);
//     } else {
//       params.delete('q');
//     }

//     // Update the URL with new search parameters
//     replace(`${pathname}?${params.toString()}`);
//   };

//   return (
//     <div>
//       <div>
//         Search Query: {q} 
//       </div>
//       <input type="text" onChange={handleSearch} placeholder="Search..."  />
//     </div>
//   );
// };

// export default InforPage3;

