import React, { useState } from 'react';

function OnYourMark() {
  const [subject, setSubject] = useState<string>('');

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleStartClick = () => {
    console.log(`Start ${subject}`);
  };

  return (
    <div>
      <h2 className="text-2xl">何についての草稿を書きますか？</h2>
      <input
        type="text"
        value={subject}
        onChange={handleSubjectChange}
        placeholder="Subject"
        className="input input-bordered w-full max-w-xs mx-2"
      />
      <button className="btn btn-primary mx-2" onClick={handleStartClick}>
        Start
      </button>
    </div>
  );
}

export default OnYourMark;
