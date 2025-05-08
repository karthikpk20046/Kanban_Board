<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1 class="logo">Kanban Board</h1>
        <div class="header-controls">
          <button class="btn btn-primary" @click="showAddTaskModal = true">
            <span class="icon">+</span>
            Add Task
          </button>
        </div>
      </div>
    </header>
    
    <main class="main">
      <div class="container">
        <KanbanBoard />
      </div>
    </main>

    <AddTaskModal 
      v-if="showAddTaskModal" 
      @close="showAddTaskModal = false"
      @add-task="handleAddTask"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import KanbanBoard from './components/KanbanBoard.vue';
import AddTaskModal from './components/AddTaskModal.vue';
import { useTaskStore } from './stores/taskStore';

const showAddTaskModal = ref(false);
const taskStore = useTaskStore();

const handleAddTask = (task) => {
  taskStore.addTask(task);
  showAddTaskModal.value = false;
};
</script>

<style>
:root {
  /* Color system */
  --color-primary: #3B82F6;
  --color-primary-light: #93C5FD;
  --color-primary-dark: #2563EB;
  
  --color-secondary: #14B8A6;
  --color-secondary-light: #5EEAD4;
  --color-secondary-dark: #0D9488;
  
  --color-accent: #F97316;
  --color-accent-light: #FDBA74;
  --color-accent-dark: #EA580C;
  
  --color-success: #22C55E;
  --color-warning: #EAB308;
  --color-error: #EF4444;
  
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  
  --color-white: #FFFFFF;
  --color-black: #000000;
  
  /* Typography */
  --font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 24px;
  --spacing-6: 32px;
  --spacing-7: 40px;
  --spacing-8: 48px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-full: 9999px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-gray-800);
  background-color: var(--color-gray-100);
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-4) 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.header-controls {
  display: flex;
  gap: var(--spacing-3);
}

.main {
  flex: 1;
  padding: var(--spacing-6) 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.icon {
  font-size: 1.2em;
  line-height: 1;
}

/* Responsive styles */
@media (max-width: 768px) {
  .header {
    padding: var(--spacing-3) 0;
  }
  
  .logo {
    font-size: 1.25rem;
  }
}
</style>