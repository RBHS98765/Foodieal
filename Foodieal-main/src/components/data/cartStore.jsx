// Cart state management using localStorage
const CART_KEY = 'foodieal_cart';

export const getCart = () => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (items) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item) => {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (i) => i.id === item.id && i.platform === item.platform
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity || 1;
  } else {
    cart.push({
      ...item,
      quantity: item.quantity || 1,
      addedAt: new Date().toISOString()
    });
  }

  saveCart(cart);
  return cart;
};

export const updateCartItemQuantity = (itemId, quantity) => {
  const cart = getCart();
  const index = cart.findIndex((i) => i.id === itemId);
  
  if (index >= 0) {
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    saveCart(cart);
  }
  
  return cart;
};

export const removeFromCart = (itemId) => {
  const cart = getCart().filter((i) => i.id !== itemId);
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  saveCart([]);
  return [];
};

export const getCartSummary = (items) => {
  const platformGroups = {};
  
  items.forEach((item) => {
    if (!platformGroups[item.platform]) {
      platformGroups[item.platform] = {
        platform: item.platform,
        items: [],
        subtotal: 0,
        deliveryFee: 35,
        discount: 0,
        total: 0,
        itemCount: 0
      };
    }
    
    const group = platformGroups[item.platform];
    group.items.push(item);
    group.itemCount += item.quantity;
    group.subtotal += item.price * item.quantity;
  });

  Object.values(platformGroups).forEach((group) => {
    group.total = group.subtotal + group.deliveryFee - group.discount;
  });

  return Object.values(platformGroups);
};

// Auth state management
const AUTH_KEY = 'foodieal_auth';

export const getAuthState = () => {
  if (typeof window === 'undefined') return { isAuthenticated: false, user: null };
  const auth = localStorage.getItem(AUTH_KEY);
  return auth ? JSON.parse(auth) : { isAuthenticated: false, user: null };
};

export const saveAuthState = (authState) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
};

export const login = (user) => {
  const authState = { isAuthenticated: true, user };
  saveAuthState(authState);
  return authState;
};

export const logout = () => {
  const authState = { isAuthenticated: false, user: null };
  saveAuthState(authState);
  return authState;
};

// Order history
const ORDERS_KEY = 'foodieal_orders';

export const getOrders = () => {
  if (typeof window === 'undefined') return [];
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (order) => {
  const orders = getOrders();
  orders.unshift({
    ...order,
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders;
};