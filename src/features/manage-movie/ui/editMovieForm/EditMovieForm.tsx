import { useUpdateMovie } from "../../model/mutations";
import { App, Button, Form, Input, Select } from "antd";
import { getErrorMessage } from "shared/api";
import { useQuery } from "@tanstack/react-query";
import { movieByIdQuery } from "entities/movie";
import { FC, useEffect, useState } from "react";

import { formatGenres, movieTypeOptions, parseGenres } from "entities/movie";
import { MovieFormValues, MovieType } from "entities/movie";

const { Item } = Form;

const initialValues = {
  imdbID: "",
  title: "",
  titleEn: "",
  year: "",
  country: "",
  poster: "",
  video: "",
  genres: "",
  type: undefined,
  description: "",
};

const rules = {
  id: [
    {
      required: true,
      message: "Обязательное поле!",
    },
  ],
};

type EditMovieFormProps = {
  initialId?: number;
  onSubmit?: () => void;
};

const EditMovieForm: FC<EditMovieFormProps> = ({
  initialId,
  onSubmit = () => {},
}) => {
  const { message } = App.useApp();
  const [editFilmForm] = Form.useForm();
  const mutation = useUpdateMovie();
  const isFetching = mutation.isPending;

  const onFinish = async ({
    id,
    genres,
    ...data
  }: MovieFormValues & { id: number }) => {
    if (isFetching) {
      return;
    }
    try {
      // Бэкенд меняет только переданные не-null поля
      await mutation.mutateAsync({
        id,
        body: { ...data, genres: parseGenres(genres) },
      });
      onSubmit();
      message.success("Изменения сохранены!");
    } catch (e) {
      console.error(e);
      message.error(
        `Произошла ошибка при изменении фильма: ${getErrorMessage(e)}`
      );
    }
  };

  const [selectedId, setSelectedId] = useState<number | string>(
    initialId ?? ""
  );
  const selectedMovie = useQuery({
    ...movieByIdQuery(selectedId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (selectedMovie.data) {
      editFilmForm.setFieldsValue({
        ...selectedMovie.data,
        genres: formatGenres(selectedMovie.data.genres),
        type: selectedMovie.data.type ?? undefined,
      });
    } else {
      editFilmForm.resetFields(Object.keys(initialValues));
    }
  }, [editFilmForm, selectedMovie.data]);

  return (
    <Form
      name="edit-film-form"
      form={editFilmForm}
      initialValues={{ ...initialValues, id: initialId }}
      onFinish={onFinish}
    >
      <Item name="id" rules={rules.id}>
        <Input
          placeholder="ID"
          disabled={!!initialId}
          onChange={(event) => {
            setSelectedId(event.target.value);
          }}
        />
      </Item>
      {selectedMovie.error && (
        <p role="alert">{getErrorMessage(selectedMovie.error)}</p>
      )}
      <Item name="imdbID">
        <Input placeholder="imdbID" />
      </Item>
      <Item name="title">
        <Input placeholder="Название" />
      </Item>
      <Item name="titleEn">
        <Input placeholder="Название на английском" />
      </Item>
      <Item name="year">
        <Input placeholder="Год" />
      </Item>
      <Item name="country">
        <Input placeholder="Страна" />
      </Item>
      <Item name="poster">
        <Input placeholder="Обложка (url)" />
      </Item>
      <Item name="video">
        <Input placeholder="Трейлер (youtube id)" />
      </Item>
      <Item name="genres">
        <Input placeholder="Жанры (через запятую)" />
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
        <Button
          type="primary"
          htmlType="submit"
          loading={isFetching}
          disabled={selectedMovie.isFetching || !selectedMovie.data}
        >
          Сохранить
        </Button>
      </Item>
    </Form>
  );
};

export default EditMovieForm;
