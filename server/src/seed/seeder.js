const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');
const ContactMessage = require('../models/ContactMessage');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing database collections...');
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await ContactMessage.deleteMany();

    console.log('Creating initial Admin Account...');
    const adminUser = await User.create({
      name: 'Toys Ecom Administrator',
      email: 'admin@toysecom.com',
      password: 'admin123456',
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

    console.log('Creating default Categories...');
    const categories = await Category.insertMany([
      { name: 'Action Figures', slug: 'action-figures', description: 'Superhero & adventure action figures', imageUrl: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&auto=format&fit=crop&q=80', displayOrder: 1 },
      { name: 'Building Sets', slug: 'building-sets', description: 'Lego bricks & architectural block sets', imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80', displayOrder: 2 },
      { name: 'Educational Puzzles', slug: 'educational-puzzles', description: 'Brain teasers, wooden maps & STEM puzzles', imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80', displayOrder: 3 },
      { name: 'Dolls & Plushies', slug: 'dolls-plushies', description: 'Soft teddy bears, plush animals & dolls', imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop&q=80', displayOrder: 4 },
      { name: 'Vehicles & RC', slug: 'vehicles-rc', description: 'Remote control cars, diecast models & tracks', imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80', displayOrder: 5 },
    ]);

    console.log('Creating sample Toy Products...');
    await Product.insertMany([
      {
        name: 'Galactic Mech Warrior Action Figure',
        slug: 'galactic-mech-warrior-action-figure',
        sku: 'TN-1001',
        category: categories[0]._id,
        brand: 'StarToys',
        price: 1999,
        discountPrice: 1699,
        stock: 35,
        minStockAlert: 5,
        ageGroup: '6-8 Years',
        description: 'Poseable 12-inch robot action figure with light-up laser core and sound effects.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&auto=format&fit=crop&q=80'],
        isFeatured: true,
        isBestSeller: true,
        isNewArrival: true,
        status: 'ACTIVE'
      },
      {
        name: 'Architectural City Brick Fortress Set',
        slug: 'architectural-city-brick-fortress-set',
        sku: 'TN-1002',
        category: categories[1]._id,
        brand: 'BlockCraft',
        price: 3499,
        discountPrice: 2999,
        stock: 20,
        minStockAlert: 5,
        ageGroup: '9-12 Years',
        description: '850-piece STEM building set with working drawbridge and mini knight figures.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80'],
        isFeatured: true,
        isBestSeller: false,
        isNewArrival: true,
        status: 'ACTIVE'
      },
      {
        name: 'Wooden Solar System 3D Map Puzzle',
        slug: 'wooden-solar-system-3d-map-puzzle',
        sku: 'TN-1003',
        category: categories[2]._id,
        brand: 'EcoPlay',
        price: 1299,
        discountPrice: 999,
        stock: 45,
        minStockAlert: 10,
        ageGroup: '3-5 Years',
        description: 'Non-toxic organic wooden planetary puzzle designed for early cognitive astronomy discovery.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80'],
        isFeatured: false,
        isBestSeller: true,
        isNewArrival: false,
        status: 'ACTIVE'
      },
      {
        name: 'Fluffy Soft Teddy Bear Plushie',
        slug: 'fluffy-soft-teddy-bear-plushie',
        sku: 'TN-1004',
        category: categories[3]._id,
        brand: 'HuggyNest',
        price: 899,
        discountPrice: 699,
        stock: 50,
        minStockAlert: 10,
        ageGroup: '0-2 Years',
        description: 'Ultra-soft hypoallergenic plush teddy bear suitable for infants and toddlers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop&q=80'],
        isFeatured: true,
        isBestSeller: false,
        isNewArrival: false,
        status: 'ACTIVE'
      },
    ]);

    console.log('✨ Toys Ecom Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedData();
