import React from "react";
import { Toaster } from "react-hot-toast";
import { AppCard, AppTitle } from "./App.styled";
import { ContactForm } from "components/ContactAddForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";


export const App = () => {
  return (
    <AppCard>
      <Toaster/>
      <AppTitle>Contacts</AppTitle>
      <ContactForm/>
      <Filter />  
      <ContactList />
    </AppCard>
  );
}
