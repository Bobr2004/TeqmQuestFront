import { Button, Dialog } from '@radix-ui/themes';
import ImageInput from '../../components/ImageInput';
import { useRef, useState } from 'react';
import {
  useChangeAvatarMutation,
  useLazyGetCurrentUserQuery
} from '../../store/auth/auth.api';
import { useAppDispatch } from '../../store/store';
import { setUser } from '../../store/auth/auth.slice';

function ChangeImageForm() {
  const [image, setImage] = useState<File | null>(null);
  const [changeAvatar, { isLoading }] = useChangeAvatarMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const dispatch = useAppDispatch();

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = () => {
    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  const handleUploadImage = () => {
    if (!isLoading && image) {
      const fd = new FormData();
      fd.append('image', image);

      changeAvatar(fd)
        .unwrap()
        .then(() =>
          getCurrentUser()
            .unwrap()
            .then((user) => {
              dispatch(setUser(user));
              closeModal();
            })
        )
        .catch(console.log);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">Change profile picture</h2>
      <ImageInput setImageState={setImage} />
      <div className="flex gap-2 justify-center">
        <Dialog.Close>
          <Button color="gray" variant="soft" ref={closeButtonRef}>
            Cancel
          </Button>
        </Dialog.Close>
        <Button onClick={handleUploadImage}>Submit</Button>
      </div>
    </div>
  );
}

export default ChangeImageForm;
