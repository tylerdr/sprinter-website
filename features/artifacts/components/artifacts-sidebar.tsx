import { getArtifactsAction } from "@/features/entities/server/actions";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText, FileSpreadsheet, FileImage, File, ChevronRight } from "lucide-react";

const ARTIFACT_ICONS: Record<string, React.ElementType> = {
  eligibility_report: FileSpreadsheet,
  pricing_sheet: FileSpreadsheet,
  document: FileText,
  image: FileImage,
  _default: File,
};

export default async function ArtifactsSidebar({
  entityId,
  currentArtifactId,
}: {
  entityId: string;
  currentArtifactId?: string;
}) {
  const artifacts = await getArtifactsAction(entityId);

  return (
    <aside className="hidden xl:block w-[320px] border-l bg-background/50 backdrop-blur-sm">
      <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm p-4">
        <h3 className="text-sm font-semibold text-foreground">Artifacts</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Generated documents and reports
        </p>
      </div>

      <div className="p-3 space-y-2">
        {artifacts && Array.isArray(artifacts) && artifacts.length > 0 ? (
          artifacts.map((artifact: any) => {
            const Icon = ARTIFACT_ICONS[artifact.kind] ?? ARTIFACT_ICONS._default;
            const isActive = artifact.id === currentArtifactId;

            return (
              <Link
                key={artifact.id}
                href={`?artifact=${artifact.id}`}
                className={`
                  group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all
                  hover:bg-muted/80 hover:shadow-sm
                  ${isActive ? "bg-muted shadow-sm ring-1 ring-primary/10" : ""}
                `}
              >
                <div className={`
                  mt-0.5 rounded-md p-2 transition-colors
                  ${isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/5"}
                `}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {artifact.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {artifact.kind.replace(/_/g, " ")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(artifact.created_at), { addSuffix: true })}
                  </p>
                </div>

                {isActive && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5" />
                )}
              </Link>
            );
          })
        ) : (
          <div className="text-center py-8">
            <File className="h-12 w-12 mx-auto text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground mt-3">
              No artifacts yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Artifacts will appear here as tools generate them
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}