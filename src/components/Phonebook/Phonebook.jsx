import { useState, useEffect, useMemo } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

import { Wrapper } from './Phonebook.styled';
import { Title } from './Phonebook.styled';
import { getContacts } from 'utils/getContacts';

const lSKey = 'contacts-data-key';
export const Phonebook = () => {
  const [contacts, setContacts] = useState(() => getContacts(lSKey));

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(lSKey, JSON.stringify(contacts));
  }, [contacts]);

  let filteredContacts = useMemo(() => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  const onSubmit = (values, { resetForm }) => {
    const inContacts = contacts.some(
      item => item.name.toLowerCase() === values.name
    );
    if (inContacts) {
      return alert('Type another name');
    }
    setContacts(prevState => {
      return [...prevState.map(item => item), values];
    });

    resetForm();
  };
  const onInput = e => {
    const input = e.currentTarget.value;
    setFilter(input);
  };
  const onDelete = id => {
    setContacts(prevState => {
      const filteredContacts = prevState.filter(contact => contact.id !== id);
      return filteredContacts;
    });
  };

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={onSubmit} />

      {contacts.length !== 0 && (
        <>
          <h2 style={{ marginBottom: 10 }}>Contacts</h2>
          <Filter onInput={onInput} />
          <ContactList contacts={filteredContacts} onDelete={onDelete} />
        </>
      )}
    </Wrapper>
  );
};
