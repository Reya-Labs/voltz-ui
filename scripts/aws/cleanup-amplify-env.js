const {
  S3Client,
  ListBucketsCommand,
  ListObjectsCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
// Set the AWS Region.
const REGION = 'eu-west-1';
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

const getAllBuckets = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log('Success', data.Buckets);
    return data.Buckets;
  } catch (err) {
    console.log('Error getAllBuckets', err);
    return [];
  }
};

const deleteBucket = async (name) => {
  try {
    const data = await s3Client.send(new DeleteBucketCommand({ Bucket: name }));
    console.log(`Success - bucket ${name} deleted`);
    return data;
  } catch (err) {
    console.log('Error deleteBucket', err);
  }
};

const emptyBucket = async (name) => {
  try {
    const data = await s3Client.send(new ListObjectsCommand({ Bucket: name }));
    let noOfObjects = data.Contents;
    for (let i = 0; i < noOfObjects.length; i++) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: name,
          Key: noOfObjects[i].Key,
        }),
      );
    }
    console.log(`Success. Objects deleted in  ${name}.`);
    return data;
  } catch (err) {
    console.log('Error emptyBucket', err);
  }
};

const run = async () => {
  const buckets = (await getAllBuckets())?.filter(
    (bucket) => bucket.Name?.indexOf('amplify-') !== -1,
  );
  for (const bucket of buckets) {
    await emptyBucket(bucket.Name);
    await deleteBucket(bucket.Name);
  }
};

void run();
