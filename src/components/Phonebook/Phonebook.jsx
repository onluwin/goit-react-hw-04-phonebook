import { Component, useState, useEffect, useMemo } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

import { Wrapper } from './Phonebook.styled';
import { Title } from './Phonebook.styled';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const lSKey = 'contacts-data-key';

  let filteredContacts = useMemo(() => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  useEffect(() => {
    // console.log(contacts.map(item => item.id));
    if (
      contacts.every(element => {
        let x = 1;
        return element.id === `id-${x}` ? true : x + 1;
      })
    ) {
      return;
    }
    localStorage.setItem(lSKey, JSON.stringify(contacts));
  }, [contacts, filter]);

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem(lSKey));
    setContacts(parsedContacts);
  }, []);

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
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

// export class Phonebook extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };
//   get localStorageKey() {
//     return 'contacts-data-key';
//   }

//   componentDidUpdate() {
//     localStorage.setItem(
//       this.localStorageKey,
//       JSON.stringify(this.state.contacts)
//     );
//   }
//   componentDidMount() {
//     const parsedContacts = JSON.parse(
//       localStorage.getItem(this.localStorageKey)
//     );
//     this.setState({ contacts: parsedContacts });
//   }

//   onSubmit = (values, { resetForm }) => {
//     this.setState(prevState => {
//       return { contacts: [...prevState.contacts, values] };
//     });
//     resetForm();
//   };
//   onInput = e => {
//     const input = e.currentTarget.value;
//     this.setState({ filter: input });
//   };
//   onDelete = id => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(contact => contact.id !== id),
//       };
//     });
//   };

//   render() {
//     const { contacts } = this.state;
//     let filteredContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
//     );
//     return (
//       <Wrapper>
//         <Title>Phonebook</Title>
//         <ContactForm onSubmit={this.onSubmit} />

//         {contacts.length !== 0 && (
//           <>
//             <h2 style={{ marginBottom: 10 }}>Contacts</h2>
//             <Filter onInput={this.onInput} />
//             <ContactList contacts={filteredContacts} onDelete={this.onDelete} />
//           </>
//         )}
//       </Wrapper>
//     );
//   }
// }