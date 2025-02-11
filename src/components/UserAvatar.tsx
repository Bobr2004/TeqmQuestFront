import { Avatar, Button } from '@radix-ui/themes';
import { useAppSelector } from '../store/store';
import Popup from './ui/Popup';
import { NavLink } from 'react-router';
import Modal from './ui/Modal';
import LogoutModal from '../pages/SettingsPage/LogoutModal';
import { routes } from '../configs/routes';

const UserAvatar = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (user)
    return (
      <Popup
        trigger={
          <div className="cursor-pointer">
            <Button
              variant="ghost"
              color="gray"
              className="!p-1 !flex !gap-2 !items-center !-mt-1">
              <Avatar fallback="A" src={user.image} size="2" />
              <p className="mr-1">{user.username}</p>
            </Button>
          </div>
        }
        content={
          <div className="flex flex-col gap-3">
            <p>Username: {user.username}</p>
            <Button asChild variant="outline">
              <NavLink to={routes.settings}>
                Settings <p className="pi pi-cog"></p>
              </NavLink>
            </Button>
            <Modal
              trigger={
                <Button variant="outline" color="red">
                  Logout <p className="pi pi-sign-out"></p>
                </Button>
              }
              content={<LogoutModal />}
            />
          </div>
        }
      />

      // <Popover.Root>
      //   <Popover.Trigger>
      //     {/* trigger does not work when avatar renders fallback, therefore added div*/}
      //     <div>
      //       <Avatar fallback="A" src={user.image} size="2"/>
      //     </div>
      //   </Popover.Trigger>
      //   <Popover.Content>
      //     <p>{user.username}</p>
      //     <Button onClick={handleChangeAvatar}>Change avatar</Button>
      //     <input
      //       type="file"
      //       accept="image/*"
      //       style={{ display: 'none' }}
      //       ref={fileInputRef}
      //       onChange={handleSaveAvatar}
      //     />
      //   </Popover.Content>
      // </Popover.Root>
    );
};

export default UserAvatar;
