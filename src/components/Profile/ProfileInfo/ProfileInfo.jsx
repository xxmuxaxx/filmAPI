import React from "react";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import {EditOutlined} from "@material-ui/icons";

import withModal from "../../../hoc/withModal/withModal";
import EditProfile from "../../../forms/EditProfile/EditProfile";
import styles from "./ProfileInfo.module.scss";

const ProfileInfo = ({user, createModal, closeModal}) => {
    const {id, name, lastName, middleName, email, gender, theme} = user
    return (
        <div className={styles.wrapper}>
            <h2>Информация о пользователе</h2>
            <Box className={styles.button}>
                <IconButton
                    color="primary"
                    onClick={() => {
                        createModal(
                            <EditProfile user={{id, name, lastName, middleName, email, gender, theme}} onSubmitCallback={closeModal}/>,
                            'Изменения профиля'
                        )
                    }}
                >
                    <EditOutlined/>
                </IconButton>
            </Box>

            <p><b>ФИО</b>: {`${user.lastName || ''} ${user.name || ''} ${user.middleName || ''}`}</p>
            <p><b>Email</b>: {user.email}</p>
            <p><b>Пол</b>: {user.gender === 'WOMAN' ? 'Женщина' : user.gender === 'MAN' ? 'Мужчина' : null}</p>
        </div>
    )
}

export default withModal(ProfileInfo)
