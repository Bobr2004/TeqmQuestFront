import { Button, RadioCards, Theme } from "@radix-ui/themes";
import { useState } from "react";

function App() {
   const [radioValue, setRadioValue] = useState("");
   return (
      <>
         <Theme accentColor="mint" appearance="dark">
            <section className="container mx-auto p-4 space-y-2">
               <h2 className="text-2xl text-center font-bold">
                  Who finished Frieza?
               </h2>

               <RadioCards.Root
                  value={radioValue}
                  onValueChange={setRadioValue}
                  className="!grid !grid-cols-2"
               >
                  <RadioCards.Item value="Vegeta">Vegeta</RadioCards.Item>
                  <RadioCards.Item value="Goku">Goku</RadioCards.Item>
                  <RadioCards.Item value="Trunks">Trunks</RadioCards.Item>
                  <RadioCards.Item value="Gohan">Gohan</RadioCards.Item>
               </RadioCards.Root>

               <p className="text-xl">Your answer: {radioValue}</p>
               <div className="flex gap-2 justify-end">
                  <Button variant="surface">Skip question</Button>
                  <Button disabled={!radioValue}>Submit</Button>
               </div>
            </section>
         </Theme>
      </>
   );
}

export default App;
