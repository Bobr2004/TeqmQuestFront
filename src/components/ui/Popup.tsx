import { Button, Popover, TextArea } from "@radix-ui/themes";

type PopupProps = {
   trigger: React.ReactNode;
   content: React.ReactNode;
};

function Popup({ trigger, content }: PopupProps) {
   return (
      <Popover.Root>
         <Popover.Trigger>{trigger}</Popover.Trigger>
         <Popover.Content width="360px">{content}</Popover.Content>
      </Popover.Root>
   );
}

const ExamplePopup = (
   <Popup
      trigger={<Button variant="soft">Comment</Button>}
      content={
         <>
            <TextArea placeholder="Write a comment…" style={{ height: 80 }} />
            <div className="mt-3 flex gap-3">
               <Popover.Close>
                  <Button>Comment</Button>
               </Popover.Close>
            </div>
         </>
      }
   />
);

export default Popup;

