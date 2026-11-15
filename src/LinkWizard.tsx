import { Link } from "react-router-dom";

const adConfigIds: string[] = ["basic"];

const portals = ["captcha", "encyclopedia", "ecommerce", "newspaper", "gallery"];

const portalConfigIds = {
  "enyclopedia": ["basic"],
  "ecommerce": ["basic"],
  "newspaper": ["basic"],
  "gallery": ["basic"],
};

export function LinkWizard() {
  return (
    <nav>
      <Link to="/captcha">Captcha</Link>
      <Link to="/encyclopedia">Encyclopedia</Link>
      <Link to="/ecommerce">E-commerce</Link>
      <Link to="/newspaper">Newspaper</Link>
      <Link to="/gallery">Gallery</Link>
    </nav>
  );
}

export default LinkWizard;
