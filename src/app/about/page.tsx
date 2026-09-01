import React from "react";
import { Header } from "@/components/clone/Header";
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { AboutClient } from "./AboutClient";

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutClient />
      <GlobalFooter />
    </>
  );
}
