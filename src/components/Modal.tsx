import { Button, Dialog, TextField } from "@radix-ui/themes";

type ModalProps = {
   trigger: React.ReactNode;
   content: React.ReactNode;
};

function Modal({ trigger, content }: ModalProps) {
   return (
      <Dialog.Root>
         <Dialog.Trigger>{trigger}</Dialog.Trigger>
         <Dialog.Content maxWidth="450px">{content}</Dialog.Content>
      </Dialog.Root>
   );
}

const ModalExample = (
   <Modal
      trigger={<Button>Open Example modal</Button>}
      content={
         <>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description size="2" mb="4">
               Make changes to your profile.
            </Dialog.Description>

            <div className="flex flex-col gap-3">
               <label>
                  <p className="font-bold">Name</p>
                  <TextField.Root
                     defaultValue="Sigma"
                     placeholder="Enter your full name"
                  />
               </label>
               <label>
                  <p className="font-bold">Email</p>
                  <TextField.Root
                     defaultValue="megasigma@gmail.com"
                     placeholder="Enter your email"
                  />
               </label>
            </div>

            <div className="flex gap-3 mt-4">
               <Dialog.Close>
                  <Button variant="soft" color="gray">
                     Cancel
                  </Button>
               </Dialog.Close>
               <Dialog.Close>
                  <Button>Save</Button>
               </Dialog.Close>
            </div>
         </>
      }
   />
);

export default Modal;
