import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  // State
  const tasks = ref([
    {
      id: '1',
      title: 'Create project plan',
      description: 'Outline the key objectives, milestones, and timeline for the new product launch',
      status: 'todo',
      priority: 'high',
      date: '2025-01-15',
      createdAt: '2024-12-25T10:00:00Z'
    },
    {
      id: '2',
      title: 'Design user interface',
      description: 'Create wireframes and mockups for the main screens of the application',
      status: 'inProgress',
      priority: 'medium',
      date: '2025-01-20',
      createdAt: '2024-12-26T09:30:00Z'
    },
    {
      id: '3',
      title: 'Research competitors',
      description: 'Analyze competing products to identify opportunities for differentiation',
      status: 'done',
      priority: 'low',
      date: '2025-01-10',
      createdAt: '2024-12-24T14:15:00Z'
    }
  ]);
  
  const searchQuery = ref('');

  // Getters
  const getTasksByStatus = computed(() => (status) => {
    return tasks.value.filter(task => task.status === status);
  });
  
  const getFilteredTasks = computed(() => (status, query) => {
    const statusTasks = getTasksByStatus.value(status);
    
    if (!query) return statusTasks;
    
    const lowercaseQuery = query.toLowerCase();
    return statusTasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) || 
      task.description.toLowerCase().includes(lowercaseQuery)
    );
  });

  // Actions
  function addTask(task) {
    tasks.value.push(task);
  }
  
  function updateTask(updatedTask) {
    const index = tasks.value.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  }
  
  function deleteTask(taskId) {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  }
  
  function updateTaskStatus(taskId, newStatus) {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }
  
  function setSearchQuery(query) {
    searchQuery.value = query;
  }

  return {
    tasks,
    searchQuery,
    getTasksByStatus,
    getFilteredTasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    setSearchQuery
  };
});