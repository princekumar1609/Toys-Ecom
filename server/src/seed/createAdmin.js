const path = require('path');
const dotenv = require('dotenv');

// Ensure .env is loaded regardless of the directory from which the script is executed
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const createOrResetAdmin = async () => {
  try {
    console.log('[Create Admin] Connecting to database...');
    await connectDB();

    const adminEmail = 'admin@toysecom.com';
    const adminPassword = 'admin123456';

    let user = await User.findOne({ email: adminEmail }).select('+password');

    if (user) {
      console.log(`[Create Admin] Found existing account for ${adminEmail}. Resetting credentials...`);
      user.name = 'Toys Ecom Administrator';
      user.password = adminPassword;
      user.role = 'ADMIN';
      user.status = 'ACTIVE';
      await user.save();
      console.log('✅ Admin user updated successfully!');
    } else {
      console.log(`[Create Admin] Creating new administrator account for ${adminEmail}...`);
      await User.create({
        name: 'Toys Ecom Administrator',
        email: adminEmail,
        password: adminPassword,
        phone: '+91 1800 869 6378',
        role: 'ADMIN',
        status: 'ACTIVE',
        addresses: [
          {
            label: 'Headquarters',
            fullName: 'Toys Ecom Retail Pvt Ltd',
            phone: '+91 1800 869 6378',
            street: 'MG Road',
            city: 'Bengaluru',
            state: 'Karnataka',
            postalCode: '560001',
            country: 'India',
            isDefault: true
          }
        ]
      });
      console.log('✅ Admin user created successfully!');
    }

    console.log('--------------------------------------------------');
    console.log('Admin Email   : admin@toysecom.com');
    console.log('Admin Password: admin123456');
    console.log('Admin Role    : ADMIN');
    console.log('--------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating/resetting admin user:', error.message);
    process.exit(1);
  }
};

createOrResetAdmin();
