type DRepProfileProps = {
  params: Promise<{
    profile: string;
  }>;
};

// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1458&t=GGJEhGlKd8rVords-4
export default async function DRepProfilePage({ params }: DRepProfileProps) {
  const { profile } = await params;
  return <div>Profile {profile}</div>;
}
