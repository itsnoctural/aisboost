import { PageTitle } from "@/components/dashboard/page-title";
import { ApplicationForm } from "@/components/forms/application";

export default function Page() {
  return (
    <>
      <PageTitle
        title="Applications"
        description="Create your beautiful application"
      />
      <ApplicationForm />
    </>
  );
}
