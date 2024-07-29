import { IoMdAdd } from 'react-icons/io';
import { MultiValue, SingleValue } from 'react-select';
import { FormEvent, useCallback, useState } from 'react';

import FormProduct from './form-product';
import FormProductUnit from './form-product-unit';
import FormProductStock from './form-product-stock';
import { Button, Modals } from '../../../../components';
import { createProduct } from '../../../../api/products';

const initialPayload: PayloadCreateProduct = {
  name: '',
  category_id: 0,
  description: '',
  min_stock: 0,
  unit_detail: [],
  stock_detail: [],
};
const initialError = {
  name: '',
  category_id: '',
  description: '',
  min_stock: '',
};
const idModals = 'create-product-modals';
const idForm = 'create-product-form';
const handleModals = (action: 'open' | 'close') => {
  if (action === 'open') {
    (window as any)[idModals].showModal();

    const form = document.querySelector(`#${idForm}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  } else {
    (window as any)[idModals].close();
  }
};

interface CreateProps {
  units: SelectValue[];
  categories: SelectValue[];
  fetchData: () => Promise<void>;
}

const Create: React.FC<CreateProps> = ({ units, categories, fetchData }) => {
  const [category, setCategory] = useState<SingleValue<SelectValue>>(null);
  const [unit, setUnit] = useState<MultiValue<SelectValue>>([]);

  const [payload, setPayload] = useState(initialPayload);
  const [errorPayload, setErrorPayload] = useState<any>(initialError);
  const [unitSelected, setUnitSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await createProduct(payload);
        await fetchData();
        handleModals('close');
        setPayload(initialPayload);
        setErrorPayload(initialError);
        setErrorMessage('');
        setCategory(null);
        setUnit([]);
      } catch (error: any) {
        if (error.statusCode === 422) setErrorPayload({ ...errorPayload, ...error.data });
        else setErrorMessage(error.message);
      }

      setIsSubmitting(false);
    },
    [payload]
  );

  return (
    <>
      <Button
        size="sm"
        color="primary"
        onClick={() => {
          setErrorMessage('');
          handleModals('open');
        }}
      >
        <IoMdAdd size={20} />
        Produk
      </Button>

      <Modals idModals={idModals} isSubmitting={isSubmitting}>
        <h3>Tambah Produk</h3>

        <form id={idForm} onSubmit={handleSubmit}>
          <FormProduct
            isSubmitting={isSubmitting}
            payload={payload}
            errorPayload={errorPayload}
            categories={categories}
            category={category}
            setCategory={setCategory}
            setErrorPayload={setErrorPayload}
            setPayload={setPayload}
            setUnit={setUnit}
            setUnitSelected={setUnitSelected}
            unit={unit}
            units={units}
          />

          <FormProductUnit
            payload={payload}
            errorPayload={errorPayload}
            unitSelected={unitSelected}
            setPayload={setPayload}
            setErrorPayload={setErrorPayload}
          />

          <FormProductStock
            payload={payload}
            errorPayload={errorPayload}
            unitSelected={unitSelected}
            setPayload={setPayload}
            setErrorPayload={setErrorPayload}
          />

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div className="modal-action">
            <Button size="sm" color="primary" disabled={isSubmitting}>
              Simpan
            </Button>
          </div>
        </form>
      </Modals>
    </>
  );
};

export default Create;
