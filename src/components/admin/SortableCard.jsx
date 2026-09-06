import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical } from "react-icons/fa";

export default function SortableCard({
  id,
  children,
}) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (

    <div
      ref={setNodeRef}
      style={style}
      className="rounded-2xl border bg-slate-50 shadow-sm"
    >

      <div className="flex items-center justify-between border-b p-4">

        <div
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-lg p-2 hover:bg-slate-200"
        >
          <FaGripVertical />
        </div>

      </div>

      <div className="p-6">

        {children}

      </div>

    </div>

  );

}