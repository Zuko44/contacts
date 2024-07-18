import axios from 'axios';
import type { Contact } from '../types/index';

// Данные API абсолютно моковые, поскольку используется LocalStorage,
// и представлены чисто для примера как могло бы быть, если бы был сервер
export const createNewContact = async (
  id: number,
  name: string,
  phone: string,
  email: string,
) => {
  const response = await axios.post('https://fakestoreapi.com/contacts', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      name: name,
      phone: phone,
      email: email,
    }),
  });
  const result = await response.data;
  return result;
};

export const getAllContacts = async (num?: number) => {
  const response = await axios.get(
    'https://fakestoreapi.com/contacts?limit=' + num,
  );
  const result = await response.data;
  return result;
};

export const getOneContact = async (id: number) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/contacts/' + id);
    const result = await response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const saveNewContact = async (contact: Contact) => {
  const response = await axios.post('https://fakestoreapi.com/contacts', {
    method: 'POST',
    body: JSON.stringify({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    }),
  });
  const result = await response.data;
  return result;
};

export const deleteContact = async (id: number) => {
  const response = await axios.delete(
    'https://fakestoreapi.com/contacts/' + id,
    {
      method: 'DELETE',
    },
  );
  const result = await response.data;
  return result;
};
