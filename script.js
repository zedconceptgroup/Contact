const { useMemo, useState } = React;

const NAV_ITEMS = [
  "Dashboard",
  "Client CRM",
  "Quotes",
  "Shipments",
  "Containers",
  "Suppliers & Agents",
  "Customs Documents",
  "Invoices",
  "Tasks",
  "AI Assistant",
];

const shipmentStages = [
  "Booking Confirmed",
  "Cargo Picked Up",
  "Warehouse Received",
  "Customs Clearance",
  "Loaded on Vessel",
  "In Transit",
  "Arrived at Port",
  "Out for Delivery",
  "Delivered",
];

const initialData = {
  clients: [
    {
      id: "C-001",
      name: "Emma Johnson",
      company: "Skyline FBA Ventures",
      country: "USA",
      type: "Amazon Seller",
      email: "emma@skylinefba.com",
      phone: "+1 310 555 0189",
      whatsapp: "+1 310 555 0189",
      preferredMethod: "Sea Freight + DDP",
      lastContact: "2026-05-14",
      monthlyValue: 120000,
      notes: "Ships monthly FBA replenishment to LAX and NY.",
      history: [
        "2026-05-14: Requested quote revision for cosmetics packaging.",
        "2026-05-10: Confirmed May shipment schedule.",
      ],
    },
    {
      id: "C-002",
      name: "Oliver Reed",
      company: "Britannia Imports Ltd",
      country: "UK",
      type: "Importer",
      email: "oliver@britanniaimports.co.uk",
      phone: "+44 20 7946 0120",
      whatsapp: "+44 7700 900210",
      preferredMethod: "Sea Freight",
      lastContact: "2026-05-13",
      monthlyValue: 94000,
      notes: "Focus on home organizers and textiles.",
      history: ["2026-05-13: Discussed FOB Ningbo rates."],
    },
    {
      id: "C-003",
      name: "Lena Fischer",
      company: "Nordic Retail GmbH",
      country: "Germany",
      type: "Retailer",
      email: "lena@nordicretail.de",
      phone: "+49 40 555 1200",
      whatsapp: "+49 151 5600 8844",
      preferredMethod: "Rail + Truck",
      lastContact: "2026-05-12",
      monthlyValue: 76000,
      notes: "Sensitive to ETA reliability for Hamburg routes.",
      history: ["2026-05-12: Confirmed HS code documentation needs."],
    },
    {
      id: "C-004",
      name: "Khalid Mansoor",
      company: "Desert Bridge Distribution",
      country: "UAE",
      type: "Distributor",
      email: "khalid@desertbridge.ae",
      phone: "+971 4 220 8800",
      whatsapp: "+971 50 221 8891",
      preferredMethod: "Air Freight",
      lastContact: "2026-05-15",
      monthlyValue: 132000,
      notes: "Urgent consumer electronics shipments to Dubai.",
      history: ["2026-05-15: Urgent air cargo request from Shenzhen."],
    },
    {
      id: "C-005",
      name: "Faisal Al-Harbi",
      company: "Riyadh Wholesale Hub",
      country: "Saudi Arabia",
      type: "Wholesale Buyer",
      email: "faisal@rwhub.sa",
      phone: "+966 11 455 0090",
      whatsapp: "+966 55 204 1190",
      preferredMethod: "Sea Freight + Truck",
      lastContact: "2026-05-11",
      monthlyValue: 88000,
      notes: "Large furniture consignments to Jeddah.",
      history: ["2026-05-11: Payment follow-up sent for INV-2048."],
    },
  ],
  quotes: [
    {
      id: "Q-2301",
      client: "Skyline FBA Ventures",
      origin: "Shenzhen",
      destination: "USA",
      method: "Sea",
      incoterm: "DDP",
      cargo: "Amazon FBA goods",
      qty: 1200,
      cbm: 42,
      gross: 11800,
      chargeable: 11800,
      cost: 18650,
      margin: 18,
      status: "Sent",
      breakdown: {
        freight: 13000,
        trucking: 1200,
        customs: 900,
        docs: 250,
        insurance: 300,
        service: 3000,
      },
    },
    {
      id: "Q-2302",
      client: "Britannia Imports Ltd",
      origin: "Ningbo",
      destination: "UK",
      method: "Sea",
      incoterm: "FOB",
      cargo: "Home organizers",
      qty: 880,
      cbm: 36,
      gross: 9600,
      chargeable: 9600,
      cost: 14980,
      margin: 15,
      status: "Negotiating",
      breakdown: {
        freight: 10800,
        trucking: 900,
        customs: 700,
        docs: 180,
        insurance: 200,
        service: 2200,
      },
    },
    {
      id: "Q-2303",
      client: "Desert Bridge Distribution",
      origin: "Guangzhou",
      destination: "UAE",
      method: "Air",
      incoterm: "CIF",
      cargo: "Electronics accessories",
      qty: 420,
      cbm: 8,
      gross: 2300,
      chargeable: 2750,
      cost: 11100,
      margin: 20,
      status: "Approved",
      breakdown: {
        freight: 8200,
        trucking: 500,
        customs: 450,
        docs: 150,
        insurance: 300,
        service: 1500,
      },
    },
  ],
  shipments: [
    {
      id: "S-9901",
      client: "Skyline FBA Ventures",
      cargo: "Cosmetics packaging",
      origin: "Guangzhou",
      destination: "Los Angeles",
      mode: "Sea",
      incoterm: "DDP",
      cbm: 28,
      weight: 7900,
      container: "MSCU9021456",
      bl: "OOLU7791023",
      stage: "In Transit",
      eta: "2026-05-23",
      etd: "2026-05-05",
      supplier: "Guangzhou Beauty Pack Co.",
      agent: "Pacific Axis USA",
      value: 68000,
    },
    {
      id: "S-9902",
      client: "Britannia Imports Ltd",
      cargo: "Textiles",
      origin: "Yiwu",
      destination: "London",
      mode: "Rail",
      incoterm: "FOB",
      cbm: 18,
      weight: 5100,
      container: "LCL",
      bl: "RAILUK23901",
      stage: "Customs Clearance",
      eta: "2026-05-20",
      etd: "2026-05-09",
      supplier: "Yiwu Textile Source",
      agent: "EuroLink Brokers",
      value: 47000,
    },
    {
      id: "S-9903",
      client: "Riyadh Wholesale Hub",
      cargo: "Furniture",
      origin: "Foshan",
      destination: "Jeddah",
      mode: "Sea+Truck",
      incoterm: "CIF",
      cbm: 52,
      weight: 14200,
      container: "TEMU5540012",
      bl: "COSU1880202",
      stage: "Arrived at Port",
      eta: "2026-05-18",
      etd: "2026-04-28",
      supplier: "Foshan Living Works",
      agent: "Red Sea Gateway",
      value: 91000,
    },
  ],
  containers: [
    {
      no: "MSCU9021456",
      type: "40HQ",
      seal: "SL99871",
      vessel: "MV Ever Summit",
      voyage: "EV2309",
      pol: "Yantian",
      pod: "Los Angeles",
      etd: "2026-05-05",
      eta: "2026-05-23",
      status: "In Transit",
      cargo: "Cosmetics packaging + FBA labels",
      cbm: 61,
      utilization: 91,
    },
    {
      no: "TEMU5540012",
      type: "40GP",
      seal: "SL11204",
      vessel: "MV Gulf Arrow",
      voyage: "GA118",
      pol: "Nansha",
      pod: "Jeddah",
      etd: "2026-04-28",
      eta: "2026-05-18",
      status: "Arrived at Port",
      cargo: "Furniture",
      cbm: 56,
      utilization: 85,
    },
  ],
  partners: [
    {
      company: "Shenzhen Prime Electronics",
      type: "Chinese Supplier",
      city: "Shenzhen",
      contact: "Mr. Lin",
      wechat: "lin-prime-sz",
      whatsapp: "+86 138 0012 6631",
      rating: 4.8,
      leadTime: "5 days",
      reliability: 93,
      notes: "Consistent export packing quality.",
    },
    {
      company: "Dragon Road Logistics",
      type: "Trucking Company",
      city: "Guangzhou",
      contact: "Ms. Zhao",
      wechat: "zhao_dragonroad",
      whatsapp: "+86 139 0088 2301",
      rating: 4.6,
      leadTime: "2 days",
      reliability: 89,
      notes: "Strong same-day pickup coverage.",
    },
    {
      company: "HarborGate Customs",
      type: "Customs Broker",
      city: "Hamburg",
      contact: "Jonas Meier",
      wechat: "N/A",
      whatsapp: "+49 171 220 9934",
      rating: 4.7,
      leadTime: "1 day",
      reliability: 90,
      notes: "Fast import permit coordination.",
    },
  ],
  docs: [
    {
      ship: "S-9901",
      client: "Skyline FBA Ventures",
      type: "Commercial Invoice",
      status: "Approved",
      upload: "2026-05-03",
      missing: "None",
      action: "Archive",
    },
    {
      ship: "S-9902",
      client: "Britannia Imports Ltd",
      type: "Packing List",
      status: "Under Review",
      upload: "2026-05-10",
      missing: "HS code document",
      action: "Request supplier file",
    },
    {
      ship: "S-9903",
      client: "Riyadh Wholesale Hub",
      type: "Import Permit",
      status: "Requested",
      upload: "2026-05-15",
      missing: "Import permit copy",
      action: "Follow up destination agent",
    },
  ],
  invoices: [
    {
      id: "INV-2048",
      client: "Riyadh Wholesale Hub",
      shipment: "S-9903",
      amount: 32900,
      issue: "2026-05-01",
      due: "2026-05-15",
      payment: "Bank Transfer",
      balance: 12900,
      margin: 17,
      status: "Overdue",
    },
    {
      id: "INV-2052",
      client: "Skyline FBA Ventures",
      shipment: "S-9901",
      amount: 22600,
      issue: "2026-05-06",
      due: "2026-05-20",
      payment: "ACH",
      balance: 0,
      margin: 19,
      status: "Paid",
    },
    {
      id: "INV-2055",
      client: "Britannia Imports Ltd",
      shipment: "S-9902",
      amount: 18400,
      issue: "2026-05-11",
      due: "2026-05-25",
      payment: "SWIFT",
      balance: 8400,
      margin: 15,
      status: "Partially Paid",
    },
  ],
  tasks: [
    {
      title: "Follow up with client on ETA update",
      assignee: "Nadia",
      priority: "High",
      due: "2026-05-17",
      client: "Skyline FBA Ventures",
      shipment: "S-9901",
      status: "In Progress",
    },
    {
      title: "Request packing list",
      assignee: "Leo",
      priority: "Medium",
      due: "2026-05-18",
      client: "Britannia Imports Ltd",
      shipment: "S-9902",
      status: "Open",
    },
    {
      title: "Follow up overdue payment",
      assignee: "Mina",
      priority: "Urgent",
      due: "2026-05-17",
      client: "Riyadh Wholesale Hub",
      shipment: "S-9903",
      status: "Blocked",
    },
  ],
};

