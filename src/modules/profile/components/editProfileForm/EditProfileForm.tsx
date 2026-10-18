import { Alert, App, Button, Form, Input, Radio } from "antd";
import { getErrorMessage } from "core/http";
import { useActions } from "core/hooks/useActions";
import usersApi from "core/modules/users/api/usersApi";
import type { CurrentUser } from "core/modules/users/types/usersTypes";
import { useState } from "react";

type EditProfileFormProps = {
  user: CurrentUser;
  onSubmit: () => void;
  onCancel: () => void;
  onSavingChange: (saving: boolean) => void;
};
type ProfileFormValues = Pick<
  CurrentUser,
  "id" | "name" | "lastName" | "middleName" | "email" | "gender"
>;

const EditProfileForm = ({
  user,
  onSubmit,
  onCancel,
  onSavingChange,
}: EditProfileFormProps) => {
  const { updateCurrentUser } = useActions();
  const { message } = App.useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (fields: ProfileFormValues) => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    onSavingChange(true);
    setError("");

    try {
      await usersApi.updateUser(fields);
      updateCurrentUser(fields);
      message.success("Профиль сохранён");
      onSubmit();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsSaving(false);
      onSavingChange(false);
    }
  };

  return (
    <Form<ProfileFormValues>
      layout="vertical"
      requiredMark={false}
      initialValues={user}
      onFinish={onFinish}
      disabled={isSaving}
    >
      {error && <Alert type="error" title={error} showIcon role="alert" />}
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Имя" name="name">
        <Input placeholder="Ваше имя" autoComplete="given-name" />
      </Form.Item>
      <Form.Item label="Фамилия" name="lastName">
        <Input placeholder="Ваша фамилия" autoComplete="family-name" />
      </Form.Item>
      <Form.Item label="Отчество" name="middleName">
        <Input placeholder="Ваше отчество" autoComplete="additional-name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: "email", message: "Введите корректный email" }]}
      >
        <Input placeholder="Ваш email" autoComplete="email" />
      </Form.Item>
      <Form.Item label="Пол" name="gender">
        <Radio.Group>
          <Radio value="MAN">Мужчина</Radio>
          <Radio value="WOMAN">Женщина</Radio>
        </Radio.Group>
      </Form.Item>
      <div className="profile-dialog__actions">
        <Button type="primary" htmlType="submit" loading={isSaving}>
          {isSaving ? "Сохраняем…" : "Сохранить"}
        </Button>
        <Button onClick={onCancel}>Отмена</Button>
      </div>
    </Form>
  );
};

export default EditProfileForm;
