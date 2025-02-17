import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Add from './Add';
import January from './January';
import February from './February';
import March from './March';
import April from './April';
import May from './May';
import June from './June';
import July from './July';
import August from './August';
import September from './September';
import October from './October';
import November from './November';
import December from './December';



// Add similar components for other months...

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
<Route path="/" element={<Add />} />
<Route path="/january" element={<January />} />
<Route path="/february" element={<February />} />
<Route path="/march" element={<March />} />
<Route path="/april" element={<April />} />
<Route path="/may" element={<May />} />
<Route path="/june" element={<June />} />
<Route path="/july" element={<July />} />
<Route path="/august" element={<August />} />
<Route path="/september" element={<September />} />
<Route path="/october" element={<October />} />
<Route path="/november" element={<November />} />
<Route path="/december" element={<December />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
