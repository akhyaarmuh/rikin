interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
      <div className="flex flex-col items-center">
        <span className="loading loading-ring loading-lg"></span>
        {message ? message : 'Silakan tunggu...'}
      </div>
    </div>
  );
};

export default Loading;
