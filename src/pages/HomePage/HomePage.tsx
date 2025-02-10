import toast from "react-hot-toast";
import NewQuestCard from "../../components/NewQuestCard";
import QuestCard from "../../components/QuestCard";
import Modal from "../../components/ui/Modal";
import { useAppSelector } from "../../store/store";
import NewQuest from "./NewQuest";

const HomePage = () => {
   const { user } = useAppSelector((state) => state.auth);

   return (
      <section className="container mx-auto p-4">
         {/* <NewQuest /> */}
         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
            {user ? (
               <Modal
                  trigger={
                     <div>
                        <NewQuestCard />
                     </div>
                  }
                  content={<NewQuest />}
               />
            ) : (
               <div onClick={()=>toast.error("You are not logged in!")}><NewQuestCard /></div>
            )}

            <QuestCard />
            <QuestCard />
            <QuestCard />
            <QuestCard />
            <QuestCard />
         </div>
      </section>
   );
};

export default HomePage;
