import { fetchSelectChampionImage } from "@/utils/api/api";
import { atomResolution } from "@/utils/recoil/atoms";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const CardChampionImg = ({ id }) => {
  const resolution = useRecoilValue(atomResolution);
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    const fetchChampionImage = async () => {
      setUrl(await fetchSelectChampionImage(id));
    };
    fetchChampionImage();
  }, [id]);
  return (
    <Image
      src={url}
      alt={""}
      width={resolution === "MOBILE" ? 70 : 100}
      height={resolution === "MOBILE" ? 70 : 100}
      quality={100}
      draggable={false}
      style={{
        borderRadius: 100,
        overflow: "hidden",
      }}
    />
  );
};

export default CardChampionImg;
