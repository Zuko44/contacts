import type { Contact } from '../types/index';
import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import communications from '../sources/contacts.json';

export const useContactsStore = defineStore('taskStore', () => {
  const contacts = ref<Contact[]>([]);
  const temporaryStorageContacts = ref<Contact[]>([]);

  const findContactHandler = (id: number) => {
    const contact = contacts.value.find(
      (contact: Contact) => contact.id === id,
    );
    return contact;
  };

  const deleteContactHandler = (id: number) => {
    contacts.value = contacts.value.filter((p) => p.id !== id);
    temporaryStorageContacts.value = temporaryStorageContacts.value.filter(
      (p) => p.id !== id,
    );
    saveContacts();
  };

  const editContactHandler = (user: Contact) => {
    contacts.value = temporaryStorageContacts.value;
    const contact = contacts.value.find(
      (contact: Contact) => contact.id === user.id,
    );
    if (contact) {
      contact.name = user.name;
      contact.phone = user.phone;
      contact.email = user.email;
      saveContacts();
    } else {
      console.log('contact not found');
    }

    const contact2 = temporaryStorageContacts.value.find(
      (contact: Contact) => contact.id === user.id,
    );
    if (contact2) {
      contact.name = user.name;
      contact.phone = user.phone;
      contact.email = user.email;
      saveContacts();
    } else {
      console.log('contact not found');
    }
  };

  const createContactHandler = (contact: Contact) => {
    contacts.value.push(contact);
    temporaryStorageContacts.value.push(contact);
    saveContacts();
  };

  const saveContacts = () => {
    const parsed = JSON.stringify(contacts.value);
    localStorage.setItem('contacts', parsed);
  };

  const getAndSetContactsFromLocalStorage = () => {
    const contactsOnLocalStorage = localStorage.getItem('contacts');
    let contactsStorage: Contact[] = [];

    if (contactsOnLocalStorage !== null) {
      contactsStorage = JSON.parse(contactsOnLocalStorage);
      contacts.value = contactsStorage;
      temporaryStorageContacts.value = contactsStorage;
    } else {
      contacts.value = communications;
      temporaryStorageContacts.value = communications;
    }
  };

  onMounted(() => {
    getAndSetContactsFromLocalStorage();
  });

  return {
    contacts,
    temporaryStorageContacts,
    findContactHandler,
    deleteContactHandler,
    createContactHandler,
    editContactHandler,
  };
});
