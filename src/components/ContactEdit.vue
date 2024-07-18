<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import router from '../router';
import { useContactsStore } from '../stores/contacts';

interface Props {
  id: number;
}

const contactsStore = useContactsStore();
const props = defineProps<Props>();
const id = props.id;
const name = ref<string>('');
const phone = ref<string>('');
const email = ref<string>('');

const msg = ref<string>('');
const divClass = ref<string>('');

const getContact = (id: number) => {
  const result = contactsStore.findContactHandler(id);
  if (result) {
    console.log(result);

    name.value = result.name;
    phone.value = result.phone;
    email.value = result.email;
  }
};

const saveContact = () => {
  const user = {
    id: id,
    name: name.value,
    phone: phone.value,
    email: email.value,
  };
  contactsStore.editContactHandler(user);
};

const deleteContactHandler = (id: number) => {
  contactsStore.deleteContactHandler(id);
  router.push({ name: 'home' });
};

const isValid = computed(() => {
  return (
    name.value.length > 0 && phone.value.length > 0 && email.value.length > 0
  );
});

onMounted(() => {
  getContact(id);
});
</script>

<template>
  <div class="wrapper">
    <div v-if="msg.length > 1" :class="divClass">{{ msg }}</div>
    <form action="" method="POST">
      <fieldset>
        <legend>id</legend>
        <input v-model="id" name="id" type="number" class="fields" disabled />
      </fieldset>
      <fieldset>
        <legend>Имя</legend>
        <input v-model="name" name="category" type="text" class="fields" />
      </fieldset>
      <fieldset>
        <legend>Телефон</legend>
        <input v-model="phone" name="title" type="text" class="fields" />
      </fieldset>
      <fieldset>
        <legend>Почтовый адрес</legend>
        <textarea v-model="email" name="description" type="text"></textarea>
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

.public {
  margin-top: 10px;
  color: RGB(128, 128, 128);
}

.public input {
  margin: 0px 5px;
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

textarea {
  border: none;
  width: 318px;
  height: 100px;
  padding: 10px;
  outline: none;
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
</style>
