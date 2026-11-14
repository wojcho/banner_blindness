import { MegaphoneIcon } from "@phosphor-icons/react";
import type { AdBannerConfig } from "./AdTypes";
import PhotoGalleryPortal from "./PhotoGalleryPortal";

const adConfig: AdBannerConfig = {
  location: "sidebar",
  style: "attention-grabbing",
  content: "Discover exclusive offers today!",
  backgroundUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Perching_pigeon_in_Birkenhead_Park.jpg/960px-Perching_pigeon_in_Birkenhead_Park.jpg",
  icon: <MegaphoneIcon size={28} />,
};

function App() {
  return (
    <PhotoGalleryPortal adBanner={adConfig}/>
  );
}

export default App;
