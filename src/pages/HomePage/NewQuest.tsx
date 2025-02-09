import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import ErrorFormMessage from '../../components/ErrorFormMessage';
import { useCreateQuestMutation } from '../../store/quest/quest.api';
import { useNavigate } from 'react-router';

const questScheme = z.object({
  name: z.string().nonempty('Provide quest name'),
  description: z.string().nonempty('Provide quest description'),
  time: z.number().optional()
});

export type questData = z.infer<typeof questScheme>;

const NewQuest = () => {
  const [createQuest, { isLoading }] = useCreateQuestMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<questData>({
    resolver: zodResolver(questScheme)
  });

  const onSubmit: SubmitHandler<questData> = (data) => {
    if (!isSubmitting && !isLoading) {
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('description', data.description);
      if (data.time) fd.append('time', data.time.toString());

      createQuest(fd)
        .unwrap()
        .then((quest) => navigate(`/edit-quest/${quest.id}`))
        .catch(console.log);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[450px] mx-auto p-4 flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-center">Creating new quest</h2>
        <label>
          <p className="font-bold">Name:</p>
          <TextField.Root {...register('name')} placeholder="Name" />
        </label>
        {errors.name && (
          <ErrorFormMessage>{errors.name.message}</ErrorFormMessage>
        )}

        <label>
          <p className="font-bold">Description:</p>
          <TextArea {...register('description')} placeholder="Description" />
        </label>
        {errors.description && (
          <ErrorFormMessage>{errors.description.message}</ErrorFormMessage>
        )}

        <label>
          <p className="font-bold">Time Limit:</p>
          <TextField.Root
            type="number"
            {...register('time')}
            placeholder="Time limit"
          />
        </label>

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewQuest;
