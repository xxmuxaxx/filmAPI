import { useDeleteMovie } from "../../model/mutations";
import { App, Button, Form, Input } from "antd";
import { getErrorMessage } from "shared/api";

const { Item } = Form;

const initialValues = {
  id: "",
};

const rules = {
  id: [
    {
      required: true,
      message: "Обязательное поле!",
    },
  ],
};

type DeleteMovieFormProps = {
  initialId?: number;
  onSubmit?: () => void;
};

const DeleteMovieForm = ({
  initialId,
  onSubmit = () => {},
}: DeleteMovieFormProps) => {
  const { message } = App.useApp();
  const [deleteFilmForm] = Form.useForm();
  const mutation = useDeleteMovie();
  const isFetching = mutation.isPending;

  const onFinish = async ({ id }: { id: number }) => {
    if (isFetching) {
      return;
    }
    try {
      await mutation.mutateAsync(id);
      message.success("Фильм удален!");
      onSubmit();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  return (
    <Form
      name="delete-film-form"
      form={deleteFilmForm}
      initialValues={{ ...initialValues, id: initialId }}
      onFinish={onFinish}
    >
      <Item name="id" rules={rules.id}>
        <Input placeholder="ID" disabled={!!initialId} />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Удалить
        </Button>
      </Item>
    </Form>
  );
};

export default DeleteMovieForm;
