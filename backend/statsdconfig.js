export default {
    backends: [ "aws-cloudwatch-statsd-backend" ],
    cloudwatch: 
    {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
        region: process.env.AWS_REGION,
        namespace: 'CSYE_6225_Webapp'
    }
}