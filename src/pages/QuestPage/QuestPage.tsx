import { useParams } from "react-router";

function QuestPage() {
   const { id } = useParams();
   return (
      <>
         <section className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">Title</h1>
            <p></p>
         </section>
      </>
   );
}

export default QuestPage;
