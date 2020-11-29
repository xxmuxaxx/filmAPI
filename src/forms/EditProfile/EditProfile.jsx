import React from "react";
import {useDispatch} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Button} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import SaveIcon from "@material-ui/icons/Save";
import {TextField, RadioGroup} from "@jcoreio/redux-form-material-ui";

import {fetchUpdateUser} from "../../redux/actions/users";
import styles from './EditProfile.module.scss';

const Input = (props) => {
    return <Field className={styles.input} variant="outlined" size="small" component={TextField} {...props} />
}

let EditProfileForm = ({message, error, handleSubmit}) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <Input name="name" label="Ваше имя"/>
            <Input name="lastName" label="Ваша фамилия" disabled={!!error}/>
            <Input name="middleName" label="Ваше отчество" disabled={!!error}/>
            <Input name="email" label="Ваш email" disabled={!!error}/>

            <Field name="gender" component={RadioGroup}>
                <FormControlLabel value="MAN" control={<Radio />} label="Мужчина" />
                <FormControlLabel value="WOMAN" control={<Radio />} label="Женщина" />
            </Field>

            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            <Button type="submit" size="large" color="primary" variant="contained" startIcon={<SaveIcon/>}
                    disabled={!!error}>
                Сохранить
            </Button>
        </form>
    );
};

EditProfileForm = reduxForm({form: 'editProfile'})(EditProfileForm)

const EditProfile = ({user, onSubmitCallback = null}) => {
    const dispatch = useDispatch()

    const onSubmit = (formData) => {
        dispatch(fetchUpdateUser(formData))
        onSubmitCallback && onSubmitCallback()
    }
    return (
        <EditProfileForm initialValues={user} onSubmit={onSubmit}/>
    )
}

export default EditProfile
