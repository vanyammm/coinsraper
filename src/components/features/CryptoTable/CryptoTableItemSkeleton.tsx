import "./skeleton.style.scss";

export const CryptoTableItemSkeleton = () => {
  return (
    <tr>
      <td className="favoriteCell">
        <div className="skeleton skeleton--star" />
      </td>
      <td>
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
      <td>
        <div className="skeleton skeleton--text" />
      </td>
      <td>
        <div className="skeleton skeleton--text skeleton--medium" />
      </td>
      <td>
        <div className="skeleton skeleton--text" />
      </td>
    </tr>
  );
};
