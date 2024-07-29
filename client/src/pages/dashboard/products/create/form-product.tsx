import { ChangeEvent, useCallback } from 'react';
import { GroupBase, MultiValue, SingleValue } from 'react-select';

import { Input, MySelect } from '../../../../components';
import { toRupiah, rupiahToInt } from '../../../../utilities';

interface FormProductProps {
  errorPayload: any;
  isSubmitting: boolean;
  payload: PayloadCreateProduct;

  categories: SelectValue[];
  units: SelectValue[];
  category: SingleValue<SelectValue>;
  unit: MultiValue<SelectValue>;

  setCategory: (value: SingleValue<SelectValue>) => void;
  setUnit: (value: MultiValue<SelectValue>) => void;
  setUnitSelected: (value: string[]) => void;

  setErrorPayload: (error: any) => void;
  setPayload: (data: PayloadCreateProduct) => void;
}

const FormProduct: React.FC<FormProductProps> = (props) => {
  const { errorPayload, isSubmitting, payload, categories, units, ...rest } = props;

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;

      rest.setErrorPayload({ ...errorPayload, [name]: '' });

      if (name === 'min_stock') {
        rest.setPayload({ ...payload, [name]: rupiahToInt(value) });
      } else rest.setPayload({ ...payload, [name]: value });
    },
    [payload, errorPayload]
  );

  const handelChangeCategory = useCallback(
    (e: SingleValue<SelectValue>) => {
      rest.setErrorPayload({ ...errorPayload, category_id: '' });

      if (e) {
        rest.setPayload({ ...payload, category_id: Number(e.value) });
        rest.setCategory(e);
      } else {
        rest.setPayload({ ...payload, category_id: 0 });
        rest.setCategory(e);
      }
    },
    [errorPayload, payload]
  );

  const handelChangeUnit = useCallback(
    (e: MultiValue<SelectValue>) => {
      rest.setUnit(e);
      rest.setUnitSelected(e.map((item) => item.label));

      rest.setPayload({
        ...payload,
        unit_detail: e.map((item, i) => ({
          unit_id: Number(item.value),
          code: '',
          quantity: !i ? 1 : 0,
          price: 0,
          sale_price: 0,
        })),
      });
    },
    [payload]
  );

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,_minmax(45%,_1fr))] gap-2 gap-x-4">
      <Input
        required
        type="text"
        label="Nama"
        name="name"
        placeholder="Masukan nama produk..."
        autoComplete="off"
        disabled={isSubmitting}
        onChange={handleChangeInput}
        value={payload.name}
        error={errorPayload.name}
      />
      <MySelect<SelectValue>
        label="Kategori"
        name="category"
        required
        placeholder="Pilih kategori produk..."
        options={categories}
        value={rest.category}
        error={errorPayload.category_id}
        onChange={handelChangeCategory}
      />
      <Input
        type="text"
        label="Keterangan"
        name="description"
        placeholder="Keterangan produk..."
        autoComplete="off"
        disabled={isSubmitting}
        onChange={handleChangeInput}
        value={payload.description}
        error={errorPayload.description}
      />
      <Input
        type="text"
        label="Minimal Stok"
        name="min_stock"
        placeholder="Minimal stok dalam satuan  terkecil..."
        autoComplete="off"
        disabled={isSubmitting}
        onChange={handleChangeInput}
        value={toRupiah(payload.min_stock, false)}
        error={errorPayload.min_stock}
      />

      <MySelect<SelectValue, true, GroupBase<SelectValue>>
        name="unit"
        required
        label="Satuan Jual"
        placeholder="Pilih satuan jual produk..."
        isMulti
        options={units}
        value={rest.unit}
        error={errorPayload.category_id}
        onChange={handelChangeUnit}
      />
    </div>
  );
};

export default FormProduct;
