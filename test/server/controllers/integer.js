/*
* IntegerController
* Check if integer validator works
*/

module.exports = function(req, res, next){

  var param = req.validate({id: 'int'});
  if(param) return res.ok(param);

};
