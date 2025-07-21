const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a task title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    status: {
      type: String,
      enum: ['backlog', 'todo', 'in-progress', 'review', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    dueDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Update project progress when tasks are updated
TaskSchema.post('save', async function () {
  await updateProjectProgress(this.project);
});

TaskSchema.post('findOneAndUpdate', async function (doc) {
  await updateProjectProgress(doc.project);
});

TaskSchema.post('remove', async function () {
  await updateProjectProgress(this.project);
});

// Helper function to update project progress
async function updateProjectProgress(projectId) {
  const Task = mongoose.model('Task');
  const Project = mongoose.model('Project');

  const tasks = await Task.find({ project: projectId });
  
  if (tasks.length === 0) {
    await Project.findByIdAndUpdate(projectId, { progress: 0 });
    return;
  }

  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  await Project.findByIdAndUpdate(projectId, { progress });
}

module.exports = mongoose.model('Task', TaskSchema);