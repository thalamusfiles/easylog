import { Spinner } from 'react-bootstrap';

type SpinnerLoaderProps = {
  show: boolean;
};

const SpinnerLoader: React.FC<SpinnerLoaderProps> = (props: SpinnerLoaderProps) => {
  if (props.show) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return null;
};

export default SpinnerLoader;
