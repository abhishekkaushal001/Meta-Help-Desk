import { PageData } from "@prisma/client";

const DashboardBlankPage = ({ page }: { page: PageData }) => {
  return (
    <div className="flex align-middle justify-center w-full bg-gray-200 border-[.5px] border-gray-200">
      <div className="mt-48 text-center">
        <h1 className="font-bold text-5xl text-gray-700">
          Welcome to Dashboard
        </h1>
        <p className="mt-7 text-xl font-medium text-gray-700">
          Connected Page: <strong>{page.pageName}</strong>
        </p>
      </div>
    </div>
  );
};

export default DashboardBlankPage;
