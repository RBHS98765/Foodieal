import React from 'react';
import { Toaster } from 'sonner';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      <style>{`
        :root {
          --primary: #D62828;
          --secondary: #F77F00;
          --accent: #FCBF49;
          --background: #FFF3E0;
          --text: #2B2B2B;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: var(--background);
          color: var(--text);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--secondary);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection color */
        ::selection {
          background-color: var(--accent);
          color: var(--text);
        }
      `}</style>
      
      {children}
      
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#2B2B2B',
            color: 'white',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#FCBF49',
              secondary: '#2B2B2B',
            },
          },
        }}
      />
    </div>
  );
}