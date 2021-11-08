import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Descriptions,
  Divider,
  Modal,
  Space,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  LogoutOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from '@ant-design/icons/lib/icons';
import { env } from '../../services/environment';
import { deleteCookie } from '../../services/cookieHelper';
import EditProfile from '../../forms/EditProfile/EditProfile';
import DeleteFilm from '../../forms/DeleteFilm/DeleteFilm';
import { usersActions } from '../../redux/actions/users';
import { selectCurrentUser } from '../../redux/selectors/users';
import './Profile.scss';
import { CreateFilm, EditFilm } from '../Forms';

const { Item } = Descriptions;
const image = 'https://placeimg.com/200/200/people';

export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const buttonClickHandler = () => {
    dispatch(usersActions.setCurrentUser(null));
    deleteCookie('Authorization');
  };

  useEffect(() => {
    if (!currentUser) {
      history.push(env.auth.baseUrl);
    }
  }, [currentUser]);

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
                    <Avatar src={image} alt={name} />
                    <Tooltip title="Редактировать профиль">
                      <Button
                        shape="circle"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() =>
                          setModalType('profile-edit') ||
                          setIsModalVisible(true) ||
                          setModalTitle('Редактировать профиль')
                        }
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
                <Item label="UserName">{currentUser.username}</Item>
                <Item label="ФИО">
                  {`${currentUser.lastName} ${currentUser.name} ${currentUser.middleName}`}
                </Item>
                <Item label="Email">{currentUser.email}</Item>
                <Item label="Пол">
                  {currentUser.gender === 'WOMAN' ? 'Женщина' : 'Мужчина'}
                </Item>
              </Descriptions>
            </div>
            <Divider />
            <Descriptions title="Редактирование фильмов">
              <Item>
                <Button
                  onClick={() =>
                    setModalType('film-add') ||
                    setIsModalVisible(true) ||
                    setModalTitle('Добавить фильм')
                  }
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
                  onClick={() =>
                    setModalType('film-edit') ||
                    setIsModalVisible(true) ||
                    setModalTitle('Изменить фильм')
                  }
                  ghost
                  block
                >
                  Изменить фильм
                </Button>
              </Item>
              <Item>
                <Button
                  onClick={() =>
                    setModalType('film-delete') ||
                    setIsModalVisible(true) ||
                    setModalTitle('Удалить фильм')
                  }
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
            {modalType === 'profile-edit' && (
              <EditProfile
                user={currentUser}
                onSubmitCallback={() => setIsModalVisible(false)}
              />
            )}
            {modalType === 'film-add' && <CreateFilm />}
            {modalType === 'film-edit' && (
              <EditFilm onSubmit={() => setIsModalVisible(false)} />
            )}
            {modalType === 'film-delete' && <DeleteFilm />}
          </Modal>
        </section>
      )}
    </>
  );
};
