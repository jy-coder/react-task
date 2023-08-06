import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { Task } from "../../types";

const containerStyle = {
  background: "#141d2b",
  padding: 10,
  height: "90vh",
  margin: 10,
  flex: 1,
};

interface ContainerProps {
  id: string;
  items: Task[];
}

export const Container: React.FC<ContainerProps> = (props) => {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
        {items.map((item: Task) => (
          <SortableItem key={item.id} id={item.id} task={item} />
        ))}
      </div>
    </SortableContext>
  );
};
