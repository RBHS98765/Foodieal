// Reviews storage using localStorage
const REVIEWS_KEY = 'foodieal_reviews';

export const getReviews = () => {
  if (typeof window === 'undefined') return [];
  const reviews = localStorage.getItem(REVIEWS_KEY);
  return reviews ? JSON.parse(reviews) : [];
};

export const saveReview = (review) => {
  const reviews = getReviews();
  const newReview = {
    ...review,
    id: `review_${Date.now()}`,
    created_date: new Date().toISOString()
  };
  reviews.unshift(newReview);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  return newReview;
};

export const getReviewsByRestaurant = (restaurantId) => {
  return getReviews().filter(r => r.restaurantId === restaurantId);
};

export const getReviewsByUser = (userEmail) => {
  return getReviews().filter(r => r.userEmail === userEmail);
};

export const getReviewsByMenuItem = (menuItemId) => {
  return getReviews().filter(r => r.menuItemId === menuItemId);
};

export const getAverageRating = (restaurantId) => {
  const reviews = getReviewsByRestaurant(restaurantId);
  if (reviews.length === 0) return null;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
};

export const hasUserReviewedOrder = (orderId, userEmail) => {
  return getReviews().some(r => r.orderId === orderId && r.userEmail === userEmail);
};