"use client";

import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface InteractionData {
  synergy: string[];
  caution: string[];
  avoid: string[];
}

interface Props {
  supplement: {
    interactions?: InteractionData;
  };
}

export function SupplementInteractions({ supplement }: Props) {
  const interactions = supplement.interactions;

  // Если нет взаимодействий, не отображаем компонент
  if (!interactions || (!interactions.synergy?.length && !interactions.caution?.length && !interactions.avoid?.length)) {
    return null;
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold font-heading">Interactions</h2>
      </div>

      <div className="space-y-4">
        {/* Positive Synergies */}
        {interactions.synergy?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <h3 className="font-medium text-green-400">Works Well With</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-6">
              {interactions.synergy.map((item, i) => (
                <li key={`synergy-${i}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Cautions */}
        {interactions.caution?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-yellow-500" />
              <h3 className="font-medium text-yellow-400">Use With Caution</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-6">
              {interactions.caution.map((item, i) => (
                <li key={`caution-${i}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Avoid */}
        {interactions.avoid?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h3 className="font-medium text-red-400">Avoid Combining With</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-6">
              {interactions.avoid.map((item, i) => (
                <li key={`avoid-${i}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
