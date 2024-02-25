<template>
  <div class="p-6">
    <div class="add mb-4">
      標題:
      <input type="text" v-model="addTodoTitle" class="add-text custom-input" />
    </div>
    內文:
    <input id="editor" class="add-content custom-input" v-model="addTodoContent" />
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
          <th>標題</th>
          <th>內文</th>
          <th>回覆</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in displaySwitch" :key="todo.id" class="border-b">
          <td class="p-2"><input type="checkbox" v-model="todo.completed" /></td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.content }}</td>
          <td>456</td>
          <td>
            <button @click="editTodo(todo.id)" class="btnstyle">回覆</button>
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
import { ref, onMounted } from 'vue';
const displaySwitch = ref([]);
const arr = ref([]);
const addTodoTitle = ref('');
const addTodoContent = ref('');
onMounted(() => {
  switchData('all');
});
const addTodo = () => {
  if (addTodoTitle.value && addTodoContent.value) {
    const addTodo = {
      id: Date.now(),
      title: addTodoTitle.value,
      content: addTodoContent.value,
      completed: false,
    };
    arr.value.push(addTodo);
    switchData('all');
    addTodoTitle.value = '';
    addTodoContent.value = '';

    console.log(arr.value);
    localStorage.setItem("blog", arr.value)
  }
};

const removeTodo = (id) => {
  arr.value = arr.value.filter((todo) => todo.id !== id);
  switchData('all');
};

const editTodo = (id) => {
  console.log(arr.value);
  arr.value = arr.value.map((item) => {
    if (item.id === id) {
      const title = prompt('修改文字', item.title.value);
      
      if (title !== null) {
        return { ...item, title: title. };
      }
    }
    return item;
  });
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
