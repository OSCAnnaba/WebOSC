import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import { prisma } from "@/lib/prisma";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const getAnnouncement = async (announcement_id: number) => {
  const announcement = await prisma.announcement.findUniqueOrThrow({
    where: { announcement_id },
    include: {
      editor: {
        include: {
          user: {
            select: {
              name: true,
              lastname: true,
              middlename: true,
              user_id: true,
            },
          },
          org: true,
        },
      },
    },
  });
  return announcement;
};

export default async function PostPage({
  params,
}: {
  params: { announcement_id: string };
}) {
  const announcement_id = Number(params.announcement_id);
  const announcement = await getAnnouncement(announcement_id);

  return (
    <div className="flex flex-col flex-1 gap-4 rounded-md m-4 md:m-12 p-4 md:p-8 bg-gradient-to-b from-slate-700 to-slate-800 relative">
      <div className="md:absolute top-3 right-3 w-full md:w-fit flex justify-end gap-2">
        <Link
          href={"/"}
          title="go back home"
          className="p-2 rounded-md bg-gray-800 group"
        >
          <ArrowLeftIcon className="w-5 md:w-6 group-hover:-translate-x-1 transition-transform duration-200" />
        </Link>
        <CopyToClipboardButton />
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <span className="text-2xl md:text-4xl font-bold">
          {announcement.title}
        </span>
        <div className="flex flex-wrap gap-2 md:gap-4 text-gray-400">
          <Link
            href={`/org/${announcement.editor.org_id}/posts`}
            className="hover:underline hover:text-gray-100"
          >
            {announcement.editor.org.nameEn}
          </Link>
          <span className="text-white font-bold">/</span>
          <Link
            href={`/u/${announcement.editor.user_id}`}
            className="hover:underline hover:text-gray-100"
          >
            {announcement.editor.user.name} {announcement.editor.user.lastname}
          </Link>
        </div>
      </div>
      <textarea
        readOnly
        className="flex-1 rounded-md px-3 md:px-5 text-lg md:text-2xl bg-transparent outline-none cursor-default resize-none"
      >
        {announcement.body}
      </textarea>
    </div>
  );
}
