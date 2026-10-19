import { Alert, App, Button, Form, Input, Radio } from "antd";
import { getErrorMessage } from "shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userApi,
  currentUserQuery,
  useSessionStore,
  userKeys,
} from "entities/user";
import type { CurrentUser } from "entities/user";

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
  const client = useQueryClient();
  const { message } = App.useApp();
  const saveProfile = useMutation({
    mutationFn: async (fields: ProfileFormValues) => {
      const generation = useSessionStore.getState().generation;
      await userApi.update(fields);
      if (generation !== useSessionStore.getState().generation) {
        throw new Error("Сессия завершена");
      }
      const key = currentUserQuery(generation).queryKey;
      client.setQueryData<CurrentUser>(key, (previous) =>
        previous ? { ...previous, ...fields } : previous
      );
      await client.invalidateQueries({ queryKey: userKeys.all });
    },
  });
  const isSaving = saveProfile.isPending;
  const error = saveProfile.error
    ? getErrorMessage(saveProfile.error)
    : undefined;

  const onFinish = async (fields: ProfileFormValues) => {
    if (isSaving) {
      return;
    }

    onSavingChange(true);

    try {
      await saveProfile.mutateAsync(fields);
      message.success("Профиль сохранён");
      onSubmit();
    } catch {
      // Ошибка отображается в форме, введённые значения сохраняются.
    } finally {
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
