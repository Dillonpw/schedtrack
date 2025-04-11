"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteAccountButton from "@/components/delete-account-button";

export default function AccountManagement() {
  return (
    <Card className="border-destructive/20 max-w-2xl">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          Once you delete your account, there is no going back. Please be
          certain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteAccountButton />
      </CardContent>
    </Card>
  );
}
