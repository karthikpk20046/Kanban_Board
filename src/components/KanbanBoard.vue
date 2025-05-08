<template>
  <div class="kanban-board">
    <div class="board-header">
      <h2 class="board-title">My Tasks</h2>
      <div class="board-controls">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            v-model="searchQuery"
            @input="filterTasks"
          />
        </div>
      </div>
    </div>
    
    <div class="board-columns">
      <KanbanColumn 
        v-for="column in columns" 
        :key="column.id"
        :column="column"
        :tasks="getFilteredTasks(column.id)"
        @edit-task="editTask"
        @delete-task="deleteTask"
      />
    </div>
    
    <TaskEditModal 
      v-if="editingTask" 
      :task="editingTask"
      @close="editingTask = null"
      @save="updateTask"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import KanbanColumn from './KanbanColumn.vue';
import TaskEditModal from './TaskEditModal.vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const editingTask = ref(null);
const searchQuery = ref('');

const columns = [
  { id: 'todo', title: 'To Do', color: '#3B82F6' },
  { id: 'inProgress', title: 'In Progress', color: '#F97316' },
  { id: 'done', title: 'Done', color: '#22C55E' }
];

const getFilteredTasks = (columnId) => {
  return taskStore.getFilteredTasks(columnId, searchQuery.value);
};

const filterTasks = () => {
  taskStore.setSearchQuery(searchQuery.value);
};

const editTask = (task) => {
  editingTask.value = { ...task };
};

const updateTask = (updatedTask) => {
  taskStore.updateTask(updatedTask);
  editingTask.value = null;
};

const deleteTask = (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(taskId);
  }
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.board-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gray-800);
}

.board-controls {
  display: flex;
  gap: var(--spacing-3);
  align-items: center;
}

.search-box input {
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-300);
  background-color: var(--color-white);
  min-width: 200px;
  outline: none;
  transition: border-color 0.2s;
}

.search-box input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.board-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-4);
}

@media (max-width: 768px) {
  .board-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-box input {
    width: 100%;
    min-width: unset;
  }
  
  .board-columns {
    grid-template-columns: 1fr;
    overflow-x: auto;
  }
}
</style>