import Image from "next/image";
import { asset } from "../data";

export default function LocalImage({ file, alt = "", ...props }) {
  return <Image unoptimized src={asset(file)} alt={alt} {...props} />;
}
