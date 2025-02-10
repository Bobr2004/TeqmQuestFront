import { RadioCards } from "@radix-ui/themes";

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

function OptionCards({ items, stringItems, row, ...props }: OptionsProps & {row?: boolean}) {
   return (
      <RadioCards.Root className={`${row ? "!flex !gap-1" : "!grid !grid-cols-2"}`} {...props}>
         {stringItems &&
            stringItems.map((item) => (
               <RadioCards.Item value={item} className={`${row ? "!py-1 px-1.5": ""}`}>{item}</RadioCards.Item>
            ))}
         {items &&
            items.map(({ value, title }) => (
               <RadioCards.Item value={value} className={`${row ? "!py-1 px-1.5": ""}`}>{title}</RadioCards.Item>
            ))}
      </RadioCards.Root>
   );
}

export default OptionCards;
