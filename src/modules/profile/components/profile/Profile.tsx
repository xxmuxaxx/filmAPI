import "./profile.scss";

import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons/lib/icons";
import {
  Avatar,
  Button,
  Descriptions,
  Divider,
  Modal,
  Space,
  Tooltip,
} from "antd";
import { env } from "core/helpers/environment";
import { useActions } from "core/hooks/useActions";
import AddMovieForm from "core/modules/movie/components/addMovieForm/AddMovieForm";
import DeleteMovieForm from "core/modules/movie/components/deleteMovieForm/DeleteMovieForm";
import EditMovieForm from "core/modules/movie/components/editMovieForm/EditMovieForm";
import { selectCurrentUser } from "core/modules/users/selectors/usersSelectors";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import EditProfileForm from "../editProfileForm/EditProfileForm";

const { Item } = Descriptions;
const image = "https://placeimg.com/200/200/people";

const Profile = () => {
  const { logout } = useActions();
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const buttonClickHandler = () => {
    logout();
  };

  useEffect(() => {
    if (!currentUser) {
      history.push(env.login.baseUrl);
    }
  }, [currentUser, history]);

  return (
    <>
      {currentUser && (
        <section className="profile">
          <div className="profile__wrapper">
            <h1 className="page-title">{env.profile.title}</h1>
            <div className="profile__block">
              <Descriptions
                title={
                  <Space>
                    <Avatar src={image} alt={currentUser.name} />
                    <Tooltip title="Редактировать профиль">
                      <Button
                        shape="circle"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setModalType("profile-edit");
                          setIsModalVisible(true);
                          setModalTitle("Редактировать профиль");
                        }}
                        ghost
                      />
                    </Tooltip>
                    <Tooltip title="Выйти из профиля">
                      <Button
                        shape="circle"
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={buttonClickHandler}
                        danger
                      />
                    </Tooltip>
                    Информация о пользователе
                  </Space>
                }
                column={2}
              >
                <Item label="Логин">{currentUser.username}</Item>
                <Item label="ФИО">
                  {`${currentUser.lastName} ${currentUser.name} ${currentUser.middleName}`}
                </Item>
                <Item label="Email">{currentUser.email}</Item>
                <Item label="Пол">
                  {currentUser.gender === "WOMAN" ? "Женщина" : "Мужчина"}
                </Item>
              </Descriptions>
            </div>
            <Divider />
            <Descriptions title="Редактирование фильмов">
              <Item>
                <Button
                  onClick={() => {
                    setModalType("film-add");
                    setIsModalVisible(true);
                    setModalTitle("Добавить фильм");
                  }}
                  icon={<FileAddOutlined />}
                  size="large"
                  block
                >
                  Добавить фильм
                </Button>
              </Item>
              <Item>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="large"
                  onClick={() => {
                    setModalType("film-edit");
                    setIsModalVisible(true);
                    setModalTitle("Изменить фильм");
                  }}
                  ghost
                  block
                >
                  Изменить фильм
                </Button>
              </Item>
              <Item>
                <Button
                  onClick={() => {
                    setModalType("film-delete");
                    setIsModalVisible(true);
                    setModalTitle("Удалить фильм");
                  }}
                  icon={<DeleteOutlined />}
                  size="large"
                  danger
                  block
                >
                  Удалить фильм
                </Button>
              </Item>
            </Descriptions>
          </div>
          <Modal
            title={modalTitle}
            footer={false}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            centered
          >
            {modalType === "profile-edit" && (
              <EditProfileForm
                user={currentUser}
                onSubmit={() => setIsModalVisible(false)}
              />
            )}
            {modalType === "film-add" && <AddMovieForm />}
            {modalType === "film-edit" && (
              <EditMovieForm onSubmit={() => setIsModalVisible(false)} />
            )}
            {modalType === "film-delete" && <DeleteMovieForm />}
          </Modal>
        </section>
      )}
    </>
  );
};

export default Profile;
