import { Dialog } from "@radix-ui/themes";

type ModalProps = {
   trigger: React.ReactNode;
   content: React.ReactNode;
   // maxWidth?: string;
};

function Modal({ trigger, content }: ModalProps) {
   return (
      <Dialog.Root>
         <Dialog.Trigger>{trigger}</Dialog.Trigger>
         <Dialog.Content maxWidth="450px">{content}</Dialog.Content>
      </Dialog.Root>
   );
}

export default Modal;
