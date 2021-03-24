import { Formik, Form, useField } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {MySelect, MyTextInput } from './Util';

 // And now we can use these
  export const AddPerson = () => {
    return (
      <>
        <h1>Add a Person</h1>
        <Formik
          initialValues={{
            fullName: '',
            maidenName: '',
            nickname: '',
            birthDate: '',
            sex: ''
          }}
          validationSchema={Yup.object({
            fullName: Yup.string()
              .max(100, 'Must be 100 characters or less')
              .required('Full name required'),
            maidenName: Yup.string()
              .max(100, 'Must be 100 characters or less'),
            nickname: Yup.string()
                .max(45, 'Must be 45 characters or less'),
            birthDate: Yup.date().required('Birth date required'), // TODO - check how this behaves
            sex: Yup.string().oneOf(['male', 'female']).required()
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

            <MySelect 
            label="Biological Sex"
              name="sex"
            >
                <option value="">Select relation type</option>
                <option value="male">male</option>
                <option value="female">female</option>
            </MySelect>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </>
    );
  };