/*
* AlphaController
* Check if alpha validator works - charaters only
*/

module.exports = function(req, res){

  var alpha = req.validate({alpha: 'alpha'});
  if(alpha) return res.ok(alpha);

};
