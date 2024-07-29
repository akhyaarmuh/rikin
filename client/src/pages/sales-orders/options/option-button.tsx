import { Button } from '../../../components';

interface OptionButtonProps {
  br?: boolean;
  id: string;
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  kbd: string;
}

const OptionButton: React.FC<OptionButtonProps> = (props) => {
  const { br, id, icon, onClick, label, kbd } = props;
  return (
    <div className={`border-base-content px-2${br ? ' border-r-[1px]' : ''}`}>
      <Button id={id} size="sm" color="ghost" className="min-w-max" onClick={onClick}>
        <h6 className="my-0 text-base">{icon}</h6>
        <h6 className="my-0 text-base">{label}</h6>
        <kbd className="kbd kbd-sm text-primary hidden laptop:block">{kbd}</kbd>
      </Button>
    </div>
  );
};

export default OptionButton;
