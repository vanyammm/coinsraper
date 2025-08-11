import "./skeleton.style.scss";

export const CryptoTableItemSkeleton = () => {
  return (
    <tr className="skeleton-row">
      <td className="favoriteCell" data-label="Favorite">
        <div className="skeleton skeleton--star" />
      </td>
      <td data-label="Rank">
        <div className="skeleton skeleton--text skeleton--short" />
      </td>
      <td>
        <div className="coinInfo">
          <div className="skeleton skeleton--circle" />
          <div style={{width: "100%"}}>
            <div className="skeleton skeleton--text" />
            <div className="skeleton skeleton--text skeleton--medium" />
          </div>
        </div>
      </td>
      <td data-label="Price">
        <div className="skeleton skeleton--text" />
      </td>
      <td data-label="24h %">
        <div className="skeleton skeleton--text skeleton--medium" />
      </td>
      <td data-label="Market Cap">
        <div className="skeleton skeleton--text" />
      </td>
    </tr>
  );
};
