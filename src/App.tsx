
import { Routes, Route, useParams } from "react-router-dom";

import type { AdBannerConfig } from "./AdTypes";

import type {
  PortalType,
  PortalConfigMap,
} from "./PortalTypes";

import AdConfigLoader from "./AdConfigLoader";
import PortalConfigLoader from "./PortalConfigLoader";

import { VerificationPortal } from "./VerificationPortal";
import EncyclopediaPortal from "./EncyclopediaPortal";
import CommercePortal from "./CommercePortal";
import NewspaperPortal from "./NewspaperPortal";
import PhotoGalleryPortal from "./PhotoGalleryPortal";
import LinkWizard from "./LinkWizard";

interface PortalRouteProps<K extends PortalType> {
  Component?: React.ComponentType<{
    adBanner?: AdBannerConfig;
  }>;

  portalType?: K;

  render?: (
    config: PortalConfigMap[K],
    adBanner: AdBannerConfig
  ) => React.ReactNode;
}

function PortalRoute<K extends PortalType>({
  Component,
  portalType,
  render,
}: PortalRouteProps<K>) {
  const { portalConfigId, adConfigId } = useParams<{
    portalConfigId: string;
    adConfigId: string;
  }>();

  if (!adConfigId) {
    return (
      <div role="alert">
        Missing advertisement configuration ID.
      </div>
    );
  }

  return (
    <AdConfigLoader configName={adConfigId}>
      {(adBanner) => {
        // Portals that only need an advertisement banner.
        if (!portalType) {
          if (!Component) {
            return (
              <div role="alert">
                Missing portal component.
              </div>
            );
          }

          return <Component adBanner={adBanner} />;
        }

        // Portals that also require a portal configuration.
        if (!portalConfigId || !render) {
          return (
            <div role="alert">
              Missing portal configuration.
            </div>
          );
        }

        return (
          <PortalConfigLoader
            portalType={portalType}
            configId={portalConfigId}
          >
            {(config) => render(config, adBanner)}
          </PortalConfigLoader>
        );
      }}
    </AdConfigLoader>
  );
}

function App() {
  return (
    <Routes>
      {/* CAPTCHA: advertisement configuration only */}

      <Route
        path="/captcha/:adConfigId/"
        element={<PortalRoute Component={VerificationPortal} />}
      />

      {/* Encyclopedia */}

      <Route
        path="/encyclopedia/:adConfigId/:portalConfigId"
        element={
          <PortalRoute
            portalType="encyclopedia"
            render={(config, adBanner) => (
              <EncyclopediaPortal
                articles={config.articles}
                initialArticleId={config.initialArticleId}
                targetArticleId={config.targetArticleId}
                adBanner={adBanner}
              />
            )}
          />
        }
      />

      {/* Ecommerce */}

      <Route
        path="/ecommerce/:adConfigId/:portalConfigId"
        element={
          <PortalRoute
            portalType="ecommerce"
            render={(config, adBanner) => (
              <CommercePortal
                products={config.products}
                targetProductId={config.targetProductId}
                adBanner={adBanner}
              />
            )}
          />
        }
      />

      {/* Newspaper */}

      <Route
        path="/newspaper/:adConfigId/:portalConfigId"
        element={
          <PortalRoute
            portalType="newspaper"
            render={(config, adBanner) => (
              <NewspaperPortal
                articles={config.articles}
                targetArticleId={config.targetArticleId}
                adBanner={adBanner}
              />
            )}
          />
        }
      />

      {/* Gallery */}

      <Route
        path="/gallery/:adConfigId/:portalConfigId"
        element={
          <PortalRoute
            portalType="gallery"
            render={(config, adBanner) => (
              <PhotoGalleryPortal
                photos={config.photos}
                targetPhotoId={config.targetPhotoId}
                adBanner={adBanner}
              />
            )}
          />
        }
      />

      {/* Fallback */}

      <Route
        path="*"
        element={<LinkWizard />}
      />
    </Routes>
  );
}

export default App;
