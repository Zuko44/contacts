<script setup lang="ts">
import { ref } from 'vue';
import type { Contact } from '../types/index';
import ContactItem from './ContactItem.vue';
import { useContactsStore } from '../stores/contacts';

const contactsStore = useContactsStore();
</script>

<template>
  <div class="contacts">
    <ContactItem
      v-for="contact in contactsStore.contacts"
      :key="contact.id"
      :user="contact"
    />
  </div>
</template>

<style scoped>
.contacts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
