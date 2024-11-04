import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  text: any; // quite cheeky, forget the type lol 😂
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  // useEffect to track the text width
  useEffect(() => {
    const width = ref.current?.scrollWidth;
    setWidth(width);
  }, [text]);

  return (
    <div ref={ref} style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div
        style={{ display: "inline-block" }}
        // not perfect needs improvement
        animate={{ x: width ? [width, -width] : undefined }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default Marquee;
