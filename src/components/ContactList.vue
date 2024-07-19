<script setup lang="ts">
import ContactItem from './ContactItem.vue';
import { useContactsStore } from '../stores/contacts';

const contactsStore = useContactsStore();
</script>

<template>
  <TransitionGroup class="contacts" name="list" tag="ul">
    <ContactItem
      v-for="contact in contactsStore.contacts"
      :key="contact.id"
      :user="contact"
    />
  </TransitionGroup>
</template>

<style scoped>
.contacts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
