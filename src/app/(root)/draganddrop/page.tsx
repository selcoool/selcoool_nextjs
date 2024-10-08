// pages/index.tsx
import React from 'react';
import DragDrop from '@/app/components/DragandDrop/DragDropList';

const DragDropPage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1>Drag and Drop Example</h1>
      <DragDrop />
    </div>
  );
};

export default DragDropPage;




