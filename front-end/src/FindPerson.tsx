import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {MySelect, MyTextInput } from './Util';

// Find persons using a fields
// Select field to compare from drop down for name, nickname, maidenName

export const FindPerson = ()=>{
        return (
          <>
            <h1>Find Person</h1>
            <Formik
          initialValues={{
            field: '',
            operation: '',
            value: ''
          }}
          validationSchema={Yup.object({
            field: Yup.string()
              .oneOf(['fullName', 'nickName', 'maidenName', 'id'], 'Pick a field to search over')
              .required('Field name needed'),
            operation: Yup.string()
              .oneOf(['equals', 'contains'], 'Pick operation to apply').required(),
            value: Yup.string()
                .max(100, 'Must be 100 characters or less').required()
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MySelect
              label="field"
              name="field"
            >
                <option value="">Select field type</option>
                  <option value="fullName">fullName</option>
                  <option value="nickName">nickName</option>
                  <option value="maidenName">maidenName</option>
                  <option value="id">id</option>
            </MySelect>
  
            <MySelect
              label="operation"
              name="operation"
            >
                <option value="">Select operation type</option>
                  <option value="equals">equals</option>
                  <option value="contains">contains</option>
            </MySelect>

            <MyTextInput
              label="value"
              name="value"
              type="text"
              placeholder=""
            />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
            </>
            );
}