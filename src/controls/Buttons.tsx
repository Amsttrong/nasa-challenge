import classNames from "classnames";

export type ButtonsProps = {
  buttons: {
    label: string;
    onClick: () => void;
    isActive: boolean;
  }[];
};

export function Buttons({ buttons }: ButtonsProps) {
  return (
    <div className="buttons">
      {buttons.map((b, index) => (
        <button
          key={index}
          onClick={b.onClick}
          className={classNames("pills", {
            active: b.isActive,
          })}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
