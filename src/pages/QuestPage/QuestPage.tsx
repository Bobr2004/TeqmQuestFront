// import { useParams } from "react-router";
// import { useGetQuestByIdQuery } from "../../store/quest/quest.api";
import { Button, Separator, Spinner } from "@radix-ui/themes";
import Modal from "../../components/ui/Modal";
// import QuestRating from "./QuestRating";
import CreateRoomForm from "./CreateRoomForm";
import RatingSection from "./RatingSection";
import CommetsSection from "./CommetsSection";
import { useParams } from "react-router";
import { useGetQuestByIdQuery } from "../../store/quest/quest.api";
import ImageWithLoader from "../../components/ImageWithLoader";
import RoomCard from "./RoomCard";
import { useGetRoomsByQuestIDQuery } from "../../store/room/room.api";
import { useAppSelector } from "../../store/store";
import toast from "react-hot-toast";
import NotFoundPage from "../NotFoundPage";

function QuestPage() {
   const { id } = useParams();

   const { data: questData, isLoading: isQuestLoading } = useGetQuestByIdQuery(
      Number(id)
   );

   const { data: roomsList } = useGetRoomsByQuestIDQuery(Number(id));

   const user = useAppSelector((store) => store.auth.user);

   if (isQuestLoading)
      return (
         <>
            <section className="container mx-auto p-4 flex justify-center">
               <Spinner size="3" />
            </section>
         </>
      );

   if (!questData) return <NotFoundPage />;

   if (questData)
      return (
         <>
            <div className="container mx-auto p-4 h-full">
               <div className="grid md:grid-cols-[1fr_2fr] gap-4 h-[75%]">
                  <section className="space-y-3">
                     <h1 className="text-2xl font-bold text-center">
                        {questData.title}
                     </h1>
                     <div className="h-[240px] border p-2 border-[var(--gray-4)] rounded-[var(--radius-4)]">
                        {questData.image && (
                           <ImageWithLoader
                              src={questData.image}
                              // className="object-contain block h-full w-full"
                           />
                        )}
                     </div>
                     <p className="text-[var(--gray-10)]">
                        {questData.description}
                     </p>
                     <p>Time limit: 00:20:00</p>
                  </section>
                  <section>
                     <div className="flex gap-2 justify-between items-center">
                        <h2 className="font-bold text-lg">
                           Browse Public Rooms:
                        </h2>
                        {user ? (
                           <Modal
                              trigger={<Button>Create room</Button>}
                              content={<CreateRoomForm id={Number(id)} />}
                           />
                        ) : (
                           <Button
                              onClick={() => {
                                 toast.error("You are not logged in!");
                              }}
                           >
                              Create room
                           </Button>
                        )}
                     </div>
                     <ul className="grid gap-2 mt-2">
                        {/* TODO: list all rooms from api */}
                        {roomsList &&
                           roomsList.map((room) => (
                              <li key={room.id}>
                                 <RoomCard {...room} />
                              </li>
                           ))}
                        {roomsList?.length === 0 && (
                           <p className="text-[var(--gray-10)]">
                              No active rooms for this quest yet
                           </p>
                        )}
                     </ul>
                  </section>
               </div>
               <Separator className="!w-full !my-4" />
               <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                  <RatingSection id={Number(id)} rating={questData.rating} />

                  <CommetsSection id={Number(id)} />
               </div>
            </div>
         </>
      );
}

export default QuestPage;
