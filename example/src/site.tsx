import { Lander } from "./lander";
import { Checkout } from "./checkout";

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
        <Route path="/" element={<Lander {...props} />} />
        <Route path="/checkout" element={<Checkout {...props} />} />
      </Routes>
    </BrowserRouter>
  );
}
