import { ChangeEvent, useCallback } from 'react';

import { ProductCart } from './interface';
import { useAppSelector } from '../../redux/hooks';
import { rupiahToInt, toRupiah } from '../../utilities';

interface CartTableProps {
  cart: ProductCart[];
  selectedProduct: number;
  setCart: (cart: ProductCart[]) => void;
  setSelectedProduct: (index: number) => void;
}

const CartTable: React.FC<CartTableProps> = (props) => {
  const { cart, selectedProduct, setCart, setSelectedProduct } = props;

  const role = useAppSelector((state) => state.user.role);

  const changeType = useCallback(
    (index: number) => {
      setCart(
        cart.map((pro, i) => {
          if (i === index) {
            const type = pro.type === 'price' ? 'sale_price' : 'price';

            return {
              ...pro,
              type,
              price: pro.prices[type],
              total: pro.prices[type] * pro.quantity,
            };
          }

          return pro;
        })
      );
    },
    [cart]
  );

  const changeQuantity = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const dataIndex = Number(e.target.dataset.index);
      const value = e.target.value;

      const newQTY = rupiahToInt(value);

      setCart(
        cart.map((pro, i) => {
          if (i === dataIndex)
            return {
              ...pro,
              quantity: newQTY > pro.stock ? pro.stock : newQTY,
              total: (newQTY > pro.stock ? pro.stock : newQTY) * pro.price,
            };

          return pro;
        })
      );
    },
    [cart]
  );

  const changePrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const dataIndex = Number(e.target.dataset.index);
      const value = e.target.value;

      setCart(
        cart.map((pro, i) => {
          if (i === dataIndex)
            return {
              ...pro,
              price: rupiahToInt(value),
              total: rupiahToInt(value) * pro.quantity,
            };

          return pro;
        })
      );
    },
    [cart]
  );

  return (
    <div className="overflow-x-auto mt-2 flex-1 bg-base-100 border-[1px] border-base-content rounded-md">
      <table className="table table-pin-rows table-xs">
        <thead>
          <tr className="text-white bg-primary">
            <th className="w-[30px]"></th>
            <th>Nama Produk</th>
            <th>Satuan</th>
            <th className="text-right">Jumlah</th>
            <th className="text-right min-w-[100px]">Harga</th>
            <th className="text-right min-w-[100px]">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, i) => (
            <tr key={i} className={selectedProduct === i ? `bg-primary-content` : ''}>
              <td
                className={product.type === 'price' ? '' : 'text-warning'}
                onClick={() => changeType(i)}
              >
                {i + 1}
              </td>
              <td onClick={() => setSelectedProduct(i)}>{product.name}</td>
              <td>{product.unit}</td>
              <td>
                <input
                  data-index={i}
                  data-name={`quantity-${i}`}
                  className="input input-ghost w-full input-sm text-right p-0"
                  placeholder="Jumlah produk..."
                  value={toRupiah(product.quantity)}
                  onChange={changeQuantity}
                />
              </td>
              <td>
                <input
                  readOnly={role === 'CASHIER' ? true : false}
                  data-name={`price-${i}`}
                  data-index={i}
                  className="input input-ghost w-full input-sm text-right p-0"
                  placeholder="Harga produk..."
                  value={toRupiah(product.price)}
                  onChange={changePrice}
                />
              </td>
              <td className="text-right">
                <input
                  className="input input-ghost w-full input-sm text-right p-0"
                  placeholder="Total harga..."
                  readOnly
                  value={toRupiah(product.total)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
