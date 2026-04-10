import clsx from "clsx";

const DotSpacer = ({ color = "bg-white" }: { color?: string }) => {
  return (
    <div
      className={clsx("w-0.75 h-0.75 rounded-full order-1 grow-0 ", color)}
    />
  );
};

export default DotSpacer;
