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
import { getAllProduct } from '../../../api/products';
import { getAllCategory } from '../../../api/categories';
import { getAllUnit } from '../../../api/units';

const idFormUpdate = 'update-product-form';
const idModalsUpdate = 'update-product-modals';
const initialDataSelected = {
  id: 0,
  name: '',
  description: null,
  min_stock: null,
  category: {
    id: 0,
    name: '',
  },
  product_unit_details: [],
  product_stock_details: [],
};

const Categories = () => {
  const [params, setParams] = useSearchParams();

  const [units, setUnits] = useState<SelectValue[]>([]);
  const [categories, setCategories] = useState<SelectValue[]>([]);

  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [data, setData] = useState<Product[]>([]);
  const [dataSelected, setDataSelected] = useState<Product>(initialDataSelected);

  const [queries, setQueries] = useState<any>({
    category_id: params.get('category_id') || '',
    name: params.get('name') || '',
    code: params.get('code') || '',
    limit: 20,
    page: Number(params.get('page')) || 1,
  });

  useEffect(() => {
    const fetchAll = async () => {
      const { data: cat } = await getAllCategory({ limit: 0 });
      const categories = cat.map((item) => ({ label: item.name, value: item.id }));
      setCategories(categories);

      const { data: unt } = await getAllUnit({ limit: 0 });
      const units = unt.map((item) => ({ label: item.name, value: item.id }));
      setUnits(units);
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      await getProducts();
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

  const getProducts = useCallback(async () => {
    try {
      const { data, rows, pages } = await getAllProduct(queries);
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

  const showModalsUpdate = useCallback((data: Product) => {
    setDataSelected(data);
    (window as any)[idModalsUpdate].show();

    const form = document.querySelector(`#${idFormUpdate}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).select();
  }, []);

  return (
    <>
      <Create categories={categories} units={units} fetchData={getProducts} />

      <Table params={params} categories={categories} changeQueries={changeQueries}>
        {data.map((item, i) => (
          <tr key={item.id}>
            <td>{toRupiah((queries.page - 1) * queries.limit + i + 1)}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.category.name}</td>
            <td className="flex justify-end gap-1">
              <Button
                outline
                color="info"
                size="xs"
                onClick={() => showModalsUpdate(item)}
              >
                <FaEdit />
              </Button>
              <Delete id={item.id} name={item.name} fetchData={getProducts} />
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
        categories={categories}
        fetchData={getProducts}
        idModals={idModalsUpdate}
        idForm={idFormUpdate}
      />
    </>
  );
};

export default Categories;
