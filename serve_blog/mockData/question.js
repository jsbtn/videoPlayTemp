const Mock = require('mockjs');
var Random = Mock.Random

var questions = {
  "questionaireInfo": {
    "study_plan_id": "bmreibnrb",
    "study_plan_content_id": "fgvjweoigvjoigvj",
    "questionnaire_code": "问卷编码  abc",
    "title": "问卷标题",
    "intro": "简介++++++ 假如我写了很多话",
    "remarks": "备注",
    "success_tips": "用户提交成功的提示语",
    "wx_share_title": "微信分享标题",
    "wx_share_pic": "微信分享图片",
    "wx_share_intro": "微信分享简介",
    "status": 2,//状态 1：草稿 2:收集中 3已暂停 4已结束 5用户已完成 6问卷已删除 7中途退出
    "err_msg": "status=3|status=5|status=6|status=7的提示语",
    "begin_time": "2020-12-34 12:12:12", //当前时间 Y-m-d H:i:s
    "is_open_share": 1 //是否开启分享 1.开启 2.关闭  
  },
  "componentList": [
    { //单选文字
      "componentInfo": {
        "component_id": "abc",
        "component_type": 1, //单选
        "style_type": "1", //样式风格 1：单列 2:双列 3:三列
        "is_must_answer": 1, //1:必填 2:非必填
        "compontent_sort": 1,//组件排序 
        "title": "问题名称 标题"
      },
      "optionList": [
        {
          "option_id": "abc",
          "option_name": "选项名称1",
          "option_sort": 1, //选项排序 1 ,2 ,3,4,5 对应 option_index
          "show_type": 1, //展示形式 1：正常选项 2：可文本输入 该字段为2时 option_name为其他 前端写死即可 3.图片选项
          "option_index": "A",// A B C D 选项号
          "option_img_url": "www.baidu.com/123.jpg", //有图片
          "is_select": 0 // 用户是否选择 1 是 0 否
        },
        {
          "option_id": "1",
          "option_name": "选项名称2",
          "option_sort": 1, //选项排序 1 ,2 ,3,4,5 对应 option_index
          "show_type": 3, //展示形式 1：正常选项 2：可文本输入 该字段为2时 option_name为其他 前端写死即可 3.图片选项
          "option_index": "B",// A B C D 选项号
          "option_img_url": "", //无图片
          "is_select": 0 // 用户是否选择 1 是 0 否
        },
        {
          'inputText': '', // 缺
          "option_id": "2",
          "option_name": "选项名称3",
          "option_sort": 1, //选项排序 1 ,2 ,3,4,5 对应 option_index
          "show_type": 2, //展示形式 1：正常选项 2：可文本输入 该字段为2时 option_name为其他 前端写死即可 3.图片选项
          "option_index": "B",// A B C D 选项号
          "option_img_url": "", //无图片
          "is_select": 0 // 用户是否选择 1 是 0 否
        },
      ]
    },
    {
      "componentInfo": {
        "component_id": "33",
        "component_type": 2, // 多选
        "style_type": 1, //样式风格 1：单列 2:双列 3:三列
        "is_must_answer": 1, //必填是否
        "compontent_sort": 2,
        "title": "问题名称2",
        "low_select_limit": 1,//1 最少选几个  0为不限制
        "high_select_limit": 2 // "2 最多选几个 0为不限制"
      },
      "optionList": [
        {
          "option_id": "444",
          "option_name": "选项名称1",
          "option_sort": 1, //选项排序 1 ,2 ,3,4,5 对应 option_index
          "show_type": 1, //展示形式 1：正常选项 2：可文本输入 该字段为2时 option_name为其他 前端写死即可 3.图片选项
          "option_index": "A",// A B C D 选项号
          "option_img_url": "www.baidu.com/123.jpg", //有图片
          "is_select": 0 // 用户是否选择 1 是 0 否
        },
        {
          "option_id": "555",
          "option_name": "选项名称2",
          "option_sort": 1, //选项排序 1 ,2 ,3,4,5 对应 option_index
          "show_type": 3, //展示形式 1：正常选项 2：可文本输入 该字段为2时 option_name为其他 前端写死即可 3.图片选项
          "option_index": "B",// A B C D 选项号
          "option_img_url": "", //无图片
          "is_select": 0 // 用户是否选择 1 是 0 否
        },
        {
          'inputText': '', // 缺
          "option_id": "6666",
          "option_name": "选项名称3",
          "option_sort": 1, //选项排序 1 ,2 ,3,4,5 对应 option_index
          "show_type": 2, //展示形式 1：正常选项 2：可文本输入 该字段为2时 option_name为其他 前端写死即可 3.图片选项
          "option_index": "B",// A B C D 选项号
          "option_img_url": "", //无图片
          "is_select": 0 // 用户是否选择 1 是 0 否
        }
      ]
    },
    { //文本
      "componentInfo": {
        "component_id": "abc",
        "component_type": 3, // 填空
        "is_must_answer": 1,
        "compontent_sort": "组件排序 3",
        "size_style": 2, // 布局 1小 2中 3大
        "title": "填空题标题",
        "ready_fill": "" // 用户已填写内容 
      }
    },
    { // 评分
      "componentInfo": {
        "component_id": "111",
        "component_type": 4, // 评分
        "is_must_answer": 2,
        "compontent_sort": 4,
        "title": "题目标题"
      },
      "optionList": [
        {
          "option_id": "222",
          "option_name": "选项名称",
          "option_sort": "选项排序 1 ,2 ,3,4,5 对应 option_index",
          "option_index": "A B C D 选项号",
          "score": "分值",
          "is_select": 1
        },
        {
          "option_id": "333",
          "option_name": "选项名称",
          "option_sort": "选项排序 1 ,2 ,3,4,5 对应 option_index",
          "option_index": "A B C D 选项号",
          "score": "分值",
          "is_select": 1
        },
        {
          "option_id": "444",
          "option_name": "选项名称",
          "option_sort": "选项排序 1 ,2 ,3,4,5 对应 option_index",
          "option_index": "A B C D 选项号",
          "score": "分值",
          "is_select": 1
        },
        {
          "option_id": "555",
          "option_name": "选项名称",
          "option_sort": "选项排序 1 ,2 ,3,4,5 对应 option_index",
          "option_index": "A B C D 选项号",
          "score": "分值",
          "is_select": 1
        },
        {
          "option_id": "666",
          "option_name": "选项名称",
          "option_sort": "选项排序 1 ,2 ,3,4,5 对应 option_index",
          "option_index": "A B C D 选项号",
          "score": "分值",
          "is_select": 0
        },
      ]
    }
  ],
  "answer_list": [
    {
      "component_id": "abc",
      "component_type": 1,
      "option_id": "1",
      "show_type": 3,
      "option_img_url": ""
    },
    {
      "component_id": "33",
      "component_type": 2,
      "optionList": [
        {
          "option_id": "444",
          "show_type": 1
        },
        {
          "option_id": "555",
          "show_type": 3,
          "option_img_url": ""
        }
      ]
    },
    {
      "component_id": "abc",
      "component_type": 3,
      "fill_content": "111111"
    },
    {
      "component_id": "111",
      "component_type": 4,
      "option_id": "444"
    }
  ]
}

const subQuestions = {
  "is_redirect_share": 1 //是否跳转分享页 1:是 2:否
}

module.exports = {
  questions,
  subQuestions
}