import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface Props {
  stable: boolean;
  bsod: boolean;
  withIcon?: boolean;
}

export function StatusBadge({ stable, bsod, withIcon = false }: Props) {
  const variant = bsod ? "failed" : stable ? "stable" : "warning";

  if (!withIcon) {
    return (
      <Badge variant={variant}>
        {bsod ? "BSOD" : stable ? "Stable" : "Instable"}
      </Badge>
    );
  }

  return (
    <Badge variant={variant}>
      {bsod ? (
        <><XCircle className="h-3 w-3" />BSOD</>
      ) : stable ? (
        <><CheckCircle2 className="h-3 w-3" />Stable</>
      ) : (
        <><AlertCircle className="h-3 w-3" />Instable</>
      )}
    </Badge>
  );
}
