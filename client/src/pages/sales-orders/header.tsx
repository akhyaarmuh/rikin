import { ChangeEvent, useCallback } from 'react';

import { displayDate } from '../../utilities';

interface HeaderProps {
  customerId: number;
  customers: SelectValue[];
  setCustomerId: (id: number) => void;
}

const Header: React.FC<HeaderProps> = ({ customers, customerId, setCustomerId }) => {
  const changeCustomer = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setCustomerId(Number(e.target.value)),
    []
  );

  return (
    <div className="border-b-4 border-primary h-[96px] laptop:gap-[350px] px-2 flex bg-base-300">
      <img
        src="/nw.png"
        alt="logo"
        className="self-center hidden laptop:block filter drop-shadow w-[125px]"
      />

      <div className="flex self-center gap-4 w-screen justify-end">
        <div className="px-4 laptop:border-r-2 flex-1 border-base-content">
          <p className="mb-2 text-right">Pelanggan</p>
          <select
            className="select select-bordered select-sm w-full font-normal"
            onChange={changeCustomer}
            value={customerId}
          >
            <option value="">Umum</option>
            {customers.map((customer, i) => (
              <option value={customer.value} key={i}>
                {customer.label}
              </option>
            ))}
          </select>
        </div>
        <div className="px-4 border-r-2 border-base-content hidden laptop:block">
          <p className="mb-2 text-right">Tanggal</p>
          <h5 className="text-right my-0">{displayDate()}</h5>
        </div>
        <div className="flex-1 px-4 border-r-2 border-base-content hidden laptop:block">
          <p className="mb-2 text-right">No. Penjualan</p>
          <h5 className="text-right my-0">Otomatis</h5>
        </div>
        <div className="px-4 hidden laptop:block">
          <p className="mb-2 text-right">Kasir</p>
          <h5 className="text-right my-0 max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
            Muhammad Akhyar
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
