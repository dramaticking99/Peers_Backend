const express = require('express');
const body_parser = require('body-parser')
const userRouter = require('./Router/userRouter');
const postRouter = require('./Router/postRouter');

const app = express();

app.use(body_parser.json());

app.use('/users',userRouter);
app.use('/posts',postRouter);

module.exports = app;

