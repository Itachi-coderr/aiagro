import React from 'react';

const crops = [
  {
    name: 'Tomato',
    weather: 'Warm weather, 70-85°F',
    benefits: 'Rich in Vitamin C, potassium, and antioxidants. Promotes heart health and boosts immunity.',
    description: 'Tomatoes thrive in warm climates and require ample sunlight. They can be used in a variety of dishes like salads, sauces, and soups. Their high antioxidant content helps fight inflammation.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_RpV_Nq_aND67ekZG9sOso6gv4AQatx2sw&s',
  },
  {
    name: 'Carrot',
    weather: 'Cool weather, 60-70°F',
    benefits: 'High in beta-carotene, great for eye health and immunity. Contains antioxidants that protect the skin.',
    description: 'Carrots do well in cooler temperatures and are typically sown in early spring or late summer. They are versatile root vegetables that can be eaten raw, cooked, or juiced.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOXjQ0bvHeHE5noR5ZqexEDbkq5QxORe9qAg&s',
  },
  {
    name: 'Lettuce',
    weather: 'Cool weather, 60-65°F',
    benefits: 'Low-calorie leafy green packed with vitamins A and K. Helps in hydration and maintaining bone health.',
    description: 'Lettuce prefers cooler climates and can be grown in both spring and fall. It’s an essential ingredient in salads and sandwiches, offering a crisp texture and numerous health benefits.',
    image: 'https://www.bhg.com/thmb/Xy272oKSPzsYoQzQE1uzA6r6e8Y=/1878x0/filters:no_upscale():strip_icc()/tango-oakleaf-lettuce-c6f6417e-b835c4813e1d4cbf9d11ddf09fbd2ea6.jpg',
  },
  {
    name: 'Apple',
    weather: 'Moderate climate, 60-70°F',
    benefits: 'Rich in fiber, promotes digestion, and helps regulate blood sugar. High in vitamin C.',
    description: 'Apple trees grow best in moderate climates with cold winters. Apples are perfect for eating raw, in desserts, or making juice and cider.',
    image: 'https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg',
  },
  {
    name: 'Banana',
    weather: 'Tropical climate, 75-85°F',
    benefits: 'High in potassium, helps maintain blood pressure and heart function. Good for digestion.',
    description: 'Bananas flourish in hot, humid climates. They are a staple fruit in tropical regions and are widely used in snacks, smoothies, and desserts.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAiE9BZy3SyV4Xb83a3V-e8Ywq6z1bVZlGsA&s',
  },
  {
    name: 'Strawberry',
    weather: 'Mild, cool climate, 60-80°F',
    benefits: 'Packed with antioxidants, supports immune health, and fights inflammation. Rich in fiber.',
    description: 'Strawberries prefer a mild, cool climate. They are commonly used in jams, desserts, and smoothies, offering a sweet taste with numerous health benefits.',
    image: 'https://thumbs.dreamstime.com/b/three-strawberries-strawberry-leaf-white-background-114284301.jpg',
  },
  {
    name: 'Spinach',
    weather: 'Cool weather, 50-60°F',
    benefits: 'Rich in iron, boosts energy and muscle strength. Contains antioxidants that support heart health.',
    description: 'Spinach grows best in cooler climates and can be planted in spring and fall. It’s a highly nutritious leafy green, used in salads, smoothies, and a variety of cooked dishes.',
    image: 'https://cdn.britannica.com/30/82530-050-79911DD4/Spinach-leaves-vitamins-source-person.jpg',
  },
  {
    name: 'Corn',
    weather: 'Warm weather, 60-90°F',
    benefits: 'Source of fiber, B vitamins, and antioxidants for overall health. Aids in digestion and boosts energy.',
    description: 'Corn grows well in warm conditions and needs plenty of sunlight. It is used in a wide range of dishes, including salads, soups, and as a snack (popcorn).',
    image: 'https://cdn.britannica.com/36/167236-050-BF90337E/Ears-corn.jpg',
  },
  {
    name: 'Potato',
    weather: 'Cool weather, 60-70°F',
    benefits: 'High in potassium and Vitamin C, supports immune and heart health. Provides energy and improves digestion.',
    description: 'Potatoes thrive in cool climates and are easy to grow. They are versatile and can be mashed, baked, fried, or added to stews.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7t2YvyHFQgaI_hiHdCsZ1RNUvQnMVrpfRA&s',
  },
];

const WeatherAdvice = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500 p-6">
      <h1 className="text-4xl font-bold text-center text-black mb-8">Weather-Based Crop Advice</h1>
      <p className="text-center text-lg text-black mb-12">
        Find the best crops suited for your weather and enjoy fresh produce with maximum benefits.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {crops.map((crop, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4 transform transition duration-500 hover:scale-105">
            <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-black mb-2">{crop.name}</h2>
              <p className="text-sm text-gray-600 mb-1"><strong>Optimal Weather:</strong> {crop.weather}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Benefits:</strong> {crop.benefits}</p>
              <p className="text-sm text-gray-600"><strong>Description:</strong> {crop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAdvice;
