import { useState, useEffect } from "react";
import API from "./api";
import "./App.css";
import MoodDashboard from "./components/MoodDashboard";

function App() {

const userId = "123";

const [text, setText] = useState("");
const [ambience, setAmbience] = useState("forest");
const [entries, setEntries] = useState([]);
const [analysis, setAnalysis] = useState(null);
const [insights, setInsights] = useState(null);


const fetchEntries = async () => {
  const res = await API.get(`/journal/${userId}`);
  setEntries(res.data);
};

const saveEntry = async () => {
  if(!text) return;

  await API.post("/journal", {
    userId,
    ambience,
    text,
  });

  setText("");
  fetchEntries();
};

const analyzeEntry = async () => {
  const res = await API.post("/journal/analyze", { text });
  setAnalysis(res.data);
};

const fetchInsights = async () => {
  const res = await API.get(`/journal/insights/${userId}`);
  setInsights(res.data);
};

useEffect(() => {
  fetchEntries();
}, []);

return (
<div className="container">

<h1>AI Journal System</h1>


<div className="card">

<h2>Write Journal</h2>

<textarea
placeholder="Write your thoughts..."
value={text}
onChange={(e)=>setText(e.target.value)}
/>

<select value={ambience} onChange={(e)=>setAmbience(e.target.value)}>
<option value="forest">Forest</option>
<option value="ocean">Ocean</option>
<option value="mountain">Mountain</option>
</select>

<div className="btns">
<button onClick={saveEntry}>Save Entry</button>
<button onClick={analyzeEntry}>Analyze</button>
</div>

</div>

{analysis && (
<div className="card">
<h2>Emotion Analysis</h2>

<p><b>Emotion:</b> {analysis.emotion}</p>
<p><b>Keywords:</b> {analysis.keywords?.join(", ")}</p>
<p><b>Summary:</b> {analysis.summary}</p>

</div>
)}

<div className="card">

<h2>Previous Entries</h2>

{entries.map((entry,index)=>(
<div key={index} className="entry">

<p>{entry.text}</p>
<span>{entry.ambience}</span>

</div>
))}

</div>

<div className="card">

<button onClick={fetchInsights}>Load Insights</button>

{insights && (
<div>

<h2>Insights</h2>

<p>Total Entries: {insights.totalEntries}</p>
<p>Top Emotion: {insights.topEmotion}</p>
<p>Most Used Ambience: {insights.mostUsedAmbience}</p>
<p>Keywords: {insights.recentKeywords?.join(", ")}</p>

</div>
)}

</div>
<MoodDashboard userId={userId} />
</div>


);
}

export default App;