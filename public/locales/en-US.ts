import aboutUs from './en-US/aboutUs';
import { adminLocales } from './en-US/admin';
import common from './en-US/common';
import { feedbackLocales } from './en-US/feedbacks';
import { landing } from './en-US/landing';
import lessor from './en-US/lessor';
import lessorBreadCrumbs from './en-US/lessor-breadcrumbs';
import login from './en-US/login';
import menu from './en-US/menu';
import order from "./en-US/order";
import { product } from './en-US/product';
import register from './en-US/register';
import { rentLocale } from './en-US/rent';
import store from './en-US/store';
import thankYou from './en-US/thankYou';
import user from './en-US/user';

export default {
  'nav.Home': 'Landing Page',
  'nav.Store': 'Rental',
  'nav.AboutUs': 'AboutUs',
  ...product,
  ...lessorBreadCrumbs,
  ...aboutUs,
  ...menu,
  ...login,
  ...register,
  ...store,
  ...lessor,
  ...landing,
  ...common,
  ...thankYou,
  ...order,
  ...user,
  ...rentLocale,
  ...feedbackLocales,
  ...adminLocales,
};
