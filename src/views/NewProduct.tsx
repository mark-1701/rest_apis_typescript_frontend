import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect
} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { addProduct } from '../services/ProductService';
import ProductForm from '../components/ProductForm';

export const action = async ({ request }: ActionFunctionArgs) => {
  // ? Convertir a un objeto un array clave valor
  const data = Object.fromEntries(await request.formData());
  // console.log(await request.formData()); // los datos envíados

  let error = '';

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }

  // ? Si hay algún error, retornarlo
  if (error.length) error;

  await addProduct(data);

  // siempre se tiene que retornar algo

  // ? Redirección de la ruta si todo fue correcto
  return redirect('/');
};

const NewProduct = () => {
  // * Hook para recuperar datos del action
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Productos
        </h2>
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
        <ProductForm />
        
        <input
          type="submit"
          className="mt-5 w-full cursor-pointer rounded bg-indigo-600 p-2
            text-lg font-bold text-white"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};

export default NewProduct;
