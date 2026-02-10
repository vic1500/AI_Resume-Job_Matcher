import { useState } from "react";
import MatchResult from "../components/MatchResult";
import Navbar from "../components/Navbar.jsx";
import MatchPage from "../components/MatchPage.jsx";
import SignupCTA from "../components/SignupCTA.jsx";


function GuestMatch() {
  const [result, setResult] = useState(null);

  return (
      <div className={`p-2 mx-0 md:p-10 md:mx-10`}>
        <MatchPage setResult={setResult} />
        {result && <MatchResult result={result} />}
        {result && <SignupCTA />}

      </div>
  );
}


export default GuestMatch