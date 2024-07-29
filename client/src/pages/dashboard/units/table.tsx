import { useState, ChangeEvent, KeyboardEvent, useCallback } from 'react';

interface TableProps {
  params: URLSearchParams;
  children: React.ReactNode;
  changeQueries: (key: string, value: string | number) => void;
}

const Table: React.FC<TableProps> = ({ params, changeQueries, children }) => {
  const [queries, setQueries] = useState<any>({ name: params.get('name') || '' });

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQueries({ ...queries, [e.target.name]: e.target.value });
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
                placeholder="Masukan nama satuan..."
                value={queries.name}
                onChange={handleChangeInput}
                onKeyDown={handleKeydownInput}
              />
            </th>
            <th></th>
          </tr>
          <tr>
            <th className="w-[30px]"></th>
            <th>Nama Satuan</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
