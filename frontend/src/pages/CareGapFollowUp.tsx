import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { GradientButton } from "@/components/ui/gradient-button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* ================== US STATES ================== */
const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DC","FL","GA","HI","ID","IL","IN","IA","KS",
  "KY","LA","MA","MD","MI","MN","MO","NC","ND","NE","NH","NJ","NM","NV","NY","OH",
  "OK","OR","PA","SC","SD","TN","TX","UT","VA","WA","WI","WV","WY"
];

/* ================== CITY + STATE DATA ================== */
const CITY_STATE = [
  { city: "New York", state: "NY" },
  { city: "Los Angeles", state: "CA" },
  { city: "Chicago", state: "IL" },
  { city: "Houston", state: "TX" },
  { city: "Dallas", state: "TX" },
  { city: "Austin", state: "TX" },
  { city: "San Antonio", state: "TX" },
  { city: "San Diego", state: "CA" },
  { city: "San Jose", state: "CA" },
  { city: "Miami", state: "FL" },
  { city: "Boston", state: "MA" },
  { city: "Seattle", state: "WA" },
  { city: "Portland", state: "OR" },
  { city: "Denver", state: "CO" },
  { city: "Phoenix", state: "AZ" },
  { city: "Columbus", state: "OH" },
  { city: "Pittsburgh", state: "PA" },
  { city: "Nashville", state: "TN" },
  { city: "Minneapolis", state: "MN" },
];

/* ================== PAGE ================== */
export default function CareGapFollowUp({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();

  const [visitedDoctor, setVisitedDoctor] = useState<boolean | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [report, setReport] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);
  const [showDoctors, setShowDoctors] = useState(false);

  const filteredCities = CITY_STATE
    .filter(c => c.state === state)
    .map(c => c.city);

  /* ================== SUBMIT ================== */
  const handleSubmit = async () => {
    if (visitedDoctor === null) {
      alert("Please select whether you consulted a doctor earlier.");
      return;
    }

    if (visitedDoctor && !report) {
      alert("Please upload your medical report.");
      return;
    }

    if (!visitedDoctor && !symptoms.trim()) {
      alert("Please describe your mental health symptoms.");
      return;
    }

    if (!state || !city) {
      alert("State and City are mandatory.");
      return;
    }

    setLoading(true);

    const baseData = JSON.parse(
      sessionStorage.getItem("careGapForm") || "{}"
    );

    const formData = new FormData();

    Object.entries(baseData).forEach(([k, v]) =>
      formData.append(k, String(v))
    );

    formData.append("text", visitedDoctor ? "" : symptoms);
    formData.append("state", state);
    formData.append("city", city);

    if (report) {
      formData.append("image", report);
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:5000/care-gap/self-check",
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Backend rejected request");

      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      alert("Care gap analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================== TOP 2 FACTORS ================== */
  const topTwoFactors =
    result?.mental_health &&
    Object.entries(result.mental_health)
      .sort((a: any, b: any) => b[1].score - a[1].score)
      .slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isAuthenticated onLogout={onLogout} />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-6">

          <Link to="/care-gap-form">
            <GradientButton variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" /> Back
            </GradientButton>
          </Link>

          {!result && (
            <div className="glass-card rounded-3xl p-8 space-y-6">
              <h1 className="text-2xl font-bold">Care Gap – Follow Up</h1>

              <Field label="Have you consulted a doctor earlier?">
                <div className="glass-input flex gap-8">
                  <label className="flex items-center gap-2">
                    <input type="radio" onChange={() => setVisitedDoctor(true)} />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" onChange={() => setVisitedDoctor(false)} />
                    No
                  </label>
                </div>
              </Field>

              {visitedDoctor === true && (
                <Field label="Upload medical report">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="glass-input w-full"
                    onChange={(e) =>
                      setReport(e.target.files?.[0] || null)
                    }
                  />
                </Field>
              )}

              {visitedDoctor === false && (
                <Field label="Describe your mental health symptoms">
                  <textarea
                    className="glass-input w-full min-h-[120px]"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Explain how you are feeling..."
                  />
                </Field>
              )}

              <Field label="State (US)">
                <input
                  list="state-list"
                  className="glass-input w-full"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value.toUpperCase());
                    setCity("");
                  }}
                  placeholder="TX, CA, NY..."
                />
                <datalist id="state-list">
                  {US_STATES.map(s => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </Field>

              <Field label="City">
                <input
                  list="city-list"
                  className="glass-input w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={state ? "Start typing city" : "Select state first"}
                  disabled={!state}
                />
                <datalist id="city-list">
                  {filteredCities.map(c => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>

              <GradientButton
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Submit Care Gap Analysis"}
              </GradientButton>
            </div>
          )}

          {result && (
            <div className="glass-card rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-bold">{result.action}</h2>
              <p>Risk Score: <b>{result.risk_score}</b></p>

              {result.action === "Care gap recommendations suggested" && (
                <>
                  <p className="font-semibold">Top concerns:</p>
                  <ul className="list-disc list-inside text-orange-300">
                    {topTwoFactors.map(([label, info]: any) => (
                      <li key={label}>
                        <b>{label}</b> – {info.severity} ({info.score}%)
                      </li>
                    ))}
                  </ul>

                  <GradientButton
                    className="w-full"
                    onClick={() => navigate("/disorders")}
                  >
                    Care Gap Recommendation →
                  </GradientButton>
                </>
              )}

              {result.action === "Doctor consultation recommended" && (
                <>
                  <p className="font-semibold text-red-400">Critical concerns:</p>
                  <ul className="list-disc list-inside text-red-300">
                    {topTwoFactors.map(([label, info]: any) => (
                      <li key={label}>
                        <b>{label}</b> – {info.severity} 
                      </li>
                    ))}
                  </ul>

                  {!showDoctors ? (
                    <GradientButton
                      className="w-full"
                      onClick={() => setShowDoctors(true)}
                    >
                      Doctor Concern →
                    </GradientButton>
                  ) : (
                    <div className="space-y-4">
                      {result.doctors.map((d: any) => (
                        <div key={d.NPI} className="glass-card p-4 rounded-xl">
                          <p className="font-semibold">
                            {d.first_name} {d.last_name}, {d.credential}
                          </p>
                          <p>{d.primary_specialty}</p>
                          <p>{d.city}, {d.state}</p>
                          <p>📞 {d.phone}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ================= FIELD ================= */
function Field({ label, children }: any) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
