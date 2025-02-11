import toast from "react-hot-toast";
import QuestCard, { QuestCardProps } from "./QuestCard";
import Modal from "../../components/ui/Modal";
import { useAppSelector } from "../../store/store";
import QuestForm from "../../components/QuestForm";
import { useEffect, useState } from "react";

const HomePage = () => {
   const { user } = useAppSelector((state) => state.auth);

   const [quests, setQuests] = useState<QuestCardProps[]>([]);

   useEffect(() => {
      const token =
         "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImlkIjoxOCwidXNlcm5hbWUiOiJha2FnYW1pMjIyMiIsInN1YiI6ImFrYWdhbWkyMjIyIiwiaWF0IjoxNzM5MjMxMDUwLCJleHAiOjE3NjM0MjMwNTB9.UkfrD8yLS56o1SZu8NwX0Sa1q8wnmdpvRftOE6R5L1q-Bau2tXpylNjrElQ0DtQ6VZELEBNc2bik3zwR-_HX6w";

      (async () => {
         const data: QuestCardProps[] = await fetch(
            "http://13.60.43.26/api/quests",
            {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            }
         ).then((res) => res.json());
         setQuests(data);
      })();
   }, []);

   return (
      <section className="container mx-auto p-4">
         {/* <NewQuest /> */}
         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
            {user ? (
               <Modal
                  trigger={
                     <article>
                        <NewQuestCard />
                     </article>
                  }
                  content={<QuestForm />}
               />
            ) : (
               <div onClick={() => toast.error("You are not logged in!")}>
                  <NewQuestCard />
               </div>
            )}
            {quests &&
               quests.length &&
               quests.map((quest) => <QuestCard {...quest} key={quest.id} />)}
         </div>
      </section>
   );
};

function NewQuestCard() {
   return (
      <div
         className="border border-dashed border-[var(--accent-10)] cursor-pointer h-[126px]
      rounded-[var(--radius-4)] flex flex-col gap-3 
     justify-center items-center text-[var(--accent-10)] hover:border-[var(--accent-11)] hover:text-[var(--accent-11)]"
      >
         <p className="pi pi-plus  text-5xl"></p>
         <p className="font-bold">Create new quest</p>
      </div>
   );
}

export default HomePage;
