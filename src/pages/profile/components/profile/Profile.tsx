import "./profile.scss";

import { Button, Modal } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { endSession, useCurrentUser, isUserAdmin } from "entities/user";
import { AddMovieForm } from "features/manage-movie";
import { DeleteMovieForm } from "features/manage-movie";
import { EditMovieForm } from "features/manage-movie";
import { GENDERS } from "entities/user";
import { useState } from "react";

import { EditProfileForm } from "features/edit-profile";

type ProfileDialogType = "profile" | "add" | "edit" | "delete";

const dialogTitles: Record<ProfileDialogType, string> = {
  profile: "Редактировать профиль",
  add: "Добавить фильм",
  edit: "Изменить фильм",
  delete: "Удалить фильм",
};

const genderLabels: Record<GENDERS, string> = {
  [GENDERS.MAN]: "Мужчина",
  [GENDERS.WOMAN]: "Женщина",
};

const Profile = () => {
  const queryClient = useQueryClient();
  const user = useCurrentUser().data;
  const isAdmin = isUserAdmin(user);
  const [activeDialog, setActiveDialog] = useState<ProfileDialogType | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleCloseDialog = () => {
    if (!isSaving) {
      setActiveDialog(null);
    }
  };

  if (!user) {
    return null;
  }

  const genderLabel = user.gender ? genderLabels[user.gender] : "Не указан";
  const fullName = [user.lastName, user.name, user.middleName]
    .filter(Boolean)
    .join(" ");
  const initials =
    [user.name, user.lastName]
      .filter(Boolean)
      .map((value) => value?.[0])
      .join("") || user.username.slice(0, 1);

  return (
    <section className="profile">
      <div className="profile__heading">
        <h1>Мой профиль</h1>
        <Button type="text" onClick={() => endSession(queryClient)}>
          Выйти из аккаунта
        </Button>
      </div>
      <div className="profile__card">
        <div className="profile__intro">
          <span className="profile__avatar" aria-hidden="true">
            {initials.toUpperCase()}
          </span>
          <div className="profile__identity">
            <h2>{fullName || user.username}</h2>
            <p>{user.username}</p>
          </div>
          <Button onClick={() => setActiveDialog("profile")}>
            Редактировать профиль
          </Button>
        </div>
        <dl className="profile__data">
          <div>
            <dt>ФИО</dt>
            <dd>{fullName || "Не указано"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email || "Не указан"}</dd>
          </div>
          <div>
            <dt>Пол</dt>
            <dd>{genderLabel}</dd>
          </div>
        </dl>
        <p className="profile__note">Личные данные доступны только вам.</p>
      </div>
      {isAdmin && (
        <div className="profile__admin">
          <h2>Управление кинотекой · для администратора</h2>
          <div>
            <Button type="primary" onClick={() => setActiveDialog("add")}>
              Добавить фильм
            </Button>
            <Button onClick={() => setActiveDialog("edit")}>
              Изменить фильм
            </Button>
            <Button onClick={() => setActiveDialog("delete")}>
              Удалить фильм
            </Button>
          </div>
        </div>
      )}
      <Modal
        className="profile-dialog"
        title={activeDialog ? dialogTitles[activeDialog] : ""}
        width={560}
        footer={null}
        closeIcon={
          <img
            src="/images/icons/modal-close.svg"
            width="24"
            height="24"
            alt="Закрыть"
          />
        }
        open={activeDialog !== null && (activeDialog === "profile" || isAdmin)}
        onCancel={handleCloseDialog}
        centered
        destroyOnHidden
        closable={!isSaving}
        keyboard={!isSaving}
        maskClosable={!isSaving}
      >
        {activeDialog === "profile" && (
          <EditProfileForm
            user={user}
            onSubmit={() => setActiveDialog(null)}
            onCancel={handleCloseDialog}
            onSavingChange={setIsSaving}
          />
        )}
        {isAdmin && activeDialog === "add" && (
          <AddMovieForm onSuccess={handleCloseDialog} />
        )}
        {isAdmin && activeDialog === "edit" && (
          <EditMovieForm onSubmit={handleCloseDialog} />
        )}
        {isAdmin && activeDialog === "delete" && (
          <DeleteMovieForm onSubmit={handleCloseDialog} />
        )}
      </Modal>
    </section>
  );
};

export default Profile;
