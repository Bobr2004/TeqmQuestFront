import { RadioCards } from "@radix-ui/themes";
import { useState } from "react";

type OptionItem = {
   value: string;
   title: string;
};

type OptionsProps =
   | {
        value: any;
        onValueChange: (data: any) => void;
        items: OptionItem[];
        stringItems?: never;
     }
   | {
        value: any;
        onValueChange: (data: any) => void;
        stringItems: string[];
        items?: never;
     };

function OptionCards({ items, stringItems, ...props }: OptionsProps) {
   return (
      <RadioCards.Root className="!grid !grid-cols-2" {...props}>
         {stringItems &&
            stringItems.map((item) => (
               <RadioCards.Item value={item}>{item}</RadioCards.Item>
            ))}
         {items &&
            items.map(({ value, title }) => (
               <RadioCards.Item value={value}>{title}</RadioCards.Item>
            ))}
      </RadioCards.Root>
   );
}

function ExampleOptionCards() {
   const [state, setState] = useState("Nigga");
   return (
      <OptionCards
         stringItems={["Nigga", "Pedro", "Chinazes"]}
         value={state}
         onValueChange={setState}
      />
   );
}

export default OptionCards;
