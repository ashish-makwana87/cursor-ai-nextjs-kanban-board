'use client'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider";

function Providers({ children }: { children: React.ReactNode }) {

  return (
    <>
    <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
     <ToastContainer position="bottom-right" />
    </>
  )
}

export default Providers