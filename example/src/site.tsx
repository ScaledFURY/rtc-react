import { Lander } from "./lander";
import { Checkout } from "./checkout";
import { Upsell1 } from "./upsell1";
import { Receipt } from "./receipt";
import { BrokenVariants } from "./broken_variants";

import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export function Site(props:any) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Lander {...props} />} />
        <Route path="/checkout" element={<Checkout {...props} />} />
        <Route path="/upsell1"  element={<Upsell1 {...props} />} />
        <Route path="/receipt"  element={<Receipt {...props} />} />
        <Route path="/broken_variants"  element={<BrokenVariants {...props} />} />

      </Routes>
    </BrowserRouter>
  );
}
