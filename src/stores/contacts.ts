import type { Contact } from '../types/index';
import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import communications from '../sources/contacts.json';

export const useContactsStore = defineStore('taskStore', () => {
  const contacts = ref<Contact[]>([]);
  const temporaryStorageContacts = ref<Contact[]>([]);

  const deleteContactHandler = (id: number) => {
    temporaryStorageContacts.value = temporaryStorageContacts.value.filter(
      (p) => p.id !== id,
    );
    contacts.value = temporaryStorageContacts.value;
    saveContacts();
  };

  const editContactHandler = (user: Contact) => {
    const contact = temporaryStorageContacts.value.find(
      (contact: Contact) => contact.id === user.id,
    );
    if (contact) {
      contact.name = user.name;
      contact.phone = user.phone;
      contact.email = user.email;
    } else {
      console.log('contact not found');
    }
    contacts.value = temporaryStorageContacts.value;
    saveContacts();
  };

  const createContactHandler = (contact: Contact) => {
    temporaryStorageContacts.value.push(contact);
    contacts.value = temporaryStorageContacts.value;
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
    deleteContactHandler,
    createContactHandler,
    editContactHandler,
  };
});
