import { SegmentedControl } from "@radix-ui/themes";

type SegmentItem = {
   value: string;
   title: string;
};

type SegmentsProps =
   | {
        value?: any;
        onValueChange?: (data: any) => void;
        items: SegmentItem[];
        stringItems?: never;
     }
   | {
        value?: any;
        onValueChange?: (data: any) => void;
        stringItems: string[];
        items?: never;
     };

function Segments({ items, stringItems, ...props }: SegmentsProps) {
   return (
      <SegmentedControl.Root {...props}>
         {stringItems &&
            stringItems.map((item, i) => (
               <SegmentedControl.Item value={item} key={i}>
                  {item}
               </SegmentedControl.Item>
            ))}
         {items &&
            items.map(({ value, title }, i) => (
               <SegmentedControl.Item value={value} key={i}>
                  {title || value}
               </SegmentedControl.Item>
            ))}
      </SegmentedControl.Root>
   );
}

export default Segments;

