import React, { ChangeEvent, useCallback, useState, KeyboardEvent } from 'react';

import { ProductCart } from './interface';
import { Modals } from '../../components';
import { toRupiah } from '../../utilities';
import { getAllProductForSale } from '../../api/products';

interface ModalsProductsProps {
  cart: ProductCart[];
  setGetting: (status: boolean) => void;
  setCart: (cart: ProductCart[]) => void;
  setSelectedProduct: (index: number) => void;
}

const ModalsProducts: React.FC<ModalsProductsProps> = (props) => {
  const { cart, setGetting, setCart, setSelectedProduct } = props;

  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState<ProductForSale[]>([]);

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setName(e.target.value);
  }, []);

  const handleKeydownInput = useCallback(async (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (e.key === 'Enter') {
      if (value.length > 2) {
        setGetting(true);
        try {
          const { data } = await getAllProductForSale({ name: value });

          setProducts(data);
        } catch (error: any) {
          setErrorMessage(error.message);
        }

        setGetting(false);
      }
    }
  }, []);

  const onSelect = useCallback(
    (index: number) => {
      const inCart = cart.find((pro) => pro.code === products[index].code);

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
        setCart([
          {
            id: products[index].product.id,
            unit_detail_id: products[index].id,
            code: products[index].code,
            prices: products[index].price[0],
            stock: Math.floor(
              products[index].product.product_stock_details.reduce(
                (acc, cv) => acc + cv.stock,
                0
              ) / products[index].quantity
            ),
            type: 'price',

            name: products[index].product.name,
            unit: products[index].unit.name,
            quantity: 1,
            price: products[index].price[0].price,
            total: products[index].price[0].price,
          },
          ...cart,
        ]);
      }

      setSelectedProduct(0);
      (window as any)['modals-products'].close();
    },
    [products, cart]
  );

  return (
    <Modals idModals="modals-products">
      <h3 className="font-bold text-lg mb-4">Daftar Produk</h3>

      <label className="input input-bordered w-full input-sm flex justify-between items-center gap-2">
        <input
          id="product-name"
          autoComplete="off"
          placeholder="Masukan nama produk..."
          value={name}
          onChange={handleChangeInput}
          onKeyDown={handleKeydownInput}
          enterKeyHint="enter"
        />
      </label>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div className="overflow-x-auto mt-4 flex-1 bg-base-100 border-[1px] border-base-content rounded-md h-[60vh]">
        <table className="table table-pin-rows table-xs">
          <thead>
            <tr className="text-white bg-primary">
              <th>Nama Produk</th>
              <th>Satuan</th>
              <th className="text-right">Harga</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => (
              <tr key={i} onClick={() => onSelect(i)}>
                <td>{item.product.name}</td>
                <td>{item.unit.name}</td>
                <td className="text-right">{toRupiah(item.price[0].price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modals>
  );
};

export default ModalsProducts;
