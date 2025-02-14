import { Button } from "@radix-ui/themes";
import { useState } from "react";

type RatingSectionProps = {
   id: number;
   rating: number;
};

function RatingSection({ rating }: RatingSectionProps) {
   const [selectedButton, setSelectedButton] = useState<2 | 4 | 5 | null>(null);

   // const sendRating = (rate: number) => () => {
   //    console.log(id);
   // };

   return (
      <section>
         <div className="space-y-1">
            <p>
               {rating || "Not rated"} <i className="pi pi-star-fill"></i>
            </p>
            <p className="text-[var(--gray-10)] text-sm">
               What do you think about this quest?
            </p>
            <div className="flex gap-4">
               <Button
                  variant={selectedButton === 2 ? "solid" : "outline"}
                  color="gray"
                  onClick={() => setSelectedButton(2)}
                  className="!m-0"
               >
                  Boring
               </Button>
               <Button
                  variant={selectedButton === 4 ? "solid" : "outline"}
                  color="yellow"
                  onClick={() => setSelectedButton(4)}
                  className="!m-0"
               >
                  Great
               </Button>
               <Button
                  variant={selectedButton === 5 ? "solid" : "outline"}
                  color="grass"
                  onClick={() => setSelectedButton(5)}
                  className="!m-0"
               >
                  Awazing
               </Button>
            </div>
         </div>
      </section>
   );
}

export default RatingSection;
