"use client";
import type { ToolUI } from "../../../types";
import { Input, Output } from "./tool";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const UI: ToolUI<typeof Input, typeof Output> = {
  Result: ({ data }) => (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{data.currentStepData.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{data.currentStepData.description}</p>
          <Progress value={data.currentStepData.progress} className="mb-4" />
        </div>
        {data.message && (
          <div className="p-3 bg-blue-50 text-blue-700 rounded mb-4">{data.message}</div>
        )}
      </CardContent>
    </Card>
  ),

  Loading: () => <div>Loading wizard...</div>,
  Error: ({ message }) => <div className="text-red-600">{message}</div>,

  InputForm: ({ onSubmit }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({
        currentStep: "loan_type",
        completedSteps: [],
        qualifierData: {},
        action: "next"
      });
    }} className="space-y-4">
      <Button type="submit">Start Wizard</Button>
    </form>
  )
};

export default UI;