// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-action=34-2076&t=GGJEhGlKd8rVords-4
type GovernanceActionDetailsProps = {
  params: Promise<{
    action: string;
  }>;
};

//  TODO
export default async function GovernanceActionDetailsPage({
  params,
}: GovernanceActionDetailsProps) {
  const { action } = await params;
  return <div>Governance Action Details {action}</div>;
}
