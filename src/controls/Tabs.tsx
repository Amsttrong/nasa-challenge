import classNames from "classnames";

export type TabsProps = {
  tabs: {
    label: string;
    onClick: () => void;
    isActive: boolean;
  }[];
};

export function Tabs({ tabs }: TabsProps) {
  return (
    <div className="tabs">
      {tabs.map((t, index) => (
        <button
          key={index}
          onClick={t.onClick}
          className={classNames("tabs", {
            active: t.isActive,
          })}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
