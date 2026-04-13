const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Product = require('../models/Product');

const images = {
  'Samarreta True Facts Basic': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
  'Edició Limitada Estiu': 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
  'True Facts Vintage': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
  'Samarreta Gràfica': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
  'Col·lecció Urbana': 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80',
  'True Facts Premium': 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&w=800&q=80'
};

const updateProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const products = await Product.find();
        
        for (const product of products) {
            if (images[product.nom]) {
                product.imatge = images[product.nom];
                await product.save();
                console.log(`Updated ${product.nom}`);
            }
        }

        console.log('All products updated');
        process.exit(0);
    } catch (error) {
        console.error('Error updating products', error);
        process.exit(1);
    }
};

updateProducts();
