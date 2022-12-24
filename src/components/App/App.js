import React, {Component, useEffect, useState} from "react";
import { nanoid } from "nanoid";
import { toast, Toaster } from "react-hot-toast";
import { filterByName } from "utils/filter-by-name";
import { NameIsInContacts } from "utils/check-by-name";
import { AppCard, AppTitle } from "./App.styled";
import { ContactForm } from "components/ContactAddForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    savedContacts && setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({name, number}, {resetForm}) => {

    if(NameIsInContacts(contacts, name)) {
      resetForm();
      return toast.error(`${name} is already in contacts`);
    }

    const contact = {
      id: nanoid(),
      name, 
      number,
    };

    setContacts([...contacts, contact]);

    resetForm();
  }

  const deleteContact = (e) => {
    const id = e.target.closest('button').id;
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  const filterContacts= (e) => {
    setFilter(e.target.value);
  };

  return (
    <AppCard>
      <Toaster/>
      <AppTitle>Contacts</AppTitle>
      <ContactForm onFormSubmit={addContact}/>
      { contacts.length > 0 && <Filter filterStr={filter} onFilterChange = {filterContacts}/>}  
      <ContactList contacts={!filter ? contacts : filterByName(contacts, filter)} onClickCloseBtn={deleteContact}/>
    </AppCard>
  );
}
