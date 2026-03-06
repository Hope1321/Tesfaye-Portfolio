import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

async function createAdmin() {
  try {
    const existing = await User.findOne({ email: 'admin@portfolio.com' });
    if (existing) {
      console.log('Admin user already exists');
      process.exit();
    }

    const adminUser = new User({
      email: 'admin@portfolio.com',
      password: 'admin123',
      isAdmin: true
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');
    console.log('Email: admin@portfolio.com');
    console.log('Password: admin123');
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
