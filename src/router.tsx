import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction
} from './views/Products';
import NewProduct, { action as newProductAction } from './views/NewProduct';
import { action as deleteProductAction } from './components/ProductDetails';
import EditProduct, {
  loader as aditProductLoader,
  action as editProductAction
} from './views/EditProduct';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction
      },
      {
        path: 'productos/nuevo',
        element: <NewProduct />,
        action: newProductAction
      },
      {
        path: 'productos/:id/editar', // RDA Pattern - Resource-oriented design
        element: <EditProduct />,
        loader: aditProductLoader,
        action: editProductAction
      },
      {
        path: 'productos/:id/eliminar',
        action: deleteProductAction
      }
    ]
  }
]);
