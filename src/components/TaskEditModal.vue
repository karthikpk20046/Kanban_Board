<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">Edit Task</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="saveTask">
          <div class="form-group">
            <label for="edit-title">Title</label>
            <input 
              id="edit-title" 
              type="text" 
              v-model="editedTask.title" 
              placeholder="Task title"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="edit-description">Description</label>
            <textarea 
              id="edit-description" 
              v-model="editedTask.description" 
              placeholder="Task description"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="edit-status">Status</label>
              <select id="edit-status" v-model="editedTask.status">
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="edit-priority">Priority</label>
              <select id="edit-priority" v-model="editedTask.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="edit-date">Due Date</label>
            <input 
              id="edit-date" 
              type="date" 
              v-model="editedTask.date"
            />
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

const editedTask = reactive({
  id: '',
  title: '',
  description: '',
  status: '',
  priority: '',
  date: '',
  createdAt: ''
});

// Update the reactive object when the props change
watchEffect(() => {
  if (props.task) {
    editedTask.id = props.task.id;
    editedTask.title = props.task.title;
    editedTask.description = props.task.description;
    editedTask.status = props.task.status;
    editedTask.priority = props.task.priority;
    editedTask.date = props.task.date;
    editedTask.createdAt = props.task.createdAt;
  }
});

const saveTask = () => {
  if (!editedTask.title.trim()) return;
  
  emit('save', { ...editedTask });
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