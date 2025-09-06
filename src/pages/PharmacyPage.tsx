import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Filter, Star, Plus, Minus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import medicineSvg from '../assets/images/medicine.svg';

interface MedicineItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  prescription: boolean;
}

const PharmacyPage: React.FC = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<{item: MedicineItem, quantity: number}[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample medicine data
  const medicines: MedicineItem[] = [
    {
      id: 1,
      name: 'Paracetamol',
      description: 'Pain reliever and fever reducer',
      price: 5.99,
      image: medicineSvg,
      category: 'pain-relief',
      rating: 4.5,
      inStock: true,
      prescription: false
    },
    {
      id: 2,
      name: 'Amoxicillin',
      description: 'Antibiotic used to treat bacterial infections',
      price: 12.99,
      image: medicineSvg,
      category: 'antibiotics',
      rating: 4.2,
      inStock: true,
      prescription: true
    },
    {
      id: 3,
      name: 'Vitamin D3',
      description: 'Supports bone health and immune function',
      price: 8.49,
      image: medicineSvg,
      category: 'vitamins',
      rating: 4.8,
      inStock: true,
      prescription: false
    },
    {
      id: 4,
      name: 'Ibuprofen',
      description: 'Anti-inflammatory pain reliever',
      price: 6.99,
      image: medicineSvg,
      category: 'pain-relief',
      rating: 4.3,
      inStock: true,
      prescription: false
    },
    {
      id: 5,
      name: 'Loratadine',
      description: 'Antihistamine for allergy relief',
      price: 9.99,
      image: medicineSvg,
      category: 'allergy',
      rating: 4.1,
      inStock: true,
      prescription: false
    },
    {
      id: 6,
      name: 'Omeprazole',
      description: 'Reduces stomach acid production',
      price: 14.99,
      image: medicineSvg,
      category: 'digestive',
      rating: 4.6,
      inStock: false,
      prescription: true
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'pain-relief', name: 'Pain Relief' },
    { id: 'antibiotics', name: 'Antibiotics' },
    { id: 'vitamins', name: 'Vitamins & Supplements' },
    { id: 'allergy', name: 'Allergy' },
    { id: 'digestive', name: 'Digestive Health' },
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         medicine.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || medicine.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine: MedicineItem) => {
    const existingItem = cartItems.find(item => item.item.id === medicine.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.item.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCartItems([...cartItems, { item: medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId: number) => {
    const existingItem = cartItems.find(item => item.item.id === medicineId);
    if (existingItem && existingItem.quantity > 1) {
      setCartItems(cartItems.map(item => 
        item.item.id === medicineId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    } else {
      setCartItems(cartItems.filter(item => item.item.id !== medicineId));
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.item.price * item.quantity), 0).toFixed(2);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="w-24 h-24 mb-4">
            <img src={medicineSvg} alt="Pharmacy" className="w-full h-full" />
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Online Pharmacy
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Order medications and health products with convenient delivery
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-3/4">
            {/* Search and filter */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className={`relative flex-grow ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border focus:ring-2 focus:outline-none ${isDark 
                    ? 'bg-gray-800 border-gray-700 focus:ring-blue-500 text-white' 
                    : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900'}`}
                  placeholder="Search medications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <button 
                  className={`flex items-center gap-2 py-2.5 px-4 rounded-lg ${isDark 
                    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                    : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'}`}
                >
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === category.id 
                      ? isDark 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                      : isDark 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products grid */}
            {filteredMedicines.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredMedicines.map(medicine => (
                  <motion.div 
                    key={medicine.id}
                    variants={itemVariants}
                    className={`rounded-xl overflow-hidden border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="relative">
                      <img 
                        src={medicine.image} 
                        alt={medicine.name} 
                        className="w-full h-48 object-cover"
                      />
                      {medicine.prescription && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Prescription Required
                        </div>
                      )}
                      {!medicine.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white font-medium text-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className={`ml-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{medicine.rating}</span>
                        </div>
                      </div>
                      <h3 className={`font-semibold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{medicine.name}</h3>
                      <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{medicine.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>${medicine.price.toFixed(2)}</span>
                        <button
                          onClick={() => medicine.inStock && addToCart(medicine)}
                          disabled={!medicine.inStock || medicine.prescription}
                          className={`px-3 py-1.5 rounded-lg text-white ${medicine.inStock && !medicine.prescription 
                            ? isDark 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                          {medicine.prescription ? 'Need Prescription' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="text-xl">No products found matching your search.</p>
              </div>
            )}
          </div>

          {/* Cart sidebar */}
          <div className="lg:w-1/4">
            <div className={`sticky top-24 rounded-xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Your Cart</h2>
                <div className="flex items-center">
                  <ShoppingCart className={`h-5 w-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                  <span className={`ml-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{getTotalItems()}</span>
                </div>
              </div>

              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {cartItems.map(({item, quantity}) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                      >
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <div className="ml-3">
                            <h4 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.name}</h4>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{quantity}</span>
                          <button 
                            onClick={() => addToCart(item)}
                            className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`border-t pt-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex justify-between mb-2">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>${getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Delivery</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>$5.00</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Total</span>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${(parseFloat(getTotalPrice()) + 5).toFixed(2)}
                      </span>
                    </div>
                    <button 
                      className={`w-full py-2.5 rounded-lg text-white font-medium ${isDark 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Your cart is empty</p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Add items to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;