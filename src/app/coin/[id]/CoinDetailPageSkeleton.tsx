import "@/components/features/CryptoTable/skeleton.style.scss";
import "./style.scss";

export const CoinDetailPageSkeleton = () => {
  return (
    <main style={{padding: "2rem"}}>
      <div className="coinHeader">
        <div
          className="skeleton skeleton--circle"
          style={{width: 50, height: 50}}
        />
        <div style={{width: "40%"}}>
          <div className="skeleton skeleton--text" />
        </div>
      </div>
      <div className="tagsContainer">
        <div className="skeleton tag" style={{width: 100, height: 22}} />
        <div className="skeleton tag" style={{width: 120, height: 22}} />
        <div className="skeleton tag" style={{width: 80, height: 22}} />
      </div>
      <div style={{maxWidth: "800px", margin: "2rem 0"}}>
        <div className="skeleton" style={{height: "400px"}} />
      </div>
      <h2 className="sectionTitle">
        <div className="skeleton skeleton--text" style={{width: "200px"}} />
      </h2>
      <div className="statsContainer">
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} className="statItem">
            <div className="skeleton skeleton--text skeleton--medium" />
            <div className="skeleton skeleton--text" />
          </div>
        ))}
      </div>
      <h2 className="sectionTitle">
        <div className="skeleton skeleton--text" style={{width: "150px"}} />
      </h2>
      <div>
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text" style={{width: "80%"}} />
      </div>
      <h2 className="sectionTitle">
        <div className="skeleton skeleton--text" style={{width: "100px"}} />
      </h2>
      <div className="linksContainer">
        <div
          className="skeleton"
          style={{width: 100, height: 38, borderRadius: "6px"}}
        />
        <div
          className="skeleton"
          style={{width: 100, height: 38, borderRadius: "6px"}}
        />
        <div
          className="skeleton"
          style={{width: 100, height: 38, borderRadius: "6px"}}
        />
      </div>
    </main>
  );
};
