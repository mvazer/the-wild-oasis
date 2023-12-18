import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useCloseModal from "../hooks/useOutsideClick";
import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [clickedId, setClickedId] = useState("");
  const [position, setPosition] = useState({});
  const close = () => setClickedId("");
  const open = setClickedId;
  return (
    <MenusContext.Provider
      value={{ clickedId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { clickedId, open, setPosition, close } = useContext(MenusContext);
  function clickHandler(e) {
    // e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    const x = window.innerWidth - rect.width - rect.x;
    const y = rect.y + rect.height + 8;
    setPosition({ x, y });

    clickedId === "" || clickedId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={clickHandler}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function clickHandler() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={clickHandler}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

function List({ id, children }) {
  const { clickedId, position, close } = useContext(MenusContext);
  const ref = useCloseModal(close);

  if (id !== clickedId) return null;
  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

Menus.Menu = Menu;
Menus.Button = Button;
Menus.Toggle = Toggle;
Menus.List = List;

export default Menus;
