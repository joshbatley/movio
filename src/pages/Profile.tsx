import { h } from 'preact';
import { Formik, Form, FormikHelpers } from 'formik';
import useAuth from 'hooks/useAuth';
import Input from 'components/Input';
import Loading from 'components/Loading';

import { formSubmission } from 'utils';

interface UpdateEmailForm {
  email: string;
  password: string;
  general?: string;
}

interface UpdateNameForm {
  displayName: string;
  general?: string;
}

interface UpdatePasswordForm {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

const Profile = () => {
  const { user, updateEmail, updateName, updatePassword } = useAuth();
  const userProfile = user as UserProfile;

  const submitEmail = (
    { email, password }: UpdateEmailForm,
    actions: FormikHelpers<any>,
  ) => formSubmission(() => updateEmail(email, password), () => {}, actions);

  const submitName = (
    { displayName }: UpdateNameForm,
    actions: FormikHelpers<any>,
  ) => updateName(displayName).catch(updateFormError(actions));

  const submitPassword = (
    { oldPassword = '', newPassword = '' }: UpdatePasswordForm,
    actions: FormikHelpers<any>,
  ) => updatePassword(newPassword, oldPassword).catch(updateFormError(actions));

  return (
    <div>
      <h1>123</h1>
      {/* User Photo */}
      {/* Bio */}
      {/* Link to gmail */}
      {/* Display name */}
      <Formik initialValues={{ displayName: userProfile.displayName }} onSubmit={submitName}>
        {({ isSubmitting }) => (
          <Form>
            <Input type="text" name="displayName" value={userProfile.displayName} />
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
      {/* Email */}
      <Formik initialValues={{ email: userProfile.email, password: '' }} onSubmit={submitEmail}>
        {({ isSubmitting, errors }) => (
          <Form>
            { isSubmitting && (<Loading />)}
            <Input type="text" name="email" value={userProfile.email} />
            <Input type="text" name="password" />
            { console.log(errors && errors.submission) }
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
      {/* Password */}
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        onSubmit={submitPassword}
        validate={(values) => {
          const { newPassword, confirmPassword } = values;
          const error: UpdatePasswordForm = {};
          if (newPassword !== confirmPassword) {
            error.confirmPassword = 'New password doesn\'t match';
          }
          return error;
        }}
        validateOnChange
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <Input type="text" name="oldPassword" />
            <Input type="text" name="newPassword" />
            <Input type="text" name="confirmPassword" />
            {/* {console.log(errors)} */}
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
      {/* Delete */}
    </div>
  );
};

export default Profile;
