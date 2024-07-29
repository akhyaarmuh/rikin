import { useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';

import { mySwal } from '../../../utilities';
import { Button } from '../../../components';
import { deleteUnitById } from '../../../api/units';

interface DeleteProps {
  id: number;
  name: string;
  fetchData: () => Promise<void>;
}

const Delete: React.FC<DeleteProps> = ({ id, name, fetchData }) => {
  const handleDelete = useCallback(() => {
    mySwal
      .fire({
        title: `Satuan '${name}' akan dihapus`,
        text: 'Anda yakin akan melanjutkannya?',
        icon: 'question',
        confirmButtonText: 'Ya, hapus',
        denyButtonText: 'Tidak',
        showDenyButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !mySwal.isLoading(),
        preConfirm: () => {
          return (async () => {
            try {
              await deleteUnitById(id);
              await fetchData();
            } catch (error: any) {
              mySwal.showValidationMessage(error.message);
            }
          })();
        },
      })
      .then((res) => {
        if (res.isConfirmed) {
          mySwal.fire({
            icon: 'success',
            title: 'Satuan berhasil dihapus',
            timer: 1500,
          });
        }
      });
  }, []);

  return (
    <Button outline color="error" size="xs" onClick={handleDelete}>
      <FaTrash />
    </Button>
  );
};

export default Delete;
