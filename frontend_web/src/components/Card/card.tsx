import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import Card from 'react-bootstrap/Card';
import { Variant, Color } from 'react-bootstrap/types';

type TCardProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  faicon?: any;
  bg?: Variant;
  border?: Variant;
  text?: Color;
}>;

const TCard: React.FC<TCardProps> = (props: TCardProps) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }} bg={props.bg} border={props.border} text={props.text}>
      <Card.Header>
        <Card.Title className={'float-end'}>{props.faicon && <FontAwesomeIcon icon={props.faicon} size="2x" />}</Card.Title>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
      </Card.Header>
      {props.children}
    </Card>
  );
};

export default TCard;
