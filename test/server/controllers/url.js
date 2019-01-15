/*
* UrlController
* Check if url validator works
*/

module.exports = function(req, res){

  var url = req.validate({url: 'url'});
  if(url) return res.ok(url);

};
