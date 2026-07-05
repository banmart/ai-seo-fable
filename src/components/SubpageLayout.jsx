/* SubpageLayout — shared server-rendered shell for all non-homepage pages.
   Same global design system (index.css); no scrub stage, no HUD. */
import Header from './Header';
import Footer from './Footer';
import WarpedLines from './WarpedLines';
import Breadcrumbs from './Breadcrumbs';

export default function SubpageLayout({ children }) {
  return (
    <>
      <Header />
      <main className="subpage">
        <WarpedLines />
        <div className="subpage__col">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
