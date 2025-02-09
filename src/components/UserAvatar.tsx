import { ChangeEvent, useRef } from 'react';
import { useChangeAvatarMutation } from '../store/auth/auth.api';
import { Avatar, Button, Popover } from '@radix-ui/themes';
import { useAppSelector } from '../store/store';

const UserAvatar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [changeAvatar, { isLoading: isAvatarChanging }] =
    useChangeAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeAvatar = () => {
    if (fileInputRef.current && !isAvatarChanging) {
      fileInputRef.current.click();
    }
  };

  const handleSaveAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const fd = new FormData();
      fd.append('image', e.target.files[0]);

      changeAvatar(fd)
        .unwrap()
        .then(() => {})
        .catch(console.log);
    }
  };

  if (user)
    return (
      <Popover.Root>
        <Popover.Trigger>
          {/* trigger does not work when avatar renders fallback, therefore added div*/}
          <div>
            <Avatar fallback="A" src={user.image} />
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <p>{user.username}</p>
          <Button onClick={handleChangeAvatar}>Change avatar</Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleSaveAvatar}
          />
        </Popover.Content>
      </Popover.Root>
    );
};

export default UserAvatar;
