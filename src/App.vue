<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import type { Recipe, Todo } from "@zerops/zestrat-models";
import TodosService from "./services/TodosService";

export default defineComponent({
  data() {
    return {
      todosService: new TodosService(
        import.meta.env.VITE_API_ENDPOINT as string
      ),
      recipe: JSON.parse(
        import.meta.env.VITE_RECIPE_CONFIG as string
      ) as Recipe,
      todos: [] as Todo[],
    };
  },
  created() {
    this.loadTodos();
  },
  methods: {
    loadTodos() {
      this.todosService.findAll().then((res) => (this.todos = res.data));
    },
    addTodo(text: string) {
      this.todosService.add({ text }).then(() => this.loadTodos());
    },
    updateTodo(id: string | number, data: Partial<Todo>) {
      this.todosService.update(id, data).then(() => this.loadTodos());
    },
    deleteTodo(id: string | number) {
      this.todosService.delete(id).then(() => this.loadTodos());
    },
  },
});
</script>

<template>
  <div class="zs-recipe">
    <div class="zs-recipe-context">
      <ZsRecipeInfo :intro="recipe.intro" :desc="recipe.description" />
      <ZsTodos
        @add="addTodo"
        @update="updateTodo($event.id, $event.data)"
        @remove="deleteTodo"
        :data="todos"
      />
    </div>
    <div class="zs-recipe-diagram">
      <z-project-diagram
        :services="JSON.parse(JSON.stringify(recipe.services))"
      ></z-project-diagram>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:400;500");
@import "@zerops/zestratcss/zestrat.css";
</style>
