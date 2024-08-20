import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getOrgs() {
  const orgs = await prisma.organization.findMany({
    include: { _count: { select: { editors: true } } },
  });
  return orgs;
}

export const dynamic = "force-dynamic";

export default async function OrgsPage() {
  const orgs = await getOrgs();
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 md:p-8 min-h-screen bg-black text-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Manage Organizations</h1>
      {orgs.length === 0 ? (
        <p className="text-lg text-center">No organizations created</p>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          {orgs.map((org) => (
            <Link
              href={`/org/${org.id}`}
              key={org.id}
              className="flex justify-between items-center bg-gray-800 rounded-md p-4 shadow-md w-full max-w-md hover:bg-gray-700 transition-colors duration-300"
            >
              <span className="text-lg font-semibold">{org.nameEn}</span>
              <span className="bg-gray-700 px-3 py-1 rounded-md text-sm">
                {org._count.editors}
              </span>
            </Link>
          ))}
        </div>
      )}
      <Link
        href={"/org/create"}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md text-center font-semibold transition-colors duration-300"
      >
        Create an Organization
      </Link>
    </div>
  );
}
