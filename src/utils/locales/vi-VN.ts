import aboutUs from './vi-VN/aboutUs';
import { adminLocales } from './vi-VN/admin';
import common from './vi-VN/common';
import { feedbackLocales } from './vi-VN/feedbacks';
import { landing } from './vi-VN/landing';
import lessor from './vi-VN/lessor';
import lessorBreadCrumbs from './vi-VN/lessor-breadcrumbs';
import login from './vi-VN/login';
import menu from './vi-VN/menu';
import order from './vi-VN/order';
import { product } from './vi-VN/product';
import register from './vi-VN/register';
import { rentLocale } from './vi-VN/rent';
import store from './vi-VN/store';
import thankYou from './vi-VN/thankYou';
import user from './vi-VN/user';

export default {
  'nav.Home': 'Landing Page',
  'nav.Store': 'Thuê sản phẩm',
  'nav.AboutUs': 'Giới thiệu',
  ...product,
  ...lessorBreadCrumbs,
  ...menu,
  ...aboutUs,
  ...login,
  ...register,
  ...store,
  ...lessor,
  ...common,
  ...thankYou,
  ...order,
  ...landing,
  ...user,
  ...rentLocale,
  ...feedbackLocales,
  ...adminLocales,
};
