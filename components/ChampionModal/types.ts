type Champion = {
  name: string;
  position: "Top" | "Jungle" | "Mid" | "ADC" | "Support";
  imgUrl: string;
};
interface ChampionModalProps {
  champions: Champion[];
}
