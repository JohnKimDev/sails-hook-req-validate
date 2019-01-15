/*
* StringController
* Check if string validator works
*/

module.exports = function(req, res, next){

  var param = req.validate({name: 'string'});
  if(param) return res.ok(param);

};
