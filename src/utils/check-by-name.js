export const NameIsInContacts = (contacts, newName) => contacts.find(({name}) => name.toLowerCase() === newName.toLowerCase()); 