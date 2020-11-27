let query = require('../config/db').query


export const createdTodo = (title,content) => {
  let sql = `
    INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)
  `
} 