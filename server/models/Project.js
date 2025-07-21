const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a project name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    status: {
      type: String,
      enum: ['planning', 'in-progress', 'completed', 'on-hold', 'cancelled'],
      default: 'planning',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate with tasks
ProjectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project',
  justOne: false,
});

// Cascade delete tasks when a project is deleted
ProjectSchema.pre('remove', async function (next) {
  await this.model('Task').deleteMany({ project: this._id });
  next();
});

// Update team's projects array
ProjectSchema.post('save', async function () {
  const Team = this.model('Team');
  await Team.findByIdAndUpdate(
    this.team,
    { $addToSet: { projects: this._id } },
    { new: true }
  );
});

module.exports = mongoose.model('Project', ProjectSchema);