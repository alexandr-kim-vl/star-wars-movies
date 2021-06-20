import * as yup from 'yup';

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const messages = {
  required: 'Заполните обязательное поле',
  invalidEmailFormat: 'Неверный формат адреса электронной почты',
};

export default yup.object().shape({
  username: yup.string().required(messages.required),
  email: yup.string()
    .required(messages.required)
    .trim()
    .matches(emailRegExp, messages.invalidEmailFormat),
  review: yup.string().required(messages.required),
});
