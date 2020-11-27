
 const errorModel = function(result,msg){
  return {
    code:-1,
    result,
    msg:msg || 'error'
  }

} 

 const successModel = function(result,msg){
  return {
    code:200,
    result,
    msg: msg|| 'ok',
  }
}

module.exports = {
  errorModel,
  successModel
}