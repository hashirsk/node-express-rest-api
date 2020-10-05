const express = require('express');
const app = express()
const fileToDownload = express.Router();
const fileToDownloadController = require('../controllers/filedownload.controller')
//registerlink for download
fileToDownload.route('/file/:userid/:ext/:filename').get(fileToDownloadController.downloadFile)

module.exports = fileToDownload;