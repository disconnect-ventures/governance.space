// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-action=34-2076&t=GGJEhGlKd8rVords-4
type ProposalDetailsProps = {
  params: Promise<{
    proposal: string;
  }>;
};

//  TODO
export default async function ProposalDetailsPage({
  params,
}: ProposalDetailsProps) {
  const { proposal } = await params;
  return <div>Proposal Details {proposal}</div>;
}
