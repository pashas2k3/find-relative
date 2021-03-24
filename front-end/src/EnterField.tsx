// import { Formik, Field, Form, ErrorMessage, FieldArray, useField } from 'formik';
// import * as Yup from 'yup';

// const personInitVals = {
//   persons: [
//     {
//       fullname: '',
//       nickname: '',
//       birthDate: '',
//       maidenName: ''
//     },
//   ],
// };

// const relationInitVals = {
//   relation: [
//     {
//       srcPersonId: '',
//       relation: '',
//       otherPersonId: ''
//     }
//   ]
// }

// const AddPerson = () => (
//   <div>
//     <h1>Add Person</h1>
//     <Formik
//       initialValues={personInitVals}
//       onSubmit={async (values) => {
//         await new Promise((r) => setTimeout(r, 500));
//         alert(JSON.stringify(values, null, 2)); // Replace with call to next component
//       }}
//     >
//       {({ values }) => (
//         <Form>
//           <FieldArray name="persons">
//             {({ insert, remove, push }) => (
//               <div>
//                 {values.persons.length > 0 &&
//                   values.persons.map((friend, index) => (
//                     <div className="row" key={index}>
//                       <div className="col">
//                         <label htmlFor={`persons.${index}.name`}>Name</label>
//                         <Field
//                           name={`persons.${index}.name`}
//                           placeholder="Jane Doe"
//                           type="text"
//                         />
//                         <ErrorMessage
//                           name={`persons.${index}.name`}
//                           component="div"
//                           className="field-error"
//                         />
//                       </div>
//                       <div className="col">
//                         <label htmlFor={`persons.${index}.email`}>Email</label>
//                         <Field
//                           name={`persons.${index}.email`}
//                           placeholder="jane@acme.com"
//                           type="email"
//                         />
//                         <ErrorMessage
//                           name={`persons.${index}.name`}
//                           component="div"
//                           className="field-error"
//                         />
//                       </div>
//                       <div className="col">
//                         <button
//                           type="button"
//                           className="secondary"
//                           onClick={() => remove(index)}
//                         >
//                           X
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 <button
//                   type="button"
//                   className="secondary"
//                   onClick={() => push({ name: '', email: '' })}
//                 >
//                   Add Friend
//                 </button>
//               </div>
//             )}
//           </FieldArray>
//           <button type="submit">Invite</button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );

// const MyTextInput = ({ label, ...props }:
//   {
//     label: string;
//     name: string;
//     type: string
//     placeholder: string;
//     id?: string
//   }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input>. We can use field meta to show an error
//   // message if the field is invalid and it has been touched (i.e. visited)
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input className="text-input" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// const MySelect = ({ label, ...props }:{label:string; id?: string; name: string, children: any[]}) => {
//   const [field, meta] = useField(props);
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// const MyCheckbox = ({ children, ...props }:any) => {
//   // React treats radios and checkbox inputs differently other input types, select, and textarea.
//   // Formik does this too! When you specify `type` to useField(), it will
//   // return the correct bag of props for you -- a `checked` prop will be included
//   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
//   const [field, meta] = useField({ ...props, type: 'checkbox' });
//   return (
//     <div>
//       <label className="checkbox-input">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };
// // And now we can use these
// const SignupForm = () => {
//   return (
//     <>
//       <h1>Subscribe!</h1>
//       <Formik
//         initialValues={{
//           firstName: '',
//           lastName: '',
//           email: '',
//           acceptedTerms: false, // added for our checkbox
//           jobType: '', // added for our select
//         }}
//         validationSchema={Yup.object({
//           firstName: Yup.string()
//             .max(15, 'Must be 15 characters or less')
//             .required('Required'),
//           lastName: Yup.string()
//             .max(20, 'Must be 20 characters or less')
//             .required('Required'),
//           email: Yup.string()
//             .email('Invalid email address')
//             .required('Required'),
//           acceptedTerms: Yup.boolean()
//             .required('Required')
//             .oneOf([true], 'You must accept the terms and conditions.'),
//           jobType: Yup.string()
//             .oneOf(
//               ['designer', 'development', 'product', 'other'],
//               'Invalid Job Type'
//             )
//             .required('Required'),
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             setSubmitting(false);
//           }, 400);
//         }}
//       >
//         <Form>
//           <MyTextInput
//             label="First Name"
//             name="firstName"
//             type="text"
//             placeholder="Jane"
//           />

//           <MyTextInput
//             label="Last Name"
//             name="lastName"
//             type="text"
//             placeholder="Doe"
//           />

//           <MyTextInput
//             label="Email Address"
//             name="email"
//             type="email"
//             placeholder="jane@formik.com"
//           />

//           <MySelect label="Job Type" name="jobType">
//             <option value="">Select a job type</option>
//             <option value="designer">Designer</option>
//             <option value="development">Developer</option>
//             <option value="product">Product Manager</option>
//             <option value="other">Other</option>
//           </MySelect>

//           <MyCheckbox name="acceptedTerms">
//             I accept the terms and conditions
//             </MyCheckbox>

//           <button type="submit">Submit</button>
//         </Form>
//       </Formik>
//     </>
//   );
// };