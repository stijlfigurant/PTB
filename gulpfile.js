'use strict';
//This is a sample gulp file that can be used.
//npm install --save gulp gulp-zip gulp-awslambda
const gulp   = require('gulp');
const zip    = require('gulp-zip');
const path   = require('path');
const lambda = require('gulp-awslambda');
const aws_lambda_node_canvas = require('./');

let runtime = 'nodejs4.3' // nodejs or nodejs4.3

const lambda_params  = {
    FunctionName: 'NodeCanvas', /* Lambda function name */
    Description: 'Node canvas function in aws lambda', //Description for your lambda function
    Handler: 'main.lambda_handler', //Assuming you will provide main.py file with a function called handler.
    MemorySize: 128,
    Runtime: runtime,
    Role : 'arn:aws:iam::044011827821:role/lambda_basic_execution',//eg:'arn:aws:iam::[Account]:role/lambda_basic_execution'
    Timeout: 50
};

var opts = {
    region : 'ap-southeast-2'
}

gulp.task('default', () => {
    return gulp.src(['main.js', '!node_modules/**/*','!dist/**/*','!node_modules/aws-lambda-node-canvas/**/*']) //Your src files to bundle into aws lambda
        .pipe(aws_lambda_node_canvas({runtime : runtime})) //Adds all the required files needed to run node-canvas in aws lambda
        .pipe(zip('archive.zip'))
        .pipe(lambda(lambda_params, opts))
        .pipe(gulp.dest('dist')); //Also place the uploaded file
});