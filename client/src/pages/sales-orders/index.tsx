import { Link } from 'react-router-dom';
import { IoMdPrint } from 'react-icons/io';
import { TbHomeFilled } from 'react-icons/tb';
import { MdOutlinePayment } from 'react-icons/md';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FaBluetooth, FaUsb } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

import Header from './header';
import Options from './options';
import PayModals from './pay-modals';
import CartTable from './cart-table';
import DraftModals from './draft-modals';
import PriceDetail from './price-detail';
import ModalsProducts from './modals-products';
import FormAddProduct from './form-add-product';
import { Draft, ProductCart } from './interface';
import { mySwal, toRupiah } from '../../utilities';
import { handleOnkeydown } from './event-keyboard';
import { Button, Getting } from '../../components';
import { getAllCustomer } from '../../api/customers';
import { signOut as apiSignOut } from '../../api/auth';
import { setPrinter, signOut } from '../../redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const SalesOrders = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.user.role);
  const printer = useAppSelector((state) => state.user.printer);

  const [getting, setGetting] = useState(true);
  const [draft, setDraft] = useState<Draft[]>([]);
  const [cart, setCart] = useState<ProductCart[]>([]);
  const [customerId, setCustomerId] = useState(0);
  const [customers, setCustomers] = useState<SelectValue[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number>(0);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await getAllCustomer({ limit: 0 });
        setCustomers(
          data.map((cust) => ({
            value: cust.id,
            label: cust.full_name + ` (${cust.address})`,
          }))
        );
      } catch (error: any) {
        mySwal.fire({ titleText: error.message, icon: 'error' });
      }

      setGetting(false);
    };

    const printer = localStorage.getItem('printer');

    if (printer === 'USB' || printer === 'Bluetooth') dispatch(setPrinter(printer));

    getAll();
  }, []);

  // fungsi hendle key down
  useEffect(() => {
    document.onkeydown = handleOnkeydown(selectedProduct, setSelectedProduct);
  }, [selectedProduct]);

  const getTotal = useCallback((): number => {
    const total = cart.reduce((acc, product) => acc + product.total, 0);
    return total;
  }, [cart]);

  const pay = useCallback(() => {
    (window as any)['pay-modals'].showModal();
    const form = document.querySelector(`#form-pay`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).select();
  }, []);

  const settingPrinter = useCallback((opt: 'USB' | 'Bluetooth') => {
    localStorage.setItem('printer', opt);

    dispatch(setPrinter(opt));
  }, []);

  const handleSignOut = useCallback(async () => {
    mySwal.fire({
      title: `Keluar dari akun`,
      text: 'Anda yakin ingin keluar?',
      icon: 'question',
      confirmButtonText: 'Ya, keluar',
      denyButtonText: 'Tidak',
      showDenyButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !mySwal.isLoading(),
      preConfirm: () => {
        return (async () => {
          try {
            await apiSignOut();
            dispatch(signOut());
          } catch (error: any) {
            mySwal.showValidationMessage(error.message);
          }
        })();
      },
    });
  }, []);

  return (
    <>
      {getting && <Getting />}

      <div className="h-screen gap-2 flex flex-col">
        <Header
          customers={customers}
          customerId={customerId}
          setCustomerId={setCustomerId}
        />

        {/* input add product and total price cart */}
        <div className="flex flex-col-reverse tablet:flex-row px-2 gap-2">
          <FormAddProduct
            cart={cart}
            setCart={setCart}
            setGetting={setGetting}
            setSelectedProduct={setSelectedProduct}
          />
          <div className="p-4 bg-base-200 flex-1 rounded-md flex flex-col">
            <h5 className="my-0 hidden tablet:block">Total Belanja</h5>
            <h1 className="my-0 text-right self-end">Rp. {toRupiah(getTotal())}</h1>
          </div>
        </div>

        {/* Bagian Bawah */}
        <div className="px-4 bg-base-200 flex-1 flex flex-col">
          <Options
            cart={cart}
            draft={draft}
            customerId={customerId}
            selectedProduct={selectedProduct}
            setCart={setCart}
            setDraft={setDraft}
            setCustomerId={setCustomerId}
          />

          <div className="flex-1 flex gap-2 max-h-[calc(100vh-374px)] tablet:max-h-[calc(100vh-330px)]">
            <CartTable
              cart={cart}
              selectedProduct={selectedProduct}
              setCart={setCart}
              setSelectedProduct={setSelectedProduct}
            />

            <PriceDetail getTotal={getTotal} />
          </div>

          {/* logout and pay */}
          <div className="flex items-center gap-2 py-2">
            <div className="flex-1">
              {role === 'CASHIER' ? (
                <Button color="ghost" size="sm" onClick={handleSignOut}>
                  <AiOutlinePoweroff size={25} />
                </Button>
              ) : (
                <Link to="/dashboard">
                  <Button color="ghost" size="sm">
                    <TbHomeFilled size={25} />
                  </Button>
                </Link>
              )}

              <div className="dropdown dropdown-top">
                <Button color="ghost" size="sm">
                  <IoMdPrint size={25} />
                </Button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li onClick={() => settingPrinter('Bluetooth')}>
                    <a className={printer === 'Bluetooth' ? 'text-primary' : ''}>
                      <FaBluetooth size={15} /> Bluetooth
                    </a>
                  </li>
                  <li onClick={() => settingPrinter('USB')}>
                    <a className={printer === 'USB' ? 'text-primary' : ''}>
                      <FaUsb size={15} /> USB
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-40 laptop:w-64">
              <Button id="pay" color="primary" block onClick={pay}>
                <MdOutlinePayment size={17} />
                Bayar{' '}
                <kbd className="kbd kbd-xs text-primary hidden laptop:block">F12</kbd>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ModalsProducts
        cart={cart}
        setCart={setCart}
        setGetting={setGetting}
        setSelectedProduct={setSelectedProduct}
      />

      {/* modals draft */}
      <DraftModals
        draft={draft}
        setCart={setCart}
        setCustomerId={setCustomerId}
        setDraft={setDraft}
      />

      <PayModals
        getTotal={getTotal}
        cart={cart}
        customerId={customerId}
        setCart={setCart}
        setCustomerId={setCustomerId}
        setGetting={setGetting}
        printerCon={printer}
      />
    </>
  );
};

export default SalesOrders;
