const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a file name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    url: {
      type: String,
      required: [true, 'Please add a file URL'],
    },
    type: {
      type: String,
      enum: ['image', 'document', 'video', 'audio', 'other'],
      default: 'other',
    },
    size: {
      type: Number,
      required: [true, 'Please add a file size'],
    },
    mimeType: {
      type: String,
      required: [true, 'Please add a MIME type'],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('File', FileSchema);