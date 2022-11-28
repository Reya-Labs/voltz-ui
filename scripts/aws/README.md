# Why?

Right now it seems that AWS Amplify is not deleting the S3 bucket objects after an 
environment has been deleted.

This causes too many buckets to be created and Amplify to not be able to create new environment!
The error we get is:

```You have attempted to create more buckets than allowed```

According to AWS S3 policy:

```By default, you can create up to 100 buckets in each of your AWS accounts. If you need additional buckets, you can increase your account bucket limit to a maximum of 1,000 buckets by submitting a service limit increase.```

# Running the script

Make sure to install `@aws-sdk/client-s3` globally.

```shell
yarn global add -DE @aws-sdk/client-s3 
```

Documentation: [link](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-environment.html)

Recommended way of setting the secrets is: [guide](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html)


```shell
    node ./scripts/aws/cleanup-amplify-env.js
```
