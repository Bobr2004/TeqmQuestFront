import { SegmentedControl } from "@radix-ui/themes";
import { useState } from "react";

type SegmentItem = {
   value: string;
   title: string;
};

type SegmentsProps =
   | {
        value: any;
        onValueChange: (data: any) => void;
        items: SegmentItem[];
        stringItems?: never;
     }
   | {
        value: any;
        onValueChange: (data: any) => void;
        stringItems: string[];
        items?: never;
     };

function Segments({ items, stringItems, ...props }: SegmentsProps) {
   return (
      <SegmentedControl.Root {...props}>
         {stringItems &&
            stringItems.map((item) => (
               <SegmentedControl.Item value={item}>
                  {item}
               </SegmentedControl.Item>
            ))}
         {items &&
            items.map(({ value, title }) => (
               <SegmentedControl.Item value={value}>
                  {title || value}
               </SegmentedControl.Item>
            ))}
      </SegmentedControl.Root>
   );
}

function ExampleSegments() {
   const [state, setState] = useState("Nigga");
      return (
         <Segments
            stringItems={["Nigga", "Pedro", "Chinazes"]}
            value={state}
            onValueChange={setState}
         />
      );
}

export default Segments;

