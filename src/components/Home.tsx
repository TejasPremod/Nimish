/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from "./Hero";
import { Features } from "./Features";
import { Testimonials } from "./Testimonials";
import { CTA } from "./CTA";

export const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
};
