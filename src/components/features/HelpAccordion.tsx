import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";

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
        className="border-none rounded-lg bg-card p-4"
      >
        <AccordionTrigger className="hover:no-underline font-semibold text-lg text-foreground">
          Governance
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
                Ways to use your Voting Power?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Every ADA holder has an amount of Voting Power equal to the
                amount of Lovelace they have in a wallet. When you link a wallet
                containing ADA to GovTool, GovTool will read the ADA balance in
                the wallet, and make it available to you to use as Voting Power.
                Voting Power can be used in several ways: Delegate your Voting
                Power to a DRep, How to delegate your Voting Power.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="voting-power" className="border-none">
              <AccordionTrigger className="hover:no-underline font-medium text-foreground">
                What is Voting Power?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                For ada holders voting power refers to the amount of ada they
                own. For registered DReps Voting Power refers to both to the
                voting power they own and to the voting power that other ada
                holders have delegated to them.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governance-action" className="border-none">
              <AccordionTrigger className="hover:no-underline text-foreground">
                What is a Governance Action?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  A governance action is a proposal that is submitted on-chain
                  for voting. It is an on-chain event triggered by a transaction
                  and typically comes with an expiration period, after which the
                  action cannot be enacted. Any ADA holder can submit a
                  governance action, and once it&lsquo;s recorded on the ledger,
                  voting transactions can be submitted to approve or ratify the
                  action.
                </p>
                <p>
                  Additionally, once a governance action is ratified after
                  reaching defined thresholds, it is enacted on-chain according
                  to a set of rules.
                </p>
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
          Delegation
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem
              value="choose-representative"
              className="border-none"
            >
              <AccordionTrigger className="hover:no-underline text-foreground">
                How to choose a DRep?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Search for a DRep in the DReps Directory and after choosing,
                click on Delegate Voting Power.
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
          Proposals
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="governance-action-2" className="border-none">
              <AccordionTrigger className="hover:no-underline text-foreground">
                What is the difference between a governance proposal and a
                governance action?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                A governance proposal is essentially a draft governance
                action—it represents a proposal that has not yet been submitted
                on-chain. In contrast, a governance action is a proposal that
                has been submitted on-chain for voting, making it an official
                on-chain event that includes features such as an expiration
                period, after which it can no longer be enacted.
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
          Voting
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="on-chain-voting" className="border-none">
              <AccordionTrigger className="hover:no-underline text-foreground">
                What is On-Chain Voting?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  On-Chain Voting is the process that allows the 3 voting bodies
                  (DReps, SPOs, Constitutional Committee) to submit their
                  decision about On-Chain active Governance Actions, and so
                  allows the Cardano Community and its ADA Holders to be
                  represented in the Governance of Cardano.
                </p>
                <p>
                  In order for a Governance Action to get ratified through
                  On-Chain voting it needs to meet voting thresholds from some
                  or all of the voting bodies (depending on the Governance
                  Action Type).
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
