// app/components/Protected.tsx

"use client"; // This component runs on the client side

import React from 'react';

interface User {
  name: string;
  imageUrl: string;
}

interface ProtectedProps {
  user: User | null; // User can be null if not logged in
}

const Protected: React.FC<ProtectedProps> = ({ user }) => {
  if (!user) {
    return <h1>Access Denied</h1>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {user.name}!</h1>
      <img src={user.imageUrl} alt={user.name} />
    </div>
  );
};

export default Protected;
