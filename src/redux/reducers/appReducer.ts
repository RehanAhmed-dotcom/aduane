import {
  IS_FILTERED,
  REMOVE_FILTER,
  DELIVERY_ADDRESS,
  DELIVERY_TYPE,
  RESET_PASS_EMAIL,
  CODE_VALUE,
  DELIVERY_TIME,
  DELIVERY_FEE,
  RESTAURANT_LOCATION,
  REMOVE_SHARED_ORDER,
  SAVE_RECOMENDATION,
  UPDATE_REC_DATA,
  REC_DATA,
  REQUIRED_ITEMS,
  IS_FIXED,
  ALL_REC
} from '../actionTypes';

const initialState = {
  isFiltered: false,
  filteredRestaurants: [],
  delivery_address: undefined,
  deliveryType: 'delivery',
  email: '',
  codeValue: '',
  deliveryTime: 0,
  deliveryFee: 0,
  coords: {},
  itemId: null,
  recomendationSave:false,
  updateRec:null,
  rec:null,
  requiredItems:null,
  isFixed:false,
  allRecArr:[]


};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case IS_FILTERED: {
      return {
        ...state,
        filteredRestaurants: action.payload,
        isFiltered: true,
      };
    }
    case REMOVE_FILTER: {
      return {
        ...state,
        filteredRestaurants: [],
        isFiltered: false,
      };
    }
    case DELIVERY_ADDRESS: {
      return {
        ...state,
        delivery_address: action.payload,
      };
    }
    case DELIVERY_TYPE: {
      return {
        ...state,
        deliveryType: action.payload,
      };
    }
    case DELIVERY_TIME: {
      return {
        ...state,
        deliveryTime: action.payload,
      };
    }
    case DELIVERY_FEE: {
      return {
        ...state,
        deliveryFee: action.payload,
      };
    }
    case RESTAURANT_LOCATION: {
      return {
        ...state,
        coords: action.payload,
      };
    }
    case RESET_PASS_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case CODE_VALUE: {
      return {
        ...state,
        codeValue: action.payload,
      };
    }
    case REMOVE_SHARED_ORDER: {
      return {
        ...state,
        itemId: action.payload,
      }
      }
      case SAVE_RECOMENDATION: {
        return {
          ...state,
          recomendationSave: action.payload,
        }
    }
    case REC_DATA: {
      return {
        ...state,
        rec: action.payload,
      };
    }
    case UPDATE_REC_DATA: {
      return {
        ...state,
        updateRec: action.payload,
      };
    }
    case REQUIRED_ITEMS: {
      return {
        ...state,
        requiredItems: action.payload,
      };
    }
    case IS_FIXED: {
      return {
        ...state,
        isFixed: action.payload,
      };
    }
    case ALL_REC: {
      return {
        ...state,
        allRecArr: action.payload,
      };
    }
    default:
      return state;
  }
};
