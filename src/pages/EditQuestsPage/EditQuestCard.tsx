import { Button, ScrollArea } from '@radix-ui/themes';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import { EditableQuest } from './editQuestTypes';
import { routes } from '../../configs/routes';

function EditQuestCard({
  isSpecial,
  id,
  name,
  description,
  time,
  isPublished,
  onDelete
}: EditableQuest & { onDelete?: () => void; isSpecial?: boolean, isPublished?:  boolean }) {
  const deleteQuest = () => {
    onDelete && onDelete();
    toast.success('Successfully deleted');
  };

  return (
    <article
      className={`${
        isSpecial ? 'specialCard' : ''
      } border border-[var(--accent-6)] py-2 px-2 rounded-[var(--radius-4)] bg-[var(--accent-2)]`}>
      <div>
        <h3 className="texx-lg font-bold">{name}</h3>
        <ScrollArea className="!h-[25px]">
          <p className="text-[var(--gray-10)]">{description}</p>
        </ScrollArea>

        <div className="flex gap-2 justify-between">
          {time ? <p>Time Limit: {time || 'Not specified'}</p> : <p></p>}
          <div className="flex gap-2 items-center">
            <Button color="red" size="1" onClick={deleteQuest} variant="soft">
              Delete
            </Button>
            <Link to={routes.toEditQuest(String(id))}>
              <Button size="1" variant="soft">
                Edit <p className="pi pi-hammer"></p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EditQuestCard;
