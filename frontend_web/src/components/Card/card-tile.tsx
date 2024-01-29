import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';

type TCardTileProps = {
  title: string;
  subtitle: string;
  variant?: string;
  faicon?: any;
  onClick: Function;
};

const TCardTile: React.FC<TCardTileProps> = (props: TCardTileProps) => {
  return (
    <Card style={{ marginBottom: '1rem' }} className="pointer" onClick={() => props.onClick()} border={props.variant}>
      <Card.Header>
        <Card.Title className={'float-end text-' + props.variant}>{props.faicon && <FontAwesomeIcon icon={props.faicon} size="2x" />}</Card.Title>
        <Card.Title className='text-truncate'>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
      </Card.Header>
    </Card>
  );
};

export default TCardTile;
