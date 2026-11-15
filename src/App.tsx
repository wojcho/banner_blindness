
import { Routes, Route, useParams } from "react-router-dom";

import type { AdBannerConfig } from "./AdTypes";

import AdConfigLoader from "./AdConfigLoader";

import VerificationPortal from "./VerificationPortal";
import EncyclopediaPortal from "./EncyclopediaPortal";
import CommercePortal from "./CommercePortal";
import NewspaperPortal from "./NewspaperPortal";
import PhotoGalleryPortal from "./PhotoGalleryPortal";
import LinkWizard from "./LinkWizard";

interface PortalRouteProps {
  Component: React.ComponentType<{
    adBanner: AdBannerConfig;
  }>;
}

function PortalRoute({ Component }: PortalRouteProps) {
  const { adConfigName } = useParams<{
    adConfigName: string;
  }>();

  if (!adConfigName) {
    return <div role="alert">Missing ad configuration name.</div>;
  }

  return (
    <AdConfigLoader configName={adConfigName}>
      {(config) => <Component adBanner={config} />}
    </AdConfigLoader>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/captcha/:adConfigName"
        element={<PortalRoute Component={VerificationPortal} />}
      />

      <Route
        path="/encyclopedia/:adConfigName"
        element={<PortalRoute Component={EncyclopediaPortal} />}
      />

      <Route
        path="/ecommerce/:adConfigName"
        element={<PortalRoute Component={CommercePortal} />}
      />

      <Route
        path="/newspaper/:adConfigName"
        element={<PortalRoute Component={NewspaperPortal} />}
      />

      <Route
        path="/gallery/:adConfigName"
        element={<PortalRoute Component={PhotoGalleryPortal} />}
      />

      <Route
        path="*"
        element={<LinkWizard />}
      />
    </Routes>
  );
}

export default App;
