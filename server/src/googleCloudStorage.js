
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { PROJECT_ID, BUCKET_NAME, KEYFILENAME } = process.env;

const storage = new Storage({
  projectId: PROJECT_ID,
  keyFilename: path.join(__dirname, '..', KEYFILENAME),
});

const bucket = storage.bucket(BUCKET_NAME);

module.exports = { storage, bucket };
