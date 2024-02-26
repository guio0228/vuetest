<template>
  <div class="p-6">
    <div class="add mb-4">
      do:
      <input type="text" v-model="addTodoTitle" class="add-text custom-input" />
    </div>

    <button @click="addTodo" class="add-Todo btnstyle mt-3" type="button">新增</button>
    <div class="search-btn flex space-x-2 mt-3">
      <button @click="switchData('all')" class="all execute" type="button">全部</button>
      <button @click="switchData('isTodo')" class="is-todo execute" type="button">已執行</button>
      <button @click="switchData('notTodo')" class="not-todo execute" type="button">未執行</button>
    </div>
    <table class="todo mt-6 w-full text-center">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">執行</th>
          <th>do</th>

          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in displaySwitch" :key="todo.id" class="border-b">
          <input type="checkbox" :checked="todo.completed" @change="toggleCompletion(todo.id)" />
          <td>{{ todo.title }}</td>

          <td>
            <button @click="editTodo(todo.id)" class="btnstyle">編輯</button>

            <button @click="removeTodo(todo.id)" class="btnstyle">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import './css/input.css';
import { ref, onMounted, onBeforeMount } from 'vue';
const displaySwitch = ref([]);
const arr = ref([]);
const addTodoTitle = ref('');
onMounted(() => {
  switchData('all');
});
onBeforeMount(() => {
  const storedData = localStorage.getItem('blog');
  if (storedData) {
    arr.value = JSON.parse(storedData);
    console.log(arr.value);
  }
});
const addTodo = () => {
  if (addTodoTitle.value) {
    const addTodo = {
      id: Date.now(),
      title: addTodoTitle.value,

      completed: false,
    };
    arr.value.push(addTodo);
    switchData('all');
    addTodoTitle.value = '';

    localStorage.setItem('blog', JSON.stringify(arr.value));
  }
};

const removeTodo = (id) => {
  arr.value = arr.value.filter((todo) => todo.id !== id);
  localStorage.setItem('blog', JSON.stringify(arr.value));
  console.log(JSON.parse(localStorage.getItem('blog')));
  switchData('all');
};

const editTodo = (id) => {
  const itemIndex = arr.value.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    const newItemTitle = prompt('修改文字', arr.value[itemIndex].title);
    if (newItemTitle !== null && newItemTitle.trim() !== '') {
      arr.value[itemIndex].title = newItemTitle;
      localStorage.setItem('blog', JSON.stringify(arr.value)); // 更新localStorage
    }
  }
};
const toggleCompletion = (id) => {
  const index = arr.value.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    arr.value[index].completed = !arr.value[index].completed;
    localStorage.setItem('blog', JSON.stringify(arr.value));
  }
};

const switchData = (type) => {
  switch (type) {
    case 'all':
      displaySwitch.value = [...arr.value];
      break;
    case 'isTodo':
      displaySwitch.value = arr.value.filter((todo) => todo.completed);
      break;
    case 'notTodo':
      displaySwitch.value = arr.value.filter((todo) => !todo.completed);
      break;
  }
};
</script>
