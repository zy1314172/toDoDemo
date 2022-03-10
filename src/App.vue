<template>
  <div>
    <header>
      <input type="checkbox" @click="allCheck" :checked="isAllChecked" />
      <input autofocus @keyup.enter="addTodoList" />
    </header>
    <section v-if="todoList.length">
      <ul>
        <li v-for="(item, index) in newTodoList" :key="item.id">
          <div>
            <input type="checkbox" v-model="item.completed" />
            <label @dblclick="changeOther(item)" v-show="item.flag">{{item.content}}</label>
            <button @click="destroyTodoList(index)">x</button>
          </div>
          <input :value="item.content" v-show="!item.flag" @keyup.enter="saveEdit(item, index, $event)" @blur="saveEdit(item, index, $event)" @keyup.esc="quitEdit(item)"/>
        </li>
      </ul>
    </section>
    <footer v-if="todoList.length">
      <span>{{ todoCount }} item left</span>
      <button @click="changeState('all')">all</button>
      <button @click="changeState('active')">active</button>
      <button @click="changeState('completed')">completed</button>
      <button @click="clearCompleted" v-show="hasComplete">Clear completed</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      todoList: [
      ],
      state: "all",
    };
  },
  methods: {
    addTodoList($event) {
      let newTodoList = {
        id: this.todoList.length + 1,
        content: $event.target.value.trim(),
        completed: false,
        flag: true,
      };
      if (!newTodoList.content.length) return;
      this.todoList.push(newTodoList);
      $event.target.value = "";
    },
    destroyTodoList(index) {
      this.todoList.splice(index, 1);
    },
    changeOther(item) {
      item.flag = !item.flag;
    },
    saveEdit(item, index, $event) {
      let newContent = $event.target.value.trim();
      if (!newContent) this.destroyTodoList(index);
      item.content = newContent;
      this.changeOther(item);
    },
    quitEdit(item) {
      this.changeOther(item);
    },
    allCheck($event) {
      let isCheck = $event.target.checked;
      this.todoList.forEach((item) => {
        item.completed = isCheck;
      });
    },
    clearCompleted() {
      this.todoList = this.todoList.filter((item) => !item.completed);
    },
    changeState(state) {
      this.state = state;
    },
  },
  computed: {
    isAllChecked() {
      if(this.todoList.length>0){
        return !this.todoList.find((item) => !item.completed);
      }else{
        return false
      }
    },
    todoCount() {
      return this.todoList.filter((item) => !item.completed).length;
    },
    hasComplete() {
      return this.todoList.filter((item) => item.completed > 0).length > 0;
    },
    newTodoList() {
      switch (this.state) {
        case "active":
          return this.todoList.filter((item) => !item.completed);
          break;
        case "completed":
          return this.todoList.filter((item) => item.completed);
          break;
        default:
          return this.todoList;
          break;
      }
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
