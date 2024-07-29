import { displayDate, displayTime } from '.';
import { BtPrinter, USBPrinter } from './escpos';
import { UserState } from '../redux/user/userSlice';
import { ProductCart } from '../pages/sales-orders/interface';

type payload = {
  cart: ProductCart[];
  shop: UserState['shop'];
  total: number;
  pay: number;
  cashier_name: string;
};

const getTransactionDetail = (detail: { total: number; pay: number }) => {
  let details = [];

  // masukan detil total
  details.push({ name: 'Total', value: detail.total });

  // masukan detil pay
  if (detail.pay) details.push({ name: 'Bayar', value: detail.pay });

  // masukan detil kembali
  if (detail.pay - detail.total > 0)
    details.push({ name: 'Kembali', value: detail.pay - detail.total });

  // masukan detil sisa hutang
  if (detail.total - detail.pay > 0)
    details.push({ name: 'Sisa Hutang', value: detail.total - detail.pay });

  return details;
};

export const printOrders = async (printer: USBPrinter | BtPrinter, payload: payload) => {
  const { total, pay, shop, cashier_name, cart } = payload;

  const details = getTransactionDetail({ total, pay });

  printer
    .size('large')
    .align('center')
    .text(shop?.name || '')
    .size('normal')
    .text(shop?.address || '')
    .text(shop?.no_hp || '')
    .line('-')
    .align('right')
    .text(cashier_name)
    .text(displayDate())
    .text(displayTime())
    .align('left')
    .line('-')
    .products(cart)
    .line('-')
    .transactioDetail(details)
    .line('-')
    .align('center')
    .text(shop?.foot_note || '')
    .cut()
    .cashdraw();
};
