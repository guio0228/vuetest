<template>
  <div>
    <div class="add">
      標題: <input type="text" v-model="addTodoTitle" class="add-text" />
      <button @click="addTodo" class="add-Todo" type="button">新增</button>
    </div>
    <input id="editor" class="add-content" v-model="addTodoContent" />
    <div class="search-btn">
      <button @click="filterTodos('all')" class="all" type="button">全部</button>
      <button @click="filterTodos('isTodo')" class="is-todo" type="button">已執行</button>
      <button @click="filterTodos('notTodo')" class="not-todo" type="button">未執行</button>
    </div>
    <table class="todo">
      <thead>
        <tr>
          <th>執行</th>
          <th>標題</th>
          <th>內文</th>
          <th>回覆</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.completed ? '已執行' : '未執行' }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.content }}</td>
          <td>456</td>
          <td>
            <button @click="editTodo(todo.id)">編輯</button>
            <button @click="removeTodo(todo.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const todos = ref([]);
const addTodoTitle = ref('');
const addTodoContent = ref('');

const addTodo = () => {
  if (addTodoTitle.value && addTodoContent.value) {
    const addTodo = {
      id: 0,
      title: addTodoTitle.value,
      content: addTodoContent.value,
      completed: false,
    };
    todos.value.push(addTodo);
    addTodoTitle.value = '';
    addTodoContent.value = '';
  }
};

const removeTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const filterTodos = (criteria) => {};
const editTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};
</script>
<style></style>
