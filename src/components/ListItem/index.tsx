import * as C from "./styles";
import { Item } from "./../../types/item";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

type Props = {
  item: Item;
  onSetDone: (taskIndex: number, done: boolean) => void;
  onDelete: (taskIndex: number) => void;
};

export const ListItem = ({ item, onSetDone, onDelete }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(item.done);
  }, [item]);

  return (
    <C.Container>
      <C.ItemDone
        onClick={(e) => {
          setIsChecked(!isChecked);
          onSetDone(item.id, item.done);
        }}
        done={isChecked}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            onSetDone(item.id, item.done);
          }}
        />
        <label htmlFor="">{item.name}</label>
      </C.ItemDone>
      <C.Delete
        onClick={() => {
          onDelete(item.id);
        }}
      >
        <MdDelete />
      </C.Delete>
    </C.Container>
  );
};
