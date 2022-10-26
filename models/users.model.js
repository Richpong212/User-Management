const {Schema, model} = require('mongoose');


 const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],  
      index: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      min: 6,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
        type:Number,
        required:[true, 'Please add a role'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image'],
    },
    isVerify:{
      type:Number,
      default:0
    },
    token:{
      type:String, 
      default: ''
    }
  },
  { timestamps: true }
)


module.exports = model('Users', UserSchema);