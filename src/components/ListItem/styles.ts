import styled, { css } from "styled-components";

type ContainerProps = {
  done: boolean;
};

export const Container = styled.div`
  display: flex;

  & > div {
    flex: 1;
    align-items: center;
  }
`;

export const ItemDone = styled.div(
  ({ done }: ContainerProps) =>
    css`
      display: flex;
      background-color: #20212c;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 10px;
      align-items: center;
      cursor: pointer;

      input {
        width: 25px;
        height: 25px;
        margin-right: 5px;
        border-radius: 50%;
      }

      label {
        color: #ccc;
        text-decoration: ${done ? "line-through" : "none"};
      }
    `
);

export const Delete = styled.button`
  background: transparent;
  width: 50px;
  height: 50px;

  display: flex;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid black;
  border-bottom: 2px solid red;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  font-size: 20px;
  color: red;
  transition: all ease 0.5s;

  &:hover {
    border: 2px solid red;
  }
`;
