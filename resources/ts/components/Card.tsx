import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getMember } from "../utils/functions";

type CardProps = {
  memberId: number;
};

const Card = ({ memberId }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: memberId,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const member = getMember(memberId);

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div>
        <p>{member!.name}</p>
      </div>
    </div>
  );
};

export default Card;
