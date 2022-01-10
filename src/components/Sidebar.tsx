import classNames from "classnames";
import React from "react";

export type SidebarProps = {
  cameras: string[];
  onClick: (camera: string) => void;
  activeCamera: string;
};
export function Sidebar({ onClick, cameras, activeCamera }: SidebarProps) {
  return (
    <div>
      <ul className="sidebar">
        {cameras.map((c) => (
          <li
            key={c}
            onClick={() => onClick(c)}
            className={classNames("", {
              active: c === activeCamera,
            })}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
