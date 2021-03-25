import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {MySelect, MyTextInput } from './Util';

// Find relation from one source ID to another source ID
// Relation selected from drop down
export const FindRelation = ()=>{
    return (
      <>
        <h1>Find relation path between persons</h1>
        <Formik
          initialValues={{
            srcPersonId: '',
            dstPersonId: ''
          }}
          validationSchema={Yup.object({
            srcPersonId: Yup.string()
                .max(100, 'Must be 100 characters or less').required(),
            dstPersonId: Yup.string()
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

            <MyTextInput
              label="source Person ID"
              name="srcPersonId"
              type="text"
              placeholder="foo"
            />

            <MyTextInput
              label="destination person ID"
              name="dstPersonId"
              type="text"
              placeholder="foo"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
        </>
        );
}