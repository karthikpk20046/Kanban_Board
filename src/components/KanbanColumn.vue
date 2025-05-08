<template>
  <div class="kanban-column" :style="{ '--column-color': column.color }">
    <div class="column-header">
      <h3 class="column-title">{{ column.title }}</h3>
      <div class="task-count">{{ tasks.length }}</div>
    </div>
    
    <div class="column-content">
      <draggable 
        v-model="tasksList" 
        :group="{ name: 'tasks' }"
        item-key="id"
        class="task-list"
        @change="handleDragChange"
      >
        <template #item="{ element }">
          <TaskCard 
            :task="element" 
            @edit="$emit('edit-task', element)"
            @delete="$emit('delete-task', element.id)"
          />
        </template>
      </draggable>
      
      <div v-if="tasks.length === 0" class="empty-column">
        <p>No tasks</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import draggable from 'vuedraggable';
import TaskCard from './TaskCard.vue';
import { useTaskStore } from '../stores/taskStore';

const props = defineProps({
  column: {
    type: Object,
    required: true
  },
  tasks: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['edit-task', 'delete-task']);
const taskStore = useTaskStore();

const tasksList = computed({
  get: () => props.tasks,
  set: (value) => {
    // This will be handled by the handleDragChange function
  }
});

const handleDragChange = (event) => {
  // When a task is dropped in this column
  if (event.added) {
    const task = event.added.element;
    taskStore.updateTaskStatus(task.id, props.column.id);
  }
};
</script>

<style scoped>
.kanban-column {
  background-color: var(--color-gray-50);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  border-top: 3px solid var(--column-color, var(--color-primary));
  height: calc(100vh - 220px);
  min-height: 400px;
}

.column-header {
  padding: var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-gray-200);
}

.column-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-gray-800);
}

.task-count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background-color: var(--column-color, var(--color-primary));
  color: var(--color-white);
  font-size: 0.75rem;
  font-weight: 600;
}

.column-content {
  flex: 1;
  padding: var(--spacing-3);
  overflow-y: auto;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  min-height: 10px; /* To ensure the column is droppable when empty */
}

.empty-column {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-400);
  font-style: italic;
  border: 2px dashed var(--color-gray-200);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-2);
}
</style>