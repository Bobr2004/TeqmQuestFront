import { useParams } from "react-router";

function EditQuestPage() {
   const { id } = useParams();
   return <div>EditQuestPage {id}</div>;
}

export default EditQuestPage;
