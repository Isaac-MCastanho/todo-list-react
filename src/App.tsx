import * as C from "./App.styles";
import { useState, useEffect } from "react";
import { Item } from "./types/item";
import { ListItem } from "./components/ListItem/index";
import { AddArea } from "./components/AddArea/index";
import { useAxios } from "./hooks/useAxios";

const App = () => {
  const { data: listData, isFething } = useAxios<Item[]>(
    "https://restapi-todo-list.herokuapp.com/list"
  );
  const [list, setList] = useState<Item[]>([]);

  const handleAddTask = (taskName: string) => {
    //console.log(taskName);

    fetch(`https://restapi-todo-list.herokuapp.com/list`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        id: list.length > 0 ? list[list.length - 1].id + 1 : 1,
        name: taskName,
        done: false,
      }),
    }).then((r) => {
      let newList = [
        ...list,
        {
          id: list.length > 0 ? list[list.length - 1].id + 1 : 1,
          name: taskName,
          done: false,
        },
      ];
      //console.log(newList, r);
      setList(newList);
    });
  };

  const handleSetDone = async (taskIndex: number, done: boolean) => {
    //console.log(taskIndex, done);
    await fetch(`https://restapi-todo-list.herokuapp.com/list/${taskIndex}`, {
      method: "PATCH",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        done: !done,
      }),
    });
    let response = await fetch(`https://restapi-todo-list.herokuapp.com/list`);
    let data = await response.json();
    //console.log(data);
    setList(data);
  };

  const handleDelete = async (index: number) => {
    await fetch(`https://restapi-todo-list.herokuapp.com/list/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setList(
          list.filter((i) => {
            return i.id !== index;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isFething === false) {
      setList(listData ? listData : []);
    }
  }, [isFething, listData]);

  return (
    <C.Container>
      <C.Area>
        <C.Header>Lista de Tarefas</C.Header>

        <AddArea onEnter={handleAddTask} />

        {list?.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onSetDone={handleSetDone}
            onDelete={handleDelete}
          />
        ))}
      </C.Area>
    </C.Container>
  );
};

export default App;
