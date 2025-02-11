import { useState } from "react";

type ImageInputProps = {
   setImageState: (image: File) => void;
};

function ImageInput({ setImageState }: ImageInputProps) {
   const [image, setImage] = useState<File | null>(null);
   const imageSrcCopy = image ? URL.createObjectURL(image) : null;

   const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target.files?.length && target.files[0]) {
         setImage(target.files[0]);
         // TODO: Image validation
         if (true) {
            setImageState(target.files[0]);
         }
      }
   };

   return (
      <label>
         <div
            className="border border-dashed border-[var(--accent-10)] cursor-pointer h-60
      rounded-[var(--radius-4)] flex flex-col gap-3 
     justify-center items-center text-[var(--accent-10)] hover:border-[var(--accent-11)] hover:text-[var(--accent-11)]"
         >
            {imageSrcCopy ? (
               <div className="h-full p-2">
                  <img
                     src={imageSrcCopy}
                     className="object-contain block h-full"
                  />
               </div>
            ) : (
               <>
                  <p className="pi pi-image text-5xl"></p>
                  <p className="font-bold">Upload Photo</p>
               </>
            )}
         </div>
         <input type="file" className="hidden" onChange={onChange} />
         <p className="text-[var(--accent-10)]">{image?.name}</p>
      </label>
   );
}

export default ImageInput;
