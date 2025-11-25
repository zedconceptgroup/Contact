import { useEffect, useState } from 'react';
import { PaymentScheduleStage } from '@pms/shared/src/models';

const PaymentSchedulePage = () => {
  const [stages, setStages] = useState<PaymentScheduleStage[]>([]);

  useEffect(() => {
    fetch('/api/payment-schedule')
      .then((res) => res.json())
      .then(setStages);
  }, []);

  return (
    <div className="page">
      <div className="card">
        <p className="section-title">Payment Schedule</p>
        <table className="table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Days before check-in</th>
              <th>Payment moment</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => (
              <tr key={stage.stage}>
                <td>{stage.stage}</td>
                <td>{stage.daysBeforeCheckIn}</td>
                <td>{stage.paymentMoment}</td>
                <td>{stage.percent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentSchedulePage;
