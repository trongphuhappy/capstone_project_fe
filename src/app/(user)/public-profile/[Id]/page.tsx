import PublicProfileComponent from "@/app/(user)/public-profile/components";

export default function PublicProfile({ params }: any) {
  return (
    <div>
      <PublicProfileComponent Id={params?.Id} />
    </div>
  );
}