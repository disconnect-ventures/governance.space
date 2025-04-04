import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";
import { Dictionary } from "~/config/dictionaries";

type HelpAccordionProps = {
  translations: Dictionary["pageHelp"];
};

export function HelpAccordion({ translations }: HelpAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-2"
      defaultValue="governance"
    >
      <AccordionItem
        value="governance"
        className="border-none rounded-lg bg-card p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-lg text-foreground">
          {translations.category1}
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-2"
            defaultValue="voting-power-usage"
          >
            <AccordionItem value="voting-power-usage" className="border-none">
              <AccordionTrigger className="hover:no-underline text-foreground">
                {translations.question11}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {translations.answer11}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="voting-power" className="border-none">
              <AccordionTrigger className="hover:no-underline font-medium text-foreground">
                {translations.question12}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {translations.answer12}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governance-action" className="border-none">
              <AccordionTrigger className="hover:no-underline text-foreground">
                {translations.question13}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>{translations.answer131}</p>
                <p>{translations.answer132}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem
        value="delegation"
        className="border-none rounded-lg bg-card p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-lg text-foreground">
          {translations.category2}
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem
              value="choose-representative"
              className="border-none"
            >
              <AccordionTrigger className="hover:no-underline text-foreground">
                {translations.question21}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {translations.answer21}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>

      <Separator />

      <AccordionItem
        value="proposals"
        className="border-none rounded-lg bg-card p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-lg text-foreground">
          {translations.category3}
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="governance-action-2" className="border-none">
              <AccordionTrigger className="hover:no-underline text-foreground">
                {translations.question31}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {translations.answer31}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>

      <Separator />
      <AccordionItem
        value="voting"
        className="border-none rounded-lg bg-card p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-lg text-foreground">
          {translations.category4}
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="on-chain-voting" className="border-none">
              <AccordionTrigger className="hover:no-underline text-foreground">
                {translations.question41}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>{translations.answer41}</p>
                <p>{translations.answer42}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
