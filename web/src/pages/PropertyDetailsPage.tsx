import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PropertyBundle } from '@pms/shared/src/models';

const tabs = ['Basic Information', 'Rental Instructions', 'Rates'] as const;

type Tab = (typeof tabs)[number];

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [bundle, setBundle] = useState<PropertyBundle | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('Basic Information');

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((res) => res.json())
      .then(setBundle)
      .catch(() => setBundle(null));
  }, [id]);

  const basicInfo = useMemo(
    () => ({
      name: bundle?.property.name ?? '',
      nickname: bundle?.property.nickname ?? '',
      displayName: bundle?.property.displayName ?? '',
      email: bundle?.property.email ?? '',
      phone: bundle?.property.phone ?? '',
      address: bundle?.property.address ?? '',
      city: bundle?.property.city ?? '',
      region: bundle?.property.region ?? '',
      country: bundle?.property.country ?? '',
      postalCode: bundle?.property.postalCode ?? '',
      registrationNumber: bundle?.property.registrationNumber ?? '',
      currency: bundle?.property.currency ?? '',
      colorTag: bundle?.property.colorTag ?? ''
    }),
    [bundle]
  );

  if (!bundle) {
    return <div className="card">Loading property...</div>;
  }

  return (
    <div className="page">
      <div className="card stat-card">
        <div>
          <p className="small">Property</p>
          <h2>{bundle.property.name}</h2>
        </div>
        <span className="badge">ID: {bundle.property.id}</span>
      </div>

      <div className="tab-bar">
        {tabs.map((tab) => (
          <button key={tab} className={`tab ${tab === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Basic Information' && (
        <div className="card">
          <p className="section-title">Basic Information</p>
          <div className="form-grid">
            {Object.entries(basicInfo).map(([label, value]) => (
              <div key={label}>
                <div className="label">{label}</div>
                <input className="input" defaultValue={value} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Rental Instructions' && (
        <div className="card">
          <p className="section-title">Rental Instructions</p>
          <div className="form-grid">
            <div>
              <div className="label">Check-in time</div>
              <input className="input" defaultValue={bundle.instructions.checkInTime} />
            </div>
            <div>
              <div className="label">Check-out time</div>
              <input className="input" defaultValue={bundle.instructions.checkOutTime} />
            </div>
            <div>
              <div className="label">WiFi name</div>
              <input className="input" defaultValue={bundle.instructions.wifiName} />
            </div>
            <div>
              <div className="label">WiFi password</div>
              <input className="input" defaultValue={bundle.instructions.wifiPassword} />
            </div>
            <div>
              <div className="label">Door code</div>
              <input className="input" defaultValue={bundle.instructions.doorCode} />
            </div>
          </div>
          <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div>
              <div className="label">Check-in instructions</div>
              <textarea className="textarea" rows={2} defaultValue={bundle.instructions.checkInInstructions} />
            </div>
            <div>
              <div className="label">Check-out instructions</div>
              <textarea className="textarea" rows={2} defaultValue={bundle.instructions.checkOutInstructions} />
            </div>
            <div>
              <div className="label">Directions</div>
              <textarea className="textarea" rows={2} defaultValue={bundle.instructions.directions} />
            </div>
            <div>
              <div className="label">House rules</div>
              <textarea className="textarea" rows={2} defaultValue={bundle.instructions.houseRules} />
            </div>
            <div>
              <div className="label">Payment instructions</div>
              <textarea className="textarea" rows={2} defaultValue={bundle.instructions.paymentInstructions} />
            </div>
            <div>
              <div className="label">Special instructions</div>
              <textarea className="textarea" rows={2} defaultValue={bundle.instructions.specialInstructions} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Rates' && (
        <div className="card">
          <p className="section-title">Rates</p>
          <div className="form-grid">
            <div>
              <div className="label">Nightly price</div>
              <input className="input" type="number" defaultValue={bundle.rates.nightlyPrice} />
            </div>
            <div>
              <div className="label">Weekly price</div>
              <input className="input" type="number" defaultValue={bundle.rates.weeklyPrice} />
            </div>
            <div>
              <div className="label">Monthly price</div>
              <input className="input" type="number" defaultValue={bundle.rates.monthlyPrice} />
            </div>
            <div>
              <div className="label">Minimum stay</div>
              <input className="input" type="number" defaultValue={bundle.rates.minimumStay} />
            </div>
            <div>
              <div className="label">Maximum stay</div>
              <input className="input" type="number" defaultValue={bundle.rates.maximumStay} />
            </div>
            <div>
              <div className="label">Extra guest fee</div>
              <input className="input" type="number" defaultValue={bundle.rates.extraGuestFee} />
            </div>
            <div>
              <div className="label">Max guest count</div>
              <input className="input" type="number" defaultValue={bundle.rates.maxGuestCount} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
