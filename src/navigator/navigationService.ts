import {createRef} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

const navigationRef = createRef<NavigationContainerRef>();

const navigate = (name: string, params?: object) => {
  navigationRef.current?.navigate(name, params);
};

const goBack = () => {
  navigationRef.current?.goBack();
};

export {navigate, goBack, navigationRef};
