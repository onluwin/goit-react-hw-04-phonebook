import { nanoid } from 'nanoid/non-secure';

import { List } from './Phonebook.styled';
import { ContactItem } from './Phonebook.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(item => {
        item.id = nanoid();
        return (
          <ContactItem key={item.id}>
            {item.name}: {item.number} {''}
            <button
              onClick={() => onDelete(item.id)}
              type="button"
              style={{ fontSize: 15 }}
            >
              Delete
            </button>
          </ContactItem>
        );
      })}
    </List>
  );
};
