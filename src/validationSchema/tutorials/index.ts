import * as yup from 'yup';

export const tutorialValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  creator_id: yup.string().nullable(),
  editor_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
