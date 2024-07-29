import { toRupiah } from '../../utilities';

interface PriceDetailProps {
  getTotal: () => number;
}

const PriceDetail: React.FC<PriceDetailProps> = ({ getTotal }) => {
  return (
    <div className="hidden w-40 laptop:w-64 tablet:flex flex-col justify-end">
      {/* <div className="flex">
        <h6 className="my-0 w-20">Sub Total</h6>
        <h6 className="flex-1 my-0">:</h6>
        <h6 className="my-0">{toRupiah(getTotal())}</h6>
      </div>
      <div className="flex">
        <h6 className="my-0 w-20">Diskon</h6>
        <h6 className="flex-1 my-0">:</h6>
        <input
          className="input w-32 input-ghost input-sm text-right p-0 text-base md:text-lg font-medium"
          placeholder="Diskon..."
        />
      </div> */}
      <div className="flex">
        <h6 className="my-0 w-20">Total</h6>
        <h6 className="flex-1 my-0">:</h6>
        <h6 className="my-0">{toRupiah(getTotal())}</h6>
      </div>
    </div>
  );
};

export default PriceDetail;
