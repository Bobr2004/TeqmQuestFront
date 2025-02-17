import { Avatar, Button, TextArea } from "@radix-ui/themes";
import { useAppSelector } from "../../store/store";
import {
   useAddCommentMutation,
   useGetQuestCommentsQuery
} from "../../store/comment/comment.api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "../../configs/routes";
import Comment from "./Comment";

type CommetsSectionProps = {
   id: number;
};

function CommetsSection({ id }: CommetsSectionProps) {
   const { user } = useAppSelector((store) => store.auth);

   const [addComment, { isLoading: isCommentSending }] =
      useAddCommentMutation();
   const { data: comments, isLoading: isCommentsLoading } =
      useGetQuestCommentsQuery(id);
   const navigate = useNavigate();

   const [newComment, setNewComment] = useState<string>("");

   const handleAddComment = () => {
      if (!user) return void navigate(routes.login);

      if (!isCommentSending)
         addComment({ title: newComment, questId: id })
            .unwrap()
            .then(() => {
               setNewComment("");
            })
            .catch(console.log);
   };

   return (
      <section className="space-y-2 mb-4">
         <h2 className="font-bold text-lg">Comments:</h2>
         <div className="space-y-2">
            <div className="flex gap-2 items-stretch">
               <Avatar fallback="A" src={user?.image} size="5" />
               <TextArea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-grow"
                  rows={1}
               />
               <div className="flex flex-col items-center">
                  <Button
                     disabled={newComment.length === 0}
                     onClick={handleAddComment}
                     className=""
                  >
                     Comment
                  </Button>
                  <Button
                     onClick={() => {
                        setNewComment("");
                     }}
                     color="gray"
                     variant="ghost"
                     className="!mt-0.5 !px-4"
                  >
                     clear
                  </Button>
               </div>
            </div>
            <div className="flex justify-end"></div>
         </div>

         <div className="space-y-2 py-2">
            {!isCommentsLoading &&
               comments &&
               comments
                  .slice()
                  .reverse()
                  .map((comment) => (
                     <Comment key={comment.id} comment={comment} />
                  ))}
         </div>
      </section>
   );
}

export default CommetsSection;
