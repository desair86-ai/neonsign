import React from "react";
import { Footer } from "./Footer";
import { WhatsInTheBox } from "./WhatsInTheBox";
import { ExploreCollections } from "./ExploreCollections";
import { getProductCategories } from "@/lib/wordpress";

export async function GlobalFooter() {
  const categories = await getProductCategories();
  
  const displayCategories = categories.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image?.sourceUrl || ""
  })).filter((c: any) => c.name !== "Uncategorized");

  return (
    <>
      <WhatsInTheBox />
      {displayCategories.length > 0 && (
        <ExploreCollections categories={displayCategories} />
      )}
      <Footer />
    </>
  );
}
