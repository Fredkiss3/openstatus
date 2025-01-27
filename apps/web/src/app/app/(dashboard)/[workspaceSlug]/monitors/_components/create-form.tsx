"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type * as z from "zod";

import type { insertMonitorSchema } from "@openstatus/db/src/schema";

import { MonitorForm } from "@/components/forms/montitor-form";
import { LoadingAnimation } from "@/components/loading-animation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/client";

type MonitorSchema = z.infer<typeof insertMonitorSchema>;

interface Props {
  workspaceSlug: string;
  disabled?: boolean;
}

export function CreateForm({ workspaceSlug, disabled }: Props) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  async function onCreate(values: MonitorSchema) {
    startTransition(async () => {
      await api.monitor.createMonitor.mutate({
        data: values,
        workspaceSlug,
      });
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Create</Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-screen flex-col">
        <DialogHeader>
          <DialogTitle>Create Monitor</DialogTitle>
          <DialogDescription>Choose the settings.</DialogDescription>
        </DialogHeader>
        <div className="-mx-1 flex-1 overflow-y-scroll px-1">
          <MonitorForm id="monitor-create" onSubmit={onCreate} />
        </div>
        <DialogFooter>
          <Button type="submit" form="monitor-create" disabled={isPending}>
            {!isPending ? "Confirm" : <LoadingAnimation />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
