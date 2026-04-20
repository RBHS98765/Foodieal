// Hyderabad Restaurant Mock Data - Updated with authentic details
export const HYDERABAD_RESTAURANTS = [
  {
    id: "paradise-biryani",
    slug: "paradise-biryani",
    name: "Paradise Biryani",
    location: "Hitech City",
    cuisine: ["Biryani", "Mughlai", "North Indian"],
    rating: 4.5,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=300&fit=crop",
    featured: true,
    menu: [
      {
        id: "pb-1",
        name: "Chicken Biryani",
        description: "World-famous Hyderabadi dum biryani with tender chicken pieces and aromatic basmati rice",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.8,
        prices: {
          swiggy: { base: 280, fee: 45, discount: 30 },
          zomato: { base: 265, fee: 35, discount: 40 },
          ubereats: { base: 295, fee: 55, discount: 20 }
        }
      },
      {
        id: "pb-2",
        name: "Mutton Biryani",
        description: "Premium mutton biryani slow-cooked in aromatic spices with saffron-infused rice",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.7,
        prices: {
          swiggy: { base: 380, fee: 45, discount: 40 },
          zomato: { base: 365, fee: 35, discount: 50 },
          ubereats: { base: 395, fee: 55, discount: 30 }
        }
      },
      {
        id: "pb-3",
        name: "Veg Biryani",
        description: "Aromatic vegetable biryani with garden-fresh vegetables and fragrant spices",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.3,
        prices: {
          swiggy: { base: 220, fee: 45, discount: 25 },
          zomato: { base: 210, fee: 35, discount: 30 },
          ubereats: { base: 235, fee: 55, discount: 20 }
        }
      },
      {
        id: "pb-4",
        name: "Chicken 65",
        description: "Spicy deep-fried chicken with South Indian spices and curry leaves",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.6,
        prices: {
          swiggy: { base: 240, fee: 45, discount: 30 },
          zomato: { base: 230, fee: 35, discount: 35 },
          ubereats: { base: 250, fee: 55, discount: 25 }
        }
      },
      {
        id: "pb-5",
        name: "Mirchi Ka Salan",
        description: "Authentic Hyderabadi curry with green chilies in peanut-sesame gravy",
        category: "Curries",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.4,
        prices: {
          swiggy: { base: 180, fee: 45, discount: 20 },
          zomato: { base: 170, fee: 35, discount: 25 },
          ubereats: { base: 190, fee: 55, discount: 15 }
        }
      }
    ]
  },
  {
    id: "shah-ghouse",
    slug: "shah-ghouse",
    name: "Shah Ghouse Café",
    location: "Tolichowki",
    cuisine: ["Biryani", "Kebabs", "Mughlai"],
    rating: 4.4,
    deliveryTime: "35-45 min",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    featured: true,
    menu: [
      {
        id: "sg-1",
        name: "Haleem",
        description: "Traditional slow-cooked Hyderabadi haleem with tender meat and wheat",
        category: "Specials",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.9,
        prices: {
          swiggy: { base: 180, fee: 40, discount: 20 },
          zomato: { base: 170, fee: 35, discount: 25 },
          ubereats: { base: 190, fee: 50, discount: 15 }
        }
      },
      {
        id: "sg-2",
        name: "Seekh Kebab",
        description: "Succulent minced meat kebabs grilled on charcoal",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.5,
        prices: {
          swiggy: { base: 220, fee: 40, discount: 25 },
          zomato: { base: 210, fee: 35, discount: 30 },
          ubereats: { base: 230, fee: 50, discount: 20 }
        }
      },
      {
        id: "sg-3",
        name: "Mutton Paya",
        description: "Rich and flavorful mutton trotters curry, a Hyderabadi specialty",
        category: "Curries",
        image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.6,
        prices: {
          swiggy: { base: 280, fee: 40, discount: 30 },
          zomato: { base: 270, fee: 35, discount: 35 },
          ubereats: { base: 290, fee: 50, discount: 25 }
        }
      }
    ]
  },
  {
    id: "bawarchi",
    slug: "bawarchi",
    name: "Bawarchi",
    location: "RTC Cross Roads",
    cuisine: ["Biryani", "North Indian"],
    rating: 4.3,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "bw-1",
        name: "Special Biryani",
        description: "Bawarchi's signature chicken biryani with secret spice blend",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.5,
        prices: {
          swiggy: { base: 250, fee: 40, discount: 30 },
          zomato: { base: 240, fee: 35, discount: 35 },
          ubereats: { base: 260, fee: 50, discount: 25 }
        }
      },
      {
        id: "bw-2",
        name: "Egg Biryani",
        description: "Flavorful biryani with boiled eggs and aromatic spices",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.2,
        prices: {
          swiggy: { base: 180, fee: 40, discount: 20 },
          zomato: { base: 170, fee: 35, discount: 25 },
          ubereats: { base: 190, fee: 50, discount: 15 }
        }
      }
    ]
  },
  {
    id: "pizza-hut",
    slug: "pizza-hut",
    name: "Pizza Hut",
    location: "Gachibowli",
    cuisine: ["Pizza", "Italian", "Fast Food"],
    rating: 4.2,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    featured: true,
    menu: [
      {
        id: "ph-1",
        name: "Margherita Pizza",
        description: "Classic cheese pizza with fresh basil and tangy tomato sauce",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.0,
        prices: {
          swiggy: { base: 199, fee: 35, discount: 50 },
          zomato: { base: 189, fee: 30, discount: 60 },
          ubereats: { base: 209, fee: 45, discount: 40 }
        }
      },
      {
        id: "ph-2",
        name: "Pepperoni Feast",
        description: "Loaded with spicy pepperoni and extra mozzarella cheese",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.4,
        prices: {
          swiggy: { base: 349, fee: 35, discount: 60 },
          zomato: { base: 339, fee: 30, discount: 70 },
          ubereats: { base: 359, fee: 45, discount: 50 }
        }
      },
      {
        id: "ph-3",
        name: "Veggie Supreme",
        description: "Loaded with garden fresh vegetables and Italian herbs",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.2,
        prices: {
          swiggy: { base: 299, fee: 35, discount: 40 },
          zomato: { base: 289, fee: 30, discount: 50 },
          ubereats: { base: 309, fee: 45, discount: 30 }
        }
      },
      {
        id: "ph-4",
        name: "Chicken Tikka Pizza",
        description: "Tandoori chicken tikka with onions and capsicum on cheesy base",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.5,
        prices: {
          swiggy: { base: 379, fee: 35, discount: 50 },
          zomato: { base: 369, fee: 30, discount: 60 },
          ubereats: { base: 389, fee: 45, discount: 40 }
        }
      }
    ]
  },
  {
    id: "burger-king",
    slug: "burger-king",
    name: "Burger King",
    location: "Banjara Hills",
    cuisine: ["Burgers", "Fast Food", "American"],
    rating: 4.1,
    deliveryTime: "15-25 min",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "bk-1",
        name: "Whopper",
        description: "Flame-grilled beef patty with fresh vegetables and signature sauce",
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.3,
        prices: {
          swiggy: { base: 209, fee: 30, discount: 30 },
          zomato: { base: 199, fee: 25, discount: 35 },
          ubereats: { base: 219, fee: 40, discount: 25 }
        }
      },
      {
        id: "bk-2",
        name: "Crispy Veg",
        description: "Crispy vegetable patty with lettuce, tomato and mayo",
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.0,
        prices: {
          swiggy: { base: 129, fee: 30, discount: 15 },
          zomato: { base: 119, fee: 25, discount: 20 },
          ubereats: { base: 139, fee: 40, discount: 10 }
        }
      },
      {
        id: "bk-3",
        name: "Chicken Royale",
        description: "Premium chicken patty with creamy mayo and fresh lettuce",
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.2,
        prices: {
          swiggy: { base: 189, fee: 30, discount: 25 },
          zomato: { base: 179, fee: 25, discount: 30 },
          ubereats: { base: 199, fee: 40, discount: 20 }
        }
      }
    ]
  },
  {
    id: "chutneys",
    slug: "chutneys",
    name: "Chutneys",
    location: "Jubilee Hills",
    cuisine: ["South Indian", "Breakfast", "Dosa"],
    rating: 4.6,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    featured: true,
    menu: [
      {
        id: "ch-1",
        name: "Masala Dosa",
        description: "Crispy golden dosa with spiced potato filling and chutneys",
        category: "Dosa",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&h=200&fit=crop",
        isVeg: true,
        bestseller: true,
        rating: 4.7,
        prices: {
          swiggy: { base: 120, fee: 35, discount: 15 },
          zomato: { base: 110, fee: 30, discount: 20 },
          ubereats: { base: 130, fee: 45, discount: 10 }
        }
      },
      {
        id: "ch-2",
        name: "Ghee Pongal",
        description: "Traditional rice and lentil dish with generous ghee and cashews",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.5,
        prices: {
          swiggy: { base: 140, fee: 35, discount: 20 },
          zomato: { base: 130, fee: 30, discount: 25 },
          ubereats: { base: 150, fee: 45, discount: 15 }
        }
      },
      {
        id: "ch-3",
        name: "Idli Sambar",
        description: "Soft steamed idlis with flavorful sambar and coconut chutney",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.4,
        prices: {
          swiggy: { base: 90, fee: 35, discount: 10 },
          zomato: { base: 85, fee: 30, discount: 15 },
          ubereats: { base: 95, fee: 45, discount: 8 }
        }
      },
      {
        id: "ch-4",
        name: "Paper Roast",
        description: "Extra crispy paper-thin dosa served with variety of chutneys",
        category: "Dosa",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.6,
        prices: {
          swiggy: { base: 150, fee: 35, discount: 20 },
          zomato: { base: 140, fee: 30, discount: 25 },
          ubereats: { base: 160, fee: 45, discount: 15 }
        }
      }
    ]
  },
  {
    id: "absolute-barbecues",
    slug: "absolute-barbecues",
    name: "Absolute Barbecues",
    location: "Madhapur",
    cuisine: ["BBQ", "Grills", "Continental"],
    rating: 4.5,
    deliveryTime: "35-45 min",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    featured: true,
    menu: [
      {
        id: "ab-1",
        name: "BBQ Chicken Wings",
        description: "Smoky barbecued chicken wings with honey glaze",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.7,
        prices: {
          swiggy: { base: 320, fee: 45, discount: 40 },
          zomato: { base: 310, fee: 40, discount: 50 },
          ubereats: { base: 330, fee: 55, discount: 35 }
        }
      },
      {
        id: "ab-2",
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled to perfection",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.4,
        prices: {
          swiggy: { base: 280, fee: 45, discount: 35 },
          zomato: { base: 270, fee: 40, discount: 40 },
          ubereats: { base: 290, fee: 55, discount: 30 }
        }
      },
      {
        id: "ab-3",
        name: "Grilled Fish",
        description: "Fresh fish fillet with herbs and lemon butter sauce",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.6,
        prices: {
          swiggy: { base: 450, fee: 45, discount: 60 },
          zomato: { base: 440, fee: 40, discount: 70 },
          ubereats: { base: 460, fee: 55, discount: 50 }
        }
      }
    ]
  },
  {
    id: "mainland-china",
    slug: "mainland-china",
    name: "Mainland China",
    location: "Hitech City",
    cuisine: ["Chinese", "Asian", "Dim Sum"],
    rating: 4.4,
    deliveryTime: "35-45 min",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
    featured: true,
    menu: [
      {
        id: "mc-1",
        name: "Hakka Noodles",
        description: "Wok-tossed noodles with vegetables and signature sauces",
        category: "Noodles",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.3,
        prices: {
          swiggy: { base: 220, fee: 40, discount: 30 },
          zomato: { base: 210, fee: 35, discount: 35 },
          ubereats: { base: 230, fee: 50, discount: 25 }
        }
      },
      {
        id: "mc-2",
        name: "Chicken Manchurian",
        description: "Indo-Chinese style chicken in spicy manchurian gravy",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.5,
        prices: {
          swiggy: { base: 320, fee: 40, discount: 40 },
          zomato: { base: 310, fee: 35, discount: 45 },
          ubereats: { base: 330, fee: 50, discount: 35 }
        }
      },
      {
        id: "mc-3",
        name: "Dim Sum Platter",
        description: "Assorted steamed and fried dim sums with dipping sauces",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.6,
        prices: {
          swiggy: { base: 380, fee: 40, discount: 50 },
          zomato: { base: 370, fee: 35, discount: 55 },
          ubereats: { base: 390, fee: 50, discount: 45 }
        }
      },
      {
        id: "mc-4",
        name: "Kung Pao Chicken",
        description: "Spicy stir-fried chicken with peanuts and vegetables",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.4,
        prices: {
          swiggy: { base: 350, fee: 40, discount: 45 },
          zomato: { base: 340, fee: 35, discount: 50 },
          ubereats: { base: 360, fee: 50, discount: 40 }
        }
      }
    ]
  },
  {
    id: "cream-stone",
    slug: "cream-stone",
    name: "Cream Stone",
    location: "Kondapur",
    cuisine: ["Desserts", "Ice Cream", "Shakes"],
    rating: 4.5,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "cs-1",
        name: "Belgian Chocolate",
        description: "Rich Belgian chocolate ice cream with chocolate chips",
        category: "Ice Cream",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop",
        isVeg: true,
        bestseller: true,
        rating: 4.8,
        prices: {
          swiggy: { base: 149, fee: 30, discount: 20 },
          zomato: { base: 139, fee: 25, discount: 25 },
          ubereats: { base: 159, fee: 40, discount: 15 }
        }
      },
      {
        id: "cs-2",
        name: "Brownie Sundae",
        description: "Warm chocolate brownie topped with vanilla ice cream",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.7,
        prices: {
          swiggy: { base: 189, fee: 30, discount: 25 },
          zomato: { base: 179, fee: 25, discount: 30 },
          ubereats: { base: 199, fee: 40, discount: 20 }
        }
      },
      {
        id: "cs-3",
        name: "Oreo Shake",
        description: "Creamy milkshake blended with Oreo cookies",
        category: "Shakes",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.5,
        prices: {
          swiggy: { base: 169, fee: 30, discount: 20 },
          zomato: { base: 159, fee: 25, discount: 25 },
          ubereats: { base: 179, fee: 40, discount: 15 }
        }
      }
    ]
  },
  {
    id: "pista-house",
    slug: "pista-house",
    name: "Pista House",
    location: "Charminar",
    cuisine: ["Haleem", "Biryani", "Mughlai"],
    rating: 4.6,
    deliveryTime: "40-50 min",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
    featured: true,
    menu: [
      {
        id: "pis-1",
        name: "Special Haleem",
        description: "Award-winning Hyderabadi haleem with dry fruits and ghee",
        category: "Specials",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.9,
        prices: {
          swiggy: { base: 200, fee: 45, discount: 25 },
          zomato: { base: 190, fee: 40, discount: 30 },
          ubereats: { base: 210, fee: 55, discount: 20 }
        }
      },
      {
        id: "pis-2",
        name: "Irani Chai",
        description: "Traditional Hyderabadi Irani chai with Osmania biscuits",
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.7,
        prices: {
          swiggy: { base: 60, fee: 45, discount: 5 },
          zomato: { base: 55, fee: 40, discount: 8 },
          ubereats: { base: 65, fee: 55, discount: 3 }
        }
      },
      {
        id: "pis-3",
        name: "Chicken Biryani",
        description: "Authentic Old City style dum biryani with tender chicken",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.6,
        prices: {
          swiggy: { base: 260, fee: 45, discount: 30 },
          zomato: { base: 250, fee: 40, discount: 35 },
          ubereats: { base: 270, fee: 55, discount: 25 }
        }
      }
    ]
  },
  {
    id: "mehfil",
    slug: "mehfil",
    name: "Mehfil Restaurant",
    location: "Abids",
    cuisine: ["Mughlai", "North Indian", "Kebabs"],
    rating: 4.3,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "meh-1",
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry with butter and cream",
        category: "Curries",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.5,
        prices: {
          swiggy: { base: 280, fee: 40, discount: 35 },
          zomato: { base: 270, fee: 35, discount: 40 },
          ubereats: { base: 290, fee: 50, discount: 30 }
        }
      },
      {
        id: "meh-2",
        name: "Dal Makhani",
        description: "Slow-cooked black lentils with butter and cream",
        category: "Curries",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.4,
        prices: {
          swiggy: { base: 220, fee: 40, discount: 25 },
          zomato: { base: 210, fee: 35, discount: 30 },
          ubereats: { base: 230, fee: 50, discount: 20 }
        }
      },
      {
        id: "meh-3",
        name: "Tandoori Roti",
        description: "Fresh whole wheat bread baked in tandoor",
        category: "Breads",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.2,
        prices: {
          swiggy: { base: 30, fee: 40, discount: 0 },
          zomato: { base: 25, fee: 35, discount: 0 },
          ubereats: { base: 35, fee: 50, discount: 0 }
        }
      }
    ]
  },
  {
    id: "flechazo",
    slug: "flechazo",
    name: "Flechazo",
    location: "Jubilee Hills",
    cuisine: ["Continental", "Italian", "Cafe"],
    rating: 4.4,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "fl-1",
        name: "Pasta Alfredo",
        description: "Creamy parmesan pasta with herbs and garlic bread",
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=200&h=200&fit=crop",
        isVeg: true,
        bestseller: true,
        rating: 4.5,
        prices: {
          swiggy: { base: 320, fee: 40, discount: 40 },
          zomato: { base: 310, fee: 35, discount: 45 },
          ubereats: { base: 330, fee: 50, discount: 35 }
        }
      },
      {
        id: "fl-2",
        name: "Grilled Chicken Steak",
        description: "Juicy chicken breast with mushroom sauce and vegetables",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.6,
        prices: {
          swiggy: { base: 420, fee: 40, discount: 50 },
          zomato: { base: 410, fee: 35, discount: 55 },
          ubereats: { base: 430, fee: 50, discount: 45 }
        }
      },
      {
        id: "fl-3",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with caesar dressing and croutons",
        category: "Salads",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.3,
        prices: {
          swiggy: { base: 240, fee: 40, discount: 30 },
          zomato: { base: 230, fee: 35, discount: 35 },
          ubereats: { base: 250, fee: 50, discount: 25 }
        }
      }
    ]
  },
  {
    id: "chilis",
    slug: "chilis",
    name: "Chili's Grill & Bar",
    location: "Hitech City",
    cuisine: ["American", "Mexican", "BBQ"],
    rating: 4.3,
    deliveryTime: "35-45 min",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "chi-1",
        name: "Baby Back Ribs",
        description: "Slow-smoked ribs glazed with signature BBQ sauce",
        category: "BBQ",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.7,
        prices: {
          swiggy: { base: 650, fee: 50, discount: 80 },
          zomato: { base: 640, fee: 45, discount: 90 },
          ubereats: { base: 660, fee: 60, discount: 70 }
        }
      },
      {
        id: "chi-2",
        name: "Chicken Fajitas",
        description: "Sizzling chicken with peppers, onions and tortillas",
        category: "Mexican",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.5,
        prices: {
          swiggy: { base: 480, fee: 50, discount: 60 },
          zomato: { base: 470, fee: 45, discount: 70 },
          ubereats: { base: 490, fee: 60, discount: 50 }
        }
      },
      {
        id: "chi-3",
        name: "Nachos Grande",
        description: "Loaded nachos with cheese, jalapeños and sour cream",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.4,
        prices: {
          swiggy: { base: 320, fee: 50, discount: 40 },
          zomato: { base: 310, fee: 45, discount: 45 },
          ubereats: { base: 330, fee: 60, discount: 35 }
        }
      }
    ]
  },
  {
    id: "ohris",
    slug: "ohris",
    name: "Ohri's Eatmor",
    location: "Banjara Hills",
    cuisine: ["Multi-Cuisine", "North Indian", "Continental"],
    rating: 4.2,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "oh-1",
        name: "Hyderabadi Biryani",
        description: "Authentic dum biryani with raita and mirchi ka salan",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.4,
        prices: {
          swiggy: { base: 300, fee: 40, discount: 35 },
          zomato: { base: 290, fee: 35, discount: 40 },
          ubereats: { base: 310, fee: 50, discount: 30 }
        }
      },
      {
        id: "oh-2",
        name: "Paneer Butter Masala",
        description: "Cottage cheese in rich tomato and butter gravy",
        category: "Curries",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.3,
        prices: {
          swiggy: { base: 260, fee: 40, discount: 30 },
          zomato: { base: 250, fee: 35, discount: 35 },
          ubereats: { base: 270, fee: 50, discount: 25 }
        }
      }
    ]
  },
  {
    id: "subway",
    slug: "subway",
    name: "Subway",
    location: "Gachibowli",
    cuisine: ["Sandwiches", "Healthy", "Fast Food"],
    rating: 4.1,
    deliveryTime: "15-25 min",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "sw-1",
        name: "Chicken Teriyaki Sub",
        description: "Tender chicken strips with teriyaki sauce and veggies",
        category: "Subs",
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=200&h=200&fit=crop",
        isVeg: false,
        bestseller: true,
        rating: 4.3,
        prices: {
          swiggy: { base: 280, fee: 30, discount: 35 },
          zomato: { base: 270, fee: 25, discount: 40 },
          ubereats: { base: 290, fee: 40, discount: 30 }
        }
      },
      {
        id: "sw-2",
        name: "Veggie Delite",
        description: "Fresh vegetables with your choice of sauces",
        category: "Subs",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.0,
        prices: {
          swiggy: { base: 180, fee: 30, discount: 20 },
          zomato: { base: 170, fee: 25, discount: 25 },
          ubereats: { base: 190, fee: 40, discount: 15 }
        }
      },
      {
        id: "sw-3",
        name: "Italian BMT",
        description: "Pepperoni, salami and ham with Italian herbs",
        category: "Subs",
        image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=200&h=200&fit=crop",
        isVeg: false,
        rating: 4.2,
        prices: {
          swiggy: { base: 320, fee: 30, discount: 40 },
          zomato: { base: 310, fee: 25, discount: 45 },
          ubereats: { base: 330, fee: 40, discount: 35 }
        }
      }
    ]
  },
  {
    id: "starbucks",
    slug: "starbucks",
    name: "Starbucks",
    location: "Jubilee Hills",
    cuisine: ["Coffee", "Cafe", "Bakery"],
    rating: 4.4,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop",
    featured: false,
    menu: [
      {
        id: "sb-1",
        name: "Caramel Frappuccino",
        description: "Blended coffee with caramel and whipped cream",
        category: "Cold Beverages",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop",
        isVeg: true,
        bestseller: true,
        rating: 4.6,
        prices: {
          swiggy: { base: 340, fee: 35, discount: 40 },
          zomato: { base: 330, fee: 30, discount: 45 },
          ubereats: { base: 350, fee: 45, discount: 35 }
        }
      },
      {
        id: "sb-2",
        name: "Cappuccino",
        description: "Classic espresso with steamed milk foam",
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.5,
        prices: {
          swiggy: { base: 260, fee: 35, discount: 30 },
          zomato: { base: 250, fee: 30, discount: 35 },
          ubereats: { base: 270, fee: 45, discount: 25 }
        }
      },
      {
        id: "sb-3",
        name: "Chocolate Croissant",
        description: "Buttery croissant filled with rich chocolate",
        category: "Bakery",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop",
        isVeg: true,
        rating: 4.4,
        prices: {
          swiggy: { base: 180, fee: 35, discount: 20 },
          zomato: { base: 170, fee: 30, discount: 25 },
          ubereats: { base: 190, fee: 45, discount: 15 }
        }
      }
    ]
  }
];

