import React, {Component} from "react";
import { nanoid } from "nanoid";
import { toast, Toaster } from "react-hot-toast";
import { filterByName } from "utils/filter-by-name";
import { NameIsInContacts } from "utils/check-by-name";
import { AppCard, AppTitle } from "./App.styled";
import { ContactForm } from "components/ContactAddForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";

export class App extends Component {
  state= {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    savedContacts && this.setState({contacts: [...savedContacts]});
  }

  componentDidUpdate(_, prevState) {
    const {contacts} = this.state;

    if(contacts !== prevState.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({name, number}, {resetForm}) => {

    if(NameIsInContacts(this.state.contacts, name)) {
      resetForm();
      return toast.error(`${name} is already in contacts`);
    }

    const contact = {
      id: nanoid(),
      name, 
      number,
    };

    this.setState((prevState) => 
    ({contacts: [...prevState.contacts, contact]}));

    resetForm();
  }

  deleteContact = (e) => {
    const id = e.target.closest('button').id;
    this.setState(prevState => 
      ({contacts: [...prevState.contacts.filter(contact => contact.id !== id)]}));
  }

  filterContacts= (e) => {
    this.setState({filter: e.target.value})
  };

  render() {
    const {contacts, filter} = this.state;
    return (
    <AppCard>
      <Toaster/>
      <AppTitle>Contacts</AppTitle>
      <ContactForm onFormSubmit={this.addContact}/>
      { this.state.contacts.length > 0 && <Filter filterStr={filter} onFilterChange = {this.filterContacts}/>}  
      <ContactList contacts={!filter ? contacts : filterByName(contacts, filter)} onClickCloseBtn={this.deleteContact}/>
    </AppCard>
  );}
};
