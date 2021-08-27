import AWS from 'aws-sdk';

import errorGenerator from 'utils/error/error-generator';

interface IParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ACL: string;
  ContentType: string;
}

const s3Config = {
  bucket: process.env.AWS_BUCKET || '',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};

const s3 = new AWS.S3({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
});

const s3Upload = (params: IParams): Promise<string> =>
  new Promise((resolve, reject) => {
    s3.upload(params, {}, (err, data) => {
      if (err) {
        reject(
          errorGenerator({
            code: 's3/fail-to-upload',
            message: 'fail to upload to S3',
          }),
        );
      }
      resolve(data.Location);
    });
  });

export default s3Upload;
