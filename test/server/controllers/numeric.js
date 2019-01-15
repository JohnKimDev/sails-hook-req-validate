/*
* NumericController
* Check if numeric validator works - numbers only
*/

module.exports = function(req, res){

  var numeric = req.validate({numeric: 'numeric'});
  if(numeric) return res.ok(numeric);

};
