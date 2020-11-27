const Mock = require('mockjs');
var Random = Mock.Random

var signList = {
  'signList|10': [
    {
      'liangxing|1-2': 1, // 是否亮星 
      "study_plan_id": "cvhnsivcdv",
      "study_plan_content_id": "vsjkvngskvn",
      "title": '签到' + Random.cparagraph(1),
      "status|1-4": 1, // 1:未开始 2进行中 3已结束 4:已签到
      "start_time": "2020-10-11",
      "end_time": "2020-10-11"
    }
  ]
}

var signInfo = {
  'signInfo': {
    'id|1-200': 1,
    'date': Random.date('yyyy-mm-dd'), // 随机的当前日期
    'today_is_sign|1-2': 1, // 当前是否签到
    'sign_explain': '签到提示' + Random.csentence(1, 3), // 随机生成签到提示
  }
}

var questionList = {
  "signInfo": {
    "study_plan_id": "viusvnhuv",
    "study_plan_content_id": "hvsiuevhiv",
    "title": '标题',
    "status": 2 //2默认为没签到
  },
  "questionList": [
    {
      "question": {
        'question_type':1,// 缺 1单选 2 多选
        "question_id": "fiwuefvwvbws",
        "question_content": "问题"+ Random.cparagraph(1),
        "create_time": "2020-10-21",
        "create_real_name": "1234",
      },
      "answerList": [
        {
          'answer_id|+1':1,
          "answer_content": "答案1",
          "option_type": "A",
          "option_sort": 1, // 第几个选项
          "is_true_answer": 2, // 是否为正确答案 1是 2不是
          "user_choose": 2 ,//1:已选择 2:未选择
        },
        {
          'answer_id|+1':1,
          "answer_content": "答案2",
          "option_type": "B",
          "option_sort": 2, // 第几个选项
          "is_true_answer": 1, // 是否为正确答案 1是 2不是
          "user_choose": 2 ,//1:已选择 2:未选择
        },
        {
          'answer_id|+1':1,
          "answer_content": "答案3",
          "option_type": "C",
          "option_sort": 3, // 第几个选项
          "is_true_answer": 2, // 是否为正确答案 1是 2不是
          "user_choose": 2 ,//1:已选择 2:未选择
        },
      ]
    },
    {
      "question": {
        'question_type':2,// 缺 1单选 2 多选
        "question_id": "fiwuefvwvbws",
        "question_content": "问题"+ Random.cparagraph(1),
        "create_time": "2020-10-21",
        "create_real_name": "1234"
      },
      "answerList": [
        {
          'answer_id|+1':1,
          "answer_content": "答案1",
          "option_type": "B",
          "option_sort": 1, // 第几个选项
          "is_true_answer": 2, // 是否为正确答案 1是 2不是
          "user_choose": 2 ,//1:已选择 2:未选择
        },
        {
          'answer_id|+1':1,
          "answer_content": "答案2",
          "option_type": "C",
          "option_sort": 2, // 第几个选项
          "is_true_answer": 1, // 是否为正确答案 1是 2不是
          "user_choose": 2 ,//1:已选择 2:未选择
        },
        {
          'answer_id|+1':1,
          "answer_content": "答案3",
          "option_type": "A",
          "option_sort": 3, // 第几个选项
          "is_true_answer": 2, // 是否为正确答案 1是 2不是
          "user_choose": 2 ,//1:已选择 2:未选择
        },
      ]
    },
  ]
}

var submitAnswer = {
  'signInfo': {
    "account_type": "1",
    "continuity_day_num": "10",
    "star_num": 10,
    "income_list": [
      {
        "income_type": "1",
        "income_amount": "20"
      },
      {
        "income_type": "1",
        "income_amount": "20"
      }
    ]
  }
}

module.exports = {
  signList,
  signInfo,
  submitAnswer,
  questionList
}