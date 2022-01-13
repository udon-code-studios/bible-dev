import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import Testament from './components/Testament';
import { AnimatePresence } from 'framer-motion';


export default function App() {
  const location = useLocation();

  return (
    <div className="relative flex flex-col min-h-screen bg-stone-400 text-stone-900">
      <Header />

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="ot" element={<Testament testament="ot" />} />
            <Route path="nt" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>


      <Footer />
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
