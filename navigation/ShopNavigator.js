import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems  } from 'react-navigation-drawer';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux'

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';

import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
       fontFamily: 'open-sans' 
    },
    headerTintColor: Platform.OS === 'andriod' ? 'white' : Colors.primary
    }


const ProductsNavigator = createStackNavigator(
{
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, 
{   navigationOptions: {
    drawerIcon: drawerConfig => 
    <Ionicons 
    name={Platform.OS === 'andriod' ? 'md-cart' : 'ios-cart'}
    size={23}
    color={drawerConfig.tintColor}
    />
},
    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen

}, {
        navigationOptions: {
            drawerIcon: drawerConfig => 
            <Ionicons 
            name={Platform.OS === 'andriod' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
            />
        },
    defaultNavigationOptions: defaultNavOptions
}
);

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen

}, {
        navigationOptions: {
            drawerIcon: drawerConfig => 
            <Ionicons 
            name={Platform.OS === 'andriod' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
            />
        },
    defaultNavigationOptions: defaultNavOptions
}
);

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{flex:1, paddingTop: 20}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerNavigatorItems {...props}/>
                    <Button title="Logout" color={Colors.primary} onPress={()=> {
                        dispatch(authActions.logout())
                        //props.navigation.navigate('Auth')
                    }}/>
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);