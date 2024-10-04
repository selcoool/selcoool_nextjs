// app/layout.tsx
import type { Metadata } from 'next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
       <div>
      111
          {children}
      </div>

  );
}