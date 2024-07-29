import { useState, ChangeEvent, KeyboardEvent, useCallback } from 'react';

interface TableProps {
  params: URLSearchParams;
  categories: SelectValue[];
  children: React.ReactNode;
  changeQueries: (key: string, value: string | number) => void;
}

const Table: React.FC<TableProps> = ({ params, categories, changeQueries, children }) => {
  const [queries, setQueries] = useState<any>({
    category_id: params.get('category_id') || '',
    name: params.get('name') || '',
    code: params.get('code') || '',
  });

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQueries({ ...queries, [e.target.name]: e.target.value });
    },
    [queries]
  );

  const handleChangeCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setQueries({ ...queries, category_id: value });

      changeQueries('category_id', value);
    },
    [queries]
  );

  const handleKeydownInput = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.currentTarget.name;
      if (e.key === 'Enter') changeQueries(e.currentTarget.name, queries[key]);
    },
    [queries]
  );

  return (
    <div className="overflow-x-auto mt-2">
      <table className="table table-pin-rows">
        <thead>
          <tr>
            <th></th>
            <th>
              <input
                className="input input-bordered input-sm w-full font-normal"
                autoComplete="off"
                name="name"
                autoFocus
                placeholder="Masukan nama produk..."
                value={queries.name}
                onChange={handleChangeInput}
                onKeyDown={handleKeydownInput}
              />
            </th>
            <th>
              <input
                className="input input-bordered input-sm w-full font-normal"
                autoComplete="off"
                name="code"
                placeholder="Masukan kode produk..."
                value={queries.code}
                onChange={handleChangeInput}
                onKeyDown={handleKeydownInput}
              />
            </th>
            <th>
              <select
                className="select select-bordered select-sm w-full font-normal"
                value={queries.category_id}
                onChange={handleChangeCategory}
              >
                <option value="">Semua</option>
                {categories.map((category: any, i) => (
                  <option value={category.value} key={i}>
                    {category.label}
                  </option>
                ))}
              </select>
            </th>
            <th></th>
          </tr>
          <tr>
            <th className="w-[30px]"></th>
            <th>Nama Produk</th>
            <th>Keterangan</th>
            <th>Kategori</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
