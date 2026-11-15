import { Link } from "react-router-dom";

const adConfigNames: string[] = ["basic"];

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
