import { Formik, Form } from 'formik';

import { SubmitButton } from './SubmitButton';

import { InputName, InputTel } from './Phonebook.styled';

export const ContactForm = ({ onSubmit }) => {
  const initialValues = { name: '', number: '' };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form
        style={{
          width: 230,
          marginBottom: 20,
          border: '1px solid black',
          padding: 10,
        }}
        autoComplete="off"
      >
        <p>Name</p>
        <InputName
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <p>Number</p>
        <InputTel
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <SubmitButton />
      </Form>
    </Formik>
  );
};
