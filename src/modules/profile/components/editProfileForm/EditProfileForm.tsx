import { App, Button, Form, Input, Radio } from 'antd';
import { getErrorMessage } from 'core/http';
import { useActions } from 'core/hooks/useActions';
import usersApi from 'core/modules/users/api/usersApi';
import { CurrentUser } from 'core/modules/users/types/usersTypes';
import { useState, FC } from 'react';

const { Item } = Form;

const initialValues = {
  id: '',
  name: '',
  lastName: '',
  middleName: '',
  email: '',
  gender: '',
};

type EditProfileFormProps = {
  user: CurrentUser;
  onSubmit?: () => void;
};

type ProfileFormValues = Pick<
  CurrentUser,
  'id' | 'name' | 'lastName' | 'middleName' | 'email' | 'gender'
>;

const EditProfileForm: FC<EditProfileFormProps> = ({
  user,
  onSubmit = () => {},
}) => {
  const { updateCurrentUser } = useActions();
  const [isFetching, setIsFetching] = useState(false);
  const { message } = App.useApp();
  const [editProfileForm] = Form.useForm();

  const onFinish = async (fields: ProfileFormValues) => {
    setIsFetching(true);
    try {
      await usersApi.updateUser(fields);
      updateCurrentUser(fields);
      onSubmit();
      message.success('Профиль изменен!');
    } catch (error) {
      message.error(getErrorMessage(error));
    }
    editProfileForm.resetFields();
    setIsFetching(false);
  };

  return (
    <Form
      form={editProfileForm}
      initialValues={{ ...initialValues, ...user }}
      onFinish={onFinish}
    >
      <Item name="id" hidden>
        <Input />
      </Item>
      <Item name="name">
        <Input placeholder="Ваше имя" />
      </Item>
      <Item name="lastName">
        <Input placeholder="Ваша фамилия" />
      </Item>
      <Item name="middleName">
        <Input placeholder="Ваше отчество" />
      </Item>
      <Item name="email">
        <Input placeholder="Ваше отчество" />
      </Item>
      <Item name="gender">
        <Radio.Group>
          <Radio value="MAN">Мужчина</Radio>
          <Radio value="WOMAN">Женщина</Radio>
        </Radio.Group>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Сохранить
        </Button>
      </Item>
    </Form>
  );
};

export default EditProfileForm;
