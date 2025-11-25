import { useEffect, useState } from 'react';
import { Rates } from '@pms/shared/src/models';

const RatesAndDiscountsPage = () => {
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    fetch('/api/rates')
      .then((res) => res.json())
      .then(setRates)
      .catch(() => setRates(null));
  }, []);

  return (
    <div className="page">
      <div className="card">
        <p className="section-title">Rate Mapping</p>
        <p className="small">Mapping rules coming soon.</p>
      </div>
      <div className="card">
        <p className="section-title">Discounts</p>
        <p className="small">Configure discounts per channel.</p>
      </div>
      <div className="card">
        <p className="section-title">Base Pricing</p>
        {rates ? (
          <div className="form-grid">
            <div>
              <div className="label">Nightly price</div>
              <input className="input" type="number" defaultValue={rates.nightlyPrice} />
            </div>
            <div>
              <div className="label">Weekly price</div>
              <input className="input" type="number" defaultValue={rates.weeklyPrice} />
            </div>
            <div>
              <div className="label">Monthly price</div>
              <input className="input" type="number" defaultValue={rates.monthlyPrice} />
            </div>
            <div>
              <div className="label">Minimum stay</div>
              <input className="input" type="number" defaultValue={rates.minimumStay} />
            </div>
            <div>
              <div className="label">Maximum stay</div>
              <input className="input" type="number" defaultValue={rates.maximumStay} />
            </div>
            <div>
              <div className="label">Extra guest fee</div>
              <input className="input" type="number" defaultValue={rates.extraGuestFee} />
            </div>
            <div>
              <div className="label">Max guest count</div>
              <input className="input" type="number" defaultValue={rates.maxGuestCount} />
            </div>
          </div>
        ) : (
          <p className="small">Loading rates...</p>
        )}
      </div>
    </div>
  );
};

export default RatesAndDiscountsPage;
