import { Button, Dialog } from '@radix-ui/themes';
import { useAppDispatch } from '../../store/store';
import { clearQuestCache } from '../../store/quest/quest.slice';
import { useRef } from 'react';

function ClearCacheModal() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  const handleClearCache = () => {
    dispatch(clearQuestCache());
    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  return (
    <>
      <Dialog.Title className="text-center">
        Are you sure you want to clear your cache?
      </Dialog.Title>
      All unfinished quests will be permanently lost
      <div className="flex gap-2 justify-center">
        <Dialog.Close>
          <Button variant="soft" color="gray" ref={closeButtonRef}>
            Cancel
          </Button>
        </Dialog.Close>
        <Button color="red" onClick={handleClearCache}>
          Clear <p className="pi pi-sign-out"></p>
        </Button>
      </div>
    </>
  );
}

export default ClearCacheModal;
