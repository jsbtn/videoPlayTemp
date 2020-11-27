const Mock = require('mockjs');
var Random = Mock.Random

var classDetail = {
  "courseDetails": {
    "course_id": "courselXJkPOxA2267",
    "audio_title": '标题' + Random.cparagraph(1),
    "audio_url": "https://zm-edu.oss-cn-beijing.aliyuncs.com/audio/ZMWH0CBB80737898A3C2FBE9238FA35013B2.mp4",
    "audio_length|120-133": 133,
    "course_details": "测试音视频简介111" + Random.cparagraph(2, 5),
    "type": 2,
    "create_time": "2019-10-24",
    "create_real_name": null,
    "play_num|100-200": 101,
    "format_audio_length": "02:13",
    "last_song_course_id": null,
    "next_song_course_id": "courselMF0PJEHr57O"
  }
}

var classList = {
  "specColumnInfo": {
    "spec_column_id": 10,
    "spec_column_title": '标题' + Random.cparagraph(1),
    "cover_img": 'https://www.zmedc.com/public/img/active2.png',
    "spec_column_count|3-10": 4,
    "type": 1
  },
  "courseList|10": [
    {
      "id|+1": 1,
      "spec_column_id": "courselXJkPOxA2267",
      "course_id": "courselXJkPOxA2267",
      "audio_title": '标题' + Random.cparagraph(1),
      "type|1-2": 1,
      "audio_url": 'https://pic.ibaotu.com/mp3Watermark_v3/19/55/30/d32c248751344cb976a9360642ea0a5e.mp3',
      "audio_length": '19:20'
    }
  ],
  "sign": {
    "page_size": 10,
    "page_num": 1
  }
}

var classModels = {
  "columnList|3-10": [
    {
      "spec_column_id": "speclXJkPOxA2267",
      "spec_column_title": '专栏标题' + Random.cparagraph(1),
      "spec_column_introduction": '简介' + Random.cparagraph(2),
      "spec_column_count": "2",
      "cover_img": 'https://www.zmedc.com/public/img/active2.png',
      "type|1-2": 2,
      "spec_column_actual_count": 2,
      "create_time": Random.date('yyyy-mm-dd'),
      "create_uuid": null,
      "create_real_name": ""
    }
  ],
  "sign": {
    "page_size": 10,
    "page_num": 1,
    "count": 80,
    "is_next_page|1":[false,true]
  }
}

module.exports = {
  classDetail,
  classList,
  classModels
}