import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { ProductCart } from './interface';
import { useAppSelector } from '../../redux/hooks';
import { printOrders } from '../../utilities/printer';
import { Button, Input, Modals } from '../../components';
import { USBPrinter, BtPrinter } from '../../utilities/escpos';
import { mySwal, rupiahToInt, toRupiah } from '../../utilities';

interface PayModalsProps {
  customerId: number;
  cart: ProductCart[];
  printerCon: 'USB' | 'Bluetooth' | null;

  getTotal: () => number;
  setCustomerId: (id: number) => void;
  setGetting: (status: boolean) => void;
  setCart: (cart: ProductCart[]) => void;
}

const PayModals: React.FC<PayModalsProps> = (props) => {
  const { customerId, cart, printerCon, ...rest } = props;

  const shop = useAppSelector((state) => state.user.shop);
  const cashier_name = useAppSelector((state) => state.user.full_name);

  const [pay, setPay] = useState(0);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isPrint, setIsPrint] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const changeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setPay(rupiahToInt(e.target.value));
  }, []); 

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!cart[0]) return;

      setIsSubmiting(true);

      try {
        if (isPrint) {
          if (!printerCon) throw new Error('Printer belum di atur');

          const printer =
            printerCon === 'USB' ? await USBPrinter.create() : await BtPrinter.create();

          const payloadPrint = { cart, shop, total: rest.getTotal(), pay, cashier_name };

          await printOrders(printer, payloadPrint);
          await printer.print();
        }

        // api save

        (window as any)['pay-modals'].close();
        if (pay - rest.getTotal() > 0)
          mySwal.fire({
            title: `Kembali: ${toRupiah(pay - rest.getTotal())}`,
            icon: 'info',
          });
        else mySwal.fire({ title: `Transaksi berhasil`, icon: 'success', timer: 1000 });

        setPay(0);
        rest.setCustomerId(0);
        rest.setCart([]);
        setErrorMessage('');
      } catch (error: any) {
        setErrorMessage(error.message);
      }

      setIsPrint(true);
      setIsSubmiting(false);
    },
    [pay, customerId, cart, isPrint, printerCon]
  );

  return (
    <Modals idModals="pay-modals" isSubmitting={isSubmiting}>
      <h3 className="font-bold text-lg mb-4">Detil Pembayaran</h3>

      <h2>Total: {toRupiah(rest.getTotal())}</h2>
      <form id="form-pay" onSubmit={handleSubmit}>
        <Input label="Jumlah Bayar" value={toRupiah(pay)} onChange={changeInput} />

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <div className="modal-action">
          <Button size="sm" color="primary" disabled={isSubmiting}>
            Cetak Struk & Simpan
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={() => setIsPrint(false)}
            disabled={isSubmiting}
          >
            Simpan
          </Button>
        </div>
      </form>
    </Modals>
  );
};

export default PayModals;
