import {
   Avatar,
   Box,
   Button,
   Dialog,
   Flex,
   Popover,
   RadioCards,
   SegmentedControl,
   Separator,
   TextArea,
   TextField,
   Theme
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
   // Example
   const [radioValue, setRadioValue] = useState("");

   const handleQuestionResult = () => {
      if (radioValue === "Hashirama") toast.success("Correct!");
      else toast.error("Wrong answer");
   };

   //  Theme change
   const [theme, setTheme] = useState<"dark" | "light">(
      () => (localStorage.getItem("theme") as "dark" | "light") || "dark"
   );
   useEffect(() => {
      localStorage.setItem("theme", theme);
   }, [theme]);

   return (
      <>
         <Theme accentColor="green" appearance={theme}>
            {/* Example */}
            <section className="container mx-auto p-4 space-y-2">
               <h2 className="text-xl font-bold">Question example:</h2>
               <h2 className="text-2xl text-center font-bold">
                  Who was the first Hokage?
               </h2>

               <RadioCards.Root
                  value={radioValue}
                  onValueChange={setRadioValue}
                  className="!grid !grid-cols-2"
               >
                  <RadioCards.Item value="Naruto">Naruto</RadioCards.Item>
                  <RadioCards.Item value="Hashirama">Hashirama</RadioCards.Item>
                  <RadioCards.Item value="Gol D. Roger">
                     Gol D. Roger
                  </RadioCards.Item>
                  <RadioCards.Item value="Sarutobi">Sarutobi</RadioCards.Item>
               </RadioCards.Root>

               <p className="text-xl">Your answer: {radioValue}</p>
               <div className="flex gap-2 justify-end">
                  <Button variant="surface">Skip question</Button>
                  <Button disabled={!radioValue} onClick={handleQuestionResult}>
                     Submit
                  </Button>
               </div>
            </section>
            <div className="container mx-auto px-4">
               <Separator className="!w-full" />
            </div>

            {/* Notifications */}
            <section className="container mx-auto p-4 space-y-2">
               <h2 className="text-xl font-bold">Notifications:</h2>
               <div className="flex gap-4">
                  <Button variant="surface" onClick={() => toast("Niggas")}>
                     Base
                  </Button>
                  <Button
                     variant="surface"
                     onClick={() => toast.error("Niggas error")}
                  >
                     Error
                  </Button>
                  <Button
                     variant="surface"
                     onClick={() => toast.success("Niggas success")}
                  >
                     Success
                  </Button>
               </div>
            </section>
            <div className="container mx-auto px-4">
               <Separator className="!w-full" />
            </div>
            {/* Theme change */}
            <section className="container mx-auto p-4 space-y-2">
               <h2 className="text-xl font-bold">Change theme appearance:</h2>
               <SegmentedControl.Root
                  value={theme}
                  onValueChange={(val) => setTheme(val as "dark" | "light")}
               >
                  <SegmentedControl.Item value="dark">
                     Dark
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="light">
                     Light
                  </SegmentedControl.Item>
               </SegmentedControl.Root>
            </section>
            <div className="container mx-auto px-4">
               <Separator className="!w-full" />
            </div>
            {/* Modal */}
            <section className="container mx-auto p-4 space-y-2">
               <h2 className="text-xl font-bold">Modal:</h2>
               <Dialog.Root>
                  <Dialog.Trigger>
                     <Button variant="soft">Edit profile</Button>
                  </Dialog.Trigger>

                  <Dialog.Content maxWidth="450px">
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
                  </Dialog.Content>
               </Dialog.Root>
            </section>
            <div className="container mx-auto px-4">
               <Separator className="!w-full" />
            </div>
            {/* Popover */}
            <section className="container mx-auto p-4 space-y-2">
               <h2 className="text-xl font-bold">Popover:</h2>
               <Popover.Root>
                  <Popover.Trigger>
                     <Button variant="soft">Comment</Button>
                  </Popover.Trigger>
                  <Popover.Content width="360px">
                     <div className="flex gap-3">
                        <Avatar
                           size="2"
                           src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                           fallback="A"
                           radius="full"
                        />
                        <Box flexGrow="1">
                           <TextArea
                              placeholder="Write a comment…"
                              style={{ height: 80 }}
                           />
                           <Flex gap="3" mt="3" justify="between">
                              <Popover.Close>
                                 <Button size="1">Comment</Button>
                              </Popover.Close>
                           </Flex>
                        </Box>
                     </div>
                  </Popover.Content>
               </Popover.Root>
            </section>

            <Toaster
               toastOptions={{
                  style: {
                     background: "var(--color-background)",
                     border: "1px solid var(--gray-6)",
                     color: "var(--gray-11)"
                  },
                  success: {
                     iconTheme: {
                        primary: "var(--accent-10)",
                        secondary: "white"
                     }
                  },
                  error: {
                     iconTheme: {
                        primary: "var(--red-10)",
                        secondary: "white"
                     }
                  }
               }}
               position="bottom-right"
            />
         </Theme>
      </>
   );
}

export default App;
