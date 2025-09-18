import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, AlertCircle, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface ArtifactViewerProps {
  artifact: {
    id: string;
    kind: string;
    title: string;
    data: any;
    meta?: any;
  };
}

const EligibilityReportViewer = ({ artifact }: ArtifactViewerProps) => {
  const { eligible = [], missed = [] } = artifact.data;
  const totalLenders = eligible.length + missed.length;
  const eligibilityRate = totalLenders > 0 ? (eligible.length / totalLenders) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Eligible Lenders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{eligible.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {eligibilityRate.toFixed(0)}% eligibility rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Missed Lenders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{missed.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Did not meet criteria
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Searched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLenders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lenders evaluated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Details Tabs */}
      <Tabs defaultValue="eligible" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="eligible">
            Eligible ({eligible.length})
          </TabsTrigger>
          <TabsTrigger value="missed">
            Missed ({missed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="eligible" className="mt-4">
          {eligible.length > 0 ? (
            <div className="space-y-3">
              {eligible.map((lender: any, idx: number) => (
                <Card key={idx} className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-base">{lender.lender_name || lender.lender}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        Eligible
                      </Badge>
                    </div>
                  </CardHeader>
                  {lender.programs && lender.programs.length > 0 && (
                    <CardContent>
                      <p className="text-sm font-medium mb-2">Available Programs:</p>
                      <div className="space-y-2">
                        {lender.programs.map((program: any, pidx: number) => (
                          <div key={pidx} className="bg-white rounded-md p-3 border">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{program.program_name}</span>
                              {program.rate && (
                                <span className="text-sm font-bold text-green-600">
                                  {program.rate.toFixed(3)}%
                                </span>
                              )}
                            </div>
                            {program.notes && (
                              <p className="text-xs text-muted-foreground mt-1">{program.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                  {lender.notes && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{lender.notes}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground mt-3">
                  No eligible lenders found
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="missed" className="mt-4">
          {missed.length > 0 ? (
            <div className="space-y-3">
              {missed.map((lender: any, idx: number) => (
                <Card key={idx} className="border-amber-200 bg-amber-50/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-amber-600" />
                        <CardTitle className="text-base">{lender.lender_name || lender.lender}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
                        Not Eligible
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-1">Reasons:</p>
                    <ul className="space-y-1">
                      {lender.reasons ? (
                        lender.reasons.map((reason: string, ridx: number) => (
                          <li key={ridx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">•</span>
                            {reason}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5">•</span>
                          {lender.reason || "Did not meet eligibility criteria"}
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-green-600/30" />
                <p className="text-sm text-muted-foreground mt-3">
                  All lenders are eligible!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Metadata */}
      {artifact.meta && (
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-sm">Report Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2 text-xs">
              {artifact.meta.run_at && (
                <>
                  <dt className="text-muted-foreground">Generated:</dt>
                  <dd>{new Date(artifact.meta.run_at).toLocaleString()}</dd>
                </>
              )}
              {artifact.meta.lenders && (
                <>
                  <dt className="text-muted-foreground">Lenders Searched:</dt>
                  <dd>{artifact.meta.lenders.length}</dd>
                </>
              )}
              {artifact.meta.summary && (
                <>
                  <dt className="text-muted-foreground">Summary:</dt>
                  <dd>{artifact.meta.summary}</dd>
                </>
              )}
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const PricingSheetViewer = ({ artifact }: ArtifactViewerProps) => {
  const { programs = [], summary = {} } = artifact.data;

  return (
    <div className="space-y-6">
      {/* Summary */}
      {summary && Object.keys(summary).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pricing Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {summary.bestRate && (
                <div>
                  <p className="text-sm text-muted-foreground">Best Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {summary.bestRate.toFixed(3)}%
                  </p>
                </div>
              )}
              {summary.averageRate && (
                <div>
                  <p className="text-sm text-muted-foreground">Average Rate</p>
                  <p className="text-2xl font-bold">
                    {summary.averageRate.toFixed(3)}%
                  </p>
                </div>
              )}
              {summary.totalPrograms && (
                <div>
                  <p className="text-sm text-muted-foreground">Programs</p>
                  <p className="text-2xl font-bold">{summary.totalPrograms}</p>
                </div>
              )}
              {summary.totalLenders && (
                <div>
                  <p className="text-sm text-muted-foreground">Lenders</p>
                  <p className="text-2xl font-bold">{summary.totalLenders}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Programs Table */}
      {programs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Program Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lender</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>APR</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Fees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((program: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{program.lender}</TableCell>
                    <TableCell>{program.name}</TableCell>
                    <TableCell>
                      <span className="font-semibold">{program.rate?.toFixed(3)}%</span>
                    </TableCell>
                    <TableCell>{program.apr?.toFixed(3)}%</TableCell>
                    <TableCell>{program.points?.toFixed(2)}</TableCell>
                    <TableCell>
                      {program.fees && (
                        <span className="text-sm">
                          <DollarSign className="h-3 w-3 inline" />
                          {program.fees.toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const DefaultViewer = ({ artifact }: ArtifactViewerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{artifact.title}</CardTitle>
        <CardDescription>
          {artifact.kind.replace(/_/g, " ")} • {artifact.id.slice(0, 8)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="text-sm overflow-auto whitespace-pre-wrap bg-muted p-4 rounded-md">
          {JSON.stringify(artifact.data, null, 2)}
        </pre>
        {artifact.meta && Object.keys(artifact.meta).length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Metadata</h4>
            <pre className="text-xs overflow-auto whitespace-pre-wrap bg-muted p-3 rounded-md">
              {JSON.stringify(artifact.meta, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const ARTIFACT_VIEWERS: Record<string, React.ComponentType<ArtifactViewerProps>> = {
  eligibility_report: EligibilityReportViewer,
  pricing_sheet: PricingSheetViewer,
  _default: DefaultViewer,
};