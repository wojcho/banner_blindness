import { Routes, Route, useParams, useNavigate } from "react-router-dom";

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
import SuccessFinal from "./SuccessFinal";

interface PortalRouteProps<K extends PortalType> {
  Component?: React.ComponentType<{
    adBanner?: AdBannerConfig;
  }>;

  portalType?: K;

  render?: (
    config: PortalConfigMap[K],
    adBanner: AdBannerConfig,
    onObjectiveCompleted: () => void
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

  const navigate = useNavigate();

  const handleObjectiveCompleted = () => {
    navigate("/success");
  };

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
            {(config) =>
              render(config, adBanner, handleObjectiveCompleted)
            }
          </PortalConfigLoader>
        );
      }}
    </AdConfigLoader>
  );
}

function CaptchaRoute({
  adBanner,
}: {
  adBanner?: AdBannerConfig;
}) {
  const navigate = useNavigate();

  return (
    <VerificationPortal
      adBanner={adBanner}
      onVerified={() => navigate("/success")}
    />
  );
}

function App() {
  return (
    <Routes>
      {/* CAPTCHA: advertisement configuration only */}

      <Route
        path="/captcha/:adConfigId/"
        element={<PortalRoute Component={CaptchaRoute} />}
      />

      {/* Encyclopedia */}

      <Route
        path="/encyclopedia/:adConfigId/:portalConfigId"
        element={
          <PortalRoute
            portalType="encyclopedia"
            render={(config, adBanner, onObjectiveCompleted) => (
              <EncyclopediaPortal
                articles={config.articles}
                initialArticleId={config.initialArticleId}
                targetArticleId={config.targetArticleId}
                onTargetArticleSelected={onObjectiveCompleted}
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
            render={(config, adBanner, onObjectiveCompleted) => (
              <CommercePortal
                products={config.products}
                targetProductId={config.targetProductId}
                onTargetProductInCart={onObjectiveCompleted}
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
            render={(config, adBanner, onObjectiveCompleted) => (
              <NewspaperPortal
                articles={config.articles}
                targetArticleId={config.targetArticleId}
                onTargetArticleSelected={onObjectiveCompleted}
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
            render={(config, adBanner, onObjectiveCompleted) => (
              <PhotoGalleryPortal
                photos={config.photos}
                targetPhotoId={config.targetPhotoId}
                onTargetPhotoSelected={onObjectiveCompleted}
                adBanner={adBanner}
              />
            )}
          />
        }
      />

      {/* Success */}

      <Route
        path="/success"
        element={
          <SuccessFinal
            title="You did it!"
            description="Congratulations! You have successfully achieved your objective. Your progress has been recorded."
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
