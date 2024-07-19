<script setup lang="ts">
import type { Contact } from '../types/index';

interface Props {
  user: Contact;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="contact">
    <div class="name">{{ props.user.name }}</div>
    <div class="contacts_container">
      <div>
        <img class="phone" src="../assets/icons/tel.svg" alt="phone" />
        {{ props.user.phone }}
      </div>
      <div>
        <img class="email" src="../assets/icons/email.svg" alt="email" />
        {{ props.user.email }}
      </div>
    </div>
    <RouterLink :to="'/contacts/' + props.user.id">Редактировать </RouterLink>
  </div>
</template>

<style scoped>
.contact {
  width: 300px;
  height: 300px;
  border-radius: 16px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 15px;
  margin-bottom: 24px;
  cursor: pointer;
}

.name {
  line-height: 30px;
  font-size: 24px;
  font-weight: 700;
}

.phone {
  width: 14px;
  height: 24px;
  margin-left: 10px;
}

.email {
  width: 24px;
  height: 14px;
}

img {
  margin: 5px 15px 5px 5px;
  vertical-align: middle;
}

.contacts_container {
  margin-top: 20px;
  height: 60px;
}

.contacts_container div {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(129, 137, 163, 1);
}
</style>
