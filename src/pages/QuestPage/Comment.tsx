import { Avatar, Button, Dialog, TextArea } from '@radix-ui/themes';
import {
  IComment,
  useDeleteCommentByIdMutation
} from '../../store/comment/comment.api';
import { useAppSelector } from '../../store/store';
import Modal from '../../components/ui/Modal';

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
    <div key={comment.id} className="flex gap-2 items-stretch">
      <Avatar fallback="A" src={comment.userDTO.image} size="3" />
      <TextArea disabled value={comment.title} className="flex-grow" />
      {user && comment.userDTO.id === user.id && (
        <>
          <Modal
            trigger={<Button>Delete comment</Button>}
            content={
              <>
                <Dialog.Title className="text-center">
                  Are you sure you want to remove this comment?
                </Dialog.Title>
                <div className="flex gap-2 justify-center">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button color="red" onClick={handleRemoveComment(comment.id)}>
                    Remove <p className="pi pi-sign-out"></p>
                  </Button>
                </div>
              </>
            }
          />
        </>
      )}
    </div>
  );
};

export default Comment;
