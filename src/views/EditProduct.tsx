import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
  useLoaderData
} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { getProductById, updateProduct } from '../services/ProductService';
import type { Product } from '../types';
import ProductForm from '../components/ProductForm';

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false }
];

// * Recuperar parametros de url
export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      // ? Personalizar errores con React Router Dom
      // throw new Response('', { status: 404, statusText: 'No encontrado' });
      return redirect('/');
    }
    return product;
  }

  return {};
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  // ? Convertir a un objeto un array clave valor
  const data = Object.fromEntries(await request.formData());

  let error = '';

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }

  if (error.length) error;

  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect('/');
  }

  return {};
};

const EditProduct = () => {
  // * Hook para recuperar datos del action
  const error = useActionData() as string;

  // ? Hook para recuperar datos enviados por navigate
  // const { state } = useLocation();

  const product = useLoaderData() as Product;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to={'/'}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white
            shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full bg-gray-50 p-3"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full cursor-pointer rounded bg-indigo-600 p-2
            text-lg font-bold text-white"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
};

export default EditProduct;
