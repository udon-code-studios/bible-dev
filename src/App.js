import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Testament from './pages/Testament';

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
            <Route path="nt" element={<Testament testament="nt" />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
