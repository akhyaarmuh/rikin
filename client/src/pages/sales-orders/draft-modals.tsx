import React, { useCallback } from 'react';

import { Draft, ProductCart } from './interface';
import { Modals, Button } from '../../components';

interface DraftModalsProps {
  draft: Draft[];
  setCustomerId: (id: number) => void;
  setDraft: (draft: Draft[]) => void;
  setCart: (cart: ProductCart[]) => void;
}

const DraftModals: React.FC<DraftModalsProps> = (props) => {
  const { draft, setCart, setCustomerId, setDraft } = props;

  const selectDraft = useCallback(
    (i: number) => {
      setCart(draft[i].products);
      setCustomerId(draft[i].customerId);
      (window as any)['draft-modals'].close();

      setDraft(draft.filter((_d, ind) => ind !== i));
    },
    [draft]
  );

  const deleteDraft = useCallback(
    (i: number) => {
      setDraft(draft.filter((_p, ind) => ind !== i));
    },
    [draft]
  );

  return (
    <Modals idModals="draft-modals">
      <h3 className="font-bold text-lg mb-4">Daftar draft</h3>

      <div className="overflow-x-auto mt-2">
        <table className="table table-pin-rows">
          <tbody>
            {draft.map((d: Draft, i: number) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.products.length} Produk</td>
                <td className="text-right">
                  <Button size="sm" color="primary" onClick={() => selectDraft(i)}>
                    Pilih
                  </Button>
                  <span className="inline-block w-2"></span>
                  <Button size="sm" color="error" onClick={() => deleteDraft(i)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modals>
  );
};

export default DraftModals;
