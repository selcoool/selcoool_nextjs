// app/layout.tsx
import type { Metadata } from 'next';
import { Dancing_Script } from 'next/font/google';
import './globals.css';
import StoreProvider from './storeProvider/StoreProvider';



// Importing Google Fonts
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// Defining metadata
export const metadata: Metadata = {
  title: 'Selcool',
  description: "Welcome to Selcool's Home",
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/apple-touch-icon.png'],
    shortcut: ['/apple-touch-icon.png'],
  },
};

// Layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (

      <html lang="en">
        <head>
          {/* Standard metadata */}
          <meta name="facebook-domain-verification" content="w484tu2k8ly6b5p1yl55mtjtwmbbqn" />

          {/* Facebook Pixel Script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s) {
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '980884502489134');
                // fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=980884502489134&ev=PageView&noscript=1"
            />
          </noscript>
        </head>
        <StoreProvider>
        <body className={dancingScript.className}  suppressHydrationWarning={true}>
          {children}
        </body>
        </StoreProvider>
      </html>

  );
}



