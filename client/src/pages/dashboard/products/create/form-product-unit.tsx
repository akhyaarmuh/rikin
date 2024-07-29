import { ChangeEvent, KeyboardEvent, useCallback } from 'react';

import { Input } from '../../../../components';
import { toRupiah, rupiahToInt } from '../../../../utilities';

interface FormProductUnitProps {
  payload: any;
  errorPayload: any;
  unitSelected: string[];

  setErrorPayload: (error: any) => void;
  setPayload: (data: PayloadCreateProduct) => void;
}

const FormProductUnit: React.FC<FormProductUnitProps> = (props) => {
  const { payload, errorPayload, unitSelected, setErrorPayload, setPayload } = props;

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.dataset.name;
      const index = Number(e.target.dataset.index);
      const value = e.target.value;

      if (name === 'quantity') {
        setErrorPayload({
          ...errorPayload,
          [`unit_detail[${index}].quantity`]: '',
        });
        setPayload({
          ...payload,
          unit_detail: payload.unit_detail.map(
            (item: PayloadCreateProduct['unit_detail'][0], i: number) => ({
              ...item,
              quantity: i === index ? rupiahToInt(value) : item.quantity,
            })
          ),
        });
      } else if (name === 'code') {
        setErrorPayload({ ...errorPayload, [`unit_detail[${index}].code`]: '' });
        setPayload({
          ...payload,
          unit_detail: payload.unit_detail.map(
            (item: PayloadCreateProduct['unit_detail'][0], i: number) => ({
              ...item,
              code: i === index ? value : item.code,
            })
          ),
        });
      } else if (name === 'price') {
        setErrorPayload({
          ...errorPayload,
          [`unit_detail[${index}].price`]: '',
        });
        setPayload({
          ...payload,
          unit_detail: payload.unit_detail.map(
            (item: PayloadCreateProduct['unit_detail'][0], i: number) => ({
              ...item,
              price: i === index ? rupiahToInt(value) : item.price,
            })
          ),
        });
      } else if (name === 'sale_price') {
        setErrorPayload({
          ...errorPayload,
          [`unit_detail[${index}].sale_price`]: '',
        });
        setPayload({
          ...payload,
          unit_detail: payload.unit_detail.map(
            (item: PayloadCreateProduct['unit_detail'][0], i: number) => ({
              ...item,
              sale_price: i === index ? rupiahToInt(value) : item.sale_price,
            })
          ),
        });
      }
    },
    [errorPayload, payload]
  );

  if (payload.unit_detail[0])
    return (
      <>
        <h6 className="mb-0">Detil Satuan</h6>
        {payload.unit_detail.map((item: any, i: number) => (
          <div className="flex flex-col laptop:flex-row gap-2" key={i}>
            <Input
              inputSize="sm"
              type="text"
              data-name="quantity"
              data-index={i}
              disabled={i === 0 ? true : false}
              placeholder={`Berapa ${unitSelected[0]} dalam ${unitSelected[i]}`}
              autoComplete="off"
              value={toRupiah(item.quantity, false)}
              error={errorPayload[`unit_detail[${i}].quantity`]}
              onChange={handleChangeInput}
            />
            <Input
              inputSize="sm"
              type="text"
              data-name="code"
              data-index={i}
              placeholder={`Kode produk (${unitSelected[i]})`}
              autoComplete="off"
              value={item.code}
              error={errorPayload[`unit_detail[${i}].code`]}
              onChange={handleChangeInput}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
            />
            <Input
              inputSize="sm"
              type="text"
              data-name="price"
              data-index={i}
              placeholder={`Harga jual (${unitSelected[i]})`}
              autoComplete="off"
              value={toRupiah(item.price, false)}
              error={errorPayload[`unit_detail[${i}].price`]}
              onChange={handleChangeInput}
            />
            <Input
              inputSize="sm"
              type="text"
              data-name="sale_price"
              data-index={i}
              placeholder={`Harga partai (${unitSelected[i]})`}
              autoComplete="off"
              value={toRupiah(item.sale_price, false)}
              error={errorPayload[`unit_detail[${i}].sale_price`]}
              onChange={handleChangeInput}
            />
          </div>
        ))}
      </>
    );
};

export default FormProductUnit;
