import { useState } from "react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Shield,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ===== AGE → GROUP ===== */
const mapAgeToGroup = (age: number) => {
  if (age <= 24) return 1;
  if (age <= 29) return 2;
  if (age <= 34) return 3;
  if (age <= 39) return 4;
  if (age <= 44) return 5;
  if (age <= 49) return 6;
  if (age <= 54) return 7;
  if (age <= 59) return 8;
  if (age <= 64) return 9;
  if (age <= 69) return 10;
  if (age <= 74) return 11;
  if (age <= 79) return 12;
  return 13;
};

export default function RiskAnalysis() {
  const [showForm, setShowForm] = useState(false);
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    _AGE_G: 0,
    _SEX: 0,
    MARITAL: 0,
    EMPLOY1: 0,
    INCOME3: 0,
    EDUCA: 0,
    MEDCOST1: 0,
    SDHFOOD1: 0,
    SDHBILLS: 0,
    EXERANY2: 0,
    SMOKE100: 0,
    ALCDAY4: 0,
    DIABETE4: 0,
    HAVARTH4: 0,
    GENHLTH: 0,
    LSATISFY: 0,
    EMTSUPRT: 0,
  });

  const [result, setResult] = useState<null | {
    care_gap_required: boolean;
    next_action: string;
    risk_percentage: number;
    risk_type: "LOW" | "MODERATE" | "HIGH";
  }>(null);

  const update = (key: string, value: number) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const payload = {
      ...data,
      _AGE_G: mapAgeToGroup(Number(age)),
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setResult(json);
    } catch (e) {
      console.error("API error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-10 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* ================= AWARENESS ================= */}
          {!showForm && (
            <>
              {/* BACK TO HOME */}
              <Link to="/home">
                <GradientButton variant="ghost" size="sm" className="mb-10">
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </GradientButton>
              </Link>

              <section className="text-center mb-16">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-violet-500/20 items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-violet-400" />
                </div>

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-semibold text-violet-300">
                    AI-Powered Mental Health Risk Prediction
                  </span>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  Predictive <span className="text-violet-400">Risk Analysis</span>
                </h1>

                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We analyze 17 evidence-based factors to estimate mental health
                  risk and determine if care gap intervention is required.
                </p>
              </section>

              <section className="grid md:grid-cols-3 gap-6 mb-16">
                <InfoCard icon={<Shield className="w-8 h-8 text-violet-400" />} title="Privacy First" desc="Your data is never stored." />
                <InfoCard icon={<Lightbulb className="w-8 h-8 text-violet-400" />} title="Evidence-Based" desc="Built on public health research." />
                <InfoCard icon={<Brain className="w-8 h-8 text-violet-400" />} title="AI-Driven" desc="ML evaluates all factors together." />
              </section>

              <div className="text-center">
                <Button
                  size="lg"
                  className="px-12 h-14 text-lg rounded-xl bg-gradient-to-r from-violet-500 to-pink-500"
                  onClick={() => setShowForm(true)}
                >
                  Start Risk Assessment <ArrowRight className="ml-2" />
                </Button>
              </div>
            </>
          )}

          {/* ================= FORM ================= */}
          {showForm && (
            <>
              {/* BACK TO AWARENESS */}
              <GradientButton
                variant="ghost"
                size="sm"
                className="mb-6"
                onClick={() => setShowForm(false)}
              >
                <ArrowLeft className="h-1 w-4" /> Back
              </GradientButton>

              <div className="glass-card rounded-3xl p-8 space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center">
                    <Activity className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold">
                      Risk Assessment Form
                    </h2>
                    <p className="text-muted-foreground">
                      All 17 fields are required
                    </p>
                  </div>
                </div>

                {/* ===== ALL 17 INPUTS ===== */}
                <Field label="Age">
                  <input
                    type="number"
                    min={18}
                    className="glass-input w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Field>

                <Binary label="Sex" yes="Male" no="Female"
                  onYes={() => update("_SEX", 1)}
                  onNo={() => update("_SEX", 2)}
                />

                <Select label="Marital Status" onChange={(v)=>update("MARITAL",v)}
                  options={[[1,"Married"],[2,"Divorced"],[3,"Widowed"],[4,"Separated"],[5,"Never married"],[6,"Unmarried couple"]]}
                />

                <Select label="Employment Status" onChange={(v)=>update("EMPLOY1",v)}
                  options={[[1,"Employed"],[2,"Self-employed"],[3,"Out of work"],[4,"Homemaker"],[5,"Student"],[6,"Retired"],[7,"Unable to work"]]}
                />

                <Select label="Annual Income" onChange={(v)=>update("INCOME3",v)}
                  options={[[1,"0–$10k"],[2,"$10k–$15k"],[3,"$15k–$20k"],[4,"$20k–$25k"],[5,"$25k–$35k"],[6,"$35k–$50k"],[7,"$50k–$75k"],[8,"$75k–$100k"],[9,"$100k–$150k"],[10,"$150k–$200k"],[11,"$200k+"]]}
                />

                <Select label="Education Level" onChange={(v)=>update("EDUCA",v)}
                  options={[[1,"No schooling"],[2,"Elementary"],[3,"Some high school"],[4,"High school graduate"],[5,"Some college"],[6,"College graduate"]]}
                />

                <Binary label="Skipped doctor visit due to cost?"
                  onYes={()=>update("MEDCOST1",1)}
                  onNo={()=>update("MEDCOST1",0)}
                />

                <Select label="Food insecurity" onChange={(v)=>update("SDHFOOD1",v)}
                  options={[[1,"Often"],[2,"Sometimes"],[3,"Never"]]}
                />

                <Select label="Difficulty paying bills" onChange={(v)=>update("SDHBILLS",v)}
                  options={[[1,"Very difficult"],[2,"Somewhat"],[3,"Not difficult"]]}
                />

                <Binary label="Did exercise in last 30 days?"
                  onYes={()=>update("EXERANY2",1)}
                  onNo={()=>update("EXERANY2",0)}
                />

                <Binary label="Smoked ≥100 cigarettes?"
                  onYes={()=>update("SMOKE100",1)}
                  onNo={()=>update("SMOKE100",0)}
                />

                <Field label="Alcohol use (last 30 days)">
                  <div className="text-center text-violet-400 mb-2">
                    {data.ALCDAY4} days
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    value={data.ALCDAY4}
                    onChange={(e)=>update("ALCDAY4",+e.target.value)}
                    className="w-full accent-violet-500"
                  />
                </Field>

                <Binary label="Has diabetes?"
                  onYes={()=>update("DIABETE4",1)}
                  onNo={()=>update("DIABETE4",0)}
                />

                <Binary label="Has arthritis?"
                  onYes={()=>update("HAVARTH4",1)}
                  onNo={()=>update("HAVARTH4",0)}
                />

                <Select label="General health" onChange={(v)=>update("GENHLTH",v)}
                  options={[[1,"Excellent"],[2,"Very good"],[3,"Good"],[4,"Fair"],[5,"Poor"]]}
                />

                <Select label="Life satisfaction" onChange={(v)=>update("LSATISFY",v)}
                  options={[[1,"Very satisfied"],[2,"Satisfied"],[3,"Dissatisfied"],[4,"Very dissatisfied"]]}
                />

                <Select label="Emotional support" onChange={(v)=>update("EMTSUPRT",v)}
                  options={[[1,"Always"],[2,"Usually"],[3,"Sometimes"],[4,"Rarely"],[5,"Never"]]}
                />

                <GradientButton size="lg" className="w-full" onClick={handleSubmit}>
                  {loading ? "Analyzing..." : "Submit Risk Analysis"}
                </GradientButton>

                {result && (
                  <div className={`mt-6 rounded-2xl p-6 border ${
                    result.risk_type === "LOW"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : result.risk_type === "MODERATE"
                      ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}>
                    <h3 className="text-xl font-bold mb-2">
                      Risk Level: {result.risk_type}
                    </h3>
                    <p>Risk Percentage: <b>{result.risk_percentage.toFixed(2)}%</b></p>
                    <p>Next Action: <b>{result.next_action}</b></p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* ===== HELPERS ===== */
function InfoCard({ icon, title, desc }: any) {
  return (
    <div className="glass-card p-6 rounded-2xl">
      {icon}
      <h3 className="font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Select({ label, options, onChange }: any) {
  return (
    <Field label={label}>
      <select className="glass-input w-full" onChange={(e)=>onChange(+e.target.value)}>
        <option value="">Select</option>
        {options.map(([v,l]:any)=>(
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </Field>
  );
}

function Binary({ label, yes="Yes", no="No", onYes, onNo }: any) {
  return (
    <Field label={label}>
      <div className="glass-input flex gap-6">
        <label><input type="radio" onChange={onYes} /> {yes}</label>
        <label><input type="radio" onChange={onNo} /> {no}</label>
      </div>
    </Field>
  );
}
