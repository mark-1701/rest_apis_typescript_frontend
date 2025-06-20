import {
  Form,
  redirect,
  useFetcher,
  useNavigate,
  type ActionFunctionArgs
} from 'react-router-dom';
import type { Product } from '../types';
import { formatCurrency } from '../utils';
import { deleteProduct } from '../services/ProductService';

type ProductDetailProps = {
  product: Product;
};

export const action = async ({ params }: ActionFunctionArgs) => {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);

    // ? Eliminar no tiene ruta. Es necesario redireccionar
    return redirect('/');
  }
};

const ProductDetails = ({ product }: ProductDetailProps) => {
  // * Hook para consultas Feacher
  // se usa para enviar datos al servidor sin recargar la página
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>

      <td className="p-3 text-lg text-gray-800">
        {/* Componente fetcher */}
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailable ? 'text-black' : 'text-red-600'}
              border-black-100 w-full rounded-lg border p-2 text-xs font-bold
              uppercase hover:cursor-pointer`}
          >
            {isAvailable ? 'Disponible' : 'No Disponible'}
          </button>
        </fetcher.Form>
      </td>

      <td className="p-3 text-lg text-gray-800">
        <div className="flex items-center gap-2">
          <button
            className="w-full cursor-pointer rounded-lg bg-indigo-600 p-2
              text-center text-xs font-bold text-white uppercase"
            onClick={() =>
              // enviarle un state usando navigate (no necesario)
              navigate(`/productos/${product.id}/editar`, {
                state: {
                  product
                }
              })
            }
          >
            Editar
          </button>

          <Form
            className="w-full"
            method="POST"
            // ? Redirigir el formulario a una ruta
            action={`productos/${product.id}/eliminar`}
            onSubmit={e => {
              //
              if (!confirm('¿Eliminar?')) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value={'Elminar'}
              className="w-full cursor-pointer rounded-lg bg-red-600 p-2
                text-center text-xs font-bold text-white uppercase"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
