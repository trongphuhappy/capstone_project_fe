"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DetailProps {
  description: string;
  policies: string;
}

export default function Detail({ description, policies }: DetailProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-7">Detail</h2>
      <div className="my-2">
        <Accordion type="multiple">
          <AccordionItem value="item-1" className="py-4 border-t">
            <AccordionTrigger>
              <h3 className="text-[18px] font-semibold">Description</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-[16px]">{description}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="multiple">
          <AccordionItem value="item-2" className="py-4">
            <AccordionTrigger>
              <h3 className="text-[18px] font-semibold">Policy</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-[16px]">{policies}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
