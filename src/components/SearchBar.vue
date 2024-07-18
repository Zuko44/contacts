<script setup lang="ts">
import { ref } from 'vue';
import { useContactsStore } from '../stores/contacts';
import debounce from 'lodash/debounce';

const simpleFilter = ref<string>('');
const contactsStore = useContactsStore();

const filterContacts = debounce(() => {
  if (simpleFilter.value.length > 1) {
    contactsStore.contacts = contactsStore.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(simpleFilter.value.toLowerCase()) ||
        contact.phone.includes(simpleFilter.value) ||
        contact.email.includes(simpleFilter.value),
    );
  } else {
    contactsStore.contacts = contactsStore.temporaryStorageContacts;
  }
});
</script>

<template>
  <div class="wrapper">
    <input
      class="input"
      type="text"
      v-model="simpleFilter"
      placeholder="find contact"
      @input="filterContacts"
    />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 15px;
  width: 100%;
  margin: 0px auto;
  text-align: center;
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
</style>
