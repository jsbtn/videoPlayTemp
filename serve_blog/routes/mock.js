var express = require('express');
var router = express.Router();
const Mock = require('mockjs');

const { errorModel , successModel } = require("../utils/resModel") 

// 签到数据模拟
var { signList, signInfo,questionList,submitAnswer } = require('../mockData/sign')
// 课程数据
var { classDetail,classList,classModels } = require('../mockData/class')
// 任务课程 
var { taskList,exampleList,userSubmitList,taskDetail,submitTask } = require('../mockData/task')
// 问卷
var { subQuestions , questions } = require('../mockData/question')

// 签到
// 获取签到列表
router.post('/api/sign/list', function(req, res, next) {
  const data = Mock.mock(signList)
  res.send(successModel(data));
});

// // 获取当天是否签到  没接口
router.post('/api/sign/signDetail', function(req, res, next) {
  const data = Mock.mock(signInfo)
  res.send(successModel(data));
});

// 获取某天签到题目详情
router.post('/api/Question/questionList', function(req, res, next) {
  const data = Mock.mock(questionList)
  res.send(successModel(data));
});

// 提交答案
router.post('/api/Question/submitAnswer', function(req, res, next) {
  const data = Mock.mock(submitAnswer)
  res.send(successModel(data));
});

// 课程专栏
// 课程详情
router.post('/api/class/classDetail', function(req, res, next) {
  const data = Mock.mock(classDetail)
  res.send(successModel(data));
});

// 2.课程--专栏内课程列表
router.post('/api/class/classList', function(req, res, next) {
  const data = Mock.mock(classList)
  res.send(successModel(data));
});

//3.课程--多专栏下单专栏列表
router.post('/api/class/classModels', function(req, res, next) {
  const data = Mock.mock(classModels)
  res.send(successModel(data));
});

//4.任务--任务列表
router.post('/api/task/taskList', function(req, res, next) {
  const data = Mock.mock(taskList)
  res.send(successModel(data));
});

//5.任务--任务示例
router.post('/api/task/exampleList', function(req, res, next) {
  const data = Mock.mock(exampleList)
  res.send(successModel(data));
});

//6.任务--用户提交的任务
router.post('/api/task/userSubmitList', function(req, res, next) {
  const data = Mock.mock(userSubmitList)
  res.send(successModel(data));
});

//7.任务--任务详情
router.post('/api/task/taskDetail', function(req, res, next) {
  const data = Mock.mock(taskDetail)
  res.send(successModel(data));
});

//任务 -- 提交任务
router.post('/api/task/submitTask', function(req, res, next) {
  const data = Mock.mock(submitTask)
  res.send(successModel(data));
});

// 问卷详情
router.post('/api/question/details', function(req, res, next) {
  const data = Mock.mock(questions)
  res.send(successModel(data));
});

// 提交问卷
router.post('/api/question/subQuestions', function(req, res, next) {
  const data = Mock.mock(subQuestions)
  res.send(successModel(data));
});

module.exports = router;
