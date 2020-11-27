const Mock = require('mockjs');
var Random = Mock.Random

module.exports = {
  taskList: {
    "taskList|3-10": [
      {
        "study_plan_id": "fuwefwefv",
        "study_plan_content_day_id": "hisvhbisbviev",
        "start_time": Random.date('yyyy-m-dd'),
        "end_time": Random.date('yyyy-m-dd'),
        "title": "开营前内容" + Random.cparagraph(1),
        "is_unlock|1": 1, //是否解锁
        "task|2-5": [
          {
            "study_plan_id": "fuwefwefv",
            "study_plan_content_day_task_id": "hisvhbisbviev",
            "task_id": "jfwiuefvhie",
            "task_category": 1,
            "task_img_url": "https://www.zmedc.com/public/img/active2.png",
            "task_content": '内容' + Random.cparagraph(2, 5),
            "task_content_analysis": '任务解析' + Random.cparagraph(1),
            "task_category_name": Random.cparagraph(1),
            "finish_status|1-2": 1,
            "is_have_example|1-2": 2, // 1有示例 2没示例
          }
        ]
      }
    ]
  },
  exampleList: {
    "example_list|4-10": [
      {
        "task_submit_id": "abc",
        "task_id": "ttasklra9xgvbrCSc",
        "study_plan_id": "123123",
        "study_plan_content_id": "3641652",
        "unionid": 123,
        "headimgurl": 'https://img.yzcdn.cn/vant/cat.jpeg',
        "nickname": 'cztest',
        "details": '用户提交内容' + Random.cparagraph(1),
        "pic_url|2-5": [
          'https://www.zmedc.com/public/img/active2.png',
        ]
      }
    ],
    "sign": {
      "page_size": 10,
      "page_num": 1,
      "count": 40,
      "is_next_page": false
    }
  },
  userSubmitList: {
    "taskInfo": {
      "study_plan_id": "fuwefwefv",
      "study_plan_content_id": "hisvhbisbviev",
      "start_time": "2020-10-10",
      "end_time": "2020-11-20",
      "title": "开营前内容"
    },
    "taskList|10": [
      {
        "study_plan_id|+1": 1,
        "study_plan_content_id|+1": 1,
        "task_submit_id|+1": 1,
        "task_id|+1": 1,
        "unionid": 3,
        "headimgurl": 'https://img.yzcdn.cn/vant/cat.jpeg',
        "nickname": 'cztest',
        "details": '发表内容：----' + Random.cparagraph(1),
        "is_essence|1-2": 1,
        "task_content": '任务内容：----' + Random.cparagraph(1),
        "comment_num": 0,
        "zan_num|11-200": 11,
        "is_zan|1-2": 2,
        "pic_url|2-5": [ //que
          'https://www.zmedc.com/public/img/active2.png',
        ],
        "finish_task_num": 0,
        "goods_id|+1": 1,
        "goods_name": '商品名' + Random.cparagraph(1),
        "create_time": "2020-10-10"
      },
    ],
    "sign": {
      "page_size": "10",
      "page_num": "1",
      "count": 80,
      "search_type": "hottest",
      "is_next_page": false
    }
  },
  taskDetail: {
    "headimgurl": 'https://img.yzcdn.cn/vant/cat.jpeg', //缺
    "pic_url|2-5": [ //缺
      'https://www.zmedc.com/public/img/active2.png',
    ],
    'goods_id|+1':1,//缺
    'goods_name|+1': Random.cparagraph(1),//缺
    'is_essence|1-2':1, // 缺
    'task_content':'任务说明'+Random.cparagraph(1),//缺
    "task_submit_id|+1": 1,
    "study_plan_id": "timeslo8r4rW5PSTp",
    "study_plan_content_id": "fhbusefbvus",
    "details": '任务内容：----' + Random.cparagraph(1),
    "submit_date": Random.date('yyyy-m-dd'),
    "zan_num|1-10": 10,
    "is_essence|1-2": 1,
    "create_time": "2020-05-20 11:03:11",
    "is_delete|1-2": 1,
    "comment_num|+1": 1,
    "is_zan|1-2": 1
  },
  // 提交任务
  submitTask:{
    'task_submit_id|1':200,
  }
}