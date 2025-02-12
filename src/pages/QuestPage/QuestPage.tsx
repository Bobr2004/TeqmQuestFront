import { useParams } from "react-router";
import { useGetQuestByIdQuery } from "../../store/quest/quest.api";
import { Button, Separator, Skeleton, TextArea } from "@radix-ui/themes";
import Modal from "../../components/ui/Modal";
import QuestRating from "./QuestRating";
import CreateRoomForm from "./CreateRoomForm";

function QuestPage() {
   const { id } = useParams();

   // const { data: questData, isLoading } = useGetQuestByIdQuery(Number(id));
   const isLoading = true;

   return (
      <>
         <div className="container mx-auto p-4 h-full">
            <div className="grid md:grid-cols-[1fr_2fr] gap-4 h-4/5">
               <section className="space-y-3">
                  <h1 className="text-2xl font-bold text-center">
                     One piece Quest
                  </h1>
                  <div className="h-[240px] border p-2 border-[var(--gray-4)] rounded-[var(--radius-4)]">
                     <img
                        src="https://test-task-h.s3.eu-north-1.amazonaws.com/task/image/2ed5642f-22eb-4a77-a392-7ac647b1e3a03.webp"
                        className="object-contain block h-full w-full"
                     />
                  </div>
                  <p className="text-[var(--gray-10)]">
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                     Sint esse praesentium necessitatibus fuga ipsa officia
                     consequuntur nesciunt odio sit! Incidunt ipsum unde ea
                     amet, officia eius illo sunt sequi. Eligendi?
                  </p>
                  <p>Time limit: 00:20:00</p>
                  {/* <QuestRating rating={3.8} /> */}
               </section>
               <section>
                  <h2 className="font-bold text-lg">Browse Public Rooms:</h2>
                  <ul className="grid sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                     <li>
                        <Modal
                           trigger={
                              <Button className="!w-full">Create room</Button>
                           }
                           content={<CreateRoomForm />}
                        />
                     </li>
                     <li>
                        <Skeleton>
                           <Button className="!w-full">Create room</Button>
                        </Skeleton>
                     </li>
                     <li>
                        <Skeleton>
                           <Button className="!w-full">Create room</Button>
                        </Skeleton>
                     </li>
                  </ul>
               </section>
            </div>
            <Separator className="!w-full !my-4" />
            <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-4">
               <section>
                  <h2 className="font-bold text-lg">Rating:</h2>
               </section>
               <section className="space-y-2  mb-4">
                  <h2 className="font-bold text-lg">Comments:</h2>
                  <TextArea />
               </section>
            </div>
         </div>
      </>
   );
}

export default QuestPage;
