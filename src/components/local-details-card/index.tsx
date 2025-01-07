import { ILocalDetails } from "../../utils/local-details.interface";
import "./styles.css";

export function LocalDetailsCard(data: ILocalDetails) {
  return (
    <div className="card-container">
      <div className="card-section section-border">
        <h6>IP ADRESS</h6>
        <h2>{data.ip_adrees}</h2>
      </div>
      <div className="card-section section-border">
        <h6>LOCATION</h6>
        <h2>{data.location}</h2>
      </div>
      <div className="card-section section-border">
        <h6>TIMEZONE</h6>
        <h2>{data.timezone}</h2>
      </div>
      <div className="card-section">
        <h6>ISP</h6>
        <h2>{data.isp}</h2>
      </div>
    </div>
  );
}
