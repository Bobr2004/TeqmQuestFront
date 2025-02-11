import { Button, Dialog } from "@radix-ui/themes";
import ImageInput from "../../components/ImageInput";
import { useRef, useState } from "react";

function ChangeImageForm() {
   const [image, setImage] = useState<File | null>(null);

   const closeButtonRef = useRef<HTMLButtonElement | null>(null);

   const closeModal = () => {
      closeButtonRef.current && closeButtonRef.current.click();
   };

   // Uploading image logic

   return (
      <form className="flex flex-col gap-4">
         <h2 className="text-2xl font-bold text-center">
            Change profile picture
         </h2>
         <ImageInput setImageState={setImage} />
         <div className="flex gap-2 justify-center">
            <Dialog.Close>
               <Button color="gray" variant="soft" ref={closeButtonRef}>
                  Cancel
               </Button>
            </Dialog.Close>
            <Button>Submit</Button>
         </div>
      </form>
   );
}

export default ChangeImageForm;
