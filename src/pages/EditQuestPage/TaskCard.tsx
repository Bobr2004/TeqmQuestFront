import { Button, Card } from "@radix-ui/themes";

type Option = {
   title: string;
   isTrue: boolean;
};

type TaskCardProps = {
   onDelete: () => void;

   title: string;

   image?: File;

   openAnswer?: string;

   options?: Option[];
};

function TaskCard({
   title,
   image,
   openAnswer,
   options,
   onDelete
}: TaskCardProps) {
   const imageSrc = image && URL.createObjectURL(image);

   const modeReturn = () => {
      if (openAnswer)
         return (
            <div>
               <p className="font-semibold">Open answer:</p>
               <p>
                  {openAnswer} <p className="pi pi-check-circle"></p>
               </p>
            </div>
         );
      if (options)
         return (
            <div>
               {/* <p className="font-semibold">Options:</p> */}
               <ul className="grid grid-cols-2 gap-1 mt-2">
                  {options.map((option) => (
                     <li
                        className={`${
                           option.isTrue ? "" : " text-[var(--gray-10)]"
                        } border border-[var(--gray-4)] rounded-[var(--radius-2)] flex justify-between gap-2 items-center py-0.5 px-2`}
                     >
                        <p>{option.title}{" "}</p>
                        {option.isTrue && (
                           <p className="pi pi-check-circle"></p>
                        )}
                     </li>
                  ))}
               </ul>
            </div>
         );
   };

   return (
      <Card className="!h-[126px]">
         <div className="flex gap-4">
            {imageSrc && (
               <div className="h-full w-[100px]">
                  <img src={imageSrc} className="object-contain block h-full" />
               </div>
            )}
            <div className="flex-grow">
               <div className="flex justify-between flex-grow">
                  <h3 className="font-bold text-lg">{title}</h3>
                  <Button color="red" variant="soft" onClick={onDelete}>
                     Delete
                  </Button>
               </div>
               <div>{modeReturn()}</div>
            </div>
         </div>
      </Card>
   );
}

export default TaskCard;
