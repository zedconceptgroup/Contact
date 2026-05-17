import { useEffect, useState } from 'react';
import { Fees, SecurityDeposit, Taxes } from '@pms/shared/src/models';

const FeesTaxesPage = () => {
  const [fees, setFees] = useState<Fees | null>(null);
  const [taxes, setTaxes] = useState<Taxes[]>([]);
  const [deposit, setDeposit] = useState<SecurityDeposit | null>(null);

  useEffect(() => {
    fetch('/api/fees')
      .then((res) => res.json())
      .then(setFees);
    fetch('/api/taxes')
      .then((res) => res.json())
      .then(setTaxes);
    fetch('/api/security')
      .then((res) => res.json())
      .then(setDeposit);
  }, []);

  return (
    <div className="page">
      <div className="card">
        <p className="section-title">Booking Fees</p>
        {fees ? (
          <div className="form-grid">
            <div>
              <div className="label">Cleaning</div>
              <input className="input" type="number" defaultValue={fees.cleaning} />
            </div>
            <div>
              <div className="label">Community</div>
              <input className="input" type="number" defaultValue={fees.community} />
            </div>
            <div>
              <div className="label">Management</div>
              <input className="input" type="number" defaultValue={fees.management} />
            </div>
          </div>
        ) : (
          <p className="small">Loading fees...</p>
        )}
      </div>

      <div className="card">
        <p className="section-title">Taxes</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Percent</th>
              <th>Modality</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax) => (
              <tr key={tax.name}>
                <td>{tax.name}</td>
                <td>{tax.amount}</td>
                <td>{tax.isPercent ? 'Yes' : 'No'}</td>
                <td>{tax.modality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <p className="section-title">Automatic Security Deposit</p>
        {deposit ? (
          <div className="form-grid">
            <div>
              <div className="label">Amount</div>
              <input className="input" type="number" defaultValue={deposit.amount} />
            </div>
            <div>
              <div className="label">Type</div>
              <input className="input" defaultValue={deposit.type} />
            </div>
            <div>
              <div className="label">Modality</div>
              <input className="input" defaultValue={deposit.modality} />
            </div>
          </div>
        ) : (
          <p className="small">Loading security deposit...</p>
        )}
      </div>
    </div>
  );
};

export default FeesTaxesPage;
