const File = require('../models/File');
const ErrorResponse = require('../utils/errorResponse');
const fileUpload = require('../utils/fileUpload');

// @desc    Upload file
// @route   POST /api/files/upload
// @access  Private
exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    // Upload file to storage using the fileUpload utility
    const uploadResult = await fileUpload.uploadToStorage(req.file);
    
    const file = await File.create({
      name: req.file.originalname,
      type: req.body.type || 'general',
      url: uploadResult.url,
      size: req.file.size,
      uploadedBy: req.user.id,
      project: req.body.projectId || null,
      task: req.body.taskId || null,
      team: req.body.teamId || null,
    });

    res.status(201).json({
      success: true,
      data: file,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload multiple files
// @route   POST /api/files/upload-multiple
// @access  Private
exports.uploadMultipleFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(new ErrorResponse('Please upload at least one file', 400));
    }

    // Upload files to storage using the fileUpload utility
    const uploadResults = await fileUpload.uploadMultipleToStorage(req.files);
    const files = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const uploadResult = uploadResults[i];
      
      const newFile = await File.create({
        name: file.originalname,
        type: req.body.type || 'general',
        url: uploadResult.url,
        size: file.size,
        uploadedBy: req.user.id,
        project: req.body.projectId || null,
        task: req.body.taskId || null,
        team: req.body.teamId || null,
      });
      files.push(newFile);
    }

    res.status(201).json({
      success: true,
      count: files.length,
      data: files,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get files
// @route   GET /api/files
// @access  Private
exports.getFiles = async (req, res, next) => {
  try {
    let query = {};

    // Filter by project, task, or team if provided
    if (req.query.project) {
      query.project = req.query.project;
    }

    if (req.query.task) {
      query.task = req.query.task;
    }

    if (req.query.team) {
      query.team = req.query.team;
    }

    // Filter by type if provided
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Get files with pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await File.countDocuments(query);

    const files = await File.find(query)
      .populate({
        path: 'uploadedBy',
        select: 'name avatar',
      })
      .populate({
        path: 'project',
        select: 'name',
      })
      .populate({
        path: 'task',
        select: 'title',
      })
      .populate({
        path: 'team',
        select: 'name',
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: files.length,
      pagination,
      data: files,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete file
// @route   DELETE /api/files/:id
// @access  Private
exports.deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return next(
        new ErrorResponse(`File not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is file uploader or admin
    if (
      file.uploadedBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this file`,
          401
        )
      );
    }

    // Delete the file from storage
    await fileUpload.deleteFromStorage(file.url);
    await file.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};