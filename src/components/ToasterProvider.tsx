import { Toaster } from "react-hot-toast";

function ToasterProvider() {
   return (
      <Toaster
         toastOptions={{
            style: {
               background: "var(--color-background)",
               border: "1px solid var(--gray-6)",
               color: "var(--gray-11)"
            },
            success: {
               iconTheme: {
                  primary: "var(--accent-10)",
                  secondary: "white"
               }
            },
            error: {
               iconTheme: {
                  primary: "var(--red-10)",
                  secondary: "white"
               }
            }
         }}
         position="bottom-right"
      />
   );
}

// Example How to use toasts
import toast from "react-hot-toast";

const triggerToast = () => toast("Toast");
const triggerError = () => toast.error("Error");
const triggerSuccess = () => toast.success("Success");

export default ToasterProvider;
