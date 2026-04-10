import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  children: ReactNode;
  onBottomReach: () => void;
  style?: string;
}

const InfiniteScrollContainer = ({ children, onBottomReach, style }: Props) => {
  const { ref } = useInView({
    rootMargin: "50px",
    onChange(inView) {
      if (inView) {
        onBottomReach();
      }
    },
  });
  return (
    <div className={style}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteScrollContainer;