// Generate more restaurants with better variety
const areas = ['Hitech City', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Kondapur', 'Kukatpally', 'Secunderabad', 'Ameerpet', 'Begumpet'];
const restaurantImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop'
];
const cuisineTypes = [
  { types: ['Chinese', 'Asian'], names: ['Dragon Palace', 'Golden Wok', 'Ming Garden', 'Bamboo House'] },
  { types: ['North Indian', 'Mughlai'], names: ['Royal Kitchen', 'Nawab Palace', 'Spice Route', 'Delhi Darbar'] },
  { types: ['South Indian', 'Andhra'], names: ['Andhra Bhavan', 'Udupi Grand', 'Sagar Delicacy', 'Dosa Plaza'] },
  { types: ['Street Food', 'Chaat'], names: ['Chaat Corner', 'Mumbai Express', 'Street Bites', 'Papdi House'] },
  { types: ['Healthy', 'Salads'], names: ['Green Bowl', 'Fresh & Fit', 'Salad Days', 'Nutrify'] }
];

const additionalRestaurants = [];
for (let i = 0; i < 35; i++) {
  const area = areas[i % areas.length];
  const cuisineInfo = cuisineTypes[i % cuisineTypes.length];
  const restaurantName = cuisineInfo.names[Math.floor(i / cuisineTypes.length) % cuisineInfo.names.length];
  
  additionalRestaurants.push({
    id: `restaurant-${i + 20}`,
    slug: `restaurant-${i + 20}`,
    name: `${restaurantName} ${area.split(' ')[0]}`,
    location: area,
    cuisine: cuisineInfo.types,
    rating: parseFloat((3.8 + Math.random() * 1.2).toFixed(1)),
    deliveryTime: `${20 + Math.floor(Math.random() * 15)}-${35 + Math.floor(Math.random() * 15)} min`,
    image: restaurantImages[i % restaurantImages.length],
    featured: i < 2,
    menu: [
      {
        id: `r${i}-1`,
        name: `${cuisineInfo.types[0]} Special`,
        description: `Signature ${cuisineInfo.types[0].toLowerCase()} dish prepared with fresh ingredients`,
        category: cuisineInfo.types[0],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
        isVeg: i % 3 === 0,
        bestseller: true,
        rating: parseFloat((4.0 + Math.random() * 0.9).toFixed(1)),
        prices: {
          swiggy: { base: 180 + Math.floor(Math.random() * 150), fee: 35, discount: 15 + Math.floor(Math.random() * 35) },
          zomato: { base: 170 + Math.floor(Math.random() * 150), fee: 30, discount: 20 + Math.floor(Math.random() * 35) },
          ubereats: { base: 190 + Math.floor(Math.random() * 150), fee: 45, discount: 10 + Math.floor(Math.random() * 35) }
        }
      },
      {
        id: `r${i}-2`,
        name: `Chef's ${cuisineInfo.types[0]} Combo`,
        description: `Value combo meal with ${cuisineInfo.types[0].toLowerCase()} favorites and sides`,
        category: cuisineInfo.types[0],
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop',
        isVeg: i % 2 === 0,
        rating: parseFloat((3.8 + Math.random() * 1.1).toFixed(1)),
        prices: {
          swiggy: { base: 280 + Math.floor(Math.random() * 120), fee: 35, discount: 25 + Math.floor(Math.random() * 30) },
          zomato: { base: 270 + Math.floor(Math.random() * 120), fee: 30, discount: 30 + Math.floor(Math.random() * 30) },
          ubereats: { base: 290 + Math.floor(Math.random() * 120), fee: 45, discount: 20 + Math.floor(Math.random() * 30) }
        }
      }
    ]
  });
}

export const ALL_RESTAURANTS = [...HYDERABAD_RESTAURANTS, ...additionalRestaurants];

// Pricing engine
export const getLiveFinalPrice = (price, surgeMultiplier = 1, locationMultiplier = 1) => {
  if (!price) return 0;
  return Math.round((price.base * surgeMultiplier * locationMultiplier) + price.fee - price.discount);
};

export const getSurgeMultiplier = (hour = new Date().getHours()) => {
  if ((hour >= 12 && hour <= 14) || (hour >= 19 && hour <= 22)) {
    return 1 + (Math.sin((hour - 12) * Math.PI / 6) * 0.15);
  }
  return 1;
};

export const getLocationMultiplier = (location) => {
  const multipliers = {
    'Hitech City': 1.15,
    'Gachibowli': 1.12,
    'Banjara Hills': 1.18,
    'Jubilee Hills': 1.20,
    'Madhapur': 1.10,
    'Kondapur': 1.08,
    'Kukatpally': 1.05,
    'Secunderabad': 1.10,
    'Ameerpet': 1.06,
    'Begumpet': 1.08
  };
  return multipliers[location] || 1.0;
};