import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

console.log("Cargando mi modelo USER en MONGODB - MONGOOSE")

const userSchema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  passwordvalor:  { type: String, required: false },
  nombres:   { type: String, required: true },
  apellidos: { type: String, required: true },
  telefono:  { type: Number, required: true },
  role:      { type: String, enum: ['admin', 'user'], default: 'user' },

  active:    { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationExpires: { type: Date },
  verifiedAt: { type: Date },
  reset: { type: Boolean, default: false },
  resetToken: { type: String},
  resetTokenExpires: { type: Date},
  resetAt: { type: Date}
},
{
  timestamps  : true,
}
);

userSchema.pre('save', async function () {
  console.log("Grabando mi modelo USER en MONGODB - MONGOOSE", this.email, this.password, this.nombres, this.apellidos, this.telefono)
  //if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
  //next()
  console.log('Password: ', this.password)
  console.log('Password valor: ',this.passwordvalor)
});

const User = mongoose.model('User', userSchema);

export default User