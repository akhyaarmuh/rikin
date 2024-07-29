import { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';

import { updateSupplierById } from '../../../api/suppliers';
import { Modals, Input, Button } from '../../../components';

const initialPayload = { name: '', address: '' };
const initialErrorPayload = { name: '', address: '' };

interface ModalsProps {
  data: Supplier;
  idForm: string;
  idModals: string;
  fetchData: () => Promise<void>;
}

const ModalsUpdate: React.FC<ModalsProps> = ({ data, fetchData, idModals, idForm }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorPayload, setErrorPayload] = useState(initialErrorPayload);
  const [payload, setPayload] = useState<PayloadUpdateSupplier>(initialPayload);

  useEffect(() => {
    setErrorMessage('');
    setErrorPayload(initialErrorPayload);

    setPayload({
      name: data.name,
      address: data.address,
    });
  }, [data]);

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setErrorPayload({ ...errorPayload, [e.target.name]: '' });
      setPayload({ ...payload, [e.target.name]: e.target.value });
    },
    [payload, errorPayload]
  );

  const handleUpdate = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await updateSupplierById(data.id, payload);
        await fetchData();
        (window as any)[idModals].close();
      } catch (error: any) {
        if (error.statusCode === 422) setErrorPayload({ ...errorPayload, ...error.data });
        else setErrorMessage(error.message);
      }

      setIsSubmitting(false);
    },
    [data, payload, errorPayload]
  );

  return (
    <Modals idModals={idModals} isSubmitting={isSubmitting}>
      <h3 className="font-bold text-lg mb-4">Ubah Data Pelanggan</h3>

      <form id={idForm} onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,_minmax(45%,_1fr))] gap-2 gap-x-4">
          <Input
            type="text"
            label="Nama Agen"
            name="name"
            placeholder="Masukan nama agen..."
            autoComplete="off"
            required
            disabled={isSubmitting}
            value={payload.name}
            error={errorPayload.name}
            onChange={handleChangeInput}
          />
          <Input
            type="text"
            label="Alamat"
            name="address"
            placeholder="Masukan alamat agen..."
            autoComplete="off"
            required
            disabled={isSubmitting}
            value={payload.address}
            error={errorPayload.address}
            onChange={handleChangeInput}
          />
        </div>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <div className="modal-action">
          <Button size="sm" color="primary" disabled={isSubmitting}>
            Ubah
          </Button>
        </div>
      </form>
    </Modals>
  );
};

export default ModalsUpdate;
