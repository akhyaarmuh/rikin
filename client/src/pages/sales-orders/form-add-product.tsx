import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { mySwal } from '../../utilities';
import { ProductCart } from './interface';
import { getProductByCode } from '../../api/products';

interface FormAddProductProps {
  cart: ProductCart[];
  setGetting: (status: boolean) => void;
  setCart: (cart: ProductCart[]) => void;
  setSelectedProduct: (index: number) => void;
}

const FormAddProduct: React.FC<FormAddProductProps> = (props) => {
  const { cart, setCart, setSelectedProduct, setGetting } = props;

  const [code, setCode] = useState('');

  const changeCode = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!code) return showModals();

      const inCart = cart.find((pro) => pro.code === code);

      if (inCart) {
        setCart(
          cart.map((product) => {
            if (inCart.code === product.code)
              return {
                ...inCart,
                quantity: inCart.quantity + 1,
                total: (inCart.quantity + 1) * inCart.price,
              };

            return product;
          })
        );
      } else {
        setGetting(true);

        try {
          const product: ProductByCode = await getProductByCode(code);

          setCart([
            {
              id: product.id,
              unit_detail_id: product.unit_detail_id,
              code: product.code,
              prices: product.prices,
              stock: product.stock,
              type: 'price',

              name: product.name,
              unit: product.unit_name,
              quantity: 1,
              price: product.prices.price,
              total: product.prices.price,
            },
            ...cart,
          ]);
        } catch (error: any) {
          mySwal.fire({ text: error.message, icon: 'error' });
        }

        setGetting(false);
      }

      setSelectedProduct(0);
      setCode('');
    },
    [code, cart]
  );

  const showModals = useCallback(() => {
    (window as any)['modals-products'].showModal();

    const input = document.querySelector(`#product-name`) as HTMLInputElement;
    if (input) input.select();
  }, []);

  return (
    <div className="p-4 bg-base-200 flex-1 rounded-md flex items-center">
      <form onSubmit={handleSubmit} className="flex-1">
        <label className="input input-bordered w-full input-sm flex justify-between items-center gap-2">
          <input
            id="code"
            autoFocus
            autoComplete="off"
            placeholder="Kode produk..."
            value={code}
            onChange={changeCode}
            enterKeyHint="enter"
          />
          <kbd className="kbd kbd-sm text-primary hidden laptop:block">F1</kbd>
        </label>
      </form>
    </div>
  );
};

export default FormAddProduct;
