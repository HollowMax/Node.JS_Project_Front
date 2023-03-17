import { useDispatch } from 'react-redux';
import { signUp } from 'redux/auth/authOperations';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  BoxForInput,
  IconForInput,
  FlagForInput,
  InputForAuth,
  FormButton,
  FormForAuth,
  TitleForForm,
  ErrorMessage,
  BoxForForm,
  LinkAuth,
  SvgAuth,
} from './style.jsx';
import SVG from 'images/sprite.svg';
import { getColor } from 'utils/formikColors.js';


const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1)
    .max(16)
    .matches(
      /^[a-zA-Zа-яА-Я1-9ії]+(([' -][a-zA-Zа-яА-Я1-9ії ])?[a-zA-Zа-яА-Я1-9ії]*)*$/
    )
    .required(),

  email: Yup.mixed().test({
    name: 'email',
    params: { a: 'test', b: 'qwe' },
    test: value => {
      return /\w+@\w+\.\w{1,5}/.test(value);
    },
  }),
  password: Yup.string()
    .min(6, 'Your password is short')
    .max(16, 'Your password is to long')
    .matches(/[1-9]/, 'Your password is little secure. Add a number!')
    .matches(
      /[a-zа-яA-ZА-Яії]/,
      'Your password is little secure. Add a letter!'
    )
    .matches(/^[a-zа-яA-ZА-Яії1-9]/, 'Enter a valid Password*')
    .required('Enter a valid Password*'),
});

const FormRegister = props => {
  const dispatch = useDispatch();

  return (<>
    <div>
      <Formik
        initialValues={{
          name: ``,
          email: ``,
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          dispatch(
            signUp({
              name: values.name.trim(),
              email: values.email,
              password: values.password.trim(),
            })
          );
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {props => (
          <FormForAuth>
            <TitleForForm>Registration</TitleForForm>
            <BoxForForm>
              <BoxForInput>
                <IconForInput>
                  <SvgAuth
                    color={getColor(props.errors.name, props.values.name)}
                  >
                    <use href={`${SVG}#person`}></use>
                  </SvgAuth>
                </IconForInput>
                {props.values.name && (
                  <FlagForInput>
                    <svg>
                      <use
                        href={`${SVG}${getColor(
                          props.errors.name,
                          props.values.name
                        )}`}
                      ></use>
                    </svg>
                  </FlagForInput>
                )}
                <InputForAuth
                  type="text"
                  name="name"
                  placeholder="Name"
                  color={getColor(props.errors.name, props.values.name)}
                  bordercolor={getColor(
                    props.errors.name,
                    props.values.name,
                    'rgba(255, 255, 255, 0.3)'
                  )}
                />
              </BoxForInput>
              <BoxForInput>
                <IconForInput>
                  <svg fill={getColor(props.errors.email, props.values.email)}>
                    <use href={`${SVG}#email`}></use>
                  </svg>
                </IconForInput>
                {props.values.email && (
                  <FlagForInput>
                    <svg>
                      <use
                        href={`${SVG}${getColor(
                          props.errors.email,
                          props.values.email
                        )}`}
                      ></use>
                    </svg>
                  </FlagForInput>
                )}
                <InputForAuth
                  type="email"
                  name="email"
                  placeholder="Email"
                  color={getColor(props.errors.email, props.values.email)}
                  bordercolor={getColor(
                    props.errors.email,
                    props.values.email,
                    'rgba(255, 255, 255, 0.3)'
                  )}
                />
              </BoxForInput>
              <BoxForInput>
                <IconForInput>
                  <SvgAuth
                    color={getColor(
                      props.errors.password,
                      props.values.password
                    )}
                  >
                    <use href={`${SVG}#password`}></use>
                  </SvgAuth>
                </IconForInput>
                {props.values.password && (
                  <FlagForInput>
                    <svg>
                      <use
                        href={`${SVG}${getColor(
                          props.errors.password,
                          props.values.password
                        )}`}
                      ></use>
                    </svg>
                  </FlagForInput>
                )}
                <InputForAuth
                  type="password"
                  name="password"
                  placeholder="Password"
                  color={getColor(props.errors.password, props.values.password)}
                  bordercolor={getColor(
                    props.errors.password,
                    props.values.password,
                    'rgba(255, 255, 255, 0.3)'
                  )}
                />
                {props.values.password && (
                  <ErrorMessage
                    id="feedback"
                    color={getColor(
                      props.errors.password,
                      props.values.password
                    )}
                  >
                    {props.errors.password || 'Password is secure'}
                  </ErrorMessage>
                )}
              </BoxForInput>
            </BoxForForm>
            <FormButton
              type="submit"
              disabled={
                props.errors.password || props.errors.email || props.errors.name
                  ? true
                  : false
              }
            >
              Sign up
            </FormButton>
          </FormForAuth>
        )}
      </Formik>
      <LinkAuth to="/signin">Sign in</LinkAuth>
    </div>
    </>
  );
};

export default FormRegister;