const today = new Date("2026-05-17");

const badgeClass = (status = "") =>
  `badge ${status.toLowerCase().replace(/\s+/g, "-")}`;

const stagePct = (stage) => {
  const index = shipmentStages.indexOf(stage);
  return index < 0 ? 0 : Math.round(((index + 1) / shipmentStages.length) * 100);
};

const currency = (value) => `$${Number(value || 0).toLocaleString()}`;

function Modal({ open, title, children, onClose, onSave }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{title}</h3>
        {children}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ selected }) {
  return (
    <aside className="detail">
      <h3>Detail Panel</h3>
      {selected ? (
        <>
          <pre>{JSON.stringify(selected, null, 2)}</pre>
          {selected.breakdown && (
            <div className="card">
              <h4>Quote Cost Breakdown</h4>
              {Object.entries(selected.breakdown).map(([key, value]) => (
                <p key={key}>
                  {key}: {currency(value)}
                </p>
              ))}
              <p>
                <strong>Final client price:</strong>{" "}
                {currency(Math.round(selected.cost * (1 + selected.margin / 100)))}
              </p>
              <p>
                <strong>Profit estimate:</strong>{" "}
                {currency(Math.round(selected.cost * (selected.margin / 100)))}
              </p>
            </div>
          )}
        </>
      ) : (
        <p>Select a client, quote, or shipment for details.</p>
      )}
    </aside>
  );
}

