import { ChangeEvent, useCallback } from 'react';

import { Input, Button } from '../../../../components';
import { toRupiah, rupiahToInt } from '../../../../utilities';

interface FormProductStockProps {
  payload: any;
  errorPayload: any;
  unitSelected: string[];

  setErrorPayload: (error: any) => void;
  setPayload: (data: PayloadCreateProduct) => void;
}

const FormProductStock: React.FC<FormProductStockProps> = (props) => {
  const { payload, unitSelected, errorPayload, setErrorPayload, setPayload } = props;

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.dataset.name;
      const index = Number(e.target.dataset.index);
      const value = e.target.value;

      if (name === 'stock') {
        setErrorPayload({
          ...errorPayload,
          [`stock_detail[${index}].stock`]: '',
        });
        setPayload({
          ...payload,
          stock_detail: payload.stock_detail.map(
            (item: PayloadCreateProduct['stock_detail'][0], i: number) => ({
              ...item,
              stock: i === index ? rupiahToInt(value!) : item.stock,
            })
          ),
        });
      } else if (name === 'capital') {
        setErrorPayload({
          ...errorPayload,
          [`stock_detail[${index}].capital`]: '',
        });
        setPayload({
          ...payload,
          stock_detail: payload.stock_detail.map(
            (item: PayloadCreateProduct['stock_detail'][0], i: number) => ({
              ...item,
              capital: i === index ? rupiahToInt(value!) : item.capital,
            })
          ),
        });
      }
    },
    [payload, errorPayload]
  );

  const addDetailStock = useCallback(() => {
    setPayload({
      ...payload,
      stock_detail: [...payload.stock_detail, { stock: 0, capital: 0 }],
    });
  }, [payload]);

  const deleteStock = useCallback(
    (i: number) => {
      setPayload({
        ...payload,
        stock_detail: payload.stock_detail.filter((_item: any, ind: number) => ind !== i),
      });
    },
    [payload]
  );

  if (payload.unit_detail[0])
    return (
      <>
        <h6 className="mb-0">Detil Info Satuan</h6>

        {payload.stock_detail.map((item: any, i: number) => (
          <div
            className="flex flex-col items-start laptop:flex-row laptop:items-center gap-2"
            key={i}
          >
            <Input
              inputSize="sm"
              type="text"
              data-name="stock"
              data-index={i}
              placeholder={`Jumlah stok dalam satuan ${
                unitSelected[unitSelected.length - 1]
              }`}
              autoComplete="off"
              value={toRupiah(item.stock, false)}
              error={errorPayload[`stock_detail[${i}].stock`]}
              onChange={handleChangeInput}
            />
            <Input
              inputSize="sm"
              type="text"
              data-name="capital"
              data-index={i}
              placeholder={`Harga modal dalam satuan ${
                unitSelected[unitSelected.length - 1]
              }`}
              autoComplete="off"
              value={toRupiah(item.capital, false)}
              error={errorPayload[`stock_detail[${i}].capital`]}
              onChange={handleChangeInput}
            />
            <Button size="sm" color="error" onClick={() => deleteStock(i)}>
              Hapus
            </Button>
          </div>
        ))}

        <span className="link link-primary" onClick={addDetailStock}>
          Tambah info stok
        </span>
      </>
    );
};

export default FormProductStock;
