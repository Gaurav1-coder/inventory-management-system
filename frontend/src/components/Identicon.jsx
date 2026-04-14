// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React from "react";
import { toSvg } from "jdenticon";

const Identicon = ({ value, size }) => {
  const svgString = toSvg(value, size);
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};

export default Identicon;

