var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//email syntax validation
var emailValidator = [
		function(email) {
		    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		    return re.test(email);
		},
		//error message
		'Please enter a valid email address'
	];

var userSchema = new Schema({
    fullName: 	{	
    				type: 		String,
    				trim: 		true,
			    	required: 	'Please enter your real name'
			    },
    userName: 	{	
    				type: 		String,
    				trim: 		true,
			    	required: 	'Please enter a username',
			    	index: 		{
			    					unique: true
			    				}
			    },
    password: 	{	
    				type: 		String,
    				required: 	'Please enter a password'
        		},
    email: 		{	
    				type: 		String,
    				trim: 		true,
    				required: 	'Please enter an email address',
    				index: 		{
			    					unique: true
			    				},
        			validate: 	emailValidator
        		},
    teams: 		[{	
    				type: 		Schema.Types.ObjectId, 
    				ref: 		'Team'
    			}],
    picture: 	{
    				type: 		String,
    				trim: 		true
    			},
    createdOn: 	{
    				type: 		Date,
    				default: 	Date.now
    			}
});

module.exports = mongoose.model( 'User', userSchema );
