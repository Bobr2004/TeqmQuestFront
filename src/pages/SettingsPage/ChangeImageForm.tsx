import { Button, Dialog } from "@radix-ui/themes";
import ImageInput from "../../components/ImageInput";
import { useState } from "react";

function ChangeImageForm() {
   const [image, setImage] = useState<File | null>(null);


   return (
      <form className="flex flex-col gap-4">
         <h2 className="text-2xl font-bold text-center">
            Change profile picture
         </h2>
         <ImageInput setImageState={setImage} />
         <div className="flex gap-2 justify-center">
            <Dialog.Close>
               <Button color="gray" variant="soft">
                  Cancel
               </Button>
            </Dialog.Close>
            <Button>Submit</Button>
         </div>
      </form>
   );
}

export default ChangeImageForm;
