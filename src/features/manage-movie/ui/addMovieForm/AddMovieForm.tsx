import { useCreateMovie } from "../../model/mutations";
import { App, Button, Form, Input, Select } from "antd";
import { getErrorMessage } from "shared/api";

import { movieTypeOptions, parseGenres } from "entities/movie";
import { MovieFormValues, MovieType } from "entities/movie";

const { Item } = Form;

const initialValues = {
  imdbID: "",
  title: "",
  video: "",
  description: "",
};

const rules = {
  imdbID: [
    {
      required: true,
      message: "Обязательное поле!",
    },
  ],
  title: [
    {
      required: true,
      message: "Обязательное поле!",
    },
  ],
};

const AddMovieForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { message } = App.useApp();
  const [createFilmForm] = Form.useForm();
  const mutation = useCreateMovie();
  const isFetching = mutation.isPending;

  const onSubmit = async (values: MovieFormValues) => {
    if (isFetching) {
      return;
    }

    try {
      await mutation.mutateAsync({
        imdbID: values.imdbID || null,
        title: values.title ?? "",
        description: values.description || null,
        country: values.country || null,
        genres: parseGenres(values.genres),
        poster: values.poster || null,
        titleEn: values.titleEn || null,
        type: values.type ?? null,
        video: values.video || null,
        year: values.year || null,
      });
      message.success("Фильм успешно создан!");
      onSuccess?.();
      createFilmForm.resetFields();
    } catch (e) {
      console.error(e);
      message.error(
        `Произошла ошибка при создании фильма: ${getErrorMessage(e)}`
      );
    }
  };

  return (
    <Form
      name="create-film-form"
      form={createFilmForm}
      size="large"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Item name="imdbID" rules={rules.imdbID}>
        <Input placeholder="imdbID" />
      </Item>
      <Item name="title" rules={rules.title}>
        <Input placeholder="Название" />
      </Item>
      <Item name="titleEn">
        <Input placeholder="Название на английском" />
      </Item>
      <Item name="video">
        <Input placeholder="Трейлер (youtube id)" />
      </Item>
      <Item name="country">
        <Input placeholder="Страна" />
      </Item>
      <Item name="year">
        <Input placeholder="Год" />
      </Item>
      <Item name="poster">
        <Input placeholder="Url постера" />
      </Item>
      <Item name="genres">
        <Input placeholder="Жанры через запятую" />
      </Item>
      <Item name="type">
        <Select<MovieType>
          placeholder="Тип"
          options={movieTypeOptions}
          allowClear
        />
      </Item>
      <Item name="description">
        <Input.TextArea placeholder="Описание" rows={4} />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Сохранить
        </Button>
      </Item>
    </Form>
  );
};

export default AddMovieForm;
