import {
   Avatar,
   Button,
   Tooltip
} from "@radix-ui/themes";
import {
   IComment,
   useDeleteCommentByIdMutation
} from "../../store/comment/comment.api";
import { useAppSelector } from "../../store/store";

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
         <Tooltip
            content={
               <>
                  <p>User id: {comment.userDTO.id}</p>
                  {user && comment.userDTO.id === user.id && (
                     <Button
                        color="red"
                        onClick={handleRemoveComment(comment.id)}
                        className="!mt-1"
                     >
                        Delete comment<p className="pi pi-trash"></p>
                     </Button>
                  )}
               </>
            }
         >
            <div>
               <Avatar fallback="A" src={comment.userDTO.image} size="2" />
            </div>
         </Tooltip>
         <p className="flex-grow">{comment.title}</p>
      </div>
   );
};

export default Comment;
