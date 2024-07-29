import { IoMdAdd } from 'react-icons/io';
import { useState, ChangeEvent, FormEvent, useCallback } from 'react';

import { createCustomer } from '../../../api/customers';
import { Button, Input, Modals } from '../../../components';

const initialPayload = { full_name: '', address: '' };
const initialError = { full_name: '', address: '' };
const idForm = 'create-customer-form';
const idModals = 'create-customer-modals';
const handleModals = (action: 'open' | 'close') => {
  if (action === 'open') {
    (window as any)[idModals].showModal();

    const form = document.querySelector(`#${idForm}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).select();
  } else {
    (window as any)[idModals].close();
  }
};

interface CreateProps {
  fetchData: () => Promise<void>;
}

const Create: React.FC<CreateProps> = ({ fetchData }) => {
  const [payload, setPayload] = useState(initialPayload);
  const [errorPayload, setErrorPayload] = useState(initialError);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setErrorPayload({ ...errorPayload, [e.target.name]: '' });
      setPayload({ ...payload, [e.target.name]: e.target.value });
    },
    [payload, errorPayload]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await createCustomer(payload);
        await fetchData();
        handleModals('close');
        setPayload(initialPayload);
        setErrorMessage('');
      } catch (error: any) {
        if (error.statusCode === 422) setErrorPayload({ ...errorPayload, ...error.data });
        else setErrorMessage(error.message);
      }

      setIsSubmitting(false);
    },
    [payload, errorPayload]
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
        Pelanggan
      </Button>

      <Modals idModals={idModals} isSubmitting={isSubmitting}>
        <h3>Tambah Pelanggan</h3>

        <form id={idForm} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,_minmax(45%,_1fr))] gap-2 gap-x-4">
            <Input
              required
              type="text"
              label="Nama Lengkap"
              name="full_name"
              placeholder="Masukan nama lengkap pelanggan..."
              autoComplete="off"
              disabled={isSubmitting}
              onChange={handleChangeInput}
              value={payload.full_name}
              error={errorPayload.full_name}
            />
            <Input
              required
              type="text"
              label="Alamat"
              name="address"
              placeholder="Masukan alamat pelanggan..."
              autoComplete="off"
              disabled={isSubmitting}
              onChange={handleChangeInput}
              value={payload.address}
              error={errorPayload.address}
            />
          </div>

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
