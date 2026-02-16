import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { GradientButton } from "@/components/ui/gradient-button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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

export default function CareGapForm() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");

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

  const update = (key: string, value: number) =>
    setData((prev) => ({ ...prev, [key]: value }));

  /* ===== SAVE + NAVIGATE ===== */
  const handleNext = () => {
    if (!age) {
      alert("Age is required");
      return;
    }

    const payload = {
      ...data,
      _AGE_G: mapAgeToGroup(Number(age)),
    };

    // ✅ STORE 17 FEATURES
    sessionStorage.setItem("careGapForm", JSON.stringify(payload));

    // 👉 MOVE TO FOLLOW-UP PAGE
    navigate("/care-gap-followup");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isAuthenticated />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">

          <Link to="/care-gap-analysis">
            <GradientButton variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4" /> Back
            </GradientButton>
          </Link>

          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold">
                  Care Gap Assessment
                </h2>
                <p className="text-muted-foreground">
                  All 17 fields are required
                </p>
              </div>
            </div>

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
              options={[
                [1,"Married"],[2,"Divorced"],[3,"Widowed"],
                [4,"Separated"],[5,"Never married"],[6,"Unmarried couple"]
              ]}
            />

            <Select label="Employment Status" onChange={(v)=>update("EMPLOY1",v)}
              options={[
                [1,"Employed"],[2,"Self-employed"],[3,"Out of work"],
                [4,"Homemaker"],[5,"Student"],[6,"Retired"],[7,"Unable to work"]
              ]}
            />

            <Select label="Annual Income" onChange={(v)=>update("INCOME3",v)}
              options={[
                [1,"0 – $10,000"],[2,"$10k – $14,999"],[3,"$15k – $19,999"],
                [4,"$20k – $24,999"],[5,"$25k – $34,999"],
                [6,"$35k – $49,999"],[7,"$50k – $74,999"],
                [8,"$75k – $99,999"],[9,"$100k – $149,999"],
                [10,"$150k – $199,999"],[11,"$200k+"]
              ]}
            />

            <Select label="Education Level" onChange={(v)=>update("EDUCA",v)}
              options={[
                [1,"No schooling"],[2,"Elementary"],[3,"Some high school"],
                [4,"High school graduate"],[5,"Some college"],[6,"College graduate"]
              ]}
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
              options={[
                [1,"🌟 Excellent"],[2,"😊 Very good"],
                [3,"🙂 Good"],[4,"😕 Fair"],[5,"😞 Poor"]
              ]}
            />

            <Select label="Life satisfaction" onChange={(v)=>update("LSATISFY",v)}
              options={[
                [1,"😁 Very satisfied"],[2,"🙂 Satisfied"],
                [3,"😐 Dissatisfied"],[4,"😔 Very dissatisfied"]
              ]}
            />

            <Select label="Emotional support" onChange={(v)=>update("EMTSUPRT",v)}
              options={[
                [1,"💖 Always"],[2,"🤗 Usually"],
                [3,"🙂 Sometimes"],[4,"😕 Rarely"],[5,"🚫 Never"]
              ]}
            />

            <GradientButton size="lg" className="w-full" onClick={handleNext}>
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </GradientButton>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ===== HELPERS ===== */
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
  const name = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <Field label={label}>
      <div className="glass-input flex items-center gap-8 py-3 px-4">
        <label className="flex items-center gap-2">
          <input type="radio" name={name} onChange={onYes} />
          {yes}
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name={name} onChange={onNo} />
          {no}
        </label>
      </div>
    </Field>
  );
}
