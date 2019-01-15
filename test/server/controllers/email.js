/*
* EmailController
* Check if email validator works
*/

module.exports = {

  index: function(req, res){
    var email = req.validate({email: 'email'});
    if(email) return res.ok(email);
  },

  googleEmail: function(req, res){
    var googleEmail = req.validate({email: ['email', { converter: 'normalizeEmail'}]});
    if(googleEmail) return res.ok(googleEmail);
  }

};
