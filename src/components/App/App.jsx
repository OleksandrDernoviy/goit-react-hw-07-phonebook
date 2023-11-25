
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from './app.module.css';
import '../../index.css';
import React from 'react'

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const handleAddContact = ({ name, number }) => {
    const sameName = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    if (sameName) {
      alert(`${sameName.name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [...prevState, newContact]);
  } 

const handleFilterChange = e => {
  setFilter(e.target.value.toLowerCase());
};
  
  
  const handleRemoveContact = id => {
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== id),
    );
  };

  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, [])

   const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
   
 return (
   <div className={css.phonebookBox}>
     <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />
         <h2 className={css.contactsTitle}>Contacts</h2>
     <Filter filter={filter} handleFilterChange={handleFilterChange} />
     <ContactList
          contacts={filterContacts}
          onRemoveContact={handleRemoveContact}
        />
   </div>
    
 )  
}
 
export default App;

