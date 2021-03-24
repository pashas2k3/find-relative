import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {MySelect, MyTextInput } from './Util';

 // And now we can use these
  export const AddRelation = () => {
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
                .max(32, 'Must be 32 characters or less')
                .required('src Person ID required'),
              relation: Yup.string()
                .oneOf(['parentOf', 'childOf', 'spouseOf']).required(),
              dstPersonId: Yup.string()
              .max(32, 'Must be 32 characters or less')
              .required('dst Person ID required')
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
                label="Relation source person ID"
                name="srcPersonId"
                type="text"
                placeholder="Jane Doe"
              />
  
              <MySelect 
              label="Relation"
                name="relation"
              >
                  <option value="">Select relation type</option>
                  <option value="parent">parentOf</option>
                  <option value="child">childOf</option>
                  <option value="spouse">spouseOf</option>
              </MySelect>
  
              <MyTextInput
                label="Relation destination person ID"
                name="dstPersonId"
                type="text"
                placeholder="John Doe"
              />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </>
      );
    };