function App() {
  const [tab, setTab] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [aiText, setAiText] = useState(
    "Select an AI shortcut to generate operational messaging."
  );
  const [db, setDb] = useState(initialData);
  const [modal, setModal] = useState({ open: false, type: "", form: {} });

  const openCreate = () => {
    const createMap = {
      "Client CRM": {
        type: "client",
        form: {
          name: "",
          company: "",
          country: "",
          type: "",
          email: "",
          phone: "",
          whatsapp: "",
          preferredMethod: "Sea Freight",
          lastContact: "2026-05-17",
          monthlyValue: 0,
          notes: "",
          history: [],
        },
      },
      Quotes: {
        type: "quote",
        form: {
          id: `Q-${Date.now().toString().slice(-4)}`,
          client: "",
          origin: "Shenzhen",
          destination: "USA",
          method: "Sea",
          incoterm: "FOB",
          cargo: "",
          qty: 0,
          cbm: 0,
          gross: 0,
          chargeable: 0,
          cost: 0,
          margin: 15,
          status: "Draft",
          breakdown: {
            freight: 0,
            trucking: 0,
            customs: 0,
            docs: 0,
            insurance: 0,
            service: 0,
          },
        },
      },
      Shipments: {
        type: "shipment",
        form: {
          id: `S-${Date.now().toString().slice(-4)}`,
          client: "",
          cargo: "",
          origin: "Guangzhou",
          destination: "Los Angeles",
          mode: "Sea",
          incoterm: "FOB",
          cbm: 0,
          weight: 0,
          container: "LCL",
          bl: "",
          stage: "Booking Confirmed",
          eta: "2026-05-30",
          etd: "2026-05-20",
          supplier: "",
          agent: "",
          value: 0,
        },
      },
      Tasks: {
        type: "task",
        form: {
          title: "",
          assignee: "",
          priority: "Medium",
          due: "2026-05-20",
          client: "",
          shipment: "",
          status: "Open",
        },
      },
    };

    if (createMap[tab]) {
      setModal({ open: true, ...createMap[tab] });
    }
  };

  const saveModal = () => {
    const { type, form } = modal;

    if (type === "client") {
      setDb((current) => ({
        ...current,
        clients: [
          ...current.clients,
          {
            ...form,
            id: `C-${String(current.clients.length + 1).padStart(3, "0")}`,
          },
        ],
      }));
    }

    if (type === "quote") {
      setDb((current) => ({ ...current, quotes: [form, ...current.quotes] }));
    }

    if (type === "shipment") {
      setDb((current) => ({
        ...current,
        shipments: [form, ...current.shipments],
      }));
    }

    if (type === "task") {
      setDb((current) => ({ ...current, tasks: [form, ...current.tasks] }));
    }

    setModal({ open: false, type: "", form: {} });
  };

  const metrics = useMemo(
    () => ({
      activeClients: db.clients.length,
      openQuotes: db.quotes.filter((quote) =>
        ["Draft", "Sent", "Negotiating"].includes(quote.status)
      ).length,
      activeShipments: db.shipments.filter(
        (shipment) => shipment.stage !== "Delivered"
      ).length,
      delayedShipments: db.shipments.filter(
        (shipment) =>
          new Date(shipment.eta) < today && shipment.stage !== "Delivered"
      ).length,
      monthlyRevenue: db.invoices.reduce(
        (total, invoice) => total + Number(invoice.amount || 0),
        0
      ),
      unpaidInvoices: db.invoices.filter(
        (invoice) => Number(invoice.balance || 0) > 0
      ).length,
      totalCbmShipped: db.shipments.reduce(
        (total, shipment) => total + Number(shipment.cbm || 0),
        0
      ),
      totalContainersShipped: db.containers.length,
      upcomingEtas: db.shipments.filter(
        (shipment) => new Date(shipment.eta) >= today
      ).length,
      urgentTasks: db.tasks.filter((task) =>
        ["Urgent", "High"].includes(task.priority)
      ).length,
    }),
    [db]
  );

  const renderTable = (headers, rows) => (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>BZ Global Freight</h1>
        <p>From China to the World, Freight Made Clear</p>

        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            className={tab === item ? "nav active" : "nav"}
            onClick={() => {
              setTab(item);
              setSelected(null);
            }}
          >
            {item}
          </button>
        ))}
      </aside>

      <main className="main">
        <header className="topbar">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search clients, shipments, quotes..."
          />
          <button className="primary" onClick={openCreate}>
            + Add
          </button>
        </header>

        {tab === "Dashboard" && (
          <>
            <section className="metric-grid">
              {Object.entries(metrics).map(([key, value]) => (
                <article key={key} className="card">
                  <h4>{key.replace(/([A-Z])/g, " $1")}</h4>
                  <strong>
                    {key.includes("Revenue") ? currency(value) : value}
                  </strong>
                </article>
              ))}
            </section>

            <section className="metric-grid small">
              {[
                "Shipments in transit",
                "Pending customs clearance",
                "Payments overdue",
                "Quotes waiting for client approval",
                "Containers arriving this week",
              ].map((label) => (
                <article key={label} className="card">
                  <h4>{label}</h4>
                  <p>Operational visibility panel</p>
                </article>
              ))}
            </section>
          </>
        )}

        {tab === "Client CRM" &&
          renderTable(
            [
              "Name",
              "Company",
              "Country",
              "Type",
              "Email",
              "Phone",
              "WhatsApp",
              "Preferred",
              "Last Contact",
              "Monthly Value",
              "Actions",
            ],
            db.clients
              .filter((client) =>
                JSON.stringify(client)
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((client) => (
                <tr key={client.id} onClick={() => setSelected(client)}>
                  <td>{client.name}</td>
                  <td>{client.company}</td>
                  <td>{client.country}</td>
                  <td>{client.type}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.whatsapp}</td>
                  <td>{client.preferredMethod}</td>
                  <td>{client.lastContact}</td>
                  <td>{currency(client.monthlyValue)}</td>
                  <td>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setAiText(
                          `Subject: Shipment planning follow-up for ${client.company}\n\nHi ${client.name},\n\nWe prepared optimized routing options from China based on your ${client.preferredMethod} preference. I will send the updated quote, ETA range, and document checklist for your review.\n\nBest regards,\nBZ Global Freight`
                        );
                      }}
                    >
                      AI follow-up
                    </button>
                  </td>
                </tr>
              ))
          )}

        {tab === "Quotes" &&
          renderTable(
            [
              "ID",
              "Client",
              "Origin",
              "Destination",
              "Method",
              "Incoterm",
              "Cargo",
              "Qty",
              "CBM",
              "Gross",
              "Chargeable",
              "Cost",
              "Margin",
              "Status",
              "Update",
            ],
            db.quotes.map((quote) => (
              <tr key={quote.id} onClick={() => setSelected(quote)}>
                <td>{quote.id}</td>
                <td>{quote.client}</td>
                <td>{quote.origin}</td>
                <td>{quote.destination}</td>
                <td>{quote.method}</td>
                <td>{quote.incoterm}</td>
                <td>{quote.cargo}</td>
                <td>{quote.qty}</td>
                <td>{quote.cbm}</td>
                <td>{quote.gross}</td>
                <td>{quote.chargeable}</td>
                <td>{currency(quote.cost)}</td>
                <td>{quote.margin}%</td>
                <td>
                  <span className={badgeClass(quote.status)}>
                    {quote.status}
                  </span>
                </td>
                <td>
                  <select
                    value={quote.status}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) =>
                      setDb((current) => ({
                        ...current,
                        quotes: current.quotes.map((item) =>
                          item.id === quote.id
                            ? { ...item, status: event.target.value }
                            : item
                        ),
                      }))
                    }
                  >
                    {[
                      "Draft",
                      "Sent",
                      "Negotiating",
                      "Approved",
                      "Rejected",
                      "Expired",
                    ].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}

        {tab === "Shipments" && (
          <section className="cards">
            {db.shipments.map((shipment) => (
              <article
                key={shipment.id}
                className="card"
                onClick={() => setSelected(shipment)}
              >
                <h3>
                  {shipment.id} · {shipment.client}
                </h3>
                <p>
                  {shipment.origin} ➜ {shipment.destination} · {shipment.mode} ·{" "}
                  {shipment.incoterm}
                </p>
                <p>
                  {shipment.cargo} · {shipment.cbm} CBM · {shipment.weight} kg
                </p>
                <p>
                  Container {shipment.container} · BL {shipment.bl}
                </p>
                <p>
                  <span className={badgeClass(shipment.stage)}>
                    {shipment.stage}
                  </span>
                </p>
                <div className="progress">
                  <span style={{ width: `${stagePct(shipment.stage)}%` }} />
                </div>
                <small>
                  ETD {shipment.etd} · ETA {shipment.eta}
                </small>
                <div style={{ marginTop: 8 }}>
                  <select
                    value={shipment.stage}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) =>
                      setDb((current) => ({
                        ...current,
                        shipments: current.shipments.map((item) =>
                          item.id === shipment.id
                            ? { ...item, stage: event.target.value }
                            : item
                        ),
                      }))
                    }
                  >
                    {shipmentStages.map((stage) => (
                      <option key={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
              </article>
            ))}
          </section>
        )}

        {tab === "Containers" &&
          renderTable(
            [
              "Container",
              "Type",
              "Seal",
              "Vessel",
              "Voyage",
              "POL",
              "POD",
              "ETD",
              "ETA",
              "Status",
              "Cargo",
              "CBM",
              "Util%",
            ],
            db.containers.map((container) => (
              <tr key={container.no}>
                <td>{container.no}</td>
                <td>{container.type}</td>
                <td>{container.seal}</td>
                <td>{container.vessel}</td>
                <td>{container.voyage}</td>
                <td>{container.pol}</td>
                <td>{container.pod}</td>
                <td>{container.etd}</td>
                <td>{container.eta}</td>
                <td>
                  <span className={badgeClass(container.status)}>
                    {container.status}
                  </span>
                </td>
                <td>{container.cargo}</td>
                <td>{container.cbm}</td>
                <td>{container.utilization}%</td>
              </tr>
            ))
          )}

        {tab === "Suppliers & Agents" &&
          renderTable(
            [
              "Company",
              "Type",
              "City",
              "Contact",
              "WeChat",
              "WhatsApp",
              "Rating",
              "Lead",
              "Reliability",
              "Notes",
              "AI",
            ],
            db.partners.map((partner) => (
              <tr key={partner.company}>
                <td>{partner.company}</td>
                <td>{partner.type}</td>
                <td>{partner.city}</td>
                <td>{partner.contact}</td>
                <td>{partner.wechat}</td>
                <td>{partner.whatsapp}</td>
                <td>{partner.rating}</td>
                <td>{partner.leadTime}</td>
                <td>{partner.reliability}</td>
                <td>{partner.notes}</td>
                <td>
                  <button
                    onClick={() =>
                      setAiText(
                        `Negotiation brief for ${partner.company}:\n\nPrioritize transit reliability, pickup SLA, clean export documents, and fast issue escalation. Ask for confirmed lead time, backup contact, and written rate validity.`
                      )
                    }
                  >
                    AI brief
                  </button>
                </td>
              </tr>
            ))
          )}

        {tab === "Customs Documents" &&
          renderTable(
            [
              "Shipment",
              "Client",
              "Type",
              "Status",
              "Upload",
              "Missing",
              "Action",
            ],
            db.docs.map((doc) => (
              <tr key={`${doc.ship}-${doc.type}`}>
                <td>{doc.ship}</td>
                <td>{doc.client}</td>
                <td>{doc.type}</td>
                <td>
                  <span className={badgeClass(doc.status)}>{doc.status}</span>
                </td>
                <td>{doc.upload}</td>
                <td>{doc.missing}</td>
                <td>{doc.action}</td>
              </tr>
            ))
          )}

        {tab === "Invoices" &&
          renderTable(
            [
              "ID",
              "Client",
              "Shipment",
              "Amount",
              "Issue",
              "Due",
              "Payment",
              "Balance",
              "Margin",
              "Status",
            ],
            db.invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.client}</td>
                <td>{invoice.shipment}</td>
                <td>{currency(invoice.amount)}</td>
                <td>{invoice.issue}</td>
                <td>{invoice.due}</td>
                <td>{invoice.payment}</td>
                <td>{currency(invoice.balance)}</td>
                <td>{invoice.margin}%</td>
                <td>
                  <span className={badgeClass(invoice.status)}>
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))
          )}

        {tab === "Tasks" &&
          renderTable(
            [
              "Title",
              "Assignee",
              "Priority",
              "Due",
              "Client",
              "Shipment",
              "Status",
              "Update",
            ],
            db.tasks.map((task, index) => (
              <tr key={`${task.title}-${index}`}>
                <td>{task.title}</td>
                <td>{task.assignee}</td>
                <td>
                  <span className={badgeClass(task.priority)}>
                    {task.priority}
                  </span>
                </td>
                <td>{task.due}</td>
                <td>{task.client}</td>
                <td>{task.shipment}</td>
                <td>
                  <span className={badgeClass(task.status)}>
                    {task.status}
                  </span>
                </td>
                <td>
                  <select
                    value={task.status}
                    onChange={(event) =>
                      setDb((current) => ({
                        ...current,
                        tasks: current.tasks.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, status: event.target.value }
                            : item
                        ),
                      }))
                    }
                  >
                    {["Open", "In Progress", "Done", "Blocked"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}

        {tab === "AI Assistant" && (
          <section className="card">
            <h3>BZ Global Freight AI Assistant</h3>
            <div className="shortcuts">
              {[
                "Generate shipment update",
                "Write delay apology",
                "Create quote message",
                "Prepare customs checklist",
                "Write payment reminder",
                "Translate supplier message to Chinese",
                "Explain DDP vs FOB to client",
                "Summarize today’s urgent shipments",
              ].map((shortcut) => (
                <button
                  key={shortcut}
                  onClick={() =>
                    setAiText(
                      `AI Output: ${shortcut}\n\nPrepared operational text for BZ Global Freight with professional logistics wording and clear next steps.`
                    )
                  }
                >
                  {shortcut}
                </button>
              ))}
            </div>
            <textarea rows="10" value={aiText} readOnly />
            <button onClick={() => navigator.clipboard?.writeText(aiText)}>
              Copy message
            </button>
          </section>
        )}
      </main>

      <DetailPanel selected={selected} />

      <Modal
        open={modal.open}
        title={`Add ${modal.type}`}
        onClose={() => setModal({ open: false, type: "", form: {} })}
        onSave={saveModal}
      >
        <div className="form-grid">
          {Object.keys(modal.form)
            .filter((key) => !["history", "breakdown"].includes(key))
            .map((key) => (
              <label key={key}>
                {key}
                <input
                  value={modal.form[key]}
                  onChange={(event) =>
                    setModal((current) => ({
                      ...current,
                      form: {
                        ...current.form,
                        [key]: event.target.value,
                      },
                    }))
                  }
                />
              </label>
            ))}
        </div>
      </Modal>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
