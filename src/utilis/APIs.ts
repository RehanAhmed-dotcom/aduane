import axios from 'axios';

const API = axios.create({
  baseURL: 'https://intechsol-developer.co/aduane',
  // baseURL: 'https://intechsol.co/aduane',
});

interface IPayload {
  data: FormData;
  token: string;
}

const userLogin = async (payload: FormData) => {
  const requrest = `/api/login`;

  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    if (err.message === 'Network Error') {
      throw new Error(err.message);
    } else {
      const {message} = err.response.data;
      throw new Error(message);
    }
  }
};

const userRegister = async (payload: FormData) => {
  const requrest = `/api/register`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {message} = err.response.data;
    throw message;
  }
};
const userResendcode = async (payload: FormData) => {
  const requrest = `/api/resend-code`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {message} = err.response.data;
    throw message;
  }
};

const userForgotPassword = async (payload: FormData) => {
  const requrest = `/api/forgot`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {message} = err.response.data;
    throw new Error(message);
  }
};

const userComformationCode = async (payload: FormData) => {
  const requrest = `/api/confirm-code`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {error} = err.response.data;
    throw new Error(error);
  }
};

const userResetPassword = async (payload: FormData) => {
  const requrest = `/api/reset`;

  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {message} = err.response.data;
    throw new Error(message.password);
  }
};

const userChangePassword = async (payload: any) => {
  const requrest = `/api/change-password`;

  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {message} = err.response.data;
    throw message;
  }
};

const userEditProfile = async (payload: any) => {
  const requrest = `/api/edit`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const categoriesList = async (payload: any) => {
  const requrest = `/api/view-category`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const restaurantsList = async (payload: string) => {
  const requrest = `/api/view-restaurant`;
  try {
    const response = await API.post(requrest, null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const filteredRestaurantsList = async (payload: IPayload) => {
  const requrest = `/api/view-filter-restaurant`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const searchRestaurantByName = async (payload: any) => {
  const requrest = `/api/search-restaurant/${payload.word}`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const mealTimePlaces = async (payload: any) => {
  const requrest = `/api/filter-by-meal`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const allFoodPlaces = async (payload: any) => {
  const requrest = `/api/view-places`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const subCategoriesList = async (payload: any) => {
  const requrest = `/api/view-restaurant-category`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const subCategoryProducts = async (payload: any) => {
  const requrest = `/api/view-restaurant-product`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const toggleFavorite = async (payload: any) => {
  const requrest = `/api/add-favourite`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const favoritesList = async (payload: any) => {
  const requrest = `/api/view-favourite-list`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const getRecommendedProduct = async (payload: IPayload) => {
  const requrest = `/api/get-recommend-product`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const placeOrder = async (payload: any) => {
  const requrest = `/api/create-order`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });

    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const ordersList = async (payload: string) => {
  const requrest = `/api/view-order-list`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const showAllUsersList = async (payload: string) => {
  const requrest = `/api/user-list`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const payForFriendFood = async (payload: any) => {
  const requrest = `/api/share-order`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });

    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const notificationsList = async (payload: any) => {
  const requrest = `/api/notification-list`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const notificationRead = async (payload: any) => {
  const requrest = `/api/notification-status`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const updateFcmToken = async (payload: any) => {
  const requrest = `/api/update-fcm`;

  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const payForOrder = async (payload: IPayload) => {
  const requrest = `/api/payment`;

  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const confirmPayment = async (payload: IPayload) => {
  const requrest = `/api/confirm-payment`;

  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const toggleRestaurantNotifiction = async (payload: IPayload) => {
  const requrest = `/api/off-notification`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};

const verifyEmail = async (payload: FormData) => {
  const requrest = `/api/verify`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {error} = err.response.data;
    throw new Error(error);
  }
};

// async function getDistance() {
//   let ApiURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
//   let params = `units=imperial&origins=${user.latitude},${user.longitude}&destinations=${restaurant.latitude},${restaurant.longitude}&key=AIzaSyCMQF44O1FnT3mxAbSr5IM8e1nNKw2A1AM`;
//   let finalApiURL = `${ApiURL}${encodeURI(params)}`;

//   try {
//     let response = await fetch(finalApiURL);
//     let res = await response.json();
//     const meters = res.rows[0].elements[0].distance.value;
//     const distance = meters / 1609.344;
//     setMiles(distance);
//   } catch (error) {}
// }

const getDistance = async (payload: any) => {
  let ApiURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  let params = `units=imperial&origins=${payload.user.latitude},${payload.user.longitude}&destinations=${payload.restaurant.latitude},${payload.restaurant.longitude}&key=AIzaSyCMQF44O1FnT3mxAbSr5IM8e1nNKw2A1AM`;
  let finalApiURL = `${ApiURL}${encodeURI(params)}`;
  try {
    const response = await axios.get(finalApiURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const getSharedOrders = async (payload: string) => {
  const requrest = `/api/view-share-order`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {error} = err.response.data;
    throw new Error(error);
  }
};

const removeSharedOrder = async (payload: IPayload) => {
  const requrest = `/api/delete-share-order`;
  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const {error} = err.response.data;
    throw new Error(error);
  }
};

export {
  userLogin,
  userRegister,
  userForgotPassword,
  userComformationCode,
  userResetPassword,
  userChangePassword,
  userEditProfile,
  categoriesList,
  restaurantsList,
  filteredRestaurantsList,
  searchRestaurantByName,
  allFoodPlaces,
  mealTimePlaces,
  subCategoriesList,
  subCategoryProducts,
  toggleFavorite,
  favoritesList,
  getRecommendedProduct,
  placeOrder,
  ordersList,
  showAllUsersList,
  payForFriendFood,
  notificationsList,
  notificationRead,
  updateFcmToken,
  payForOrder,
  toggleRestaurantNotifiction,
  verifyEmail,
  getDistance,
  getSharedOrders,
  removeSharedOrder,
  userResendcode,
  confirmPayment
};
