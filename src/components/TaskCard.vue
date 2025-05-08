<template>
  <div class="task-card" :class="{ [`priority-${task.priority}`]: true }">
    <div class="task-header">
      <div class="task-priority">
        {{ priorityLabel }}
      </div>
      <div class="task-actions">
        <button class="action-btn" @click="$emit('edit')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
        <button class="action-btn" @click="$emit('delete')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
    <h4 class="task-title">{{ task.title }}</h4>
    <p class="task-description">{{ task.description }}</p>
    <div class="task-footer">
      <div class="task-date">{{ formattedDate }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const priorityLabel = computed(() => {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  };
  
  return labels[props.task.priority] || 'Medium';
});

const formattedDate = computed(() => {
  if (!props.task.date) return '';
  
  const options = { month: 'short', day: 'numeric' };
  return new Date(props.task.date).toLocaleDateString(undefined, options);
});
</script>

<style scoped>
.task-card {
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-3);
  cursor: grab;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.task-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.task-card:active {
  cursor: grabbing;
}

.task-card.priority-low {
  border-left-color: var(--color-secondary);
}

.task-card.priority-medium {
  border-left-color: var(--color-accent);
}

.task-card.priority-high {
  border-left-color: var(--color-error);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.task-priority {
  font-size: 0.75rem;
  font-weight: 600;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  background-color: var(--color-gray-100);
}

.priority-low .task-priority {
  color: var(--color-secondary);
  background-color: rgba(20, 184, 166, 0.1);
}

.priority-medium .task-priority {
  color: var(--color-accent);
  background-color: rgba(249, 115, 22, 0.1);
}

.priority-high .task-priority {
  color: var(--color-error);
  background-color: rgba(239, 68, 68, 0.1);
}

.task-actions {
  display: flex;
  gap: var(--spacing-1);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.task-card:hover .task-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-1);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
}

.task-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  color: var(--color-gray-800);
  word-break: break-word;
}

.task-description {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-3);
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  color: var(--color-gray-500);
}

.task-date {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}
</style>