<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import type { Recipe, Todo } from "@zerops/zestrat-models";
import TodosService from "./services/TodosService";

export default defineComponent({
  setup() {
    const zProjectDiagramRef = ref<any>();

    return { zProjectDiagramRef };
  },
  data() {
    const zeropsRecipeConfig: Recipe = JSON.parse(
      import.meta.env.VITE_ZEROPS_RECIPE_CONFIG as string
    );
    return {
      todosService: new TodosService(zeropsRecipeConfig.apiEndpoint),
      zeropsRecipeConfig: zeropsRecipeConfig,
      todos: [] as Todo[],
    };
  },
  mounted() {
    setTimeout(() => {
      this.zProjectDiagramRef.simulateGet(this.zeropsRecipeConfig.guiEndpoint);
      this.loadTodos(true);
    });
  },
  methods: {
    loadTodos(triggerSimulation = false) {
      this.todosService.findAll().then((res) => (this.todos = res.data));

      if (triggerSimulation) {
        this.zProjectDiagramRef.simulateGet(
          `${this.zeropsRecipeConfig.apiEndpoint}/todos`,
          ["db"]
        );
      }
    },
    addTodo(text: string) {
      this.zProjectDiagramRef.simulatePost(
        `${this.zeropsRecipeConfig.apiEndpoint}/todos`,
        ["db"]
      );
      this.todosService.add({ text }).then(() => this.loadTodos());
    },
    updateTodo(id: string | number, data: Partial<Todo>) {
      this.zProjectDiagramRef.simulatePatch(
        `${this.zeropsRecipeConfig.apiEndpoint}/todos`,
        ["db"]
      );
      this.todosService.update(id, data).then(() => this.loadTodos());
    },
    deleteTodo(id: string | number) {
      this.zProjectDiagramRef.simulateDelete(
        `${this.zeropsRecipeConfig.apiEndpoint}/todos`,
        ["db"]
      );
      this.todosService.delete(id).then(() => this.loadTodos());
    },
  },
});
</script>

<template>
  <div class="zs-app">
    <ZsRecipeInfo
      :intro="zeropsRecipeConfig.intro"
      :desc="zeropsRecipeConfig.description"
    />
    <ZsTodos
      @add="addTodo"
      @update="updateTodo($event.id, $event.data)"
      @remove="deleteTodo"
      :data="todos"
    />
  </div>

  <z-project-diagram
    ref="zProjectDiagramRef"
    :project-name="zeropsRecipeConfig.projectName"
    :services="JSON.stringify(zeropsRecipeConfig.services)"
  ></z-project-diagram>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
@import "@zerops/zestratcss/zestrat.css";
</style>
