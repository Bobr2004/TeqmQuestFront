import { Avatar, Button, Tooltip } from "@radix-ui/themes";
import {
   IComment,
   useDeleteCommentByIdMutation
} from "../../store/comment/comment.api";
import { useAppSelector } from "../../store/store";
import Popup from "../../components/ui/Popup";
import toast from "react-hot-toast";

interface Props {
   comment: IComment;
}

const Comment = ({ comment }: Props) => {
   const { user } = useAppSelector((store) => store.auth);

   const [removeComment, { isLoading: isCommentDeleting }] =
      useDeleteCommentByIdMutation();

   const handleRemoveComment = (commentId: number) => () => {
      if (!isCommentDeleting)
         removeComment(commentId).unwrap().catch(console.log);
   };

   return (
      <div className="flex gap-2 items-stretch">
         <div>
            <Avatar fallback="A" src={comment.userDTO.image} size="3" />
         </div>
         <div className="flex-grow">
            <p className="text-sm text-[var(--gray-10)]">
               {comment.userDTO.username}
            </p>
            <p>{comment.title}</p>
         </div>
         <Popup
            trigger={
               <Button
                  variant="ghost"
                  className="!m-0 !py-2 !px-1"
                  color="gray"
               >
                  <i className="pi pi-ellipsis-v"></i>
               </Button>
            }
            content={
               <div className="flex flex-col gap-1 !-my-1">
                  <Button
                     variant="ghost"
                     color="gray"
                     onClick={() => {
                        toast.error("This feature is not added yet");
                     }}
                  >
                     Report
                     <i className="pi pi-flag-fill"></i>
                  </Button>
                  {user && user.id === comment.userDTO.id && (
                     <Button
                        variant="ghost"
                        color="red"
                        onClick={handleRemoveComment(comment.id)}
                     >
                        Delete
                        <i className="pi pi-trash"></i>
                     </Button>
                  )}
               </div>
            }
         />
      </div>
   );
};

export default Comment;
