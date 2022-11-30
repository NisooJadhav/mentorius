import React from "react";

export default function CompanyMarquee() {
  return (
    <div className="bg-black-900/50">
      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee whitespace-nowrap">
          <span className="text-4xl mx-4">Marquee Item 1</span>
          <span className="text-4xl mx-4">Marquee Item 2</span>
          <span className="text-4xl mx-4">Marquee Item 3</span>
          <span className="text-4xl mx-4">Marquee Item 4</span>
          <span className="text-4xl mx-4">Marquee Item 5</span>
        </div>
        <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
          <span className="text-4xl mx-4">Marquee Item 1</span>
          <span className="text-4xl mx-4">Marquee Item 2</span>
          <span className="text-4xl mx-4">Marquee Item 3</span>
          <span className="text-4xl mx-4">Marquee Item 4</span>
          <span className="text-4xl mx-4">Marquee Item 5</span>
          <span className="text-4xl mx-4">Marquee Item 6</span>
          <span className="text-4xl mx-4">Marquee Item 7</span>
        </div>
      </div>
    </div>
  );
}
