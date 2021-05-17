require('dotenv').config();
const fs = require('fs');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
// const {
//   bucketName,
//   region,
//   accessKey,
//   secretAccessKey,
// } = process.env;
const region = process.env.S3_BUCKET_REGION;
const bucketName = process.env.S3_BUCKET_NAME;
const accessKey = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_ACCESS_SECRET;

const client = new S3Client({
  region,
  accessKey,
  secretAccessKey,
});

async function downloadFile(fileName) {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: fileName });
  const signedURL = await getSignedUrl(client, command);
  
  return signedURL;
}

module.exports.downloadFile = downloadFile;