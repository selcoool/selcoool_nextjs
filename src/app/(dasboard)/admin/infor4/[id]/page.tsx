import React from 'react';

// Define the component props with params containing id
const DetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Destructure id from params

  return (
    <div>DetailPage: `{id}`</div>
  );
}

export default DetailPage;
