import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getOrg(org_id: string) {
  try {
    console.log(org_id);
    const org = await prisma.organization.findUniqueOrThrow({
      where: { id: org_id },
    });
    return org;
  } catch (error) {
    console.log(error);
    throw Error("org not found");
  }
}

export default async function OrgPage({
  params,
}: {
  params: { org_id: string };
}) {
  const org = await getOrg(params.org_id);
  return (
    <div className="flex flex-col gap-2">
      <div>english name : {org.nameEn}</div>
      <div>arabic name : {org.nameAr}</div>
      <Link
        href={`./${org.id}/manage`}
        className="bg-blue-500 text-white rounded p-4"
      >
        manage Organization
      </Link>
    </div>
  );
}
