import AIInsights from "./AIInsights";

function MatchResult({ result }) {
  const score = result.final_score.toFixed(2) * 100;

  return (
    <div className="mt-10 space-y-6">
      {/* SCORE CARD */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Overall Match Score
        </p>
        <h2
          className={`text-5xl font-bold mt-2 ${
            score >= 70
              ? "text-green-400"
              : score >= 40
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {Math.floor(score)}%
        </h2>
      </div>

      {/* SKILLS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* MATCHED SKILLS */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">
            ✅ Matched Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {result.match_info.matched_skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* MISSING SKILLS */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3">
            ❌ Missing Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {result.match_info.absent_skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          🧠 AI Insights
        </h3>
        <AIInsights markdownContent={result.insights}/>
      </div>
    </div>
  );
}

export default MatchResult;
