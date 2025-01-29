import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function HelpAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-2"
      defaultValue="governance"
    >
      <AccordionItem
        value="governance"
        className="border-none rounded-lg bg-white p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-sm">
          Governance
        </AccordionTrigger>
        <AccordionContent>
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-2"
            defaultValue="voting-power-usage"
          >
            <AccordionItem value="voting-power-usage" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                Ways to use your Voting Power?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                Every ADA holder has an amount of Voting Power equal to the
                amount of Lovelace they have in a wallet. When you link a wallet
                containing ADA to GovTool, GovTool will read the ADA balance in
                the wallet, and make it available to you to use as Voting Power.
                Voting Power can be used in several ways: Delegate your Voting
                Power to a DRep, How to delegate your Voting Power.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="voting-power" className="border-none">
              <AccordionTrigger className="hover:no-underline font-medium">
                What is Voting Power?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                For ada holders voting power refers to the amount of ada they
                own. For registered DReps Voting Power refers to both to the
                voting power they own and to the voting power that other ada
                holders have delegated to them.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governance-action" className="border-none">
              <AccordionTrigger className="hover:no-underline ">
                What is a Governance Action?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                We define seven different types of governance actions. A
                governance action is an on-chain event that is triggered by a
                transaction and has a deadline after which it cannot be enacted.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="delegation"
        className="border-none rounded-lg bg-white p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-sm">
          Delegation
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="governance-action-2" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                What is a Governance Action?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                Content for governance action under delegation section.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="choose-representative"
              className="border-none"
            >
              <AccordionTrigger className="hover:no-underline">
                Como escolher um representante?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                Content about choosing a representative.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="proposals"
        className="border-none rounded-lg bg-white p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-sm">
          Proposals
        </AccordionTrigger>
        <AccordionContent className="text-sm text-gray-600">
          Proposals content goes here.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="voting"
        className="border-none rounded-lg bg-white p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-sm">
          Voting
        </AccordionTrigger>
        <AccordionContent className="text-sm text-gray-600">
          Voting content goes here.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
