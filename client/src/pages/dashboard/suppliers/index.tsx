import { FaEdit } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import Table from './table';
import Create from './create';
import Delete from './delete';
import Pagination from './pagination';
import ModalsUpdate from './modals-update';
import { Button } from '../../../components';
import { mySwal, toRupiah } from '../../../utilities';
import { getAllSupplier } from '../../../api/suppliers';

const idFormUpdate = 'update-supplier-form';
const idModalsUpdate = 'update-supplier-modals';
const initialDataSelected = {
  id: 0,
  name: '',
  address: '',
  created_at: '',
  updated_at: '',
};

const Suppliers = () => {
  const [params, setParams] = useSearchParams();

  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [data, setData] = useState<Supplier[]>([]);
  const [dataSelected, setDataSelected] = useState<Supplier>(initialDataSelected);

  const [queries, setQueries] = useState<any>({
    name: params.get('name') || '',
    limit: 20,
    page: Number(params.get('page')) || 1,
  });

  useEffect(() => {
    const fetchAll = async () => {
      await getSuppliers();
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

  const getSuppliers = useCallback(async () => {
    try {
      const { data, rows, pages } = await getAllSupplier(queries);
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

  const showModalsUpdate = useCallback((data: Supplier) => {
    setDataSelected(data);
    (window as any)[idModalsUpdate].show();

    const form = document.querySelector(`#${idFormUpdate}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).select();
  }, []);

  return (
    <>
      <Create fetchData={getSuppliers} />

      <Table params={params} changeQueries={changeQueries}>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{toRupiah((queries.page - 1) * queries.limit + i + 1)}</td>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td className="flex justify-end gap-1">
              <Button
                outline
                color="info"
                size="xs"
                onClick={() => showModalsUpdate(item)}
              >
                <FaEdit />
              </Button>
              <Delete id={item.id} name={item.name} fetchData={getSuppliers} />
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
        fetchData={getSuppliers}
        idModals={idModalsUpdate}
        idForm={idFormUpdate}
      />
    </>
  );
};

export default Suppliers;
