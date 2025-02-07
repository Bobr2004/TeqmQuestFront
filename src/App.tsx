import { Theme } from "@radix-ui/themes";
import ToasterProvider from "./components/ToasterProvider";

function App() {
   return (
      <>
         <Theme>
            {/* App goes here */}
            <ToasterProvider />
         </Theme>
      </>
   );
}

export default App;
