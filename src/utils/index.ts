import { FormikHelpers } from 'formik';

/**
 * Lightweight generate random id;
 * @returns number - id generated
 */
const id = (): number => new Date().getTime() + Math.random();

const formSubmission = (
  func: () => Promise<void>,
  success: () => {},
  actions: FormikHelpers<{}>,
) =>
  func().then(success).catch((err) => {
    actions.setErrors({ general: err });
  }).finally(() => {
    actions.setSubmitting(false);
  });

export {
  id,
  formSubmission,
};
