import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {MyTextInput } from './Util';

 // And now we can use these
  export const AddPerson = () => {
    return (
      <>
        <h1>Add a relation</h1>
        <Formik
          initialValues={{
            srcPersonId: '',
            relation: '',
            dstPersonId: ''
          }}
          validationSchema={Yup.object({
            srcPersonId: Yup.string()
              .max(100, 'Must be 100 characters or less')
              .required('src Person id needed'),
            relation: Yup.string()
              .oneOf(['childOf'], 'You must accept the terms and conditions.'),
            nickname: Yup.string()
                .max(45, 'Must be 45 characters or less'),
              birthDate: Yup.date().required('Birth date required') // TODO - check how this behaves
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MyTextInput
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="Jane Doe"
            />
  
            <MyTextInput
              label="Maiden Name"
              name="maiden name"
              type="text"
              placeholder="Jane Unmarried"
            />
  
            <MyTextInput
              label="Nickname"
              name="nickname"
              type="text"
              placeholder="Cool Jane"
            />

            <MyTextInput
              label="Birth Date"
              name="birth date"
              type="date"
              placeholder="2021-01-01"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </>
    );
  };