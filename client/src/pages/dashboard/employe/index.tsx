import { FaEdit } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import Table from './table';
import Create from './create';
import Delete from './delete';
import Pagination from './pagination';
import ModalsUpdate from './modals-update';
import { Button } from '../../../components';
import { getAllEmploye } from '../../../api/employe';
import { mySwal, toRupiah } from '../../../utilities';

const idFormUpdate = 'update-employe-form';
const idModalsUpdate = 'update-employe-modals';
const initialDataSelected: Employe = {
  id: 0,
  full_name: '',
  email: '',
  role: 'CASHIER',
  status: false,
  created_at: '',
  updated_at: '',
};

const Employe = () => {
  const [params, setParams] = useSearchParams();

  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [data, setData] = useState<Employe[]>([]);
  const [dataSelected, setDataSelected] = useState<Employe>(initialDataSelected);

  const [queries, setQueries] = useState<any>({
    name: params.get('full_name') || '',
    limit: 20,
    page: Number(params.get('page')) || 1,
  });

  useEffect(() => {
    const fetchAll = async () => {
      await getEmploye();
    };

    for (const property in queries) {
      if (queries[property]) {
        params.set(property, queries[property]);
      } else {
        params.delete(property);
      }
    }
    setParams(params);

    fetchAll();
  }, [queries]);

  const getEmploye = useCallback(async () => {
    try {
      const { data, rows, pages } = await getAllEmploye(queries);
      setData(data);
      setRows(rows);
      setPages(pages);
    } catch (error: any) {
      mySwal.fire({ titleText: error.message, icon: 'error' });
    }
  }, [queries]);

  const changeQueries = useCallback(
    (key: string, value: string | number) => {
      if (key === 'page') {
        setQueries({ ...queries, page: value });
      } else setQueries({ ...queries, [key]: value, page: 1 });
    },
    [queries]
  );

  const showModalsUpdate = useCallback((data: Employe) => {
    setDataSelected(data);
    (window as any)[idModalsUpdate].show();

    const form = document.querySelector(`#${idFormUpdate}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  }, []);

  return (
    <>
      <Create fetchData={getEmploye} />

      <Table params={params} changeQueries={changeQueries}>
        {data.map((item, i) => (
          <tr key={item.id}>
            <td>{toRupiah((queries.page - 1) * queries.limit + i + 1)}</td>
            <td>{item.full_name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>{item.status ? 'Aktif' : 'Tidak Aktif'}</td>
            <td className="flex justify-end gap-1">
              <Button
                outline
                color="info"
                size="xs"
                onClick={() => showModalsUpdate(item)}
              >
                <FaEdit />
              </Button>
              <Delete id={item.id} name={item.full_name} fetchData={getEmploye} />
            </td>
          </tr>
        ))}
      </Table>

      <Pagination
        page={queries.page}
        pages={pages}
        rows={rows}
        setPage={(toPage) => changeQueries('page', toPage)}
      />

      <ModalsUpdate
        data={dataSelected}
        fetchData={getEmploye}
        idModals={idModalsUpdate}
        idForm={idFormUpdate}
      />
    </>
  );
};

export default Employe;
