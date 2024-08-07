<script setup lang="ts">
import type { Contact } from '../types/index';
import { ref, onMounted, computed } from 'vue';
import { useContactsStore } from '../stores/contacts';
import { useRouter } from 'vue-router';

interface Props {
  id: number;
}

const router = useRouter();
const contactsStore = useContactsStore();
const props = defineProps<Props>();
const id = props.id;
const name = ref<string>('');
const phone = ref<string>('');
const email = ref<string>('');

const msg = ref<string>('');
const isShowError = ref<string>('');

const regex = /^\d+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_FULLNAME_LENGTH = 64;
const MIN_FULLNAME_LENGTH = 2;
const MAX_MAIL_LENGTH = 320;
const MIN_PHONE_LENGTH = 10;

const getContact = (id: number) => {
  const result = contactsStore.contacts.find((contact) => contact.id === id);
  if (result) {
    name.value = result.name;
    phone.value = result.phone;
    email.value = result.email;
  } else {
    router.push('/');
  }
};

const saveContact = () => {
  const user: Contact = {
    id: id,
    name: name.value,
    phone: phone.value,
    email: email.value,
  };
  const result = contactsStore.editContactHandler(user);
  if (result != 'contact not found!') {
    isShowError.value = 'success';
    msg.value = 'Контакт изменён успешно!';
  } else {
    msg.value = result;
  }
};

const deleteContactHandler = (id: number) => {
  contactsStore.deleteContactHandler(id);
  isShowError.value = 'success';
  msg.value = 'Контакт успешно удалён';
  setTimeout(() => {
    router.push('/');
  }, 800);
};

const isValid = computed(() => {
  return (
    name.value.length > MIN_FULLNAME_LENGTH &&
    name.value.length < MAX_FULLNAME_LENGTH &&
    phone.value.length > MIN_PHONE_LENGTH &&
    regex.test(phone.value) &&
    email.value.length < MAX_MAIL_LENGTH &&
    EMAIL_REGEX.test(email.value)
  );
});

onMounted(() => {
  getContact(id);
});
</script>

<template>
  <div class="wrapper">
    <Transition name="fade">
      <div v-if="msg.length > 1" :class="isShowError">{{ msg }}</div>
    </Transition>
    <form action="" method="POST">
      <fieldset>
        <legend>id</legend>
        <input v-model="id" name="id" type="number" class="fields" disabled />
      </fieldset>
      <fieldset>
        <legend>Имя</legend>
        <input
          v-model="name"
          name="category"
          type="text"
          class="fields"
          placeholder="не менее 2-х символов"
        />
      </fieldset>
      <fieldset>
        <legend>Телефон</legend>
        <input
          v-model="phone"
          name="title"
          type="tel"
          class="fields"
          placeholder="не менее 10-х символов"
        />
      </fieldset>
      <fieldset>
        <legend>Почтовый адрес</legend>
        <input
          v-model="email"
          name="email"
          type="email"
          class="fields"
          placeholder="не менее 2-х символов"
        />
      </fieldset>
      <div class="buttons">
        <button
          v-if="!isValid"
          disabled
          title="Все обязательные поля должны быть заполнены!"
          type="button"
          class="disabledBtn"
        >
          Сохранить
        </button>
        <button
          v-if="isValid"
          type="button"
          class="btn"
          @click.prevent="saveContact"
        >
          Сохранить
        </button>
        <button
          type="button"
          class="btn2"
          @click.prevent="deleteContactHandler(id)"
        >
          Удалить
        </button>
      </div>
    </form>
    <div class="link">
      <RouterLink to="/">На главную страницу </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  text-align: center;
}

fieldset {
  border: 1px solid RGB(0, 158, 226);
  border-radius: 8px;
  padding: 2px;
  width: 364px;
  margin: auto;
}

legend {
  padding-left: 5px;
  padding-right: 5px;
  color: RGB(0, 158, 226);
  font-weight: 10;
}

.fields {
  border: none;
  width: 318px;
  height: 40px;
  padding: 10px;
  outline: none;
  background: white;
}

.btn {
  width: 125px;
  height: 48px;
  color: white;
  font-weight: 14;
  font-size: 1rem;
  background-color: RGB(0, 158, 226);
  border: none;
  border-radius: 7px;
  margin-top: 10px;
  cursor: pointer;
}

.btn2 {
  width: 125px;
  height: 48px;
  color: white;
  font-weight: 14;
  font-size: 1rem;
  background-color: red;
  border: none;
  border-radius: 7px;
  margin-top: 10px;
  cursor: pointer;
}

.disabledBtn {
  width: 125px;
  height: 48px;
  color: white;
  font-weight: 14;
  font-size: 1rem;
  background-color: RGB(128, 128, 128);
  border: none;
  border-radius: 7px;
  margin-top: 10px;
  cursor: pointer;
}

.buttons {
  display: inline-flex;
  flex-direction: column;
}

.error {
  color: red;
}

.success {
  color: green;
}

.link {
  margin-top: 15px;
}

.fade-enter-active {
  animation: fade-in 1s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
