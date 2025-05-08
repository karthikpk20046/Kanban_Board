<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">Add New Task</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="addTask">
          <div class="form-group">
            <label for="title">Title</label>
            <input 
              id="title" 
              type="text" 
              v-model="newTask.title" 
              placeholder="Task title"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              v-model="newTask.description" 
              placeholder="Task description"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="status">Status</label>
              <select id="status" v-model="newTask.status">
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="priority">Priority</label>
              <select id="priority" v-model="newTask.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="date">Due Date</label>
            <input 
              id="date" 
              type="date" 
              v-model="newTask.date"
            />
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['close', 'add-task']);

const newTask = reactive({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  date: new Date().toISOString().split('T')[0]
});

const addTask = () => {
  if (!newTask.title.trim()) return;
  
  emit('add-task', {
    ...newTask,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  });
  
  // Reset form
  newTask.title = '';
  newTask.description = '';
  newTask.status = 'todo';
  newTask.priority = 'medium';
  newTask.date = new Date().toISOString().split('T')[0];
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: var(--spacing-4);
}

.modal-container {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-lg);
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-800);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-gray-500);
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: var(--spacing-4);
  overflow-y: auto;
}

.form-group {
  margin-bottom: var(--spacing-4);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-weight: 500;
  color: var(--color-gray-700);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-300);
  background-color: var(--color-white);
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  margin-top: var(--spacing-4);
}

.btn-secondary {
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);
}

.btn-secondary:hover {
  background-color: var(--color-gray-300);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
  }
}
</style>