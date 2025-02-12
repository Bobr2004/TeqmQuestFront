import { useNavigate } from 'react-router';
import { routes } from '../../configs/routes';
import { useAppDispatch } from '../../store/store';
import { Button, Dialog } from '@radix-ui/themes';
import { logout } from '../../store/auth/auth.slice';
import { useDeleteAccountMutation } from '../../store/auth/auth.api';

const DeleteAccountModal = () => {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    if (!isLoading) {
      deleteAccount()
        .unwrap()
        .then(() => {
          dispatch(logout());
          navigate(routes.home);
        })
        .catch(console.log);
    }
  };

  return (
    <>
      <Dialog.Title className="text-center">
        Are you sure you want to delete your account?
      </Dialog.Title>
      <div className="flex gap-2 justify-center">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Button color="red" onClick={handleDeleteAccount}>
          Proceed <p className="pi pi-sign-out"></p>
        </Button>
      </div>
    </>
  );
};

export default DeleteAccountModal;
