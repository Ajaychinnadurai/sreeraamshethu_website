export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading Sree Raam Shethu">
      <div className="page-loader__content">
        <div className="page-loader__logo-wrap">
          <div className="page-loader__circle-spinner" />
          <img
            src="/logo.png"
            alt="Sree Raam Shethu"
            className="page-loader__logo"
          />
        </div>

        <p className="page-loader__title">SREE RAAM SHETHU</p>
        <p className="page-loader__caption">CONSTRUCTIONS &amp; INTERIORS</p>
      </div>
    </div>
  );
}