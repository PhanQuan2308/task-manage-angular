import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/taskService/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  newTask = { name: '', description: '', deadline: '', priority: 'medium' };
  editingTaskId: string | null = null;
  message: string | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.message = 'Error fetching tasks';
      },
    });
  }

  addOrUpdateTask(): void {
    if (this.editingTaskId) {
      // Nếu có ID của công việc cần sửa, gọi update
      this.taskService.updateTask(this.editingTaskId, this.newTask).subscribe({
        next: () => {
          this.loadTasks();
          this.clearForm();
          this.message = 'Task updated successfully';
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.message = 'Error updating task';
        },
      });
    } else {
      // Nếu không có ID, gọi add task
      this.taskService.createTask(this.newTask).subscribe({
        next: () => {
          this.loadTasks();
          this.clearForm();
          this.message = 'Task added successfully';
        },
        error: (error) => {
          console.error('Error adding task:', error);
          this.message = 'Error adding task';
        },
      });
    }
  }

  editTask(task: any): void {
    this.newTask = { ...task }; // Copy thông tin công việc vào ô input
    this.editingTaskId = task._id; // Gán ID của công việc đang sửa
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.loadTasks();
          this.message = 'Task deleted successfully';
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.message = 'Error deleting task';
        },
      });
    }
  }

  clearForm(): void {
    this.newTask = {
      name: '',
      description: '',
      deadline: '',
      priority: 'medium',
    };
    this.editingTaskId = null;
    this.message = null;
  }
  toggleTaskCompletion(task: any): void {
    this.taskService.toggleTaskCompletion(task._id).subscribe({
      next: (response) => {
        task.completed = response.completed; // Cập nhật trạng thái hoàn thành từ phản hồi server
        this.message = 'Task completion status updated';
      },
      error: (error) =>
        console.error('Error updating task completion status', error),
    });
  }
}
