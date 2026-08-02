import { useContext } from "react";
import { WorkspaceContext } from "../contexts/WorkspaceContextDef";

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
