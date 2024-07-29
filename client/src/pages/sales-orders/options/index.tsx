import { useCallback } from 'react';
import { FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoMdPricetag } from 'react-icons/io';
import { MdLooksOne, MdShoppingCart } from 'react-icons/md';

import { Draft, ProductCart } from '../interface';
import OptionButton from './option-button';

interface OptionsProps {
  draft: Draft[];
  customerId: number;
  cart: ProductCart[];
  selectedProduct: number;
  setDraft: (draft: Draft[]) => void;
  setCustomerId: (id: number) => void;
  setCart: (cart: ProductCart[]) => void;
}

const Options: React.FC<OptionsProps> = (props) => {
  const { cart, selectedProduct, setCart, customerId, draft, setDraft, setCustomerId } =
    props;

  const newCart = useCallback(() => {
    setCart([]);
  }, []);

  const selectQuantityInput = useCallback(() => {
    const input = document.querySelector(
      `[data-name="quantity-${selectedProduct}"]`
    ) as HTMLInputElement;
    if (input) input.select();
  }, [selectedProduct]);

  const selectPriceInput = useCallback(() => {
    const input = document.querySelector(
      `[data-name="price-${selectedProduct}"]`
    ) as HTMLInputElement;
    if (input) input.select();
  }, [selectedProduct]);

  const deleteProduct = useCallback(() => {
    setCart(cart.filter((_product, i) => i !== selectedProduct));
  }, [selectedProduct, cart]);

  const saveToDraft = useCallback(() => {
    if (cart.length === 0) return;

    setDraft([...draft, { customerId, products: cart }]);
    setCustomerId(0);
    setCart([]);
  }, [customerId, cart, draft]);

  const openDraft = useCallback(() => {
    (window as any)['draft-modals'].showModal();
  }, []);

  return (
    <div className="hide-scroll hidden tablet:flex py-2 overflow-x-auto">
      <OptionButton
        id="new-cart"
        br
        onClick={newCart}
        icon={<MdShoppingCart size={17} />}
        label="Keranjang Baru"
        kbd="F4"
      />
      <OptionButton
        id="select-quantity"
        br
        onClick={selectQuantityInput}
        icon={<MdLooksOne size={17} />}
        label="Jumlah"
        kbd="F2"
      />
      <OptionButton
        id="select-price"
        br
        onClick={selectPriceInput}
        icon={<IoMdPricetag size={17} />}
        label="Harga"
        kbd="F3"
      />
      <OptionButton
        id="delete-product"
        br
        onClick={deleteProduct}
        icon={<MdDelete size={17} />}
        label="Hapus"
        kbd="delete"
      />
      <OptionButton
        id="draft"
        br
        onClick={saveToDraft}
        icon={<FaSave size={17} />}
        label="Draf"
        kbd="ctrl+D"
      />
      <OptionButton
        id="open-draft"
        onClick={openDraft}
        icon={<FaSave size={17} />}
        label="Buka Draf"
        kbd="ctrl+O"
      />
    </div>
  );
};

export default Options;
