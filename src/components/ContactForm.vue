<script setup lang="ts">
import type { Contact } from '../types/index';
import { useContactsStore } from '../stores/contacts';
import { ref } from 'vue';

const name = ref<string>('');
const phone = ref<string>('');
const email = ref<string>('');
const msg = ref<string>('');
const divClass = ref<string>('');
const contactsStore = useContactsStore();

const createContactHandler = () => {
  if (
    name.value.length > 1 &&
    phone.value.length > 1 &&
    email.value.length > 1
  ) {
    const contact: Contact = {
      id: Math.floor(Math.random() * 1000000),
      name: name.value,
      phone: phone.value,
      email: email.value,
    };
    contactsStore.createContactHandler(contact);
    name.value = '';
    phone.value = '';
    email.value = '';

    divClass.value = 'success';
    msg.value = 'Контакт успешно создан!';
  } else {
    divClass.value = 'error';
    msg.value = 'Проверьте корректность полей и их заполнение!';
    console.log('error');
  }
};
</script>

<template>
  <div class="wrapper">
    <div v-if="msg.length > 1" :class="divClass">{{ msg }}</div>
    <form @submit.prevent>
      <input v-model="name" class="input" type="text" placeholder="Name" />
      <input v-model="phone" class="input" type="tel" placeholder="Phone" />
      <input v-model="email" class="input" type="text" placeholder="Email" />
      <button @click="createContactHandler" class="btn">Add new contact</button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 15px;
  width: 100%;
  margin: 0px auto;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  width: 92%;
  border: 0px;
  padding: 10px 15px;
  margin-top: 15px;
  border-bottom: 1px solid RGB(144, 145, 146);
  background-color: transparent;
  color: inherit;
  outline: none;
}

.btn {
  width: 100px;
  margin-top: 15px;
  margin-left: 10px;
  padding: 10px 15px;
  background: RGB(82, 147, 255);
  color: white;
  border: 1px solid teal;
  border-radius: 7px;
  cursor: pointer;
}

.error {
  color: red;
}
.success {
  color: green;
}
</style>