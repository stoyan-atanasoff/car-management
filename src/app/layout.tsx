import { ReactNode } from 'react'
import "@radix-ui/themes/styles.css";

import Providers from '@/providers'
import Header from '@components/Header/Header'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme');
              if (theme) {
                document.documentElement.classList.add(theme);
                if (theme === 'dark') {
                  document.documentElement.style.backgroundColor = 'black';
                }
              } else {
                document.documentElement.classList.add('light'); // default theme
                document.documentElement.style.backgroundColor = 'white';
              }
            })();
          `,
        }}
      />
    </head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
        </body>
      </html>
  )
}
