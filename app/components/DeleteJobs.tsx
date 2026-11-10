"use client"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { IJobPostRow } from "../dashboard/recruiter/jobs/page"
import { deleteJobs } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteJobs({ job }: { job: IJobPostRow }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
  const handleDelete = async () => {
    const result = await deleteJobs(job._id)
    if (result.deletedCount> 0) {
        toast.add({
            title: "Jobs deleted successfully",
        })
        router.refresh();
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button className="cursor-pointer" variant="destructive">
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job post. View{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
