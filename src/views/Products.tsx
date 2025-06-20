import { Link, useLoaderData, type ActionFunctionArgs } from 'react-router-dom';
import {
  getProducts,
  updateProductAvailability
} from '../services/ProductService';
import ProductDetails from '../components/ProductDetails';
import type { Product } from '../types';

export const loader = async () => {
  const products = await getProducts();
  // siempre tiene que retornar algo
  return products;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  await updateProductAvailability(+data.id);
  return {};
};

const Products = () => {
  // ? Hook para recuperar dato retornado por el loader
  const products: Product[] = useLoaderData();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to={'productos/nuevo'}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white
            shadow-sm hover:bg-indigo-500"
        >
          Agregar producto
        </Link>
      </div>

      <div className="p-2">
        <table className="mt-5 w-full table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
